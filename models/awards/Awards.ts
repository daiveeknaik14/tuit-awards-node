/**
 * @file Declares Award data type representing relationship between
 * users and tuits and having specific coins, as in user awards a tuit
 */
import Tuit from "../tuits/Tuit";
import User from "../users/User";
import Award from "../award/Award";

/**
 * @typedef Award Represents award relationship between a user and a tuit,
 * as in a user awards a tuit
 * @property {Tuit} tuit Tuit being awarded
 * @property {User} likedBy User awarding the tuit
 */

export default interface Awards {
    givenBy: User,
    givenTo: Tuit,
    awards: Award
};