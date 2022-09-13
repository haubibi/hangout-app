const { db, collections } = require('../../db');

const queryGetTaskById = async(
    _,
    {id}
)=>{
    return db.ref(collections.tasks)
            .once("value")
            .then(snap =>snap.val())
            .then(value => {
                const taskArr = Object.keys(value).map((key)=>value[key]);
                const taskIndex = taskArr.findIndex((task) => task.id === id);
                if(taskIndex === -1){
                    return null;
                } else {
                    return taskArr[taskIndex];
                }
            });
};

module.exports = queryGetTaskById;