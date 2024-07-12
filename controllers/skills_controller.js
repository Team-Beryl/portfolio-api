import { SkillsModel } from "../models/skills_model.js";
import { UserModel } from "../models/user_model.js";
import { skillsSchema } from "../schema/skills_schema.js";


export const addSkill = async (req, res, next) => {
  try {
    const { error, value } = skillsSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //after, find the user with the id that you passed when creating the skill
    console.log('userId',req.session.user.id)

    const userSessionId = req.session.user.id

    const user = await UserModel.findById(userSessionId);
    if (!user) {
      return res.status(404).send("User not found");
    }


    //create skills with the value
    const skills = await SkillsModel.create({...value, user:userSessionId});
    //if you find the user, push the skill id you just created inside
    user.skills.push(skills._id);

    //and save the user now with the skillsId
    await user.save();

    //return the skills
    res.status(201).json({ skills });
  } catch (error) {
    next(error);
  }
};

export const getAllUserSkills = async (req, res, next) => {
  try {
    //we are fetching skills that belongs to a particular user
    const userId = req.params.id;
    const allskills = await SkillsModel.find({ user: userId });
    if (allskills.length == 0) {
      return res.status(404).send("No skills added");
    }
    res.status(200).json({ skills: allskills });
  } catch (error) {
    next(error)
  }
};

export const updateOneSkill = async (req, res, next) => {

    try {
        const allskills = await SkillsModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
            return res.status(200).json(allskills)
    } catch (error) {
        next(error)
    }
}

export const deleteSkill = async (req, res, next)=>{
    try {
        const deletedSkill = await SkillsModel.findByIdAndDelete(req.params.id)
        res.status(201).send('Skill deleted successfully')
    } catch (error) {
       next(error) 
    }
}
    