import { Button, Label, LinkAlt, TextInput } from '@arbio/ui';
import { useRouter } from 'expo-router';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';

const SignUp = () => {
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
          <View className="flex-1 justify-center">
            <Text className="text-4xl font-semibold">Create your account</Text>
            <Text className="text-gray-600">
              Become an Arbio member for free and receive additional discounts
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
            <View className="gap-0.5">
              <Text className="text-sm text-gray-600">
                Password must be at least 8 characters
              </Text>
              <Text className="text-sm text-gray-600">
                Password must contain a combination of uppercase & lowercase
                letters
              </Text>
              <Text className="text-sm text-gray-600">
                Password must contain at least one number
              </Text>
            </View>
            <View className="py-2 gap-1">
              <Label>Confirm Password</Label>
              <TextInput placeholder="Confirm Password" secureTextEntry />
            </View>
          </View>
          <View className="items-center gap-4">
            <Button
              title="Create account"
              onPress={() => console.log('Login')}
              className="w-full"
            />
            <View className="flex-row">
              <Text>Already have an account? </Text>
              <LinkAlt
                title="Log in"
                onPress={() => router.replace('/auth/login')}
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
