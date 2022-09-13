const { db, collections } = require('../../db');

const mutationAddUser = async(
    _,
    {userInput},
) => {
    console.log(userInput)
    const {uid} = userInput;
    const usersRef = db.ref(collections.users);
    const userRef = usersRef.child(uid);
    userRef.set(userInput);
    return userInput;
};

module.exports = mutationAddUser;