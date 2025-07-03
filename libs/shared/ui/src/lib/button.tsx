import { FC } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '../utils/cn';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  titleClassName?: string;
  alt?: boolean;
};

export const Button: FC<ButtonProps> = ({
  className,
  title,
  titleClassName,
  alt = false,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      {...props}
      className={cn(
        'px-4 py-4 bg-primary justify-center items-center border border-2 rounded-md',
        { 'bg-white': alt },
        { 'bg-gray-200': disabled },
        className,
      )}
    >
      <Text className={cn('text-xl font-semibold', titleClassName)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
