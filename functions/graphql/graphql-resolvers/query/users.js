const { db, collections} = require('../../db');

const queryUsers = async() =>{
    return db.ref(collections.users)
            .once("value")
            .then(snap =>snap.val())
            .then(value => Object.keys(value).map((key)=>value[key]));
}

module.exports = queryUsers;