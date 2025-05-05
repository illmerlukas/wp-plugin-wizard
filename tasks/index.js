/**
 * Combined tasks index file that exports all task prompts and actions
 */
import * as plugin from './plugin.js';
import * as rest from './rest.js';
import * as gutenberg from './gutenberg.js';

// Combine all prompts from different task modules
export const prompts = [
  ...plugin.prompts,
  ...rest.prompts,
  ...gutenberg.prompts,
];

/**
 * Combined actions function that processes all task actions
 * @param {object} data - User inputs from prompts
 * @returns {array} Combined actions from all task modules
 */
export const actions = (data) => [
  ...plugin.actions(data),
  ...rest.actions(data),
  ...gutenberg.actions(data),
  {
    type: 'installNpmDeps',
    message: 'Installing npm dependencies...',
    dependencies: ['@wordpress/scripts'],
  },
];

// Export default object with combined prompts and actions
export default {
  prompts,
  actions,
};
