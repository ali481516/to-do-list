import TodoListItem from './TodoListItem'

export default function TodoList({
  todos,
  deleteTodo,
  toggleTodoStatus,
  editTodoTitle,
  editTodoDate
}) {
  return (
    <ul className="">
      {todos.map((todo, index) => (
        <TodoListItem
          key={index}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodoStatus={toggleTodoStatus}
          editTodoTitle={editTodoTitle}
          editTodoDate={editTodoDate}
        />
      ))}
    </ul>
  )
}
