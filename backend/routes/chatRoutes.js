const express = require("express");
const {
    accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// protect middleware is used to protect the route 
// if the user is not logged in, they will not be able to access the route
router.route("/").post(protect, accessChat); // create a new chat
router.route("/").get(protect, fetchChats); // get all chats
router.route("/group").post(protect, createGroupChat); // create a new group chat
router.route("/rename").put(protect, renameGroup); // rename a group chat
router.route("/groupremove").put(protect, removeFromGroup); // remove a user from a group chat
router.route("/groupadd").put(protect, addToGroup); // add a new user to a group chat

module.exports = router;