import { Button, Label, TextInput } from '@arbio/ui';
import { ToDo } from '@prisma/client';
import { FC } from 'react';
import { Modal, Text, View } from 'react-native';

type TodoEditModalProps = {
  todo: ToDo | null;
  onClose: () => void;
};

export const TodoEditModal: FC<TodoEditModalProps> = ({ todo, onClose }) => {
  return (
    <Modal
      animationType="slide"
      visible={!!todo}
      presentationStyle="formSheet"
      onRequestClose={onClose}
    >
      <View className="flex-row p-4 border-b-2 justify-between items-center">
        <Text className="text-3xl">Edit ToDo</Text>
        <Text className="text-4xl transform roatate-45" onPress={onClose}>
          +
        </Text>
      </View>
      <View className="flex-1 p-4 gap-2">
        <View className="gap-1">
          <Label>Title</Label>
          <TextInput placeholder="Title" />
        </View>
        <View className="gap-1">
          <Label>Description</Label>
          <TextInput placeholder="Description" multiline className="h-28" />
        </View>
        <View className="py-1">
          {todo?.completed ? (
            <Button title="Mark Incomplete" />
          ) : (
            <Button title="Mark Completed" />
          )}
        </View>
      </View>
      <View className="px-4 pb-10">
        <Button
          title="Delete"
          className="bg-red-500"
          titleClassName="text-white"
          alt
        />
      </View>
    </Modal>
  );
};
