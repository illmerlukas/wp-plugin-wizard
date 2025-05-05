<?php
/**
 * Plugin Name: Russmedia Test Plugin
 * Plugin URI: 
 * Description: A test plugin
 * Author: Lukas Illmer
 * Author URI: https://russmedia.com
 * Text Domain: russmedia-test-plugin
 * Version: 1.0.0
 *
 * @package Russmedia_Test_Plugin
 */

namespace Russmedia\Test_Plugin;

define( 'RUSSMEDIA_TEST_PLUGIN_PLUGIN_BASEDIR', dirname( plugin_basename( __FILE__ ) ) );
define( 'RUSSMEDIA_TEST_PLUGIN_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'RUSSMEDIA_TEST_PLUGIN_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once RUSSMEDIA_TEST_PLUGIN_PLUGIN_DIR . 'classes/autoloader.php';

new Russmedia_Test_Plugin();
