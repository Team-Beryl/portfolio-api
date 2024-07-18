import { VolunteeringModel } from "../models/volunteering_model.js";
import { UserModel } from "../models/user_model.js";
import { volunteringSchema } from "../schema/volunteering_schema.js";

export const postVolunteering = async (req, res, next) => {
  try {
    const { error, value } = volunteringSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Find user with the id you passed when creating volunteering
    const id = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newVolunteering = await VolunteeringModel.create({
      ...value,
      user: id,
    });

    user.volunteering.push(newVolunteering.id);

    await user.save();

    res.status(201).json('Volunteering added successfully');
  } catch (error) {
    next(error);
  }
};

export const getAllUserVolunteering = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;;

    const getAllVolunteering = await VolunteeringModel.find({
      user: id,
    });
    if (getAllVolunteering.length == 0) {
      return res.status(404).json({ volunteering: getAllVolunteering });
    }
    res.status(200).json({ volunteering: getAllVolunteering });
  } catch (error) {
    next(error);
  }
};

export const updateVolunteering = async (req, res, next) => {
  try {
    const { error, value } = volunteringSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const id = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedVolunteering = await VolunteeringModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedVolunteering) {
      return res.status(404).json({Volunteering: updatedVolunteering });
    }
    res.status(201).json('Volunteering updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteVolunteering = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const deletedVolunteering = await VolunteeringModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedVolunteering) {
      return res.status(404).send("Volunteering not found");
    }

    user.volunteering.pull(req.params.id);
    await user.save();
    res.status(200).send("Volunteering deleted");
  } catch (error) {
    next(error);
  }
};

export const getUserVolunteering = async (req, res, next)=>{
  try {
    const oneVolunteering = await VolunteeringModel.findById(req.params.id)
    res.status(200).send(oneVolunteering)
  } catch (error) {
    next(error)
  }
}
