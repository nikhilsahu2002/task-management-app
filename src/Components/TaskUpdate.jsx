import React, { useState } from "react";
import { updateTask } from "../AXIO_API/TaskService";

const TaskUpdate = ({
  taskId,
  taskTitle,
  taskDescription,
  taskCompleted,
  onTaskUpdated,
  setSelectedTask,
}) => {
  const [newTitle, setNewTitle] = useState(taskTitle);
  const [newDescription, setNewDescription] = useState(taskDescription);
  const [newCompleted, setNewCompleted] = useState(taskCompleted);

  const handleUpdateTask = async ({}) => {
    try {
      const updatedTask = {
        title: newTitle,
        description: newDescription,
        completed: newCompleted,
      };

      await updateTask(taskId, updatedTask);
      onTaskUpdated(taskId, updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="mt-5">
      <h1 className="flex text-center justify-center p-6 text-2xl font-semibold">
        Updation Form{" "}
      </h1>
      <form className="max-w-sm mx-auto bg-green-300 px-5 py-2 rounded-lg border-2 hover: border-black">
        <div
          className="cross flex justify-end cursor-pointer"
          onClick={() => setSelectedTask(null)}>
          <img
            width="50"
            height="50"
            src="https://img.icons8.com/ios-filled/50/multiply.png"
            alt="multiply"
          />
        </div>
        <div className="mb-5">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">
            Title
          </label>
          <input
            type="text"
            placeholder="New Task Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700">
            Description
          </label>
          <input
            type="text"
            placeholder="New Task Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div className="flex items-center ps-4 border border-gray-700 rounded dark:border-gray-700 hover:border-red-500">
          <input
            id="bordered-checkbox-2"
            type="checkbox"
            checked={newCompleted}
            onChange={(e) => setNewCompleted(e.target.checked)}
            name="bordered-checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 bg-gray-700"
          />
          <label
            htmlFor="bordered-checkbox-2"
            className="w-full py-4 ms-2 text-sm font-medium text-gray-900">
            Completed
          </label>
        </div>

        <button onClick={handleUpdateTask}>Update Task</button>
      </form>
    </div>
  );
};

export default TaskUpdate;
