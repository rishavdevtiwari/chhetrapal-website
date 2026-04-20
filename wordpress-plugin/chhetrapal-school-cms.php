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
    private const CPT_NOTICE = 'chhetrapal_notice';
    private const CPT_STAFF = 'chhetrapal_staff';
    private const CPT_PROGRAM = 'chhetrapal_program';
    private const CPT_FACILITY = 'chhetrapal_facility';
    private const CPT_DOWNLOAD = 'chhetrapal_download';
    private const CPT_GALLERY = 'chhetrapal_gallery';
    private const CPT_CONTACT = 'chhetrapal_contact';

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
        add_action('template_redirect', [$instance, 'redirect_wordpress_frontend']);
        add_action('add_meta_boxes', [$instance, 'register_meta_boxes']);
        add_action('save_post', [$instance, 'save_meta_boxes']);
        add_action('rest_api_init', [$instance, 'register_rest_routes']);
        add_action('wp_dashboard_setup', [$instance, 'register_dashboard_widget']);
        add_action('admin_menu', [$instance, 'register_admin_pages']);
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

        $this->register_taxonomy(self::TAX_NOTICE_TYPE, [self::CPT_NOTICE], 'Notice Types');
        $this->register_taxonomy(self::TAX_STAFF_ROLE, [self::CPT_STAFF], 'Staff Roles');
        $this->register_taxonomy(self::TAX_PROGRAM_LEVEL, [self::CPT_PROGRAM], 'Program Levels');
        $this->register_taxonomy(self::TAX_FACILITY_GROUP, [self::CPT_FACILITY], 'Facility Groups');
        $this->register_taxonomy(self::TAX_DOWNLOAD_TYPE, [self::CPT_DOWNLOAD], 'Download Types');
        $this->register_taxonomy(self::TAX_GALLERY_ALBUM, [self::CPT_GALLERY], 'Gallery Albums');
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
        register_post_meta(self::CPT_STAFF, 'chhetrapal_designation', $meta_args);
        register_post_meta(self::CPT_PROGRAM, 'chhetrapal_subtitle', $meta_args);
        register_post_meta(self::CPT_FACILITY, 'chhetrapal_subtitle', $meta_args);
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

        echo '<p><label for="chhetrapal_phone"><strong>Phone</strong></label><br />';
        echo '<input type="text" id="chhetrapal_phone" name="chhetrapal_phone" value="' . esc_attr($phone) . '" class="widefat" /></p>';
        echo '<p><label for="chhetrapal_email"><strong>Email</strong></label><br />';
        echo '<input type="email" id="chhetrapal_email" name="chhetrapal_email" value="' . esc_attr($email) . '" class="widefat" /></p>';
        echo '<p><label for="chhetrapal_address"><strong>Address</strong></label><br />';
        echo '<textarea id="chhetrapal_address" name="chhetrapal_address" class="widefat" rows="3">' . esc_textarea($address) . '</textarea></p>';
        echo '<p><label for="chhetrapal_map_url"><strong>Google Maps embed URL</strong></label><br />';
        echo '<input type="url" id="chhetrapal_map_url" name="chhetrapal_map_url" value="' . esc_attr($map_url) . '" class="widefat" placeholder="https://www.google.com/maps/embed?..." /></p>';
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
            update_post_meta($post_id, 'chhetrapal_phone', $phone);
            update_post_meta($post_id, 'chhetrapal_email', $email);
            update_post_meta($post_id, 'chhetrapal_address', $address);
            update_post_meta($post_id, 'chhetrapal_map_url', $map_url);
        }
    }

    public function register_rest_routes(): void {
        register_rest_route('chhetrapal/v1', '/homepage', [
            'methods' => WP_REST_Server::READABLE,
            'callback' => [$this, 'build_homepage_payload'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function build_homepage_payload(WP_REST_Request $request): WP_REST_Response {
        $payload = [
            'hero' => [
                'eyebrow' => get_bloginfo('name'),
                'title' => get_bloginfo('name'),
                'subtitle' => get_bloginfo('description'),
                'description' => 'A CMS-managed school website for notices, staff, facilities, downloads, and contact updates.',
            ],
            'notices' => $this->build_notice_items(),
            'principal' => $this->build_principal(),
            'programs' => $this->build_programs(),
            'facilities' => $this->build_facilities(),
            'downloads' => $this->build_downloads(),
            'gallery' => $this->build_gallery_items(),
            'contact' => $this->build_contact_card(),
            'stats' => [
                ['value' => '1,200+', 'label' => 'Students'],
                ['value' => '55+', 'label' => 'Expert Staff'],
                ['value' => '98%', 'label' => 'Pass Rate'],
                ['value' => '35+', 'label' => 'Years Legacy'],
            ],
        ];

        $response = rest_ensure_response($payload);
        $response->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
        $response->header('Pragma', 'no-cache');

        return $response;
    }

    private function build_notice_items(): array {
        $posts = get_posts([
            'post_type' => self::CPT_NOTICE,
            'post_status' => 'publish',
            'numberposts' => 6,
            'orderby' => 'date',
            'order' => 'DESC',
        ]);

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
                'tag' => $this->detect_notice_tag($post->ID),
                'link' => get_permalink($post),
            ];
        }

        return $items;
    }

    private function build_principal(): array {
        $post = $this->first_post_by_role(self::CPT_STAFF, self::TAX_STAFF_ROLE, 'principal');
        if (!$post) {
            $post = $this->first_post(self::CPT_STAFF);
        }
        if (!$post) {
            return [
                'name' => 'Principal',
                'title' => 'Principal',
                'message' => 'Please add the principal message in WordPress admin.',
                'photoUrl' => '',
                'designation' => 'Principal',
                'link' => '',
            ];
        }

        return [
            'name' => get_the_title($post),
            'title' => get_the_title($post),
            'message' => apply_filters('the_content', $post->post_content),
            'photoUrl' => get_the_post_thumbnail_url($post, 'full') ?: '',
            'designation' => get_post_meta($post->ID, 'chhetrapal_designation', true) ?: 'Principal',
            'link' => get_permalink($post),
        ];
    }

    private function build_programs(): array {
        return $this->build_collection(self::CPT_PROGRAM, function (WP_Post $post): array {
            return [
                'label' => get_the_title($post),
                'desc' => get_the_excerpt($post) ?: 'Program',
                'sub' => get_post_meta($post->ID, 'chhetrapal_subtitle', true) ?: wp_trim_words(wp_strip_all_tags($post->post_content), 12),
                'imageUrl' => get_the_post_thumbnail_url($post, 'full') ?: '',
                'link' => get_permalink($post),
            ];
        }, 4);
    }

    private function build_facilities(): array {
        return $this->build_collection(self::CPT_FACILITY, function (WP_Post $post): array {
            return [
                'label' => get_the_title($post),
                'desc' => get_the_excerpt($post) ?: 'Facility',
                'sub' => get_post_meta($post->ID, 'chhetrapal_subtitle', true) ?: '',
                'imageUrl' => get_the_post_thumbnail_url($post, 'full') ?: '',
                'link' => get_permalink($post),
            ];
        }, 6);
    }

    private function build_downloads(): array {
        return $this->build_collection(self::CPT_DOWNLOAD, function (WP_Post $post): array {
            $file_url = get_post_meta($post->ID, 'chhetrapal_file_url', true);
            $label = get_post_meta($post->ID, 'chhetrapal_file_label', true);
            return [
                'title' => get_the_title($post),
                'desc' => get_the_excerpt($post) ?: 'Download document',
                'buttonLabel' => $label ?: 'Download',
                'fileUrl' => $file_url ?: get_permalink($post),
                'imageUrl' => get_the_post_thumbnail_url($post, 'full') ?: '',
            ];
        }, 4);
    }

    private function build_gallery_items(): array {
        return $this->build_collection(self::CPT_GALLERY, function (WP_Post $post): array {
            return [
                'src' => get_the_post_thumbnail_url($post, 'full') ?: '',
                'alt' => get_the_title($post),
                'title' => get_the_title($post),
                'link' => get_permalink($post),
            ];
        }, 6);
    }

    private function build_contact_card(): array {
        $post = $this->first_post(self::CPT_CONTACT);
        if (!$post) {
            return [
                'address' => 'Chhetrapal, Nuwakot, Bagmati Province, Nepal',
                'phone' => '+977-10-XXXXXXXX',
                'email' => 'info@chhetrapalschool.edu.np',
                'mapUrl' => '',
                'link' => '',
            ];
        }

        return [
            'address' => get_post_meta($post->ID, 'chhetrapal_address', true) ?: wp_strip_all_tags($post->post_content),
            'phone' => get_post_meta($post->ID, 'chhetrapal_phone', true),
            'email' => get_post_meta($post->ID, 'chhetrapal_email', true),
            'mapUrl' => get_post_meta($post->ID, 'chhetrapal_map_url', true),
            'link' => get_permalink($post),
        ];
    }

    private function build_collection(string $post_type, callable $transform, int $limit): array {
        $posts = get_posts([
            'post_type' => $post_type,
            'post_status' => 'publish',
            'numberposts' => $limit,
            'orderby' => 'menu_order date',
            'order' => 'ASC',
        ]);

        return array_map($transform, $posts);
    }

    private function first_post(string $post_type): ?WP_Post {
        $posts = get_posts([
            'post_type' => $post_type,
            'post_status' => 'publish',
            'numberposts' => 1,
            'orderby' => 'date',
            'order' => 'DESC',
        ]);

        return $posts[0] ?? null;
    }

    private function first_post_by_role(string $post_type, string $taxonomy, string $term_slug): ?WP_Post {
        $posts = get_posts([
            'post_type' => $post_type,
            'post_status' => 'publish',
            'numberposts' => 1,
            'tax_query' => [[
                'taxonomy' => $taxonomy,
                'field' => 'slug',
                'terms' => $term_slug,
            ]],
        ]);

        return $posts[0] ?? null;
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
        self::seed_taxonomy_terms();
        self::seed_notices();
        self::seed_principal();
        self::seed_programs();
        self::seed_facilities();
        self::seed_downloads();
        self::seed_gallery();
        self::seed_contact();
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
            'post_title' => 'Mr. Ram Bahadur Thapa',
            'post_content' => 'Education is the most powerful weapon which you can use to change the world. At Chhetrapal Secondary School, we are committed to delivering knowledge, nurturing talent, and building character in every student who crosses our doors.',
            'post_excerpt' => 'Principal',
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
            'post_content' => 'Chhetrapal, Nuwakot, Bagmati Province, Nepal',
            'post_excerpt' => 'Contact information for the school office.',
            'menu_order' => 0,
        ]);
        if ($post_id) {
            update_post_meta($post_id, 'chhetrapal_phone', '+977-10-XXXXXXXX');
            update_post_meta($post_id, 'chhetrapal_email', 'info@chhetrapalschool.edu.np');
            update_post_meta($post_id, 'chhetrapal_address', 'Chhetrapal, Nuwakot\nBagmati Province, Nepal');
            update_post_meta($post_id, 'chhetrapal_map_url', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.925360626243!2d85.2387678754744!3d27.904263726070322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eadfa5e05bbc35%3A0x3eb57e2564e36dd4!2sShree%20Kshetrapal%20Uchcha%20Madhyamik%20Bidyalaya!5e0!3m2!1sen!2snp!4v1776366200281!5m2!1sen!2snp');
        }
    }
}

Chhetrapal_School_CMS::boot();
