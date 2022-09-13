const { db, collections} = require('../../db');
const { baseTask } = require('../../default/baseTask');
const queryTasks = async() =>{
    return db.ref(collections.tasks)
            .once("value")
            .then(snap =>snap.val())
            .then(value => {
                const tasks =  Object.keys(value).map((key)=>value[key]);
                return tasks.map((task)=>{
                    return {
                        ...baseTask,
                        ...task
                    };
                })
            });
};

module.exports = queryTasks;