import React from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import TodoForm from '../components/TodoForm'
const FormPage = ({selectedTodo,setSelectedTodo}) => {
  return (
    <div className="container">
    <div className="heading-container">
      <h1 className="heading">Todo Form</h1>
      <Link className="back-button" to={"/"}>
        <ArrowLeftOutlined className="click" />
      </Link>
    </div>
    <TodoForm todo={selectedTodo} setTodo={setSelectedTodo} />
  </div>
  )
}

export default FormPage