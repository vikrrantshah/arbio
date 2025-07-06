import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgUri } from 'react-native-svg';
import { ToDo } from '@prisma/client';
import { useEffect, useState } from 'react';
import { TodoItem } from '../../components/todo-item';
import { TodoEditModal } from '../../components/todo-edit-modal';
import { TodoCreateModal } from '../../components/todo-create-modal';
import { useTodosStore } from '@arbio/store';

const Home = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [todoToEdit, setTodoToEdit] = useState<ToDo | null>(null);

  const { isLoading, todos, error, getTodos } = useTodosStore();

  useEffect(() => {
    getTodos();
    // if (!isAuthenticated)
    //   setTimeout(() => {
    //     router.replace('/');
    //   }, 1);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row px-4 py-4 border-b-2 justify-between items-center">
          <SvgUri
            uri={
              'https://cdn.prod.website-files.com/64fc2a65f3e576a13b130e5c/658489cd26e7a93fefb64436_3.svg'
            }
            width={120}
            height={30}
          />
          <TouchableOpacity onPress={() => setCreateModalVisible(true)}>
            <Text className="text-4xl">+</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 p-4 bg-neutral-100 gap-4">
          <Text className="text-3xl font-semibold">Your ToDos</Text>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              refreshing={isLoading}
              onRefresh={getTodos}
              ListEmptyComponent={
                <View className="flex-1">
                  {!error ? (
                    <>
                      <Text className="text-gray-700">You have no todos.</Text>
                      <Text className="text-gray-700">
                        Tap on the plus above to add one.
                      </Text>
                    </>
                  ) : (
                    <Text className="text-red-500">
                      Something went wrong please try again later.
                    </Text>
                  )}
                </View>
              }
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
          )}
        </View>
        {createModalVisible && (
          <TodoCreateModal onClose={() => setCreateModalVisible(false)} />
        )}
        {!!todoToEdit && (
          <TodoEditModal
            todo={todoToEdit}
            onClose={() => setTodoToEdit(null)}
          />
        )}
        <View className="absolute bottom-0 inset-x-0 bg-neutral-100 h-10" />
      </SafeAreaView>
    </>
  );
};

export default Home;
