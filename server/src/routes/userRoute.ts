import {
  deleteUser,
  explore,
  getAllUsers,
  getAllUsersByName,
  getUserFriends,
  getUserFriendsId,
  removeFriend,
  removeProfilePicture,
  updatePassword,
  updateProfileData,
} from "../controllers/userController";

import express from "express";

const router = express.Router();

router.get("/", getAllUsers); //for getting all user
router.get("/explore", explore); //for getting all user

router.get("/search", getAllUsersByName); //search user by name

router.get("/friend", getUserFriends); //for getting user friend by id (use param)

router.get("/friendId", getUserFriendsId); //for getting user friend Ids by id (use param )

//put
router.put("/update-profile-data", updateProfileData); //update user
router.put("/update-password", updatePassword); //update password

//delete
router.delete("/", deleteUser); //delete user
router.delete("/unfriend", removeFriend); // remove friends
router.delete("/profile-pic", removeProfilePicture); // remove profile picture

//password reset //post
//confirm password reset //post
//email verification //get or post

export default router;
