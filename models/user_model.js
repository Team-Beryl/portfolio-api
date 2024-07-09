import { Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    experience: [{ type: String }],
    achievements: [{ type: String }],
    skills: [{ type: String }],
    projects: [{ type: String }],
    mediaLinks: [{ type: String }]

})

userSchema.plugin(toJSON);


export const UserModel = model('User', userSchema);