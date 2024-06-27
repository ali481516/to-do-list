import { useEffect, useState } from 'react'
import TodoList from './TodoList'
// import { v4 as uuidv4 } from 'uuid'
import { variables } from './Variables'
import { Link, useNavigate } from 'react-router-dom';


export default function Todos({ parentState }) {
  const [todos, setTodos] = useState([
    // {
    //   id: uuidv4(),
    //   title: 'go to school and read books',
    //   status: true,
    //   expireDate: '2024-01-01'
    // }
  ])
  const [newTodoTitle, setNewTodoTitle] = useState('')

  const navigate = useNavigate();

  const onInputNewTodoChangeHandler = (event) => {
    setNewTodoTitle(event.target.value)
  }

  // function s() {
  //   const Http = new XMLHttpRequest();
  //   const url = './update.php';
  //   Http.open("GET", url);
  //   Http.send();
  // }
  useEffect(() => {
    refreshList();
    // console.log(parentState)
  }, [])

  function refreshList() {
    fetch(variables.API_URL + 'tasks?userId=' + parentState.userId, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((result) => {
        // alert(`parent state user id: ${parentState.userId}`)
        setTodos(result.map((newTodo) => {
          let date = new Date(newTodo.expire_date);
          date.setDate(date.getDate() + 1);
          let d = date.toISOString().substring(0, 10);
          // console.log(newTodo.expire_date?.substring(0,10))
          return {
            id: newTodo.task_id,
            title: newTodo.task_title,
            status: newTodo.is_done,
            expireDate: d,
            userId: newTodo.user_id
          }
        })
        )
      }, (error) => {
        alert('Failed: ' + error);
      })
  }

  function dbDeleteTask(id) {
    if (window.confirm('Are you sure?')) {
      fetch(variables.API_URL + 'delete-task/' + id, {
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

  function dbAddTask(title) {
    // console.log(state.UserName)
    if (title.trim() !== "") {
      fetch(variables.API_URL + 'add-task', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          userId: parentState.userId
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

  function dbUpdateTask(id, title) {
    // console.log(state.UserName)
    // console.log(state.Password)
    if (title.trim() !== "") {
      fetch(variables.API_URL + 'update-task', {
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

  function dbUpdateTaskExpireDate(id, expireDate) {
    // console.log(state.UserName)
    // console.log(state.Password)
    // if (title.trim() !== "") {
    fetch(variables.API_URL + 'update-task-expire-date', {
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

  function dbUpdateTaskStatus(id, status) {
    // console.log(state.UserName)
    // if (title.trim() !== "") {
    fetch(variables.API_URL + 'update-task-status', {
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

  const addNewTodoHandler = (event) => {
    if (event.key === 'Enter' && newTodoTitle !== '') {

      setNewTodoTitle('')
      dbAddTask(newTodoTitle)
    }
  }

  const deleteTodoHandler = (todo) => {
    // let newTodos = todos.filter((todoItem) => {
    //   return todo.id !== todoItem.id
    // })

    // setTodos(newTodos)
    dbDeleteTask(todo.id)
  }

  const toggleTodoStatusHandler = (todo) => {
    // let newTodos = todos.map((todoItem) => {
    //   if (todo.id === todoItem.id) {
    //     todoItem.status = !todoItem.status
    //   }

    //   return todoItem
    // })
    dbUpdateTaskStatus(todo.id, !todo.status)
    // refreshList()
    // setTodos(newTodos)
  }

  const editTodoTitleHandler = (todo, newTitleValue) => {
    // let newTodos = todos.map((todoItem) => {
    //   if (todo.id === todoItem.id) {
    //     todoItem.title = newTitleValue
    //   }

    //   return todoItem
    // })
    dbUpdateTask(todo.id, newTitleValue)
    // refreshList();
    // setTodos(newTodos)
  }

  const editTodoDateHandler = (todo, newDateValue) => {
    // let newTodos = todos.map((todoItem) => {
    //   if (todo.id === todoItem.id) {
    //     todoItem.expireDate = newDateValue
    //   }

    //   return todoItem
    // })
    dbUpdateTaskExpireDate(todo.id, newDateValue)

    // refreshList();
    // console.log(newDateValue)
    // setTodos(newTodos)
  }

  return (
    <div className="bg-dark d-flex w-100 vh-100 py-5">
      <div className="container rounded text-bg-primary my-auto w-75 py-4 align-self-center">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <h1 className="w-auto ms-3 py-2 mb-2 p-2 fs-3 border border-2 rounded">
            TO DO APP
          </h1>
          <h4 className=''>Welcome {parentState.userName}!</h4>
          <Link to={"/react"}>
            <h4 className='me-3 text-light'>Back</h4>
          </Link>
        </div>
        <div className="row d-flex justify-content-center">
          <input
            className="text-center w-75 py-2 rounded text-bg-light fs-4"
            type=""
            placeholder="What needs to be done today?"
            onChange={onInputNewTodoChangeHandler}
            onKeyDown={addNewTodoHandler}
            value={newTodoTitle}
          />
        </div>
        <TodoList
          todos={todos}
          deleteTodo={deleteTodoHandler}
          toggleTodoStatus={toggleTodoStatusHandler}
          editTodoTitle={editTodoTitleHandler}
          editTodoDate={editTodoDateHandler}
        />
      </div>
    </div>
  )
}
