const { db, collections } = require('../../db');

const mutationAddTask = async(
    _,
    { taskObj }
) => {
    const task = {
        ...taskObj
    }
    const tasksRef = db.ref(collections.tasks);
    const taskRef = tasksRef.child(taskObj.id);
    taskRef.set(task);
    return task;
};

module.exports = mutationAddTask;