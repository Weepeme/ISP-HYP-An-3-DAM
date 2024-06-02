// app.js

const userList = document.getElementById('user-list');
const userForm = document.getElementById('user-form');

// Funcție pentru a afișa utilizatorii
function displayUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} - ${user.email}`;
    userList.appendChild(li);
  });
}

// Funcție pentru a adăuga un utilizator nou
async function addUser(name, email) {
  try {
    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });
    const newUser = await response.json();
    displayUsers([newUser]);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Eveniment pentru submit-ul formularului de utilizator
userForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  if (name && email) {
    addUser(name, email);
    userForm.reset();
  } else {
    alert('Completați toate câmpurile!');
  }
});

// Funcția pentru a obține toți utilizatorii la încărcarea paginii
async function getUsers() {
  try {
    const response = await fetch('/users');
    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    console.error('Error:', error);
  }
}

getUsers();
