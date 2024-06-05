
import { Router } from "express";

import { getAllVendors } from '../controllers/admin.js';


const router = Router();

import * as adminController from '../controllers/admin.js';


// // Route to create a new admin
// router.post('/admin', adminController.createAdmin);

// // Route to get all admins
// router.get('/admin', adminController.getAllAdmins);

// // Route to get admin by ID
// router.get('/admin/:id', adminController.getAdminById);

// // Route to update admin by ID
// router.put('/admin/:id', adminController.updateAdminById);

// // Route to delete admin by ID
// router.delete('/admin/:id', adminController.deleteAdminById);

// // Route to update admin profile by admin ID
// router.put('/admin/:id/profile', adminController.updateAdminProfileById);

// // Route to update admin venue permissions by admin ID
// router.put('/admin/:id/venue', adminController.updateAdminVenuePermissionsById);

// // Route to get all vendors
// router.get('/admin/allvendors' , adminController.getAllVendors);



// //Route to get all venues
// router.route('/admin/allvenues').put(adminController.getAllVenues);

// //Route to delete venue
// router.route('/admin/deletevenue').delete(adminController.deleteVenueById);

// //Route to get all users
// router.route('/admin/allusers').get(adminController.getAllUsers);

// //Route to delete user
// router.route('/admin/deleteuser').delete(adminController.deleteUserById);

//get all vendors..
router.route("/allvendor").get( getAllVendors)

//Route to delete vendor
router.route('/:id').delete(adminController.deleteVendorById);


export default router;
