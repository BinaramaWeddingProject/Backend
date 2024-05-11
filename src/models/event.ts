import mongoose from "mongoose";

// Define the structure of the event
 export interface IEvent extends Document {
    address: string;
    cityOfResidence: string;
    state: string;
    cityOfEvent: string;
    eventType: "Wedding" | "Corporate" | "Social" | "Other";
    best_Way_To_Reach_Me?: "Call" | "SMS" | "Whatsapp" | "E-mail";
    events: {
      event_Date: Date;
      number_Of_Guests: number;
      locality_Preference?: string;
      liquor_To_Be_Served?: boolean;
      food_Preference?: boolean;
      slot: "Morning" | "Evening" | "Full Day";
    }[];
    servicesNeeded: {
      service: string;
      budget: number;
    }[];
    room_Needed: {
      number_Of_Rooms: number;
      number_Of_Nights: number;
    };
    notes?: string;
    total_Budget?: number;
  }


const EventSchema = new mongoose.Schema<IEvent>(
  {
    address: {
      type: String,
      required: [true, "Please provide address"],
    },
    cityOfResidence: {
      type: String,
      required: [true, "Please provide your city"],
    },
    state: {
      type: String,
      required: [true, "Please provide your State"],
    },
    cityOfEvent: {
      type: String,
      required: [true, "Please provide your city"],
    },
    eventType: {
      type: String,
      enum: ["Wedding", "Corporate", "Social", "Other"],
    },
    best_Way_To_Reach_Me: {
      type: String,
      enum: ["Call", "SMS", "Whatsapp", "E-mail"],
    },
    events: {
      type: [{
        event_Date: {
          type: Date,
        },
        number_Of_Guests: {
          type: Number,
        },
        locality_Preference: {
          type: String,
        },
        liquor_To_Be_Served: {
          type: Boolean,
        },
        food_Preference: {
          type: Boolean,
        },
        slot: {
          type: String,
          enum: ["Morning", "Evening", "Full Day"],
        },
      }],
    },
    servicesNeeded: {
      type: [{
        service: String,
        budget: Number, // Adding budget field for each service
      }],
    },
    room_Needed: {
      number_Of_Rooms: {
        type: Number,
      },
      number_Of_Nights: {
        type: Number,
      },
    },
    notes: {
      type: String,
    },
    total_Budget:{
        type: Number,
    }
  },
  { timestamps: true }
);


export const Event = mongoose.model<IEvent>("Event", EventSchema);


