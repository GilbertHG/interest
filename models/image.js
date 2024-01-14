import {model, models, Schema} from "mongoose";
import sourceType from "@/constants/SourceType";

/**
 * Mongoose schema for comments associated with an image.
 *
 * @typedef {Object} CommentSchema
 * @property {string} comment - The comment text.
 * @property {Types.ObjectId} creator - The user who created the comment (referenced by ObjectId).
 */
const CommentSchema = new Schema({
    comment: {
        type: String,
        required: [true, 'Comment is required']
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

/**
 * Mongoose schema for tags associated with an image.
 *
 * @typedef {Object} TagSchema
 * @property {string} name - The name of the tag.
 */
const TagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Tag name is required']
    }
});

/**
 * Mongoose schema for image.
 *
 * @typedef {Object} ImageSchema
 * @property {Types.ObjectId} creator - The user who created the image (referenced by ObjectId).
 * @property {sourceType} type - The type of the image, defaults to the value of sourceType constant.
 * @property {string} name - The name of the image.
 * @property {string} description - The description of the image.
 * @property {string} fileName - The filename of the image.
 * @property {string} url - The URL of the image.
 * @property {TagSchema[]} tags - An array of tags associated with the image.
 * @property {CommentSchema[]} comments - An array of comments associated with the image.
 */

const ImageSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: Schema.Types.Mixed,
        default: sourceType
    },
    name: {
        type: String,
        // required: [true, 'Name is required']
    },
    description: {
        type: String
    },
	fileName: {
		type: String
	},
    url: {
        type: String,
        required: [true, 'Url image is required']
    },
	softDelete: Boolean,
    tags: [TagSchema],
    comments: [CommentSchema]
});

/**
 * Mongoose model for image.
 *
 * @type {Model<Document>}
 */
const Image = models?.Image || model("Image", ImageSchema);
export default Image;