import getTaskById from "../../../operateDatabaseFunctions/getTaskById";
const queryGetTaskById = async (
    _:any,
    {id}: {id: string}
)=>{
  return getTaskById(id);
};


export default queryGetTaskById;
