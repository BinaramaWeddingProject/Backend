import multer from "multer";

import { Request } from "express"; // Import the Request type from express

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: function (
    req: Request, // Explicitly type the req parameter
    file: Express.Multer.File, // Explicitly type the file parameter
    cb: DestinationCallback // Explicitly type the callback parameter
  ) {
    cb(null, "./public/temp");
  },
  filename: function (
    req: Request, // Explicitly type the req parameter
    file: Express.Multer.File, // Explicitly type the file parameter
    cb: FileNameCallback // Explicitly type the callback parameter
  ) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});