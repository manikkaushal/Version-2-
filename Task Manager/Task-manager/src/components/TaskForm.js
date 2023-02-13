import React, { useContext,useState,useEffect } from 'react'

import { TaskListContext } from '../contexts/TaskListContext'

import uuid from 'uuid'

const TaskForm = () => {

  const { addTask, clearList, editTask, editItem } = useContext(TaskListContext)

  const [title, setTitle] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!editItem) {
      addTask(title)
      setTitle('')
    } else {
      editTask(title, editItem.id)
    }
      
    const taskData= { title, id: uuid() };
    
    console.log(taskData);
  

    fetch(`http://localhost:8000/tasks`,{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(taskData)
    }).then((res)=>{
      console.log(res.status)
      alert('Saved successfully.')
    
    }).catch((err)=>{
      console.log(err.message)
    })    
   
  }

  const handleChange = e => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title)
      console.log(editItem)
    } else {
      setTitle('')
    }
  }, [editItem])

  return (
    
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Add Task..."
        value={title}
        onChange={handleChange}
        required
        className="task-input"
      />
      <div className="buttons">
        <button type="submit" className="btn add-task-btn">
       Add Task
        </button>
        <button className="btn clear-btn" >
          Clear
        </button>
      </div>
    </form>
  )
}

export default TaskForm
