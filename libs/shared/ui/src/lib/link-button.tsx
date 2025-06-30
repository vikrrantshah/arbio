import { FC } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '../utils/cn';

type LinkButtonProps = TouchableOpacityProps & {
  title: string;
  titleClassName?: string;
};

export const LinkButton: FC<LinkButtonProps> = ({
  className,
  title,
  titleClassName,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} className={className}>
      <Text className={cn('text-accent font-semibold', titleClassName)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
