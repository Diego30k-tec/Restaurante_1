// login.js - Funcionalidad de Login y Logout

document.addEventListener('DOMContentLoaded', () => {
  const loginText = document.getElementById('login-text');
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

  // Verificar si ya hay un usuario logueado en localStorage
  const loggedUser = localStorage.getItem('loggedUser');
  if (loggedUser) {
    updateLoginText(loggedUser);
  }

  // Manejar el submit del formulario de login
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir recarga de página

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Obtener usuarios de localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Validar credenciales
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      // Guardar en localStorage
      localStorage.setItem('loggedUser', username);

      // Actualizar texto en navbar
      updateLoginText(username);

      // Cerrar modal
      loginModal.hide();

      // Limpiar campos
      usernameInput.value = '';
      passwordInput.value = '';

      alert('¡Login exitoso!');
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  });

  // Función para actualizar el texto de login
  function updateLoginText(user) {
    loginText.innerHTML = `Hola, <a href="#" class="text-decoration-none">${user}</a> <a href="#" id="logout-link" class="ms-2 small text-danger">Cerrar Sesión</a>`;

    // Añadir evento para logout
    document.getElementById('logout-link').addEventListener('click', (event) => {
      event.preventDefault();
      localStorage.removeItem('loggedUser');
      loginText.innerHTML = 'Hola, <a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar Sesión</a>';
    });
  }
});