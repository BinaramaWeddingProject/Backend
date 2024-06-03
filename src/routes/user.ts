import { Router } from "express";
import { Register , Login, ShowAllUsers, GetUserById, DeleteUserById } from "../controllers/user.js";


const router = Router();


//post
router.route("/register").post(Register);
router.route("/login").post(Login);

//get
router.route("/all").get(ShowAllUsers);

// GET - Retrieve a vendor by ID
router.get("/:id", GetUserById);


//delete
router.route("/:id").delete(DeleteUserById);


export default router;