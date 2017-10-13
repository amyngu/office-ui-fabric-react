/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { getRTL, getInitials, autobind } from '../../../Utilities';
import { BasePicker, BasePickerListBelow } from '../BasePicker';
import { IBasePickerProps, IBasePickerSuggestionsProps, ValidationState } from '../BasePicker.Props';
import { SelectedItemDefault } from './PeoplePickerItems/SelectedItemDefault';
import { SelectedItemCanExpand } from './PeoplePickerItems/SelectedItemCanExpand';
import { IPersonaProps } from '../../../Persona';
import { SuggestionItemSmall, SuggestionItemNormal } from './PeoplePickerItems/SuggestionItemDefault';
import './PeoplePicker.scss';
import { IPeoplePickerItemProps, IExtendedPersonaProps } from './PeoplePickerItems/PeoplePickerItem.Props';

export interface IPeoplePickerPersonaProps extends IPersonaProps {

}

export interface IPeoplePickerProps extends IBasePickerProps<IPeoplePickerPersonaProps> {
  onExpandGroup?: (item: IPeoplePickerItemProps) => void;
  onCopyItems?: (items: IExtendedPersonaProps[]) => string;
}

export class BasePeoplePicker extends BasePicker<IPeoplePickerPersonaProps, IPeoplePickerProps> {
  // removeItemTest?: (item: IPersonaProps) => void;
  // addItemTest?: (items: IPersonaProps[]) => void;
}

export class MemberListPeoplePicker extends BasePickerListBelow<IPersonaProps, IPeoplePickerProps> {
}

/**
 * Standard People Picker.
 */
export class NormalPeoplePicker extends BasePeoplePicker {
  public static defaultProps = {
    onRenderItem: (props: IPeoplePickerItemProps) => <SelectedItemCanExpand {...props} />,
    onRenderSuggestionsItem: (props: IPersonaProps, itemProps?: IBasePickerSuggestionsProps) => SuggestionItemNormal({ ...props }, { ...itemProps }),
    createGenericItem: createGenericItem
  };

  public onExpandItem(itemToExpand: IPeoplePickerItemProps, expandedItems: IExtendedPersonaProps[]): void {
    let { items } = this.state;
    let index: number = items.indexOf(itemToExpand);
    let filteredExpandedItems = expandedItems.filter((item: any) => items.indexOf(item) === -1)
    if (index >= 0) {
      let newItems = items.slice(0, index).concat(filteredExpandedItems).concat(items.slice(index + 1));
      this._updateSelectedItems(newItems);
    }
  }

  protected renderItems(): JSX.Element[] {
    let { disabled, removeButtonAriaLabel } = this.props;
    let onRenderItem = this.props.onRenderItem as (props: IPeoplePickerItemProps) => JSX.Element;

    let { items } = this.state;
    return items.map((item: any, index: number) => onRenderItem({
      item,
      index,
      key: item.key ? item.key : index,
      selected: this.selection.isIndexSelected(index),
      onRemoveItem: () => this.removeItem(item),
      disabled: disabled,
      onItemChange: this.onItemChange,
      removeButtonAriaLabel: removeButtonAriaLabel,
      onExpandItem: () => (this.props.onExpandGroup as any)(item),
      onCopyItem: (item: IExtendedPersonaProps) => this._copyItems([item]),
    }));
  }

  @autobind
  protected onCopy(ev: React.ClipboardEvent<HTMLElement>) {
    if (this.props.onCopyItems && this.selection.getSelectedCount() > 0) {
      let selectedItems: IExtendedPersonaProps[] = this.selection.getSelection() as IExtendedPersonaProps[];
      this._copyItems(selectedItems);
    }
  }

  private _copyItems(items: IExtendedPersonaProps[]) {
    let copyText = (this.props.onCopyItems as any)(items);

    var copyInput = document.createElement('input') as HTMLInputElement;
    //copyInput.className = styles.copyInput;
    document.body.appendChild(copyInput);

    try {
      // Try to copy the text directly to the clipboard
      copyInput.value = copyText;
      copyInput.select();
      if (!document.execCommand('copy')) {
        // The command failed. Fallback to the method below.
        throw new Error();
      }
    } catch (err) {
      // The above method didn't work. Fallback to a prompt.
      window.prompt("Cannot copy", copyText);
    } finally {
      document.body.removeChild(copyInput);
    }
  }
}

/**
* Compact layout. It uses small personas when displaying search results.
*/
export class CompactPeoplePicker extends BasePeoplePicker {
  public static defaultProps = {
    onRenderItem: (props: IPeoplePickerItemProps) => <SelectedItemDefault {...props} />,
    onRenderSuggestionsItem: (props: IPersonaProps, itemProps?: IBasePickerSuggestionsProps) => SuggestionItemSmall({ ...props }, { ...itemProps }),
    createGenericItem: createGenericItem
  };
}

/**
 * MemberList layout. The selected people show up below the search box.
 */
export class ListPeoplePicker extends MemberListPeoplePicker {
  public static defaultProps = {
    onRenderItem: (props: IPeoplePickerItemProps) => <SelectedItemDefault {...props} />,
    onRenderSuggestionsItem: (props: IPersonaProps, itemProps?: IBasePickerSuggestionsProps) => SuggestionItemNormal({ ...props }, { ...itemProps }),
    createGenericItem: createGenericItem
  };
}

export function createGenericItem(name: string, currentValidationState: ValidationState) {
  let personaToConvert = {
    key: name,
    primaryText: name,
    imageInitials: '!',
    ValidationState: currentValidationState
  };

  if (currentValidationState !== ValidationState.warning) {
    personaToConvert.imageInitials = getInitials(name, getRTL());
  }

  return personaToConvert;
}