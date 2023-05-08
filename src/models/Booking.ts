import { Types, Schema, model, SchemaTypes, Document, PopulatedDoc } from 'mongoose';
import { RoomDocument } from './Room-type';

export enum Status {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  STAY = 'STAY',
  DECLINE = 'DECLINE',
  CANCEL = 'CANCEL',
}

export interface KeyRoomBooking {
  roomTypeId: PopulatedDoc<Document<Types.ObjectId> & RoomDocument>;
  quantity: number;
}

export interface IBooking {
  total?: number;
  status?: Status;
  rooms: KeyRoomBooking[];
  userId: Types.ObjectId;
  hotelId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  duration: number;
}

export interface BookingDocument extends IBooking, Document {
  createdAt: Date;
  updatedAt: Date;
}

// cần thêm startDate, endDate
const bookingSchema = new Schema<IBooking>(
  {
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: Status.PENDING,
      enum: Object.values(Status),
      required: true,
    },
    rooms: {
      type: [
        {
          roomTypeId: {
            type: SchemaTypes.ObjectId,
            required: true,
            ref: 'roomTypes',
          },
          quantity: {
            type: Number,
            min: 1,
            required: true,
          },
        },
      ],
      _id: false,
      required: true,
      min: 1,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: {
      type: Number,
      required: true,
    },
    userId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'users',
    },
    hotelId: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'hotels',
    },
  },
  { timestamps: true, collection: 'booking' },
);

const Booking = model<IBooking>('booking', bookingSchema);
export default Booking;
