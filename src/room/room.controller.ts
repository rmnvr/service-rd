import { Controller, Post, Param, Body, Get, Req } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Post()
    async createRoom(@Body('name') name: string) {
        return this.roomService.createRoom(name);
    }

    @Post(':id/participant')
    async addParticipant(@Param('id') roomId: string, @Body('name') participant: string) {
        return this.roomService.addParticipant(roomId, participant);
    }

    @Get(':id')
    async getRoom(@Param('id') id: string) {
        return this.roomService.getRoomById(id);
    }

    @Post(':id/draw')
    async drawWinner(@Param('id') id: string) {
        return this.roomService.drawWinner(id);
    }
}
