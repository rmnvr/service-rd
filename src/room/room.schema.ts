import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
    @Prop({ required: true })
    name: string;

    @Prop({ default: [] })
    participants: string[];

    @Prop({ default: null })
    result: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
