// Chat Room

// Get elements
const container = document.querySelector('.container');
const chat = document.querySelector('.chat');
const loginForm = document.querySelector('#login-form');
const loginUsername = document.querySelector('#login-username');
const loginPassword = document.querySelector('#login-password');
const registerForm = document.querySelector('#register-form');
const registerUsername = document.querySelector('#register-username');
const registerPassword = document.querySelector('#register-password');
const logoutButton = document.querySelector('#logout');
const usernameElement = document.querySelector('#username');
const avatarElement = document.querySelector('#avatar');
const changeAvatarButton = document.querySelector('#change-avatar');
const overlay = document.querySelector('#overlay');
const avatarForm = document.querySelector('#avatar-form');
const avatarUrl = document.querySelector('#avatar-url');
const cancelAvatarButton = document.querySelector('#cancel-avatar');
const messageInput = document.querySelector('#message-input');
const sendButton = document.querySelector('#send');
const messagesElement = document.querySelector('#messages');

// Check if user is logged in
if (localStorage.getItem('username')) {
	// User is logged in, show chat room
	showChatRoom();
} else {
	// User is not logged in, show login form
	showLoginForm();
}

// Login form submit event
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const username = loginUsername.value.trim();
	const password = loginPassword.value.trim();
	if (username && password) {
		// Check if user exists and password is correct
		if (localStorage.getItem(username) === password) {
			// Login successful, save username to local storage
			localStorage.setItem('username', username);
			showChatRoom();
		} else {
			// Login failed, show error message
			alert('Invalid username or password.');
		}
	} else {
		// Login failed, show error message
		alert('Please enter username and password.');
	}
});

// Register form submit event
registerForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const username = registerUsername.value.trim();
	const password = registerPassword.value.trim();
	if (username && password) {
		// Check if user already exists
		if (localStorage.getItem(username)) {
			// Registration failed, show error message
			alert('Username already exists.');
		} else {
			// Registration successful, save username and password to local storage
			localStorage.setItem(username, password);
			alert('Registration successful. Please login.');
			showLoginForm();
		}
	} else {
		// Registration failed, show error message
		alert('Please enter username and password.');
	}
});

// Logout button click event
logoutButton.addEventListener('click', () => {
	// Remove username from local storage and show login form
	localStorage.removeItem('username');
	showLoginForm();
});

// Change avatar button click event
changeAvatarButton.addEventListener('click', () => {
	// Show overlay with avatar form
	overlay.style.display = 'block';
});

// Avatar form submit event
avatarForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const url = avatarUrl.value.trim();
	if (url) {
		// Set new avatar URL and hide overlay
		avatarElement.src = url;
		overlay.style.display = 'none';
	} else {
		// Show error message
		alert('Please enter avatar URL.');
	}
});

// Cancel avatar button click event
cancelAvatarButton.addEventListener('click', () => {
	// Hide overlay
	overlay.style.display = 'none';
});

// Send button click event
sendButton.addEventListener('click', () => {
	const message = messageInput.value.trim();
	if (message) {
		// Create new message element and add to messages
		const messageElement = document.createElement('p');
		messageElement.textContent = `${localStorage.getItem('username')}: ${message}`;
		messagesElement.appendChild(messageElement);
		// Clear message input
		messageInput.value = '';
	}
});

// Show login form
function showLoginForm() {
	container.classList.remove('chat');
	container.classList.add('login');
}

// Show chat room
function showChatRoom() {
	container.classList.remove('login');
	container.classList.add('chat');
	// Set username and avatar
	usernameElement.textContent = localStorage.getItem('username');
	avatarElement.src = localStorage.getItem('avatar') || 'default-avatar.png';
}

// Admin Panel

// Check if user is admin
if (localStorage.getItem('admin')) {
	// User is admin, show admin panel
	showAdminPanel();
}

// Admin login form submit event
document.querySelector('#admin-login-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const username = document.querySelector('#admin-username').value.trim();
	const password = document.querySelector('#admin-password').value.trim();
	if (username && password) {
		// Check if user is admin and password is correct
		if (localStorage.getItem('admin') === username && localStorage.getItem('admin-password') === password) {
			// Admin login successful, show admin panel
			showAdminPanel();
		} else {
			// Admin login failed, show error message
			alert('Invalid username or password.');
		}
	} else {
		// Admin login failed, show error message
		alert('Please enter username and password.');
	}
});

// Admin logout button click event
document.querySelector('#admin-logout').addEventListener('click', () => {
	// Remove admin status and show login form
	localStorage.removeItem('admin');
	localStorage.removeItem('admin-password');
	showAdminLoginForm();
});

// Show admin login form
function showAdminLoginForm() {
	document.querySelector('#admin-login-form').style.display = 'block';
	document.querySelector('#admin-panel').style.display = 'none';
}

// Show admin panel
function showAdminPanel() {
	document.querySelector('#admin-login-form').style.display = 'none';
	document.querySelector('#admin-panel').style.display = 'block';
}

// Admin set avatar button click event
document.querySelector('#admin-set-avatar').addEventListener('click', () => {
	const username = document.querySelector('#admin-username-input').value.trim();
	const url = document.querySelector('#admin-avatar-input').value.trim();
	if (username && url) {
		// Set user avatar URL
		localStorage.setItem(`${username}-avatar`, url);
		alert(`Avatar for ${username} set to ${url}.`);
	} else {
		// Show error message
		alert('Please enter username and avatar URL.');
	}
});

// Admin delete user button click event
document.querySelector('#admin-delete-user').addEventListener('click', () => {
	const username = document.querySelector('#admin-username-input').value.trim();
	if (username) {
		// Remove user from local storage
		localStorage.removeItem(username);
		localStorage.removeItem(`${username}-avatar`);
		alert(`User ${username} deleted.`);
	} else {
		// Show error message
		alert('Please enter username.');
	}
});

// Admin list users button click event
document.querySelector('#admin-list-users').addEventListener('click', () => {
	// Get list of users from local storage
	const users = Object.keys(localStorage).filter(key => key !== 'username' && key !== 'admin' && key !== 'admin-password');
	// Show list of users
	alert(`Users: ${users.join(', ')}`);
});