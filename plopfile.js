import { setupHelpers, logDryRunPreview } from './helpers/slug-transformer.js';
import { setupActionTypes } from './helpers/action-types.js';
import tasks from './tasks/index.js';

export default function (plop) {
  setupHelpers(plop);
  setupActionTypes(plop);

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
}
