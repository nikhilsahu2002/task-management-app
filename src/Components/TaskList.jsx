import React, { useState, useEffect } from "react";
import { deleteTask, updateTask, getAllTasks } from "../AXIO_API/TaskService";
import TaskDelete from "./TaskDelete";
import TaskUpdate from "./TaskUpdate";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setshow] = useState("task");
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskDeleted = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleTaskUpdated = async (taskId, updatedTask) => {
    try {
      await updateTask(taskId, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task,
        ),
      );
      setSelectedTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
  };

  const handleTaskAdded = (task) => {
    console.log("Task added:", task);
  };

  const fetchTasks = async () => {
    try {
      const response = await getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div>
      <div className="Heading flex justify-center p-3">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => {
              setshow("task");
              fetchTasks();
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-gray-900  bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white ">
            <svg
              className="w-3 h-3 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            RUNNING TASKS
          </button>

          <button
            type="button"
            onClick={() => setshow("new")}
            className="inline-flex items-center px-4 py-2 text-sm font-medium bg-gray-900 text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white ">
            <svg
              className="w-3 h-3 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
            </svg>
            NEW TASK
          </button>
        </div>
      </div>
      {show === "task" && (
        <>
          <div className=" flex justify-center">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Task ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Task Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Discrprtion
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Completed
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr
                      key={task.id}
                      className={`${
                        index % 2 === 0
                          ? "even:bg-gray-50 even:dark:bg-gray-800"
                          : "odd:bg-white odd:dark:bg-gray-900"
                      } border-b dark:border-gray-700`}>
                      <td className="px-6 py-4 text-black">{task.id}</td>
                      <td className="px-6 py-4 text-black">{task.title}</td>
                      <td className="px-6 py-4 text-black">
                        {task.description}
                      </td>
                      <td className="px-6 py-4 text-black">
                        {task.completed ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4 gap-2 flex">
                        <a
                          href="#"
                          onClick={() => handleEditClick(task)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline ">
                          Edit
                        </a>
                        <a
                          href="#"
                          className="font-medium text-red-700 dark:text-red-700 hover:underline ">
                          <TaskDelete
                            taskId={task.id}
                            onTaskDeleted={handleTaskDeleted}
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {selectedTask && (
            <>
              <TaskUpdate
                taskId={selectedTask.id}
                taskTitle={selectedTask.title}
                taskDescription={selectedTask.description}
                taskCompleted={selectedTask.completed}
                setSelectedTask={setSelectedTask}
                onTaskUpdated={handleTaskUpdated}
              />
            </>
          )}
        </>
      )}
      {show === "new" && <TaskForm onTaskAdded={handleTaskAdded} />}
    </div>
  );
};

export default TaskList;
