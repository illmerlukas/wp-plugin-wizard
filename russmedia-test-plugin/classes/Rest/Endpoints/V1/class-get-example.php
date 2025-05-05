<?php
/**
 * File for the Media Pocket asset endpoint.
 *
 * @package     Russmedia_Test_Plugin
 */

namespace Russmedia\Test_Plugin\Rest\Endpoints\V1;

use Russmedia\Test_Plugin\Rest\Endpoints\Abstract_Endpoint;

use stdClass;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

/**
 * Get_Example REST API endpoint
 */
class Get_Example extends Abstract_Endpoint {

	/**
	 * Arguments definition for the endpoint.
	 *
	 * @access protected
	 * @var array
	 */
	protected $arguments = array();

	/**
	 * Methods definition of the endpoint.
	 *
	 * @access protected
	 * @var string
	 */
	protected $methods = WP_REST_Server::READABLE;

	/**
	 * Path definition of the endpoint.
	 *
	 * @access protected
	 * @var string
	 */
	protected $path = 'example';

	/**
	 * Constructor with settings.
	 *
	 * @access public
	 * @param Settings      $settings The settings.
	 * @param Media_Upload  $media_upload The upload image class.
	 * @param Utils         $utils The utils.
	 * @param API_Connector $api_connector The API connector.
	 * @param Scheduler     $scheduler The scheduler class.
	 * @param Log_Provider  $log_provider The log provider.
	 *
	 * @return void
	 */
	public function __construct( Settings $settings, Utils $utils ) {
		parent::__construct( $settings, $utils );

		$this->arguments = array(
			'term'  => array(
				'type'     => 'string',
				'required' => true,
			),
		);
	}

	/**
	 * Handle get request.
	 *
	 * @param  WP_REST_Request $request The REST request.
	 * @return WP_REST_Response|WP_Error The REST response.
	 */
	public function respond( WP_REST_Request $request ) {
		$parameters = $this->filter_request_parameters( $request, $this->arguments );

		$result         = new stdClass();
		$result->status = 'ok';
		$result->data   = array(
			'term'    => $parameters['term'] ?? 'no term',
			'message' => 'Hello World',
		);

		return new WP_REST_Response( $result, 200 );
	}
}
