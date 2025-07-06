import {
  CreateTodoForm,
  CreateTodoFormDefaultValues,
  CreateTodoSchema,
} from '@arbio/schema';
import { Button, isWeb, Label, TextInput, WebModalWrapper } from '@arbio/ui';
import { FC } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore, useTodosStore } from '@arbio/store';

type TodoCreateModalProps = {
  onClose: () => void;
};

export const TodoCreateModal: FC<TodoCreateModalProps> = ({ onClose }) => {
  const { createTodo } = useTodosStore();
  const userId = useAuthStore((s) => s.user?.id);
  const { control, handleSubmit } = useForm<CreateTodoForm>({
    resolver: zodResolver(CreateTodoSchema),
    defaultValues: {
      ...CreateTodoFormDefaultValues,
      userId,
    },
  });

  const onSubmit = (data: CreateTodoForm) => createTodo(data, onClose);

  return (
    <Modal
      visible={true}
      animationType="fade"
      presentationStyle="formSheet"
      onRequestClose={onClose}
      transparent={isWeb}
    >
      <WebModalWrapper>
        <View className="flex-row p-4 border-b-2 justify-between items-center">
          <Text className="text-3xl">Create ToDo</Text>
          <TouchableOpacity className="p-2 rounded-full" onPress={onClose}>
            <Text className="text-4xl rotate-45">+</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 p-4">
          <View className="gap-1">
            <Label>Title</Label>
            <TextInput placeholder="Title" control={control} name="title" />
          </View>
          <View className="gap-1">
            <Label>Description</Label>
            <TextInput
              placeholder="Description"
              multiline
              className="h-28"
              control={control}
              name="content"
            />
          </View>
        </View>
        <View className="px-4 pb-10 gap-2">
          <Button
            title="Cancel"
            titleClassName="text-red-500"
            onPress={onClose}
            alt
          />
          <Button title="Save" onPress={handleSubmit(onSubmit)} />
        </View>
      </WebModalWrapper>
    </Modal>
  );
};
