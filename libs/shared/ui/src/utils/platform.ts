import { Platform } from 'react-native';

export const isWeb = Platform.select({ default: false, web: true });
