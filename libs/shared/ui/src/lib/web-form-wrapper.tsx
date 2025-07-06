import { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { isWeb } from '../utils/platform';

type WebFormWrapperProps = {
  children: ReactNode;
};

export const WebFormWrapper: FC<WebFormWrapperProps> = ({ children }) => {
  if (isWeb)
    return (
      <>
        <View className="flex-1 justify-center items-center hidden sm:flex w-full">
          <View className="bg-white rounded-lg border-2 p-8 max-w-xl min-w-[60%] min-h-[80%]">
            {children}
          </View>
        </View>
        <View className="flex-1 sm:hidden">{children}</View>
      </>
    );

  return children;
};
