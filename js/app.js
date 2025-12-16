document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const navMenu = document.getElementById('nav-menu').querySelector('ul');
    const progressBar = document.getElementById('progress-bar');

    // --- CONFIGURACIÓN DE SECCIONES (SESIÓN C: EJERCICIOS 1-10) ---
    // Iconos SVG genéricos asignados para mantener consistencia visual
    const sectionsData = [
        { 
            id: 'ej1', 
            title: '1. Diagnóstico de Consolidación', 
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>` 
        },
        { 
            id: 'ej2', 
            title: '2. Plan de Acción Financiera', 
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>` 
        },
        { 
            id: 'ej3', 
            title: '3. Práctica de Gestión', 
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>` 
        },
        { 
            id: 'ej4', 
            title: '4. Cálculo de Flujo de Caja Libre', 
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>` 
        },
        { 
            id: 'ej5', 
            title: '5. Prioridades de Negocio', 
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>` 
        },
        { 
            id: 'ej6', 
            title: '6. Evaluación del Rendimiento', 
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>` 
        },
        { 
            id: 'ej7', 
            title: '7. Evaluación del Monto', 
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>` 
        },
        { 
            id: 'ej8', 
            title: '8. Evaluación del Plazo', 
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>` 
        },
        { 
            id: 'ej9', 
            title: '9. Evaluación del Riesgo', 
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>` 
        },
        { 
            id: 'ej10', 
            title: '10. Evaluación del Propósito', 
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>` 
        }
    ];

    // --- CONSTRUCCIÓN DINÁMICA DEL MENÚ Y CONTENEDORES ---
    sectionsData.forEach(data => {
        // 1. Crear Item de Menú
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#${data.id}" class="nav-link flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-brand-blue transition-colors duration-300 text-sm">
                <span class="completion-icon text-gray-400 group-hover:text-brand-blue">
                    ${data.icon}
                </span>
                <span class="flex-grow font-medium">${data.title}</span>
            </a>`;
        navMenu.appendChild(li);

        // 2. Crear Contenedor de Sección (Inicialmente vacío)
        const section = document.createElement('section');
        section.id = data.id;
        section.className = 'section-content bg-white shadow-xl rounded-2xl p-8 mb-8 hidden opacity-0 transition-opacity duration-500';
        // Aquí insertaremos el contenido HTML de cada ejercicio paso a paso
        mainContent.appendChild(section);
    });

    // --- LÓGICA DE NAVEGACIÓN Y AUTOSAVE (Idéntica a Sesión B) ---
    
    function showSection(hash) {
        // Ocultar todas las secciones
        document.querySelectorAll('.section-content').forEach(s => {
            s.classList.remove('active');
            s.classList.add('hidden');
            setTimeout(() => {
                if(!s.classList.contains('active')) s.style.display = 'none'; 
            }, 500); 
        });

        // Desactivar todos los links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active', 'bg-blue-50', 'text-brand-blue'));

        const targetId = hash.replace('#', '');
        const targetSection = document.getElementById(targetId) || document.getElementById(sectionsData[0].id);
        const activeLink = document.querySelector(`a[href="#${targetSection.id}"]`);

        // Mostrar sección objetivo
        if (targetSection) {
            targetSection.style.display = 'block';
            // Pequeño timeout para permitir la transición de opacidad
            setTimeout(() => {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('active');
            }, 10);
            window.scrollTo(0, 0);
        }

        // Activar link
        if (activeLink) {
            activeLink.classList.add('active', 'bg-blue-50', 'text-brand-blue');
        }

        // Actualizar URL sin recargar
        history.pushState(null, null, `#${targetSection.id}`);
        
        // Actualizar barra de progreso (simulada por ahora)
        updateProgressBar();
    }

    function updateProgressBar() {
        const inputs = document.querySelectorAll('.autosave-input');
        if (inputs.length === 0) return; // Evitar división por cero si aún no hay inputs
        
        let filled = 0;
        inputs.forEach(input => {
            if (input.type === 'radio' || input.type === 'checkbox') {
                if (input.checked) filled++;
            } else {
                if (input.value.trim() !== '') filled++;
            }
        });
        // Nota: El cálculo exacto dependerá de cuántos inputs únicos (names) existan, 
        // ajustaremos esto cuando insertemos el contenido real.
        const percent = Math.min(100, Math.round((filled / inputs.length) * 100)) || 0;
        progressBar.style.width = `${percent}%`;
    }

    // --- AUTOSAVE SYSTEM ---
    // Delegación de eventos para inputs que se crearán dinámicamente
    mainContent.addEventListener('input', function(e) {
        if (e.target.classList.contains('autosave-input')) {
            const key = 'sesionc_' + e.target.dataset.id;
            localStorage.setItem(key, e.target.value);
            updateProgressBar();
        }
    });

    // Manejo especial para radios y selects
    mainContent.addEventListener('change', function(e) {
        if (e.target.classList.contains('autosave-input') && (e.target.type === 'radio' || e.target.tagName === 'SELECT')) {
            const key = 'sesionc_' + e.target.dataset.id;
            localStorage.setItem(key, e.target.value);
            updateProgressBar();
        }
    });

    // --- INICIALIZACIÓN ---
    // Cargar sección basada en URL o la primera por defecto
    showSection(window.location.hash);

    // Manejar cambios de hash manuales (atrás/adelante navegador)
    window.addEventListener('hashchange', () => showSection(window.location.hash));
});

