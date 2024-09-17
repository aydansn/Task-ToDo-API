import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [modal, setModal] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {!modal && (
          <div className="container">
            <div className="heading-container">
              <h1 className="heading">Todo Form</h1>
              <div className="back-button" onClick={() => setModal(true)}>
                geri
              </div>
            </div>
            <TodoForm todo={selectedTodo} setTodo={setSelectedTodo} />
          </div>
        )}
        {modal && (
          <div className="container">
            <div className="heading-container">
              <h1 className="heading">My Todo List</h1>
              <div className="add-button" onClick={() => setModal(false)}>
                elave et
              </div>
            </div>
            <TodoList setModal={setModal} setTodo={setSelectedTodo} />
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
