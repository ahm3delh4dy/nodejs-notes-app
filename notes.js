const chalk = require('chalk');
const fs = require('fs');
const { hasSameNote, hasNotes } = require('./utils.js');

const loadNotes = () => {
  try {
    const data = fs.readFileSync('notes.json', { encoding: 'utf-8' });
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveNotes = (notes) =>
  fs.writeFileSync('notes.json', JSON.stringify(notes));

const addNote = (title, body) => {
  const notes = loadNotes();
  if (hasSameNote(notes, title)) {
    console.log(chalk.red.inverse('Note title is already taken!'));
    return;
  }
  notes.push({
    title,
    body,
  });
  saveNotes(notes);
  console.log(chalk.green.inverse('New note is added!'));
};

const removeNote = (title) => {
  const notes = loadNotes();
  // check if there's no note with the title given
  if (!hasSameNote(notes, title)) {
    console.log(chalk.red.inverse.bold('No note has found!'));
    return;
  }
  saveNotes(notes.filter((note) => note.title !== title));
  console.log(chalk.green.inverse.bold('Note is removed!'));
};

const listNotes = () => {
  const notes = loadNotes();
  if (!hasNotes(notes)) {
    console.log(chalk.red.inverse.bold(`There's no available notes to list!`));
    return;
  }
  console.log(chalk.blue.bold('Your Notes:'));
  notes.forEach((note) => {
    console.log(`- ${note.title}`);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  if (!hasNotes(notes)) {
    console.log(chalk.red.inverse.bold(`There's no available notes to read!`));
    return;
  }
  const foundNote = notes.find((note) => note.title === title);
  if (foundNote) console.log(chalk.green.bold(`${foundNote.title}`));
  else console.log(chalk.green.bold('No note is found to read!'));
};

module.exports = { addNote, removeNote, listNotes, readNote };
