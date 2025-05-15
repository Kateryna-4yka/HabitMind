import { model, Schema } from 'mongoose';


const habitsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    dayNumber: {
      type: Number,
      required: true,
    },
    onDuty: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);


export const habitsCollection = model('habits', habitsSchema);
