import { FC } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '../utils/cn';

type LinkAltProps = TouchableOpacityProps & {
  title: string;
};

export const LinkAlt: FC<LinkAltProps> = ({ title, className, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Text className={cn('text-accent font-semibold', className)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
