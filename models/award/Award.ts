/**
 * @typedef Award Represents award relationship between a user and a tuit,
 * as in a user awards a tuit
 * @property {Tuit} tuit Tuit being awarded
 * @property {User} likedBy User awarding the tuit
 */

export default interface Award {
    name: string,
    coins: number
};