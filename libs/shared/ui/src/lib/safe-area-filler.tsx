import { View } from 'react-native';
import { cn } from '../utils/cn';
import { isWeb } from '../utils/platform';
import { FC } from 'react';

type SafeAreaFillerProps = {
  className?: string;
};

export const SafeAreaFiller: FC<SafeAreaFillerProps> = ({ className }) => (
  <View
    className={cn(
      'absolute bottom-0 inset-x-0 bg-neutral-100 h-10',
      { hidden: isWeb },
      className,
    )}
  />
);
