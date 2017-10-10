/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BasePicker, BaseAutoFill, IInputProps } from 'office-ui-fabric-react/lib/Pickers';
import { autobind, css, KeyCodes } from '../../Utilities';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { SelectionZone, SelectionMode, IObjectWithKey } from 'office-ui-fabric-react/src/utilities/selection/index';
import { IBaseFloatingPickerProps } from './BaseFloatingPicker.Props';
import { IBaseExtendedPickerProps } from './BaseExtendedPicker.Props';
import { BaseFloatingPicker } from './BaseFloatingPicker';
import * as stylesImport from '../../../../office-ui-fabric-react/src/components/pickers/BasePicker.scss';
// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export class BaseExtendedPicker<T, P extends IBaseExtendedPickerProps<T>> extends BasePicker<T, P> {

  protected floatingPicker: BaseFloatingPicker<IPersonaProps, IBaseFloatingPickerProps<IPersonaProps>>;

  public componentDidMount(): void {
    this.selection.setItems(this.state.items as IObjectWithKey[]);
    this.forceUpdate();
  }

  public render(): JSX.Element {
    let { suggestedDisplayValue } = this.state;
    let {
        className,
      inputProps,
      disabled
      } = this.props;

    const selectedSuggestionAlert = this.floatingPicker ? this.floatingPicker.selectedSuggestionAlert : undefined;

    return (
      <div
        ref={ this._resolveRef('root') }
        className={ css(
          'ms-BasePicker',
          className ? className : '') }
      >
        <FocusZone
          ref={ this._resolveRef('focusZone') }
          direction={ FocusZoneDirection.bidirectional }
          isInnerZoneKeystroke={ this._isFocusZoneInnerKeystroke }
          onKeyDown={ this.onBackspace }
        >
          { <div className={ styles.screenReaderOnly } role='alert' id='selected-suggestion-alert' aria-live='assertive'>
            { selectedSuggestionAlert } </div> }
          <SelectionZone selection={ this.selection } selectionMode={ SelectionMode.multiple }>
            <div className={ css('ms-BasePicker-text', styles.pickerText) } role={ 'list' }>
              { this.renderItems() }
              { this.canAddItems() && (<BaseAutoFill
                { ...inputProps as IInputProps }
                className={ css('ms-BasePicker-input', styles.pickerInput) }
                ref={ this._resolveRef('input') }
                onFocus={ this.onInputFocus }
                onInputValueChange={ this.onInputChange }
                suggestedDisplayValue={ suggestedDisplayValue }
                aria-activedescendant={ 'sug-' + this.items.length }
                aria-owns='suggestion-list'
                aria-expanded='true'
                aria-haspopup='true'
                autoCapitalize='off'
                autoComplete='off'
                role='combobox'
                disabled={ disabled }
                aria-controls='selected-suggestion-alert'
              />) }
            </div>
          </SelectionZone>
        </FocusZone>
        { this.renderSuggestions() }
      </div>
    );
  }

  protected renderSuggestions(): JSX.Element | null {
    let TypedFloatingPicker = this.props.floatingPickerType as (new (props: IBaseFloatingPickerProps<IPersonaProps>) =>
      BaseFloatingPicker<IPersonaProps, IBaseFloatingPickerProps<IPersonaProps>>);
    return (
      <TypedFloatingPicker
        onZeroQuerySuggestion={ this.props.onEmptyInputFocus }
        onRenderSuggestionsItem={ this.props.onRenderSuggestionsItem }
        onResolveSuggestions={ this.props.onResolveSuggestions }
        onGetMoreResults={ this.props.onGetMoreResults }
        onRemoveSuggestion={ this.props.onRemoveSuggestion }
        onValidateInput={ this.props.onValidateInput }
        createGenericItem={ this.props.createGenericItem }
        getTextFromItem={ this.props.getTextFromItem }
        pickerSuggestionsProps={ this.props.pickerSuggestionsProps }
        ref={ this._resolveRef('floatingPicker') }
        onChange={ this.addItem }
        inputElement={ this.input ? this.input.inputElement : undefined }
        selectedItems={ this.state.items }
      />
    );
  }

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  @autobind
  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>): void {
    if (ev.which !== KeyCodes.backspace) {
      return;
    }
    if (this.state.items.length && !this.input || !this.input.isValueSelected) {
      if (this.selection.getSelectedCount() > 0) {
        ev.preventDefault();
        this.removeItems(this.selection.getSelection());
        this.input.focus();
      } else if ((this.input as BaseAutoFill).cursorLocation === 0) {
        this.removeItem(this.state.items[this.state.items.length - 1]);
      }
    }
  }

  @autobind
  protected onInputChange(value: string): void {
    this.floatingPicker.onQueryStringChanged(value);
  }

  @autobind
  protected onInputFocus(ev: React.FocusEvent<HTMLInputElement | BaseAutoFill>): void {
    this.selection.setAllSelected(false);
    this.floatingPicker.showPicker();

    if (this.props.inputProps && this.props.inputProps.onFocus) {
      this.props.inputProps.onFocus(ev as React.FocusEvent<HTMLInputElement>);
    }
  }

  @autobind
  protected _isFocusZoneInnerKeystroke(ev: React.KeyboardEvent<HTMLElement>): boolean {
    // If suggestions are shown let up/down keys control them, otherwise allow them through to control the focusZone.
    if (this.floatingPicker.isSuggestionsShown) {
      switch (ev.which) {
        case KeyCodes.up:
        case KeyCodes.down:
          return true;
      }
    }

    if (ev.which === KeyCodes.enter) {
      return true;
    }

    return false;
  }

  @autobind
  protected addItem(item: T): void {
    super.addItem(item);
    this.input.clear();
  }
}