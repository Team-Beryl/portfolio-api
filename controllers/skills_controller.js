import { SkillsModel } from "../models/skills_model.js";
import { UserModel } from "../models/user_model.js";
import { skillsSchema } from "../schema/skills_schema.js";


export const createUserSkill = async (req, res, next) => {
  try {
    const { error, value } = skillsSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const id = req.session?.user?.id || req?.user?.id;

    const user = await UserModel.findById(id).populate('skills');
    if (!user) {
      return res.status(404).send("User not found");
    }

    const skillNameLowerCase = value.name.toLowerCase();
    const skillExists = user.skills.find(skill => skill.name.toLowerCase() === skillNameLowerCase);

    if (skillExists) {
      return res.status(409).send("Skill already exists");
    }

    const skill = await SkillsModel.create({ ...value, user: id });

    user.skills.push(skill._id);
    await user.save();

    res.status(201).json('Skill added successfully');
  } catch (error) {
    next(error);
    res.status(500).send("Internal server error");
  }
};




export const getAllUserSkills = async (req, res) => {
  try {
    //we are fetching Skill that belongs to a particular user
    const id = req.session?.user?.id || req?.user?.id;
    const allSkill = await SkillsModel.find({ user: id });
    if (allSkill.length == 0) {
      return res.status(404).json({ Skills: allSkill });
    }
    res.status(200).json({ Skills: allSkill });
  } catch (error) {
    return res.status(500).json({error})
  }
};



export const updateUserSkill = async (req, res) => {
    try {
      const { error, value } = skillsSchema.validate(req.body);


      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      const id = req.session?.user?.id || req?.user?.id;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const skill = await SkillsModel.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!skill) {
            return res.status(404).json('Skill updated successfully');
        }

      res.status(200).json({ skill });
    } catch (error) {
      return res.status(500).json({error})
    }
  };


  export const deleteUserSkill = async (req, res) => {
    try {


      const id = req.session?.user?.id || req?.user?.id;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const skill = await SkillsModel.findByIdAndDelete(req.params.id);
        if (!skill) {
            return res.status(404).send("Skill not found");
        }

        user.skills.pull(req.params.id);
        await user.save();
      res.status(200).json("Skill deleted");
    } catch (error) {
      return res.status(500).json({error})
    }
  };
    

  export const getUserSkill = async (req, res, next)=>{
    try {
      const aSkill = await SkillsModel.findById(req.params.id)
      res.status(200).send(aSkill)
    } catch (error) {
      next(error)
    }
  }