import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {
        // code to create a new task goes here
        const { title, description, status, dueDate, priority } = req.body;

        const userId = req.user._id;

        const newTask = new Task({
            title,
            description,
            status,
            dueDate,
            priority,
            userId
        });

        await newTask.save(); // save the task to the database
        res.status(201).json(newTask);
    } catch (error) {
        console.log("Error creating task: ", error.message);
        res.status(500).json({ message: error.message });
    }
}

// Get all tasks for a specific user

export const getTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 12 } = req.query;

        const tasks = await Task.find({ userId, deleted: false })
            .sort({ dueDate: 1 }) // sort by due date in ascending order
            .skip((page - 1) * limit) // skip the previous pages
            .limit(parseInt(limit));

        const totalTasks = await Task.countDocuments({ userId, deleted: false });

        res.status(200).json({
            tasks,
            totalTasks,
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit)
        });
    } catch (error) {
        console.log("Error fetching tasks: ", error.message);
        res.status(500).json({ message: error.message });
    }
}

// Get a single task by its ID
export const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findOne({ _id: taskId, userId: req.user._id, deleted: false });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.log("Error fetching task: ", error.message);
        res.status(500).json({ message: error.message });
    }
};

// Update a task by its ID

export const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findOneAndUpdate({
            _id: taskId,
            userId: req.user._id,
            deleted: false
        }, req.body, { new: true });

        if (!task ) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        console.log("Error updating task: ", error.message);
        res.status(500).json({ message: error.message });
    }
};

// Delete a task by its ID

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findOneAndDelete({
            _id: taskId,
            userId: req.user._id,
            deleted: false
        }, { deleted: true  }, { new: true });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log("Error deleting task: ", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const updateTaskStatus = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;

        const validStatus = ["Pending", "In Progress", "Completed"];
        if (!validStatus.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const task = await Task.findOneAndUpdate({
            _id: taskId,
            userId: req.user._id,
            deleted: false
        }, { status }, { new: true });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({
            message: 'Task status updated successfully',
            task
        });
    } catch (error) {
        console.log("Error updating task status: ", error.message);
        res.status(500).json({ message: error.message });
    }
};