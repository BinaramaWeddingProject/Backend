"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var connect_js_1 = require("./db/connect.js"); // Adjust the path as needed
var morgan_1 = require("morgan");
var helmet_1 = require("helmet");
var multer_1 = require("multer");
var express_1 = require("express");
(0, dotenv_1.config)({
    path: "./.env",
});
var storage = multer_1.default.memoryStorage();
var upload = (0, multer_1.default)({ storage: storage });
var app = (0, express_1.default)();
var port = process.env.PORT || 8000;
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
// Call the connectionDB function to establish MongoDB connection
(0, connect_js_1.default)()
    .then(function () {
    app.listen(port, function () {
        console.log("The server is listening on port ".concat(port));
    });
})
    .catch(function (error) {
    console.error("Failed to establish MongoDB connection:", error);
    process.exit(1);
});
//Express Middlewares....
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.static("public"));
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
//Routes..
var vendor_js_1 = require("./routes/vendor.js");
var venue_js_1 = require("./routes/venue.js");
var user_js_1 = require("./routes/user.js");
var notification_js_1 = require("./routes/notification.js");
// import wishlistRoutes from './routes/wishlist.js';
var wishlist_js_1 = require("./routes/wishlist.js");
var admin_js_1 = require("./routes/admin.js");
var blog_js_1 = require("./routes/blog.js");
var enquiry_js_1 = require("./routes/enquiry.js");
// import { addDemoVenues } from "./dummy.js";
var realweddings_js_1 = require("./routes/realweddings.js");
var booking_js_1 = require("./routes/booking.js");
app.use("/api/v1/vendor", vendor_js_1.default);
app.use("/api/v1/venue", venue_js_1.default);
app.use("/api/v1/user", user_js_1.default);
app.use("/api/v1/notification", notification_js_1.default);
app.use("/api/v1/", wishlist_js_1.default);
app.use("/api/v1/admin", admin_js_1.default);
app.use("/api/v1/enquiry", enquiry_js_1.default);
app.use("/api/v1/blog", blog_js_1.default);
app.use("/api/v1/weddingpost", realweddings_js_1.default);
app.use("/api/v1/bookings", booking_js_1.default);
// addDemoVenues();
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
