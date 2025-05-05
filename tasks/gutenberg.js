import { execSync } from 'child_process';

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

  if (data.gutenbergFeatures.includes('Block')) {
    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/classes/Admin/class-editor-extensions.php',
      templateFile: 'templates/classes/Admin/class-editor-extensions.php.hbs',
    });

    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/blocks/example-block/index.js',
      templateFile: 'templates/src/blocks/example-block/index.js.hbs',
    });

    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/blocks/example-block/edit.js',
      templateFile: 'templates/src/blocks/example-block/edit.js.hbs',
    });

    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/blocks/example-block/index.scss',
      templateFile: 'templates/src/blocks/example-block/index.scss',
    });

    actions.push({
      type: 'add',
      path: '{{pluginSlug}}/src/blocks/example-block/block.json',
      templateFile: 'templates/src/blocks/example-block/block.json.hbs',
    });
  }

  return actions;
};

export default { prompts, actions };
