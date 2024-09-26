/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { addTodo, updateTodo, getStatusList } from "../api/api";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
const TodoForm = ({ todo, setTodo }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  useEffect(() => {
    if (todo) {
      setValue("title", todo.title);
      setValue("statusId", todo.statusId);
      setValue("description", todo.description);
    }
  }, [todo, setValue]);

  const { data: statuses } = useQuery("statusList", getStatusList);
  const mutationAdd = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      reset();
    },
  });

  const mutationUpdate = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      reset();
      setTodo(null);
    },
  });

  const onSubmit = (data) => {
    if (todo) {
      mutationUpdate.mutate({ ...data, id: todo.id });
      alert(`Task ${todo.id} updated`);
      navigate("/");
    } else {
      mutationAdd.mutate(data);
      alert(`Task added`);
      navigate("/");
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Status</h3>

        <select className="titles" {...register("statusId")} required>
          {statuses &&
            statuses.data.length > 0 &&
            statuses.data.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
        </select>
        <h3>Title</h3>
        <input
          className="titles"
          {...register("title")}
          placeholder="Develop a Todo app."
          required
        />
        <h3>Description</h3>
        <textarea
          className="titles"
          {...register("description")}
          placeholder="Description"
        />
        <br />
        <button className="btns" type="submit">
          {todo ? "Update Todo" : "Submit"}
        </button>
      </form>
    </Fragment>
  );
};

export default TodoForm;
