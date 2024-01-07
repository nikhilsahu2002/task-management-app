import React, { useEffect, useState } from "react";
import { createTask } from "../AXIO_API/TaskService";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, seterror] = useState("");

  const handleAddTask = async () => {
    const newTask = { title, description };
    const response = await createTask(newTask);
    onTaskAdded(response.data);
    setTitle("");
    setDescription("");
  };

  setTimeout(() => {
    seterror("");
  }, 5000);

  return (
    <div>
      {error}
      <h2 className="text-center text-xl font-semibold p-2 underline">
        Add Task
      </h2>
      <form className="max-w-sm mx-auto bg-slate-800 p-5 px-3 rounded-lg">
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Task Title:
          </label>
          <input
            type="text"
            id="title"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          />

          <label
            for="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
        </div>
        <div className="button flex justify-center">
          <button
            className="border-2 rounded-lg p-1 text-white bg-slate-700 px-3"
            onClick={() => {
              if (!title || !description) {
                console.log("field Can Be Empty");
                seterror("Field Can't Be Empty");
              } else {
                handleAddTask();
                seterror("The Form IS Sumited");
              }
            }}>
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
