const defaultLatLng = {
    lat: 51.4405956,
    lng: 5.4730085
}
const baseTask =  {
    id: '',
    title: '',
    organizer: [],
    startDate: undefined,
    startTime: undefined,
    endDate: undefined,
    endTime: undefined,
    participants: [],
    reviews: [],
    hide: false,
    open:true,
    participantsNumber: 0,
    latLngAndAddress: {
        latLng: defaultLatLng,
        address: ''
    },
    description:'',
    showImages:[],
    frontCoverImage: null,
    keyWords: [],
    rate: []
};


exports.baseTask = baseTask;

    // id: ID!
    // title:String!
    // startDate: String!
    // startTime: String!
    // endDate: String!
    // endTime: String!
    // organizer: ${InputTypes.UserInput}!-
    // participants: [${InputTypes.UserInput}]
    // description:String!
    // reviews: [${InputTypes.ReviewInput}]
    // latLngAndAddress: ${InputTypes.LatLngAndAddressInput}!
    // participantsNumber: Int!
    // open: Boolean
    // hide: Boolean
    // showImages:[${InputTypes.ImageInput}]
    // frontCoverImage: ${InputTypes.ImageInput}
    // rate:   [${InputTypes.RateInput}]
    // keyWords: [String]