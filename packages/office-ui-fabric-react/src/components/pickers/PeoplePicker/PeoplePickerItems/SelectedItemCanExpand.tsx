/* tslint:disable */
import * as React from 'react';
/* tslint:enable */
import { BaseComponent, autobind, css, getId } from '../../../../Utilities';
import { Persona, PersonaSize, PersonaPresence } from '../../../../Persona';
import { IPeoplePickerItemProps, IExtendedPersonaProps } from './PeoplePickerItem.Props';
import { ValidationState } from '../../BasePicker.Props';
import { IconButton } from '../../../../Button';
import { SelectedItemDefault } from './SelectedItemDefault';
import * as stylesImport from './PickerItemsDefault.scss';
import { ContextualMenu, DirectionalHint, IContextualMenuItem } from '../../../../ContextualMenu';
const styles: any = stylesImport;

export interface IPeoplePickerItemState {
  contextualMenuVisible: boolean;
}

export class SelectedItemCanExpand extends BaseComponent<IPeoplePickerItemProps, IPeoplePickerItemState> {
  private menuItems: IContextualMenuItem[];
  public refs: {
    persona: HTMLElement
  };

  constructor(props: IPeoplePickerItemProps) {
    super(props);
    this.state = { contextualMenuVisible: false };

    this.menuItems = [
      {
        key: 'Copy',
        name: 'Copy',
        onClick: () => {
          if (this.props.onCopyItem) {
            this.props.onCopyItem(this.props.item as IExtendedPersonaProps);
          }
        },
      },
      {
        key: 'Remove',
        name: 'Remove',
        onClick: this.onClickIconButton(this.props.onRemoveItem),
      },
    ];
  }

  public render() {
    let {
      item,
      onExpandItem,
      onRemoveItem,
      removeButtonAriaLabel,
      index,
      selected
    } = this.props;
    const itemId = getId();
    if (item.canExpand) {
      return (
        <div
          ref='persona'
          className={ css(
            'ms-PickerPersona-container',
            styles.personaContainer,
            { ['is-selected ' + styles.personaContainerIsSelected]: selected },
            { ['is-invalid ' + styles.validationError]: item.ValidationState === ValidationState.warning }
          ) }
          data-is-focusable={ true }
          data-is-sub-focuszone={ true }
          data-selection-index={ index }
          role={ 'listitem' }
          aria-labelledby={ 'selectedItemPersona-' + itemId }
          onContextMenu={ this._onClick }
        >
          <IconButton
            onClick={ this.onClickIconButton(onExpandItem) }
            iconProps={ { iconName: 'Add', style: { fontSize: '12px' } } }
            className={ css('ms-PickerItem-removeButton', styles.expandButton) }
            ariaLabel={ removeButtonAriaLabel }
          />
          <div className={ styles.personaWrapper }>
            <div
              className={ css('ms-PickerItem-content', styles.itemContent) }
              id={ 'selectedItemPersona-' + itemId }
            >
              <Persona
                { ...item }
                presence={ item.presence !== undefined ? item.presence : PersonaPresence.none }
                size={ PersonaSize.size28 }
              />
            </div>
            <IconButton
              onClick={ this.onClickIconButton(onRemoveItem) }
              iconProps={ { iconName: 'Cancel', style: { fontSize: '12px' } } }
              className={ css('ms-PickerItem-removeButton', styles.removeButton) }
              ariaLabel={ removeButtonAriaLabel }
            />
          </div >
          { this.state.contextualMenuVisible ? (
            <ContextualMenu
              items={ this.menuItems }
              shouldFocusOnMount={ true }
              target={ this.refs.persona }
              onDismiss={ this._onCloseContextualMenu }
              directionalHint={ DirectionalHint.bottomAutoEdge }
            />)
            : null }
        </div>)
    } else {
      return <SelectedItemDefault {...this.props} />
    }
  }

  private onClickIconButton = (action: (() => void) | undefined): () => void => {
    return (): void => {
      if (action) {
        action();
      }
    };
  };

  @autobind
  private _onClick(ev: React.MouseEvent<HTMLElement>) {
    ev.preventDefault();
    this.setState({ contextualMenuVisible: true });
  }

  @autobind
  private _onCloseContextualMenu(ev: Event) {
    this.setState({ contextualMenuVisible: false });
  }
}
