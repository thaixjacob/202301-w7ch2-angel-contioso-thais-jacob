import mongoose, { Schema } from 'mongoose';

export interface Car {
  id: string;
  brand: string;
  model: number;
  fabricationYear: string;
  color: string;
  cylinderCapacity: number;
}

const carSchema = new Schema<Car>({
  id: String,
  brand: String,
  model: Number,
  fabricationYear: Date,
  color: String,
  cylinderCapacity: Number,
});

export const CarModel = mongoose.model<Car>('Car', carSchema, 'car');
