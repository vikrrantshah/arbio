import { Button, Label, Link, LinkAlt, TextInput } from '@arbio/ui';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

export const Login = () => {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-4 pb-4 border-b-2">
          <SvgUri
            uri={
              'https://cdn.prod.website-files.com/64fc2a65f3e576a13b130e5c/658489cd26e7a93fefb64436_3.svg'
            }
            width={160}
            height={40}
          />
        </View>
        <View className="flex-1 p-4 bg-neutral-100">
          <View className="flex-1 justify-center gap-2">
            <Text className="text-4xl font-semibold">Welcome Back!</Text>
            <Text className="text-gray-600">
              Log in to your Arbio account to access your reservations, stay
              connected with the latest updates and receive additional discounts
              on future bookings!
            </Text>
            <View className="py-2 gap-1">
              <Label>Email</Label>
              <TextInput placeholder="Email" />
            </View>
            <View className="py-2 gap-1">
              <Label>Password</Label>
              <TextInput placeholder="Password" secureTextEntry />
            </View>
          </View>
          <View className="items-center gap-4">
            <Button
              title="Login"
              onPress={() => console.log('Login')}
              className="w-full"
            />
            <View className="flex-row">
              <Text>Don't have an accout? </Text>
              {/* <Link title="Sign up" href="/auth/signup" /> */}
              <LinkAlt
                title="Sign up"
                onPress={() => router.replace('/auth/signup')}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Login;
