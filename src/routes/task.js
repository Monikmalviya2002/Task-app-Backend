import express from "express"
import Task from "../models/task.js"; 
import userAuth from "../middleware/auth.js";

    const taskRouter = express.Router();

        //to create the task
    taskRouter.post("/create", userAuth,async(req,res)=>{
        try {
      const { title, description, status } = req.body;

      if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required!" });
      }
       if (!description || description.trim() === "") {
      return res.status(400).json({ message: "Description is required!" });
       }

      const task = new Task({
      title,
      description,
      status,
      user: req.user._id,   
    });

    await task.save();
    res.status(201).json(task);
    } catch (error) {
    console.log("Error in createTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
    });

     // to get all the tasks
     taskRouter.get("/tasks", userAuth, async (req, res) => {
    try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(400).json({ message: "User not found!" });
    }

    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  }  catch (error) {
    console.log("Error in getTasks:", error.message);
    res.status(500).json({ message: error.message });
     }
    });

      // to get specific task
       taskRouter.get("/task/:id", userAuth,async(req,res)=>{
         try {
              const userId = req.user._id;
             const { id } = req.params;

              if (!id) {
              res.status(400).json({ message: "Please provide a task id" });
              }

             const task = await Task.findById(id);

             if (!task) {
         res.status(404).json({ message: "Task not found!" });
             }

          if (!task.user.equals(userId)) {
          res.status(401).json({ message: "Not authorized!" });
              }

             res.status(200).json(task);
             } catch (error) {
            console.log("Error in getTask: ", error.message);
             res.status(500).json({ message: error.message });
                }
                })

     taskRouter.patch("/update/:id", userAuth, async (req, res) => {
    try {
      const userId = req.user._id;
       const { id } = req.params;
      const { title, description, status } = req.body;

      if (!id) {
      return res.status(400).json({ message: "Please provide a task id" });
    }

      const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    
    if (!task.user.equals(userId)) {
      return res.status(401).json({ message: "Not authorized!" });
    }

     if (title) task.title = title;
      if (description) task.description = description;
     if (status) task.status = status;

          await task.save();

       return res.status(200).json(task);
       } catch (error) {
        console.log("Error in updateTask:", error.message);
        res.status(500).json({ message: error.message });
        }
          });


          // to delete task
      taskRouter.delete("/delete" , userAuth, async(req,res)=>{
         try {
          const userId = req.user._id;
           const { id } = req.params;

        const task = await Task.findById(id);

          if (!task) {
         res.status(404).json({ message: "Task not found!" });
         }
    
      if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await Task.findByIdAndDelete(id);

    return res.status(200).json({ message: "Task deleted successfully!" });
       } catch (error) {
        console.log("Error in deleteTask: ", error.message);
        res.status(500).json({ message: error.message });
       }
      })

 
  export default taskRouter;