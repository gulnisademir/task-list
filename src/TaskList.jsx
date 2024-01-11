import React, { useEffect, useState } from 'react'
import TaskListItem from './TaskListItem'

function TaskList({ tasks, doneTask, removeTask, editTask }) {

    const [priority, setPriority] = useState(false)
    const [filteredTask, setFilteredTask] = useState(tasks)


    function handlePriorityFilter() {
        const newPriority = !priority
        newPriority ? setFilteredTask(tasks.filter(item => item.priority === newPriority)) : setFilteredTask(tasks)
        setPriority(newPriority)
    }
    useEffect(() => {
        setFilteredTask(tasks)
    }, [tasks])

    if (tasks.length === 0) {
        return <></>
    }
    return (
        <>
            <div className="bg-light px-5 py-2 mt-3 border rounded">
                <h4 className="py-3">TASKS: <button className='btn btn-outline-secondary float-end'
                    onClick={handlePriorityFilter}>{!priority ? "Show priorities" : "Show all"}</button></h4>
                <ul className="list-group">
                    {filteredTask.map((task) =>
                        <TaskListItem 
                             key = {task.uuid} 
                             task = {task} 
                             doneTask = {doneTask} 
                             editTask = {editTask} 
                             removeTask = {removeTask}/>
                    )}
                </ul>
            </div> 
        </>

    )
}

export default TaskList