import { OrderRoom } from "../OrdersModule/order.model";
import { TProductRoom } from "./product.interfce";
import { Room } from "./product.model";

const addRoomToDB = async(roomData : TProductRoom) => {
    const result = await Room.create(roomData);
    return result;
}
const searchAvailableRoomFromDB = async(startDate : string, endDate : string) => {
    const bookedRoomIds = await OrderRoom.distinct('roomId', {
        $or: [
          { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
          { startDate: { $gte: startDate, $lte: endDate } },
        ],
      });
    //   console.log(startDate, endDate);
  console.log("bookingID",bookedRoomIds)
    const availableRooms = await Room.find({ roomId: { $nin: bookedRoomIds } });
    // console.log(availableRooms)
    return availableRooms;
}
const getAllRoomFromDB = async() => {
    const result = await Room.find();
    return result;
}

const getSingleRoomFromDB = async(id: Number) => {
    const result = await Room.find({roomId: id});
    return result;
}

const deleteRoomFromDB = async(id: Number) => {
    const result = await Room.deleteOne({roomId: id});
    return result;
}
export const ProductServices = {
    addRoomToDB,
    getAllRoomFromDB,
    getSingleRoomFromDB,
    deleteRoomFromDB,
    searchAvailableRoomFromDB
}