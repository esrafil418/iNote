// Get references to DOM elements
const form = document.querySelector("#form");
const noteInput = document.querySelector("#note-input");
const userNotes = document.querySelector("#user-notes");

// ----------------------------
// Render a single note on the DOM
function renderNote(note) {
  const noteEl = document.createElement("div"); // Create a div for the note
  noteEl.classList.add("note-item"); // Add a class for styling

  // Insert note text and remove button with data-id
  noteEl.innerHTML = `
    <p>${note.text}</p>
    <button class="remove-btn" data-id="${note.id}">X</button>
  `;

  // Append the note element to the container
  userNotes.appendChild(noteEl);
}

// ----------------------------
// Save a note to localStorage
function saveNoteToLocalStorage(note) {
  let notes = JSON.parse(localStorage.getItem("notes")) || []; // Get existing notes
  notes.push(note); // Add new note object
  localStorage.setItem("notes", JSON.stringify(notes)); // Save back to localStorage
}

// ----------------------------
// Remove a note from localStorage
function removeNoteFromLocalStorage(id) {
  let notes = JSON.parse(localStorage.getItem("notes")) || []; // Get existing notes
  notes = notes.filter((note) => note.id != id); // Remove note by ID
  localStorage.setItem("notes", JSON.stringify(notes)); // Save updated array
}

// ----------------------------
// Add a new note from the form
function addNote(e) {
  e.preventDefault(); // Prevent form from submitting

  const text = noteInput.value.trim(); // Get text input
  if (!text) return; // Do nothing if input is empty

  // Create a note object
  const note = {
    id: Date.now(), // Unique ID
    text: text, // Note text
    createdAt: new Date().toLocaleString(), // Optional: timestamp
  };

  renderNote(note); // Show the note on the page
  saveNoteToLocalStorage(note); // Save the note to localStorage

  form.reset(); // Clear the form
}

// ----------------------------
// Load all notes from localStorage when page loads
function loadNotesFromLocalStorage() {
  let notes = JSON.parse(localStorage.getItem("notes")) || []; // Get all notes
  notes.forEach((note) => renderNote(note)); // Render each note
}

// ----------------------------
// Event listener for form submit
form.addEventListener("submit", addNote);

// ----------------------------
// Event listener for remove buttons (using event delegation)
userNotes.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-btn")) {
    const id = e.target.getAttribute("data-id"); // Get the note ID
    e.target.parentElement.remove(); // Remove from DOM
    removeNoteFromLocalStorage(id); // Remove from localStorage
  }
});

// ----------------------------
// Load notes from localStorage when page loads
document.addEventListener("DOMContentLoaded", loadNotesFromLocalStorage);
