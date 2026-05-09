<?php
/**
 * Plugin Name: Chhetrapal School CMS Bootstrap
 * Description: Automatically loads the Chhetrapal School CMS plugin in Docker.
 */

if (!defined('ABSPATH')) {
    exit;
}

$plugin_path = WP_PLUGIN_DIR . '/chhetrapal-school-cms/chhetrapal-school-cms.php';
if (file_exists($plugin_path)) {
    require_once $plugin_path;
}
