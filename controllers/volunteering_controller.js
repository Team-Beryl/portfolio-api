import { VolunteeringModel } from "../models/volunteering_model.js";
import { UserModel } from "../models/user_model.js";
import { volunteringSchema } from "../schema/volunteering_schema.js";

export const postVolunteering = async (req, res, next) => {
  try {
    const { error, value } = volunteringSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const newVolunteering = await VolunteeringModel.create(value);

    const user = await UserModel.findById(value.user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.volunteering.push(newVolunteering.id);

    await user.save();

    res.status(201).json({ newVolunteering });
  } catch (error) {
    next(error);
  }
};

export const getAllUserVolunteering = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const getAllVolunteering = await VolunteeringModel.find({ user: userId });
    if (getAllVolunteering.length == 0) {
      return res.status(404).send("No volunteering added");
    }
    res.status(200).json({ volunteering: getAllVolunteering });
  } catch (error) {
    next(error);
  }
};

export const getOneVolunteering = async (req, res, next) => {
  try {
    const singleVolunteering = await VolunteeringModel.findById(req.params.id);
    res.status(200).json(singleVolunteering);
  } catch (error) {
    next(error);
  }
};

export const updateVolunteering = async (req, res, next) => {
  try {
    const updatedVolunteering = await VolunteeringModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedVolunteering);
  } catch (error) {
    next(error);
  }
};

export const deleteVolunteering = async (req, res, next) => {
  try {
    await VolunteeringModel.findByIdAndDelete(req.params.id);
    res.status(201).send("Volunteering removed");
  } catch (error) {
    next(error);
  }
};
