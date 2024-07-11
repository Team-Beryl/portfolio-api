import { ExperienceModel } from "../models/experience_model.js";
import { UserModel } from "../models/user_model.js";
import { experienceSchema } from "../schema/experience_schema.js";

export const postExperience = async (req, res, next) => {
  try {
    const { error, value } = experienceSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Create experience
    const newExperience = await ExperienceModel.create(value);

    // Find user with id you passed when creating Experience
    const user = await UserModel.findById(value.user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // push experience id to user
    user.experience.push(newExperience.id);

    // save user with experience id
    await user.save();

    res.status(201).json({ newExperience });
  } catch (error) {
    next(error);
  }
};

export const getAllUserExperience = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const getAllExperience = await ExperienceModel.find({ user: userId });
    if (getAllExperience.length == 0) {
      return res.status(404).send("No experience added");
    }
    res.status(200).json({ experience: getAllExperience });
  } catch (error) {
    next(error);
  }
};

export const getOneExperience = async (req, res, next) => {
  try {
    const singleExperience = await ExperienceModel.findById(req.params.id);
    res.status(200).json(singleExperience);
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const updatedExperience = await ExperienceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedExperience);
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    await ExperienceModel.findByIdAndDelete(req.params.id);
    res.status(201).send("Experience removed");
  } catch (error) {
    next(error);
  }
};
