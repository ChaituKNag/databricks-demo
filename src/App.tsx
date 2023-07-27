import { FC, useState } from "react";
import "./styles.css";
import { fetchTodos } from "./api";
import { ITodo } from "./interfaces";

const App: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isFetching, setFetching] = useState(false);

  const handleFetchTodos = async () => {
    setFetching(true);
    const response = await fetchTodos();
    const data = await response.json();
    setTodos(data);
    setFetching(false);
  };

  const handleChecked = ({ id }: ITodo) => {
    // post the checked update to backend.
    setTodos((_prevTodos) =>
      _prevTodos.map((_prevTodo) => {
        if (_prevTodo.id === id) {
          return {
            ..._prevTodo,
            completed: !_prevTodo.completed
          };
        }

        return _prevTodo;
      })
    );
  };

  return (
    <div className="App">
      <h1 className="text-center text-6xl mb-10">Hello Databricks</h1>
      <button
        className="bg-blue-500 text-white px-5 py-3 my-3 rounded rounded-full hover:bg-blue-400 active:bg-blue-600"
        onClick={handleFetchTodos}
      >
        Fetch Todos
      </button>
      {isFetching && <p>Fetching Todos</p>}
      {!isFetching && todos.length > 0 && (
        <table className="border-collapse border border-grey-500 mt-10">
          <thead>
            <tr>
              <th className="text-left p-2 border border-grey-500">User ID</th>
              <th className="text-left p-2 border border-grey-500">Title</th>
              <th className="text-left p-2 border border-grey-500">
                Completed
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="p-2 border border-grey-500">{todo.userId}</td>
                <td className="p-2 border border-grey-500">{todo.title}</td>
                <td className="p-2 border border-grey-500">
                  <input
                    type="checkbox"
                    onChange={() => handleChecked(todo)}
                    checked={todo.completed}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
