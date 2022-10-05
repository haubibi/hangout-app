
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

export const ParticipantNotificationObj = `
    type
    taskId
    participantUid
    organizerUid
    read
    notificationType
`
export const TaskUpdateNotificationObj = `
    type
    taskId
    participantUid
    organizerUid
    read
    notificationType
`
export const FriendNotificationObj = `
    type
    notificationType
    read
    senderUid
    receiverUid
`
export const NotificationObj = `
    taskUpdateNotification {
        ${TaskUpdateNotificationObj}
    }
    participantRequestNotification {
        ${ParticipantNotificationObj}
    }
    friendRequestNotification {
        ${FriendNotificationObj}
    }

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
        ${NotificationObj}
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
`;


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
export const participantNotificationObj = `
    task{
        ${taskFullObj}
    }
    participant {
        ${userFullObj}
    }
    organizer {
        ${userFullObj}
    }

`