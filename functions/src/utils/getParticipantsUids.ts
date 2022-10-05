import { IPaticipant } from "../interfaces/participate.interface"
const getParticipantsUids = (
    participants: IPaticipant[]
):string[]  =>{
    const confirmedParticipants = participants.filter(participant => participant.agreed && participant.isConfirmed);
    const initialArray:string[] = [];
    return confirmedParticipants.reduce(
        (previousValue, currentValue) => [...previousValue, currentValue.participantUid],
        initialArray
    );
}

export default getParticipantsUids;