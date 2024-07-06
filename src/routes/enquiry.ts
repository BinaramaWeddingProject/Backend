import { Router } from "express";
import {submitEnquiryForm} from "../controllers/enquiry.js"


const router = Router();

router.route("/submit").post(submitEnquiryForm);



export default router