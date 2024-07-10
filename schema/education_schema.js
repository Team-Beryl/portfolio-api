import Joi from "joi";

export const educationSchema = Joi.object(
    {
        schoolName: Joi.string(),
        program: Joi.string(),
        qualification: Joi.string(),
        grade: Joi.string(),
        location: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date()

    }
)