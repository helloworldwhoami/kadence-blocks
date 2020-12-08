/**
 * BLOCK: Kadence Restaurant Menu Attributes
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';


/**
 * Set default state
 */
export default {
	uniqueID: {
		type: 'string',
	},
	"fullWidth": {
		"type": "Boolean",
		"default": false
	},
	"startNumber": {
		"type": "Number",
		"default": 0
	},
	"prefix": {
		"type": "String",
		"default": 'EUR'
	},
	"suffix": {
		"type": "String",
		"default": 'LEFT'
	},
	"thousandSeparator": {
		"type": "String",
		"default": ''
	},
	"animationTime": {
		"type": "Number",
		"default": 2.75
	},
	counters: {
		type: 'Array',
		default: JSON.stringify([
			{
				title: __( 'Title' ),
				count: '89',
			},
			{
				title: __( 'Title' ),
				count: '98',
			},
			{
				title: '',
				count: '',
			},
			{
				title: '',
				count: '',
			},
			{
				title: '',
				count: '',
			},
			{
				title: '',
				count: '',
			},
			{
				title: '',
				count: '',
			},
			{
				title: '',
				count: '',
			}
		])
	},
	columns: {
		type: 'Array',
		default: [ 2, 2, 2, 2, 1, 1 ],
	},
	columnControl: {
		type: 'string',
		default: 'linked',
	},
	hAlign: {
		type: 'string',
		default: 'center',
	},
	hAlignTablet: {
		type: 'string',
		default: '',
	},
	hAlignMobile: {
		type: 'string',
		default: '',
	},
	containerBackground: {
		type: 'string',
		default: 'transparent',
	},
	containerBackgroundOpacity: {
		type: 'number',
		default: 1,
	},
	containerHoverBackground: {
		type: 'string',
		default: 'transparent',
	},
	containerHoverBackgroundOpacity: {
		type: 'number',
		default: 1,
	},
	containerBorder: {
		type: 'string',
		default: 'transparent',
	},
	containerBorderOpacity: {
		type: 'number',
		default: 1,
	},
	containerHoverBorder: {
		type: 'string',
		default: 'transparent',
	},
	containerHoverBorderOpacity: {
		type: 'number',
		default: 1,
	},
	containerBorderWidth: {
		type: 'array',
		default: [ 0, 0, 0, 0 ],
	},
	containerBorderRadius: {
		type: 'number',
		default: 0,
	},
	containerPadding: {
		type: 'array',
		default: [ 30, 30, 30, 30 ],
	},
	containerMargin: {
		type: 'array',
		default: [ '0', '0', '0', '0' ],
	},
	containerMarginUnit: {
		type: 'string',
		default: 'px',
	},
	maxWidth: {
		type: 'number',
		default: '',
	},
	maxWidthUnit: {
		type: 'string',
		default: 'px',
	},
	displayTitle: {
		type: 'bool',
		default: true,
	},
	titleColor: {
		type: 'string',
		default: '',
	},
	titleHoverColor: {
		type: 'string',
		default: '',
	},
	titleMinHeight: {
		type: 'array',
		default: [ '', '', '' ],
	},
	titleFont: {
		type: 'array',
		default: [ {
			level: 4,
			size: [ '', '', '' ],
			sizeType: 'px',
			lineHeight: [ '', '', '' ],
			lineType: 'px',
			letterSpacing: '',
			textTransform: 'uppercase',
			family: "'Open Sans', sans-serif",
			google: false,
			style: '',
			weight: '600',
			variant: '',
			subset: '',
			loadGoogle: true,
			padding: [ 0, 0, 15, 0 ],
			paddingControl: 'linked',
			margin: [ 0, 0, 0, 0 ],
			marginControl: 'linked',
		} ],
	},
	displayCounter: {
		type: 'bool',
		default: true,
	},
	counterColor: {
		type: 'string',
		default: '',
	},
	counterHoverColor: {
		type: 'string',
		default: '',
	},
	counterMinHeight: {
		type: 'array',
		default: [ '', '', '' ],
	},
	counterFont: {
		type: 'array',
		default: [ {
			level: 4,
			size: [ '40', '', '' ],
			sizeType: 'px',
			lineHeight: [ 'normal', 'normal', 'normal' ],
			lineType: 'px',
			letterSpacing: '',
			textTransform: 'uppercase',
			family: "'Open Sans', sans-serif",
			google: false,
			style: '',
			weight: '400',
			variant: '',
			subset: '',
			loadGoogle: true,
			padding: [ 0, 0, 0, 0 ],
			paddingControl: 'linked',
			margin: [ 0, 0, 0, 0 ],
			marginControl: 'linked',
		} ],
	},
	gutter: {
		type: 'Array',
		default: [ 50, '', '' ],
	},
}
