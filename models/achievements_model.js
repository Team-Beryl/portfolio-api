import { Schema, Types, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const achievementsSchema = new Schema({
            award: { type: String },
            description: { type: String },
            date: { type: String },
            image: {type:String},
            nameOfInstitution: { type: String },
            user: {type: Types.ObjectId, ref: 'User'}
        },
     {
        timestamps:true
    })

achievementsSchema.plugin(toJSON)


export const AchievementsModel = model('Achievement', achievementsSchema)

