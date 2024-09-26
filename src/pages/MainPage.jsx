import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import TodoList from "../components/TodoList";
const MainPage = ({ setSelectedTodo }) => {
  return (
    <div className="container">
      <div className="heading-container">
        <h1 className="heading">My Todo List</h1>
        <Link className="add-button" to={"/form"}>
          <PlusCircleOutlined className="click" />
        </Link>
      </div>
      <TodoList setTodo={setSelectedTodo} />
    </div>
  );
};

export default MainPage;
