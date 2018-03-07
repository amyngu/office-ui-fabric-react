  // Your use of the content in the files referenced here is subject to the terms of the license at https://aka.ms/fabric-assets-license

// tslint:disable:max-line-length

import {
  IIconOptions,
  IIconSubset,
  registerIcons
} from '@uifabric/styling/lib/index';

export function initializeIcons(
  baseUrl: string = '',
  options?: IIconOptions
): void {
  const subset: IIconSubset = {
    style: {
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontStyle: 'normal',
      fontWeight: 'normal',
      speak: 'none'
    },
    fontFace: {
      fontFamily: `"FabricMDL2Icons-4"`,
      src: `url('${baseUrl}fabric-icons-4-0838b5e4.woff') format('woff')`,
    },
    icons: {
      'Drop': '\uEB42',
      'SkiResorts': '\uEB45',
      'Snowflake': '\uEB46',
      'BusSolid': '\uEB47',
      'FerrySolid': '\uEB48',
      'AirplaneSolid': '\uEB4C',
      'TrainSolid': '\uEB4D',
      'Ticket': '\uEB54',
      'Devices4': '\uEB66',
      'AzureLogo': '\uEB6A',
      'BingLogo': '\uEB6B',
      'MSNLogo': '\uEB6C',
      'OutlookLogoInverse': '\uEB6D',
      'OfficeLogo': '\uEB6E',
      'SkypeLogo': '\uEB6F',
      'Door': '\uEB75',
      'EditMirrored': '\uEB7E',
      'GiftCard': '\uEB8E',
      'DoubleBookmark': '\uEB8F',
      'StatusErrorFull': '\uEB90',
      'Certificate': '\uEB95',
      'FastForward': '\uEB9D',
      'Rewind': '\uEB9E',
      'Photo2': '\uEB9F',
      'OpenSource': '\uEBC2',
      'Movers': '\uEBCD',
      'CloudDownload': '\uEBD3',
      'Family': '\uEBDA',
      'WindDirection': '\uEBE6',
      'Bug': '\uEBE8',
      'SiteScan': '\uEBEC',
      'BrowserScreenShot': '\uEBED',
      'F12DevTools': '\uEBEE',
      'CSS': '\uEBEF',
      'JS': '\uEBF0',
      'DeliveryTruck': '\uEBF4',
      'ReminderPerson': '\uEBF7',
      'ReminderGroup': '\uEBF8',
      'TabletMode': '\uEBFC',
      'Umbrella': '\uEC04',
      'NetworkTower': '\uEC05',
      'CityNext': '\uEC06',
      'Section': '\uEC0C',
      'OneNoteLogoInverse': '\uEC0D',
      'ToggleFilled': '\uEC11',
      'ToggleBorder': '\uEC12',
      'SliderThumb': '\uEC13',
      'ToggleThumb': '\uEC14',
      'Documentation': '\uEC17',
      'Badge': '\uEC1B',
      'Giftbox': '\uEC1F',
      'VisualStudioLogo': '\uEC22',
      'ExcelLogoInverse': '\uEC28',
      'WordLogoInverse': '\uEC29',
      'PowerPointLogoInverse': '\uEC2A',
      'Cafe': '\uEC32',
      'SpeedHigh': '\uEC4A',
      'Commitments': '\uEC4D',
      'ThisPC': '\uEC4E',
      'MusicNote': '\uEC4F',
      'MicOff': '\uEC54',
      'EdgeLogo': '\uEC60',
      'CompletedSolid': '\uEC61',
      'AlbumRemove': '\uEC62',
      'MessageFill': '\uEC70',
      'TabletSelected': '\uEC74',
      'MobileSelected': '\uEC75',
      'LaptopSelected': '\uEC76',
      'TVMonitorSelected': '\uEC77',
      'DeveloperTools': '\uEC7A',
      'InsertTextBox': '\uEC7D',
      'LowerBrightness': '\uEC8A',
      'DOM': '\uEC8D',
      'CloudUpload': '\uEC8E',
      'ScrollUpDown': '\uEC8F',
      'DateTime': '\uEC92',
      'Event': '\uECA3',
      'Cake': '\uECA4',
      'Org': '\uECA6',
      'PartyLeader': '\uECA7',
      'DRM': '\uECA8',
      'CloudAdd': '\uECA9',
      'AppIconDefault': '\uECAA',
      'Photo2Add': '\uECAB',
      'Photo2Remove': '\uECAC',
      'POI': '\uECAF',
      'AddTo': '\uECC8',
      'RadioBtnOff': '\uECCA',
      'RadioBtnOn': '\uECCB',
      'ExploreContent': '\uECCD',
      'Product': '\uECDC',
      'ProgressLoopInner': '\uECDE',
      'ProgressLoopOuter': '\uECDF',
      'Blocked2': '\uECE4',
      'FangBody': '\uECEB',
      'ChatInviteFriend': '\uECFE',
      'Crown': '\uED01',
      'ScaleUp': '\uED09',
      'Feedback': '\uED15',
      'SharepointLogoInverse': '\uED18'
    }
  };

  registerIcons(subset, options);
}
