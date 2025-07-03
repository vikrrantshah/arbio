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
      className={cn('bg-white border-2 rounded-md p-4', {
        'border-gray-700': todo.completed,
      })}
      onPress={() => onEditTodoPress(todo)}
    >
      <Text
        className={cn('text-lg', {
          'line-through text-gray-700': todo.completed,
        })}
      >
        {todo.title}
      </Text>
    </TouchableOpacity>
  );
};
