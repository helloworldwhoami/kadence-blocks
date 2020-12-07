/**
 * BLOCK: Kadence Restaurant Menu
 */

/**
 * Internal dependencies
 */
import WebfontLoader from '../../fontloader';
import KadenceColorOutput from '../../kadence-color-output';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal block libraries
 */
const { __ }                  = wp.i18n;
const { createBlock }         = wp.blocks;
const { Component, Fragment } = wp.element;
const { IconButton }    = wp.components;
const { InnerBlocks, RichText }         = wp.blockEditor
const { select, dispatch }    = wp.data;

/**
 * Build the restaurant menu edit
 */
class KadenceCounter extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			counter,
			index,
			clientId,
			attributes,
			className,
			isSelected,
			setAttributes
		} = this.props;

		const {
			displayTitle,
			title,
			titleFont,
			titleMinHeight,
			titleColor,
			titleHoverColor,

			counterColor,
			counterFont,
			counterMinHeight,
			counters,

		} = attributes;

		const titleTagName = 'h' + titleFont[ 0 ].level;
		const counterTagName = 'h' + counterFont[ 0 ].level;


		return (
			<Fragment>
				<div
					className={ classnames(
						'kt-counter-up-content',
					) }
				>
					{ 	displayTitle &&
						<RichText
							tagName={ titleTagName }
							className={ classnames( className, 'kt-item-title' ) }
							value={ counter.title }
							onChange={ counterTitle => {
								let updateCounters = JSON.parse(counters);

								updateCounters[index].title = counterTitle;
								setAttributes( { counters: JSON.stringify([ ...updateCounters ]) } )
							} }
							placeholder={__( 'Title' )}
							style={ {
								fontWeight: titleFont[ 0 ].weight,
								fontStyle: titleFont[ 0 ].style,
								color: KadenceColorOutput( titleColor ),
								fontSize: titleFont[ 0 ].size[ 0 ] + titleFont[ 0 ].sizeType,
								lineHeight: ( titleFont[ 0 ].lineHeight && titleFont[ 0 ].lineHeight[ 0 ] ? titleFont[ 0 ].lineHeight[ 0 ] + titleFont[ 0 ].lineType : undefined ),
								letterSpacing: titleFont[ 0 ].letterSpacing + 'px',
								fontFamily: ( titleFont[ 0 ].family ? titleFont[ 0 ].family : '' ),
								padding: ( titleFont[ 0 ].padding ? titleFont[ 0 ].padding[ 0 ] + 'px ' + titleFont[ 0 ].padding[ 1 ] + 'px ' + titleFont[ 0 ].padding[ 2 ] + 'px ' + titleFont[ 0 ].padding[ 3 ] + 'px' : '' ),
								margin: ( titleFont[ 0 ].margin ? titleFont[ 0 ].margin[ 0 ] + 'px ' + titleFont[ 0 ].margin[ 1 ] + 'px ' + titleFont[ 0 ].margin[ 2 ] + 'px ' + titleFont[ 0 ].margin[ 3 ] + 'px' : '' ),
								minHeight: ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 0 ] ? titleMinHeight[ 0 ] + 'px' : undefined ),
							} }
						/>
					}

					<RichText
						tagName={ 'div' }
						className={ classnames( className, 'kt-item-text' ) }
						value={ counter.count }
						onChange={ count => {
							let updateCounters = JSON.parse(counters);

							updateCounters[index].count = count;
							setAttributes( { counters: JSON.stringify([ ...updateCounters ]) } )
						} }
						placeholder={__( '89.45' )}
						style={ {
							fontWeight: counterFont[ 0 ].weight,
							fontStyle: counterFont[ 0 ].style,
							color: KadenceColorOutput( counterColor ),
							fontSize: counterFont[ 0 ].size[ 0 ] + counterFont[ 0 ].sizeType,
							lineHeight: ( counterFont[ 0 ].lineHeight && counterFont[ 0 ].lineHeight[ 0 ] ? counterFont[ 0 ].lineHeight[ 0 ] + counterFont[ 0 ].lineType : undefined ),
							letterSpacing: counterFont[ 0 ].letterSpacing + 'px',
							fontFamily: ( counterFont[ 0 ].family ? counterFont[ 0 ].family : '' ),
							padding: ( counterFont[ 0 ].padding ? counterFont[ 0 ].padding[ 0 ] + 'px ' + counterFont[ 0 ].padding[ 1 ] + 'px ' + counterFont[ 0 ].padding[ 2 ] + 'px ' + counterFont[ 0 ].padding[ 3 ] + 'px' : '' ),
							margin: ( counterFont[ 0 ].margin ? counterFont[ 0 ].margin[ 0 ] + 'px ' + counterFont[ 0 ].margin[ 1 ] + 'px ' + counterFont[ 0 ].margin[ 2 ] + 'px ' + counterFont[ 0 ].margin[ 3 ] + 'px' : '' ),
							minHeight: ( undefined !== counterMinHeight && undefined !== counterMinHeight[ 0 ] ? counterMinHeight[ 0 ] + 'px' : undefined ),
						} }
					/>

				</div>
			</Fragment>
		)
	}
}

export default KadenceCounter;
