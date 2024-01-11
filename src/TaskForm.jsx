import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TaskList from './TaskList'

export default function TaskForm() {
    const emptyForm = {task: "", priority: false }
    const [formData, setFormData] = useState(emptyForm)
    const [tasks, setTasks] = useState([])  //taskların tutulduğu alan 
    const [taskChangeCount, setTaskChangeCount] = useState(0) 

    function handleInputChange(event) {
        setFormData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
            }

        })
    }
    // sayfa ilk açılınca
    useEffect(() => {
           const localStorageTask = JSON.parse(localStorage.getItem('tasks'))
           setTasks(localStorageTask ?? [] )
    },[])


    useEffect(() => {
        if (taskChangeCount > 0) {
           localStorage.setItem('tasks', JSON.stringify(tasks))
        }
        console.log(taskChangeCount)
    },[taskChangeCount])

    function editTask(uuid) {
        const task = tasks.find(item => item.uuid === uuid)
        setFormData({...task, isEdited: true})
        setTaskChangeCount(prev => prev + 1)
    }
    function doneTask(uuid) {
        const taskIndex = tasks.findIndex(item => item.uuid === uuid)
            const task = tasks[taskIndex]
            task.isDone = !task.isDone
            const newTasks = tasks.slice()
            newTasks[taskIndex] = task
            setTasks(newTasks)
            console.log(newTasks)
            setTaskChangeCount(prev => prev + 1)
    }

    function removeTask(uuid) {
        setTasks(prev => prev.filter(item => item.uuid !== uuid))
        setTaskChangeCount(prev => prev + 1)
    }

    function handleForm(event) {
        event.preventDefault()
        if (formData.isEdited) {
            const taskIndex = tasks.findIndex(item => item.uuid === formData.uuid)
            const newTasks = tasks.slice()
            newTasks[taskIndex] = { ...formData }
            setTasks(newTasks)
        }
        else if (formData.task.length > 3) {
            formData.uuid = uuidv4()
            setTasks(
                prev =>
                    [formData, ...prev])
            
        }
        setTaskChangeCount(prev => prev + 1)
            setFormData(emptyForm)
            event.target.reset()
    }

    return (
        <>
            <form onSubmit={handleForm}>
                <div className="row mb-3">
                    <label htmlFor="task" className="col-sm-2 col-form-label">Task</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="task" name="task"
                            value={formData.task} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-sm-10 offset-sm-2">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="priority" name="priority"
                                checked={formData.priority} onChange={handleInputChange} />

                            <label className="form-check-label" htmlFor="priority">
                            Priority
                            </label>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
            <TaskList tasks={tasks} doneTask={doneTask} removeTask={removeTask} editTask={editTask} />
        </>

    )
}
