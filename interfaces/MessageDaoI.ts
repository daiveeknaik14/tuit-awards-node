import Message from "../models/Message";

/**
 * @file Declares API for Message related data access object methods
 */
export default interface MessageDaoI {
    findAllMessagesSentByUser (uid: string): Promise<Message[]>;
    findAllMessagesReceivedByUser (uid: string): Promise<Message[]>;
    userMessagesUser (uidReceiver: string, uidSender: string, message: Message): Promise<Message>;
    userDeletesMessage (uid: string, mid: string): Promise<any>;
};