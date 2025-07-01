import { Button, Label, TextInput } from '@arbio/ui';
import { FC } from 'react';
import { Modal, Text, View } from 'react-native';

type TodoCreateModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const TodoCreateModal: FC<TodoCreateModalProps> = ({
  visible = false,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={onClose}
    >
      <View className="flex-row p-4 border-b-2 justify-between items-center">
        <Text className="text-3xl">Create ToDo</Text>
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
      </View>
      <View className="px-4 pb-10 gap-2">
        <Button title="Cancel" titleClassName="text-red-500" alt />
        <Button title="Save" />
      </View>
    </Modal>
  );
};
