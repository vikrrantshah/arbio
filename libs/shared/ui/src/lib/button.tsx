import { FC, ReactNode } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { cn } from '../utils/cn';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  titleClassName?: string;
  alt?: boolean;
  icon?: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  className,
  title,
  titleClassName,
  alt = false,
  disabled,
  icon: icons,
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      {...props}
      className={cn(
        'flex-row px-4 py-4 bg-primary justify-center items-center border border-2 rounded-md gap-4',
        { 'bg-white': alt },
        { 'bg-gray-200': disabled },
        className,
      )}
    >
      <Text className={cn('text-xl font-semibold', titleClassName)}>
        {title}
      </Text>
      {icons}
    </TouchableOpacity>
  );
};
