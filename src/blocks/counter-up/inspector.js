/**
 * BLOCK: Kadence Restaurant Menu Category
 */

/**
 * External dependencies
 */
import map from 'lodash/map';

/**
 * Internal dependencies
 */
import AdvancedPopColorControl from '../../advanced-pop-color-control';
import TypographyControls from '../../typography-control';
import KadenceRange from '../../kadence-range-control';
import MeasurementControls from '../../measurement-control';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, ContrastChecker, PanelColorSettings, AlignmentToolbar } = wp.blockEditor;
const {
	TextControl,
	SelectControl,
	PanelBody,
	RangeControl,
	ToggleControl,
	BaseControl,
	ButtonGroup,
	Button,
	ColorPicker,
	TextareaControl,
	CheckboxControl,
	Tooltip,
	TabPanel,
	Dashicon
} = wp.components;


/**
 * Menu category Settings
 */
class Inspector extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			containerPaddingControl: 'linked',
			containerBorderControl: 'linked',
			containerMarginControl: 'linked',
			mediaBorderControl: 'linked',
			mediaPaddingControl: 'linked',
			mediaMarginControl: 'linked',
		};
	}

	render() {
		const {
			clientId,
			attributes,
			className,
			isSelected,
			setAttributes,
			onChangeState,
			startCounter
		} = this.props;

		const {
			hAlign,
			hAlignTablet,
			hAlignMobile,

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

			columns,
			columnControl,
			gutter,

			displayTitle,
			title,
			titleColor,
			titleMinHeight,
			titleHoverColor,
			titleFont,

			displayCounter,
			counter,
			counterColor,
			counterMinHeight,
			counterHoverColor,
			counterFont,

			prefix,
			suffix,
			animationTime,
			thousandSeparator
		} = attributes;

		const { containerBorderControl, mediaBorderControl, mediaPaddingControl, mediaMarginControl, containerPaddingControl, containerMarginControl } = this.state;
		const widthMax = ( maxWidthUnit === 'px' ? 2000 : 100 );
		const widthTypes = [
			{ key: 'px', name: 'px' },
			{ key: '%', name: '%' },
			{ key: 'vw', name: 'vw' },
		];
		const marginTypes = [
			{ key: 'px', name: 'px' },
			{ key: 'em', name: 'em' },
			{ key: '%', name: '%' },
			{ key: 'vh', name: 'vh' },
			{ key: 'rem', name: 'rem' },
		];

		const columnControlTypes = [
			{ key: 'linked', name: __( 'Linked', 'kadence-blocks' ), icon: __( 'Linked', 'kadence-blocks' ) },
			{ key: 'individual', name: __( 'Individual', 'kadence-blocks' ), icon: __( 'Individual', 'kadence-blocks' ) },
		];

		const onColumnChange = ( value ) => {
			let columnArray = [];
			if ( 1 === value ) {
				columnArray = [ 1, 1, 1, 1, 1, 1 ];
			} else if ( 2 === value ) {
				columnArray = [ 2, 2, 2, 2, 1, 1 ];
			} else if ( 3 === value ) {
				columnArray = [ 3, 3, 3, 2, 1, 1 ];
			} else if ( 4 === value ) {
				columnArray = [ 4, 4, 4, 3, 2, 2 ];
			} else if ( 5 === value ) {
				columnArray = [ 5, 5, 5, 4, 4, 3 ];
			} else if ( 6 === value ) {
				columnArray = [ 6, 6, 6, 4, 4, 3 ];
			} else if ( 7 === value ) {
				columnArray = [ 7, 7, 7, 5, 5, 4 ];
			} else if ( 8 === value ) {
				columnArray = [ 8, 8, 8, 6, 4, 4 ];
			}
			setAttributes( { columns: columnArray } );
		};

		const saveTitleFont = ( value ) => {
			const newUpdate = titleFont.map( ( item, index ) => {
				if ( 0 === index ) {
					item = { ...item, ...value };
				}
				return item;
			} );
			setAttributes( {
				titleFont: newUpdate,
			} );
		};

		const saveCounterFont = ( value ) => {
			const newUpdate = counterFont.map( ( item, index ) => {
				if ( 0 === index ) {
					item = { ...item, ...value };
				}
				return item;
			} );
			setAttributes( {
				counterFont: newUpdate,
			} );
		};

		const marginMin = ( containerMarginUnit === 'em' || containerMarginUnit === 'rem' ? -12 : -200 );
		const marginMax = ( containerMarginUnit === 'em' || containerMarginUnit === 'rem' ? 24 : 200 );
		const marginStep = ( containerMarginUnit === 'em' || containerMarginUnit === 'rem' ? 0.1 : 1 );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'General Settings' ) }
						initialOpen={ false }>

						<div className="kt-columns-control">
							<ButtonGroup className="kt-size-type-options kt-outline-control" aria-label={ __( 'Column Control Type', 'kadence-blocks' ) }>
								{ map( columnControlTypes, ( { name, key, icon } ) => (
									<Tooltip key={ key } text={ name }>
										<Button
											className="kt-size-btn"
											isSmall
											isPrimary={ columnControl === key }
											aria-pressed={ columnControl === key }
											onClick={ () => setAttributes( { columnControl: key } ) }
										>
											{ icon }
										</Button>
									</Tooltip>
								) ) }
							</ButtonGroup>
							{ columnControl !== 'individual' && (
								<RangeControl
									label={ __( 'Columns' ) }
									value={ columns[ 2 ] }
									onChange={ onColumnChange }
									min={ 1 }
									max={ 8 }
								/>
							) }
							{ columnControl === 'individual' && (
								<Fragment>
									<h4>{ __( 'Columns', 'kadence-blocks' ) }</h4>
									<RangeControl
										label={ __( 'Screen Above 1500px', 'kadence-blocks' ) }
										value={ columns[ 0 ] }
										onChange={ ( value ) => setAttributes( { columns: [ value, columns[ 1 ], columns[ 2 ], columns[ 3 ], columns[ 4 ], columns[ 5 ] ] } ) }
										min={ 1 }
										max={ 8 }
									/>
									<RangeControl
										label={ __( 'Screen 1200px - 1499px', 'kadence-blocks' ) }
										value={ columns[ 1 ] }
										onChange={ ( value ) => setAttributes( { columns: [ columns[ 0 ], value, columns[ 2 ], columns[ 3 ], columns[ 4 ], columns[ 5 ] ] } ) }
										min={ 1 }
										max={ 8 }
									/>
									<RangeControl
										label={ __( 'Screen 992px - 1199px', 'kadence-blocks' ) }
										value={ columns[ 2 ] }
										onChange={ ( value ) => setAttributes( { columns: [ columns[ 0 ], columns[ 1 ], value, columns[ 3 ], columns[ 4 ], columns[ 5 ] ] } ) }
										min={ 1 }
										max={ 8 }
									/>
									<RangeControl
										label={ __( 'Screen 768px - 991px', 'kadence-blocks' ) }
										value={ columns[ 3 ] }
										onChange={ ( value ) => setAttributes( { columns: [ columns[ 0 ], columns[ 1 ], columns[ 2 ], value, columns[ 4 ], columns[ 5 ] ] } ) }
										min={ 1 }
										max={ 8 }
									/>
									<RangeControl
										label={ __( 'Screen 544px - 767px', 'kadence-blocks' ) }
										value={ columns[ 4 ] }
										onChange={ ( value ) => setAttributes( { columns: [ columns[ 0 ], columns[ 1 ], columns[ 2 ], columns[ 3 ], value, columns[ 5 ] ] } ) }
										min={ 1 }
										max={ 8 }
									/>
									<RangeControl
										label={ __( 'Screen Below 543px', 'kadence-blocks' ) }
										value={ columns[ 5 ] }
										onChange={ ( value ) => setAttributes( { columns: [ columns[ 0 ], columns[ 1 ], columns[ 2 ], columns[ 3 ], columns[ 4 ], value ] } ) }
										min={ 1 }
										max={ 8 }
									/>
								</Fragment>
							) }
						</div>

						<h2 className="kt-heading-size-title">{ __( 'Content Align' ) }</h2>
						<TabPanel className="kt-size-tabs kb-sidebar-alignment"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'desk',
									title: <Dashicon icon="desktop" />,
									className: 'kt-desk-tab',
								},
								{
									name: 'tablet',
									title: <Dashicon icon="tablet" />,
									className: 'kt-tablet-tab',
								},
								{
									name: 'mobile',
									title: <Dashicon icon="smartphone" />,
									className: 'kt-mobile-tab',
								},
							] }>
							{
								( tab ) => {
									let tabout;
									if ( tab.name ) {
										if ( 'mobile' === tab.name ) {
											tabout = (
												<AlignmentToolbar
													isCollapsed={ false }
													value={ hAlignMobile }
													onChange={ ( value ) => setAttributes( { hAlignMobile: value } ) }
												/>
											);
										} else if ( 'tablet' === tab.name ) {
											tabout = (
												<AlignmentToolbar
													isCollapsed={ false }
													value={ hAlignTablet }
													onChange={ ( value ) => setAttributes( { hAlignTablet: value } ) }
												/>
											);
										} else {
											tabout = (
												<AlignmentToolbar
													isCollapsed={ false }
													value={ hAlign }
													onChange={ ( value ) => setAttributes( { hAlign: value } ) }
												/>
											);
										}
									}
									return <div className={ tab.className } key={ tab.className }>{ tabout }</div>;
								}
							}
						</TabPanel>

						<MeasurementControls
							label={ __( 'Container Border Width (px)' ) }
							measurement={ containerBorderWidth }
							control={ containerBorderControl }
							onChange={ ( value ) => setAttributes( { containerBorderWidth: value } ) }
							onControl={ ( value ) => this.setState( { containerBorderControl: value } ) }
							min={ 0 }
							max={ 40 }
							step={ 1 }
						/>
						<KadenceRange
							label={ __( 'Container Border Radius (px)' ) }
							value={ containerBorderRadius }
							onChange={ value => setAttributes( { containerBorderRadius: value } ) }
							step={ 1 }
							min={ 0 }
							max={ 200 }
						/>
						<TabPanel className="kt-inspect-tabs kt-hover-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'normal',
									title: __( 'Normal' ),
									className: 'kt-normal-tab',
								},
								{
									name: 'hover',
									title: __( 'Hover' ),
									className: 'kt-hover-tab',
								},
							] }>
							{
								( tab ) => {
									let tabout;
									if ( tab.name ) {
										if ( 'hover' === tab.name ) {
											tabout = (
												<Fragment>
													<AdvancedPopColorControl
														label={ __( 'Hover Background' ) }
														colorValue={ ( containerHoverBackground ? containerHoverBackground : '#f2f2f2' ) }
														colorDefault={ '#f2f2f2' }
														opacityValue={ containerHoverBackgroundOpacity }
														onColorChange={ value => setAttributes( { containerHoverBackground: value } ) }
														onOpacityChange={ value => setAttributes( { containerHoverBackgroundOpacity: value } ) }
													/>
													<AdvancedPopColorControl
														label={ __( 'Hover Border' ) }
														colorValue={ ( containerHoverBorder ? containerHoverBorder : '#eeeeee' ) }
														colorDefault={ '#eeeeee' }
														opacityValue={ containerHoverBorderOpacity }
														onColorChange={ value => setAttributes( { containerHoverBorder: value } ) }
														onOpacityChange={ value => setAttributes( { containerHoverBorderOpacity: value } ) }
													/>
												</Fragment>
											);
										} else {
											tabout = (
												<Fragment>
													<AdvancedPopColorControl
														label={ __( 'Container Background' ) }
														colorValue={ ( containerBackground ? containerBackground : '#f2f2f2' ) }
														colorDefault={ '#f2f2f2' }
														opacityValue={ containerBackgroundOpacity }
														onColorChange={ value => setAttributes( { containerBackground: value } ) }
														onOpacityChange={ value => setAttributes( { containerBackgroundOpacity: value } ) }
													/>
													<AdvancedPopColorControl
														label={ __( 'Container Border' ) }
														colorValue={ ( containerBorder ? containerBorder : '#eeeeee' ) }
														colorDefault={ '#eeeeee' }
														opacityValue={ containerBorderOpacity }
														onColorChange={ value => setAttributes( { containerBorder: value } ) }
														onOpacityChange={ value => setAttributes( { containerBorderOpacity: value } ) }
													/>
												</Fragment>
											);
										}
									}
									return <div className={ tab.className } key={ tab.className }>{ tabout }</div>;
								}
							}
						</TabPanel>
						<MeasurementControls
							label={ __( 'Container Padding' ) }
							measurement={ containerPadding }
							control={ containerPaddingControl }
							onChange={ ( value ) => setAttributes( { containerPadding: value } ) }
							onControl={ ( value ) => this.setState( { containerPaddingControl: value } ) }
							min={ 0 }
							max={ 100 }
							step={ 1 }
						/>
						<ButtonGroup className="kt-size-type-options kt-row-size-type-options kb-typo-when-linked-individual-avail" aria-label={ __( 'Margin Type', 'kadence-blocks' ) }>
							{ map( marginTypes, ( { name, key } ) => (
								<Button
									key={ key }
									className="kt-size-btn"
									isSmall
									isPrimary={ containerMarginUnit === key }
									aria-pressed={ containerMarginUnit === key }
									onClick={ () => setAttributes( { containerMarginUnit: key } ) }
								>
									{ name }
								</Button>
							) ) }
						</ButtonGroup>
						<MeasurementControls
							label={ __( 'Margin', 'kadence-blocks' ) }
							measurement={ containerMargin }
							onChange={ ( value ) => setAttributes( { containerMargin: value } ) }
							control={ containerMarginControl }
							onControl={ ( value ) => this.setState( { containerMarginControl: value } ) }
							min={ marginMin }
							max={ marginMax }
							step={ marginStep }
							allowEmpty={ true }
						/>
						<ButtonGroup className="kt-size-type-options" aria-label={ __( 'Max Width Type' ) }>
							{ map( widthTypes, ( { name, key } ) => (
								<Button
									key={ key }
									className="kt-size-btn"
									isSmall
									isPrimary={ maxWidthUnit === key }
									aria-pressed={ maxWidthUnit === key }
									onClick={ () => setAttributes( { maxWidthUnit: key } ) }
								>
									{ name }
								</Button>
							) ) }
						</ButtonGroup>
						<KadenceRange
							label={ __( 'Container Max Width' ) }
							value={ maxWidth }
							onChange={ ( value ) => {
								setAttributes( {
									maxWidth: value,
								} );
							} }
							min={ 0 }
							max={ widthMax }
						/>
					</PanelBody>

					{/*<PanelBody
						title={ __( 'Counter-Up Settings' ) }
						initialOpen={ false }>
						<Button
							isSmall
							onClick={ () => {
								onChangeState( 'startCounter', startCounter ? false : true );
							} }
						>
							{ __( 'Start' ) }
						</Button>

						<TextControl
							label={ __( 'Prefix' ) }
							value={ prefix }
							onChange={ value => setAttributes( { prefix: value } ) }
						/>

						<TextControl
							label={ __( 'Suffix' ) }
							value={ suffix }
							onChange={ value => setAttributes( { suffix: value } ) }
						/>

						<TextControl
							label={ __( 'Thousand Seperator' ) }
							value={ thousandSeparator }
							onChange={ value => setAttributes( { thousandSeparator: value } ) }
						/>

						<KadenceRange
							label={ __( 'Animation Time' ) }
							value={ animationTime }
							onChange={ value => setAttributes( { animationTime: value } ) }
							step={ 1 }
							min={ 0 }
							max={ 600 }
						/>
					</PanelBody>*/}

					<PanelBody
						title={ __( 'Title Settings' ) }
						initialOpen={ false }>
						<ToggleControl
							label={ __( 'Show Title' ) }
							checked={ displayTitle }
							onChange={ ( value ) => setAttributes( { displayTitle: value } ) }
						/>

						{ displayTitle && (
							<Fragment>
								<h2 className="kt-tab-wrap-title">{ __( 'Color Settings' ) }</h2>
								<TabPanel className="kt-inspect-tabs kt-hover-tabs"
									activeClass="active-tab"
									tabs={ [
										{
											name: 'normal',
											title: __( 'Normal' ),
											className: 'kt-normal-tab',
										},
										{
											name: 'hover',
											title: __( 'Hover' ),
											className: 'kt-hover-tab',
										},
									] }>
									{
										( tab ) => {
											let tabout;
											if ( tab.name ) {
												if ( 'hover' === tab.name ) {
													tabout = (
														<AdvancedPopColorControl
															label={ __( 'Hover Color' ) }
															colorValue={ ( titleHoverColor ? titleHoverColor : '' ) }
															colorDefault={ '' }
															onColorChange={ value => setAttributes( { titleHoverColor: value } ) }
														/>
													);
												} else {
													tabout = (
														<AdvancedPopColorControl
															label={ __( 'Title Color' ) }
															colorValue={ ( titleColor ? titleColor : '' ) }
															colorDefault={ '' }
															onColorChange={ value => setAttributes( { titleColor: value } ) }
														/>
													);
												}
											}
											return <div className={ tab.className } key={ tab.className }>{ tabout }</div>;
										}
									}
								</TabPanel>
								<TypographyControls
									fontGroup={ 'heading' }
									tagLevel={ titleFont[ 0 ].level }
									onTagLevel={ ( value ) => saveTitleFont( { level: value } ) }
									fontSize={ titleFont[ 0 ].size }
									onFontSize={ ( value ) => saveTitleFont( { size: value } ) }
									fontSizeType={ titleFont[ 0 ].sizeType }
									onFontSizeType={ ( value ) => saveTitleFont( { sizeType: value } ) }
									lineHeight={ titleFont[ 0 ].lineHeight }
									onLineHeight={ ( value ) => saveTitleFont( { lineHeight: value } ) }
									lineHeightType={ titleFont[ 0 ].lineType }
									onLineHeightType={ ( value ) => saveTitleFont( { lineType: value } ) }
									letterSpacing={ titleFont[ 0 ].letterSpacing }
									onLetterSpacing={ ( value ) => saveTitleFont( { letterSpacing: value } ) }
									fontFamily={ titleFont[ 0 ].family }
									onFontFamily={ ( value ) => saveTitleFont( { family: value } ) }
									onFontChange={ ( select ) => {
										saveTitleFont( {
											family: select.value,
											google: select.google,
										} );
									} }
									onFontArrayChange={ ( values ) => saveTitleFont( values ) }
									googleFont={ titleFont[ 0 ].google }
									onGoogleFont={ ( value ) => saveTitleFont( { google: value } ) }
									loadGoogleFont={ titleFont[ 0 ].loadGoogle }
									onLoadGoogleFont={ ( value ) => saveTitleFont( { loadGoogle: value } ) }
									fontVariant={ titleFont[ 0 ].variant }
									onFontVariant={ ( value ) => saveTitleFont( { variant: value } ) }
									fontWeight={ titleFont[ 0 ].weight }
									onFontWeight={ ( value ) => saveTitleFont( { weight: value } ) }
									fontStyle={ titleFont[ 0 ].style }
									onFontStyle={ ( value ) => saveTitleFont( { style: value } ) }
									fontSubset={ titleFont[ 0 ].subset }
									onFontSubset={ ( value ) => saveTitleFont( { subset: value } ) }
									padding={ titleFont[ 0 ].padding }
									onPadding={ ( value ) => saveTitleFont( { padding: value } ) }
									paddingControl={ titleFont[ 0 ].paddingControl }
									onPaddingControl={ ( value ) => saveTitleFont( { paddingControl: value } ) }
									margin={ titleFont[ 0 ].margin }
									onMargin={ ( value ) => saveTitleFont( { margin: value } ) }
									marginControl={ titleFont[ 0 ].marginControl }
									onMarginControl={ ( value ) => saveTitleFont( { marginControl: value } ) }
								/>
								<h2 className="kt-heading-size-title">{ __( 'Min Height' ) }</h2>
								<TabPanel className="kt-size-tabs"
									activeClass="active-tab"
									tabs={ [
										{
											name: 'desk',
											title: <Dashicon icon="desktop" />,
											className: 'kt-desk-tab',
										},
										{
											name: 'tablet',
											title: <Dashicon icon="tablet" />,
											className: 'kt-tablet-tab',
										},
										{
											name: 'mobile',
											title: <Dashicon icon="smartphone" />,
											className: 'kt-mobile-tab',
										},
									] }>
									{
										( tab ) => {
											let tabout;
											if ( tab.name ) {
												if ( 'mobile' === tab.name ) {
													tabout = (
														<KadenceRange
															value={ ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 2 ] ) ? titleMinHeight[ 2 ] : '' ) }
															onChange={ value => setAttributes( { titleMinHeight: [ ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 0 ] ) ? titleMinHeight[ 0 ] : '' ), ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 1 ] ) ? titleMinHeight[ 1 ] : '' ), value ] } ) }
															step={ 1 }
															min={ 0 }
															max={ 600 }
														/>
													);
												} else if ( 'tablet' === tab.name ) {
													tabout = (
														<KadenceRange
															value={ ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 1 ] ) ? titleMinHeight[ 1 ] : '' ) }
															onChange={ value => setAttributes( { titleMinHeight: [ ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 0 ] ) ? titleMinHeight[ 0 ] : '' ), value, ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 2 ] ) ? titleMinHeight[ 2 ] : '' ) ] } ) }
															step={ 1 }
															min={ 0 }
															max={ 600 }
														/>
													);
												} else {
													tabout = (
														<KadenceRange
															value={ ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 0 ] ) ? titleMinHeight[ 0 ] : '' ) }
															onChange={ value => setAttributes( { titleMinHeight: [ value, ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 1 ] ) ? titleMinHeight[ 1 ] : '' ), ( ( undefined !== titleMinHeight && undefined !== titleMinHeight[ 2 ] ) ? titleMinHeight[ 2 ] : '' ) ] } ) }
															step={ 1 }
															min={ 0 }
															max={ 600 }
														/>
													);
												}
											}
											return <div className={ tab.className } key={ tab.className }>{ tabout }</div>;
										}
									}
								</TabPanel>
							</Fragment>
						) }
					</PanelBody>

					<PanelBody
						title={ __( 'Counter Settings' ) }
						initialOpen={ false }>
						{/*<ToggleControl
							label={ __( 'Show Title' ) }
							checked={ displayCounter }
							onChange={ ( value ) => setAttributes( { displayCounter: value } ) }
						/>*/}

						{ displayCounter && (
							<Fragment>
								<h2 className="kt-tab-wrap-title">{ __( 'Color Settings' ) }</h2>
								<TabPanel className="kt-inspect-tabs kt-hover-tabs"
									activeClass="active-tab"
									tabs={ [
										{
											name: 'normal',
											title: __( 'Normal' ),
											className: 'kt-normal-tab',
										},
										{
											name: 'hover',
											title: __( 'Hover' ),
											className: 'kt-hover-tab',
										},
									] }>
									{
										( tab ) => {
											let tabout;
											if ( tab.name ) {
												if ( 'hover' === tab.name ) {
													tabout = (
														<AdvancedPopColorControl
															label={ __( 'Hover Color' ) }
															colorValue={ ( titleHoverColor ? titleHoverColor : '' ) }
															colorDefault={ '' }
															onColorChange={ value => setAttributes( { counterHoverColor: value } ) }
														/>
													);
												} else {
													tabout = (
														<AdvancedPopColorControl
															label={ __( 'Counter Color' ) }
															colorValue={ ( counterColor ? counterColor : '' ) }
															colorDefault={ '' }
															onColorChange={ value => setAttributes( { counterColor: value } ) }
														/>
													);
												}
											}
											return <div className={ tab.className } key={ tab.className }>{ tabout }</div>;
										}
									}
								</TabPanel>
								<TypographyControls
									fontGroup={ 'heading' }
									tagLevel={ counterFont[ 0 ].level }
									onTagLevel={ ( value ) => saveCounterFont( { level: value } ) }
									fontSize={ counterFont[ 0 ].size }
									onFontSize={ ( value ) => saveCounterFont( { size: value } ) }
									fontSizeType={ counterFont[ 0 ].sizeType }
									onFontSizeType={ ( value ) => saveCounterFont( { sizeType: value } ) }
									lineHeight={ counterFont[ 0 ].lineHeight }
									onLineHeight={ ( value ) => saveCounterFont( { lineHeight: value } ) }
									lineHeightType={ counterFont[ 0 ].lineType }
									onLineHeightType={ ( value ) => saveCounterFont( { lineType: value } ) }
									letterSpacing={ counterFont[ 0 ].letterSpacing }
									onLetterSpacing={ ( value ) => saveCounterFont( { letterSpacing: value } ) }
									fontFamily={ counterFont[ 0 ].family }
									onFontFamily={ ( value ) => saveCounterFont( { family: value } ) }
									onFontChange={ ( select ) => {
										saveCounterFont( {
											family: select.value,
											google: select.google,
										} );
									} }
									onFontArrayChange={ ( values ) => saveCounterFont( values ) }
									googleFont={ counterFont[ 0 ].google }
									onGoogleFont={ ( value ) => saveCounterFont( { google: value } ) }
									loadGoogleFont={ counterFont[ 0 ].loadGoogle }
									onLoadGoogleFont={ ( value ) => saveCounterFont( { loadGoogle: value } ) }
									fontVariant={ counterFont[ 0 ].variant }
									onFontVariant={ ( value ) => saveCounterFont( { variant: value } ) }
									fontWeight={ counterFont[ 0 ].weight }
									onFontWeight={ ( value ) => saveCounterFont( { weight: value } ) }
									fontStyle={ counterFont[ 0 ].style }
									onFontStyle={ ( value ) => saveCounterFont( { style: value } ) }
									fontSubset={ counterFont[ 0 ].subset }
									onFontSubset={ ( value ) => saveCounterFont( { subset: value } ) }
									padding={ counterFont[ 0 ].padding }
									onPadding={ ( value ) => saveCounterFont( { padding: value } ) }
									paddingControl={ counterFont[ 0 ].paddingControl }
									onPaddingControl={ ( value ) => saveCounterFont( { paddingControl: value } ) }
									margin={ counterFont[ 0 ].margin }
									onMargin={ ( value ) => saveCounterFont( { margin: value } ) }
									marginControl={ counterFont[ 0 ].marginControl }
									onMarginControl={ ( value ) => saveCounterFont( { marginControl: value } ) }
								/>
								<h2 className="kt-heading-size-title">{ __( 'Min Height' ) }</h2>
								<TabPanel className="kt-size-tabs"
									activeClass="active-tab"
									tabs={ [
										{
											name: 'desk',
											title: <Dashicon icon="desktop" />,
											className: 'kt-desk-tab',
										},
										{
											name: 'tablet',
											title: <Dashicon icon="tablet" />,
											className: 'kt-tablet-tab',
										},
										{
											name: 'mobile',
											title: <Dashicon icon="smartphone" />,
											className: 'kt-mobile-tab',
										},
									] }>
									{
										( tab ) => {
											let tabout;
											if ( tab.name ) {
												if ( 'mobile' === tab.name ) {
													tabout = (
														<KadenceRange
															value={ ( ( undefined !== counterMinHeight && undefined !== counterMinHeight[ 2 ] ) ? counterMinHeight[ 2 ] : '' ) }
															onChange={ value => setAttributes( { counterMinHeight: [ ( ( undefined !== counterMinHeight && undefined !== counterMinHeight[ 0 ] ) ? counterMinHeight[ 0 ] : '' ), ( ( undefined !== counterMinHeight && undefined !== counterMinHeight[ 1 ] ) ? counterMinHeight[ 1 ] : '' ), value ] } ) }
															step={ 1 }
															min={ 0 }
															max={ 600 }
														/>
													);
												} else if ( 'tablet' === tab.name ) {
													tabout = (
														<KadenceRange
															value={ ( ( undefined !== counterMinHeight && undefined !== counterMinHeight[ 1 ] ) ? counterMinHeight[ 1 ] : '' ) }
															onChange={ value => setAttributes( { counterMinHeight: [ ( ( undefined !== counterMinHeight && undefined !== counterMinHeight[ 0 ] ) ? counterMinHeight[ 0 ] : '' ), value, ( ( undefined !== counterMinHeight && undefined !== counterMinHeight[ 2 ] ) ? counterMinHeight[ 2 ] : '' ) ] } ) }
															step={ 1 }
															min={ 0 }
															max={ 600 }
														/>
													);
												} else {
													tabout = (
														<KadenceRange
															value={ ( ( undefined !== counterMinHeight && undefined !== counterMinHeight[ 0 ] ) ? counterMinHeight[ 0 ] : '' ) }
															onChange={ value => setAttributes( { counterMinHeight: [ value, ( ( undefined !== counterMinHeight && undefined !== counterMinHeight[ 1 ] ) ? counterMinHeight[ 1 ] : '' ), ( ( undefined !== counterMinHeight && undefined !== counterMinHeight[ 2 ] ) ? counterMinHeight[ 2 ] : '' ) ] } ) }
															step={ 1 }
															min={ 0 }
															max={ 600 }
														/>
													);
												}
											}
											return <div className={ tab.className } key={ tab.className }>{ tabout }</div>;
										}
									}
								</TabPanel>
							</Fragment>
						) }
					</PanelBody>
	            </InspectorControls>
	        </Fragment>
		);
	}
}

export default Inspector;
