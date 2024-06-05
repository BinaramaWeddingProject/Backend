import { Router } from "express";
import { Register, Login, ShowAllUsers, GetUserById, DeleteUserById, UpdateUser } from "../controllers/user.js";
const router = Router();
//post
router.route("/register").post(Register);
router.route("/login").post(Login);
//get
router.route("/all").get(ShowAllUsers);
//put
router.route("/:id").put(UpdateUser);
// GET - Retrieve a user by ID
router.get("/:id", GetUserById);
//delete
router.route("/:id").delete(DeleteUserById);
export default router;
