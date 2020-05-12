import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  padding: 20px;
  border: 1px solid lightgrey;
  margin: 10px 20px;
  background-color: #fff;
`

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <Flex justify="space-between">
            <h4>{task.title}</h4>
            <h4>{task._id}</h4>
          </Flex>
          <hr />
          <p>{task.body}</p>
        </Container>
      )}
    </Draggable>
  )
}

export default Task
