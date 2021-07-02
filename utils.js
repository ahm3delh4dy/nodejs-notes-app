const hasSameNote = (notes, title) => {
  /*
    I used find instead of filter to stop when you find a match
    and not looking for all the items in case of filter method.
  */
  const duplicatedNote = notes.find((note) => note.title === title);
  if (duplicatedNote) return true;
  return false;
};

const hasNotes = (notes) => {
  return notes.length ? true : false;
};

module.exports = { hasNotes, hasSameNote };
