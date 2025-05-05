import chalk from 'chalk';

/**
 * Transforms a slug into a namespace format
 * @param {string} slug - Plugin slug in kebab-case
 * @returns {string} Namespace in PHP format
 */
export const toNamespace = (slug) => {
  const parts = slug.split('-');
  // Capitalize all parts
  const capitalizedParts = parts.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Take the first part as the main namespace
  const mainNamespace = capitalizedParts[0];

  // Join the remaining parts with underscores
  const subNamespace = capitalizedParts.slice(1).join('_');

  // Return the complete namespace format
  return subNamespace ? `${mainNamespace}\\${subNamespace}` : mainNamespace;
};

/**
 * Transforms a slug into a package name format
 * @param {string} slug - Plugin slug in kebab-case
 * @returns {string} Package name in PascalCase with underscores
 */
export const toPackageName = (slug) =>
  slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('_');

/**
 * Logs a preview of slug transformations
 * @param {object} plop - Plop instance
 */
export const logDryRunPreview = (plop, { pluginSlug }) => {
  const namespace = plop.getHelper('namespace')(pluginSlug);
  const namespaceEscaped = plop.getHelper('namespaceEscaped')(pluginSlug);
  const packageName = plop.getHelper('packageName')(pluginSlug);
  const packageNameSlug = plop.getHelper('packageNameSlug')(pluginSlug);

  console.log(
    '\n' + chalk.blue.bold('------ SLUG TRANSFORMATION PREVIEW ------') + '\n'
  );
  console.log(chalk.bold('Input Slug:        ') + chalk.green(pluginSlug));
  console.log(chalk.bold('Namespace:         ') + chalk.yellow(namespace));
  console.log(
    chalk.bold('Namespace Escaped: ') + chalk.yellow(namespaceEscaped)
  );
  console.log(chalk.bold('Package Name:      ') + chalk.yellow(packageName));
  console.log(
    chalk.bold('Package Name Slug: ') + chalk.yellow(packageNameSlug)
  );
  console.log(chalk.blue('-----------------------------------------'));
  console.log(''); // Empty line for spacing
};

/**
 * Sets up template helpers for Plop
 * @param {object} plop - Plop instance
 */
export const setupHelpers = (plop) => {
  // "my-test-plugin" to "My\Test\Plugin"
  plop.setHelper('namespace', function (text) {
    return toNamespace(text);
  });

  // "my-test-plugin" to "My\\Test\\Plugin"
  plop.setHelper('namespaceEscaped', function (text) {
    return toNamespace(text).replace(/\\/g, '\\\\');
  });

  // "my-test-plugin" to "My_Test_Plugin"
  plop.setHelper('packageName', function (text) {
    return toPackageName(text);
  });

  // "my-test-plugin" to "my/test-plugin"
  plop.setHelper('packageNameSlug', function (text) {
    // Replace only the first hyphen with a slash
    return text.replace(/-/, '/');
  });

  // Check if an array includes a value
  plop.setHelper('includes', function (array, value) {
    return array.includes(value);
  });
};
