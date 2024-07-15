import { UserProfileModel } from "../models/userProfile_model.js";
import { UserModel } from "../models/user_model.js";
import { userProfileSchema } from "../schema/user_profile_validation.js";

export const postUserProfile = async (req, res, next) => {
  try {
    const { error, value } = userProfileSchema.validate({
      ...req.body,
      profilePicture: req.files.profilePicture[0].filename,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newProfile = await UserProfileModel.create({
      ...value,
      user: userSessionId,
    });

    user.userProfile = newProfile.id;

    await user.save();

    res.status(201).json({ newProfile });
  } catch (error) {
    next(error);
  }
};

export const getAllUserProfile = async (req, res, next) => {
  try {
    const userSessionId = req.session.user.id;
    const allUserProfile = await UserProfileModel.find({ user: userSessionId });
    if (allUserProfile.length == 0) {
      return res.status(404).send("No User Profile added");
    }
    res.status(200).json({ userProfile: allUserProfile });
  } catch (error) {
    next(error);
  }
};

export const patchUserProfile = async (req, res, next) => {
  try {
    const { error, value } = userProfileSchema.validate({
      ...req.body,
      profilePicture: req.files.profilePicture[0].filename,
    });
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const editUserProfile = await UserProfileModel.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );
    if (!editUserProfile) {
      return res.status(404).send("Profile not found");
    }

    res.status(201).json({ editUserProfile });
  } catch (error) {
    next(error);
  }
};

export const deleteUserProfile = async (req, res, next) => {
  try {
    const userSessionId = req.session.user.id;
    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const deleteUserProfile = await UserProfileModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteUserProfile) {
      return res.status(404).send("Education not found");
    }

    user.userProfile.pull(req.params.id);
    await user.save();
    res.status(200).send(`User Profile with id ${req.params.id} Deleted`);
  } catch (error) {
    next(error);
  }
};
