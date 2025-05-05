<?php
/**
 * File for Endpoint interface definition.
 *
 * @package     Russmedia_Test_Plugin
 */

namespace Russmedia\Test_Plugin\Rest\Endpoints;

use WP_REST_Request;

/**
 * Interface for a WordPress REST API endpoint.
 */
interface Interface_Endpoint {

	/**
	 * Get the expected arguments for the REST API endpoint.
	 *
	 * @return array
	 */
	public function get_arguments();

	/**
	 * Get the callback used by the REST API endpoint.
	 *
	 * @return callable
	 */
	public function get_callback();

	/**
	 * Get the HTTP methods that the REST API endpoint responds to.
	 *
	 * @return mixed
	 */
	public function get_methods();

	/**
	 * Get the path pattern of the REST API endpoint.
	 *
	 * @return string
	 */
	public function get_path();

	/**
	 * Get the callback used to validate a request to the REST API endpoint.
	 *
	 * @return callable
	 */
	public function get_permission_callback();

	/**
	 * This method should actually handle the response.
	 *
	 * @param WP_REST_Request $request The REST request.
	 * @return mixed
	 */
	public function respond( WP_REST_Request $request );
}
