import { FC } from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';
import { cn } from '../utils/cn';

type TextInputProps = RNTextInputProps & {
  wrapperClassName?: string;
};

export const TextInput: FC<TextInputProps> = ({
  wrapperClassName,
  className,
  ...props
}) => {
  return (
    <View
      className={cn(
        'px-4 pt-3 pb-5 bg-white border border-2 rounded-md',
        wrapperClassName,
      )}
    >
      <RNTextInput className={cn('text-xl', className)} {...props} />
    </View>
  );
};
