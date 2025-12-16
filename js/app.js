document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const navMenuContainer = document.getElementById('nav-menu');
    const sectionsContainer = document.getElementById('dynamic-sections-container');
    
    // --- 1. CONFIGURACIÓN MAESTRA DE SECCIONES (SESIÓN C COMPLETA) ---
    // Aquí definimos la estructura de todo el cuaderno de trabajo.
    const sectionsData = [
        // --- Parte 1: Finanzas y Diagnóstico ---
        { id: 'ej1', title: '1. Diagnóstico de Consolidación de Finanzas', icon: getIcon('chart') },
        { id: 'ej2', title: '2. Plan de Acción para la Consolidación', icon: getIcon('clipboard') },
        { id: 'ej3', title: '3. Práctica de Gestión de Inversiones', icon: getIcon('puzzle') },
        { id: 'ej4', title: '4. Cálculo de Flujo de Caja Libre', icon: getIcon('calculator') },
        { id: 'ej5', title: '5. Análisis de Prioridades de Negocio', icon: getIcon('target') },
        
        // --- Parte 2: Evaluación Estratégica de Inversiones ---
        { id: 'ej6', title: '6. Evaluación del Rendimiento', icon: getIcon('trending-up') },
        { id: 'ej7', title: '7. Evaluación del Monto', icon: getIcon('dollar') },
        { id: 'ej8', title: '8. Evaluación del Plazo', icon: getIcon('clock') },
        { id: 'ej9', title: '9. Evaluación del Riesgo', icon: getIcon('shield') },
        { id: 'ej10', title: '10. Evaluación del Propósito', icon: getIcon('star') }
    ];

    // --- 2. GENERACIÓN DINÁMICA DE NAVEGACIÓN Y CONTENEDORES ---
    
    // Limpiamos contenedores por seguridad
    navMenuContainer.innerHTML = '<ul class="space-y-1"></ul>';
    const navList = navMenuContainer.querySelector('ul');
    sectionsContainer.innerHTML = '';

    sectionsData.forEach((section, index) => {
        // A. Crear Item de Menú
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="#${section.id}" class="nav-link flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-brand-blue transition-colors duration-300 text-sm group">
                <span class="completion-icon text-gray-400 group-hover:text-brand-orange transition-colors">
                    ${section.icon}
                </span>
                <span class="flex-grow font-medium">${section.title}</span>
            </a>`;
        navList.appendChild(li);

        // B. Crear Contenedor de Sección (Vacío por ahora)
        const sectionDiv = document.createElement('section');
        sectionDiv.id = section.id;
        sectionDiv.className = 'section-content hidden opacity-0 transition-opacity duration-500'; // Oculto por defecto
        
        // Estructura base interna de cada sección
        sectionDiv.innerHTML = `
            <div class="bg-white shadow-lg rounded-2xl p-6 md:p-10 border border-gray-100">
                <div class="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                    <div class="p-3 bg-blue-50 text-brand-blue rounded-lg">
                        ${section.icon}
                    </div>
                    <h2 class="text-2xl font-bold brand-blue">${section.title}</h2>
                </div>
                
                <div id="${section.id}-content" class="exercise-container">
                    <div class="p-10 text-center text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                        <p>Cargando ejercicio...</p>
                    </div>
                </div>
            </div>
        `;
        sectionsContainer.appendChild(sectionDiv);
    });

    // --- 3. SISTEMA DE NAVEGACIÓN ---
    
    function showSection(sectionId) {
        // Si no hay ID (carga inicial), usar el primero
        if (!sectionId || sectionId === '#') {
            sectionId = '#' + sectionsData[0].id;
        }

        // Remover clases activas de todos
        document.querySelectorAll('.section-content').forEach(el => {
            el.classList.add('hidden');
            setTimeout(() => el.classList.remove('opacity-100'), 20); // Fade out fix
        });
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active', 'bg-blue-50', 'text-brand-blue'));

        // Activar la sección seleccionada
        const targetId = sectionId.replace('#', '');
        const targetSection = document.getElementById(targetId);
        const targetLink = document.querySelector(`a[href="#${targetId}"]`);

        if (targetSection) {
            targetSection.classList.remove('hidden');
            // Pequeño delay para permitir que el display:block se aplique antes de la opacidad (para la transición)
            setTimeout(() => targetSection.classList.add('opacity-100'), 50); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if (targetLink) {
            targetLink.classList.add('active', 'bg-blue-50', 'text-brand-blue');
        }
    }

    // Event Listeners para navegación
    window.addEventListener('hashchange', () => showSection(window.location.hash));
    
    // Inicialización al cargar
    showSection(window.location.hash);


    // --- 4. SISTEMA DE PERSISTENCIA (GUARDADO AUTOMÁTICO) ---
    
    function saveData() {
        const inputs = document.querySelectorAll('.autosave-input');
        const data = {};
        
        inputs.forEach(input => {
            if (input.type === 'radio') {
                if (input.checked) {
                    data[input.name] = input.value;
                }
            } else if (input.type === 'checkbox') {
                data[input.id] = input.checked;
            } else {
                data[input.id || input.name] = input.value; // Preferir ID, fallback a name
            }
        });
        
        // Guardamos todo en un solo objeto JSON en LocalStorage
        localStorage.setItem('workbook_sesion_c_data', JSON.stringify(data));
        console.log('Datos guardados automáticamente.');
        
        // Feedback visual en el botón de guardar
        const saveBtn = document.getElementById('btn-save');
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<span class="text-green-600 font-bold">¡Guardado!</span>';
        setTimeout(() => saveBtn.innerHTML = originalText, 2000);
    }

    function loadData() {
        const savedJSON = localStorage.getItem('workbook_sesion_c_data');
        if (!savedJSON) return;
        
        const data = JSON.parse(savedJSON);
        const inputs = document.querySelectorAll('.autosave-input');
        
        inputs.forEach(input => {
            // Manejo especial para Radios
            if (input.type === 'radio') {
                if (data[input.name] === input.value) {
                    input.checked = true;
                    // Disparar evento change para activar lógicas dependientes (importante para calculadoras)
                    input.dispatchEvent(new Event('change')); 
                }
            } 
            // Manejo especial para Checkbox
            else if (input.type === 'checkbox') {
                if (data[input.id]) {
                    input.checked = true;
                    input.dispatchEvent(new Event('change'));
                }
            } 
            // Inputs normales (Text, Number, Select, Textarea)
            else {
                const key = input.id || input.name;
                if (data[key] !== undefined) {
                    input.value = data[key];
                    input.dispatchEvent(new Event('input')); // Disparar input para cálculos en tiempo real
                }
            }
        });
    }

    // Configurar listeners de autoguardado
    document.body.addEventListener('input', (e) => {
        if (e.target.classList.contains('autosave-input')) {
            // Debounce simple para no guardar en cada tecla
            clearTimeout(window.saveTimeout);
            window.saveTimeout = setTimeout(saveData, 1000); 
        }
    });

    document.getElementById('btn-save').addEventListener('click', saveData);
    document.getElementById('btn-clear').addEventListener('click', () => {
        if(confirm('¿Estás seguro de borrar todos los datos? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('workbook_sesion_c_data');
            location.reload();
        }
    });


    // --- 5. EXPORTACIÓN A PDF (SKELETON) ---
    document.getElementById('btn-export').addEventListener('click', async () => {
        const loading = document.getElementById('loading');
        loading.style.display = 'block'; // Mostrar spinner
        loading.classList.remove('hidden');

        // Mostrar temporalmente todas las secciones para la captura
        const allSections = document.querySelectorAll('.section-content');
        allSections.forEach(s => {
            s.classList.remove('hidden', 'opacity-0'); 
            s.style.display = 'block';
            s.style.opacity = '1';
        });

        const element = document.getElementById('main-content');
        
        try {
            const canvas = await html2canvas(element, {
                scale: 2, // Mejor calidad
                useCORS: true,
                logging: false,
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = pdfWidth / imgWidth;
            const scaledHeight = imgHeight * ratio;

            let heightLeft = scaledHeight;
            let position = 0;
            let pageHeight = pdfHeight;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - scaledHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, scaledHeight);
                heightLeft -= pageHeight;
            }

            const name = document.getElementById('participant-name')?.value || 'Participante';
            pdf.save(`Workbook_SesionC_${name}.pdf`);

        } catch (error) {
            console.error('Error generando PDF:', error);
            alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.');
        } finally {
            loading.style.display = 'none';
            loading.classList.add('hidden');
            // Restaurar vista actual
            showSection(window.location.hash);
        }
    });

    // --- HELPER: ÍCONOS SVG ---
    function getIcon(name) {
        const icons = {
            'chart': '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>',
            'clipboard': '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>',
            'puzzle': '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>',
            'calculator': '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>',
            'target': '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>',
            'trending-up': '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>',
            'dollar': '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            'clock': '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
            'shield': '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>',
            'star': '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>'
        };
        return icons[name] || icons['chart'];
    }

    // --- CARGAR DATOS AL INICIO ---
    loadData();

});