import React, {  useContext, useEffect, useState } from "react";

import { TaskListContext } from "../contexts/TaskListContext";

import Task from "./Task";

const TaskList = () => {

  const { tasks } = useContext(TaskListContext);

  const[displayTasks,setDisplayTasks] = useState([]);
  

  useEffect(() => {
    fetch("http://localhost:8000/tasks").then((res) => {
        return res.json();
    }).then((resp) => {
        setDisplayTasks(resp);
    }).catch((err) => {
        console.log(err.message);
    })
}, [])


  return (
    <div>
      {displayTasks.length ? (
        <ul className="list">
          {displayTasks.map(task => {
            return <Task task={task} key={task.id} />;
          })}
        </ul>
      ) : (
        <div className="no-tasks">No Tasks</div>
      )}
    </div>
  );
};

export default TaskList;

