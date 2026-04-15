
// DOM REFERENCES
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('list');
const completedList = document.getElementById('completedList');
const pendingTemplate = document.getElementById('listItemTemplate');
const completedTemplate = document.getElementById('completedItemTemplate');

// HELPERS

function formatTask(value) {
  value = value.trim();
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createTask(taskText) {
  const newItem = pendingTemplate.content.cloneNode(true);
  newItem.querySelector('.task').textContent = taskText;
  list.appendChild(newItem);
}

function moveToCompleted(taskText) {
  const completedItem = completedTemplate.content.cloneNode(true);
  completedItem.querySelector('.task').textContent = taskText;
  completedList.appendChild(completedItem);
}

function updateVisibility() {
  const pendingSection = document.getElementById('pending');
  const completedSection = document.getElementById('completed');

  // Pending
  pendingSection.style.display =
    list.children.length === 0 ? 'none' : 'block';

  // Completed
  completedSection.style.display =
    completedList.children.length === 0 ? 'none' : 'block';
}


// ADD TASK
addBtn.addEventListener('click', () => {
  const value = formatTask(input.value);
  if (!value) return;

  createTask(value);
  updateVisibility();

  input.value = '';
  input.focus();
});




// TIMER (WITH CANCEL)
list.addEventListener('change', (event) => {
  if (!event.target.classList.contains('time-out')) return;

  const listItem = event.target.closest('.list-item');
  const selectedValue = event.target.value;

  // 🔥 cancel previous timer if exists
  if (listItem.dataset.timerId) {
    clearTimeout(listItem.dataset.timerId);
  }

  if (selectedValue === '0') return;

  const taskText = listItem.querySelector('.task').textContent;

  const timerId = setTimeout(() => {
    listItem.remove();
    moveToCompleted(taskText);
    updateVisibility();
  }, selectedValue * 1000);

  // 🔥 store timer id
  listItem.dataset.timerId = timerId;
});


// CLICK (EDIT + SAVE) WITHOUT innerHTML
list.addEventListener('click', (event) => {
  const listItem = event.target.closest('.list-item');
  if (!listItem) return;

  // EDIT
  if (event.target.classList.contains('edit')) {
    const taskSpan = listItem.querySelector('.task');
    const currentText = taskSpan.textContent;

    // clear span safely
    taskSpan.textContent = '';

    // create input
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = currentText;

    // create save button
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save';
    saveBtn.textContent = 'Save';

    taskSpan.appendChild(editInput);
    taskSpan.appendChild(saveBtn);
  }

  // SAVE
  else if (event.target.classList.contains('save')) {
    const taskSpan = listItem.querySelector('.task');
    const editInput = listItem.querySelector('.edit-input');

    const newValue = formatTask(editInput.value);
    if (!newValue) return;

    taskSpan.textContent = newValue;
  }
});

const deleteBtn = document.querySelector('.delete');
deleteBtn.addEventListener('click', () => {
  const checkboxes = completedList.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkbox.closest('.list-item').remove();
        }
    });
    updateVisibility();
});

updateVisibility();
