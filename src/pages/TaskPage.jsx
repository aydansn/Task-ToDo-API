import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainPage from "./MainPage";
import FormPage from "./FormPage";
const TaskPage = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage setSelectedTodo={setSelectedTodo} />}
        />
        <Route
          path="/form"
          element={
            <FormPage
              selectedTodo={selectedTodo}
              setSelectedTodo={setSelectedTodo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default TaskPage;
