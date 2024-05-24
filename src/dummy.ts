// import { Vendor } from './models/vendor.js'; // Import the Vendor model

//  export const prepareDummyData = async () => {
//   try {
//     // Dummy data for 10 vendors
//     const dummyData = Array.from({ length: 10 }, (_, index) => ({
//       name: `Vendor ${index + 1}`,
//       email: `vendor${index + 1}@example.com`,
//       password: 'password123', // You might want to hash passwords in a real scenario
//       phone: '1234567890',
//       address: '123 Main Street',
//       city: 'City',
//       state: 'State',
//       businessName: 'Business Name',
//       type_Of_Business: 'Type of Business',
//       packages: {
//         name: 'Package Name',
//         days: '7',
//         price: '$1000',
//         minAdvance: '$200',
//       },
//       portfolio: ['Image1.jpg', 'Image2.jpg'],
//       experience: '10 years',
//       event_completed: 100,
//       willingToTravel: true,
//       usp: 'Unique Selling Proposition',
//       summary: 'Summary',
//       bookingPolicy: 'Booking Policy',
//       cancellationPolicy: 'Cancellation Policy',
//       termAndConditions: 'Terms and Conditions',
//     }));

//     // Insert the dummy data into the database
//     await Vendor.insertMany(dummyData);
//     console.log('Dummy data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting dummy data:', error);
//   }
// };

//  // Call the function to prepare the dummy data



import { Vendor } from './models/vendor.js'; // Import the Vendor model

export const prepareDummyData = async () => {
  try {
    // Dummy data for 10 vendors
    const dummyData = Array.from({ length: 10 }, (_, index) => ({
      name: `Vendor ${index + 1}`,
      email: `vendor${index + 1}@example.com`,
      password: 'password123', // You might want to hash passwords in a real scenario
      phone: '1234567890',
      address: '123 Main Street',
      city: 'City',
      state: 'State',
      businessName: 'Business Name',
      type_Of_Business: 'Type of Business',
      packages: {
        name: 'Package Name',
        days: '7',
        price: '$1000',
        minAdvance: '$200',
      },
      portfolio: ['Image1.jpg', 'Image2.jpg'],
      experience: '10 years',
      event_completed: 100,
      willingToTravel: true,
      usp: 'Unique Selling Proposition',
      summary: 'Summary',
      bookingPolicy: 'Booking Policy',
      cancellationPolicy: 'Cancellation Policy',
      termAndConditions: 'Terms and Conditions',
    }));

    // Insert the dummy data into the database
    await Vendor.insertMany(dummyData);
    console.log('Dummy data inserted successfully');
  } catch (error) {
    console.error('Error inserting dummy data:', error);
  }
};
