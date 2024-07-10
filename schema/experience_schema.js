import Joi from "joi";

export const experienceSchema = Joi.object(
    {
        companyName: Joi.string(),
        role: Joi.string(),
        responsibility: Joi.string(),
        location: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date(),
        skills: Joi.string()
    }
)