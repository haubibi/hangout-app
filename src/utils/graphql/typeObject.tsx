
export const avatarImgObj = `
    uid
    name
    refPath
    url
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
    friendsList {
        ${userUidObj}
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
    user {
        ${userFullObj}
    }
    rate
`

export const reviewsObj = `
    user {
        ${userFullObj}
    }
    review
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
    organizer {
        ${userFullObj}
    }
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
        ${userFullObj}
    }
    description
    participantsNumber
    open
    hide
`
