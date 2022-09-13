
const { gql } = require('apollo-server-express');
const inputAndType = {
    input: 'input',
    type: 'type'
}

const InputTypes = {
    ImageInput: 'ImageInput',
    UserInput: 'UserInput',
    RateInput: 'RateInput',
    ReviewInput: 'ReviewInput',
    LatLngLiteralInput: 'LatLngLiteralInput',
    LatLngAndAddressInput: 'LatLngAndAddressInput',
    TaskInput: 'TaskInput'
}

const ImageInputObj = `
    uid: ID!
    name: String
    refPath: String!
    url: String!
`;
const UserInputObj = `
    uid:ID!
    displayName: String
    email: String!
    sex: String!
    avatarImg: ${InputTypes.ImageInput}
    friendsList:[${InputTypes.UserInput}]
`;

const RateInputObj = `
    user: ${InputTypes.UserInput}
    rate: Float
`
const ReviewInputObj = `
    review: String
    user: ${InputTypes.UserInput}
    time: String
`
const LatLngLiteralInputObj = `
    lat: Float!
    lng: Float!
`
const LatLngAndAddressInputObj = `
    latLng: ${InputTypes.LatLngLiteralInput}
    address: String
`
const TaskInputObj = `
    id: ID!
    title:String!
    startDate: String!
    startTime: String!
    endDate: String!
    endTime: String!
    organizer: ${InputTypes.UserInput}!
    participants: [${InputTypes.UserInput}]
    description:String!
    reviews: [${InputTypes.ReviewInput}]
    latLngAndAddress: ${InputTypes.LatLngAndAddressInput}!
    participantsNumber: Int!
    open: Boolean
    hide: Boolean
    showImages:[${InputTypes.ImageInput}]
    frontCoverImage: ${InputTypes.ImageInput}
    rate:   [${InputTypes.RateInput}]
    keyWords: [String]
`
// participants,reviews,rate,frontCoverImage

const graphqlInput = {
    [InputTypes.ImageInput]: `
        ${inputAndType.input} ${InputTypes.ImageInput} { ${ImageInputObj} }
    `,
    [InputTypes.UserInput]: `
        ${inputAndType.input} ${InputTypes.UserInput} { ${UserInputObj} }
    `,
    [InputTypes.RateInput]: `
        ${inputAndType.input} ${InputTypes.RateInput} { ${RateInputObj} }
    `,
    [InputTypes.ReviewInput]: `
        ${inputAndType.input} ${InputTypes.ReviewInput} { ${ReviewInputObj} }
    `,
    [InputTypes.LatLngLiteralInput]: `
        ${inputAndType.input} ${InputTypes.LatLngLiteralInput} { ${LatLngLiteralInputObj} }
    `,
    [InputTypes.LatLngAndAddressInput]: `
        ${inputAndType.input} ${InputTypes.LatLngAndAddressInput} { ${LatLngAndAddressInputObj} }
    `,
    [InputTypes.TaskInput]: `
        ${inputAndType.input} ${InputTypes.TaskInput} { ${TaskInputObj} }
    `,

}





const Types = {
    Image: 'Image',
    User: 'User',
    Rate: 'Rate',
    Review: 'Review',
    LatLngLiteral: 'LatLngLiteral',
    LatLngAndAddress: 'LatLngAndAddress',
    Task: 'Task'
}

const ImageObj = `
    uid: ID!
    name: String
    refPath: String!
    url: String!
`;
const UserObj = `
    uid:ID!
    displayName: String
    email: String!
    sex: String!
    avatarImg: ${Types.Image}
    friendsList:[${Types.User}]
`;

const RateObj = `
    user: ${Types.User}
    rate: Float
`
const ReviewObj = `
    review: String
    user: ${Types.User}
    time: String
`
const LatLngLiteralObj = `
    lat: Float!
    lng: Float!
`
const LatLngAndAddressObj = `
    latLng: ${Types.LatLngLiteral}
    address: String
`
const TaskObj = `
    id: ID!
    title:String!
    startDate: String!
    startTime: String!
    endDate: String!
    endTime: String!
    organizer: ${Types.User}!
    participants: [${Types.User}]!
    description:String!
    reviews: [${Types.Review}]!
    latLngAndAddress: ${Types.LatLngAndAddress}!
    participantsNumber: Int!
    open: Boolean
    hide: Boolean
    showImages:[${Types.Image}]
    frontCoverImage: ${Types.Image}
    rate:   [${Types.Rate}]
    keyWords: [String]
`

const graphqlTypes = {
    [Types.Image]: `
        ${inputAndType.type} ${Types.Image} { ${ImageObj} }
    `,
    [Types.User]: `
        ${inputAndType.type} ${Types.User} { ${UserObj} }
    `,
    [Types.Rate]: `
        ${inputAndType.type} ${Types.Rate} { ${RateObj} }
    `,
    [Types.Review]: `
        ${inputAndType.type} ${Types.Review} { ${ReviewObj} }
    `,
    [Types.LatLngLiteral]: `
        ${inputAndType.type} ${Types.LatLngLiteral} { ${LatLngLiteralObj} }
    `,
    [Types.LatLngAndAddress]: `
        ${inputAndType.type} ${Types.LatLngAndAddress} { ${LatLngAndAddressObj} }
    `,
    [Types.Task]: `
        ${inputAndType.type} ${Types.Task} { ${TaskObj} }
    `,

}


const geanerateTypesAndInoutTypes = (inputTypes, types) => {
    const newObj = {...inputTypes,...types};
    let str = ``;
    Object.keys(newObj).forEach(type => str += newObj[type]);

    return str;
}


const types = geanerateTypesAndInoutTypes(graphqlInput, graphqlTypes);



const QuertNames = {
    users: 'users',
    tasks: 'tasks',
    getTaskById: 'getTaskById',
    getUserById: 'getUserById',
    getAllEmails: 'getAllEmails'
}
const MutationNames = {
    addTask: 'addTask',
    addUser: 'addUser'
}


const query = `
    type Query {
        ${QuertNames.users}: [${Types.User}]
        ${QuertNames.tasks}: [${Types.Task}]
        ${QuertNames.getTaskById}(id: String): ${Types.Task}
        ${QuertNames.getUserById}(uid: String): ${Types.User}
    }
`;
const mutation = `
    type Mutation {
        ${MutationNames.addTask}(taskObj:${InputTypes.TaskInput}): ${Types.Task}
        ${MutationNames.addUser}(userInput:${InputTypes.UserInput}): ${Types.User}
    }
`;


const typeDefs = gql(`` + types + query + mutation);


exports.typeDefs = typeDefs;
exports.quertNames = QuertNames;
exports.mutationNames = MutationNames;










/*const typeDefs = gql`

input RateInput {
    user: UserInput
    rate: Float
}
input reviewInput {
    review: String
    user: UserInput
    time: String
}
input ImageInput {
    uid: ID!
    name: String
    refPath: String!
    url: String!
}
input LatLngLiteralInput {
    lat: Float!
    lng: Float!
}
input LatLngAndAddressInput {
    latLng: LatLngLiteralInput
    address: String
}
input UserInput {
    uid:ID!
    displayName: String
    email: String!
    sex: String!
    avatarImg: ImageInput
    friendsList:[UserInput]
}
input TaskInput {
    id: ID!
    title:String!
    startDate: String!
    startTime: String!
    endDate: String!
    endTime: String!
    organizer: UserInput!
    participants: [UserInput]!
    description:String!
    reviews: [reviewInput]!
    latLngAndAddress: LatLngAndAddressInput!
    participantsNumber: Int!
    open: Boolean
    hide: Boolean
    showImages:[ImageInput]
    frontCoverImage: ImageInput
    rate:RateInput
    keyWords: [String]
}



type LatLngLiteral {
    lat: Float!
    lng: Float!
}
type LatLngAndAddress {
    latLng: LatLngLiteral
    address: String
}

type Image {
    uid: ID!
    name: String
    refPath: String!
    url: String!
}
type Rate {
    user: User
    rate: Float
}

type Task{
    id: ID!
    title:String!
    startDate: String!
    startTime: String!
    endDate: String!
    endTime: String!
    organizer: User!
    participants: [User]
    description:String!
    reviews: [Review]!
    participantsNumber: Int!
    open: Boolean
    hide: Boolean
    showImages:[Image]
    frontCoverImage: Image
    latLngAndAddress: LatLngAndAddress
    rate: Rate
    keyWords: [String]
}
type Review {
    review: String
    user: User
    time: String
}
type Email {
    email: String
}
type User {
    uid:ID!
    displayName: String
    email: String!
    sex: String!
    avatarImg: Image
    friendsList:[User]
}


type Query {
    users: [User]
    tasks: [Task]
    getTaskById(id: String): Task
    getUserById(uid: String): User
    getAllEmails: [Email]
}

type Mutation {
    addTask(taskObj:TaskInput): Task
    addUser(userInput:UserInput): User
}


`
*/



//  const typeDefs = gql`

//     input RateInput {
//         user: UserInput
//         rate: Float
//     }
//     input reviewInput {
//         review: String
//         user: UserInput
//         time: String
//     }
//     input ImageInput {
//         uid: ID!
//         name: String
//         refPath: String!
//         url: String!
//     }
//     input LatLngLiteralInput {
//         lat: Float!
//         lng: Float!
//     }
//     input LatLngAndAddressInput {
//         latLng: LatLngLiteralInput
//         address: String
//     }
//     input UserInput {
//         uid:ID!
//         displayName: String
//         email: String!
//         sex: String!
//         avatarImg: ImageInput
//         friendsList:[UserInput]
//     }
//     input TaskInput {
//         id: ID!
//         title:String!
//         startDate: String!
//         startTime: String!
//         endDate: String!
//         endTime: String!
//         organizer: UserInput!
//         participants: [UserInput]!
//         description:String!
//         reviews: [reviewInput]!
//         latLngAndAddress: LatLngAndAddressInput!
//         participantsNumber: Int!
//         open: Boolean
//         hide: Boolean
//         showImages:[ImageInput]
//         frontCoverImage: ImageInput
//         rate:RateInput
//         keyWords: [String]
//     }

    

//     type LatLngLiteral {
//         lat: Float!
//         lng: Float!
//     }
//     type LatLngAndAddress {
//         latLng: LatLngLiteral
//         address: String
//     }

//     type Image {
//         uid: ID!
//         name: String
//         refPath: String!
//         url: String!
//     }
//     type Rate {
//         user: User
//         rate: Float
//     }
   
//     type Task{
//         id: ID!
//         title:String!
//         startDate: String!
//         startTime: String!
//         endDate: String!
//         endTime: String!
//         organizer: User!
//         participants: [User]
//         description:String!
//         reviews: [Review]!
//         participantsNumber: Int!
//         open: Boolean
//         hide: Boolean
//         showImages:[Image]
//         frontCoverImage: Image
//         latLngAndAddress: LatLngAndAddress
//         rate: Rate
//         keyWords: [String]
//     }
//     type Review {
//         review: String
//         user: User
//         time: String
//     }
//     type Email {
//         email: String
//     }
//     type User {
//         uid:ID!
//         displayName: String
//         email: String!
//         sex: String!
//         avatarImg: Image
//         friendsList:[User]
//     }


//     type Query {
//         users: [User]
//         tasks: [Task]
//         getTaskById(id: String): Task
//         getUserById(uid: String): User
//         getAllEmails: [Email]
//     }

//     type Mutation {
//         addTask(taskObj:TaskInput): Task
//         addUser(userInput:UserInput): User
//     }


// `
