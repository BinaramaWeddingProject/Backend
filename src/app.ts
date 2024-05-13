import express from "express";

import cors from "cors"
import { config } from "dotenv";
import connectionDB from "./db/connect.js"; // Adjust the path as needed
 

config({
    path: "./.env",
  });

  
  
const app = express();
const port = process.env.PORT || 4000; 

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));



// Call the connectionDB function to establish MongoDB connection
connectionDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`The server is listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Failed to establish MongoDB connection:", error);
        process.exit(1);
    });



//Express Middlewares....
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true , limit:"16kb"}))
app.use(express.static("public"))



//Routes..
import vendorRoutes from "./routes/vendor.js"

app.use("/api/v1/vendor", vendorRoutes);



