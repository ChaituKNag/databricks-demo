export const fetchTodos = async () => {
  return await fetch(`https://jsonplaceholder.typicode.com/todos/`);
};
