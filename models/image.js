import {model, models, Schema} from "mongoose";
import sourceType from "@/constants/sourceType";

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

const TagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Tag name is required']
    }
});

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
        required: [true, 'Name is required']
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: [true, 'Url image is required']
    },
    tags: [TagSchema],
    comments: [CommentSchema]
});

const Image = models?.Image || model("Image", ImageSchema);
export default Image;