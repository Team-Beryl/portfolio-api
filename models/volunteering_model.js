import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const volunteeringSchema = new Schema (
 [
        {
            organization: { type: String },
            description: { type: String },
            skills: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            location: { type: String },
            role: { type: String },
            responsibility: { type: String },
            projectName: { type: String },
            user: {type: Types.ObjectId, ref: 'User'}
        }
    ], {
        timestamps:true
    }

)

volunteeringSchema.plugin(toJSON)

export const volunteeringModel = model('Volunteering', volunteeringSchema)