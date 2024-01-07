import React from "react";
import { deleteTask } from "../AXIO_API/TaskService";

const TaskDelete = ({ taskId, onTaskDeleted }) => {
  const handleDeleteTask = async () => {
    try {
      await deleteTask(taskId);
      onTaskDeleted(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteTask}>Delete</button>
    </div>
  );
};

export default TaskDelete;
