
import { AchievementsModel } from "../models/achievements_model.js";
import { UserModel } from "../models/user_model.js";
import { achievementsSchema } from "../schema/achievement_schema.js";



export const createUserAchievement = async (req, res, next) => {
  try {
    const { error, value } = achievementsSchema.validate(req.body)
      // {  
      // ...req.body,
      // image: req.files.image[0].filename,});

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const userSessionId = req.session.user.id;

    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const achievement = await AchievementsModel.create({ ...value, user: userSessionId });

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
    const userSessionId = req.session.user.id
    const allAchievement = await AchievementsModel.find({ user: userSessionId });
    if (allAchievement.length == 0) {
      return res.status(404).send("No Achievement added");
    }
    res.status(200).json({ Achievements: allAchievement });
  } catch (error) {
   next(error)
  }
};



export const updateUserAchievement = async (req, res, next) => {
    try {
      const { error, value } = achievementsSchema.validate(req.body)
        // {  
        // ...req.body,
        // award: req.files.award[0].filename,
        // image: req.files.image[0].filename,});


      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      const userSessionId = req.session.user.id; 
      const user = await UserModel.findById(userSessionId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const achievement = await AchievementsModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!achievement) {
            return res.status(404).send("Achievement not found");
        }

      res.status(200).json({ achievement });
    } catch (error) {
      next(error)
    }
  };


  export const deleteUserAchievement = async (req, res) => {
    try {


      const userSessionId = req.session.user.id; 
      const user = await UserModel.findById(userSessionId);
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




//Function to post a new achievement
export const addAchievement = async (req, res, next)=> {
    try {
        const {error, value} = achievementsSchema.validate(req.body)
    if (error){
        return res.status(400).send(error.details[0].message)
    }
    console.log('value', value)
       const newAchievement = await achievementsModel.create(value) 
       res.status(201).send(newAchievement)
    } catch (error) {
        next (error)
    }
}

//Function to update an achievement
export const updateAchievement = async (req, res, next) =>{
    try {
        const {error, value} = achievementsSchema.validate(value)
        if (error){
            return res.status(400).send(error.details[0].message)
        }
        console.log('value', value)
        const patchAchievement = await achievementsModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).send(patchAchievement)
    } catch (error) { 
        next(error)
    
}}

//Function to delete an achievement
export const deleteAchievement = async (req, res, next) =>{
    try {
        const deletedAchievement = await achievementsModel.findByIdAndDelete(req.params.id)
        res.status(200).send("Achievement deleted successfully")
   } catch (error) {
        
    }
}

//Function to get all achievements
export const allAchievements = async (req, res, next) => {
try {
    const achievements = await achievementsModel.find()
    if(allAchievements.length===0){
        return res.status(404).send('No achievements added')
    }
    // res.status(200).json({achievement: allAchievements})
    res.status(200).json(allAchievements)
} catch (error) {
    next(error)
}
}

