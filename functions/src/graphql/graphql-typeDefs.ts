/* eslint-disable max-len */
import {gql} from "apollo-server-express";

const typeDefs = gql`
    enum AddParticipantRequestEnum {
        PARTICIPANT_APPLY_REQUEST
        PARTICIPANT_ARGEE_REQUEST
        PARTICIPANT_REFUSE_REQUEST
        ORGANIZER_APPLY_REQUEST
        ORGANIZER_ARGEE_REQUEST
        ORGANIZER_REFUSE_REQUEST
    }

    enum QuitTaskRequestEnum {
        PARTICIPANT_QUIT_REQUEST,
    }

    type Image {
        uid: ID
        name: String
        refPath: String
        url: String
    }
    input ImageInput {
        uid: ID
        name: String
        refPath: String
        url: String
    }

    type ParticipantRequestTypes {
        type: String
        taskId: ID
        participantUid: ID
        organizerUid: ID
        read: Boolean
    }

    input ParticipantRequestTypesInput {
        type: String
        taskId: ID
        participantUid: ID
        organizerUid: ID
        read: Boolean
    }


    type User {
        uid: ID
        displayName: String
        email: String
        sex: String
        avatarImg: Image
        friendsList: [ID]
        notifications: [ParticipantRequestTypes]
    }
    input UserInput {
        uid: ID!
        displayName: String!
        email: String!
        sex: String
        avatarImg: ImageInput
        friendsList: [ID]
        notifications: [ParticipantRequestTypesInput]
    }


    type Paticipant {
        participantUid: ID
        isConfirmed: Boolean
        newAdded: Boolean
        agreed: Boolean
        requestType: String
    }


    input PaticipantInput {
        participantUid: ID
        isConfirmed: Boolean
        newAdded: Boolean
        agreed: Boolean
        requestType: String
    }
    type Review {
        userUid: ID
        review: String
        time: String
    }
    input ReviewInput {
        userUid: ID
        review: String
        time: String
    }

    type LatLngLiteral {
        lat: Float
        lng: Float
    }
    input LatLngLiteralInput {
        lat: Float
        lng: Float
    }
    
    type LatLngAndAddress {
        latLng: LatLngLiteral
        address: String
    }
    input LatLngAndAddressInput {
        latLng: LatLngLiteralInput
        address: String
    }

    type Rate {
        userUid: ID
        rate: Float
    }
    input RateInput {
        userUid: ID
        rate: Float
    }

    type ImageObjWithUrlAndRefPath {
        uid: ID
        name: String
        refPath: String
        url: String
    }
    input ImageObjWithUrlAndRefPathInput {
        uid: ID
        name: String
        refPath: String
        url: String
    }


    input TaskFilterInput {
        distanceRange: [Float]
        paticipantsRange: [Float]
    }


    type Task {
        id: ID
        title: String
        organizer: ID
        participantsNumber: Int
        description: String

        startDate:String
        startTime:String
        endDate:String
        endTime:String

        participants: [Paticipant]
        reviews: [Review]
        hide: Boolean
        open: Boolean
        latLngAndAddress: LatLngAndAddress
        keyWords: [String]
        rate: [Rate]

        showImages: [ImageObjWithUrlAndRefPath]
        frontCoverImage: ImageObjWithUrlAndRefPath
    }
    input TaskInput {
        id: ID
        title: String
        organizer: ID
        participantsNumber: Int
        description: String

        startDate:String
        startTime:String
        endDate:String
        endTime:String

        participants: [PaticipantInput]
        reviews: [ReviewInput]
        hide: Boolean
        open: Boolean
        latLngAndAddress: LatLngAndAddressInput
        keyWords: [String]
        rate: [RateInput]

        showImages: [ImageObjWithUrlAndRefPathInput]
        frontCoverImage: ImageObjWithUrlAndRefPathInput
    }

    type Query {
        users: [User]
        tasks: [Task]
        getTaskById(id: ID): Task
        getUserById(uid: ID): User
        getFilteredTasks(currentLatLng: LatLngLiteralInput, taskFilter: TaskFilterInput): [Task]
     }
    type Mutation {
        addTask(taskObj: TaskInput): Task
        addUser(userInput: UserInput): User
        addParticipant(participantUid: ID, taskId: ID, addTaskRequestType: String): Paticipant
     }  
`;

export default typeDefs;
