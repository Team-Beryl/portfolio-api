import Joi from "joi";

export const userSchema = Joi.object({
    user:{
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    otherNames: Joi.string(),
    email: Joi.string().email.required(),
    password: Joi.string().required(),
    confirmedPassword: Joi.ref('password'),
    username: Joi.string(),
    termsAndConditions: Joi.boolean() 
}})