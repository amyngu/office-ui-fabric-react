/* tslint:disable */
import * as React from 'react';
import { ValidationState } from 'office-ui-fabric-react/lib/Pickers';
/* tslint:enable */
import { BaseSelectedItemsList } from '../BaseSelectedItemsList';
import { IBaseSelectedItemsListProps, ISelectedItemProps } from '../BaseSelectedItemsList.types';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { ExtendedSelectedItem } from './Items/ExtendedSelectedItem';
import { autobind } from '../../../Utilities';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IBaseFloatingPickerProps } from '../../../FloatingPicker';
import { EditingItem } from './Items/EditingItem';

export interface IExtendedPersonaProps extends IPersonaProps {
  canExpand?: boolean;
  isEditing?: boolean;
}

export interface ISelectedPeopleItemProps extends ISelectedItemProps<IExtendedPersonaProps & { ValidationState: ValidationState }> {
  onExpandItem?: () => void;
  menuItems: IContextualMenuItem[];
}

export interface ISelectedPeopleProps extends IBaseSelectedItemsListProps<IExtendedPersonaProps> {
  onExpandGroup?: (item: IExtendedPersonaProps) => void;
  removeMenuItemText?: string;
  copyMenuItemText?: string;
  editMenuItemText?: string;
  getEditingItemText?: (item: IExtendedPersonaProps) => string;
  onRenderFloatingPicker?: (props: IBaseFloatingPickerProps<IExtendedPersonaProps>) => JSX.Element;
  floatingPickerProps?: IBaseFloatingPickerProps<IExtendedPersonaProps>;
}

export class BasePeopleSelectedItemsList extends BaseSelectedItemsList<IExtendedPersonaProps, ISelectedPeopleProps> {
}

/**
 * Standard People Picker.
 */
export class SelectedPeopleList extends BasePeopleSelectedItemsList {

  // tslint:disable-next-line:no-any
  public static defaultProps: any = {
    onRenderItem: (props: ISelectedPeopleItemProps) => <ExtendedSelectedItem {...props} />,
  };

  @autobind
  public replaceItem(itemToReplace: IExtendedPersonaProps, itemsToReplaceWith: IExtendedPersonaProps[]): void {
    let { items } = this.state;
    let index: number = items.indexOf(itemToReplace);
    if (index > -1) {
      let newItems = items.slice(0, index).concat(itemsToReplaceWith).concat(items.slice(index + 1));
      this.updateSelectedItems(newItems);
    }
  }

  @autobind
  protected renderItems(): JSX.Element[] {
    let { items } = this.state;
    // tslint:disable-next-line:no-any
    return items.map((item: any, index: number) => this._renderItem(item, index));
  }

  // tslint:disable-next-line:no-any
  private _renderItem(item: any, index: number): JSX.Element {
    let { removeButtonAriaLabel } = this.props;
    let props = {
      item,
      index,
      key: item.key ? item.key : index,
      selected: this.selection.isIndexSelected(index),
      onRemoveItem: () => this.removeItem(item),
      onItemChange: this.onItemChange,
      removeButtonAriaLabel: removeButtonAriaLabel,
      onCopyItem: (itemToCopy: IExtendedPersonaProps) => this.copyItems([itemToCopy]),
      onExpandItem: this.props.onExpandGroup ? () => (this.props.onExpandGroup as (item: IExtendedPersonaProps) => void)(item) : undefined,
      menuItems: this._createMenuItems(item),
    };

    if ((item as IExtendedPersonaProps).isEditing) {
      return (
        <EditingItem
          {...props}
          onRenderFloatingPicker={ this.props.onRenderFloatingPicker }
          floatingPickerProps={ this.props.floatingPickerProps }
          onEditingComplete={ this._completeEditing }
          getEditingItemText={ this.props.getEditingItemText }
        />
      );
    } else {
      let onRenderItem = this.props.onRenderItem as (props: ISelectedPeopleItemProps) => JSX.Element;
      return onRenderItem({ ...props });
    }
  }

  @autobind
  // tslint:disable-next-line:no-any
  private _completeEditing(oldItem: any, newItem: any): void {
    oldItem.isEditing = false;
    this.replaceItem(oldItem, newItem);
  }

  // tslint:disable-next-line:no-any
  private _createMenuItems(item: any): IContextualMenuItem[] {
    let menuItems: IContextualMenuItem[] = [];

    if (this.props.editMenuItemText && this.props.getEditingItemText) {
      menuItems.push({
        key: 'Edit',
        name: this.props.editMenuItemText ? this.props.editMenuItemText : 'Edit',
        onClick: (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) => {
          (menuItem.data as IExtendedPersonaProps).isEditing = true;
          this.forceUpdate();
        },
        data: item,
      });
    }

    menuItems.push(
      {
        key: 'Remove',
        name: this.props.removeMenuItemText ? this.props.removeMenuItemText : 'Remove',
        onClick: (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) => {
          this.removeItem(menuItem.data as ISelectedItemProps<IExtendedPersonaProps>);
        },
        data: item,
      },
      {
        key: 'Copy',
        name: this.props.copyMenuItemText ? this.props.copyMenuItemText : 'Copy',
        onClick: (ev: React.MouseEvent<HTMLElement>, menuItem: IContextualMenuItem) => {
          if (this.props.onCopyItems) {
            (this.copyItems as (items: IExtendedPersonaProps[]) => void)([menuItem.data] as IExtendedPersonaProps[]);
          }
        },
        data: item,
      },
    );

    return menuItems;
  }
}