import React, { useEffect, useState } from 'react'
import TaskService from './services/taskService'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Task from './components/Task'

// sample columnId: 5eb9b515d3edbe3ee74926fe

const TaskList = styled.div``

function App() {
  const columnId = '5eb9b515d3edbe3ee74926fe'
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    TaskService.getAllTasksFromColumn(columnId).then(res => setTasks(res.tasks))
  }, [])

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    let movedObject = {}

    tasks.forEach(task => {
      if (task._id === draggableId) {
        movedObject = { ...task }
      }
    })

    const sendingObject = {
      taskId: draggableId,
      from: source.index,
      to: destination.index,
    }

    TaskService.moveTask(columnId, sendingObject)

    const newTaskIds = Array.from(tasks)
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, movedObject)
    setTasks(newTaskIds)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h3>Column #{columnId}</h3>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.length > 0 &&
              tasks.map((task, index) => (
                <Task key={task._id} task={task} index={index} />
              ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default App
