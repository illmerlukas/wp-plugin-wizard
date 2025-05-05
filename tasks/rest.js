/**
 * REST API prompts
 */
export const prompts = [
  {
    type: 'confirm',
    name: 'restEndpoints',
    message: 'Do you want to add REST Endpoints?',
  },
];

/**
 * REST endpoint actions to create REST API files
 * @param {object} data - User inputs from prompts
 * @returns {array} Actions to perform
 */
export const actions = (data) => {
  if (!data.restEndpoints) {
    return [];
  }

  return [
    {
      type: 'add',
      path: '{{pluginSlug}}/classes/Rest/class-rest-endpoints.php',
      templateFile: 'templates/classes/Rest/class-rest-endpoints.php.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/classes/Rest/Endpoints/V1/class-get-example.php',
      templateFile:
        'templates/classes/Rest/Endpoints/V1/class-get-example.php.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/classes/Rest/Endpoints/class-abstract-endpoint.php',
      templateFile:
        'templates/classes/Rest/Endpoints/class-abstract-endpoint.php.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/classes/Rest/Endpoints/interface-endpoint.php',
      templateFile:
        'templates/classes/Rest/Endpoints/interface-endpoint.php.hbs',
    },
    // Test files
    {
      type: 'add',
      path: '{{pluginSlug}}/tests/test-class-utils.php',
      templateFile: 'templates/tests/test-class-utils.php.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/tests/Rest/test-class-rest-endpoints.php',
      templateFile: 'templates/tests/Rest/test-class-rest-endpoints.php.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/tests/Rest/Endpoints/V1/test-class-get-example.php',
      templateFile:
        'templates/tests/Rest/Endpoints/V1/test-class-get-example.php.hbs',
    },
  ];
};

// Default export for backward compatibility
export default { prompts, actions };
