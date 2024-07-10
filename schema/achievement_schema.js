import Joi from "joi";

export const achievementsSchema = Joi.object(
    [
        {
            award: Joi.string(),
            description: Joi.string(),
            image: Joi.string(),
            date: Joi.date(),
            nameOfInstitution: Joi.string()
        }
    ]
)