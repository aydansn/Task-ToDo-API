/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addTodo, updateTodo, getStatusList } from "../api/api";
import { useEffect, useState } from "react";

const TodoForm = ({ todo, setTodo }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const queryClient = useQueryClient();
  const [statuses, setStatuses] = useState([]);

  useEffect(
    () => {
      if (todo) {
        setValue("title", todo.title);
        setValue("statusId", todo.statusId);
        setValue("description", todo.description);
      }
    },
    [todo, setValue]
  );

  useEffect(() => {
    getStatusList().then(({ data }) => setStatuses(data));
  }, []);

  const mutationAdd = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      reset();
    }
  });

  const mutationUpdate = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      reset();
      setTodo(null);
    }
  });

  const onSubmit = data => {
    if (todo) {
      mutationUpdate.mutate({ ...data, id: todo.id });
    } else {
      mutationAdd.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Title" required />
      <select {...register("statusId")} required>
        {statuses.map(status =>
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        )}
      </select>
      <textarea {...register("description")} placeholder="Description" />
      <button type="submit">
        {todo ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
