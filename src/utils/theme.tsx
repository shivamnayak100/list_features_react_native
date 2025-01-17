import { DefaultTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const GalleryTheme = {
  colors: {
    primary: '#014BF1',
    fontPrimary: '#007AFF',
    warning: '#FFC000',
    success: '#70AD47',
    info: '#5B9BD5',
    font: '#000000',
    inactive: '#9A9B9B',
    fieldInactive: '#EBEAEA',
    label: '#595C5F',
    foreground: '#FFFFFF',
    lightGrey: '#E8E8E8',
    fontGrey: '#E6E5E5',
    background: '#F5F7FA',
    bodyBackground: '#F5F7FA',
    successBg: '#70AD472E',
    red: '#F53667',
    fontLightGrey: '#7891A2',
    statusLightGreen: '#E2EFDA',
  },
  fonts: {
    fontFamily: 'Roboto',
    titleLarge: {
      fontSize: 20,
      fontWeight: '600',
      fontStyle: 'normal',
      color: '#000000',
      fontFamily: 'Roboto',
    },
    titleMedium: {
      fontSize: 16,
      fontWeight: '600',
      fontStyle: 'normal',
      color: '#000000',
      fontFamily: 'Roboto',
    },
    titleSmall: {
      fontSize: 14,
      fontWeight: '400',
      fontStyle: 'normal',
      color: '#000000',
      fontFamily: 'Roboto',
    },
    bodyLarge: {
      fontSize: 20,
      fontWeight: '600',
      fontStyle: 'normal',
      color: '#FFFFFF',
      fontFamily: 'Roboto',
    },
    bodyMedium: {
      fontSize: 12,
      fontWeight: '400',
      fontStyle: 'normal',
      color: '#000000',
      fontFamily: 'Roboto',
    },
    bodySmall: {
      fontSize: 8,
      fontWeight: '400',
      fontStyle: 'normal',
      color: '#000000',
      fontFamily: 'Roboto',
    },
    labelLarge: {
      fontSize: 12,
      fontWeight: '600',
      fontStyle: 'normal',
      color: '#000000',
      fontFamily: 'Roboto',
    },
    labelMedium: {
      fontSize: 10,
      fontWeight: '400',
      fontStyle: 'normal',
      color: '#000000',
      fontFamily: 'Roboto',
    },
    labelSmall: {
      fontSize: 8,
      fontWeight: '400',
      fontStyle: 'normal',
      color: '#000000',
      fontFamily: 'Roboto',
    },
  },
};

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: GalleryTheme.colors.primary,
    accent: GalleryTheme.colors.fontPrimary,
    background: GalleryTheme.colors.background,
    surface: GalleryTheme.colors.foreground,
    text: GalleryTheme.colors.font,
    error: GalleryTheme.colors.red,
    disabled: GalleryTheme.colors.inactive,
    placeholder: GalleryTheme.colors.fieldInactive,
  },
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: GalleryTheme.colors.primary,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: GalleryTheme.colors.primary,
  },
  input: {
    borderColor: GalleryTheme.colors.font,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: GalleryTheme.colors.font,
  },
  appBar: {
    backgroundColor: GalleryTheme.colors.foreground,
    color: GalleryTheme.colors.font,
  },
});

export { CustomTheme, GalleryTheme, styles };
