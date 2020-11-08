import { Injectable } from '@nestjs/common';
import {v4 as uuid} from 'uuid';
import { Note } from './app.types';

const state: Note[] = [];

@Injectable()
export class AppService {
  getNotes(): Note[] {
    return state;
  }

  getNoteById(id): Note | null {
    const note = state.find((item) => item.id === id);
    return note || null;
  }

  createNote(text): Note {
    const note: Note = {
      id: uuid(),
      text,
      complete: false
    }

    state.push(note);

    return note;
  }

  toggleNoteComplete(id: string) {
    const noteIdx = state.findIndex((item) => item.id === id);
    if(!noteIdx) return null;

    const note = state[noteIdx];
    state.splice(noteIdx, 1, {
      ...note,
      complete: !note.complete,
    });

    return {
      ...note,
      complete: !note.complete,
    }
  }

  deleteNote(id: string): Note {
    const noteIdx = state.findIndex((item) => item.id === id);
    if(!noteIdx) return null;

    const note = state.splice(noteIdx, 1)[0];
    return note;
  }
}
