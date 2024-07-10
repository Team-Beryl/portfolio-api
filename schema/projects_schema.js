import Joi from "joi";

export const projectsSchema = Joi.object(
    {
        projectName: Joi.string(),
        description: Joi.string(),
        contributors: Joi.string(),
        skills: Joi.string(),
        link: Joi.string(),
        nameOfInstitution: Joi.string(),
        startDate: Joi.date(),
        endDate: Joi.date()
    }
)