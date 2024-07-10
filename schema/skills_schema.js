import Joi from "joi";

export const skillsSchema = Joi.object(
    [{
        name: Joi.string(),
        levelOfProficiency: Joi.string().valid('beginner', 'intermediate', 'advanced', 'expert')
    }]
)