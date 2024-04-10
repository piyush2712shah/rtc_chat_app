import User from "../models/user.model.js";

export const getUsersForSidebar=async (req,res)=>{
    try {
        
        const loggedInUserId=req.user._id;

        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")//ne is not equal coz we dont want the one that is logged in at the moment

        res.status(200).json(filteredUsers);


    } catch (error) {
        console.log("error in get users for sidebar inside user controller ",error.message)
        res.status(500).json({
            error:"Internal Server error"
        })
    }
}