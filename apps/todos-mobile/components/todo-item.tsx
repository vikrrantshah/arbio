import { cn } from '@arbio/ui';
import { ToDo } from '@prisma/client';
import { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';

type TodoItemProps = {
  todo: ToDo;
  onEditTodoPress: (todo: ToDo) => void;
};

export const TodoItem: FC<TodoItemProps> = ({
  todo,
  onEditTodoPress: onEditTodoPress,
}) => {
  return (
    <TouchableOpacity
      className="bg-white border-2 rounded-md p-4"
      onPress={() => onEditTodoPress(todo)}
    >
      <Text className={cn('text-lg', { 'line-through': todo.completed })}>
        {todo.title}
      </Text>
    </TouchableOpacity>
  );
};
