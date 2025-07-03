import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  View,
} from 'react-native';
import { cn } from '../utils/cn';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type TextInputProps<T extends FieldValues> = RNTextInputProps & {
  wrapperClassName?: string;
  name: Path<T>;
  control: Control<T>;
};

export function TextInput<T extends FieldValues = FieldValues>({
  wrapperClassName,
  className,
  control,
  name,
  ...props
}: TextInputProps<T>) {
  const {
    field,
    formState: { errors },
  } = useController({ control, name });

  return (
    <>
      <View
        className={cn(
          'px-4 pt-3 pb-5 bg-white border border-2 rounded-md',
          { 'border-red-300': !!errors[name] },
          wrapperClassName,
        )}
      >
        <RNTextInput
          className={cn('text-xl', className)}
          value={field.value}
          onChangeText={field.onChange}
          {...props}
        />
      </View>
      <Text className="text-red-500 text-right pr-4">
        {errors[name]?.message as string}
      </Text>
    </>
  );
}
