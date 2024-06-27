import { useEffect, useState } from 'react'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
// import { v4 as uuidv4 } from 'uuid'
import SubTodoListItem from './SubTodoListItem'
import AddIcon from './icons/AddIcon'
import { variables } from './Variables'

export default function TodoListItem({
  todo,
  deleteTodo,
  toggleTodoStatus,
  editTodoTitle,
  editTodoDate
}) {
  const [subTodos, setSubTodos] = useState([

  ])

  useEffect(() => {
    refreshList();
  }, [])

  function refreshList() {

    fetch(variables.API_URL + 'sub-tasks', {
      method: 'GET',
    })
      .then(res => res.json())
      .then((result) => {
        setSubTodos(result.map((newSubTodo) => {
          let date = new Date(newSubTodo.expire_date);
          date.setDate(date.getDate() + 1);
          let d = date.toISOString().substring(0, 10);
          // console.log(`new dates: ${d}`)
          // if (newSubTodo.tasks_task_id === todo.id) {
          return {
            id: newSubTodo.sub_task_id,
            title: newSubTodo.title,
            status: newSubTodo.is_done,
            expireDate: d,
            taskId: newSubTodo.tasks_task_id
          }
        }
          // }
        )
        )

        // alert(result);
      }, (error) => {
        alert('Failed: ' + error);
      })
  }

  function dbUpdateSubTask(id, title) {
    // console.log(state.UserName)
    // console.log(state.Password)
    if (title.trim() !== "") {
      fetch(variables.API_URL + 'update-sub-task', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          id: id
        })
      })
        .then(res => res.json())
        .then((result) => {
          // alert(result);
          refreshList();
        }, (error) => {
          alert('Failed: ' + error);
        })
    }
  }

  function dbUpdateSubTaskExpireDate(id, expireDate) {
    // console.log(state.UserName)
    // if (title.trim() !== "") {
    fetch(variables.API_URL + 'update-sub-task-expire-date', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        expireDate: expireDate,
        id: id
      })
    })
      .then(res => res.json())
      .then((result) => {
        // alert(result);
        refreshList();
      }, (error) => {
        alert('Failed: ' + error);
      })
    // }
  }

  function dbUpdateSubTaskStatus(id, status) {
    // console.log(state.UserName)
    // if (title.trim() !== "") {
    fetch(variables.API_URL + 'update-sub-task-status', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: status,
        id: id
      })
    })
      .then(res => res.json())
      .then((result) => {
        // alert(result);
        refreshList();
      }, (error) => {
        alert('Failed: ' + error);
      })
    // }
  }

  function dbDeleteSubTask(id) {
    if (window.confirm('Are you sure?')) {
      fetch(variables.API_URL + 'delete-sub-task/' + id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((result) => {
          // alert(result);
          refreshList();
        }, (error) => {
          alert('Failed');
        })
    }
  }

  function dbAddSubTask(id) {
    // console.log(state.UserName)
    if (id !== null) {
      fetch(variables.API_URL + 'add-sub-task', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          taskId: id
        })
      })
        .then(res => res.json())
        .then((result) => {
          // alert(result);
          refreshList();
        }, (error) => {
          alert('Failed: ' + error);
        })
    }
  }


  const addNewSubTodoHandler = (event) => {
    // if (event.key === 'Enter' && newSubTodoTitle !== '') {
    // setSubTodos([
    //   ...subTodos,
    //   {
    //     id: uuidv4(),
    //     title: "New sub task...",
    //     status: false,
    //     expireDate: ''
    //   }
    // ])
    dbAddSubTask(todo.id)
    // refreshList();

    // setNewSubTodoTitle('')
    // }
  }

  const deleteSubTodoHandler = (subTodo) => {
    // let newSubTodos = subTodos.filter((subTodoItem) => {
    //   return subTodo.id !== subTodoItem.id
    // })
    dbDeleteSubTask(subTodo.id)
    // setSubTodos(newSubTodos)
  }

  const toggleSubTodoStatusHandler = (subTodo) => {
    // let newSubTodos = subTodos.map((subTodoItem) => {
    //   if (subTodo.id === subTodoItem.id) {
    //     subTodoItem.status = !subTodoItem.status
    //   }

    //   return subTodoItem
    // })

    dbUpdateSubTaskStatus(subTodo.id, !subTodo.status)
    // refreshList()

    // setSubTodos(newSubTodos)
  }

  const editSubTodoTitleHandler = (subTodo, newTitleValue) => {
    // let newSubTodos = subTodos.map((subTodoItem) => {
    //   if (subTodo.id === subTodoItem.id) {
    //     subTodoItem.title = newTitleValue
    //   }

    //   return subTodoItem
    // })

    dbUpdateSubTask(subTodo.id, newTitleValue)
    // refreshList()

    // setSubTodos(newSubTodos)
  }

  const editSubTodoDateHandler = (subTodo, newDateValue) => {
    // let newSubTodos = subTodos.map((subTodoItem) => {
    //   if (subTodo.id === subTodoItem.id) {
    //     subTodoItem.expireDate = newDateValue
    //   }

    //   return subTodoItem
    // })

    dbUpdateSubTaskExpireDate(subTodo.id, newDateValue)
    // refreshList()

    // setSubTodos(newSubTodos)
  }
  // function s() {
  //   const Http = new XMLHttpRequest();
  //   const url = './update.php';
  //   Http.open("GET", url);
  //   Http.send();
  // }
  const [editMode, setEditMode] = useState(false)

  const editTodoHandler = (event) => {
    if (event.key === 'Enter') {
      editTodoTitle(todo, event.target.value)
      setEditMode(false)
    }
  }

  return (
    <>
      <li className="list-unstyled">
        {editMode ? (
          <div className="bg-warning d-flex align-items-center justify-content-between rounded my-3">
            <input
              className="fs-5 w-75 text-bg-light rounded my-1 ms-1 py-0 ps-2"
              type="text"
              defaultValue={todo?.title}
              // onChange={() => { }}
              onKeyDown={editTodoHandler}
            />
            <div
              className="w-50 h-50 d-flex align-items-center justify-content-end px-2"
            >
              <DeleteIcon onClick={() => { setEditMode(false); }} />
            </div>

          </div>
        ) : (
          <div className="text-bg-warning d-flex align-items-center justify-content-between rounded my-3">
            <div className="d-flex align-items-center justify-content-center my-1">
              <input
                className="mx-2"
                type="checkbox"
                checked={todo?.status}
                onChange={() => toggleTodoStatus(todo)}
              />
              <p onDoubleClick={() => { setEditMode(true); }}
                className={`fs-5 "text-bg-light rounded my-1 ms-1 py-0 ps-2" ${todo.status ? 'text-decoration-line-through' : ''
                  }`}
              >
                {todo?.title}
              </p>
            </div>
            <div
              className="w-50 h-50 d-flex align-items-center justify-content-end"
            >
              <input className="fs-5" type='date' onChange={(e) => { editTodoDate(todo, e.target.value); }}
                value={todo.expireDate}
              />
              <AddIcon onClick={() => { addNewSubTodoHandler(); }} />
              <EditIcon onClick={() => { setEditMode(true); }} />
              <DeleteIcon onClick={() => { deleteTodo(todo); }} />
            </div>
          </div>
        )}
      </li>
      <ul className="">
        {subTodos.map((subTodo, index) => {
          if (subTodo.taskId === todo.id) {
            return (
              <SubTodoListItem
                key={index}
                subTodo={subTodo}
                deleteSubTodo={deleteSubTodoHandler}
                toggleSubTodoStatus={toggleSubTodoStatusHandler}
                editSubTodoTitle={editSubTodoTitleHandler}
                editSubTodoDate={editSubTodoDateHandler}
              />
            )
          } else {
            return ''
          }
        }
        )}
      </ul>
    </>
  )
}
