import { FC, ReactNode } from 'react';
import { isWeb } from '../utils/platform';
import { View } from 'react-native';
import { WebFormWrapper } from './web-form-wrapper';

type WebModalWrapperProps = {
  children: ReactNode;
};

export const WebModalWrapper: FC<WebModalWrapperProps> = ({ children }) => {
  if (isWeb)
    return (
      <View className="flex-1 justify-center items-center bg-black/40">
        <WebFormWrapper>{children}</WebFormWrapper>
      </View>
    );

  return children;
};
