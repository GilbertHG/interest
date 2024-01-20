import { Schema, model, models } from "mongoose";

/**
 * Mongoose schema for user data.
 *
 * @typedef {Object} UserSchema
 * @property {string} email - The email of the user.
 * @property {string} username - The username of the user.
 * @property {string} image - The image URL associated with the user.
 */
const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    image: {
        type: String
    }
});

/**
 * Mongoose model for users.
 *
 * @type {Model<Document>}
 */
const User = models?.User || model("User", UserSchema);
export default User;