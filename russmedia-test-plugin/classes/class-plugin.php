<?php
/**
 * File for defining the core plugin class.
 *
 * @package     Russmedia_Test_Plugin
 */

namespace Russmedia\Test_Plugin;

use Russmedia\Test_Plugin\Settings;
use Russmedia\Test_Plugin\Rest;
use Russmedia\Test_Plugin\Utils;

/**
 * Core plugin.
 */
class Plugin {

	/**
	 * The settings class.
	 *
	 * @access public
	 * @var    Settings  $settings  The settings class instance.
	 */
	public $settings;

    /**
	 * The utils class.
	 *
	 * @access public
	 * @var    Utils  $utils  The utils class instance.
	 */
	public $utils;

	/**
	 * The REST endpoints.
	 *
	 * @access public
	 * @var    Rest\Rest_Endpoints  $rest_endpoints  The REST endpoints class instance.
	 */
	public $rest_endpoints;

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->settings = new Settings();

		$this->define_hooks();
	}

	/**
	 * Define core plugin hooks.
	 *
	 * @access public
	 */
	public function define_hooks() {
		add_action( 'plugins_loaded', array( $this, 'init' ) );
	}

	/**
	 * Initialize the plugin.
	 *
	 * @access public
	 */
	public function init() {
		load_plugin_textdomain( 'russmedia-test-plugin', false, RUSSMEDIA_TEST_PLUGIN_PLUGIN_BASEDIR . '/lang' );

		$this->utils = new Utils();
		$this->rest_endpoints = new Rest\Rest_Endpoints( $this->settings, $this->utils );
	}
}
