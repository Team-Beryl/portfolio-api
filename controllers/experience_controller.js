import { ExperienceModel } from "../models/experience_model.js";
import { UserModel } from "../models/user_model.js";
import { experienceSchema } from "../schema/experience_schema.js";

export const postExperience = async (req, res, next) => {
  try {
    const { error, value } = experienceSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Find user with the id you passed when creating experience
    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create experience
    const newExperience = await ExperienceModel.create({
      ...value,
      user: userSessionId,
    });

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
    const userSessionId = req.session.user.id;

    const getAllExperience = await ExperienceModel.find({
      user: userSessionId,
    });
    if (getAllExperience.length == 0) {
      return res.status(404).send("No experience added");
    }
    res.status(200).json({ experience: getAllExperience });
  } catch (error) {
    next(error);
  }
};

export const updateExperience = async (req, res, next) => {
  try {
    const { error, value } = experienceSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedExperience = await ExperienceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateExperience) {
      return res.status(404).send("Profile not found");
    }
    res.status(201).json({ updatedExperience });
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const deletedExperience = await ExperienceModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteExperience) {
      return res.status(404).send("Experience not found");
    }

    user.experience.pull(req.params.id);
    await user.save();
    res.status(200).send("Experience removed");
  } catch (error) {
    next(error);
  }
};
