import { View } from 'react-native';
import { SvgUri } from 'react-native-svg';

export const LogoHeader = () => {
  return (
    <View className="px-4 py-4 border-b-2 bg-white">
      <SvgUri
        uri={
          'https://cdn.prod.website-files.com/64fc2a65f3e576a13b130e5c/658489cd26e7a93fefb64436_3.svg'
        }
        width={160}
        height={40}
      />
    </View>
  );
};
