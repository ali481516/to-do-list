import { useState } from 'react'
import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'

export default function SubTodoListItem({
  subTodo,
  deleteSubTodo,
  toggleSubTodoStatus,
  editSubTodoTitle,
  editSubTodoDate
}) {
  const [subEditMode, setSubEditMode] = useState(false)

  const editSubTodoHandler = (event) => {
    if (event.key === 'Enter') {
      editSubTodoTitle(subTodo, event.target.value)
      setSubEditMode(false)
    }
  }

  return (
    <li className="list-unstyled">
      {subEditMode ? (
        <div className="h-100 bg-warning d-flex align-items-center justify-content-between rounded my-3">
          <input
            className="fs-6 w-75 text-bg-light rounded my-1 ms-1 py-0 ps-2"
            type="text"
            defaultValue={subTodo?.title}
            // onChange={() => { }}
            onKeyDown={editSubTodoHandler}
          />
          <div
            className="w-25 h-25 d-flex align-items-center justify-content-end px-2"
          >
            <DeleteIcon onClick={() => { setSubEditMode(false); }} />
          </div>

        </div>
      ) : (
        <div className="h-100 text-bg-warning d-flex align-items-center justify-content-between rounded my-3">
          <div className="d-flex align-items-center justify-content-center my-1">
            <input
              className="mx-2"
              type="checkbox"
              checked={subTodo?.status}
              onChange={() => toggleSubTodoStatus(subTodo)}
            />
            <p onDoubleClick={() => { setSubEditMode(true); }}
              className={`fs-6 "text-bg-light rounded my-1 ms-1 py-0 ps-2" ${subTodo.status ? 'text-decoration-line-through' : ''
                }`}
            >
              {subTodo?.title}
            </p>
          </div>
          <div
            className="w-25 h-25 d-flex align-items-center justify-content-end"
          >
            <input type='date' onChange={(e) => { editSubTodoDate(subTodo, e.target.value); }}
              value={subTodo.expireDate}
            />
            <EditIcon onClick={() => { setSubEditMode(true); }} />
            <DeleteIcon onClick={() => { deleteSubTodo(subTodo); }} />
          </div>
        </div>
      )}
    </li>
  )
}
