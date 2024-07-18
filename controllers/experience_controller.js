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
    const id = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create experience
    const newExperience = await ExperienceModel.create({
      ...value,
      user: id,
    });

    // push experience id to user
    user.experiences.push(newExperience.id);

    // save user with experience id
    await user.save();

    res.status(201).json({message:"Experience added successfully", newExperience});
  } catch (error) {
    next(error);
  }
};

export const getAllUserExperience = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;

    const getAllExperience = await ExperienceModel.find({
      user: id,
    });
    if (getAllExperience.length == 0) {
      return res.status(404).json({ experience: getAllExperience });
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

    const id = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedExperience = await ExperienceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateExperience) {
      return res.status(404).json({ Experience: updatedExperience });
    }
    res.status(201).json({message:"Experience updated successfully", updatedExperience});
  } catch (error) {
    next(error);
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const deletedExperience = await ExperienceModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedExperience) {
      return res.status(404).send("Experience not found");
    }

    user.experiences.pull(req.params.id);
    await user.save();
    res.status(200).send("Experience deleted successfully");
  } catch (error) {
    next(error);
  }
};


export const getUserExperience = async (req, res, next)=>{
  try {
    const anExperience = await ExperienceModel.findById(req.params.id)
    res.status(200).send(anExperience)
  } catch (error) {
    next(error)
  }
}