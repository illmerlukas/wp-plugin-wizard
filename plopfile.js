import { setupHelpers, logDryRunPreview } from './helpers/slug-transformer.js';
import { installNpmDependencies } from './helpers/npm-runner.js';
import chalk from 'chalk';
import tasks from './tasks/index.js';

export default function (plop) {
  setupHelpers(plop);

  plop.setGenerator('wp-plugin', {
    description: 'Scaffold a new WordPress plugin',
    prompts: tasks.prompts,
    actions: function (data) {
      // check if dry run is enabled
      if (process.argv.includes('--dry-run')) {
        logDryRunPreview(plop, data);
      }

      return tasks.actions(data);
    },
  });

  // Add a post-generation hook to install npm dependencies
  plop.setActionType('installNpmDeps', (answers) => {
    if (process.argv.includes('--dry-run')) {
      return 'Skipping npm install in dry run mode';
    }

    return installNpmDependencies(answers.pluginSlug)
      .then(() => chalk.green('✅ NPM dependencies installed successfully'))
      .catch((err) => {
        console.error(err);
        return chalk.red('❌ Failed to install NPM dependencies');
      });
  });
}
