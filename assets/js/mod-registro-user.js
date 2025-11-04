// register.js - Funcionalidad de Registro

document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const regUsernameInput = document.getElementById('reg-username');
  const regPasswordInput = document.getElementById('reg-password');
  const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));

  // Inicializar usuarios si no existen (array de objetos {username, password})
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([{ username: 'admin', password: '1234' }]));
  }

  // Manejar el submit del formulario de registro
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir recarga de página

    const username = regUsernameInput.value.trim();
    const password = regPasswordInput.value.trim();

    if (username === '' || password === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Obtener usuarios de localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si el usuario ya existe
    if (users.some(u => u.username === username)) {
      alert('El usuario ya existe. Elige otro.');
      return;
    }

    // Añadir nuevo usuario
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Limpiar campos
    regUsernameInput.value = '';
    regPasswordInput.value = '';

    // Cerrar modal
    registerModal.hide();

    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
  });
});