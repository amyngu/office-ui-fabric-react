import { IContextualMenuItem } from '../../../../ContextualMenu';
import { IPersonaProps } from '../../../../Persona';
import { IPickerItemProps } from '../../PickerItem.Props';
import { ValidationState } from '../../BasePicker.Props';

export interface IExtendedPersonaProps extends IPersonaProps {
  email?: string;
  canExpand?: boolean;
}

export interface IPeoplePickerItemProps extends IPickerItemProps<IExtendedPersonaProps & { ValidationState: ValidationState }> {
  onExpandItem: () => void;
  onCopyItem: (item: IExtendedPersonaProps) => void;
}

export interface IPeoplePickerCanExpandItemProps extends IPeoplePickerItemProps {
  onExpandItem: () => void;
}

export interface IPeoplePickerItemWithMenuProps extends IPickerItemProps<IPersonaWithMenu> {
  item: IPersonaWithMenu;
}

export interface IPersonaWithMenu extends IPersonaProps {
  menuItems?: IContextualMenuItem[];
}