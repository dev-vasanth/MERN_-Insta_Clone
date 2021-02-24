import mongoose, { Schema } from 'mongoose'

const usersSchema = new Schema({
    email: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String
    }
})

usersSchema.methods = {
    view(full) {
        const view = {
            email: this.email,
            userName: this.userName,
        }
        return view;
    }
}

const model = mongoose.model('Users', usersSchema)

export default model;