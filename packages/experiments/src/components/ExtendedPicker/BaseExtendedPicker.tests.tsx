/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
/* tslint:enable:no-unused-variable */
import * as renderer from 'react-test-renderer';

import { IBaseExtendedPickerProps } from './BaseExtendedPicker.types';
import { BaseExtendedPicker } from './BaseExtendedPicker';
import { SuggestionsController } from 'office-ui-fabric-react/lib/Pickers';
import { IBaseFloatingPickerProps, BaseFloatingPicker } from '../FloatingPicker';
import { IBaseSelectedItemsListProps, ISelectedItemProps, BaseSelectedItemsList } from '../SelectedItemsList';
import { KeyCodes } from '../../Utilities';

function onResolveSuggestions(text: string): ISimple[] {
  return [
    'black',
    'blue',
    'brown',
    'cyan',
    'green',
    'magenta',
    'mauve',
    'orange',
    'pink',
    'purple',
    'red',
    'rose',
    'violet',
    'white',
    'yellow'
  ].filter((tag: string) => tag.toLowerCase().indexOf(text.toLowerCase()) === 0).map(((item: string) => ({ key: item, name: item })));
}

const BasePickerWithType = BaseFloatingPicker as new (props: IBaseFloatingPickerProps<ISimple>)
  => BaseFloatingPicker<ISimple, IBaseFloatingPickerProps<ISimple>>;

const BaseSelectedItemsListWithType = BaseSelectedItemsList as new (props: IBaseSelectedItemsListProps<ISimple>)
  => BaseSelectedItemsList<ISimple, IBaseSelectedItemsListProps<ISimple>>;

const basicSuggestionRenderer = (props: ISimple) => {
  return <div> { props.name } </div>;
};

const basicItemRenderer = (props: ISelectedItemProps<ISimple>) => {
  return <div> { props.name } </div>;
};

const basicRenderFloatingPicker = (props: IBaseFloatingPickerProps<ISimple>) => {
  return <BasePickerWithType {...props} />;
};

const basicRenderSelectedItemsList = (props: IBaseSelectedItemsListProps<ISimple>) => {
  return <BaseSelectedItemsListWithType />;
};

const floatingPickerProps = {
  onResolveSuggestions: onResolveSuggestions,
  onRenderSuggestionsItem: basicSuggestionRenderer,
  suggestionsController: new SuggestionsController<ISimple>()
};

const selectedItemsListProps: IBaseSelectedItemsListProps<ISimple> = {
  onRenderItem: basicItemRenderer
};

export interface ISimple {
  key: string;
  name: string;
}

export type TypedBaseExtendedPicker = BaseExtendedPicker<ISimple, IBaseExtendedPickerProps<ISimple>>;

describe('Pickers', () => {
  describe('BasePicker', () => {
    const BaseExtendedPickerWithType = BaseExtendedPicker as new (props: IBaseExtendedPickerProps<ISimple>)
      => BaseExtendedPicker<ISimple, IBaseExtendedPickerProps<ISimple>>;

    it('renders BaseExtendedPicker correctly', () => {
      const component = renderer.create(
        <BaseExtendedPickerWithType
          floatingPickerProps={ floatingPickerProps }
          selectedItemsListProps={ selectedItemsListProps }
          onRenderSelectedItems={ basicRenderSelectedItemsList }
          onRenderFloatingPicker={ basicRenderFloatingPicker }
        />
      );
      let tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('force resolves to the first suggestion', () => {
      let root = document.createElement('div');
      document.body.appendChild(root);

      let picker: TypedBaseExtendedPicker = ReactDOM.render(
        <BaseExtendedPickerWithType
          floatingPickerProps={ floatingPickerProps }
          selectedItemsListProps={ selectedItemsListProps }
          onRenderSelectedItems={ basicRenderSelectedItemsList }
          onRenderFloatingPicker={ basicRenderFloatingPicker }
        />,
        root
      ) as TypedBaseExtendedPicker;

      if (picker.inputElement) {
        picker.inputElement.value = 'bl';
      }

      expect(picker.floatingPicker.suggestions.length).toBe(2);
      expect(picker.floatingPicker.suggestions[0].name).toBe('black');

      // Force resolve to the first suggestions
      picker.floatingPicker.forceResolveSuggestion();
      expect(picker.items.length).toBe(1);
      expect(picker.items[0].name).toBe('black');

      ReactDOM.unmountComponentAtNode(root);
    });

    it('Can hide and show picker', () => {
      let root = document.createElement('div');
      document.body.appendChild(root);

      let picker: TypedBaseExtendedPicker = ReactDOM.render(
        <BaseExtendedPickerWithType
          floatingPickerProps={ floatingPickerProps }
          selectedItemsListProps={ selectedItemsListProps }
          onRenderSelectedItems={ basicRenderSelectedItemsList }
          onRenderFloatingPicker={ basicRenderFloatingPicker }
        />,
        root
      ) as TypedBaseExtendedPicker;

      if (picker.inputElement) {
        picker.inputElement.value = 'bl';
      }

      expect(picker.floatingPicker.isSuggestionsShown).toBeTruthy();
      picker.floatingPicker.hidePicker();
      expect(picker.floatingPicker.isSuggestionsShown).toBeFalsy();
      picker.floatingPicker.showPicker();
      expect(picker.floatingPicker.isSuggestionsShown).toBeTruthy();

      ReactDOM.unmountComponentAtNode(root);
    });

    it('Completes the suggestion', () => {
      let root = document.createElement('div');
      document.body.appendChild(root);

      let picker: TypedBaseExtendedPicker = ReactDOM.render(
        <BaseExtendedPickerWithType
          floatingPickerProps={ floatingPickerProps }
          selectedItemsListProps={ selectedItemsListProps }
          onRenderSelectedItems={ basicRenderSelectedItemsList }
          onRenderFloatingPicker={ basicRenderFloatingPicker }
        />,
        root
      ) as TypedBaseExtendedPicker;

      if (picker.inputElement) {
        picker.inputElement.value = 'bl';
        ReactTestUtils.Simulate.keyDown(picker.inputElement, { which: KeyCodes.down });
      }

      picker.floatingPicker.completeSuggestion();
      expect(picker.selectedItemsList.items.length).toBe(1);
      expect(picker.selectedItemsList.items[0].name).toBe('blue');

      ReactDOM.unmountComponentAtNode(root);
    });
  });
});
