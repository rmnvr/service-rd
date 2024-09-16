import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './room.schema';

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

    async createRoom(name: string): Promise<Room> {
        const newRoom = new this.roomModel({ name });
        return newRoom.save();
    }

    async addParticipant(roomId: string, participant: string): Promise<Room> {
        return this.roomModel.findByIdAndUpdate(
            roomId,
            { $push: { participants: participant } },
            { new: true }
        );
    }

    async getRoomById(id: string): Promise<Room> {
        return this.roomModel.findById(id).exec();
    }

    async drawWinner(roomId: string): Promise<Room> {
        const room = await this.roomModel.findById(roomId).exec();
        if (!room || room.participants.length === 0) {
            throw new Error('No participants available for the draw');
        }
        const randomIndex = Math.floor(Math.random() * room.participants.length);
        room.result = room.participants[randomIndex];
        return room.save();
    }
}
