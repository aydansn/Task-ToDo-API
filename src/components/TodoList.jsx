/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodoList, removeTodo } from "../api/api";
import { ReadOutlined, DeleteOutlined } from "@ant-design/icons";
import { commonStatusStyle, statusStyles } from "../helper/statusHelpers";
import { useNavigate } from "react-router-dom";
const TodoList = ({ setTodo }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    navigate("/form");
  };

  const handleRemove = (id) => {
    mutationRemove.mutate(id);
  };

  return (
    <ul>
      {data &&
        data.data.reverse().map((todo) => {
          const { backgroundColor, label } = statusStyles(todo.statusId);

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
