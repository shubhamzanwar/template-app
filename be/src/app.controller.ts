import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Note } from './app.types';

@Controller('/notes')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getNotes(): Note[] {
    return this.appService.getNotes();
  }

  @Get('/:id')
  getNoteById(@Param('id') id: string): Note {
    const note = this.appService.getNoteById(id);
    if(!note) {
      throw new NotFoundException()
    }

    return note;
  }

  @Post()
  createNote(@Body() note: Pick<Note, 'text'>): Note {
    return this.appService.createNote(note.text);
  }

  @Patch('/:id')
  toggleComplete(@Param('id') id: string): Note {
    const note = this.appService.toggleNoteComplete(id);
    if (!note) { throw new NotFoundException() }

    return note;
  }

  @Delete('/:id')
  deleteNote(@Param('id') id: string): Note {
    const note = this.appService.deleteNote(id);
    if (!note) { throw new NotFoundException() }

    return note;
  }
}
