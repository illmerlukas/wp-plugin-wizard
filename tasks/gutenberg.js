/**
 * Gutenberg prompts
 */
export const prompts = [
  {
    type: 'confirm',
    name: 'gutenberg',
    message: 'Do you want to add Gutenberg features?',
    default: true,
  },
  {
    type: 'checkbox',
    name: 'gutenbergFeatures',
    message: 'Which Gutenberg features do you want to add?',
    choices: ['Block', 'Meta Box'],
    when: (answers) => answers.gutenberg,
  },
  {
    type: 'input',
    name: 'blockCategory',
    message: 'Enter the category for the block:',
    default: (answers) => {
      return answers.pluginSlug.split('-')[0];
    },
    when: (answers) => answers.gutenbergFeatures.includes('Block'),
  },
  {
    type: 'input',
    name: 'blockSlug',
    message: 'Enter the slug for the block:',
    default: 'awesome-block',
    when: (answers) => answers.gutenbergFeatures.includes('Block'),
  },
  {
    type: 'input',
    name: 'blockDescription',
    message: 'Enter the description for the block:',
    default: 'This is a block',
    when: (answers) => answers.gutenbergFeatures.includes('Block'),
  },
  {
    type: 'input',
    name: 'gutenbergPluginSlug',
    message: 'Enter the slug for the gutenberg plugin:',
    default: 'example-plugin',
    when: (answers) => answers.gutenbergFeatures.includes('Meta Box'),
  },
];

/**
 * Gutenberg actions to create blocks and meta boxes
 * @param {object} data - User inputs from prompts
 * @returns {array} Actions to perform
 */
export const actions = (data) => {
  const actions = [];

  if (!data.gutenberg) {
    return actions;
  }

  actions.push({
    type: 'add',
    path: '{{pluginSlug}}/package.json',
    templateFile: 'templates/package.json.hbs',
  });

  actions.push({
    type: 'add',
    path: '{{pluginSlug}}/src/index.js',
    templateFile: 'templates/src/index.js.hbs',
  });

  actions.push({
    type: 'add',
    path: '{{pluginSlug}}/classes/Admin/class-editor-extensions.php',
    templateFile: 'templates/classes/Admin/class-editor-extensions.php.hbs',
  });

  if (data.gutenbergFeatures.includes('Block')) {
    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/blocks/index.js',
      templateFile: 'templates/src/blocks/index.js.hbs',
    });

    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/blocks/{{blockSlug}}/index.js',
      templateFile: 'templates/src/blocks/[block]/index.js.hbs',
    });

    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/blocks/{{blockSlug}}/edit.js',
      templateFile: 'templates/src/blocks/[block]/edit.js.hbs',
    });

    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/blocks/{{blockSlug}}/editor.scss',
      templateFile: 'templates/src/blocks/[block]/editor.scss',
    });

    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/blocks/{{blockSlug}}/block.json',
      templateFile: 'templates/src/blocks/[block]/block.json.hbs',
    });
  }

  if (data.gutenbergFeatures.includes('Meta Box')) {
    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/plugins/{{gutenbergPluginSlug}}/index.js',
      templateFile: 'templates/src/plugins/[plugin]/index.js.hbs',
    });

    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/plugins/{{gutenbergPluginSlug}}/edit.js',
      templateFile: 'templates/src/plugins/[plugin]/edit.js.hbs',
    });

    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/plugins/{{gutenbergPluginSlug}}/editor.scss',
      templateFile: 'templates/src/plugins/[plugin]/editor.scss',
    });

    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/plugins/index.js',
      templateFile: 'templates/src/plugins/index.js.hbs',
    });
  }

  return actions;
};

export default { prompts, actions };
