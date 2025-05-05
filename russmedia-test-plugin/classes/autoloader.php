<?php
/**
 * Based on Tom McFarlins "Simple Autoloader for WordPress"
 * Kudos: https://github.com/tommcfarlin/simple-autoloader-for-wordpress/
 *
 * @package Russmedia_Test_Plugin
 */

spl_autoload_register(
	function( $class_name ) {
		$known_prefix = 'Russmedia\\Test_Plugin\\';
		// Does the reqeusted class use the known namespace prefix?
		if ( strpos( $class_name, $known_prefix ) === false ) {
			return;
		}

		// Separate the components of the incoming file.
		$file_path = explode( '\\', $class_name );

		// Get the last index of the array. This is the class we're loading.
		$file_name = '';
		if ( isset( $file_path[ count( $file_path ) - 1 ] ) ) {
			$file_name = strtolower(
				$file_path[ count( $file_path ) - 1 ]
			);

			$file_name       = str_ireplace( '_', '-', $file_name );
			$file_name_parts = explode( '-', $file_name );

			$interface_index = array_search( 'interface', $file_name_parts, true );
			$trait_index     = array_search( 'trait', $file_name_parts, true );
			if ( false !== $interface_index ) {
				// Remove the 'interface' part.
				unset( $file_name_parts[ $interface_index ] );
				// Rebuild the file name.
				$file_name = implode( '-', $file_name_parts );
				$file_name = "interface-{$file_name}.php";
			} elseif ( false !== $trait_index ) {
				// Remove the 'trait' part.
				unset( $file_name_parts[ $trait_index ] );
				// Rebuild the file name.
				$file_name = implode( '-', $file_name_parts );
				$file_name = "trait-{$file_name}.php";
			} else {
				$file_name = "class-$file_name.php";
			}
		}

		$fully_qualified_path = trailingslashit( RUSSMEDIA_TEST_PLUGIN_PLUGIN_DIR . 'classes' );

		$c = count( $file_path );
		for ( $i = 2; $i < $c - 1; $i++ ) {
			$dir                   = $file_path[ $i ];
			$fully_qualified_path .= trailingslashit( $dir );
		}

		$fully_qualified_path .= $file_name;

		// Now include the file.
		if ( stream_resolve_include_path( $fully_qualified_path ) ) {
			include_once $fully_qualified_path;
		}
	}
);
