import { exec } from 'child_process';
import path from 'path';
import chalk from 'chalk';

/**
 * Runs npm install in the specified plugin directory
 * @param {string} pluginSlug - The slug of the plugin to install dependencies for
 * @returns {Promise} - A promise that resolves when the installation is complete
 */
export const installNpmDependencies = (pluginSlug, dependencies = []) => {
  return new Promise((resolve, reject) => {
    console.log(
      chalk.blue(`\nInstalling npm dependencies for ${pluginSlug}...`)
    );

    const pluginPath = path.resolve(process.cwd(), pluginSlug);

    exec(
      `npm i --save-dev ${dependencies.join(' ')}`,
      { cwd: pluginPath },
      (error, stdout, stderr) => {
        if (error) {
          console.error(
            chalk.red(`Error installing dependencies: ${error.message}`)
          );
          reject(error);
          return;
        }

        if (stderr) {
          console.warn(chalk.yellow(stderr));
        }

        console.log(stdout);

        resolve();
      }
    );
  });
};
