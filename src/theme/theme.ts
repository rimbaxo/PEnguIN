import { configureFonts, DefaultTheme } from 'react-native-paper';
import type { Fonts } from 'react-native-paper/src/types';

type FontsConfig = {
  ios?: Fonts;
  android?: Fonts;
  macos?: Fonts;
  windows?: Fonts;
  web?: Fonts;
  native?: Fonts;
  default?: Fonts;
};

const fontConfig: FontsConfig = {
  web: {
    regular: {
      fontFamily: 'Satoshi',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Satoshi-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Satoshi-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Satoshi',
      fontWeight: '100',
    },
  },
  ios: {
    regular: {
      fontFamily: 'Satoshi',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Satoshi-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Satoshi-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Satoshi',
      fontWeight: '100',
    },
  },
  android: {
    regular: {
      fontFamily: 'Satoshi',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Satoshi-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Satoshi-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Satoshi',
      fontWeight: '100',
    },
  },
};

export const theme = {
  ...DefaultTheme,
  shapes: {
    radius: 20,
  },
  gaps: {
    gutter: 10,
    sectionPaddingVertical: 20,
    containerPaddingHorizontal: 10,
  },
  colors: {
    ...DefaultTheme.colors,
    primary: '#222233',
    accent: '#CDA715',
    background: '#f4f4f4',
    surface: '#f5feff',
    text: '#11111A',
    yellow: '#FFEAC7',
    palepink: '#FFDDDC',
    peach: '#FFE4D9',
    lavander: '#c8d8f4',
    error: '#EF616B',
    success: '#8FD8B3',
    backdrop: '#11111a7a',
    transparent: '#00000000',
  },
  fonts: configureFonts(fontConfig),
};

type ThemeColorsOverride = typeof theme.colors;
type ThemeOverride = typeof theme;

declare global {
  namespace ReactNativePaper {
    interface ThemeColors extends ThemeColorsOverride {}
    interface Theme extends ThemeOverride {}
  }
}
