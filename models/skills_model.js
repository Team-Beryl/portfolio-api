import { toJSON } from "@reis/mongoose-to-json";
import { Schema, Types, model } from "mongoose";


const skillsSchema = new Schema(

    {
        name: { type: String },
        levelOfProficiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] },
        user: {type: Types.ObjectId, ref: 'User'}
    }, {
        timestamps:true
    }

)

skillsSchema.plugin(toJSON)

export const SkillsModel = model('Skills', skillsSchema);