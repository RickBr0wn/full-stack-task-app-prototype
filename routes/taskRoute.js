const express = require('express')
const taskRouter = express.Router()
const Task = require('../models/taskSchema')
const Column = require('../models/ColumnSchema')

taskRouter.post('/move_task/:columnId', async (req, res, next) => {
  const columnId = req.params.columnId
  const { taskId, to, from } = req.body
  console.log(taskId)
  let newTaskOrder = []
  try {
    await Column.findById({ _id: columnId }).then((doc, err) => {
      if (err) {
        return res.status(500).json({
          message: {
            msgBody:
              '🤖 - an error has occurred with the database whilst retrieving the Column data.',
            error: true,
          },
        })
      }
      newTaskOrder = doc.tasks
      newTaskOrder.splice(from, 1)
      newTaskOrder.splice(to, 0, taskId)
    })

    await Column.updateOne(
      { _id: columnId },
      { $set: { tasks: newTaskOrder } },
      (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: {
              msgBody: '🤖 - an error has occurred whilst updating the Column.',
              error: true,
            },
          })
        }
      }
    )

    return res.status(200).json({
      message: {
        msgBody: `🤖 - task ${taskId} has been moved from index ${from} to index ${to}.`,
        error: false,
      },
    })
  } catch (error) {
    next(error)
  }
})

taskRouter.post('/add_task/:columnId', async (req, res, next) => {
  const columnId = req.params.columnId
  const task = new Task(req.body)
  let newTaskOrder = []

  await task.save(async (taskError, taskDocument) => {
    try {
      if (taskError) {
        return res.status(500).json({
          message: {
            msgBody:
              '🤖 - an error has occurred with the database whilst saving the task.',
            error: true,
          },
        })
      }

      newTaskOrder.push(taskDocument._id)

      await Column.findById({ _id: columnId })
        .populate('tasks')
        .exec()
        .then((doc, err) => {
          if (err) {
            return res.status(500).json({
              message: {
                msgBody:
                  '🤖 - an error has occurred with the database whilst retrieving the Column data.',
                error: true,
              },
            })
          }
          doc.tasks.forEach(task => newTaskOrder.push(task))
        })

      await Column.updateOne(
        { _id: columnId },
        { $set: { tasks: newTaskOrder } },
        (err, doc) => {
          if (err) {
            return res.status(500).json({
              message: {
                msgBody:
                  '🤖 - an error has occurred whilst updating the Column.',
                error: true,
              },
            })
          }
        }
      )

      await Column.findById({ _id: columnId })
        .populate('tasks')
        .exec()
        .then((doc, err) => {
          if (err) {
            return res.status(500).json({
              message: {
                msgBody:
                  '🤖 - an error has occurred whilst finding the Column.',
                error: true,
              },
            })
          }
          return res.status(200).json({
            message: {
              msgBody: '🤖 - a new task has been created.',
              error: false,
            },
            new_task: req.body,
            taskOrder: doc.tasks,
          })
        })
    } catch (err) {
      next(err)
    }
  })
})

taskRouter.get(
  '/get_all_tasks_from_column/:columnId',
  async (req, res, next) => {
    const columnId = req.params.columnId
    try {
      await Column.findById({ _id: columnId })
        .populate('tasks')
        .exec()
        .then((doc, err) => {
          if (err) {
            return res.status(500).json({
              message: {
                msgBody:
                  '🤖 - an error has occurred with the database whilst retrieving all of the tasks.',
                error: true,
              },
            })
          }
          return res.status(200).json({
            count: doc.tasks.length,
            tasks: doc.tasks,
            error: false,
          })
        })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = taskRouter
