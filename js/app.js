document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURACIÓN DE SECCIONES (AQUÍ MIGRAREMOS EL CONTENIDO) ---
    // Cada objeto representa una "página" del workbook.
    const sectionsData = [
        {
            id: 'diagnostico-inversion',
            title: '1. Diagnóstico de Inversión (E3)',
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`,
            content: `
                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">Diagnóstico de Inversión</h2>
                    <p class="text-gray-500">Contenido pendiente de migrar...</p>
                </div>
            `,
            initFunction: () => {
                // PEGAR AQUÍ LA LÓGICA DE setupInvestmentDiagnosis_ej3()
                console.log("Inicializando E3...");
            }
        },
        {
            id: 'calculadora-fcl',
            title: '2. Calculadora FCL',
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            content: `<div class="p-6">Contenido de Calculadora FCL pendiente...</div>`,
            initFunction: () => { /* setupFCLCalculator2_2 logic */ }
        },
        {
            id: 'ejercicio-2',
            title: '3. Ejercicio 2',
            icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`,
            content: `<div class="p-6">Contenido Ejercicio 2 pendiente...</div>`,
            initFunction: () => { /* setupExercise2 logic */ }
        },
        // ... AGREGAR AQUÍ EL RESTO DE EJERCICIOS (5, 6, 7, 8, 9, 10) SIGUIENDO EL MISMO PATRÓN
    ];

    // --- 2. MOTOR DEL WORKBOOK (NO MODIFICAR MUCHO) ---
    
    const navMenu = document.getElementById('nav-menu').querySelector('ul');
    const contentContainer = document.getElementById('dynamic-content');
    const nameInput = document.getElementById('participant-name');
    
    // Cargar nombre guardado
    nameInput.value = localStorage.getItem('sesionc_nombre') || '';
    nameInput.addEventListener('input', (e) => localStorage.setItem('sesionc_nombre', e.target.value));

    function renderNav() {
        navMenu.innerHTML = '';
        sectionsData.forEach(section => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="nav-link" data-id="${section.id}">
                    ${section.icon}
                    <span>${section.title}</span>
                </div>
            `;
            li.querySelector('.nav-link').addEventListener('click', () => loadSection(section.id));
            navMenu.appendChild(li);
        });
    }

    function loadSection(id) {
        // Actualizar UI Menu
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-id="${id}"]`);
        if(activeLink) activeLink.classList.add('active');

        // Buscar datos
        const section = sectionsData.find(s => s.id === id);
        if (!section) return;

        // Inyectar HTML
        contentContainer.innerHTML = `<div class="section-pane">${section.content}</div>`;

        // Restaurar datos guardados en los inputs nuevos
        restoreData(id);

        // Ejecutar Lógica Específica (HOOK)
        if (section.initFunction && typeof section.initFunction === 'function') {
            try {
                section.initFunction();
            } catch (e) {
                console.error(`Error inicializando sección ${id}:`, e);
            }
        }

        // Auto-guardado global para nuevos inputs
        attachAutoSave(id);
    }

    // --- 3. SISTEMA DE GUARDADO ---
    function attachAutoSave(sectionId) {
        const inputs = contentContainer.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                // Guardar con llave compuesta: sesionc_sectionId_inputId
                if(input.id) {
                    localStorage.setItem(`sesionc_${sectionId}_${input.id}`, input.value);
                }
            });
        });
    }

    function restoreData(sectionId) {
        const inputs = contentContainer.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if(input.id) {
                const val = localStorage.getItem(`sesionc_${sectionId}_${input.id}`);
                if(val) input.value = val;
            }
        });
    }

    // --- 4. INICIALIZACIÓN ---
    renderNav();
    // Cargar la primera sección por defecto
    if(sectionsData.length > 0) loadSection(sectionsData[0].id);

    // --- 5. EXPORTAR PDF (Global) ---
    document.getElementById('btn-download-pdf').addEventListener('click', async () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        // Lógica de PDF simplificada...
        alert("Funcionalidad PDF pendiente de integrar con el contenido migrado.");
    });
});