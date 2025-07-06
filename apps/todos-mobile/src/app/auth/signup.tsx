import {
  SignUpForm,
  SignUpFormDefaultValues,
  SignUpFormSchema,
} from '@arbio/schema';
import {
  Button,
  Label,
  Link,
  LogoHeader,
  TextInput,
  WebFormWrapper,
} from '@arbio/ui';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
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
      <LogoHeader />
      <WebFormWrapper>
        <View className="flex-1 p-4">
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
                onPress={() => router.replace('/auth/login')}
                disabled={isLoading}
              />
            </View>
          </View>
        </View>
      </WebFormWrapper>
    </>
  );
};

export default SignUp;
