/**
 * Plugin base prompts
 */
export const prompts = [
  {
    type: 'input',
    name: 'pluginSlug',
    message: 'Plugin slug (e.g., my-awesome-plugin):',
    default: 'russmedia-test-plugin',
  },
  {
    type: 'input',
    name: 'pluginName',
    message: 'Plugin name (e.g., My Awesome Plugin):',
    default: 'Russmedia Test Plugin',
  },
  {
    type: 'input',
    name: 'pluginDescription',
    message: 'Plugin description:',
    default: 'A test plugin',
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author name:',
    default: 'Lukas Illmer',
  },
  {
    type: 'input',
    name: 'authorURI',
    message: 'Author URI:',
    default: 'https://russmedia.com',
  },
];

/**
 * Plugin actions to create base files
 * @param {object} data - User inputs from prompts
 * @returns {array} Actions to perform
 */
export const actions = (data) => {
  return [
    {
      type: 'add',
      path: '{{pluginSlug}}/{{pluginSlug}}.php',
      templateFile: 'templates/plugin.php.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/.gitignore',
      templateFile: 'templates/.gitignore.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/.editorconfig',
      templateFile: 'templates/.editorconfig.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/classes/autoloader.php',
      templateFile: 'templates/classes/autoloader.php.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/classes/class-utils.php',
      templateFile: 'templates/classes/class-utils.php.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/classes/class-settings.php',
      templateFile: 'templates/classes/class-settings.php.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/classes/class-plugin.php',
      templateFile: 'templates/classes/class-plugin.php.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/lang/{{pluginSlug}}-de_DE.po',
      templateFile: 'templates/lang/lang-de_DE.po.hbs',
    },
  ];
};

// Default export for backward compatibility
export default { prompts, actions };
