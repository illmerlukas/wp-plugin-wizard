import fs from 'fs';

/**
 * Plugin base prompts
 */
export const prompts = [
  {
    type: 'input',
    name: 'pluginSlug',
    message: 'Plugin slug (e.g., my-awesome-plugin):',
    default: 'my-awesome-plugin',
  },
  {
    type: 'input',
    name: 'pluginName',
    message: 'Plugin name:',
    default: (data) =>
      data.pluginSlug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase()),
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
    default: 'https://example.com',
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
      path: '{{pluginSlug}}/composer.json',
      templateFile: 'templates/composer.json.hbs',
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
      path: '{{pluginSlug}}/classes/class-plugin.php',
      templateFile: 'templates/classes/class-plugin.php.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/lang/{{pluginSlug}}-de_DE.po',
      templateFile: 'templates/lang/lang-de_DE.po.hbs',
    },
    // Test files
    {
      type: 'add',
      path: '{{pluginSlug}}/bin/install-wp-tests.sh',
      templateFile: 'templates/bin/install-wp-tests.sh',
    },
    {
      type: 'modify',
      path: '{{pluginSlug}}/bin/install-wp-tests.sh',
      transform: (content) => {
        // Make the file executable
        fs.chmodSync(data.pluginSlug + '/bin/install-wp-tests.sh', '0755');
        return content;
      },
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/tests/bootstrap.php',
      templateFile: 'templates/tests/bootstrap.php.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/phpunit.xml.dist',
      templateFile: 'templates/phpunit.xml.dist.hbs',
    },
    {
      type: 'add',
      path: '{{pluginSlug}}/tests/test-class-plugin.php',
      templateFile: 'templates/tests/test-class-plugin.php.hbs',
    },
  ];
};

// Default export for backward compatibility
export default { prompts, actions };
