import {
  SignUpForm,
  SignUpFormDefaultValues,
  SignUpFormSchema,
} from '@arbio/schema';
import { Button, Label, Link, TextInput } from '@arbio/ui';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@arbio/store';
import { useEffect } from 'react';

const SignUp = () => {
  const router = useRouter();
  const { isLoading, isAuthenticated, error, register } = useAuthStore();
  const { control, handleSubmit } = useForm<SignUpForm>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: SignUpFormDefaultValues,
  });

  console.log(error);

  useEffect(() => {
    if (isAuthenticated) router.replace('/home');
  }, [isAuthenticated]);

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
          <View className="flex-1 justify-center">
            <Text className="text-4xl font-semibold">Create your account</Text>
            <Text className="text-gray-600">
              Become an Arbio member for free and receive additional discounts
              on future bookings!
            </Text>
            <View className="py-2">
              <Label>Email</Label>
              <TextInput
                placeholder="Email"
                autoCapitalize="none"
                autoComplete="email"
                control={control}
                name="email"
                editable={!isLoading}
              />
            </View>
            <View className="py-2 gap-1">
              <Label>Password</Label>
              <TextInput
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                control={control}
                name="password"
                editable={!isLoading}
              />
            </View>
            <Text className="text-sm text-gray-600">
              Password must be at least 8 characters, must contain a combination
              of uppercase & lowercase letters and must contain at least one
              number
            </Text>
            <View className="py-2 gap-1">
              <Label>Confirm Password</Label>
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password"
                control={control}
                name="confirmPassword"
                editable={!isLoading}
              />
            </View>
            <Text className="text-red-500">
              {error && 'Something went wrong please try again later.'}
            </Text>
          </View>
          <View className="items-center gap-4">
            <Button
              title="Create account"
              onPress={handleSubmit(register)}
              className="w-full"
              disabled={isLoading}
            />
            <View className="flex-row">
              <Text>Already have an account? </Text>
              <Link
                title="Log in"
                onPress={() => router.replace('/auth/loginkr')}
                disabled={isLoading}
              />
            </View>
          </View>
        </View>
        <View className="absolute bottom-0 inset-x-0 bg-neutral-100 h-10" />
      </SafeAreaView>
    </>
  );
};

export default SignUp;
