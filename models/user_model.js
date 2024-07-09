import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({
    user: {
    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String },
    termsAndConditions: { type: Boolean },
    },

    userProfile: {
        profilePicture: { type: String },
        location: { type: String },
        maritalStatus: { type: String, enum: ['single', 'married', 'prefer-not-to-say'] },
        sex: { type: String, enum: ['male', 'female'] },
        bio: { type: String },
        about: { type: String },
        dateOfBirth: { type: Date },
        contact: { type: String },
        resume: { type: String },
        languages: [{ type: String }]
    },

    socials: {
        gitHubLink: { type: String },
        linkedInLink: { type: String },
        twitterLink: { type: String }

    },

    skills:
        [{
            name: { type: String },
            levelOfProficiency: { type: String, enum: ['beginner', 'intermediate', 'advanced', 'expert'] }
        }]
    ,

    experience: [
        {
            companyName: { type: String },
            role: { type: String },
            responsibility: { type: String },
            location: { type: String },
            startDate: { type: String },
            endDate: { type: String },
            skills: { type: String },

        }
    ],

    education: [
        {
            schoolName: { type: String },
            program: { type: String },
            qualification: { type: String },
            grade: { type: String },
            location: { type: String },
            startDate: { type: String },
            endDate: { type: String }

        }
    ],


    achievements: [
        {
            award: { type: String },
            description: { type: String },
            image: { type: String },
            date: { type: String },
            nameOfInstitution: { type: String }
        }
    ],

    projects: [
        {
            projectName: { type: String },
            description: { type: String },
            contributors: { type: String },
            skills: { type: String },
            link: { type: String },
            nameOfInstitution: { type: String },
            startDate: { type: String },
            endDate: { type: String }
        }
    ],

    volunteering: [
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
        }
    ],






})

userSchema.plugin(toJSON);


export const UserModel = model('User', userSchema);