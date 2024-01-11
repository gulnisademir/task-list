import React from 'react'
import TaskListIcon from './TaskListIcon'

function TaskListItem({task, doneTask, editTask, removeTask}) {
    return (
        <li className= {`list-group-item ${task.isDone && 'bg-success bg-opacity-25 text-decoration-line-through'}`} >
            {task.task}
            
            <div className="btn-group float-end" role="group">
            {task.priority && 
            <TaskListIcon/>
            }
            <button className="btn btn-success"
                    onClick={() => doneTask(task.uuid)}
                >Done</button>

                <button className="btn btn-primary"
                    onClick={() => editTask(task.uuid)}
                >Edit</button>

                <button className="btn btn-danger"
                    onClick={() => removeTask(task.uuid)}>Delete</button>
            </div>
        </li>
    )
}

export default TaskListItem