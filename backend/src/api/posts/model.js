import mongoose, { mongo, Schema } from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const postScheme = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    postImage: {
        type: String
    },
    postedBy: {
        type: ObjectId,
        ref: 'Users'
    }
})

postScheme.methods = {
    view(full) {
        const view = {
            title: this.title,
            body: this.body,
            postImage: this.postImage,
            postedBy : this.postedBy,
        }
        return view;
    }
}

const model = mongoose.model('Posts', postScheme)

export default model