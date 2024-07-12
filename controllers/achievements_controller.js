import { achievementsModel } from "../models/achievements_model.js";
import { UserModel } from "../models/user_model.js";
import { achievementsSchema } from "../schema/achievement_schema.js";




export const addAchievement = async (req, res, next) => {
    try {
      const { error, value } = achievementsSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      //after, find the user with the id that you passed when creating the achievement
      console.log('userId',req.session.user.id)
  
      const userSessionId = req.session.user.id
  
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
  
      //create achievement with the value
      const achievement = await achievementsModel.create({...value, user:userSessionId});
      //if you find the user, push the achievement id you just created inside
      user.achievement.push(achievement._id);
  
      //and save the user now with the achievementId
      await user.save();
  
      //return the achievement
      res.status(201).json({ achievement });
    } catch (error) {
      next(error);
    }
  };
  
  export const getAllUserAchievements = async (req, res, next) => {
    try {
      //we are fetching achievements that belongs to a particular user
      const userId = req.params.id;
      const allachievements = await achievementsModel.find({ user: userId });
      if (allachievements.length == 0) {
        return res.status(404).send("No achievements added");
      }
      res.status(200).json({ achievement: allachievements });
    } catch (error) {
      next(error)
    }
  };
  
  export const updateOneAchievement = async (req, res, next) => {
  
      try {
          const allachievements = await achievementsModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
              return res.status(200).json(allachievements)
      } catch (error) {
          next(error)
      }
  }
  
  export const deleteAchievement = async (req, res, next)=>{
      try {
          const deletedAchievement = await achievementsModel.findByIdAndDelete(req.params.id)
          res.status(201).send('Achievement deleted successfully')
      } catch (error) {
         next(error) 
      }
  }
      