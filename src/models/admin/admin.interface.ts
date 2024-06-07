// admin.interface.ts

import { Document } from 'mongoose';
import { IProfile } from './admin.model.js';

interface Admin extends Document {
  profile: IProfile;
  venue: {
    approve: boolean;
    view: boolean;
    delete: boolean;
  };
  vendor: {
    approve: boolean;
    view: boolean;
    delete: boolean;
  };
  user: {
    view: boolean;
    reschedule: {
      vendor: boolean;
      venue: boolean;
      user: boolean;
    };
    delete: boolean;
  };
  booking: {
    view: boolean;
    cancel: boolean;
  };

  isPasswordCorrect(password: string | Buffer): Promise<boolean>;
  generateAccessToken(): string;
}

export default Admin;
