import Joi from "joi";

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
        }
        
)