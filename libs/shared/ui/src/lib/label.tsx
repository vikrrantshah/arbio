import { FC } from 'react';
import { Text, TextProps } from 'react-native';
import { cn } from '../utils/cn';

export const Label: FC<TextProps> = ({ className, children, ...props }) => {
  return (
    <Text className={cn('text-xl', className)} {...props}>
      {children}
    </Text>
  );
};
