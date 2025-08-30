export function initDropdown() {
    const dropdownBtn = document.getElementById('dropdownBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropdownArrow = document.getElementById('dropdownArrow');

    if (!dropdownBtn || !dropdownMenu || !dropdownArrow) {
        console.warn("Dropdown elements not found in DOM");
        return;
    }

    // Toggle del dropdown
    dropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown();
    });

    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            closeDropdown();
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDropdown();
        }
    });

    // Funciones internas
    function toggleDropdown() {
        const isOpen = dropdownMenu.classList.contains('show');
        isOpen ? closeDropdown() : openDropdown();
    }

    function openDropdown() {
        dropdownMenu.classList.add('show');
        dropdownArrow.classList.add('open');
    }

    function closeDropdown() {
        dropdownMenu.classList.remove('show');
        dropdownArrow.classList.remove('open');
    }

    // Acciones del menú
    window.showUser = function() {
        alert('Mostrando información del usuario');
        closeDropdown();
    };

    window.showProfile = function() {
        alert('Abriendo perfil del usuario');
        closeDropdown();
    };

    window.logout = function() {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            alert('Cerrando sesión...');
            // Aquí puedes poner lógica real de logout
            // window.location.href = '/login';
        }
        closeDropdown();
    };
}
