import {
  Button,
  Label,
  Link,
  LogoHeader,
  TextInput,
  WebFormWrapper,
} from '@arbio/ui';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import {
  LoginForm,
  LoginFormDefaultValues,
  LoginFormSchema,
} from '@arbio/schema';
import { useAuthStore } from '@arbio/store';
import { zodResolver } from '@hookform/resolvers/zod';
import AntDesign from '@expo/vector-icons/AntDesign';

export const Login = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated, error, login } = useAuthStore();
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: LoginFormDefaultValues,
  });

  useEffect(() => {
    if (isAuthenticated) router.replace('/home');
  }, [isAuthenticated]);

  return (
    <>
      <LogoHeader />
      <WebFormWrapper>
        <View className="flex-1 p-4">
          <View className="flex-1 justify-center gap-2">
            <Text className="text-4xl font-semibold">Welcome Back!</Text>
            <Text className="text-gray-600 pb-2">
              Log in to your Arbio account to access your reservations, stay
              connected with the latest updates and receive additional discounts
              on future bookings!
            </Text>
            <View className="gap-1">
              <Label>Email</Label>
              <TextInput<LoginForm>
                placeholder="Email"
                name="email"
                autoCapitalize="none"
                autoComplete="email"
                control={control}
                editable={!isLoading}
              />
            </View>
            <View className="gap-1">
              <Label>Password</Label>
              <TextInput<LoginForm>
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                name="password"
                control={control}
                editable={!isLoading}
              />
            </View>
            <Text className="text-red-500">
              {error && 'Something went wrong please try again later.'}
            </Text>
          </View>
          <View className="items-center gap-4">
            <Button
              title="Login"
              onPress={handleSubmit(login)}
              className="w-full"
              disabled={isLoading}
              icon={<AntDesign name="login" size={24} color="black" />}
            />
            <View className="flex-row">
              <Text>Don't have an accout? </Text>
              <Link
                disabled={isLoading}
                title="Sign up"
                onPress={() => router.replace('/auth/signup')}
              />
            </View>
          </View>
        </View>
      </WebFormWrapper>
    </>
  );
};

export default Login;
