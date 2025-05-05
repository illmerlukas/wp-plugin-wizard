<?php
/**
 * File for defining the Editor Extensions class.
 *
 * @package     Russmedia_Test_Plugin
 */

namespace Russmedia\Test_Plugin\Admin;

use Russmedia\Test_Plugin\Settings;

/**
 * Editor Extensions.
 */
class Editor_Extensions {

	/**
	 * The plugin settings class.
	 *
	 * @var Settings
	 */
	private $settings;


	/**
	 * Constructor - initialize the settings and define (admin) hooks for handling the settings page.
	 *
	 * @param Settings $settings The settings.
	 *
	 * @access public
	 * @return void
	 */
	public function __construct( Settings $settings ) {
		$this->settings = $settings;

		$this->define_hooks();
	}

	/**
	 * Define hooks for registering our settings and the options page.
	 *
	 * @access public
	 * @return void
	 */
	public function define_hooks() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_assets' ) );
		add_action( 'init', array( $this, 'register_block_types' ) );
		add_filter( 'block_categories_all', array( $this, 'add_new_block_category' ), 10, 2 );
	}

	/**
	 * Enqueue assets for the Gutenberg post editor.
	 *
	 * @access public
	 * @return void
	 */
	public function enqueue_assets() {
		$screen = get_current_screen();

		if ( ! is_object( $screen ) || ! in_array( $screen->id, get_post_types_by_support( 'editor' ), true ) ) {
			return;
		}

		wp_enqueue_style(
			$this->settings->get_option_group(),
			RUSSMEDIA_TEST_PLUGIN_PLUGIN_URL . 'build/index.css',
			array( 'wp-components' ),
			filemtime( RUSSMEDIA_TEST_PLUGIN_PLUGIN_DIR . 'build/index.css' ),
		);

		wp_enqueue_script(
			$this->settings->get_option_group(),
			RUSSMEDIA_TEST_PLUGIN_PLUGIN_URL . 'build/index.js',
			array( 'wp-plugins', 'wp-edit-post', 'wp-i18n', 'wp-element' ),
			filemtime( RUSSMEDIA_TEST_PLUGIN_PLUGIN_DIR . 'build/index.js' ),
			array(
				'in_footer' => true,
			)
		);

		wp_set_script_translations( $this->settings->get_option_group(), 'russmedia-test-plugin', RUSSMEDIA_TEST_PLUGIN_PLUGIN_DIR . 'lang' );
	}

	/**
	 * Registers a custom block type.
	 *
	 * @return void
	 */
	public function register_block_types() {
		register_block_type_from_metadata(
			RUSSMEDIA_TEST_PLUGIN_PLUGIN_DIR . 'src/blocks/example-block/block.json',
			array(
				'title'       => _x( 'Example Block', 'block title', 'russmedia-test-plugin' ),
				'description' => _x( 'An example block.', 'block description', 'russmedia-test-plugin' ),
				'keywords'    => array(
					_x( 'example', 'block keyword', 'russmedia-test-plugin' ),
					_x( 'example block', 'block keyword', 'russmedia-test-plugin' ),
				),
			)
		);
	}

	/**
	 * Adding a new (custom) block category.
	 *
	 * @param   array                           $block_categories  Array of categories for block types.
	 * @param   \WP_Block_Editor_Context|string $block_editor_context  The current block editor context, or a string defining the context.
	 * @return  array                           Updated array of categories for block types.
	 */
	public function add_new_block_category( $block_categories, $block_editor_context ) {
		$category_name = 'russmedia';

		// Only add the new category for 'post' post type.
		if ( empty( $block_editor_context->post->post_type ) || 'post' !== $block_editor_context->post->post_type ) {
			return $block_categories;
		}

		// Do not add the new category if it already exists.
		foreach ( $block_categories as $block_category ) {
			if ( $block_category['slug'] === $category_name ) {
				return $block_categories;
			}
		}

		$block_categories[] = array(
			'slug'  => $category_name,
			'title' => esc_html__( 'Russmedia', 'russmedia-test-plugin' ),
			'icon'  => 'wordpress',
		);

		return $block_categories;
	}
}
