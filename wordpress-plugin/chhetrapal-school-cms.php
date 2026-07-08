<?php
/**
 * Plugin Name: Chhetrapal School CMS
 * Description: Custom post types, taxonomies, REST payloads, and editor guidance for the school website.
 * Version: 1.0.0
 * Author: GitHub Copilot
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!is_admin()) {
    @ini_set('display_errors', '0');
    error_reporting(E_ALL & ~E_DEPRECATED & ~E_USER_DEPRECATED);
}

final class Chhetrapal_School_CMS {
    private const DEFAULT_INTERNAL_TOKEN = 'chhetrapal-dev-internal-token';
    private const SEED_LOCK_OPTION = 'chhetrapal_seed_completed';
    private const CPT_NOTICE = 'chhetrapal_notice';
    private const CPT_STAFF = 'chhetrapal_staff';
    private const CPT_PROGRAM = 'chhetrapal_program';
    private const CPT_FACILITY = 'chhetrapal_facility';
    private const CPT_DOWNLOAD = 'chhetrapal_download';
    private const CPT_GALLERY = 'chhetrapal_gallery';
    private const CPT_CONTACT = 'chhetrapal_contact';
    private const CPT_ALUMNI = 'chhetrapal_alumni';
    private const CPT_SCHOLARSHIP = 'chhetrapal_scholarship';
    private const CPT_ROUTINE = 'chhetrapal_routine';
    private const CPT_ADMISSION = 'chhetrapal_admission';
    private const CPT_INQUIRY = 'chhetrapal_inquiry';

    private const TAX_NOTICE_TYPE = 'chhetrapal_notice_type';
    private const TAX_STAFF_ROLE = 'chhetrapal_staff_role';
    private const TAX_PROGRAM_LEVEL = 'chhetrapal_program_level';
    private const TAX_FACILITY_GROUP = 'chhetrapal_facility_group';
    private const TAX_DOWNLOAD_TYPE = 'chhetrapal_download_type';
    private const TAX_GALLERY_ALBUM = 'chhetrapal_gallery_album';

    public static function boot(): void {
        $instance = new self();
        add_action('init', [$instance, 'register_content_types']);
        add_action('init', [$instance, 'register_meta']);
        add_action('after_setup_theme', [$instance, 'register_thumbnail_support']);
        add_action('template_redirect', [$instance, 'redirect_wordpress_frontend']);
        add_action('add_meta_boxes', [$instance, 'register_meta_boxes']);
        add_action('save_post', [$instance, 'save_meta_boxes']);
        add_action('rest_api_init', [$instance, 'register_rest_routes']);
        add_action('wp_dashboard_setup', [$instance, 'register_dashboard_widget']);
        add_action('admin_menu', [$instance, 'register_admin_pages']);
        add_action('admin_menu', [$instance, 'prune_admin_menu'], 999);
        add_filter('rest_authentication_errors', [$instance, 'restrict_rest_api_access']);
        register_activation_hook(__FILE__, [__CLASS__, 'activate']);
    }

    public function redirect_wordpress_frontend(): void {
        if (is_admin()) {
            return;
        }

        if (defined('REST_REQUEST') && REST_REQUEST) {
            return;
        }

        if (isset($_GET['rest_route'])) {
            return;
        }

        $request_uri = isset($_SERVER['REQUEST_URI']) ? (string) $_SERVER['REQUEST_URI'] : '/';

        $allowed_prefixes = [
            '/wp-admin',
            '/wp-login.php',
            '/wp-json',
            '/wp-content',
            '/wp-includes',
            '/wp-cron.php',
            '/xmlrpc.php',
        ];

        foreach ($allowed_prefixes as $prefix) {
            if (str_starts_with($request_uri, $prefix)) {
                return;
            }
        }

        if (strpos($request_uri, 'rest_route=') !== false) {
            return;
        }

        $frontend_url = apply_filters('chhetrapal_frontend_url', 'http://localhost:3000');
        nocache_headers();
        status_header(200);
        echo '<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=' . esc_url($frontend_url) . '"><title>Redirecting…</title></head><body><p>Redirecting to frontend… <a href="' . esc_url($frontend_url) . '">Continue</a></p><script>window.location.replace(' . wp_json_encode($frontend_url) . ');</script></body></html>';
        exit;
    }

    public function register_content_types(): void {
        $this->register_post_type(self::CPT_NOTICE, 'Notices', 'Notice', 'dashicons-megaphone');
        $this->register_post_type(self::CPT_STAFF, 'Staff & Principal', 'Staff Member', 'dashicons-admin-users');
        $this->register_post_type(self::CPT_PROGRAM, 'Programs', 'Program', 'dashicons-welcome-learn-more');
        $this->register_post_type(self::CPT_FACILITY, 'Facilities', 'Facility', 'dashicons-building');
        $this->register_post_type(self::CPT_DOWNLOAD, 'Downloads', 'Download', 'dashicons-download');
        $this->register_post_type(self::CPT_GALLERY, 'Gallery Items', 'Gallery Item', 'dashicons-format-gallery');
        $this->register_post_type(self::CPT_CONTACT, 'Contacts', 'Contact Card', 'dashicons-email-alt');
        $this->register_post_type(self::CPT_ALUMNI, 'Alumni', 'Alumni Profile', 'dashicons-awards');
        $this->register_post_type(self::CPT_SCHOLARSHIP, 'Scholarships', 'Scholarship Winner', 'dashicons-welcome-learn-more');
        $this->register_post_type(self::CPT_ROUTINE, 'Class Routines', 'Class Routine Day', 'dashicons-calendar-alt');
        $this->register_post_type(self::CPT_ADMISSION, 'Admissions', 'Admission Opening', 'dashicons-welcome-write-blog');
        $this->register_post_type(self::CPT_INQUIRY, 'Admission Inquiries', 'Admission Inquiry', 'dashicons-feedback');

        $this->register_taxonomy(self::TAX_NOTICE_TYPE, [self::CPT_NOTICE], 'Notice Types');
        $this->register_taxonomy(self::TAX_STAFF_ROLE, [self::CPT_STAFF], 'Staff Roles');
        $this->register_taxonomy(self::TAX_PROGRAM_LEVEL, [self::CPT_PROGRAM], 'Program Levels');
        $this->register_taxonomy(self::TAX_FACILITY_GROUP, [self::CPT_FACILITY], 'Facility Groups');
        $this->register_taxonomy(self::TAX_DOWNLOAD_TYPE, [self::CPT_DOWNLOAD], 'Download Types');
        $this->register_taxonomy(self::TAX_GALLERY_ALBUM, [self::CPT_GALLERY], 'Gallery Albums');
    }

    public function register_thumbnail_support(): void {
        add_theme_support('post-thumbnails', [
            self::CPT_NOTICE,
            self::CPT_STAFF,
            self::CPT_PROGRAM,
            self::CPT_FACILITY,
            self::CPT_DOWNLOAD,
            self::CPT_GALLERY,
            self::CPT_ALUMNI,
            self::CPT_SCHOLARSHIP,
        ]);
    }

    public function register_meta(): void {
        $meta_args = [
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ];

        register_post_meta(self::CPT_DOWNLOAD, 'chhetrapal_file_url', $meta_args + [
            'sanitize_callback' => 'esc_url_raw',
        ]);
        register_post_meta(self::CPT_DOWNLOAD, 'chhetrapal_file_label', $meta_args);
        register_post_meta(self::CPT_CONTACT, 'chhetrapal_phone', $meta_args);
        register_post_meta(self::CPT_CONTACT, 'chhetrapal_email', $meta_args + [
            'sanitize_callback' => 'sanitize_email',
        ]);
        register_post_meta(self::CPT_CONTACT, 'chhetrapal_address', $meta_args);
        register_post_meta(self::CPT_CONTACT, 'chhetrapal_map_url', $meta_args + [
            'sanitize_callback' => 'esc_url_raw',
        ]);
        register_post_meta(self::CPT_CONTACT, 'chhetrapal_facebook_url', $meta_args + [
            'sanitize_callback' => 'esc_url_raw',
        ]);
        register_post_meta(self::CPT_CONTACT, 'chhetrapal_youtube_url', $meta_args + [
            'sanitize_callback' => 'esc_url_raw',
        ]);
        register_post_meta(self::CPT_CONTACT, 'chhetrapal_twitter_url', $meta_args + [
            'sanitize_callback' => 'esc_url_raw',
        ]);
        register_post_meta(self::CPT_CONTACT, 'chhetrapal_privacy_policy', $meta_args);
        register_post_meta(self::CPT_CONTACT, 'chhetrapal_emergency_alert', $meta_args);
        register_post_meta(self::CPT_CONTACT, 'chhetrapal_fee_structure', $meta_args);
        register_post_meta(self::CPT_CONTACT, 'chhetrapal_scholarship_rules', $meta_args);
        register_post_meta(self::CPT_STAFF, 'chhetrapal_designation', $meta_args);
        register_post_meta(self::CPT_PROGRAM, 'chhetrapal_subtitle', $meta_args);
        register_post_meta(self::CPT_FACILITY, 'chhetrapal_subtitle', $meta_args);
        register_post_meta(self::CPT_ALUMNI, 'chhetrapal_alumni_year', $meta_args);
        register_post_meta(self::CPT_SCHOLARSHIP, 'chhetrapal_scholarship_year', $meta_args);
        register_post_meta(self::CPT_NOTICE, 'chhetrapal_notice_in_marquee', $meta_args);
        register_post_meta(self::CPT_ROUTINE, 'chhetrapal_period_1', $meta_args);
        register_post_meta(self::CPT_ROUTINE, 'chhetrapal_period_2', $meta_args);
        register_post_meta(self::CPT_ROUTINE, 'chhetrapal_period_3', $meta_args);
        register_post_meta(self::CPT_ROUTINE, 'chhetrapal_period_4', $meta_args);
        register_post_meta(self::CPT_ROUTINE, 'chhetrapal_period_5', $meta_args);
        register_post_meta(self::CPT_ADMISSION, 'chhetrapal_admission_status', $meta_args);
        register_post_meta(self::CPT_ADMISSION, 'chhetrapal_admission_classes', $meta_args);
        register_post_meta(self::CPT_ADMISSION, 'chhetrapal_admission_notice_url', $meta_args + [
            'sanitize_callback' => 'esc_url_raw',
        ]);
    }

    public function register_meta_boxes(): void {
        add_meta_box(
            'chhetrapal-download-details',
            'Download File',
            [$this, 'render_download_meta_box'],
            self::CPT_DOWNLOAD,
            'normal',
            'default'
        );

        add_meta_box(
            'chhetrapal-contact-details',
            'Contact Details',
            [$this, 'render_contact_meta_box'],
            self::CPT_CONTACT,
            'normal',
            'default'
        );

        add_meta_box(
            'chhetrapal-publishing-guide',
            'Publishing Guide',
            [$this, 'render_publishing_guide'],
            'dashboard',
            'normal',
            'high'
        );

        add_meta_box(
            'chhetrapal-scholarship-details',
            'Scholarship Details',
            [$this, 'render_scholarship_meta_box'],
            self::CPT_SCHOLARSHIP,
            'normal',
            'default'
        );

        add_meta_box(
            'chhetrapal-notice-marquee',
            'Scrolling Notice Bar Settings',
            [$this, 'render_notice_marquee_meta_box'],
            self::CPT_NOTICE,
            'side',
            'default'
        );

        add_meta_box(
            'chhetrapal-routine-details',
            'Class Routine Periods',
            [$this, 'render_routine_meta_box'],
            self::CPT_ROUTINE,
            'normal',
            'default'
        );

        add_meta_box(
            'chhetrapal-admission-details',
            'Admission Details',
            [$this, 'render_admission_meta_box'],
            self::CPT_ADMISSION,
            'normal',
            'default'
        );
    }

    public function register_dashboard_widget(): void {
        wp_add_dashboard_widget(
            'chhetrapal-publishing-widget',
            'School Website Publishing Flow',
            [$this, 'render_dashboard_widget']
        );
    }

    public function register_admin_pages(): void {
        add_menu_page(
            'School Website Guide',
            'School Website Guide',
            'edit_posts',
            'chhetrapal-school-guide',
            [$this, 'render_admin_page'],
            'dashicons-welcome-write-blog',
            61
        );

        add_submenu_page(
            'edit.php?post_type=' . self::CPT_SCHOLARSHIP,
            'Scholarship Guidelines',
            'Scholarship Guidelines',
            'edit_posts',
            'chhetrapal-scholarship-guidelines',
            [$this, 'render_scholarship_guidelines_page']
        );
    }

    public function render_scholarship_guidelines_page(): void {
        if (!current_user_can('edit_posts')) {
            wp_die('You do not have sufficient permissions to access this page.');
        }

        if (isset($_POST['chhetrapal_save_guidelines']) && check_admin_referer('chhetrapal_guidelines_action', 'chhetrapal_guidelines_nonce')) {
            $rules_en = isset($_POST['chhetrapal_rules_en']) ? wp_kses_post(wp_unslash($_POST['chhetrapal_rules_en'])) : '';
            $rules_ne = isset($_POST['chhetrapal_rules_ne']) ? wp_kses_post(wp_unslash($_POST['chhetrapal_rules_ne'])) : '';
            update_option('chhetrapal_scholarship_rules_en', $rules_en);
            update_option('chhetrapal_scholarship_rules_ne', $rules_ne);
            echo '<div class="updated"><p>Guidelines updated successfully.</p></div>';
        }

        $rules_en = get_option('chhetrapal_scholarship_rules_en', '');
        $rules_ne = get_option('chhetrapal_scholarship_rules_ne', '');

        echo '<div class="wrap"><h1>Scholarship Guidelines</h1>';
        echo '<form method="post" action="">';
        wp_nonce_field('chhetrapal_guidelines_action', 'chhetrapal_guidelines_nonce');
        
        echo '<h3>English Guidelines</h3>';
        wp_editor($rules_en, 'chhetrapal_rules_en', [
            'textarea_name' => 'chhetrapal_rules_en',
            'textarea_rows' => 10,
            'media_buttons' => false,
        ]);

        echo '<h3>Nepali Guidelines</h3>';
        wp_editor($rules_ne, 'chhetrapal_rules_ne', [
            'textarea_name' => 'chhetrapal_rules_ne',
            'textarea_rows' => 10,
            'media_buttons' => false,
        ]);

        echo '<p class="submit"><input type="submit" name="chhetrapal_save_guidelines" class="button button-primary" value="Save Guidelines" /></p>';
        echo '</form></div>';
    }

    public function prune_admin_menu(): void {
        remove_menu_page('edit-comments.php'); // Comments
        remove_menu_page('edit.php?post_type=page'); // Pages
        remove_menu_page('edit.php'); // Posts
    }

    public function render_admin_page(): void {
        echo '<div class="wrap"><h1>School Website Guide</h1>';
        echo '<p>Use the menu items on the left to manage each content area separately.</p>';
        echo '<ul style="list-style:disc;padding-left:20px;">';
        echo '<li><strong>Notices</strong> for announcements and events.</li>';
        echo '<li><strong>Staff & Principal</strong> for the head teacher and staff bios.</li>';
        echo '<li><strong>Programs</strong> for class levels and stream descriptions.</li>';
        echo '<li><strong>Facilities</strong> for labs, library, sports, and services.</li>';
        echo '<li><strong>Downloads</strong> for forms, calendars, and documents.</li>';
        echo '<li><strong>Contacts</strong> for phone, email, address, and map embed.</li>';
        echo '<li><strong>Gallery Items</strong> for albums and image-based updates.</li>';
        echo '<li><strong>Scholarships</strong> for student scholarship achievers and award details.</li>';
        echo '</ul>';
        echo '<p>Workflow: create a draft, set a featured image, add the correct taxonomy, preview, then publish.</p>';
        echo '</div>';
    }

    public function render_dashboard_widget(): void {
        echo '<p><strong>Recommended flow for non-technical staff:</strong></p>';
        echo '<ol style="margin-left:18px;">';
        echo '<li>Create a new draft in the correct menu.</li>';
        echo '<li>Add the title, body text, and featured image.</li>';
        echo '<li>Choose the right category/role/level taxonomy.</li>';
        echo '<li>Use Preview to review on the frontend.</li>';
        echo '<li>Publish once the content looks correct.</li>';
        echo '</ol>';
        echo '<p>For downloads, paste the file URL or upload the file in Media Library first.</p>';
    }

    public function render_publishing_guide(): void {
        echo '<p>Use Draft for editing, Preview for checking layout, and Publish when ready. Featured images will sync automatically to the frontend.</p>';
    }

    public function render_download_meta_box(WP_Post $post): void {
        wp_nonce_field('chhetrapal_save_download_meta', 'chhetrapal_download_nonce');
        $file_url = get_post_meta($post->ID, 'chhetrapal_file_url', true);
        $file_label = get_post_meta($post->ID, 'chhetrapal_file_label', true);

        echo '<p><label for="chhetrapal_file_label"><strong>Button label</strong></label><br />';
        echo '<input type="text" id="chhetrapal_file_label" name="chhetrapal_file_label" value="' . esc_attr($file_label) . '" class="widefat" placeholder="Download PDF" /></p>';
        echo '<p><label for="chhetrapal_file_url"><strong>File URL</strong></label><br />';
        echo '<input type="url" id="chhetrapal_file_url" name="chhetrapal_file_url" value="' . esc_attr($file_url) . '" class="widefat" placeholder="https://.../file.pdf" /></p>';
        echo '<p class="description">Upload the PDF or document in Media Library, then paste the file URL here.</p>';
    }

    public function render_contact_meta_box(WP_Post $post): void {
        wp_nonce_field('chhetrapal_save_contact_meta', 'chhetrapal_contact_nonce');
        $phone = get_post_meta($post->ID, 'chhetrapal_phone', true);
        $email = get_post_meta($post->ID, 'chhetrapal_email', true);
        $address = get_post_meta($post->ID, 'chhetrapal_address', true);
        $map_url = get_post_meta($post->ID, 'chhetrapal_map_url', true);
        $facebook_url = get_post_meta($post->ID, 'chhetrapal_facebook_url', true);
        $youtube_url = get_post_meta($post->ID, 'chhetrapal_youtube_url', true);
        $twitter_url = get_post_meta($post->ID, 'chhetrapal_twitter_url', true);
        $privacy_policy = get_post_meta($post->ID, 'chhetrapal_privacy_policy', true);
        $emergency_alert = get_post_meta($post->ID, 'chhetrapal_emergency_alert', true);
        $fee_structure = get_post_meta($post->ID, 'chhetrapal_fee_structure', true);
        $scholarship_rules = get_post_meta($post->ID, 'chhetrapal_scholarship_rules', true);
 
        echo '<p><label for="chhetrapal_phone"><strong>Phone Number / फोन नम्बर</strong></label><br />';
        echo '<input type="text" id="chhetrapal_phone" name="chhetrapal_phone" value="' . esc_attr($phone) . '" class="widefat" /></p>';
        
        echo '<p><label for="chhetrapal_email"><strong>Email Address / इमेल ठेगाना</strong></label><br />';
        echo '<input type="email" id="chhetrapal_email" name="chhetrapal_email" value="' . esc_attr($email) . '" class="widefat" /></p>';
        
        echo '<p><label for="chhetrapal_address"><strong>Official Address (Bilingual) / आधिकारिक ठेगाना (द्विभाषी)</strong></label><br />';
        echo '<textarea id="chhetrapal_address" name="chhetrapal_address" class="widefat" rows="2">' . esc_textarea($address) . '</textarea></p>';
        
        echo '<p><label for="chhetrapal_map_url"><strong>Google Maps Embed URL / गुगल नक्सा एम्बेड लिङ्क</strong></label><br />';
        echo '<input type="url" id="chhetrapal_map_url" name="chhetrapal_map_url" value="' . esc_attr($map_url) . '" class="widefat" placeholder="https://www.google.com/maps/embed?..." /></p>';
        
        echo '<p><label for="chhetrapal_facebook_url"><strong>Facebook Page URL / फेसबुक पेज लिङ्क</strong></label><br />';
        echo '<input type="url" id="chhetrapal_facebook_url" name="chhetrapal_facebook_url" value="' . esc_attr($facebook_url) . '" class="widefat" placeholder="https://facebook.com/..." /></p>';
        
        echo '<p><label for="chhetrapal_youtube_url"><strong>YouTube Channel URL / युट्युब च्यानल लिङ्क</strong></label><br />';
        echo '<input type="url" id="chhetrapal_youtube_url" name="chhetrapal_youtube_url" value="' . esc_attr($youtube_url) . '" class="widefat" placeholder="https://youtube.com/..." /></p>';
        
        echo '<p><label for="chhetrapal_twitter_url"><strong>Twitter (X) URL / ट्विटर (एक्स) लिङ्क</strong></label><br />';
        echo '<input type="url" id="chhetrapal_twitter_url" name="chhetrapal_twitter_url" value="' . esc_attr($twitter_url) . '" class="widefat" placeholder="https://x.com/..." /></p>';

        echo '<p><label for="chhetrapal_emergency_alert"><strong>Emergency Alert Banner Text (Bilingual) / संकटकालीन सूचना पट्टी (द्विभाषी)</strong></label><br />';
        echo '<input type="text" id="chhetrapal_emergency_alert" name="chhetrapal_emergency_alert" value="' . esc_attr($emergency_alert) . '" class="widefat" placeholder="Keep empty if there is no emergency..." /></p>';

        echo '<p><label for="chhetrapal_fee_structure"><strong>Fee Structure Rules / शुल्क संरचना विवरण</strong></label><br />';
        echo '<textarea id="chhetrapal_fee_structure" name="chhetrapal_fee_structure" class="widefat" rows="4" placeholder="Enter tuition fees or structure notes...">' . esc_textarea($fee_structure) . '</textarea></p>';

        echo '<p><label for="chhetrapal_scholarship_rules"><strong>Scholarship Eligibility Rules / छात्रवृत्ति नियम तथा योग्यता विवरण</strong></label><br />';
        echo '<textarea id="chhetrapal_scholarship_rules" name="chhetrapal_scholarship_rules" class="widefat" rows="4" placeholder="Enter eligibility rules and requirements...">' . esc_textarea($scholarship_rules) . '</textarea></p>';
        
        echo '<p><label for="chhetrapal_privacy_policy"><strong>Privacy Policy Content / गोपनीयता नीतिको विवरण</strong></label><br />';
        echo '<textarea id="chhetrapal_privacy_policy" name="chhetrapal_privacy_policy" class="widefat" rows="5" placeholder="Enter privacy policy text here...">' . esc_textarea($privacy_policy) . '</textarea></p>';
    }

    public function render_scholarship_meta_box(WP_Post $post): void {
        wp_nonce_field('chhetrapal_save_scholarship_meta', 'chhetrapal_scholarship_nonce');
        $year = get_post_meta($post->ID, 'chhetrapal_scholarship_year', true);

        echo '<p><label for="chhetrapal_scholarship_year"><strong>Scholarship Year</strong></label><br />';
        echo '<input type="text" id="chhetrapal_scholarship_year" name="chhetrapal_scholarship_year" value="' . esc_attr($year) . '" class="widefat" placeholder="2026" /></p>';
        echo '<p class="description">Use the post title as student name and the excerpt as scholarship title.</p>';
    }

    public function render_notice_marquee_meta_box(WP_Post $post): void {
        wp_nonce_field('chhetrapal_save_notice_marquee_meta', 'chhetrapal_notice_marquee_nonce');
        $in_marquee = get_post_meta($post->ID, 'chhetrapal_notice_in_marquee', true);
        echo '<p><label><input type="checkbox" name="chhetrapal_notice_in_marquee" value="1" ' . checked($in_marquee, '1', false) . ' /> ';
        echo 'Show this notice in the moving scrolling notice bar below the navbar.</label></p>';
    }

    public function render_routine_meta_box(WP_Post $post): void {
        wp_nonce_field('chhetrapal_save_routine_meta', 'chhetrapal_routine_nonce');
        $p1 = get_post_meta($post->ID, 'chhetrapal_period_1', true);
        $p2 = get_post_meta($post->ID, 'chhetrapal_period_2', true);
        $p3 = get_post_meta($post->ID, 'chhetrapal_period_3', true);
        $p4 = get_post_meta($post->ID, 'chhetrapal_period_4', true);
        $p5 = get_post_meta($post->ID, 'chhetrapal_period_5', true);

        for ($i = 1; $i <= 5; $i++) {
            $val = ${"p$i"};
            echo '<p><label for="chhetrapal_period_' . $i . '"><strong>Period ' . $i . '</strong></label><br />';
            echo '<input type="text" id="chhetrapal_period_' . $i . '" name="chhetrapal_period_' . $i . '" value="' . esc_attr($val) . '" class="widefat" /></p>';
        }
    }

    public function render_admission_meta_box(WP_Post $post): void {
        wp_nonce_field('chhetrapal_save_admission_meta', 'chhetrapal_admission_nonce');
        $status = get_post_meta($post->ID, 'chhetrapal_admission_status', true) ?: 'open';
        $classes = get_post_meta($post->ID, 'chhetrapal_admission_classes', true) ?: 'Class 1-12';
        $notice_url = get_post_meta($post->ID, 'chhetrapal_admission_notice_url', true);

        echo '<p><label for="chhetrapal_admission_status"><strong>Admission Status</strong></label><br />';
        echo '<select id="chhetrapal_admission_status" name="chhetrapal_admission_status" class="widefat">';
        echo '<option value="open" ' . selected($status, 'open', false) . '>Open</option>';
        echo '<option value="closed" ' . selected($status, 'closed', false) . '>Closed</option>';
        echo '</select></p>';

        echo '<p><label for="chhetrapal_admission_classes"><strong>Target Classes</strong></label><br />';
        echo '<input type="text" id="chhetrapal_admission_classes" name="chhetrapal_admission_classes" value="' . esc_attr($classes) . '" class="widefat" placeholder="e.g. Class 1-12, Class 11-12" /></p>';

        echo '<p><label for="chhetrapal_admission_notice_url"><strong>Notice URL (PDF or Page)</strong></label><br />';
        echo '<input type="url" id="chhetrapal_admission_notice_url" name="chhetrapal_admission_notice_url" value="' . esc_attr($notice_url) . '" class="widefat" placeholder="https://.../notice.pdf" /></p>';
    }

    public function save_meta_boxes(int $post_id): void {
        if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
            return;
        }

        $post_type = get_post_type($post_id);
        if (!$post_type) {
            return;
        }

        if ($post_type === self::CPT_DOWNLOAD) {
            if (!isset($_POST['chhetrapal_download_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['chhetrapal_download_nonce'])), 'chhetrapal_save_download_meta')) {
                return;
            }
            if (!current_user_can('edit_post', $post_id)) {
                return;
            }
            $file_url = isset($_POST['chhetrapal_file_url']) ? esc_url_raw(wp_unslash($_POST['chhetrapal_file_url'])) : '';
            $file_label = isset($_POST['chhetrapal_file_label']) ? sanitize_text_field(wp_unslash($_POST['chhetrapal_file_label'])) : '';
            update_post_meta($post_id, 'chhetrapal_file_url', $file_url);
            update_post_meta($post_id, 'chhetrapal_file_label', $file_label);
        }

        if ($post_type === self::CPT_CONTACT) {
            if (!isset($_POST['chhetrapal_contact_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['chhetrapal_contact_nonce'])), 'chhetrapal_save_contact_meta')) {
                return;
            }
            if (!current_user_can('edit_post', $post_id)) {
                return;
            }
            $phone = isset($_POST['chhetrapal_phone']) ? sanitize_text_field(wp_unslash($_POST['chhetrapal_phone'])) : '';
            $email = isset($_POST['chhetrapal_email']) ? sanitize_email(wp_unslash($_POST['chhetrapal_email'])) : '';
            $address = isset($_POST['chhetrapal_address']) ? sanitize_textarea_field(wp_unslash($_POST['chhetrapal_address'])) : '';
            $map_url = isset($_POST['chhetrapal_map_url']) ? esc_url_raw(wp_unslash($_POST['chhetrapal_map_url'])) : '';
            $facebook_url = isset($_POST['chhetrapal_facebook_url']) ? esc_url_raw(wp_unslash($_POST['chhetrapal_facebook_url'])) : '';
            $youtube_url = isset($_POST['chhetrapal_youtube_url']) ? esc_url_raw(wp_unslash($_POST['chhetrapal_youtube_url'])) : '';
            $twitter_url = isset($_POST['chhetrapal_twitter_url']) ? esc_url_raw(wp_unslash($_POST['chhetrapal_twitter_url'])) : '';
            $privacy_policy = isset($_POST['chhetrapal_privacy_policy']) ? wp_kses_post(wp_unslash($_POST['chhetrapal_privacy_policy'])) : '';
            $emergency_alert = isset($_POST['chhetrapal_emergency_alert']) ? sanitize_text_field(wp_unslash($_POST['chhetrapal_emergency_alert'])) : '';
            $fee_structure = isset($_POST['chhetrapal_fee_structure']) ? wp_kses_post(wp_unslash($_POST['chhetrapal_fee_structure'])) : '';
            $scholarship_rules = isset($_POST['chhetrapal_scholarship_rules']) ? wp_kses_post(wp_unslash($_POST['chhetrapal_scholarship_rules'])) : '';

            update_post_meta($post_id, 'chhetrapal_phone', $phone);
            update_post_meta($post_id, 'chhetrapal_email', $email);
            update_post_meta($post_id, 'chhetrapal_address', $address);
            update_post_meta($post_id, 'chhetrapal_map_url', $map_url);
            update_post_meta($post_id, 'chhetrapal_facebook_url', $facebook_url);
            update_post_meta($post_id, 'chhetrapal_youtube_url', $youtube_url);
            update_post_meta($post_id, 'chhetrapal_twitter_url', $twitter_url);
            update_post_meta($post_id, 'chhetrapal_privacy_policy', $privacy_policy);
            update_post_meta($post_id, 'chhetrapal_emergency_alert', $emergency_alert);
            update_post_meta($post_id, 'chhetrapal_fee_structure', $fee_structure);
            update_post_meta($post_id, 'chhetrapal_scholarship_rules', $scholarship_rules);
        }

        if ($post_type === self::CPT_SCHOLARSHIP) {
            if (!isset($_POST['chhetrapal_scholarship_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['chhetrapal_scholarship_nonce'])), 'chhetrapal_save_scholarship_meta')) {
                return;
            }
            if (!current_user_can('edit_post', $post_id)) {
                return;
            }
            $year = isset($_POST['chhetrapal_scholarship_year']) ? sanitize_text_field(wp_unslash($_POST['chhetrapal_scholarship_year'])) : '';
            update_post_meta($post_id, 'chhetrapal_scholarship_year', $year);
        }

        if ($post_type === self::CPT_NOTICE) {
            if (isset($_POST['chhetrapal_notice_marquee_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['chhetrapal_notice_marquee_nonce'])), 'chhetrapal_save_notice_marquee_meta')) {
                if (current_user_can('edit_post', $post_id)) {
                    $in_marquee = isset($_POST['chhetrapal_notice_in_marquee']) ? '1' : '0';
                    update_post_meta($post_id, 'chhetrapal_notice_in_marquee', $in_marquee);
                }
            }
        }

        if ($post_type === self::CPT_ROUTINE) {
            if (isset($_POST['chhetrapal_routine_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['chhetrapal_routine_nonce'])), 'chhetrapal_save_routine_meta')) {
                if (current_user_can('edit_post', $post_id)) {
                    for ($i = 1; $i <= 5; $i++) {
                        $val = isset($_POST['chhetrapal_period_' . $i]) ? sanitize_text_field(wp_unslash($_POST['chhetrapal_period_' . $i])) : '';
                        update_post_meta($post_id, 'chhetrapal_period_' . $i, $val);
                    }
                }
            }
        }

        if ($post_type === self::CPT_ADMISSION) {
            if (isset($_POST['chhetrapal_admission_nonce']) && wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['chhetrapal_admission_nonce'])), 'chhetrapal_save_admission_meta')) {
                if (current_user_can('edit_post', $post_id)) {
                    $status = isset($_POST['chhetrapal_admission_status']) ? sanitize_text_field(wp_unslash($_POST['chhetrapal_admission_status'])) : 'open';
                    $classes = isset($_POST['chhetrapal_admission_classes']) ? sanitize_text_field(wp_unslash($_POST['chhetrapal_admission_classes'])) : '';
                    $notice_url = isset($_POST['chhetrapal_admission_notice_url']) ? esc_url_raw(wp_unslash($_POST['chhetrapal_admission_notice_url'])) : '';
                    update_post_meta($post_id, 'chhetrapal_admission_status', $status);
                    update_post_meta($post_id, 'chhetrapal_admission_classes', $classes);
                    update_post_meta($post_id, 'chhetrapal_admission_notice_url', $notice_url);
                }
            }
        }
    }

    public function register_rest_routes(): void {
        register_rest_route('chhetrapal/v1', '/homepage', [
            'methods' => WP_REST_Server::READABLE,
            'callback' => [$this, 'build_homepage_payload'],
            'permission_callback' => [$this, 'can_access_homepage_payload'],
        ]);

        register_rest_route('chhetrapal/v1', '/submit-admission', [
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => [$this, 'handle_admission_submission'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function can_access_homepage_payload(WP_REST_Request $request): bool {
        if (current_user_can('edit_posts')) {
            return true;
        }

        $expected_token = getenv('CHHETRAPAL_INTERNAL_TOKEN');
        if ($expected_token === false || $expected_token === '') {
            $expected_token = self::DEFAULT_INTERNAL_TOKEN;
        }

        $provided_token = (string) $request->get_header('x-chhetrapal-internal-token');

        return $provided_token !== '' && hash_equals($expected_token, $provided_token);
    }

    public function build_homepage_payload(WP_REST_Request $request): WP_REST_Response {
        $lang = sanitize_text_field($request->get_param('lang')) ?: '';

        // If Polylang is active, set the active language context.
        if (!empty($lang) && function_exists('pll_set_post_language') && class_exists('PLL')) {
            global $polylang;
            if (isset($polylang)) {
                $current_lang = $polylang->model->get_language($lang);
                if ($current_lang) {
                    $polylang->curlang = $current_lang;
                }
            }
        }

        $payload = [
            'hero' => [
                'eyebrow' => get_bloginfo('name'),
                'title' => get_bloginfo('name'),
                'subtitle' => get_bloginfo('description'),
                'description' => 'A school website with centrally managed notices, staff, facilities, downloads, and contact updates.',
            ],
            'notices' => $this->build_notice_items($lang),
            'principal' => $this->build_principal($lang),
            'programs' => $this->build_programs($lang),
            'facilities' => $this->build_facilities($lang),
            'downloads' => $this->build_downloads($lang),
            'gallery' => $this->build_gallery_items($lang),
            'alumni' => $this->build_alumni_items($lang),
            'scholarships' => $this->build_scholarship_items($lang),
            'contact' => $this->build_contact_card($lang),
            'routine' => $this->build_routine_items($lang),
            'admissions' => $this->build_admission_openings($lang),
            'marqueeNotices' => $this->build_marquee_notices($lang),
            'stats' => [
                ['value' => '35+', 'label' => 'Academic Staff'],
                ['value' => '850+', 'label' => 'Active Students'],
                ['value' => '100%', 'label' => 'SEE Pass Rate'],
                ['value' => '60+', 'label' => 'Years of History'],
            ],
        ];

        $response = rest_ensure_response($payload);
        $response->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
        $response->header('Pragma', 'no-cache');

        return $response;
    }

    private function build_notice_items(string $lang = ''): array {
        $args = [
            'post_type' => self::CPT_NOTICE,
            'post_status' => 'publish',
            'numberposts' => 100,
            'orderby' => 'date',
            'order' => 'DESC',
        ];
        if (!empty($lang)) {
            $args['lang'] = $lang;
        }
        $posts = get_posts($args);

        $items = [];
        foreach ($posts as $post) {
            $month_day = $this->month_day($post->post_date);
            $summary = get_the_excerpt($post);
            if (!$summary) {
                $summary = wp_trim_words(wp_strip_all_tags($post->post_content), 20);
            }
            $items[] = [
                'date' => $month_day,
                'title' => get_the_title($post),
                'summary' => $summary,
                'content' => apply_filters('the_content', $post->post_content),
                'tag' => $this->detect_notice_tag($post->ID),
                'link' => '/notices',
                'imageUrl' => $this->get_post_photo_url($post),
            ];
        }

        return $items;
    }

    private function build_principal(string $lang = ''): array {
        $post = $this->first_post_by_role(self::CPT_STAFF, self::TAX_STAFF_ROLE, 'principal', $lang);
        if (!$post) {
            $post = $this->first_post(self::CPT_STAFF, $lang);
        }
        if (!$post) {
            return [
                'name' => 'Principal',
                'title' => 'Principal',
                'message' => 'Please add the principal message in the editor.',
                'photoUrl' => '',
                'designation' => 'Principal',
                'link' => '/about#principal',
            ];
        }

        return [
            'name' => get_the_title($post),
            'title' => get_the_title($post),
            'message' => apply_filters('the_content', $post->post_content),
            'photoUrl' => $this->get_post_photo_url($post),
            'designation' => get_post_meta($post->ID, 'chhetrapal_designation', true) ?: 'Principal',
            'link' => '/about#principal',
        ];
    }

    private function build_programs(string $lang = ''): array {
        return $this->build_collection(self::CPT_PROGRAM, function (WP_Post $post): array {
            return [
                'label' => get_the_title($post),
                'desc' => get_the_excerpt($post) ?: 'Program',
                'sub' => get_post_meta($post->ID, 'chhetrapal_subtitle', true) ?: wp_trim_words(wp_strip_all_tags($post->post_content), 12),
                'imageUrl' => $this->get_post_photo_url($post),
                'link' => '/academics',
            ];
        }, 20, $lang);
    }
 
    private function build_facilities(string $lang = ''): array {
        return $this->build_collection(self::CPT_FACILITY, function (WP_Post $post): array {
            return [
                'label' => get_the_title($post),
                'desc' => get_the_excerpt($post) ?: 'Facility',
                'sub' => get_post_meta($post->ID, 'chhetrapal_subtitle', true) ?: '',
                'imageUrl' => $this->get_post_photo_url($post),
                'link' => '/about#management',
            ];
        }, 6, $lang);
    }
 
    private function build_downloads(string $lang = ''): array {
        return $this->build_collection(self::CPT_DOWNLOAD, function (WP_Post $post): array {
            $file_url = get_post_meta($post->ID, 'chhetrapal_file_url', true);
            $label = get_post_meta($post->ID, 'chhetrapal_file_label', true);
            return [
                'title' => get_the_title($post),
                'desc' => get_the_excerpt($post) ?: 'Download document',
                'buttonLabel' => $label ?: 'Download',
                'fileUrl' => $file_url ?: '/notices',
                'imageUrl' => $this->get_post_photo_url($post),
            ];
        }, 4, $lang);
    }
 
    private function build_gallery_items(string $lang = ''): array {
        return $this->build_collection(self::CPT_GALLERY, function (WP_Post $post): array {
            return [
                'src' => $this->get_post_photo_url($post),
                'alt' => get_the_title($post),
                'title' => get_the_title($post),
                'link' => '/gallery',
            ];
        }, 50, $lang);
    }
 
    private function build_alumni_items(string $lang = ''): array {
        return $this->build_collection(self::CPT_ALUMNI, function (WP_Post $post): array {
            return [
                'name' => get_the_title($post),
                'year' => get_post_meta($post->ID, 'chhetrapal_alumni_year', true) ?: 'Alumni',
                'achievement' => get_the_excerpt($post) ?: wp_trim_words(wp_strip_all_tags($post->post_content), 14),
                'bio' => apply_filters('the_content', $post->post_content),
                'photoUrl' => $this->get_post_photo_url($post),
                'link' => '/alumni',
            ];
        }, 50, $lang);
    }

    private function build_scholarship_items(string $lang = ''): array {
        return $this->build_collection(self::CPT_SCHOLARSHIP, function (WP_Post $post): array {
            return [
                'studentName' => get_the_title($post),
                'scholarshipTitle' => get_the_excerpt($post) ?: 'Scholarship Award',
                'year' => get_post_meta($post->ID, 'chhetrapal_scholarship_year', true) ?: date_i18n('Y'),
                'details' => apply_filters('the_content', $post->post_content),
                'photoUrl' => $this->get_post_photo_url($post),
                'link' => '/scholarships',
            ];
        }, 50, $lang);
    }

    private function get_post_photo_url(WP_Post $post): string {
        $url = get_the_post_thumbnail_url($post, 'full');
        if ($url) {
            return $url;
        }
        if (preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', $post->post_content, $matches)) {
            return $matches[1];
        }
        return '';
    }

    private function build_routine_items(string $lang = ''): array {
        $args = [
            'post_type' => self::CPT_ROUTINE,
            'post_status' => 'publish',
            'numberposts' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC',
        ];
        if (!empty($lang)) {
            $args['lang'] = $lang;
        }
        $posts = get_posts($args);

        $items = [];
        foreach ($posts as $post) {
            $items[] = [
                'day' => get_the_title($post),
                'p1' => get_post_meta($post->ID, 'chhetrapal_period_1', true) ?: '',
                'p2' => get_post_meta($post->ID, 'chhetrapal_period_2', true) ?: '',
                'p3' => get_post_meta($post->ID, 'chhetrapal_period_3', true) ?: '',
                'p4' => get_post_meta($post->ID, 'chhetrapal_period_4', true) ?: '',
                'p5' => get_post_meta($post->ID, 'chhetrapal_period_5', true) ?: '',
            ];
        }

        return $items;
    }

    private function build_admission_openings(string $lang = ''): array {
        $args = [
            'post_type' => self::CPT_ADMISSION,
            'post_status' => 'publish',
            'numberposts' => 1,
            'orderby' => 'date',
            'order' => 'DESC',
        ];
        if (!empty($lang)) {
            $args['lang'] = $lang;
        }
        $posts = get_posts($args);

        if (empty($posts)) {
            return [
                'status' => 'open',
                'classes' => 'Class 1-5 (Primary), Class 6-8 (Lower Sec.), Class 9-10 (SEE), Class 11-12 (+2)',
                'noticeUrl' => '',
                'title' => 'Admissions Open!',
                'content' => 'Academic Year 2026/2027',
            ];
        }

        $post = $posts[0];
        return [
            'status' => get_post_meta($post->ID, 'chhetrapal_admission_status', true) ?: 'open',
            'classes' => get_post_meta($post->ID, 'chhetrapal_admission_classes', true) ?: 'Class 1-5 (Primary), Class 6-8 (Lower Sec.), Class 9-10 (SEE), Class 11-12 (+2)',
            'noticeUrl' => get_post_meta($post->ID, 'chhetrapal_admission_notice_url', true) ?: '',
            'title' => get_the_title($post),
            'content' => wp_strip_all_tags($post->post_content),
        ];
    }

    private function build_marquee_notices(string $lang = ''): array {
        $args = [
            'post_type' => self::CPT_NOTICE,
            'post_status' => 'publish',
            'numberposts' => 10,
            'meta_key' => 'chhetrapal_notice_in_marquee',
            'meta_value' => '1',
            'orderby' => 'date',
            'order' => 'DESC',
        ];
        if (!empty($lang)) {
            $args['lang'] = $lang;
        }
        $posts = get_posts($args);

        $items = [];
        foreach ($posts as $post) {
            $items[] = get_the_title($post);
        }

        if (empty($items)) {
            $fallback_args = [
                'post_type' => self::CPT_NOTICE,
                'post_status' => 'publish',
                'numberposts' => 5,
                'orderby' => 'date',
                'order' => 'DESC',
            ];
            if (!empty($lang)) {
                $fallback_args['lang'] = $lang;
            }
            $recent = get_posts($fallback_args);
            foreach ($recent as $post) {
                $items[] = get_the_title($post);
            }
        }

        return $items;
    }

    private function build_contact_card(string $lang = ''): array {
        $post = $this->first_post(self::CPT_CONTACT, $lang);
        
        $rules_en = get_option('chhetrapal_scholarship_rules_en', '');
        $rules_ne = get_option('chhetrapal_scholarship_rules_ne', '');
        $rules = ($lang === 'ne') ? ($rules_ne ?: $rules_en) : ($rules_en ?: $rules_ne);

        if (!$post) {
            return [
                'address' => 'Likhu Rural Municipality Ward no. 4, Chaughada Nuwakot, Bagmati Province, Nepal',
                'phone' => '9851181243',
                'email' => 'info@chhetrapalschool.edu.np',
                'mapUrl' => '',
                'facebookUrl' => '#',
                'youtubeUrl' => '#',
                'twitterUrl' => '#',
                'privacyPolicy' => '',
                'emergencyAlert' => '',
                'feeStructure' => '',
                'scholarshipRules' => $rules,
                'link' => '/contact',
            ];
        }

        if (empty($rules)) {
            $rules = get_post_meta($post->ID, 'chhetrapal_scholarship_rules', true) ?: '';
        }
 
        return [
            'address' => get_post_meta($post->ID, 'chhetrapal_address', true) ?: wp_strip_all_tags($post->post_content),
            'phone' => get_post_meta($post->ID, 'chhetrapal_phone', true),
            'email' => get_post_meta($post->ID, 'chhetrapal_email', true),
            'mapUrl' => get_post_meta($post->ID, 'chhetrapal_map_url', true),
            'facebookUrl' => get_post_meta($post->ID, 'chhetrapal_facebook_url', true),
            'youtubeUrl' => get_post_meta($post->ID, 'chhetrapal_youtube_url', true),
            'twitterUrl' => get_post_meta($post->ID, 'chhetrapal_twitter_url', true),
            'privacyPolicy' => get_post_meta($post->ID, 'chhetrapal_privacy_policy', true),
            'emergencyAlert' => get_post_meta($post->ID, 'chhetrapal_emergency_alert', true) ?: '',
            'feeStructure' => get_post_meta($post->ID, 'chhetrapal_fee_structure', true) ?: '',
            'scholarshipRules' => $rules,
            'link' => '/contact',
        ];
    }

    private function build_collection(string $post_type, callable $transform, int $limit, string $lang = ''): array {
        $args = [
            'post_type' => $post_type,
            'post_status' => 'publish',
            'numberposts' => $limit,
            'orderby' => 'menu_order date',
            'order' => 'ASC',
        ];
        if (!empty($lang)) {
            $args['lang'] = $lang;
        }
        $posts = get_posts($args);

        return array_map($transform, $posts);
    }

    private function first_post(string $post_type, string $lang = ''): ?WP_Post {
        $args = [
            'post_type' => $post_type,
            'post_status' => 'publish',
            'numberposts' => 1,
            'orderby' => 'date',
            'order' => 'DESC',
        ];
        if (!empty($lang)) {
            $args['lang'] = $lang;
        }
        $posts = get_posts($args);

        return $posts[0] ?? null;
    }

    private function first_post_by_role(string $post_type, string $taxonomy, string $term_slug, string $lang = ''): ?WP_Post {
        $args = [
            'post_type' => $post_type,
            'post_status' => 'publish',
            'numberposts' => 1,
            'tax_query' => [[
                'taxonomy' => $taxonomy,
                'field' => 'slug',
                'terms' => $term_slug,
            ]],
        ];
        if (!empty($lang)) {
            $args['lang'] = $lang;
        }
        $posts = get_posts($args);

        return $posts[0] ?? null;
    }

    public function handle_admission_submission(WP_REST_Request $request): WP_REST_Response {
        $first_name = sanitize_text_field($request->get_param('firstName'));
        $last_name = sanitize_text_field($request->get_param('lastName'));
        $dob = sanitize_text_field($request->get_param('dob'));
        $grade = sanitize_text_field($request->get_param('grade'));
        $stream = sanitize_text_field($request->get_param('stream'));
        $previous_school = sanitize_text_field($request->get_param('previousSchool'));
        $guardian_name = sanitize_text_field($request->get_param('guardianName'));
        $guardian_phone = sanitize_text_field($request->get_param('guardianPhone'));
        $email = sanitize_email($request->get_param('email'));
        $address = sanitize_text_field($request->get_param('address'));
        $notes = sanitize_textarea_field($request->get_param('notes'));

        if (empty($first_name) || empty($last_name) || empty($guardian_phone)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'Missing required fields (First name, Last name, and Guardian Phone).'
            ], 400);
        }

        $title = sprintf('%s %s - %s Admission Request', $first_name, $last_name, $grade);
        $content = "<h3>Admission Application Details</h3>\n";
        $content .= "<table style='border-collapse:collapse;width:100%;'>\n";
        $content .= "<tr><td style='border:1px solid #ddd;padding:8px;background:#f9f9f9;'><strong>First Name</strong></td><td style='border:1px solid #ddd;padding:8px;'>$first_name</td></tr>\n";
        $content .= "<tr><td style='border:1px solid #ddd;padding:8px;background:#f9f9f9;'><strong>Last Name</strong></td><td style='border:1px solid #ddd;padding:8px;'>$last_name</td></tr>\n";
        $content .= "<tr><td style='border:1px solid #ddd;padding:8px;background:#f9f9f9;'><strong>Date of Birth</strong></td><td style='border:1px solid #ddd;padding:8px;'>$dob</td></tr>\n";
        $content .= "<tr><td style='border:1px solid #ddd;padding:8px;background:#f9f9f9;'><strong>Applying Grade</strong></td><td style='border:1px solid #ddd;padding:8px;'>$grade</td></tr>\n";
        $content .= "<tr><td style='border:1px solid #ddd;padding:8px;background:#f9f9f9;'><strong>Stream</strong></td><td style='border:1px solid #ddd;padding:8px;'>$stream</td></tr>\n";
        $content .= "<tr><td style='border:1px solid #ddd;padding:8px;background:#f9f9f9;'><strong>Previous School</strong></td><td style='border:1px solid #ddd;padding:8px;'>$previous_school</td></tr>\n";
        $content .= "<tr><td style='border:1px solid #ddd;padding:8px;background:#f9f9f9;'><strong>Guardian Name</strong></td><td style='border:1px solid #ddd;padding:8px;'>$guardian_name</td></tr>\n";
        $content .= "<tr><td style='border:1px solid #ddd;padding:8px;background:#f9f9f9;'><strong>Guardian Phone</strong></td><td style='border:1px solid #ddd;padding:8px;'>$guardian_phone</td></tr>\n";
        $content .= "<tr><td style='border:1px solid #ddd;padding:8px;background:#f9f9f9;'><strong>Email</strong></td><td style='border:1px solid #ddd;padding:8px;'>$email</td></tr>\n";
        $content .= "<tr><td style='border:1px solid #ddd;padding:8px;background:#f9f9f9;'><strong>Address</strong></td><td style='border:1px solid #ddd;padding:8px;'>$address</td></tr>\n";
        $content .= "<tr><td style='border:1px solid #ddd;padding:8px;background:#f9f9f9;'><strong>Notes</strong></td><td style='border:1px solid #ddd;padding:8px;'>" . nl2br($notes) . "</td></tr>\n";
        $content .= "</table>\n";

        $post_id = wp_insert_post([
            'post_type' => self::CPT_INQUIRY,
            'post_title' => $title,
            'post_content' => $content,
            'post_status' => 'publish',
        ]);

        if (is_wp_error($post_id)) {
            return new WP_REST_Response([
                'success' => false,
                'message' => 'Failed to save application: ' . $post_id->get_error_message()
            ], 500);
        }

        update_post_meta($post_id, 'inquiry_student_name', "$first_name $last_name");
        update_post_meta($post_id, 'inquiry_grade', $grade);
        update_post_meta($post_id, 'inquiry_guardian_phone', $guardian_phone);
        update_post_meta($post_id, 'inquiry_email', $email);

        return new WP_REST_Response([
            'success' => true,
            'message' => 'Application submitted and saved successfully.'
        ], 200);
    }

    private function detect_notice_tag(int $post_id): string {
        $terms = wp_get_post_terms($post_id, self::TAX_NOTICE_TYPE, ['fields' => 'slugs']);
        $slug = $terms[0] ?? 'notice';
        return match ($slug) {
            'event' => 'Event',
            'result' => 'Result',
            default => 'Notice',
        };
    }

    private function month_day(string $date): array {
        $timestamp = strtotime($date) ?: time();
        return [
            'month' => date_i18n('M', $timestamp),
            'day' => date_i18n('d', $timestamp),
        ];
    }

    private function register_post_type(string $post_type, string $plural, string $singular, string $icon): void {
        register_post_type($post_type, [
            'labels' => [
                'name' => $plural,
                'singular_name' => $singular,
                'add_new_item' => 'Add New ' . $singular,
                'edit_item' => 'Edit ' . $singular,
                'new_item' => 'New ' . $singular,
                'view_item' => 'View ' . $singular,
                'search_items' => 'Search ' . $plural,
                'not_found' => 'No ' . strtolower($plural) . ' found',
            ],
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_rest' => true,
            'menu_icon' => $icon,
            'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes'],
            'has_archive' => true,
            'rewrite' => ['slug' => $post_type],
        ]);
    }

    private function register_taxonomy(string $taxonomy, array $post_types, string $label): void {
        register_taxonomy($taxonomy, $post_types, [
            'labels' => [
                'name' => $label,
                'singular_name' => rtrim($label, 's'),
            ],
            'public' => true,
            'hierarchical' => true,
            'show_ui' => true,
            'show_in_rest' => true,
            'rewrite' => ['slug' => $taxonomy],
        ]);
    }

    public static function activate(): void {
        self::seed_content();
        flush_rewrite_rules();
    }

    private static function seed_content(): void {
        if (get_option(self::SEED_LOCK_OPTION)) {
            return;
        }

        self::seed_taxonomy_terms();
        self::seed_notices();
        self::seed_principal();
        self::seed_programs();
        self::seed_facilities();
        self::seed_downloads();
        self::seed_gallery();
        self::seed_scholarships();
        self::seed_contact();
        self::seed_routine();
        self::seed_admission();
        update_option(self::SEED_LOCK_OPTION, 1, false);
    }

    private static function seed_taxonomy_terms(): void {
        $taxonomies = [
            self::TAX_NOTICE_TYPE => ['notice', 'event', 'result'],
            self::TAX_STAFF_ROLE => ['principal'],
            self::TAX_PROGRAM_LEVEL => ['primary', 'lower-secondary', 'secondary', 'plus-two'],
            self::TAX_FACILITY_GROUP => ['academic', 'sports', 'student-services'],
            self::TAX_DOWNLOAD_TYPE => ['forms', 'calendar', 'fees'],
            self::TAX_GALLERY_ALBUM => ['campus', 'activities', 'events'],
        ];

        foreach ($taxonomies as $taxonomy => $terms) {
            foreach ($terms as $term) {
                if (!term_exists($term, $taxonomy)) {
                    wp_insert_term(ucwords(str_replace(['-', '_'], ' ', $term)), $taxonomy, ['slug' => $term]);
                }
            }
        }
    }

    private static function seed_notices(): void {
        if (get_posts(['post_type' => self::CPT_NOTICE, 'numberposts' => 1, 'post_status' => 'any'])) {
            return;
        }

        $items = [
            ['title' => 'First Term Examination Routine 2083', 'type' => 'notice'],
            ['title' => 'Annual Sports Day Programme - Registration Open', 'type' => 'event'],
            ['title' => 'Parent-Teacher Meeting: All Grades', 'type' => 'notice'],
            ['title' => 'SEE Practical Examination Schedule Released', 'type' => 'result'],
            ['title' => 'Scholarship Application Form Available Now', 'type' => 'notice'],
            ['title' => 'Winter Break Notice and Holiday Calendar 2083', 'type' => 'notice'],
        ];

        foreach ($items as $index => $item) {
            $post_id = wp_insert_post([
                'post_type' => self::CPT_NOTICE,
                'post_status' => 'publish',
                'post_title' => $item['title'],
                'post_content' => 'Update this notice content from the WordPress admin.',
                'post_excerpt' => 'School notice',
                'menu_order' => $index,
            ]);
            if ($post_id) {
                wp_set_object_terms($post_id, $item['type'], self::TAX_NOTICE_TYPE, false);
            }
        }
    }

    private static function seed_principal(): void {
        if (get_posts(['post_type' => self::CPT_STAFF, 'numberposts' => 1, 'post_status' => 'any'])) {
            return;
        }

        $post_id = wp_insert_post([
            'post_type' => self::CPT_STAFF,
            'post_status' => 'publish',
            'post_title' => 'Hari Prasad Subedi',
            'post_content' => "Respected parents, teachers, staff and dear students,\n\nI warmly welcome you all to the official website of Chhetrapal Secondary School, the oldest and historical educational heritage of Nuwakot district.\n\nThe educational journey of this school, which began in 2016, is the result of the tireless efforts, sacrifice and dedication of the intellectuals, education lovers, respected parents and teachers of this area. Since its formal establishment as a secondary school on Chaitra 16, 2031, this school has succeeded in creating a distinct identity in the district in the field of quality education.\n\nOur main objective is not only to impart bookish knowledge, but also to make the students moral, self-reliant and socially responsible citizens by bringing out the hidden talent in them. With the changing times, we are modifying the physical and technical infrastructure of the school and adopting a technology-friendly and practical teaching method. As a result, our academic results have been consistently excellent.\n\nWe are always committed to the overall development of the school and the bright future of the students. We expect constructive advice, suggestions and continuous support from here to make the school more sophisticated and excellent.\n\nThank you.\n\nHari Prasad Subedi\nPrincipal\nChhetrapal Secondary School,\nLikhu 4, Chaughada Nuwakot, Nepal.",
            'post_excerpt' => 'Message from Principal',
            'menu_order' => 0,
        ]);
        if ($post_id) {
            wp_set_object_terms($post_id, 'principal', self::TAX_STAFF_ROLE, false);
            update_post_meta($post_id, 'chhetrapal_designation', 'Principal');
        }
    }

    private static function seed_programs(): void {
        if (get_posts(['post_type' => self::CPT_PROGRAM, 'numberposts' => 1, 'post_status' => 'any'])) {
            return;
        }

        $items = [
            ['title' => 'Primary Level', 'excerpt' => 'Class 1-5', 'subtitle' => 'Foundation of life-long learning', 'term' => 'primary'],
            ['title' => 'Lower Secondary', 'excerpt' => 'Class 6-8', 'subtitle' => 'Building analytical thinking', 'term' => 'lower-secondary'],
            ['title' => 'Secondary Level', 'excerpt' => 'Class 9-10', 'subtitle' => 'SEE Board Examination', 'term' => 'secondary'],
            ['title' => '+2 Level', 'excerpt' => 'Class 11-12', 'subtitle' => 'Science and Management Streams', 'term' => 'plus-two'],
        ];

        foreach ($items as $index => $item) {
            $post_id = wp_insert_post([
                'post_type' => self::CPT_PROGRAM,
                'post_status' => 'publish',
                'post_title' => $item['title'],
                'post_content' => 'Add a full description of this program from the admin panel.',
                'post_excerpt' => $item['excerpt'],
                'menu_order' => $index,
            ]);
            if ($post_id) {
                wp_set_object_terms($post_id, $item['term'], self::TAX_PROGRAM_LEVEL, false);
                update_post_meta($post_id, 'chhetrapal_subtitle', $item['subtitle']);
            }
        }
    }

    private static function seed_facilities(): void {
        if (get_posts(['post_type' => self::CPT_FACILITY, 'numberposts' => 1, 'post_status' => 'any'])) {
            return;
        }

        $items = [
            ['title' => 'Library', 'excerpt' => 'Reading and reference books', 'term' => 'academic'],
            ['title' => 'Science Lab', 'excerpt' => 'Hands-on science practice', 'term' => 'academic'],
            ['title' => 'Computer Lab', 'excerpt' => 'Digital learning space', 'term' => 'academic'],
            ['title' => 'Sports Ground', 'excerpt' => 'Play and physical activities', 'term' => 'sports'],
            ['title' => 'Art Room', 'excerpt' => 'Creative learning activities', 'term' => 'student-services'],
            ['title' => 'Canteen', 'excerpt' => 'Student refreshment area', 'term' => 'student-services'],
        ];

        foreach ($items as $index => $item) {
            $post_id = wp_insert_post([
                'post_type' => self::CPT_FACILITY,
                'post_status' => 'publish',
                'post_title' => $item['title'],
                'post_content' => 'Add a detailed facility description from the WordPress admin.',
                'post_excerpt' => $item['excerpt'],
                'menu_order' => $index,
            ]);
            if ($post_id) {
                wp_set_object_terms($post_id, $item['term'], self::TAX_FACILITY_GROUP, false);
            }
        }
    }

    private static function seed_downloads(): void {
        if (get_posts(['post_type' => self::CPT_DOWNLOAD, 'numberposts' => 1, 'post_status' => 'any'])) {
            return;
        }

        $items = [
            ['title' => 'Admission Form 2083', 'excerpt' => 'Editable admission form', 'term' => 'forms'],
            ['title' => 'School Prospectus', 'excerpt' => 'Current school prospectus', 'term' => 'forms'],
            ['title' => 'Academic Calendar 2083', 'excerpt' => 'Yearly academic calendar', 'term' => 'calendar'],
            ['title' => 'Fee Structure 2083', 'excerpt' => 'Updated fee structure', 'term' => 'fees'],
        ];

        foreach ($items as $index => $item) {
            $post_id = wp_insert_post([
                'post_type' => self::CPT_DOWNLOAD,
                'post_status' => 'publish',
                'post_title' => $item['title'],
                'post_content' => 'Upload the document to Media Library and add the file URL here.',
                'post_excerpt' => $item['excerpt'],
                'menu_order' => $index,
            ]);
            if ($post_id) {
                wp_set_object_terms($post_id, $item['term'], self::TAX_DOWNLOAD_TYPE, false);
                update_post_meta($post_id, 'chhetrapal_file_label', 'Download');
            }
        }
    }

    private static function seed_gallery(): void {
        if (get_posts(['post_type' => self::CPT_GALLERY, 'numberposts' => 1, 'post_status' => 'any'])) {
            return;
        }

        $items = [
            ['title' => 'Campus View', 'excerpt' => 'School building and grounds', 'term' => 'campus'],
            ['title' => 'Classroom Activity', 'excerpt' => 'Students learning together', 'term' => 'activities'],
            ['title' => 'Science Demonstration', 'excerpt' => 'Lab-based learning activity', 'term' => 'activities'],
            ['title' => 'Annual Sports Day', 'excerpt' => 'Games and events', 'term' => 'events'],
            ['title' => 'School Assembly', 'excerpt' => 'Morning assembly image', 'term' => 'events'],
            ['title' => 'Project Presentation', 'excerpt' => 'Student projects', 'term' => 'activities'],
        ];

        foreach ($items as $index => $item) {
            $post_id = wp_insert_post([
                'post_type' => self::CPT_GALLERY,
                'post_status' => 'publish',
                'post_title' => $item['title'],
                'post_content' => 'Upload a gallery image and use the featured image to sync it to the frontend.',
                'post_excerpt' => $item['excerpt'],
                'menu_order' => $index,
            ]);
            if ($post_id) {
                wp_set_object_terms($post_id, $item['term'], self::TAX_GALLERY_ALBUM, false);
            }
        }
    }

    private static function seed_contact(): void {
        if (get_posts(['post_type' => self::CPT_CONTACT, 'numberposts' => 1, 'post_status' => 'any'])) {
            return;
        }

        $post_id = wp_insert_post([
            'post_type' => self::CPT_CONTACT,
            'post_status' => 'publish',
            'post_title' => 'School Contact Information',
            'post_content' => 'Likhu Rural Municipality Ward no. 4, Chaughada Nuwakot, Bagmati Province, Nepal',
            'post_excerpt' => 'Contact information for the school office.',
            'menu_order' => 0,
        ]);
        if ($post_id) {
            update_post_meta($post_id, 'chhetrapal_phone', '9851181243');
            update_post_meta($post_id, 'chhetrapal_email', 'info@chhetrapalschool.edu.np');
            update_post_meta($post_id, 'chhetrapal_address', 'Likhu Rural Municipality Ward no. 4, Chaughada Nuwakot, Bagmati Province, Nepal');
            update_post_meta($post_id, 'chhetrapal_map_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.925360626243!2d85.2387678754744!3d27.904263726070322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eadfa5e05bbc35%3A0x3eb57e2564e36dd4!2sShree%20Kshetrapal%20Uchcha%20Madhyamik%20Bidyalaya!5e0!3m2!1sen!2snp!4v1776366200281!5m2!1sen!2snp');
            update_post_meta($post_id, 'chhetrapal_facebook_url', 'https://www.facebook.com/chhetrapal.mavi/');
            update_post_meta($post_id, 'chhetrapal_youtube_url', 'https://www.youtube.com/@kshetrapalbasicschool6645');
            update_post_meta($post_id, 'chhetrapal_twitter_url', 'https://twitter.com');
            update_post_meta($post_id, 'chhetrapal_privacy_policy', "This Privacy Policy describes how Chhetrapal Secondary School collects, uses, and safeguards personal information provided by students, parents, and visitors.\n\nWe collect personal information when you use our Online Admission portal, submit enquiries, or communicate with the school. This includes contact information (such as name, phone number, and email address), student academic records, birth dates, and guardian details.\n\nThe collected information is used solely for school administration, academic evaluations, admission processing, and communication. We do not sell or share your personal details with third-party advertising services.\n\nWe implement appropriate physical, technical, and administrative security measures to protect your data from unauthorized access, alteration, or disclosure. Online application data is stored securely and accessed only by authorized school personnel.\n\nOur website uses basic functional cookies to facilitate navigation and support language preferences (such as translating page contents into Nepali). No invasive tracking cookies are used.");
        }
    }

    private static function seed_routine(): void {
        if (get_posts(['post_type' => self::CPT_ROUTINE, 'numberposts' => 1, 'post_status' => 'any'])) {
            return;
        }

        $items = [
            ['day' => 'Sunday', 'p1' => 'English', 'p2' => 'Math', 'p3' => 'Science', 'p4' => 'Social', 'p5' => 'Nepali'],
            ['day' => 'Monday', 'p1' => 'Math', 'p2' => 'Science', 'p3' => 'Computer', 'p4' => 'Health', 'p5' => 'English'],
            ['day' => 'Tuesday', 'p1' => 'Nepali', 'p2' => 'Math', 'p3' => 'GK', 'p4' => 'Science', 'p5' => 'Social'],
            ['day' => 'Wednesday', 'p1' => 'Science', 'p2' => 'English', 'p3' => 'Math', 'p4' => 'Computer', 'p5' => 'Library'],
            ['day' => 'Thursday', 'p1' => 'Social', 'p2' => 'Health', 'p3' => 'Math', 'p4' => 'English', 'p5' => 'ECA'],
            ['day' => 'Friday', 'p1' => 'Revision', 'p2' => 'Test', 'p3' => 'Project', 'p4' => 'Club', 'p5' => 'Sports'],
        ];

        foreach ($items as $index => $item) {
            $post_id = wp_insert_post([
                'post_type' => self::CPT_ROUTINE,
                'post_status' => 'publish',
                'post_title' => $item['day'],
                'menu_order' => $index,
            ]);
            if ($post_id) {
                update_post_meta($post_id, 'chhetrapal_period_1', $item['p1']);
                update_post_meta($post_id, 'chhetrapal_period_2', $item['p2']);
                update_post_meta($post_id, 'chhetrapal_period_3', $item['p3']);
                update_post_meta($post_id, 'chhetrapal_period_4', $item['p4']);
                update_post_meta($post_id, 'chhetrapal_period_5', $item['p5']);
            }
        }
    }

    private static function seed_admission(): void {
        if (get_posts(['post_type' => self::CPT_ADMISSION, 'numberposts' => 1, 'post_status' => 'any'])) {
            return;
        }

        $post_id = wp_insert_post([
            'post_type' => self::CPT_ADMISSION,
            'post_status' => 'publish',
            'post_title' => 'Admissions Open!',
            'post_content' => 'Academic Year 2026/2027',
        ]);
        if ($post_id) {
            update_post_meta($post_id, 'chhetrapal_admission_status', 'open');
            update_post_meta($post_id, 'chhetrapal_admission_classes', 'Class 1-5 (Primary), Class 6-8 (Lower Sec.), Class 9-10 (SEE), Class 11-12 (+2)');
            update_post_meta($post_id, 'chhetrapal_admission_notice_url', '');
        }
    }

    private static function seed_scholarships(): void {
        if (get_posts(['post_type' => self::CPT_SCHOLARSHIP, 'numberposts' => 1, 'post_status' => 'any'])) {
            return;
        }

        $items = [
            [
                'name' => 'Sujan Bhandari',
                'title' => 'District Merit Scholarship',
                'year' => '2025',
                'details' => 'Awarded for outstanding SEE results and consistent academic excellence.',
            ],
            [
                'name' => 'Nisha Gurung',
                'title' => 'Girls in STEM Scholarship',
                'year' => '2025',
                'details' => 'Recognized for exceptional performance in science and mathematics.',
            ],
            [
                'name' => 'Prabin Tamang',
                'title' => 'Community Leadership Grant',
                'year' => '2024',
                'details' => 'Honored for community service and leadership in youth programs.',
            ],
        ];

        foreach ($items as $index => $item) {
            $post_id = wp_insert_post([
                'post_type' => self::CPT_SCHOLARSHIP,
                'post_status' => 'publish',
                'post_title' => $item['name'],
                'post_content' => $item['details'],
                'post_excerpt' => $item['title'],
                'menu_order' => $index,
            ]);

            if ($post_id) {
                update_post_meta($post_id, 'chhetrapal_scholarship_year', $item['year']);
            }
        }
    }

    public function restrict_rest_api_access($result) {
        if (!empty($result)) {
            return $result;
        }

        if (is_user_logged_in()) {
            return $result;
        }

        $route = isset($GLOBALS['wp']->query_vars['rest_route']) ? $GLOBALS['wp']->query_vars['rest_route'] : '';
        if (empty($route) && isset($_SERVER['REQUEST_URI'])) {
            $route = (string) $_SERVER['REQUEST_URI'];
        }

        $restricted_patterns = [
            '#/wp/v2/users#i',
            '#/wp/v2/comments#i',
            '#/wp/v2/settings#i',
        ];

        foreach ($restricted_patterns as $pattern) {
            if (preg_match($pattern, $route)) {
                return new WP_Error(
                    'rest_forbidden',
                    'Access to this endpoint is restricted for security.',
                    ['status' => 403]
                );
            }
        }

        return $result;
    }
}

Chhetrapal_School_CMS::boot();
