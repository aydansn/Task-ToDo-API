import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { QueryClient, QueryClientProvider } from "react-query";
import { ArrowLeftOutlined, PlusCircleOutlined } from "@ant-design/icons";

const queryClient = new QueryClient();

function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {modal ? (
          <div className="container">
            <div className="heading-container">
              <h1 className="heading">My Todo List</h1>
              <div className="add-button" onClick={toggleModal}>
                <PlusCircleOutlined className="click" />
              </div>
            </div>
            <TodoList setModal={setModal} setTodo={setSelectedTodo} />
          </div>
        ) : (
          <div className="container">
            <div className="heading-container">
              <h1 className="heading">Todo Form</h1>
              <div className="back-button" onClick={toggleModal}>
                <ArrowLeftOutlined className="click" />
              </div>
            </div>
            <TodoForm
              todo={selectedTodo}
              setTodo={setSelectedTodo}
              setModal={setModal}
            />
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
