import { FlatList, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { ToDo } from '@prisma/client';
import { TodoItem } from '../components/todo-item';
import { TodoEditModal } from '../components/todo-edit-modal';
import { useState } from 'react';
import { TodoCreateModal } from '../components/todo-create-modal';

const todos: ToDo[] = [
  {
    id: 1,
    title: 'Lorem Ipsum',
    content: 'hello for the other side.',
    completed: false,
    userId: 0,
  },
  {
    id: 2,
    title: 'Lorem Ipsum',
    content: 'hello for the other side.',
    completed: true,
    userId: 0,
  },
  {
    id: 3,
    title: 'Lorem Ipsum',
    content: 'hello for the other side.',
    completed: false,
    userId: 0,
  },
  {
    id: 4,
    title: 'Lorem Ipsum',
    content: 'hello for the other side.',
    completed: true,
    userId: 0,
  },
];

const Home = () => {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [todoToEdit, setTodoToEdit] = useState<ToDo | null>(null);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row px-4 pb-4 border-b-2 justify-between items-center">
          <SvgUri
            uri={
              'https://cdn.prod.website-files.com/64fc2a65f3e576a13b130e5c/658489cd26e7a93fefb64436_3.svg'
            }
            width={120}
            height={30}
          />
          <Text className="text-4xl" onPress={() => setCreateModal(true)}>
            +
          </Text>
        </View>
        <View className="flex-1 p-4 bg-neutral-100 gap-4">
          <Text className="text-3xl font-semibold">Your ToDos</Text>
          <FlatList
            data={todos}
            keyExtractor={(todo) => `${todo.id}`}
            renderItem={({ item: todo }) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                onEditTodoPress={setTodoToEdit}
              />
            )}
            contentContainerClassName="gap-2"
          />
        </View>
        <TodoCreateModal
          visible={createModal}
          onClose={() => setCreateModal(false)}
        />
        <TodoEditModal todo={todoToEdit} onClose={() => setTodoToEdit(null)} />
        <View className="absolute bottom-0 inset-x-0 bg-neutral-100 h-10" />
      </SafeAreaView>
    </>
  );
};

export default Home;
