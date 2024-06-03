// // admin.model.ts
export {};
// import { Schema, model } from 'mongoose';
// import Admin from './admin.interface.js';
// const profileSchema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   contact: { type: String, required: true },
//   address: { type: String, required: true },
// });
// const adminSchema = new Schema<Admin>({
//   profile: { type: profileSchema, required: true },
//   venue: {
//     approve: { type: Boolean, default: false },
//     view: { type: Boolean, default: false },
//     delete: { type: Boolean, default: false },
//   },
//   vendor: {
//     approve: { type: Boolean, default: false },
//     view: { type: Boolean, default: false },
//     delete: { type: Boolean, default: false },
//   },
//   user: {
//     view: { type: Boolean, default: false },
//     reschedule: {
//       vendor: { type: Boolean, default: false },
//       venue: { type: Boolean, default: false },
//       user: { type: Boolean, default: false },
//     },
//     delete: { type: Boolean, default: false },
//   },
//   booking: {
//     view: { type: Boolean, default: false },
//     cancel: { type: Boolean, default: false },
//   },
// });
// const AdminModel = model<Admin>('Admin', adminSchema);
// export default AdminModel;
