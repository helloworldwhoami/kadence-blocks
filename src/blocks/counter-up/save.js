/**
 * BLOCK: Kadence Restaurant Menu
 */
import { KadenceCounterSave } from './counter';
/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal block libraries
 */
const { Component, Fragment } = wp.element;
const { InnerBlocks }         = wp.blockEditor

/**
 * Build the restaurant menu save
 */
const save = ( { attributes } ) => {

	const {
		fullWidth,
		uniqueID,
		hAlign,
		cAlign,
		counters,
		columns
	} = attributes

	const counterItems = JSON.parse( counters );

	return (
		<Fragment>

			<div
				className={ classnames(
					`kt-counter-up-id-${uniqueID}`,
					`kt-counter-up-halign-${ hAlign }`,
					'kt-counter-up',
					{
						'full-width': fullWidth,
						'not-full-width': !fullWidth
					}
				) }
				style={ {

				} }>
				<div
					className={ classnames( 'kt-counter-up-container' ) }
					data-columns-xxl={ columns[ 0 ] }
					data-columns-xl={ columns[ 1 ] }
					data-columns-lg={ columns[ 2 ] }
					data-columns-md={ columns[ 3 ] }
					data-columns-sm={ columns[ 4 ] }
					data-columns-xs={ columns[ 5 ] }>

					{
						counterItems.map( (counter,index) => (
							(index < columns[ 2 ]) &&
							<KadenceCounterSave
								counter={ counter }
								attributes={ attributes }
								key={index}
							/>
						) )
					}
				</div>
			</div>

		</Fragment>
	);
};

export default save;
