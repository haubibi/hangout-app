import getTaskById from "../../../utils/getTaskById";
const queryGetTaskById = async (
    _:any,
    {id}: {id: string}
)=>{
  return getTaskById(id);
};


export default queryGetTaskById;
