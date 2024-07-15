import { Schema, model, Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({
    
    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    termsAndConditions: { type: Boolean },
    userProfile: { type: Types.ObjectId, ref: 'UserProfile' },
    education: [{ type: Types.ObjectId, ref: 'Education' }],
    skills: [{ type: Types.ObjectId, ref: 'Skill' }],
    experiences: [{ type: Types.ObjectId, ref: 'Experience' }],
    projects: [{ type: Types.ObjectId, ref: 'Project' }],
    achievements: [{ type: Types.ObjectId, ref: 'Achievement' }],
    volunteering: [{ type: Types.ObjectId, ref: 'Volunteering' }],
  

}, {
    timestamps:true
})

userSchema.plugin(toJSON);


export const UserModel = model('User', userSchema);