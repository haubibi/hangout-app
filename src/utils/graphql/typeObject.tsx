// uid: string;
//     displayName: string;
//     email: string;
//     sex: 'male' | 'female';
//     avatarImg: IImageObjWithUrlAndRefPath | null;
//     friendsList: IUser[];

import { findConfigFile } from "typescript"

//     notifications: NotificationTypes[];
export const avatarImgObj = `
    uid
    name
    refPath
    url
`

export const UserSignUpInput = `
    uid
    email
    displayName
`

export const ParticipantNotificationTypes = `
    type
    taskId
    participantUid
    organizerUid
    read
`

export const userUidObj = `
    uid
`
export const userFullObj = `
    uid
    displayName
    email
    sex
    avatarImg {
        ${avatarImgObj}
    }
    friendsList
    notifications {
        ${ParticipantNotificationTypes}
    }
`

export const latLngObj = `
    lng
    lat
`

export const latLngAndAddressObj = `
    latLng {
        ${latLngObj}
    }
    address
`

export const rateObj = `
    userUid
    rate
`

export const reviewsObj = `
    userUid
    review
    time
`
export const ParticipantsObj = `
    participantUid
    isConfirmed
    agreed
    requestType
`

export const taskFullObj = `
    id
    title
    startDate
    startTime
    endDate
    endTime
    rate {
        ${rateObj}
    }
    keyWords
    organizer
    showImages {
        ${avatarImgObj}
    }
    frontCoverImage{
        ${avatarImgObj}
    }
    latLngAndAddress {
        ${latLngAndAddressObj}
    }
    reviews{
        ${reviewsObj}
    }
    participants {    
        ${ParticipantsObj}
    }
    description
    participantsNumber
    open
    hide
`
