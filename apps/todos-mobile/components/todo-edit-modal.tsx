import { UpdateTodoForm, UpdateTodoSchema } from '@arbio/schema';
import { Button, Label, TextInput } from '@arbio/ui';
import { ToDo } from '@prisma/client';
import { FC } from 'react';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTodosStore } from '@arbio/store';

type TodoEditModalProps = {
  todo: ToDo | null;
  onClose: () => void;
};

export const TodoEditModal: FC<TodoEditModalProps> = ({ todo, onClose }) => {
  const { updateTodo, deleteTodo, error } = useTodosStore();
  const { control, handleSubmit, setValue } = useForm<UpdateTodoForm>({
    resolver: zodResolver(UpdateTodoSchema),
    defaultValues: {
      title: todo?.title || '',
      content: todo?.content || '',
      completed: todo?.completed || false,
      userId: todo?.userId,
    },
  });

  const onSubmit = (data: UpdateTodoForm) => {
    updateTodo({ ...data, id: todo!.id }, onClose);
  };

  const changeTodoStatus = (completed: boolean) => {
    setValue('completed', completed);
    handleSubmit(onSubmit)();
  };

  const onDeletePress = () => {
    Alert.alert('Are you sure?', 'Once you delete this todo.', [
      { text: 'Yes', onPress: () => deleteTodo(todo!.id, onClose) },
      { text: 'Cancel' },
    ]);
  };

  console.log(error);

  return (
    <Modal
      animationType="slide"
      visible={!!todo}
      presentationStyle="formSheet"
      onRequestClose={onClose}
    >
      <View className="flex-row p-4 border-b-2 justify-between items-center">
        <Text className="text-3xl">Edit ToDo</Text>
        <TouchableOpacity className="p-2 rounded-full" onPress={onClose}>
          <Text className="text-4xl rotate-45">+</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1 p-4 gap-2">
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
        <View className="py-2">
          {todo?.completed ? (
            <Button
              title="Mark Incomplete"
              onPress={() => changeTodoStatus(false)}
              alt
            />
          ) : (
            <Button
              title="Mark Completed"
              onPress={() => changeTodoStatus(true)}
              alt
            />
          )}
        </View>
      </View>
      <View className="px-4 pb-10 gap-2">
        <Button
          title="Delete"
          className="bg-red-500"
          titleClassName="text-white"
          alt
          onPress={onDeletePress}
        />
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </View>
    </Modal>
  );
};
