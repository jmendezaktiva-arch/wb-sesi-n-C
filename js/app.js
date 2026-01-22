document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURACIÓN DE SECCIONES (AQUÍ MIGRAREMOS EL CONTENIDO) ---
    // Cada objeto representa una "página" del workbook.
    const sectionsData = [
        {
            id: 'ej1',
            title: '1. Diagnóstico de Consolidación',
            icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`,
            content: `
                <div class="max-w-4xl mx-auto">
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold text-brand-blue mb-4">Diagnóstico de Consolidación de Finanzas</h2>
                        <div class="instructions-box text-sm">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Instrucciones
                            </h4>
                            <p>Evalúa el estatus actual de tu estructura financiera. Selecciona el nivel de cumplimiento para cada elemento clave.</p>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                        <div class="grid grid-cols-12 bg-gray-50 p-4 border-b border-gray-200 font-bold text-gray-600 text-sm">
                            <div class="col-span-5">Concepto Clave</div>
                            <div class="col-span-3 text-center">Estatus</div>
                            <div class="col-span-4">Observaciones / Acción Inmediata</div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-12 p-4 border-b border-gray-100 hover:bg-gray-50 items-center gap-4">
                            <div class="col-span-5 font-medium text-gray-800">1. Separo mis finanzas personales de las del negocio.</div>
                            <div class="col-span-3">
                                <select id="e1_row1_status" class="w-full p-2 border border-gray-300 rounded focus:border-blue-500 text-sm">
                                    <option value="">Seleccionar...</option>
                                    <option value="si">✅ Sí, totalmente</option>
                                    <option value="proceso">⚠️ En proceso</option>
                                    <option value="no">❌ No</option>
                                </select>
                            </div>
                            <div class="col-span-4">
                                <input type="text" id="e1_row1_obs" class="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Detalles...">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-12 p-4 border-b border-gray-100 hover:bg-gray-50 items-center gap-4">
                            <div class="col-span-5 font-medium text-gray-800">2. Tengo un sueldo asignado y lo respeto (no hago retiros discrecionales).</div>
                            <div class="col-span-3">
                                <select id="e1_row2_status" class="w-full p-2 border border-gray-300 rounded focus:border-blue-500 text-sm">
                                    <option value="">Seleccionar...</option>
                                    <option value="si">✅ Sí</option>
                                    <option value="proceso">⚠️ A veces</option>
                                    <option value="no">❌ No</option>
                                </select>
                            </div>
                            <div class="col-span-4">
                                <input type="text" id="e1_row2_obs" class="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Detalles...">
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-12 p-4 border-b border-gray-100 hover:bg-gray-50 items-center gap-4">
                            <div class="col-span-5 font-medium text-gray-800">3. Conozco mi Punto de Equilibrio mensual exacto.</div>
                            <div class="col-span-3">
                                <select id="e1_row3_status" class="w-full p-2 border border-gray-300 rounded focus:border-blue-500 text-sm">
                                    <option value="">Seleccionar...</option>
                                    <option value="si">✅ Sí</option>
                                    <option value="proceso">⚠️ Aproximado</option>
                                    <option value="no">❌ No</option>
                                </select>
                            </div>
                            <div class="col-span-4">
                                <input type="text" id="e1_row3_obs" class="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Detalles...">
                            </div>
                        </div>

                         <div class="grid grid-cols-1 md:grid-cols-12 p-4 border-b border-gray-100 hover:bg-gray-50 items-center gap-4">
                            <div class="col-span-5 font-medium text-gray-800">4. Llevo un registro diario de ingresos y egresos.</div>
                            <div class="col-span-3">
                                <select id="e1_row4_status" class="w-full p-2 border border-gray-300 rounded focus:border-blue-500 text-sm">
                                    <option value="">Seleccionar...</option>
                                    <option value="si">✅ Sí</option>
                                    <option value="proceso">⚠️ Irregular</option>
                                    <option value="no">❌ No</option>
                                </select>
                            </div>
                            <div class="col-span-4">
                                <input type="text" id="e1_row4_obs" class="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Detalles...">
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 p-4 bg-blue-50 border border-blue-100 rounded text-center">
                        <p class="text-brand-blue font-semibold">💡 Reflexión: Sin estos cimientos, cualquier estrategia de inversión es riesgosa.</p>
                    </div>
                </div>
                `,
            initFunction: () => {
                // En este ejercicio 1, no tenías lógica JS compleja (solo guardar datos).
                // Como el sistema 'attachAutoSave' del app.js principal ya guarda todo automáticamente,
                // aquí podemos dejar esto vacío o poner un console.log para verificar que cargó.
                console.log("Ejercicio 1 cargado correctamente.");
            }
        },
        {
            id: 'ej2',
            title: '2. Plan de Acción: Consolidación',
            icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>`,
            content: `
                <div class="max-w-4xl mx-auto">
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold text-brand-blue mb-4">Plan de Acción: Consolidación Financiera</h2>
                        <div class="instructions-box text-sm">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                Instrucciones
                            </h4>
                            <p>Basado en los puntos débiles detectados en el diagnóstico anterior (los marcados con "No" o "En Proceso"), define 3 acciones concretas e inmediatas para corregirlos.</p>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                        <div class="grid grid-cols-1 md:grid-cols-12 bg-gray-50 p-3 border-b border-gray-200 font-bold text-gray-600 text-xs uppercase tracking-wider hidden md:grid">
                            <div class="col-span-1 text-center">#</div>
                            <div class="col-span-5">Acción Específica (Qué harás)</div>
                            <div class="col-span-3">Responsable</div>
                            <div class="col-span-2">Fecha Límite</div>
                            <div class="col-span-1">Estatus</div>
                        </div>

                        <div class="p-4 border-b border-gray-100 hover:bg-gray-50 grid grid-cols-1 md:grid-cols-12 gap-4 items-center group">
                            <div class="md:col-span-1 flex items-center gap-2">
                                <span class="bg-brand-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                <span class="md:hidden font-bold text-gray-500">Acción:</span>
                            </div>
                            <div class="md:col-span-5">
                                <textarea id="e2_act1_desc" rows="2" class="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all" placeholder="Ej: Separar cuentas bancarias personales y de negocio..."></textarea>
                            </div>
                            <div class="md:col-span-3">
                                <span class="md:hidden text-xs font-bold text-gray-500 block mb-1">Responsable:</span>
                                <input type="text" id="e2_act1_resp" class="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Nombre...">
                            </div>
                            <div class="md:col-span-2">
                                <span class="md:hidden text-xs font-bold text-gray-500 block mb-1">Fecha:</span>
                                <input type="date" id="e2_act1_date" class="w-full p-2 border border-gray-300 rounded text-sm text-gray-600">
                            </div>
                            <div class="md:col-span-1 text-center">
                                <input type="checkbox" id="e2_act1_check" class="w-5 h-5 text-brand-blue rounded border-gray-300 focus:ring-brand-blue cursor-pointer">
                            </div>
                        </div>

                        <div class="p-4 border-b border-gray-100 hover:bg-gray-50 grid grid-cols-1 md:grid-cols-12 gap-4 items-center group">
                            <div class="md:col-span-1 flex items-center gap-2">
                                <span class="bg-brand-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                <span class="md:hidden font-bold text-gray-500">Acción:</span>
                            </div>
                            <div class="md:col-span-5">
                                <textarea id="e2_act2_desc" rows="2" class="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all" placeholder="Ej: Definir mi sueldo mensual fijo..."></textarea>
                            </div>
                            <div class="md:col-span-3">
                                <span class="md:hidden text-xs font-bold text-gray-500 block mb-1">Responsable:</span>
                                <input type="text" id="e2_act2_resp" class="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Nombre...">
                            </div>
                            <div class="md:col-span-2">
                                <span class="md:hidden text-xs font-bold text-gray-500 block mb-1">Fecha:</span>
                                <input type="date" id="e2_act2_date" class="w-full p-2 border border-gray-300 rounded text-sm text-gray-600">
                            </div>
                            <div class="md:col-span-1 text-center">
                                <input type="checkbox" id="e2_act2_check" class="w-5 h-5 text-brand-blue rounded border-gray-300 focus:ring-brand-blue cursor-pointer">
                            </div>
                        </div>

                        <div class="p-4 border-b border-gray-100 hover:bg-gray-50 grid grid-cols-1 md:grid-cols-12 gap-4 items-center group">
                            <div class="md:col-span-1 flex items-center gap-2">
                                <span class="bg-brand-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                <span class="md:hidden font-bold text-gray-500">Acción:</span>
                            </div>
                            <div class="md:col-span-5">
                                <textarea id="e2_act3_desc" rows="2" class="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all" placeholder="Ej: Calcular costos fijos reales..."></textarea>
                            </div>
                            <div class="md:col-span-3">
                                <span class="md:hidden text-xs font-bold text-gray-500 block mb-1">Responsable:</span>
                                <input type="text" id="e2_act3_resp" class="w-full p-2 border border-gray-300 rounded text-sm" placeholder="Nombre...">
                            </div>
                            <div class="md:col-span-2">
                                <span class="md:hidden text-xs font-bold text-gray-500 block mb-1">Fecha:</span>
                                <input type="date" id="e2_act3_date" class="w-full p-2 border border-gray-300 rounded text-sm text-gray-600">
                            </div>
                            <div class="md:col-span-1 text-center">
                                <input type="checkbox" id="e2_act3_check" class="w-5 h-5 text-brand-blue rounded border-gray-300 focus:ring-brand-blue cursor-pointer">
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex justify-end">
                        <p class="text-xs text-gray-400 italic">* Tus cambios se guardan automáticamente al escribir.</p>
                    </div>
                </div>
                `,
            initFunction: () => {
                // LÓGICA DE RECUPERACIÓN ESPECÍFICA (Para Checkboxes)
                // El sistema global restaura texto, pero aquí aseguramos los checkboxes
                // que a veces requieren un tratamiento especial si el navegador es antiguo.
                ['e2_act1_check', 'e2_act2_check', 'e2_act3_check'].forEach(id => {
                    const checkbox = document.getElementById(id);
                    if(checkbox) {
                        // Guardar estado al cambiar
                        checkbox.addEventListener('change', (e) => {
                            localStorage.setItem('sesionc_ej2_' + id, e.target.checked);
                        });
                        // Recuperar estado al cargar
                        const saved = localStorage.getItem('sesionc_ej2_' + id);
                        if(saved === 'true') {
                            checkbox.checked = true;
                        }
                    }
                });
                console.log("Ejercicio 2 inicializado correctamente.");
                }
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