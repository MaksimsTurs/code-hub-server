import { model, Types, Schema } from "mongoose";
export default model("projects", new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    visibility: {
        type: String
    },
    stars: {
        type: [Types.ObjectId],
        ref: "accounts"
    },
    owner: {
        type: Types.ObjectId,
        ref: "accounts"
    },
    contributors: {
        type: [Types.ObjectId],
        ref: "accounts"
    }
}, { timestamps: true }));
