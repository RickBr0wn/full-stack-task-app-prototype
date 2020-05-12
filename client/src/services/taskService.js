// export default {
//   postTodo: (todo) => {
//     return fetch('http://localhost:5000/user/todo', {
//       method: 'post',
//       body: JSON.stringify(todo),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }).then((res) => {
//       if (res.status !== 401) {
//         return res.json().then((data) => data)
//       } else {
//         return { message: { msgBody: 'unauthorized!!!!', msgError: true } }
//       }
//     })
//   },
// }

// sample columnId: 5eb9b515d3edbe3ee74926fe

export default {
  getAllTasksFromColumn: async columnId =>
    await fetch(
      `http://localhost:5000/task/get_all_tasks_from_column/${columnId}`
    ).then(res => {
      if (res.status !== 200) {
        return { message: { msgBody: 'unauthorized!!!!', msgError: true } }
      }
      return res.json().then(data => data)
    }),
}
