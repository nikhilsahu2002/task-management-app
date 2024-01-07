import React, { useState } from "react";
import { getTaskById } from "../AXIO_API/TaskService";

const TaskById = () => {
  const [taskId, setTaskId] = useState("");
  const [task, setTask] = useState(null);

  const handleGetTaskById = async () => {
    try {
      const response = await getTaskById(taskId);
      setTask(response.data);
    } catch (error) {
      console.error("Error getting task by ID:", error);
    }
  };

  return (
    <div>
      <h2>Get Task by ID</h2>
      <input
        type="text"
        placeholder="Task ID"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
      />
      <button onClick={handleGetTaskById}>Get Task</button>

      {task && (
        <div>
          <p>ID: {task.id}</p>
          <p>Title: {task.title}</p>
          <p>Description: {task.description}</p>
          <p>Completed: {task.completed ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default TaskById;
