import getUserById from "../../../utils/getUserById";
const queryGetUserById = async (
    _:any,
    {uid}:{uid:string}
) => {
  // console.log(uid);
  return getUserById(uid);
};


export default queryGetUserById;
