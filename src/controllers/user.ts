// import { NextFunction, Request, Response } from "express";
// import { asyncHandler } from "../utils/asynHandler.js";
// import { NewUserRequestBody , ControllerType } from "../types/types.js";
// import { ApiError } from "../utils/apiError.js";
// import { ApiResponse } from "../utils/apiResponse.js";
// import { User } from "../models/user.js";










// //Register vendor 
// export const Register = asyncHandler(async(
//     req: Request<{}, {}, NewUserRequestBody>,
//     res:Response,
//     next: NextFunction) =>{

//         const {name , email , password , phone , city  } = req.body;
//        // console.log(name , email , password , phone , city , type_Of_Business , businessName)
//         const user = await User.create({
//             name ,
//             email ,
//             password ,
//             phone ,
//             city ,
          
            
//         });
//         22

//         if(!user){
//         throw new ApiError(500, "something went wrong while registering the user!!")   
//         }

//         return res.status(201).json(
//             new ApiResponse(200 ,  { user} , "user regiested successfully" )
//         )

// })

