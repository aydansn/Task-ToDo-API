import React from "react";
import { PlusCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
const TaskPage = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <div className="heading-container">
                <h1 className="heading">My Todo List</h1>
                <Link className="add-button" to={"/form"}>
                  <PlusCircleOutlined className="click" />
                </Link>
              </div>
              <TodoList setTodo={setSelectedTodo} />
            </div>
          }
        />
        <Route
          path="/form"
          element={
            <div className="container">
              <div className="heading-container">
                <h1 className="heading">Todo Form</h1>
                <Link className="back-button" to={"/"}>
                  <ArrowLeftOutlined className="click" />
                </Link>
              </div>
              <TodoForm todo={selectedTodo} setTodo={setSelectedTodo} />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default TaskPage;
