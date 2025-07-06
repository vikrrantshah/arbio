import { SafeAreaFiller } from '@arbio/ui';
import '../../global.css';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { useAuthStore } from '@arbio/store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isAuthenticated, localLogin, user } = useAuthStore();

  useEffect(() => {
    localLogin();
    SplashScreen.hideAsync();
  }, []);

  console.log(user);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="home" />
          </Stack.Protected>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="index" />
          </Stack.Protected>
        </Stack>
        <SafeAreaFiller />
      </SafeAreaView>
    </>
  );
}
