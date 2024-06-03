// // admin.controller.ts
export {};
// import { Request, Response } from 'express';
// import AdminModel from '../models/admin/admin.model.js';
// import Admin from '../models/admin/admin.interface.js';
// // Function to create a new admin
// export const createAdmin = async (req: Request, res: Response) => {
//   try {
//     const newAdmin = new AdminModel(req.body);
//     const savedAdmin = await newAdmin.save();
//     res.status(201).json(savedAdmin);
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Function to get all admins
// export const getAllAdmins = async (req: Request, res: Response) => {
//   try {
//     const admins = await AdminModel.find();
//     res.status(200).json(admins);
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Function to get admin by ID
// export const getAdminById = async (req: Request, res: Response) => {
//   try {
//     const admin = await AdminModel.findById(req.params.id);
//     if (admin) {
//       res.status(200).json(admin);
//     } else {
//       res.status(404).json({ message: 'Admin not found' });
//     }
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Function to update admin by ID
// export const updateAdminById = async (req: Request, res: Response) => {
//   try {
//     const updatedAdmin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (updatedAdmin) {
//       res.status(200).json(updatedAdmin);
//     } else {
//       res.status(404).json({ message: 'Admin not found' });
//     }
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Function to delete admin by ID
// export const deleteAdminById = async (req: Request, res: Response) => {
//   try {
//     const deletedAdmin = await AdminModel.findByIdAndDelete(req.params.id);
//     if (deletedAdmin) {
//       res.status(200).json({ message: 'Admin deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'Admin not found' });
//     }
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Function to update admin profile by admin ID
// export const updateAdminProfileById = async (req: Request, res: Response) => {
//   try {
//     const updatedProfile = await AdminModel.findOneAndUpdate(
//       { _id: req.params.id },
//       { $set: { 'profile': req.body } },
//       { new: true }
//     );
//     if (updatedProfile) {
//       res.status(200).json(updatedProfile);
//     } else {
//       res.status(404).json({ message: 'Admin not found' });
//     }
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Function to update admin venue permissions by admin ID
// export const updateAdminVenuePermissionsById = async (req: Request, res: Response) => {
//   try {
//     const updatedPermissions = await AdminModel.findOneAndUpdate(
//       { _id: req.params.id },
//       { $set: { 'venue': req.body } },
//       { new: true }
//     );
//     if (updatedPermissions) {
//       res.status(200).json(updatedPermissions);
//     } else {
//       res.status(404).json({ message: 'Admin not found' });
//     }
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Similar functions for updating vendor, user, and booking permissions could be added here
