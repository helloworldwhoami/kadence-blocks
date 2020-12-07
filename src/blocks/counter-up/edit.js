/**
 * BLOCK: Kadence Restaurant Menu
 */

/**
 * Internal dependencies
 */
import Controls from './controls';
import Inspector from './inspector';
import KadenceColorOutput from '../../kadence-color-output';
import Counter from './counter';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Import Css
 */
import './style.scss';

/**
 * Internal block libraries
 */
const { __ }                    = wp.i18n;
const { createBlock }           = wp.blocks;
const { Component, Fragment }   = wp.element;
const { IconButton }            = wp.components;
const { InnerBlocks } = wp.blockEditor
const { select, dispatch }      = wp.data;

/**
 * Build the restaurant menu edit
 */
class KadenceCounterUp extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount() {

		const { attributes } = this.props;
		const { images, uniqueID } = attributes;

		if ( ! uniqueID ) {
			this.props.setAttributes( {
				uniqueID: '_' + this.props.clientId.substr( 2, 9 ),
			} );
		}

		this.props.setAttributes( {
			containerPadding: [...this.props.attributes.containerPadding]
		} );

		this.props.setAttributes( {
			containerBorderWidth: [...this.props.attributes.containerBorderWidth]
		} );
	}

	render() {
		const {
			clientId,
			attributes,
			className,
			isSelected,
			setAttributes
		} = this.props;

		const {
			hAlign,
			hAlignTablet,
			hAlignMobile,

			cAlign,
			cAlignTablet,
			cAlignMobile,

			containerBackground,
			containerBackgroundOpacity,
			containerHoverBackground,
			containerHoverBackgroundOpacity,
			containerBorder,
			containerBorderOpacity,
			containerHoverBorder,
			containerHoverBorderOpacity,
			containerBorderWidth,
			containerBorderRadius,
			containerPadding,
			containerMargin,
			containerMarginUnit,
			maxWidthUnit,
			maxWidth,
			uniqueID,
			columns,
			counters,
			gutter
		} = attributes;

		const renderCSS = (
			<style>
				{ ( containerHoverBackground ? `.kt-counter-up-id-${uniqueID}.kt-counter-up:hover { background: ${ ( containerHoverBackground ? KadenceColorOutput( containerHoverBackground, ( undefined !== containerHoverBackgroundOpacity ? containerHoverBackgroundOpacity : 1 ) ) : KadenceColorOutput( '#f2f2f2', ( undefined !== containerHoverBackgroundOpacity ? containerHoverBackgroundOpacity : 1 ) ) ) } !important; }` : '' ) }
				{ ( containerHoverBorder ? `.kt-counter-up-id-${uniqueID}.kt-counter-up:hover { border-color: ${ ( containerHoverBorder ? KadenceColorOutput( containerHoverBorder, ( undefined !== containerHoverBorderOpacity ? containerHoverBorderOpacity : 1 ) ) : KadenceColorOutput( '#f2f2f2', ( undefined !== containerHoverBorderOpacity ? containerHoverBorderOpacity : 1 ) ) ) } !important; }` : '' ) }

			</style>
		);

		const counterItems = JSON.parse( counters );

		return (
			<Fragment>
				<style>{`
					.kt-counter-up-id-${uniqueID}.kt-counter-up-halign-right .kt-counter-up-container {
						text-align: right;
					}
					.kt-counter-up-id-${uniqueID}.kt-counter-up-halign-left .kt-counter-up-container {
						text-align: left;
					}
					.kt-counter-up-id-${uniqueID}.kt-counter-up-halign-center .kt-counter-up-container {
						text-align: center;
					}

				`}</style>

				<style>
					{ `
						.kt-counter-up-id-${uniqueID} .kt-counter-up-container {
							${ ( gutter && undefined !== gutter[ 0 ] && '' !== gutter[ 0 ] ? 'margin: -' + ( gutter[ 0 ] / 2 ) + 'px;' : '' ) }
						}
						.kt-counter-up-id-${uniqueID} .kt-counter-up-container .gutter {
							${ ( gutter && undefined !== gutter[ 0 ] && '' !== gutter[ 0 ] ? 'padding: ' + ( gutter[ 0 ] / 2 ) + 'px;' : '' ) }
						}
					`}
				</style>

				{ renderCSS }

				{ isSelected && <Controls {...this.props} /> }
				{ isSelected && <Inspector {...this.props} /> }

				<div
					className={ classnames(
						`kt-counter-up-id-${uniqueID}`,
						`kt-counter-up-halign-${ hAlign }`,
						`kt-counter-up-calign-${ cAlign }`,
						'kt-counter-up',
					) }
					style={ {
						borderColor: ( containerBorder ? KadenceColorOutput( containerBorder, ( undefined !== containerBorderOpacity ? containerBorderOpacity : 1 ) ) : KadenceColorOutput( '#eeeeee', ( undefined !== containerBorderOpacity ? containerBorderOpacity : 1 ) ) ),
						background: ( containerBackground ? KadenceColorOutput( containerBackground, ( undefined !== containerBackgroundOpacity ? containerBackgroundOpacity : 1 ) ) : KadenceColorOutput( '#f2f2f2', ( undefined !== containerBackgroundOpacity ? containerBackgroundOpacity : 1 ) ) ),
						borderRadius: containerBorderRadius + 'px',
						borderWidth: ( containerBorderWidth ? containerBorderWidth[ 0 ] + 'px ' + containerBorderWidth[ 1 ] + 'px ' + containerBorderWidth[ 2 ] + 'px ' + containerBorderWidth[ 3 ] + 'px' : '' ),
						padding: ( containerPadding ? containerPadding[ 0 ] + 'px ' + containerPadding[ 1 ] + 'px ' + containerPadding[ 2 ] + 'px ' + containerPadding[ 3 ] + 'px' : '' ),
						maxWidth: ( maxWidth ? maxWidth + maxWidthUnit : undefined ),
						marginTop: ( containerMargin && '' !== containerMargin[ 0 ] ? containerMargin[ 0 ] + containerMarginUnit : undefined ),
						marginRight: ( containerMargin && '' !== containerMargin[ 1 ] ? containerMargin[ 1 ] + containerMarginUnit : undefined ),
						marginBottom: ( containerMargin && '' !== containerMargin[ 2 ] ? containerMargin[ 2 ] + containerMarginUnit : undefined ),
						marginLeft: ( containerMargin && '' !== containerMargin[ 3 ] ? containerMargin[ 3 ] + containerMarginUnit : undefined ),
						borderStyle: 'solid'
					} }
				>
					<div
						className={ classnames( 'kt-counter-up-container' ) }
						data-columns-xxl={ columns[ 0 ] }
						data-columns-xl={ columns[ 1 ] }
						data-columns-lg={ columns[ 2 ] }
						data-columns-md={ columns[ 3 ] }
						data-columns-sm={ columns[ 4 ] }
						data-columns-xs={ columns[ 5 ] }
					>
						{
							counterItems.map( (counter,index) => (
								(index < columns[ 2 ]) &&
								<Counter
									{...this.props}
									counter={ counter }
									index={ index }
									key={index}
								/>
							) )
						}
					</div>
				</div>

			</Fragment>
		)
	}
}

export default KadenceCounterUp;
