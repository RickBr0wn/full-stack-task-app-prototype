import React, { useEffect, useState } from 'react'
import TaskService from './services/taskService'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

// sample columnId: 5eb9b515d3edbe3ee74926fe

function App() {
  const columnId = '5eb9b515d3edbe3ee74926fe'
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    TaskService.getAllTasksFromColumn(columnId).then(res => setTasks(res.tasks))
  }, [])

  return (
    <>
      <div>
        <p>app</p>
        {tasks.length > 0 &&
          tasks.map(({ title, body, _id }) => (
            <div key={_id}>
              <p>{title}</p>
              <p>{body}</p>
            </div>
          ))}
      </div>
    </>
  )
}

export default App
