import { model, Schema, Types } from "mongoose";
export default model("accounts", new Schema({
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    projects: {
        type: [Types.ObjectId],
        ref: "projects"
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, { timestamps: true }));
