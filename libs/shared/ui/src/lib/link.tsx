import { FC } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '../utils/cn';

type LinkProps = TouchableOpacityProps & {
  title: string;
};

export const Link: FC<LinkProps> = ({ title, className, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text className={cn('text-accent font-semibold', className)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
