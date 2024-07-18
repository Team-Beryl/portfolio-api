
import { AchievementsModel } from "../models/achievements_model.js";
import { UserModel } from "../models/user_model.js";
import { achievementsSchema } from "../schema/achievement_schema.js";



export const createUserAchievement = async (req, res, next) => {
  try {
    const { error, value } = achievementsSchema.validate({ ...req.body,
      image: req?.file?.filename})
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const id = req.session?.user?.id || req?.user?.id;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const achievement = await AchievementsModel.create({ ...value, user: id });

    user.achievements.push(achievement._id)

    await user.save();

    res.status(201).json({ achievement });
  } catch (error) {
    next(error);
  }
};



export const getAllUserAchievements = async (req, res, next) => {
  try {
    //we are fetching Achievement that belongs to a particular user
    const id = req.session?.user?.id || req?.user?.id;
    const allAchievement = await AchievementsModel.find({ user: id });
    if (allAchievement.length == 0) {
      return res.status(404).json({ Achievements: allAchievement });
    }
    res.status(200).json({ Achievements: allAchievement });
  } catch (error) {
   next(error)
  }
};



export const updateUserAchievement = async (req, res, next) => {
    try {
      const { error, value } = achievementsSchema.validate({  
        ...req.body,
        image: req?.file?.filename})
       
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      const id = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const achievement = await AchievementsModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!achievement) {
            return res.status(404).json({ Achievements: achievement });
        }

      res.status(200).json({ achievement });
    } catch (error) {
      next(error)
    }
  };


  export const deleteUserAchievement = async (req, res) => {
    try {


      const id = req.session?.user?.id || req?.user?.id; 
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const achievement = await AchievementsModel.findByIdAndDelete(req.params.id);
        if (!achievement) {
            return res.status(404).send("Achievement not found");
        }

        user.achievements.pull(req.params.id);
        await user.save();

      res.status(200).json("Achievement deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };

  export const getUserAchievement = async (req, res, next) =>{
    try {
     const anAchievement = await AchievementsModel.findById(req.params.id) 
     res.status(200).send(anAchievement)
    } catch (error) {
      next(error)
    }
  }







