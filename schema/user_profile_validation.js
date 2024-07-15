import Joi from "joi";

export const userProfileSchema = Joi.object({
  profilePicture: Joi.string(),
  location: Joi.string(),
  maritalStatus: Joi.string(),
  sex: Joi.string(),
  bio: Joi.string(),
  about: Joi.string(),
  dateOfBirth: Joi.date(),
  contact: Joi.string().required(),
  resume: Joi.string(),
  languages: Joi.string(),
  gitHubLink: Joi.string(),
  linkedInLink: Joi.string(),
  twitterLink: Joi.string(),
});
