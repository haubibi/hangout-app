const { db, collections } = require('../../db');

const queryGetUserById = async(
    _,
    {uid}
)=>{
    if(uid === '') return;
    return db.ref(collections.users)
            .once("value")
            .then(snap =>snap.val())
            .then(value => {
                const users = Object.keys(value).map((key)=>value[key]);
                return users.filter((user)=>user.uid === uid)[0];
            });
};

module.exports = queryGetUserById;