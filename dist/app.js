import cors from "cors";
import { config } from "dotenv";
import connectionDB from "./db/connect.js"; // Adjust the path as needed
import morgan from "morgan";
import helmet from "helmet";
import multer from 'multer';
import express from "express";
config({
    path: "./.env",
});
const storage = multer.memoryStorage();
const upload = multer({ storage });
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
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(morgan('dev'));
app.use(helmet());
//Routes..
import vendorRoutes from "./routes/vendor.js";
import venueRoutes from "./routes/venue.js";
import userRoutes from "./routes/user.js";
import notificationRoutes from "./routes/notification.js";
import wishlistRoutes from './routes/wishlist.js';
import adminRoutes from './routes/admin.js';
import blogRoutes from './routes/blog.js';
import realWeddingsRoutes from './routes/realweddings.js';
app.use("/api/v1/vendor", vendorRoutes);
app.use("/api/v1/venue", venueRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/notification", notificationRoutes);
app.use("/api/v1/", wishlistRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/blog", blogRoutes);
app.use("/api/v1/weddingpost", realWeddingsRoutes);
// export const prepareDummyData = async () => {
//   try {
//     // List of different city names
//     const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
//     // List of image URLs for the portfolio
//     const imageUrls = [
//       'https://media.weddingz.in/images/0890ff3aa4b6590f036735cf8ea94c88/girl-in-the-mirror-makeup-hair-by-richa-chugh-makeup-artists-mumbai.jpg ',
//       'https://media.weddingz.in/images/d43a1ea208c595d106b2c593ec0d5fb7/safa-malim-makeup-artists-mumbai.jpg ',
//       'https://media.weddingz.in/images/94917483a109c11d8ae8c22bb04ccdb6/safa-malim-album-mumbai-2.jpg ',
//       'https://media.weddingz.in/images/ff38b7e249851e33e7e440a09b2c7757/safa-malim-album-mumbai.jpg ',
//       'https://media.weddingz.in/images/d23bd384178547ce7c002a1901b2db50/safa-malim-album-mumbai-1.jpg ',
//     ];
//     // Dummy data for 10 vendors
//     const dummyData = Array.from({ length: 50 }, (_, index) => ({
//       name: `Vendor ${index + 1}`,
//       email: `vendor${index + 1}@example.com`,
//       password: 'password123', // You might want to hash passwords in a real scenario
//       phone: '1234567890',
//       address: '123 Main Street',
//       city: cities[index % cities.length], // Assign a different city for each entity
//       state: 'State',
//       businessName: 'Business Name',
//       type_Of_Business: 'Type of Business',
//       packages: {
//         name: 'Package Name',
//         days: '7',
//         price: '$1000',
//         minAdvance: '$200',
//       },
//       portfolio: imageUrls, // Assign the array of image URLs
//       experience: '10 years',
//       event_completed: 100,
//       willingToTravel: true,
//       usp: 'Unique Selling Proposition',
//       summary: "Kokil Kapoor Makeovers is a Bridal Makeup Artist based out of Delhi. Kokil Kapoor Makeovers's telephone number is 76-66-77-88-99, Facebook page is Kokil Kapoor Makeovers and address is Tagore Garden.",
//       bookingPolicy: 'Pay 40% of the package price to book the package, rest to be paid directly to the vendor on the day of the event.',
//       cancellationPolicy: '1. This booking is non-cancellable. However, the booking can be moved to another date at no extra charge.',
//       termAndConditions: "1. Transportation charges: Artist may or may not charge transportation within the city. If the event is outside the city, Travel & Stay charges shall be borne by the client. 2. Services taken over and above of the provided package will be charged additional. 3. Weddingz.in does not accept any responsibility for third-party services or service providers. We guarantee that the Makeup Artist will reach the location on time but we are not responsible for the quality of the deliverables.",
//     }));
//     // Insert the dummy data into the database
//     await Vendor.insertMany(dummyData);
//     console.log('Dummy data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting dummy data:', error);
//   }
// };
//   prepareDummyData();
// const generateVenueData = () => {
//     const venues = [];
//     for (let i = 0; i < 50; i++) {
//       const venue = {
//         yourName: `Owner ${i}`,
//         businessName: `Venue ${i}`,
//         email: `owner${i}@venue.com`,
//         password: "password123",
//         phone: "1234567890",
//         address: `Address ${i}`,
//         city: "City",
//         state: "State",
//         comment: "Some comments",
//         guestCapacity: "500-700",
//         images: [
//           "https://m.weddingz.in/wedz-img/images/6397e155f137ab22d9b3a78402fa7419/bellamonde-hotel-and-resort-chattarpur-delhi.jpg?imwidth=300",
//           "ihttps://m.weddingz.in/wedz-img/images/6397e155f137ab22d9b3a78402fa7419/bellamonde-hotel-and-resort-chattarpur-delhi.jpg?imwidth=300",
//           "https://m.weddingz.in/wedz-img/images/6397e155f137ab22d9b3a78402fa7419/bellamonde-hotel-and-resort-chattarpur-delhi.jpg?imwidth=300",
//         ],
//         description: "This venue is conveniently located near the city center, just off the main highway. Visitors can easily reach the venue by car or public transportation.",
//         about: "Our venue is a modern and spacious facility perfect for weddings, corporate events, and special occasions. With state-of-the-art amenities and flexible event spaces, we can accommodate a wide range of events.",
//         howToReach: "From the city center, take Main Street southbound and turn right onto Venue Road. Our venue is located on the left-hand side, just past the park.",
//         venueExpertNotes: "Our expert event planning team is available to assist you every step of the way, from initial booking to event execution. We'll work closely with you to ensure your event is a memorable success.",
//         featuresOfVenue: "Our venue features include a grand ballroom, outdoor garden terrace, modern audiovisual equipment, complimentary parking, and customizable event packages.",
//         venuePolicies: "We strive to provide a welcoming and inclusive environment for all guests. Outside catering is allowed with prior approval, and we offer flexible cancellation and rescheduling policies. Please inquire for details.",
//         summary: "Located in the heart of the city, our venue offers modern amenities, customizable event packages, and expert event planning services to ensure your special occasion is a success.",
//       };
//       venues.push(venue);
//     }
//     return venues;
//   };
//   const insertVenuesIntoDB = async () => {
//     try {
//       // Generate venue data
//       const venues = generateVenueData();
//       // Insert venues into the database
//       await Venue.insertMany(venues);
//       console.log("Venues inserted successfully!");
//     } catch (error) {
//       console.error("Error inserting venues:", error);
//     }
//   };
//   // Call the function to insert venues into the database
// insertVenuesIntoDB();
