import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Button, WebFormWrapper } from '@arbio/ui';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

const width = Dimensions.get('window').width;

export const App = () => {
  const router = useRouter();

  return (
    <WebFormWrapper>
      <View className="flex-1 justify-center items-center bg-white">
        <SvgUri
          uri={
            'https://cdn.prod.website-files.com/64fc2a65f3e576a13b130e5c/658489cd26e7a93fefb64436_3.svg'
          }
          width={width - 100}
          height={100}
        />
        <Text className="text-3xl">Find Your Arbio Home</Text>
      </View>
      <View className="p-4 gap-2 bg-white">
        <Button
          onPress={() => router.replace('/auth/login')}
          title="Login"
          icon={<AntDesign name="login" size={24} color="black" />}
        />
        <Button
          onPress={() => router.replace('/auth/signup')}
          title="Sign Up"
          alt
          icon={<Feather name="user-plus" size={24} color="black" />}
        />
      </View>
    </WebFormWrapper>
  );
};

export default App;
