/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './style.scss';

export default function Edit({}) {
  return (
    <div {...useBlockProps()}>
      {__('Hello World', 'russmedia-example-block')}
    </div>
  );
}
