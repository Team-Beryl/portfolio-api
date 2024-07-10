import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({
    
    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    termsAndConditions: { type: Boolean },

})

userSchema.plugin(toJSON);


export const UserModel = model('User', userSchema);