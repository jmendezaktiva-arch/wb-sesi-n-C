    window.calculateEj3Scores = function() {
    let totalPoints = 0;
    const maxPossible = 48;

    // 1. Procesar cada inversión (columna)
    for (let inv = 1; inv <= 3; inv++) {
        let invScore = 0;
        const columnSelects = document.querySelectorAll(`[data-id*="_i${inv}"]`);
        
        columnSelects.forEach(select => {
            const val = parseInt(select.value) || 0;
            invScore += val;

            // COLOR DE LA CELDA: Limpiar y aplicar color según valor
            select.classList.remove('score-select-green', 'score-select-yellow', 'score-select-red');
            if (val === 2) select.classList.add('score-select-green');
            else if (val === 1) select.classList.add('score-select-yellow');
            else if (val === 0) select.classList.add('score-select-red');
        });
        
        // COLOR DEL SCORE INDIVIDUAL (Máx 16)
        const resCell = document.getElementById(`res-score-${inv}`);
        if (resCell) {
            resCell.innerText = invScore;
            resCell.className = "p-4 text-center font-black text-lg"; // Reset clases
            if (invScore < 6) resCell.classList.add('text-score-low');
            else if (invScore < 12) resCell.classList.add('text-score-mid');
            else resCell.classList.add('text-score-high');
        }
        totalPoints += invScore;
    }

    // 2. COLOR DEL PORCENTAJE GENERAL
    const percentage = Math.round((totalPoints / maxPossible) * 100);
    const display = document.getElementById('general-percentage');
    
    if (display) {
        display.innerText = `${percentage}%`;
        display.className = "text-6xl font-black mb-4 transition-colors duration-500"; // Base
        
        if (percentage < 40) display.classList.add('text-red-600');
        else if (percentage < 75) display.classList.add('text-yellow-500');
        else display.classList.add('text-green-600');
    }

    // 3. ACTUALIZAR FEEDBACK
    const feedback = document.getElementById('score-feedback');
    if (feedback) {
        if (percentage < 40) feedback.innerText = "Nivel Crítico: Estructura técnica débil.";
        else if (percentage < 75) feedback.innerText = "Nivel Moderado: Ejecución inconsistente.";
        else feedback.innerText = "Nivel Avanzado: Proceso de decisión sólido.";
    }
};

/* === MOTOR LÓGICO DEL EJERCICIO 4: CALCULADORA FCL === */

const FCLManager = {
    currentMonths: 6, // Estado por defecto

    init: function() {
        this.renderTable();
        this.bindEvents();
        this.setupTabs();
    },

    // A. Manejo de Pestañas (Síntoma 1 corregido)
    setupTabs: function() {
        const tabButtons = document.querySelectorAll('.fcl-tab-button-2-2');
        const tabContents = document.querySelectorAll('.fcl-tab-content-2-2');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.tab;
                
                tabButtons.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                document.getElementById(`${target}-content-2-2`).classList.add('active');
            });
        });
    },

    // B. Renderizado Dinámico de Tabla con Desglose (Intervención Quirúrgica)
    renderTable: function() {
        const table = document.getElementById('fcl-input-table-2-2');
        if (!table) return;

        let html = `
            <thead>
                <tr class="bg-gray-100">
                    <th class="p-3 text-left brand-blue border">Concepto</th>
                    ${Array.from({ length: this.currentMonths }, (_, i) => `<th class="p-3 text-center border">Mes ${i + 1}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                <tr class="bg-blue-50 font-bold"><td colspan="${this.currentMonths + 1}" class="p-2 border">INGRESOS</td></tr>
                ${this.getRowHTML("Ventas (Cobrado)", "ing_ventas")}
                ${this.getRowHTML("Otros Ingresos", "ing_otros")}
                
                <tr class="bg-red-50 font-bold"><td colspan="${this.currentMonths + 1}" class="p-2 border">GASTOS FIJOS</td></tr>
                ${this.getRowHTML("Renta", "fix_renta")}
                ${this.getRowHTML("Sueldos/Nomina", "fix_sueldos")}
                ${this.getRowHTML("Otros Gastos Fijos", "fix_otros")}
                
                <tr class="bg-yellow-50 font-bold"><td colspan="${this.currentMonths + 1}" class="p-2 border">GASTOS VARIABLES</td></tr>
                ${this.getRowHTML("Costo de Ventas", "var_costo")}
                ${this.getRowHTML("Promoción/Marketing", "var_promo")}
                ${this.getRowHTML("Otros Gastos Variables", "var_otros")}

                <tr class="bg-gray-800 text-white font-bold">
                    <td class="p-3 border">FLUJO DE CAJA LIBRE (FCL)</td>
                    ${Array.from({ length: this.currentMonths }, (_, i) => `<td id="fcl-val-${i}" class="p-3 text-right border">$0</td>`).join('')}
                </tr>
            </tbody>`;
        table.innerHTML = html;
    },

    getRowHTML: function(label, key) {
        return `
            <tr>
                <td class="p-3 border font-medium text-sm">${label}</td>
                ${Array.from({ length: this.currentMonths }, (_, i) => `
                    <td class="p-2 border">
                        <input type="number" 
                            class="autosave-input fcl-input-field w-full p-2 border-none text-right focus:bg-blue-50 text-sm" 
                            data-section="ej4" 
                            data-id="ej4_m${i}_${key}" 
                            placeholder="0"
                            oninput="FCLManager.calculate()">
                    </td>`).join('')}
            </tr>`;
    },

    // C. Motor de Cálculo con Sumatorias de Desglose
    calculate: function() {
        let totalFCL = 0;
        const results = [];

        for (let i = 0; i < this.currentMonths; i++) {
            // Sumar Ingresos
            const ing = (parseFloat(document.querySelector(`[data-id="ej4_m${i}_ing_ventas"]`)?.value) || 0) +
                        (parseFloat(document.querySelector(`[data-id="ej4_m${i}_ing_otros"]`)?.value) || 0);
            
            // Sumar Gastos Fijos
            const gf = (parseFloat(document.querySelector(`[data-id="ej4_m${i}_fix_renta"]`)?.value) || 0) +
                       (parseFloat(document.querySelector(`[data-id="ej4_m${i}_fix_sueldos"]`)?.value) || 0) +
                       (parseFloat(document.querySelector(`[data-id="ej4_m${i}_fix_otros"]`)?.value) || 0);
            
            // Sumar Gastos Variables
            const gv = (parseFloat(document.querySelector(`[data-id="ej4_m${i}_var_costo"]`)?.value) || 0) +
                       (parseFloat(document.querySelector(`[data-id="ej4_m${i}_var_promo"]`)?.value) || 0) +
                       (parseFloat(document.querySelector(`[data-id="ej4_m${i}_var_otros"]`)?.value) || 0);

            const fcl = ing - gf - gv;
            results.push(fcl);
            totalFCL += fcl;

            const cell = document.getElementById(`fcl-val-${i}`);
            if (cell) {
                cell.innerText = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(fcl);
                cell.className = `p-3 text-right border font-bold ${fcl < 0 ? 'text-red-400' : 'text-green-400'}`;
            }
        }
        this.updateDashboard(totalFCL, results);
    },

    updateDashboard: function(total, results) {
        const container = document.getElementById('fcl-results-container-2-2');
        container.classList.remove('hidden');

        const avg = total / this.currentMonths;
        const annual = avg * 12;

        document.getElementById('avg-monthly-fcl-2-2').innerText = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(avg);
        document.getElementById('annual-fcl-2-2').innerText = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(annual);

        // Semáforos de Inversión (Integridad de reglas original)
        this.updateSemaphores(annual);
    },

    updateSemaphores: function(annual) {
        const fmt = (val) => new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(val);
        
        document.querySelector('#semaphore-green-2-2 p.text-sm').innerText = `${fmt(0)} - ${fmt(annual * 0.08)}`;
        document.querySelector('#semaphore-blue-2-2 p.text-sm').innerText = `${fmt(annual * 0.081)} - ${fmt(annual * 0.20)}`;
        document.querySelector('#semaphore-yellow-2-2 p.text-sm').innerText = `${fmt(annual * 0.21)} - ${fmt(annual * 0.70)}`;
        document.querySelector('#semaphore-red-2-2 p.text-sm').innerText = `${fmt(annual * 0.71)} - ${fmt(annual * 1.00)}`;
    },

    bindEvents: function() {
        document.getElementById('view-3m-2-2').addEventListener('click', () => {
            this.currentMonths = 3;
            this.renderTable();
            this.updateButtonUI('view-3m-2-2', 'view-6m-2-2');
        });
        document.getElementById('view-6m-2-2').addEventListener('click', () => {
            this.currentMonths = 6;
            this.renderTable();
            this.updateButtonUI('view-6m-2-2', 'view-3m-2-2');
        });
    },

    updateButtonUI: function(activeId, inactiveId) {
        document.getElementById(activeId).className = "px-4 py-2 text-sm font-medium text-white bg-brand-blue border rounded-lg";
        document.getElementById(inactiveId).className = "px-4 py-2 text-sm font-medium text-gray-900 bg-white border rounded-lg hover:bg-gray-100";
    }
};

const PriorityManager = {
    areas: ["Ventas y Marketing", "Operaciones y Procesos", "Equipo y Liderazgo", "Finanzas y Rentabilidad"],
    
    // Base de datos de tácticas extraída de Workbook.html
    tacticsData: {
        "Ventas y Marketing": ["Generación de Leads", "Conversión de Ventas", "Fidelización de Clientes", "Aumento de Ticket Promedio"],
        "Operaciones y Procesos": ["Optimización de Procesos", "Implementación de Software", "Control de Inventarios", "Estandarización de Calidad"],
        "Equipo y Liderazgo": ["Definición de Puestos", "Plan de Compensación", "Cultura Organizacional", "Capacitación Técnica"],
        "Finanzas y Rentabilidad": ["Control de Gastos", "Gestión de Flujo", "Análisis de Rentabilidad", "Presupuesto y Planeación"]
    },

    init: function() {
        this.bindEvents();
        this.renderPriorityAreas();
    },

    bindEvents: function() {
        const btnStart = document.getElementById('btn-start-analysis');
        const btnBack = document.getElementById('btn-back-to-brainstorm');
        if (btnStart) btnStart.onclick = () => { 
            document.getElementById('step-1').classList.add('hidden');
            document.getElementById('guided-analysis-container').classList.remove('hidden');
        };
        if (btnBack) btnBack.onclick = () => {
            document.getElementById('step-1').classList.remove('hidden');
            document.getElementById('guided-analysis-container').classList.add('hidden');
        };
    },

    renderPriorityAreas: function() {
        const container = document.getElementById('priority-areas-container');
        if (!container) return;
        container.innerHTML = this.areas.map((area, i) => `
            <div class="p-4 border rounded-lg bg-gray-50">
                <div class="flex flex-col md:flex-row gap-4 items-start">
                    <div class="w-full md:w-1/3">
                        <label class="block font-bold text-gray-700">${area}</label>
                        <select class="autosave-input priority-selector w-full mt-1 p-2 border rounded" 
                                data-area="${area}" data-section="ej5" data-id="ej5_prio_val_${i}"
                                onchange="PriorityManager.handlePriorityChange()">
                            <option value="">Prioridad...</option>
                            <option value="1">1 (Máxima)</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4 (Mínima)</option>
                        </select>
                    </div>
                    <div class="w-full md:w-2/3">
                        <textarea class="autosave-input w-full mt-1 p-2 border rounded text-sm" data-section="ej5" data-id="ej5_prio_reason_${i}" placeholder="¿Por qué es prioridad?"></textarea>
                    </div>
                </div>
            </div>
        `).join('');
    },

    handlePriorityChange: function() {
        const selectors = document.querySelectorAll('.priority-selector');
        let priorityOneArea = "";

        selectors.forEach(sel => {
            if (sel.value === "1") priorityOneArea = sel.dataset.area;
        });

        if (priorityOneArea) {
            document.getElementById('selected-priority-area').innerText = priorityOneArea;
            this.renderTactics(priorityOneArea);
            document.getElementById('step-3').classList.remove('hidden-step');
        } else {
            document.getElementById('step-3').classList.add('hidden-step');
        }
    },

    renderTactics: function(area) {
        const container = document.getElementById('tactics-container');
        const tactics = this.tacticsData[area] || [];
        
        container.innerHTML = tactics.map((tactic, i) => `
            <label class="flex items-center p-3 border rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                <input type="checkbox" class="tactic-checkbox h-5 w-5 text-brand-blue" 
                       value="${tactic}" data-section="ej5" data-id="ej5_tactic_${i}">
                <span class="ml-3 font-medium text-gray-700">${tactic}</span>
            </label>
        `).join('');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const navMenu = document.getElementById('nav-menu').querySelector('ul');

    // 1. Definición de Secciones de la Sesión C
    const sectionsData = [
        { id: 'ej1', title: '1. Diagnóstico de Consolidación', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2' },
        { id: 'ej2', title: '2. Plan de Acción', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'ej3', title: '3. Gestión de Inversiones', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
        { id: 'ej4', title: '4. Flujo de Caja Libre', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'ej5', title: '5. Prioridades de Negocio', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
    ];

    // 2. Generación dinámica de la navegación y contenedores
    sectionsData.forEach(data => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#${data.id}" class="nav-link flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${data.icon}" /></svg>
            <span>${data.title}</span>
        </a>`;
        navMenu.appendChild(li);

        const section = document.createElement('section');
        section.id = data.id;
        section.className = 'section-content bg-white shadow-xl rounded-2xl p-8 mb-8';
        mainContent.appendChild(section);
    });

    // 3. INYECCIÓN DEL EJERCICIO 1 (Contenido y Lógica)
    document.getElementById('ej1').innerHTML = `
        <h2 class="text-2xl font-bold brand-orange mb-4">${sectionsData[0].title}</h2>
    <div class="instructions-box">
        <p><strong>Meta Transformacional:</strong> Internalizar que tú no eres la empresa. Crear reglas claras te da libertad y protege tanto tu patrimonio como el negocio. Este es el primer paso para tomar decisiones de inversión profesionales.</p>
    </div>
    
    <div class="space-y-10">
        <div class="bg-gray-50 p-6 rounded-lg border">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Apartado A: Fijación de Sueldo del Fundador</h3>
            
            <div class="mb-6">
                <label class="block font-semibold text-gray-700 mb-2">1. ¿Has establecido un salario fijo para ti, o tus ingresos varían según el desempeño de la empresa?</label>
                <div class="flex flex-col space-y-2">
                    <label><input type="radio" name="salario_tipo" value="fijo" class="autosave-input form-radio" data-section="ej1" data-id="ej1_salario_tipo"> Salario fijo</label>
                    <label><input type="radio" name="salario_tipo" value="combinado" class="autosave-input form-radio" data-section="ej1" data-id="ej1_salario_tipo"> Combinación de fijo y variable</label>
                    <label><input type="radio" name="salario_tipo" value="variable" class="autosave-input form-radio" data-section="ej1" data-id="ej1_salario_tipo"> Totalmente variable</label>
                    <label><input type="radio" name="salario_tipo" value="ninguno" class="autosave-input form-radio" data-section="ej1" data-id="ej1_salario_tipo"> No recibo ingresos</label>
                </div>
            </div>

            <div class="mb-6">
                 <h4 class="font-semibold text-gray-700 mb-2">Tablas de Referencia (Sueldos en MXN/mes)</h4>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead><tr class="bg-gray-200"><th colspan="2" class="p-2">1. Referentes de mercado</th></tr></thead>
                            <tbody class="divide-y">
                                <tr class="bg-white"><td>Microempresa</td><td class="text-right">$25k – $40k</td></tr>
                                <tr class="bg-gray-50"><td>Pequeña empresa</td><td class="text-right">$30k – $45k</td></tr>
                                <tr class="bg-white"><td>Mediana empresa</td><td class="text-right">$45k – $60k</td></tr>
                                <tr class="bg-gray-50"><td><b>Director General Senior</b></td><td class="text-right"><b>Hasta $120,000+</b></td></tr>
                                <tr class="bg-white"><td>Promedio PYME</td><td class="text-right">$30k – $80k</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead><tr class="bg-gray-200"><th colspan="2" class="p-2">2. Límites por facturación</th></tr></thead>
                            <tbody class="divide-y">
                                <tr class="bg-white"><td>$300k – $1M</td><td class="text-right">$18k – $60k</td></tr>
                                <tr class="bg-gray-50"><td>$1M – $5M</td><td class="text-right">$30k – $90k</td></tr>
                                <tr class="bg-white"><td>$5M – $20M</td><td class="text-right">$60k – $200k</td></tr>
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>

            <div class="mb-6">
                <label class="block font-semibold text-gray-700 mb-2">2. Define un sueldo de mercado para tu puesto si contrataras a un externo competente para tus funciones operativas.</label>
                 <div class="pro-tip !mt-0 !mb-4"><p>(Opcional) Busca en bolsas de trabajo perfiles de referencia (Gerente comercial, de operaciones, etc.) para validar tu criterio.</p></div>
                <textarea placeholder="Basado en el mercado, un sueldo justo para mi rol sería..." class="autosave-input w-full p-3 border border-gray-300 rounded-lg h-24" data-section="ej1" data-id="ej1_salario_mercado"></textarea>
            </div>

            <div class="mb-6">
                <label class="block font-semibold text-gray-700 mb-2">3. Define o valida un rango de sueldo consistente y coherente con los criterios analizados.</label>
                <input type="text" placeholder="Mi sueldo fijo mensual será de..." class="autosave-input w-full p-3 border border-gray-300 rounded-lg" data-section="ej1" data-id="ej1_salario_definido">
            </div>

        </div>
        
        </div>
    `;

    document.getElementById('ej2').innerHTML = `
                <h2 class="text-2xl font-bold brand-orange mb-4">2. Plan de Acción para la Consolidación Financiera</h2>
                <div class="instructions-box">
                    <p><strong>Meta Transformacional:</strong> Formalizar tu relación financiera con la empresa y alinearla con tus metas de crecimiento, sentando las bases para una toma de decisiones de inversión profesional y estratégica.</p>
                </div>

                <div class="space-y-10">
                    <div class="bg-gray-50 p-6 rounded-lg border">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Apartado A: Definición de Políticas de Compensación y Utilidades</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label class="block font-semibold text-gray-700 mb-2">1. Tipo de Compensación del Dueño</label>
                                <div id="tipo-compensacion-group" class="flex flex-col space-y-2">
                                    <label><input type="radio" name="tipo_compensacion" value="fijo" class="autosave-input form-radio" data-section="ej2" data-id="ej2_tipo_comp"> Sueldo Fijo</label>
                                    <label><input type="radio" name="tipo_compensacion" value="variable" class="autosave-input form-radio" data-section="ej2" data-id="ej2_tipo_comp"> Compensación Variable (Reparto Utilidades)</label>
                                    <label><input type="radio" name="tipo_compensacion" value="mixto" class="autosave-input form-radio" data-section="ej2" data-id="ej2_tipo_comp" checked> Mixto (Sueldo Fijo + Bono por Utilidades)</label>
                                </div>
                            </div>
                            <div>
                                <label class="block font-semibold text-gray-700 mb-2">2. Prioridad de la Política de Utilidades</label>
                                <div class="flex flex-col space-y-2">
                                    <label><input type="radio" name="prioridad_utilidades" value="sostenimiento" class="autosave-input form-radio" data-section="ej2" data-id="ej2_prio_util"> Sostenimiento Operativo</label>
                                    <label><input type="radio" name="prioridad_utilidades" value="reinversion" class="autosave-input form-radio" data-section="ej2" data-id="ej2_prio_util" checked> Reinversión para Crecimiento</label>
                                    <label><input type="radio" name="prioridad_utilidades" value="monetizacion" class="autosave-input form-radio" data-section="ej2" data-id="ej2_prio_util"> Monetización/Capitalización Dueño</label>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 space-y-6">
                            <div id="sueldo-fijo-section">
                                <h4 class="font-semibold text-gray-700 border-b pb-2 mb-4">Política de Sueldo Fijo</h4>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label for="sueldo-fijo-actualizado" class="block text-sm font-medium text-gray-600">Sueldo fijo actualizado</label>
                                        <input type="text" id="sueldo-fijo-actualizado" placeholder="$50,000 MXN" class="autosave-input mt-1 w-full p-2 border rounded-md" data-section="ej2" data-id="ej2_sueldo_fijo">
                                    </div>
                                    <div>
                                        <label for="fecha-vigencia-fijo" class="block text-sm font-medium text-gray-600">Fecha vigencia actualización</label>
                                        <input type="date" id="fecha-vigencia-fijo" class="autosave-input mt-1 w-full p-2 border rounded-md" data-section="ej2" data-id="ej2_fecha_fijo">
                                    </div>
                                </div>
                            </div>
                            <div id="sueldo-variable-section">
                                <h4 class="font-semibold text-gray-700 border-b pb-2 mb-4">Política de Sueldo Variable</h4>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-600 mb-2">Periodicidad</label>
                                        <select class="autosave-input w-full p-2 border rounded-md" data-section="ej2" data-id="ej2_var_periodo">
                                            <option>Mensual</option>
                                            <option>Bimestral</option>
                                            <option selected>Trimestral</option>
                                            <option>Semestral</option>
                                            <option>Anual</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-600 mb-2">Tipo Reparto Utilidad</label>
                                        <div class="flex space-x-4">
                                            <label><input type="radio" name="tipo_reparto" value="porcentual" class="autosave-input form-radio" data-section="ej2" data-id="ej2_var_tipo_reparto" checked> Porcentual</label>
                                            <label><input type="radio" name="tipo_reparto" value="monto_base" class="autosave-input form-radio" data-section="ej2" data-id="ej2_var_tipo_reparto"> Monto Base</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <label for="monto-reparto" class="block text-sm font-medium text-gray-600">Porcentaje o Monto Base de Reparto</label>
                                    <input type="text" id="monto-reparto" placeholder="Ej: 15% sobre utilidad neta" class="autosave-input mt-1 w-full p-2 border rounded-md" data-section="ej2" data-id="ej2_var_monto">
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label for="fecha-vigencia-variable" class="block text-sm font-medium text-gray-600">Fecha vigencia</label>
                                        <input type="date" id="fecha-vigencia-variable" class="autosave-input mt-1 w-full p-2 border rounded-md" data-section="ej2" data-id="ej2_var_fecha_vigencia">
                                    </div>
                                    <div>
                                        <label for="fecha-revision-variable" class="block text-sm font-medium text-gray-600">Próxima Fecha Revisión</label>
                                        <input type="date" id="fecha-revision-variable" class="autosave-input mt-1 w-full p-2 border rounded-md" data-section="ej2" data-id="ej2_var_fecha_revision">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-lg border">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Apartado B: Alineación Estratégica - Metas y Proyectos</h3>
                        <div class="space-y-6">
                            <div>
                                <h4 class="font-semibold text-gray-700">Borrador de Metas Anuales Vigentes</h4>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                    <input type="text" placeholder="Meta de Ingreso Vigente" class="autosave-input p-2 border rounded-md" data-section="ej2" data-id="ej2_meta_ingreso">
                                    <input type="text" placeholder="Meta de Utilidad Vigente" class="autosave-input p-2 border rounded-md" data-section="ej2" data-id="ej2_meta_utilidad">
                                    <div>
                                        <label for="fecha-fijacion-metas" class="block text-xs text-gray-500">Fecha objetivo fijación definitiva</label>
                                        <input type="date" id="fecha-fijacion-metas" class="autosave-input w-full p-2 border rounded-md" data-section="ej2" data-id="ej2_meta_fecha">
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-700">Iniciativas de Inversión Estratégicas</h4>
                                <div class="space-y-2 mt-2">
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                                        <input type="text" placeholder="Proyecto 1: Nombre" class="autosave-input p-2 border rounded-md" data-section="ej2" data-id="ej2_proy1_nombre">
                                        <input type="text" placeholder="Enfoque (Ventas, Op, etc.)" class="autosave-input p-2 border rounded-md" data-section="ej2" data-id="ej2_proy1_enfoque">
                                        <input type="text" placeholder="Monto Estimado" class="autosave-input p-2 border rounded-md" data-section="ej2" data-id="ej2_proy1_monto">
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                                        <input type="text" placeholder="Proyecto 2: Nombre" class="autosave-input p-2 border rounded-md" data-section="ej2" data-id="ej2_proy2_nombre">
                                        <input type="text" placeholder="Enfoque" class="autosave-input p-2 border rounded-md" data-section="ej2" data-id="ej2_proy2_enfoque">
                                        <input type="text" placeholder="Monto Estimado" class="autosave-input p-2 border rounded-md" data-section="ej2" data-id="ej2_proy2_monto">
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                                        <input type="text" placeholder="Proyecto 3: Nombre" class="autosave-input p-2 border rounded-md" data-section="ej2" data-id="ej2_proy3_nombre">
                                        <input type="text" placeholder="Enfoque" class="autosave-input p-2 border rounded-md" data-section="ej2" data-id="ej2_proy3_enfoque">
                                        <input type="text" placeholder="Monto Estimado" class="autosave-input p-2 border rounded-md" data-section="ej2" data-id="ej2_proy3_monto">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-lg border">
                        <h3 class="text-xl font-bold text-gray-800 mb-2">Apartado C: Compromiso de Ejecución</h3>
                        <label for="fecha-compromiso-proyecto" class="block font-semibold text-gray-700">Fecha compromiso para tener iniciado un proyecto estratégico de crecimiento:</label>
                        <input type="date" id="fecha-compromiso-proyecto" class="autosave-input w-full md:w-1/2 mt-2 p-3 border rounded-lg" data-section="ej2" data-id="ej2_fecha_compromiso">
                    </div>
                </div>
            `;

            // Dentro de la función que gestiona el contenido del Ejercicio 3 en app.js
            const renderEjercicio3Completo = () => {
                const container = document.getElementById('ej3');
                const practices = [
                    "Conocías tu Flujo de Caja Libre (FCL) al momento de invertir.",
                    "Ponderaste la inversión según tu FCL contra otras posibles inversiones.",
                    "Evaluaste alternativas con posibilidad de mayor rentabilidad.",
                    "Respaldaste el monto requerido por escrito (cotización, plan, etc.).",
                    "Hiciste un cálculo para determinar una Rentabilidad Esperada (ROI).",
                    "Definiste un plazo específico para recuperar la inversión.",
                    "Identificaste los riesgos clave del proyecto.",
                    "Ajustaste la inversión o tomaste acciones para mitigar esos riesgos."
                ];

                container.innerHTML = `
                    <h2 class="text-3xl font-black brand-blue uppercase mb-6 font-montserrat">${sectionsData[2].title}</h2>
                    
                    <div class="instructions-box mb-8">
                        <p><strong>Meta Transformacional:</strong> Realizar una autoevaluación honesta de tus decisiones de inversión pasadas para identificar patrones, revelar puntos ciegos y cuantificar tus áreas de oportunidad, creando así la necesidad de un método robusto para el futuro.</p>
                    </div>

                    <div class="mb-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <h3 class="text-xl font-bold text-gray-800 mb-4 font-montserrat">Paso 1: Define tus Inversiones a Evaluar</h3>
                        <p class="text-gray-600 mb-4">Piensa en las 3 inversiones más importantes (contrataciones, equipo, marketing, etc.) que has realizado en los últimos 12 meses.</p>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            ${[1, 2, 3].map(i => `
                                <input type="text" id="inv-name-${i}" placeholder="Inversión (Nuevo Vendedor/Maquinaria/Campaña Ads)${i}" 
                                    class="autosave-input w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-blue outline-none" 
                                    data-section="ej3" data-id="ej3_inv_name_${i}"
                                    oninput="document.getElementById('header-inv-${i}').innerText = this.value || 'Inversión ${i}'">
                            `).join('')}
                        </div>
                    </div>

                    <div class="mb-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <h3 class="text-xl font-bold text-gray-800 mb-2 font-montserrat">Paso 2: Autoevaluación Retrospectiva</h3>
                        <p class="text-gray-600 mb-4">Para cada inversión, evalúa honestamente si aplicaste las siguientes buenas prácticas. (Sí = 2 pts, Parcial = 1 pto, No = 0 pts)</p>
                        
                        <div class="overflow-x-auto">
                            <table class="w-full border-collapse">
                                <thead>
                                    <tr class="bg-gray-50">
                                        <th class="p-4 border-b text-left text-xs font-black text-gray-400 uppercase">Buena Práctica de Inversión</th>
                                        <th id="header-inv-1" class="p-4 border-b text-center text-xs font-black brand-blue uppercase">Inversión 1</th>
                                        <th id="header-inv-2" class="p-4 border-b text-center text-xs font-black brand-blue uppercase">Inversión 2</th>
                                        <th id="header-inv-3" class="p-4 border-b text-center text-xs font-black brand-blue uppercase">Inversión 3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${practices.map((practice, pIdx) => `
                                        <tr class="hover:bg-gray-50/50 transition-colors">
                                            <td class="p-4 border-b text-sm text-gray-700 font-semibold">${practice}</td>
                                            ${[1, 2, 3].map(invIdx => `
                                                <td class="p-4 border-b text-center">
                                                    <select class="autosave-input ej3-score-select w-full p-1 text-xs border rounded" 
                                                            data-section="ej3" data-id="ej3_score_p${pIdx}_i${invIdx}"
                                                            onchange="calculateEj3Scores()">
                                                        <option value="0">No (0)</option>
                                                        <option value="1">Parcial (1)</option>
                                                        <option value="2">Sí (2)</option>
                                                    </select>
                                                </td>
                                            `).join('')}
                                        </tr>
                                    `).join('')}
                                </tbody>
                                <tfoot>
                                    <tr class="bg-blue-50/50">
                                        <td class="p-4 font-bold text-gray-800">Score de Inversión (Máx. 16)</td>
                                        <td id="res-score-1" class="p-4 text-center font-black brand-blue text-lg">0</td>
                                        <td id="res-score-2" class="p-4 text-center font-black brand-blue text-lg">0</td>
                                        <td id="res-score-3" class="p-4 text-center font-black brand-blue text-lg">0</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="bg-blue-50 p-8 rounded-xl border border-blue-100 text-center">
                            <h3 class="text-xl font-bold text-gray-800 mb-2 text-center">Tus Resultados</h3>
                            <p class="text-gray-600">Score General de Madurez en Inversión</p>
                            <div id="general-percentage" class="text-6xl font-black brand-orange mb-4">0%</div>
                            <p id="score-feedback" class="text-gray-600 italic">Define tus inversiones para comenzar.</p>
                        </div>
                        <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 class="text-lg font-bold brand-blue mb-4">Paso 3: Reflexión Estratégica</h3>
                            <label for="reflection" class="text-gray-600 mb-2 block">Basado en tu score, ¿cuál es el área de oportunidad N°1 que revela este diagnóstico en tu proceso de toma de decisiones?</label>
                         <textarea id="reflection" rows="4" placeholder="Ej: Necesito calcular siempre el Flujo de Caja Libre antes de decidir..." class="autosave-input w-full p-3 border border-gray-300 rounded-lg" data-section="ej3" data-id="ej3_reflection"></textarea>
                        </div>
                    </div>
                `;
            };
            renderEjercicio3Completo();

            const ej4HTML = `
                <h2 class="text-2xl font-bold brand-orange mb-4">4. Cálculo de Flujo de Caja Libre</h2>
                <div class="instructions-box">
                    <p><strong>Meta Transformacional:</strong> Transformar el cálculo del FCL de una simple resta a un diagnóstico dinámico de tu capacidad real de inversión, capturando la estacionalidad de tu negocio para tomar decisiones financieras más inteligentes.</p>
                </div>
            
                <div id="fcl-container-2-2" class="mt-6">
                    <div class="border-b border-gray-200 mb-6">
                        <nav class="-mb-px flex space-x-4" aria-label="Tabs">
                            <button class="fcl-tab-button-2-2 active whitespace-nowrap py-3 px-4 border-b-4 font-medium text-lg" data-tab="calculator">Mi Calculadora FCL</button>
                            <button class="fcl-tab-button-2-2 whitespace-nowrap py-3 px-4 border-b-4 font-medium text-lg" data-tab="example">Ejemplo Guiado</button>
                        </nav>
                    </div>
                    <div id="calculator-content-2-2" class="fcl-tab-content-2-2 active">
                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <p class="text-gray-600">Introduce los datos de tu empresa para un análisis de 3 o 6 meses.</p>
                            <div class="inline-flex rounded-lg shadow-sm flex-shrink-0">
                                <button id="view-3m-2-2" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-500">3 Meses</button>
                                <button id="view-6m-2-2" class="px-4 py-2 text-sm font-medium text-white bg-brand-blue border border-gray-200 rounded-r-lg hover:bg-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-500">6 Meses</button>
                            </div>
                        </div>
                        <div class="overflow-x-auto mb-8">
                            <table class="min-w-full" id="fcl-input-table-2-2"></table>
                        </div>
                        <div id="fcl-results-container-2-2" class="bg-gray-50 p-6 rounded-xl border hidden">
                            <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">Diagnóstico y Capacidad de Inversión</h3>
                            <div class="mb-6">
                                <h4 class="font-bold text-gray-700 mb-2">Diagnóstico Mensual de FCL</h4>
                                <div id="monthly-fcl-results-2-2" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center"></div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div class="bg-white p-4 rounded-lg shadow text-center">
                                    <p class="text-sm text-gray-500">Promedio de Flujo de Caja Libre Mensual</p>
                                    <p id="avg-monthly-fcl-2-2" class="text-2xl font-bold text-brand-blue">$0.00</p>
                                </div>
                                <div class="bg-white p-4 rounded-lg shadow text-center">
                                    <p class="text-sm text-gray-500">Proyección Anualizada de FCL</p>
                                    <p id="annual-fcl-2-2" class="text-2xl font-bold text-brand-blue">$0.00</p>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-bold text-gray-700 mb-3 text-center">Ponderación de Capacidad de Inversión Anual</h4>
                                <div class="space-y-3">
                                    <div id="semaphore-green-2-2" class="flex items-center p-3 bg-green-100 border-l-4 border-green-500 rounded-r-lg">
                                        <div class="w-8 h-8 rounded-full bg-green-500 flex-shrink-0"></div>
                                        <div class="ml-4">
                                            <p class="font-bold text-green-800">Inversión Segura (0% - 8%)</p>
                                            <p class="text-sm text-green-700 font-medium">$0.00 - $0.00</p>
                                        </div>
                                    </div>
                                    <div id="semaphore-blue-2-2" class="flex items-center p-3 bg-blue-100 border-l-4 border-blue-500 rounded-r-lg">
                                        <div class="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0"></div>
                                        <div class="ml-4">
                                            <p class="font-bold text-blue-800">Inversión Calculada (8% - 20%)</p>
                                            <p class="text-sm text-blue-700 font-medium">$0.00 - $0.00</p>
                                        </div>
                                    </div>
                                    <div id="semaphore-yellow-2-2" class="flex items-center p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded-r-lg">
                                        <div class="w-8 h-8 rounded-full bg-yellow-500 flex-shrink-0"></div>
                                        <div class="ml-4">
                                            <p class="font-bold text-yellow-800">Inversión de Alto Riesgo (21% - 70%)</p>
                                            <p class="text-sm text-yellow-700 font-medium">$0.00 - $0.00</p>
                                        </div>
                                    </div>
                                    <div id="semaphore-red-2-2" class="flex items-center p-3 bg-red-100 border-l-4 border-red-500 rounded-r-lg">
                                        <div class="w-8 h-8 rounded-full bg-red-500 flex-shrink-0"></div>
                                        <div class="ml-4">
                                            <p class="font-bold text-red-800">Riesgo de Descapitalización (71% - 100%)</p>
                                            <p class="text-sm text-red-700 font-medium">$0.00 - $0.00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="example-content-2-2" class="fcl-tab-content-2-2">
                        <div class="bg-white p-2 sm:p-6 rounded-lg">
                            <h3 class="text-2xl font-bold brand-orange mb-2">Ejemplo Guiado: "Creativa Digital"</h3>
                            <div class="analysis-point mb-6">
                                <p><strong>Perfil de la Empresa:</strong> Agencia de marketing con 5 empleados, con ingresos variables por proyectos y altos gastos fijos. Acaban de invertir en equipo y personal, y ahora enfrentan una caída estacional de ventas en verano.</p>
                            </div>
                            <div class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">Concepto</th>
                                            <th class="px-4 py-3 text-right font-medium text-gray-500 uppercase">Mes 1</th>
                                            <th class="px-4 py-3 text-right font-medium text-gray-500 uppercase">Mes 2</th>
                                            <th class="px-4 py-3 text-right font-medium text-gray-500 uppercase">Mes 3</th>
                                            <th class="px-4 py-3 text-right font-medium text-gray-500 uppercase">Mes 4</th>
                                            <th class="px-4 py-3 text-right font-medium text-gray-500 uppercase">Mes 5</th>
                                            <th class="px-4 py-3 text-right font-medium text-gray-500 uppercase">Mes 6</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr class="bg-blue-50"><td colspan="7" class="px-4 py-2 font-bold text-blue-800">INGRESOS</td></tr>
                                        <tr><td class="px-4 py-3">Ingresos por Ventas (Cobrados)</td><td class="px-4 py-3 text-right">$15,000</td><td class="px-4 py-3 text-right">$16,000</td><td class="px-4 py-3 text-right">$15,500</td><td class="px-4 py-3 text-right text-red-600">$8,000</td><td class="px-4 py-3 text-right text-red-600">$9,000</td><td class="px-4 py-3 text-right">$14,000</td></tr>
                                        <tr><td class="px-4 py-3">Otros Ingresos (Promedio)</td><td class="px-4 py-3 text-right">$500</td><td class="px-4 py-3 text-right">$500</td><td class="px-4 py-3 text-right">$500</td><td class="px-4 py-3 text-right">$500</td><td class="px-4 py-3 text-right">$500</td><td class="px-4 py-3 text-right">$500</td></tr>
                                        <tr class="bg-red-50"><td colspan="7" class="px-4 py-2 font-bold text-red-800">GASTOS FIJOS</td></tr>
                                        <tr><td class="px-4 py-3">Renta</td><td class="px-4 py-3 text-right">($1,500)</td><td class="px-4 py-3 text-right">($1,500)</td><td class="px-4 py-3 text-right">($1,500)</td><td class="px-4 py-3 text-right">($1,500)</td><td class="px-4 py-3 text-right">($1,500)</td><td class="px-4 py-3 text-right">($1,500)</td></tr>
                                        <tr><td class="px-4 py-3">Sueldos</td><td class="px-4 py-3 text-right">($6,000)</td><td class="px-4 py-3 text-right">($6,000)</td><td class="px-4 py-3 text-right">($6,000)</td><td class="px-4 py-3 text-right">($6,000)</td><td class="px-4 py-3 text-right">($6,000)</td><td class="px-4 py-3 text-right">($6,000)</td></tr> 
                                        <tr><td class="px-4 py-3">Otros Gastos Fijos (Promedio)</td><td class="px-4 py-3 text-right">($500)</td><td class="px-4 py-3 text-right">($500)</td><td class="px-4 py-3 text-right">($500)</td><td class="px-4 py-3 text-right">($500)</td><td class="px-4 py-3 text-right">($500)</td><td class="px-4 py-3 text-right">($500)</td></tr>
                                        <tr class="bg-yellow-50"><td colspan="7" class="px-4 py-2 font-bold text-yellow-800">GASTOS VARIABLES</td></tr>
                                        <tr><td class="px-4 py-3">Costo de Ventas</td><td class="px-4 py-3 text-right">($3,000)</td><td class="px-4 py-3 text-right">($3,200)</td><td class="px-4 py-3 text-right">($3,100)</td><td class="px-4 py-3 text-right">($1,600)</td><td class="px-4 py-3 text-right">($1,800)</td><td class="px-4 py-3 text-right">($2,800)</td></tr>
                                         <tr><td class="px-4 py-3">Promoción</td><td class="px-4 py-3 text-right">($1,000)</td><td class="px-4 py-3 text-right">($1,000)</td><td class="px-4 py-3 text-right">($1,000)</td><td class="px-4 py-3 text-right">($500)</td><td class="px-4 py-3 text-right">($500)</td><td class="px-4 py-3 text-right">($1,000)</td></tr>
                                         <tr><td class="px-4 py-3">Otros Gastos Variables (Promedio)</td><td class="px-4 py-3 text-right">($200)</td><td class="px-4 py-3 text-right">($200)</td><td class="px-4 py-3 text-right">($200)</td><td class="px-4 py-3 text-right">($200)</td><td class="px-4 py-3 text-right">($200)</td><td class="px-4 py-3 text-right">($200)</td></tr>
                                        </tbody>
                                    <tfoot class="bg-gray-100">
                                        <tr class="font-bold text-base">
                                            <td class="px-4 py-4 whitespace-nowrap brand-blue">Flujo de Caja Libre (FCL)</td>
                                            <td class="px-4 py-4 text-right text-green-600">$3,300</td>
                                            <td class="px-4 py-4 text-right text-green-600">$4,100</td>
                                            <td class="px-4 py-4 text-right text-green-600">$3,700</td>
                                            <td class="px-4 py-4 text-right text-red-600">($2,300)</td>
                                            <td class="px-4 py-4 text-right text-red-600">($1,500)</td>
                                            <td class="px-4 py-4 text-right text-green-600">$2,500</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                             <div class="analysis-point mt-6">
                                <p><strong>Análisis del Ejemplo:</strong> El FCL promedio mensual es de $1,633, lo que da una proyección anualizada de $19,600. Esto significa que una inversión "segura" (verde) para Creativa Digital sería de hasta $1,568 al año. Una inversión de $5,000 (como el software que querían comprar) representaría el 25.5% de su FCL anual, cayendo en la categoría de <strong>Alto Riesgo (Amarillo)</strong>.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('ej4').innerHTML = ej4HTML;
                FCLManager.init();

            document.getElementById('ej5').innerHTML = `
                <div class="max-w-7xl mx-auto">
                    <h2 class="text-2xl font-bold brand-orange mb-4">5. Análisis Rápido de Prioridades de Negocio</h2>
                    <div class="instructions-box">
                        <p><strong>Meta Transformacional:</strong> Pasar de una lista de ideas a un enfoque estratégico claro. Este ejercicio te guiará para identificar tu área de mayor prioridad y definir las iniciativas clave que impulsarán tu crecimiento.</p>
                    </div>

                    <div class="space-y-8">
                        <div id="step-1" class="step-content">
                            <h3 class="text-xl font-bold text-gray-800 mb-2">Paso 1: Lluvia de Ideas Estratégicas</h3>
                            <label class="text-gray-600 mb-4 block">Primero, haz una lluvia de ideas. Escribe hasta 5 prioridades de mejora o crecimiento que tengas en mente para tu negocio.</label>
                            <div class="space-y-2">
                                <input type="text" placeholder="Prioridad 1..." class="autosave-input w-full p-3 border border-gray-300 rounded-lg" data-section="ej5" data-id="ej5_prio1">
                                <input type="text" placeholder="Prioridad 2..." class="autosave-input w-full p-3 border border-gray-300 rounded-lg" data-section="ej5" data-id="ej5_prio2">
                                <input type="text" placeholder="Prioridad 3..." class="autosave-input w-full p-3 border border-gray-300 rounded-lg" data-section="ej5" data-id="ej5_prio3">
                                <input type="text" placeholder="Prioridad 4..." class="autosave-input w-full p-3 border border-gray-300 rounded-lg" data-section="ej5" data-id="ej5_prio4">
                                <input type="text" placeholder="Prioridad 5..." class="autosave-input w-full p-3 border border-gray-300 rounded-lg" data-section="ej5" data-id="ej5_prio5">
                            </div>
                            <div class="text-right mt-4">
                                <button id="btn-start-analysis" class="bg-brand-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-800 transition-colors">Terminé la lluvia de ideas, iniciar análisis</button>
                            </div>
                        </div>

                        <div id="guided-analysis-container" class="hidden space-y-8">
                            <div class="mb-4">
                                <button id="btn-back-to-brainstorm" class="flex items-center gap-2 text-brand-blue font-semibold hover:text-blue-800 transition-colors">
                                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                    Regresar a Lluvia de Ideas
                                </button>
                            </div>

                            <div id="step-2" class="step-content">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Paso 2: Priorización de Áreas Clave</h3>
                                <p class="text-gray-600 mb-4">Ahora, vamos a estructurar. Asigna una prioridad del 1 (más importante) al 4 a cada área estratégica y explica brevemente tu razonamiento.</p>
                                <div id="priority-areas-container" class="space-y-4">
                                    </div>
                            </div>

                            <div id="step-3" class="step-content hidden-step">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Paso 3: Selección de Tácticas</h3>
                                <p class="text-gray-600 mb-4">Basado en tu prioridad máxima (<strong id="selected-priority-area" class="brand-orange"></strong>), selecciona 2 tácticas de interés para enfocar tus esfuerzos.</p>
                                <div id="tactics-container" class="space-y-4">
                                    </div>
                            </div>
                            
                            <div id="step-4" class="step-content hidden-step">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Paso 4: Detalle de Iniciativas</h3>
                                <p class="text-gray-600 mb-4">Finalmente, detalla una iniciativa concreta para cada una de las tácticas que seleccionaste.</p>
                                <div id="initiatives-container" class="space-y-6">
                                    </div>
                            </div>

                            <div id="step-5" class="step-content hidden-step">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Paso 5: Síntesis de Prioridades de Inversión</h3>
                                <p class="text-gray-600 mb-4">Este es el resumen de tu enfoque estratégico. Estas son las iniciativas que evaluarás en los siguientes ejercicios.</p>
                                <div id="synthesis-container" class="bg-blue-50 border border-blue-200 p-6 rounded-lg space-y-4">
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // CONEXIÓN QUIRÚRGICA: Inicializamos el motor del Ejercicio 5 tras inyectar el HTML
            PriorityManager.init();

    // 4. Lógica de Navegación y Persistencia (Heredada de Sesión A)
    function showSection(hash) {
        const id = hash.replace('#', '') || 'ej1';
        document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        const target = document.getElementById(id);
        const link = document.querySelector(`a[href="#${id}"]`);
        
        if (target) target.classList.add('active');
        if (link) link.classList.add('active');
        window.scrollTo(0, 0);
    }
    window.addEventListener('hashchange', () => showSection(window.location.hash));


    showSection(window.location.hash);
});