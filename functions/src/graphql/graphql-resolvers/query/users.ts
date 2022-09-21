import getUsers from "../../../operateDatabaseFunctions/getUsers";

const queryUsers = async () =>{
  return getUsers();
};

export default queryUsers;

