import { sectionsData } from './config.js';
import { getIcon } from './utils.js';
import { renderEj1 } from './exercises/ej1.js';
import { renderEj2 } from './exercises/ej2.js';

document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const navMenuContainer = document.getElementById('nav-menu');
    const sectionsContainer = document.getElementById('dynamic-sections-container');
    

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

        // --- LÓGICA DE INYECCIÓN MODULAR ---
        const contentContainer = sectionDiv.querySelector('.exercise-container');

            if (section.id === 'ej1') {
                renderEj1(contentContainer);
            } else if (section.id === 'ej2') {
                renderEj2(contentContainer); // <--- NUEVA LÍNEA: Carga el Ejercicio 2
            }
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
        setupExercise1();
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

    // --- CARGAR DATOS AL INICIO ---
    loadData();

// EJERCICIO 1: Diagnóstico de Consolidación de Finanzas
    function setupExercise1() {
        const container = document.getElementById('ej1-content');
        
        const html = `
            <div class="instructions-box">
                <p><strong>Meta Transformacional:</strong> Internalizar que tú no eres la empresa. Crear reglas claras te da libertad y protege tanto tu patrimonio como el negocio. Este es el primer paso para tomar decisiones de inversión profesionales.</p>
            </div>
            
            <div class="space-y-10">
                <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span class="bg-brand-blue text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">A</span>
                        Fijación de Sueldo del Fundador
                    </h3>
                    
                    <div class="mb-8">
                        <label class="block font-semibold text-gray-700 mb-3">1. ¿Has establecido un salario fijo para ti, o tus ingresos varían según el desempeño de la empresa?</label>
                        <div class="flex flex-col space-y-3 bg-white p-4 rounded-lg border border-gray-200">
                            <label class="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name="ej1_salario_tipo" value="fijo" class="autosave-input w-5 h-5 text-brand-blue focus:ring-brand-blue"> 
                                <span>Salario fijo</span>
                            </label>
                            <label class="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name="ej1_salario_tipo" value="combinado" class="autosave-input w-5 h-5 text-brand-blue focus:ring-brand-blue"> 
                                <span>Combinación de fijo y variable</span>
                            </label>
                            <label class="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name="ej1_salario_tipo" value="variable" class="autosave-input w-5 h-5 text-brand-blue focus:ring-brand-blue"> 
                                <span>Totalmente variable</span>
                            </label>
                            <label class="flex items-center gap-3 cursor-pointer">
                                <input type="radio" name="ej1_salario_tipo" value="ninguno" class="autosave-input w-5 h-5 text-brand-blue focus:ring-brand-blue"> 
                                <span>No recibo ingresos</span>
                            </label>
                        </div>
                    </div>

                    <div class="mb-8">
                         <h4 class="font-bold text-brand-blue mb-4 text-sm uppercase tracking-wide">Tablas de Referencia (Sueldos en MXN/mes)</h4>
                         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                                <table class="w-full text-sm">
                                    <thead><tr class="bg-gray-100"><th colspan="2" class="p-3 text-left font-bold text-gray-600">1. Referentes de mercado</th></tr></thead>
                                    <tbody class="divide-y divide-gray-100 bg-white">
                                        <tr><td class="p-3">Microempresa</td><td class="p-3 text-right font-medium">$25k – $40k</td></tr>
                                        <tr><td class="p-3 bg-gray-50">Pequeña empresa</td><td class="p-3 text-right font-medium bg-gray-50">$30k – $45k</td></tr>
                                        <tr><td class="p-3">Mediana empresa</td><td class="p-3 text-right font-medium">$45k – $60k</td></tr>
                                        <tr><td class="p-3 bg-blue-50 text-brand-blue font-bold">Director General Senior</td><td class="p-3 text-right font-bold bg-blue-50 text-brand-blue">Hasta $120,000+</td></tr>
                                        <tr><td class="p-3">Promedio PYME</td><td class="p-3 text-right font-medium">$30k – $80k</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                                <table class="w-full text-sm">
                                    <thead><tr class="bg-gray-100"><th colspan="2" class="p-3 text-left font-bold text-gray-600">2. Límites por facturación</th></tr></thead>
                                    <tbody class="divide-y divide-gray-100 bg-white">
                                        <tr><td class="p-3 text-gray-500">$300k – $1M</td><td class="p-3 text-right font-medium">$18k – $60k</td></tr>
                                        <tr><td class="p-3 bg-gray-50 text-gray-500">$1M – $5M</td><td class="p-3 text-right font-medium bg-gray-50">$30k – $90k</td></tr>
                                        <tr><td class="p-3 text-gray-500">$5M – $20M</td><td class="p-3 text-right font-medium">$60k – $200k</td></tr>
                                    </tbody>
                                </table>
                            </div>
                         </div>
                    </div>

                    <div class="mb-6">
                        <label class="block font-semibold text-gray-700 mb-2">2. Define un sueldo de mercado para tu puesto si contrataras a un externo competente para tus funciones operativas.</label>
                         <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 rounded-r text-sm text-yellow-800">
                            <strong>Tip Pro:</strong> (Opcional) Busca en bolsas de trabajo perfiles de referencia (Gerente comercial, de operaciones, etc.) para validar tu criterio.
                         </div>
                        <textarea id="ej1_salario_mercado" placeholder="Basado en el mercado, un sueldo justo para mi rol sería..." class="autosave-input w-full p-4 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"></textarea>
                    </div>

                    <div class="mb-2">
                        <label class="block font-semibold text-gray-700 mb-2">3. Define o valida un rango de sueldo consistente y coherente con los criterios analizados.</label>
                        <div class="relative">
                            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                            <input type="text" id="ej1_salario_definido" placeholder="Mi sueldo fijo mensual será de..." class="autosave-input w-full pl-8 p-3 border border-gray-300 rounded-lg font-bold text-brand-blue focus:ring-2 focus:ring-brand-blue focus:border-transparent transition">
                        </div>
                    </div>

                </div>
            </div>
        `;

        container.innerHTML = html;
    }

});