import Joi from "joi";

export const userSchema = Joi.object({

    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    otherNames: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    confirmedPassword: Joi.ref('password'),
    username: Joi.string(),
    termsAndConditions: Joi.boolean() 
    
})

.with('password', 'confirmedPassword')

export const userProfileSchema = Joi.object({
    
    profilePicture:Joi.string(),
    location: Joi.string(),
    maritalStatus: Joi.string(),
    sex: Joi.string(),
    bio: Joi.string(),
    about: Joi.string(),
    dateOfBirth: Joi.date(),
    contact: Joi.string(),
    resume: Joi.string(),
    languages: Joi.string(),
    gitHubLink: Joi.string(),
    linkedInLink: Joi.string(),
    twitterLink: Joi.string(),
    user: Joi.string()
}
)

export const skillsSchema = Joi.object(
    {
        name: Joi.string(),
        levelOfProficiency: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert'),
        user: Joi.string()
    }
)

export const projectsSchema = Joi.object(
    {
        projectName: Joi.string(),
        description: Joi.string(),
        contributors: Joi.string(),
        skills: Joi.string(),
        link: Joi.string(),
        nameOfInstitution: Joi.string(),
        startDate: Joi.string().required(),
        endDate: Joi.string(),
        user: Joi.string()
    }
)

export const experienceSchema = Joi.object(
    {
        companyName: Joi.string(),
        role: Joi.string(),
        responsibility: Joi.string(),
        location: Joi.string(),
        startDate: Joi.string().required(),
        endDate: Joi.string(),
        skills: Joi.string(),
        user: Joi.string()
    }
)

export const educationSchema = Joi.object(
    {
        schoolName: Joi.string(),
        program: Joi.string(),
        qualification: Joi.string(),
        grade: Joi.string(),
        location: Joi.string(),
        startDate: Joi.string().required(),
        endDate: Joi.string(),
        user: Joi.string()

    }
)
export const achievementsSchema = Joi.object(
    
    {
        award: Joi.string(),
        description: Joi.string(),
        image: Joi.string(),
        date: Joi.string(),
        nameOfInstitution: Joi.string(),
        user: Joi.string()
    }

)
export const volunteringSchema = Joi.object(
    
    {
        organization: Joi.string(),
        description: Joi.string(),
        skills: Joi.string(),
        startDate: Joi.string().required(),
        endDate: Joi.string(),
        location: Joi.string(),
        role: Joi.string(),
        responsibility: Joi.string(),
        projectName: Joi.string(),
        user: Joi.string()
    }
    
)