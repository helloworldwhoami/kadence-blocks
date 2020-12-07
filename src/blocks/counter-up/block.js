/**
 * BLOCK: Kadence Restaurant Menu
 */

/**
 * Internal dependencies
 */
import icons from './icons';
import attributes from './attributes';
import edit from './edit';
import save from './save';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Import Css
 */
import './style.scss';
import './editor.scss';

/**
 * Internal block libraries
 */
const { __ }                = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment }          = wp.element;
const { Icon }              = wp.components;

/**
 * Register: a Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'kadence/counterup', {
	title: __( 'Counter Up' ),
	icon: <Icon icon={ icons.block } />,
	category: 'kadence-blocks',
	keywords: ['count down', 'counter', 'count up', 'number spinner'],
	description: __( 'As well as counting up from zero and increasing to some preset value.' ),
	getEditWrapperProps( attributes ) {
		const { fullWidth } = attributes;
		return {
			style: {
				maxWidth: fullWidth ? 'none' : false,
				width: fullWidth ? '100%' : false
			},
		};
	},
	attributes,
	edit,
	save
} );
