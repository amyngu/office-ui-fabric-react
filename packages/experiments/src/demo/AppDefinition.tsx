// tslint:disable:no-any
import * as React from 'react';
import { App as AppBase, IAppDefinition, IAppProps } from '@uifabric/example-app-base';

export const AppDefinition: IAppDefinition = {
  appTitle: 'Fabric - React',

  testPages: [
  ],
  examplePages: [
    {
      links: [
        {
          component: require<any>('../components/CommandBar/CommandBarPage').CommandBarPage,
          key: 'CommandBar',
          name: 'CommandBar',
          url: '#/examples/commandbar'
        },
        {
          component: require<any>('../components/FolderCover/FolderCoverPage').FolderCoverPage,
          key: 'FolderCover',
          name: 'FolderCover',
          url: '#/examples/foldercover'
        },
        {
          component: require<any>('../components/LayoutGroup/LayoutGroupPage').LayoutGroupPage,
          key: 'LayoutGroup',
          name: 'LayoutGroup',
          url: '#/examples/layoutgroup'
        },
        {
          component: require<any>('../components/SelectionItemsList/PeopleItemList/PeopleItemListPage').PeopleItemListPage,
          key: 'PeopleItemList',
          name: 'PeopleItemList',
          url: '#/examples/peopleitemlist'
        },
        {
          component: require<any>('../components/Tile/TilePage').TilePage,
          key: 'Tile',
          name: 'Tile',
          url: '#/examples/tile'
        },
        {
          component: require<any>('../components/TilesList/TilesListPage').TilesListPage,
          key: 'TilesList',
          name: 'TilesList',
          url: '#/examples/tileslist'
        },
        {
          component: require<any>('../components/ExtendedPicker/PeoplePicker/ExtendedPeoplePickerPage').ExtendedPeoplePickerPage,
          key: 'ExtendedPeoplePicker',
          name: 'ExtendedPeoplePicker',
          url: '#/examples/extendedpeoplepicker'
        },
        {
          component: require<any>('../components/ExtendedPicker/PeoplePicker/FloatingPeoplePickerPage').FloatingPeoplePickerPage,
          key: 'FloatingPeoplePicker',
          name: 'FloatingPeoplePicker',
          url: '#/examples/floatingpeoplepicker'
        }
      ]
    }
  ],
  headerLinks: [
    {
      name: 'Getting started',
      url: '#/'
    },
    {
      name: 'Fabric',
      url: 'http://dev.office.com/fabric'
    },
    {
      name: 'Github',
      url: 'http://www.github.com/officedev'
    }
  ]

};

export const App = (props: IAppProps) => <AppBase appDefinition={ AppDefinition } { ...props } />;
