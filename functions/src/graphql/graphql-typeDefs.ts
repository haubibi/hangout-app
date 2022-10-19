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

    type TaskUpdateNotificationType {
        type: String
        notificationType: String
        taskId: ID
        participantUid: ID
        organizerUid: ID
        read: Boolean
        name: String
        time: String
    }
    input TaskUpdateNotificationInput {
        type: String
        notificationType: String
        taskId: ID
        participantUid: ID
        organizerUid: ID
        read: Boolean
        name: String
        time: String
    }


    type ParticipantRequestNotificationType {
        type: String
        notificationType: String
        taskId: ID
        participantUid: ID
        organizerUid: ID
        read: Boolean
        time: String
    }
    input ParticipantRequestNotificationInput {
        type: String
        notificationType: String
        taskId: ID
        participantUid: ID
        organizerUid: ID
        read: Boolean
        time: String
    }
    type ParticipantApplicationNotificationType {
        type: String
        notificationType: String
        taskId: ID
        participantUid: ID
        organizerUid: ID
        read: Boolean
        time: String
    }
    input ParticipantApplicationNotificationInput {
        type: String
        notificationType: String
        taskId: ID
        participantUid: ID
        organizerUid: ID
        read: Boolean
        time: String
    }
 

    type FriendNotificationType {
        type: String
        notificationType: String
        read: Boolean
        senderUid: ID
        receiverUid: ID
        time: String
    }
    input FriendNotificationInput {
        type: String
        notificationType: String
        read: Boolean
        senderUid: ID
        receiverUid: ID
        time: String
    }


    type NotificationType {
        taskUpdateNotification: [TaskUpdateNotificationType]
        requestNotification: [ParticipantRequestNotificationType]
        applicationNotification: [ParticipantApplicationNotificationType]
        friendRequestNotification: [FriendNotificationType]
    }
    input NotificationInput {
        taskUpdateNotification: [TaskUpdateNotificationInput]
        requestNotification: [ParticipantRequestNotificationInput]
        applicationNotification: [ParticipantApplicationNotificationInput]
        friendRequestNotification: [FriendNotificationInput]
    }

    type User {
        uid: ID
        displayName: String
        email: String
        sex: String
        avatarImg: Image
        friendsList: [ID]
        notifications: NotificationType
        description: String
    }
    input UserInput {
        uid: ID!
        displayName: String!
        email: String!
        sex: String
        avatarImg: ImageInput
        friendsList: [ID]
        notifications: NotificationInput
        description: String
    }

    input UserUpdateInput {
        displayName: String
        email: String
        sex: String
        avatarImg: ImageInput
        friendsList: [ID]
        notifications: NotificationInput
        description: String
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
        participantsRange: [Float]
    }


    type Task {
        id: ID
        category: String
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
        category: String
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

    type ParticipantNotification {
        task: Task
        participant: User
        organizer: User
    }

    type SearchTasksReturnType {
        totalLength: Int
        tasks: [Task]
    }



    type Query {
        users: [User]
        tasks: [Task]
        getTaskById(id: ID): Task
        getUserById(uid: ID): User
        getFilteredTasks(currentLatLng: LatLngLiteralInput, taskFilter: TaskFilterInput): [Task]
        getParticipantNotification(participantUid: ID, taskId: ID, organizerUid: ID): NotificationType
     }
    type Mutation {
        addTask(taskObj: TaskInput, isNewTaskForm: Boolean): Task
        addUser(userInput: UserInput): User
        updateUserInfo(userUid: String, userInput: UserUpdateInput): User
        addParticipant(participantUid: ID, taskId: ID, addTaskRequestType: String): Paticipant
        quitParticipant(participantUid: ID, taskId: ID, quitTaskRequestType: String): Paticipant
        deleteTask(taskId: ID): Task
        updateRequestNotifications(userUid: String, notifications: [ParticipantRequestNotificationInput]): [ParticipantRequestNotificationType]
        updateApplicationtNotifications(userUid: String, notifications: [ParticipantApplicationNotificationInput]): [ParticipantApplicationNotificationType]
        updateTaskUpdateNotifications(userUid: String, notifications: [TaskUpdateNotificationInput]): [TaskUpdateNotificationType]
        deleteApplicationNotification(participantUid: ID, taskId: ID, organizerUid: ID): [ParticipantApplicationNotificationType]
        deleteEventUpdateNotification(participantUid: ID, taskId: ID, organizerUid: ID): [TaskUpdateNotificationType]
     }  
`;

export default typeDefs;
