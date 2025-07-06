import { SafeAreaFiller } from '@arbio/ui';
import '../../global.css';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1">
        <Stack screenOptions={{ headerShown: false }} />
        <SafeAreaFiller />
      </SafeAreaView>
    </>
  );
}
