/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodoList, removeTodo } from "../api/api";
import { ReadOutlined, DeleteOutlined } from "@ant-design/icons";

const TodoList = ({ setTodo, setModal }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery("todos", getTodoList);

  const mutationRemove = useMutation(removeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  if (isLoading) return <p>Loading todos...</p>;
  if (error) return <p>Error loading todos</p>;

  const handleUpdate = (todo) => {
    setTodo(todo);
    setModal(false);
  };

  const handleRemove = (id) => {
    mutationRemove.mutate(id);
  };
  const statusStyles = (statusId) => {
    switch (statusId) {
      case "1":
        return { backgroundColor: "blue", label: "New" };
      case "2":
        return { backgroundColor: "yellow", label: "Active" };
      case "3":
        return { backgroundColor: "green", label: "Done" };
      default:
        return { backgroundColor: "gray", label: "No Status" };
    }
  };
  return (
    <ul>
      {data &&
        data.data.reverse().map((todo) => {
          const { backgroundColor, label } = statusStyles(todo.statusId);
          const commonStatusStyle = {
            borderRadius: "6px",
            fontSize: "20px",
            fontWeight: "600",
            color: "white",
            width: "100px",
            padding: "10px",
            textAlign: "center",
          };

          return (
            <div key={todo.id} className="list-item-container">
              <div className="left-container">
                <p style={{ backgroundColor, ...commonStatusStyle }}>{label}</p>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  {todo.title}
                </h3>
              </div>

              <div className="right-container">
                <div className="raed" onClick={() => handleUpdate(todo)}>
                  <ReadOutlined className="readicon" />
                </div>

                <div className="raed" onClick={() => handleRemove(todo.id)}>
                  <DeleteOutlined className="trushicon" />
                </div>
              </div>
            </div>
          );
        })}
    </ul>
  );
};

export default TodoList;
