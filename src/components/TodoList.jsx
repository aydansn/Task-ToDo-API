/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodoList, removeTodo } from "../api/api";
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
  return (
    <ul>
      {data &&
        data.data.map((todo) => {
          console.log(todo);
          let statusName;
          let statusColorCode;
          switch (todo.statusId) {
            case "1":
              statusName = "New";
              statusColorCode = "blue";
              break;
            case "2":
              statusName = "Active";
              statusColorCode = "yellow";
              break;
            case "3":
              statusName = "Done";
              statusColorCode = "green";
              break;

            default:
              statusName = "No status";
              statusColorCode = "green";
          }
          return (
            <div key={todo.id} className="list-item-container">
              <div className="left-container">
                <p
                  style={{
                    backgroundColor: statusColorCode,
                    borderRadius: "6px",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "white",
                    width: "50px",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {statusName}
                </p>
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
                <button onClick={() => handleUpdate(todo)}>Update</button>

                <button onClick={() => handleRemove(todo.id)}>Remove</button>
              </div>
            </div>
          );
        })}
    </ul>
  );
};

export default TodoList;
