const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Manager API Running");
});

app.get("/tasks", (req, res) => {
  const data = fs.readFileSync("./data/tasks.json", "utf8");

  const tasks = JSON.parse(data);

  res.json(tasks);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.post("/tasks", (req, res) => {
  const newTask = req.body;

  const data = fs.readFileSync("./data/tasks.json", "utf8");

  const tasks = JSON.parse(data);

  tasks.push(newTask);

  fs.writeFileSync(
    "./data/tasks.json",
    JSON.stringify(tasks, null, 2)
  );

  res.status(201).json({
    message: "Task added successfully",
    task: newTask
  });
});

app.delete("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  const data = fs.readFileSync("./data/tasks.json", "utf8");

  const tasks = JSON.parse(data);

  const updatedTasks = tasks.filter(task => task.id !== id);

  fs.writeFileSync(
    "./data/tasks.json",
    JSON.stringify(updatedTasks, null, 2)
  );

  res.json({
    message: "Task deleted successfully"
  });

});
app.put("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  const updatedTask = req.body;

  const data = fs.readFileSync("./data/tasks.json", "utf8");

  const tasks = JSON.parse(data);

  const newTasks = tasks.map(task =>
    task.id === id ? updatedTask : task
  );

  fs.writeFileSync(
    "./data/tasks.json",
    JSON.stringify(newTasks, null, 2)
  );

  res.json({
    message: "Task updated successfully"
  });

});
app.patch("/tasks/:id", (req, res) => {

  const id = Number(req.params.id);

  const data = fs.readFileSync("./data/tasks.json", "utf8");

  const tasks = JSON.parse(data);

  const updatedTasks = tasks.map(task => {

    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed
      };
    }

    return task;

  });

  fs.writeFileSync(
    "./data/tasks.json",
    JSON.stringify(updatedTasks, null, 2)
  );

  res.json({
    message: "Task status updated"
  });

});