class Note {
  constructor(title, description, completed = false) {
    this.title = title;
    this.description = description;
    this.created = new Date().toISOString();
    this.updated = new Date().toISOString();
    this.completed = completed;
  }
}

class NoteManager {
  constructor() {
    this.notesKey = 'notes';
    this.loadNotes();
  }

  loadNotes() {
    const notes = localStorage.getItem(this.notesKey);
    this.notes = notes ? JSON.parse(notes) : [];
  }

  saveNotes() {
    localStorage.setItem(this.notesKey, JSON.stringify(this.notes));
  }

  // Добавление записи
  addNote(title, description) {
    const note = new Note(title, description);
    this.notes.push(note);
    this.saveNotes();
    return note;
  }

  // Удаление записи
  deleteNote(index) {
    if (index >= 0 && index < this.notes.length) {
      this.notes.splice(index, 1);
      this.saveNotes();
    } else {
      throw new Error('Записи по такому индексу не существует');
    }
  }

  // Получение записи
  getNote(index) {
    if (index >= 0 && index < this.notes.length) {
      return this.notes[index];
    } else {
        throw new Error('Записи по такому индексу не существует');
    }
  }

  // Получение всех записей
  getAllNotes() {
    return this.notes;
  }

  // Обновление записи
  updateNote(index, updatedFields) {
    if (index >= 0 && index < this.notes.length) {
      const note = this.notes[index];
      Object.assign(note, updatedFields, { updatedAt: new Date().toISOString() });
      this.saveNotes();
      return note;
    } else {
        throw new Error('Записи по такому индексу не существует');
    }
  }

  // Удаление всех записей
  deleteAllNotes() {
      this.notes = [];
      this.saveNotes();
  }
}

// Создание нового списка
const noteManager = new NoteManager();

// Добавление записей
const newNote = noteManager.addNote('Заголовок', 'Описание');
console.log('Добавлена запись:', newNote);

const newNote1 = noteManager.addNote('Заголовок 2', 'Описание 2');
console.log('Добавлена запись:', newNote1);

// Получение всех записей
const allNotes = noteManager.getAllNotes();
console.log('Все записи:', allNotes);

// Получение одной записи
const firstNote = noteManager.getNote(0);
console.log('Первая запись:', firstNote);

// Изменение записи
const updatedNote = noteManager.updateNote(0, { title: 'Обновленный заголовок', description: 'Обновленное описание', completed: true });
console.log('Обновленная запись:', updatedNote);

const allNotes2 = noteManager.getAllNotes();
console.log('Все записи:', allNotes2);

// Удаление записи
noteManager.deleteNote(0);
console.log('Список записей после удаления:', noteManager.getAllNotes());

// Удаление всех записей
noteManager.deleteAllNotes();
console.log('Список после удаления всех записей:', noteManager.getAllNotes());
