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

        // Identificación de Áreas de Oportunidad (Sin consejos)
        const practiceLabels = [
            "Conocimiento del FCL", "Ponderación vs FCL", "Análisis de Alternativas", 
            "Respaldo Documental", "Cálculo de ROI", "Definición de Plazos", 
            "Identificación de Riesgos", "Mitigación de Riesgos"
        ];
        
        const opportunityAreas = [];
        for (let pIdx = 0; pIdx < 8; pIdx++) {
            let pScore = 0;
            for (let i = 1; i <= 3; i++) {
                pScore += parseInt(document.querySelector(`[data-id="ej3_score_p${pIdx}_i${i}"]`)?.value || 0);
            }
            if (pScore < 4) opportunityAreas.push(practiceLabels[pIdx]); // Si el promedio es menor a "Parcial" en las 3 inversiones
        }

        const areasList = document.getElementById('ej3-areas-list');
        const areasConclusion = document.getElementById('ej3-areas-conclusion');
        const ctaContainer = document.getElementById('cta-container-ej3');

        if (opportunityAreas.length > 0) {
            areasConclusion.classList.remove('hidden');
            ctaContainer.classList.remove('hidden');
            areasList.innerHTML = opportunityAreas.map(area => `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold border border-gray-200">${area}</span>`).join('');
        }
    }
};

// Función Global de CTA para Consultoría
window.sendConsultancyEmail = function(exerciseId) {
    const email = "contacto@miempresacrece.com.mx";
    const reflection = document.getElementById('reflection')?.value || "No se incluyó reflexión adicional.";
    const name = document.querySelector('[data-id="sesionc_nombre_participante"]')?.value || "Empresario";
    
    let subject = `Solicitud de Asesoría - Workbook Sesión C`;
    let body = `Hola equipo de Mi Empresa Crece,\n\nMi nombre es ${name}.\n\nHe terminado mi autodiagnóstico de inversión y he identificado la siguiente reflexión como mi prioridad actual:\n\n"${reflection}"\n\nMe gustaría recibir apoyo para profesionalizar mi proceso de toma de decisiones.`;

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/* === MOTOR LÓGICO DEL EJERCICIO 4: CALCULADORA FCL === */

const FCLManager = {
    currentMonths: 6, // Estado por defecto

    init: function() {
        this.renderTable();
        this.bindEvents();
        this.setupTabs();
        this.calculate();
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
        if (!container) return;
        
        container.classList.remove('hidden');

        // 1. Población de la cuadrícula mensual
        const monthlyContainer = document.getElementById('monthly-fcl-results-2-2');
        if (monthlyContainer) {
            monthlyContainer.innerHTML = results.map((val, i) => `
                <div class="bg-white p-2 rounded border shadow-sm">
                    <p class="text-[10px] uppercase font-bold text-gray-400">Mes ${i + 1}</p>
                    <p class="font-bold ${val < 0 ? 'text-red-500' : 'text-green-600'}">
                        ${new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN', maximumFractionDigits: 0}).format(val)}
                    </p>
                </div>
            `).join('');
        }

        const avg = total / this.currentMonths;
        const annual = avg * 12;

        document.getElementById('avg-monthly-fcl-2-2').innerText = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(avg);
        document.getElementById('annual-fcl-2-2').innerText = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(annual);

        // 2. Validación de Capacidad de Inversión
        const semaphoreContainer = document.querySelector('#fcl-results-container-2-2 .space-y-3');
        if (annual <= 0) {
            // Si no hay flujo positivo, ocultamos rangos y avisamos al usuario
            document.querySelectorAll('[id^="semaphore-"] p.text-sm').forEach(p => p.innerText = "Sin capacidad (FCL Negativo)");
        } else {
            // Si hay flujo positivo, procedemos con los cálculos de semáforos
            this.updateSemaphores(annual);
        }
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
            this.calculate(); // Sincroniza el dashboard inmediatamente con la nueva vista
        });
        document.getElementById('view-6m-2-2').addEventListener('click', () => {
            this.currentMonths = 6;
            this.renderTable();
            this.updateButtonUI('view-6m-2-2', 'view-3m-2-2');
            this.calculate(); // Sincroniza el dashboard inmediatamente con la nueva vista
        });
    },

    updateButtonUI: function(activeId, inactiveId) {
        document.getElementById(activeId).className = "px-4 py-2 text-sm font-medium text-white bg-brand-blue border rounded-lg";
        document.getElementById(inactiveId).className = "px-4 py-2 text-sm font-medium text-gray-900 bg-white border rounded-lg hover:bg-gray-100";
    }
};

/* === MOTOR LÓGICO DEL EJERCICIO 6: EVALUACIÓN DEL RENDIMIENTO === */

const PerformanceManager = {
    calculateROI: function() {
        const monto = parseFloat(document.getElementById('monto-inversion-e6')?.value) || 0;
        const rendimiento = parseFloat(document.getElementById('rendimiento-total-e6')?.value) || 0;
        const plazo = parseFloat(document.getElementById('plazo-e6')?.value) || 0;
        
        const display = document.getElementById('rendimiento-anualizado-result');
        const semaforo = document.getElementById('semaforo-rendimiento');

        if (!display || !semaforo) return;

        if (monto === 0 || plazo === 0) {
            display.textContent = '0%';
            semaforo.textContent = 'Introduce datos';
            semaforo.className = 'semaforo-indicator bg-gray-400 inline-block';
            return;
        }

        // FÓRMULA DE NEGOCIO: ROI Anualizado = (Rendimiento / Monto) / (Plazo / 12)
        const roi = (rendimiento / monto) / (plazo / 12) * 100;
        display.textContent = `${roi.toFixed(1)}%`;

        // Lógica de semaforización según Workbook2.html
        if (roi <= 10) {
            semaforo.textContent = 'Bajo Interés';
            semaforo.className = 'semaforo-indicator bg-red-500 inline-block';
        } else if (roi <= 20) {
            semaforo.textContent = 'Comparable';
            semaforo.className = 'semaforo-indicator bg-blue-500 inline-block';
        } else if (roi <= 30) {
            semaforo.textContent = 'Aceptable';
            semaforo.className = 'semaforo-indicator bg-blue-700 inline-block';
        } else {
            semaforo.textContent = 'Excelente';
            semaforo.className = 'semaforo-indicator bg-green-500 inline-block';
        }
    },

    handleQualitativeChange: function(val) {
        const calificacion = document.getElementById('calificacion-final-e6');
        if (!calificacion) return;

        const config = {
            verde: { t: 'Estratégica', c: 'bg-green-500' },
            azul: { t: 'Táctica', c: 'bg-blue-500' },
            amarillo: { t: 'Ordinaria', c: 'bg-yellow-500 text-black' },
            rojo: { t: 'Bajo Impacto', c: 'bg-red-500' },
            default: { t: 'Selecciona', c: 'bg-gray-400' }
        };

        const result = config[val] || config.default;
        calificacion.textContent = result.t;
        calificacion.className = `semaforo-indicator inline-block mt-2 ${result.c}`;
    }
};

/* === MOTOR LÓGICO DEL EJERCICIO 7: EVALUACIÓN DEL MONTO === */

const AmountManager = {
    proyectoCount: 0,

    calculateFCLMonths: function() {
        const fcl = parseFloat(document.getElementById('fcl-mensual-e7')?.value) || 0;
        const monto = parseFloat(document.getElementById('monto-inversion-e7')?.value) || 0;
        const res = document.getElementById('meses-fcl-result');
        const semaforo = document.getElementById('semaforo-meses-fcl');

        if (!res || !semaforo) return;

        if (fcl === 0) {
            res.textContent = '0';
            semaforo.textContent = 'Introduce FCL';
            semaforo.className = 'semaforo-indicator bg-gray-400 inline-block mt-2';
            return;
        }

        const meses = monto / fcl;
        res.textContent = meses.toFixed(1);

        if (meses <= 1) {
            semaforo.textContent = 'Bajo Impacto';
            semaforo.className = 'semaforo-indicator bg-green-500 inline-block mt-2';
        } else if (meses <= 3) {
            semaforo.textContent = 'Impacto Moderado';
            semaforo.className = 'semaforo-indicator bg-yellow-500 text-black inline-block mt-2';
        } else {
            semaforo.textContent = 'Alto Impacto';
            semaforo.className = 'semaforo-indicator bg-red-500 inline-block mt-2';
        }
        this.updateConsumoFCL();
    },

    updateConsumoFCL: function() {
        const fclMensual = parseFloat(document.getElementById('fcl-mensual-e7')?.value) || 0;
        const fclAnual = fclMensual * 12;
        const displayAnual = document.getElementById('fcl-anual-display');
        
        if (displayAnual) {
            displayAnual.textContent = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(fclAnual);
        }

        let totalInv = 0;
        // Sumar la inversión actual que se está evaluando
        totalInv += parseFloat(document.getElementById('monto-inversion-e7')?.value) || 0;
        
        // Sumar otros proyectos dinámicos
        document.querySelectorAll('.proyecto-monto-e7').forEach(input => {
            totalInv += parseFloat(input.value) || 0;
        });

        const totalDisplay = document.getElementById('total-consumo-e7');
        const percentDisplay = document.getElementById('porcentaje-consumo-e7');
        const bar = document.getElementById('consumo-bar-e7');
        const semaforo = document.getElementById('semaforo-consumo-e7');

        if (totalDisplay) totalDisplay.textContent = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(totalInv);

        if (fclAnual === 0) {
            if (percentDisplay) percentDisplay.textContent = '0';
            if (bar) bar.style.width = '0%';
            return;
        }

        const p = (totalInv / fclAnual) * 100;
        if (percentDisplay) percentDisplay.textContent = p.toFixed(1);
        if (bar) bar.style.width = `${Math.min(p, 100)}%`;

        if (p <= 20) {
            semaforo.textContent = 'Nivel Saludable';
            semaforo.className = 'text-center font-bold text-sm p-2 mt-2 rounded-md bg-green-100 text-green-800';
        } else if (p <= 50) {
            semaforo.textContent = 'Nivel Considerable';
            semaforo.className = 'text-center font-bold text-sm p-2 mt-2 rounded-md bg-yellow-100 text-yellow-800';
        } else {
            semaforo.textContent = '¡Alerta! Alto Riesgo';
            semaforo.className = 'text-center font-bold text-sm p-2 mt-2 rounded-md bg-red-100 text-red-800';
        }
    },

    addProyecto: function() {
        if (this.proyectoCount >= 5) return;
        this.proyectoCount++;
        
        const container = document.getElementById('proyectos-container-e7');
        const div = document.createElement('div');
        div.className = 'grid grid-cols-3 gap-2 items-center mb-2 animate-fade-in';
        div.innerHTML = `
            <input type="text" placeholder="Inversión adicional ${this.proyectoCount}" 
                class="autosave-input col-span-2 p-2 border rounded text-sm" 
                data-section="ej7" data-id="ej7_p${this.proyectoCount}_desc">
            <input type="number" placeholder="$ Monto" 
                class="autosave-input proyecto-monto-e7 p-2 border rounded text-right text-sm" 
                data-section="ej7" data-id="ej7_p${this.proyectoCount}_monto"
                oninput="AmountManager.updateConsumoFCL()">
        `;
        container.appendChild(div);
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

/* === MOTOR LÓGICO DEL EJERCICIO 8: EVALUACIÓN DEL PLAZO === */

const TimeManager = {
    evaluate: function() {
        const input = document.getElementById('plazo-inversion-e8');
        const semaforo = document.getElementById('semaforo-plazo');
        const feedback = document.getElementById('feedback-plazo');

        if (!input || !semaforo || !feedback) return;

        const meses = parseFloat(input.value) || 0;

        if (input.value === "" || meses <= 0) {
            semaforo.textContent = 'Introduce un plazo';
            semaforo.className = 'semaforo-indicator bg-gray-400 inline-block mt-2 text-lg';
            feedback.textContent = '';
            return;
        }

        // Lógica de semaforización: Menor tiempo = Menor riesgo de liquidez
        if (meses <= 3) {
            semaforo.textContent = 'Excelente (0-3 meses)';
            semaforo.className = 'semaforo-indicator bg-green-500 inline-block mt-2 text-lg';
            feedback.textContent = 'Recuperación muy rápida. Ideal para mantener alta liquidez y reinvertir pronto.';
        } else if (meses <= 6) {
            semaforo.textContent = 'Bueno (3-6 meses)';
            semaforo.className = 'semaforo-indicator bg-blue-500 inline-block mt-2 text-lg';
            feedback.textContent = 'Buen plazo de recuperación. Permite una rotación de capital ágil.';
        } else if (meses <= 12) {
            semaforo.textContent = 'Aceptable (6-12 meses)';
            semaforo.className = 'semaforo-indicator bg-yellow-500 text-black inline-block mt-2 text-lg';
            feedback.textContent = 'Plazo estándar. Evalúa si este tiempo inmoviliza capital necesario para otras áreas.';
        } else if (meses <= 18) {
            semaforo.textContent = 'Precaución (12-18 meses)';
            semaforo.className = 'semaforo-indicator bg-orange-500 inline-block mt-2 text-lg';
            feedback.textContent = 'Plazo largo. El riesgo aumenta ante cambios imprevistos en el mercado.';
        } else {
            semaforo.textContent = 'Alto Riesgo (+18 meses)';
            semaforo.className = 'semaforo-indicator bg-red-500 inline-block mt-2 text-lg';
            feedback.textContent = 'Plazo muy largo. Compromete la liquidez operativa por un tiempo considerable.';
        }
    }
};

/* === MOTOR LÓGICO DEL EJERCICIO 9: EVALUACIÓN DEL RIESGO === */

const RiskManager = {
    riskCount: 0,

    init: function() {
        // Añadimos 2 filas iniciales por defecto
        if (this.riskCount === 0) {
            this.addRiskRow();
            this.addRiskRow();
        }
    },

    addRiskRow: function() {
        this.riskCount++;
        const container = document.getElementById('risk-table-body');
        if (!container) return;

        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-gray-50 transition-colors animate-fade-in';
        tr.innerHTML = `
            <td class="p-3">
                <input type="text" placeholder="Ej: Falla de proveedor" 
                    class="autosave-input w-full p-2 border rounded text-sm" 
                    data-section="ej9" data-id="ej9_r${this.riskCount}_desc">
            </td>
            <td class="p-3">
                <select class="autosave-input w-full p-2 border rounded text-sm risk-level-select" 
                    data-section="ej9" data-id="ej9_r${this.riskCount}_level"
                    onchange="RiskManager.updateRowStyle(this)">
                    <option value="bajo">Bajo</option>
                    <option value="medio" selected>Medio</option>
                    <option value="alto">Alto</option>
                    <option value="critico">Crítico</option>
                </select>
            </td>
            <td class="p-3">
                <textarea placeholder="Plan A: ¿Cómo lo evito?" 
                    class="autosave-input w-full p-2 border rounded text-xs h-16" 
                    data-section="ej9" data-id="ej9_r${this.riskCount}_mitigacion"></textarea>
            </td>
            <td class="p-3">
                <textarea placeholder="Plan B: ¿Qué hago si ocurre?" 
                    class="autosave-input w-full p-2 border rounded text-xs h-16" 
                    data-section="ej9" data-id="ej9_r${this.riskCount}_contingencia"></textarea>
            </td>
        `;
        container.appendChild(tr);
        // Disparamos el estilo inicial del select
        this.updateRowStyle(tr.querySelector('.risk-level-select'));
    },

    updateRowStyle: function(select) {
        const colors = {
            bajo: 'bg-green-100 text-green-800',
            medio: 'bg-yellow-100 text-yellow-800',
            alto: 'bg-orange-100 text-orange-800',
            critico: 'bg-red-100 text-red-800'
        };
        const val = select.value;
        select.className = `autosave-input w-full p-2 border rounded text-sm font-bold ${colors[val]}`;
    }
};

/* === MOTOR LÓGICO DEL EJERCICIO 10: EVALUACIÓN DEL PROPÓSITO === */

const PurposeManager = {
    init: function() {
        this.populateAreas();
    },

    populateAreas: function() {
        const areaSelect = document.getElementById('area-select-e10');
        if (!areaSelect) return;
        
        // Reutilizamos las áreas del PriorityManager
        const areas = Object.keys(PriorityManager.tacticsData);
        areaSelect.innerHTML = '<option value="">Selecciona Área Estratégica...</option>' + 
            areas.map(area => `<option value="${area}">${area}</option>`).join('');
    },

    handleAreaChange: function(area) {
        const tacticSelect = document.getElementById('tactic-select-e10');
        if (!tacticSelect) return;

        const tactics = PriorityManager.tacticsData[area] || [];
        tacticSelect.innerHTML = '<option value="">Selecciona Táctica...</option>' + 
            tactics.map(t => `<option value="${t}">${t}</option>`).join('');
        
        this.updatePitch();
    },

    updatePitch: function() {
        const area = document.getElementById('area-select-e10')?.value || "_______";
        const tactic = document.getElementById('tactic-select-e10')?.value || "_______";
        const objetivo = document.getElementById('objetivo-e10')?.value || "_______";
        const resultado = document.getElementById('resultado-e10')?.value || "_______";

        const pitchDisplay = document.getElementById('pitch-final-display');
        if (pitchDisplay) {
            pitchDisplay.innerHTML = `
                "Esta inversión en el área de <span class="text-brand-blue font-bold">${area}</span> 
                está diseñada para ejecutar la táctica de <span class="text-brand-blue font-bold">${tactic}</span>. 
                El propósito fundamental es <span class="text-brand-orange font-bold">${objetivo}</span>, 
                lo cual nos permitirá alcanzar <span class="text-brand-orange font-bold">${resultado}</span> en el corto/mediano plazo."
            `;
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const navMenu = document.getElementById('nav-menu').querySelector('ul');

    // 1. Definición de Secciones de la Sesión C (Fase 1 y Fase 2 Integradas)
    const sectionsData = [
        { id: 'ej1', title: '1. Diagnóstico de Consolidación', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2' },
        { id: 'ej2', title: '2. Plan de Acción', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'ej3', title: '3. Autoevaluación de gestión de inversiones', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
        { id: 'ej4', title: '4. Flujo de Caja Libre', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'ej5', title: '5. Prioridades de Negocio', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { id: 'ej6', title: '6. Evaluación del Rendimiento', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
        { id: 'ej7', title: '7. Evaluación del Monto', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
        { id: 'ej8', title: '8. Evaluación del Plazo', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'ej9', title: '9. Evaluación del Riesgo', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
        { id: 'ej10', title: '10. Evaluación del Propósito', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
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
        <p><strong>Objetivo Transformacional:</strong> Internalizar que tú no eres la empresa, para convertirte en el Arquitecto de tu patrimonio. Separar tu identidad de la del negocio es el primer filtro para tomar decisiones de inversión con la cabeza fría y no con el bolsillo personal.</p>
    </div>
    <div class="instructions-box !bg-gray-50 !border-brand-orange">
        <p><strong>Instrucciones:</strong> El desorden entre la cartera del dueño y la caja de la empresa es el mayor enemigo del crecimiento. Responde con objetividad para identificar tu nivel de consolidación financiera actual. El objetivo es definir un salario de mercado que permita a la empresa operar con costos reales y a ti tener estabilidad personal independiente de la operación diaria.</p>
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
                 <h4 class="font-semibold text-gray-700 mb-2">Tablas de Referencia (Sueldo autoasignado para un director)</h4>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-gray-200">
                                    <th class="p-2 text-left">1. Referentes de mercado</th>
                                    <th class="p-2 text-right">Sueldos en MXN/mes</th>
                                </tr>
                            </thead>
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
                            <thead>
                                <tr class="bg-gray-200">
                                    <th class="p-2 text-left">2. Rangos de facturación</th>
                                    <th class="p-2 text-right">Rango de Sueldo recomendable</th>
                                </tr>
                            </thead>
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
                 <div class="pro-tip !mt-0 !mb-4">
                    <p><strong>Pro-Tip del Consultor:</strong> Imagina que tu empresa es adquirida mañana. El nuevo dueño decide contratarte como Director General: ¿Qué sueldo te ofrecería el mercado para asegurar que el negocio siga operando y creciendo con tu talento, pero bajo una estructura profesional? Ese es tu verdadero <strong>valor de mercado</strong>; usar esta cifra hace que tu estructura de costos sea real.</p>
                </div>
                <textarea placeholder="Basado en el mercado, un sueldo justo para mi rol sería..." class="autosave-input w-full p-3 border border-gray-300 rounded-lg h-24" data-section="ej1" data-id="ej1_salario_mercado"></textarea>
            </div>

            <div class="mb-6">
                <label class="block font-semibold text-gray-700 mb-2">3. Define o valida un rango de sueldo consistente y coherente con los criterios analizados.</label>
                <p class="text-sm text-gray-600 mb-2 italic">(De acuerdo con las tablas de referencia 1, referencia 2 y ejercicio de referencia A, definete un sueldo realista coherente con los tres análisis anteriores.)</p>
                <input type="text" placeholder="Mi sueldo fijo mensual será de..." class="autosave-input w-full p-3 border border-gray-300 rounded-lg" data-section="ej1" data-id="ej1_salario_definido">
            </div>

        </div>
        
        </div>
    `;

    document.getElementById('ej2').innerHTML = `
                <h2 class="text-2xl font-bold brand-orange mb-4">2. Plan de Acción para la Consolidación Financiera</h2>
                <div class="instructions-box">
                    <p><strong>Objetivo Transformacional:</strong> Pasarás del caos reactivo al control estratégico. Al definir reglas claras de compensación y prioridades de reinversión, dejas de "sacar dinero" de la empresa para empezar a gestionar una entidad financiera profesional que alimenta tu visión a largo plazo.</p>
                </div>
                <div class="instructions-box !bg-gray-50 !border-brand-orange">
                    <p><strong>Instrucciones:</strong> Un plan sin políticas es solo una lista de deseos. Utiliza este apartado para formalizar cómo te pagará la empresa y qué destino prioritario tendrán las utilidades. Establecer estas "reglas de la casa" ahora es lo que permitirá que tus futuros proyectos de inversión tengan fondos etiquetados y protegidos del gasto corriente.</p>
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
            <p class="text-sm text-gray-600 mb-2 italic">(Define una meta que te parezca realista y deseable)</p>
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
            <p class="text-sm text-gray-600 mb-2 italic">(Entre tus líneas de producto y proyectos actuales en acción o planeados, define 3 que juntos te permitirían alcanzar esa meta)</p>
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
    <p class="text-sm text-gray-600 mb-4 italic">(Incorporar en video clip: comprométete a que empiece a suceder 1 de estos 3 proyectos de crecimiento, ponle fecha (mínimo producto viable, ejecución ágil, describe el proceso de iterar).)</p>
    <label for="fecha-compromiso-proyecto" class="block font-semibold text-gray-700">Fecha compromiso para tener iniciado un proyecto estratégico de crecimiento:</label>
    <input type="date" id="fecha-compromiso-proyecto" class="autosave-input w-full md:w-1/2 mt-2 p-3 border rounded-lg" data-section="ej2" data-id="ej2_fecha_compromiso">
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
                    
                    <div class="instructions-box">
                        <p><strong>Objetivo Transformacional:</strong> Identificarás tus "puntos ciegos" financieros. Al evaluar tus decisiones pasadas bajo la lupa del rigor técnico, descubrirás por qué algunas inversiones no dieron el fruto esperado y, lo más importante, aprenderás a calibrar tu brújula para no repetir errores costosos.</p>
                    </div>
                    <div class="instructions-box !bg-gray-50 !border-brand-orange">
                        <p><strong>Instrucciones:</strong> Selecciona las 3 inversiones más representativas de tu último año (aquellas que más capital comprometieron o que más impacto esperabas). Califícate con total honestidad: no estamos juzgando el pasado, estamos construyendo tu nuevo criterio de <strong>Arquitecto de Inversiones</strong>. Tu Score de Madurez final te indicará qué tan cerca estás de un proceso de decisión profesional.</p>
                    </div>

                    <div class="mb-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <h3 class="text-xl font-bold text-gray-800 mb-4 font-montserrat">Paso 1: Define tus Inversiones a Evaluar</h3>
                        <p class="text-gray-600 mb-4">Consulta tu registro histórico y piensa en las 3 inversiones más importantes (contrataciones, equipo, marketing, etc.) que has realizado en los **últimos 12 meses**.</p>
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
                            <h3 class="text-lg font-bold brand-blue mb-4">Paso 3: Conclusión y Próximos Pasos</h3>
                            
                            <div id="ej3-areas-conclusion" class="mb-6 hidden">
                                <p class="text-sm font-bold text-gray-500 uppercase mb-2">Áreas de Oportunidad Detectadas:</p>
                                <div id="ej3-areas-list" class="flex flex-wrap gap-2 mb-4"></div>
                            </div>

                            <label for="reflection" class="text-gray-600 mb-2 block font-semibold">Basado en tu score, ¿cuál es el área de oportunidad N°1 que revela este diagnóstico en tu proceso de toma de decisiones?</label>
                            <textarea id="reflection" rows="4" placeholder="Ej: Necesito calcular siempre el Flujo de Caja Libre antes de decidir..." class="autosave-input w-full p-3 border border-gray-300 rounded-lg mb-4" data-section="ej3" data-id="ej3_reflection"></textarea>
                            
                            <div id="cta-container-ej3" class="hidden animate-fade-in">
                                <button onclick="window.sendConsultancyEmail('ej3')" class="w-full bg-brand-orange hover:bg-orange-600 text-white font-black py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3">
                                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    SOLICITAR APOYO EN MI ÁREA DE OPORTUNIDAD
                                </button>
                                <p class="text-[10px] text-gray-400 text-center mt-2">Se enviará un correo automático a contacto@miempresacrece.com.mx</p>
                            </div>
                        </div>
                    </div>
                `;
            };
            renderEjercicio3Completo();

            const ej4HTML = `
                <h2 class="text-2xl font-bold brand-orange mb-4">4. Cálculo de Flujo de Caja Libre</h2>
                <div class="instructions-box">
                    <p><strong>Objetivo Transformacional:</strong> Descubrirás el "Oxígeno Real" de tu negocio. El Flujo de Caja Libre (FCL) es el capital que queda tras cumplir con todas tus obligaciones operativas; es el único recurso con el que puedes comprar el futuro sin asfixiar el presente.</p>
                </div>
                <div class="instructions-box !bg-gray-50 !border-brand-orange">
                    <p><strong>Instrucciones:</strong> Registra tus ingresos cobrados y egresos pagados de los últimos meses. Te recomendamos un análisis de <strong>6 meses</strong> para neutralizar la estacionalidad y obtener un promedio robusto. Si buscas una visibilidad rápida de tu liquidez inmediata, utiliza el modo de 3 meses. <em>Nota: Este no es un ejercicio contable fiscal, es un diagnóstico de capacidad de maniobra.</em></p>
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
                            <p class="text-gray-600 font-medium">Proyecta tu capacidad de inversión real basándote en tu flujo de efectivo histórico:</p>
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
                        <p><strong>Objetivo Transformacional:</strong> Pasarás de la dispersión al enfoque láser. El recurso más escaso de un dueño no es el dinero, sino su atención. Este ejercicio te obliga a sacrificar lo "bueno" para perseguir lo "extraordinario", asegurando que tu inversión se inyecte en el área que realmente desbloqueará tu siguiente nivel de escala.</p>
                    </div>
                    <div class="instructions-box !bg-gray-50 !border-brand-orange">
                        <p><strong>Instrucciones:</strong> No todas las metas tienen el mismo peso. Inicia vaciando tus ideas actuales y luego utiliza los filtros de prioridad para seleccionar el **Área Estratégica** donde una inversión hoy generará el mayor efecto multiplicador. Recuerda: invertir en el área equivocada, por más rentable que parezca, es solo un gasto costoso.</p>
                    </div>

                    <div class="space-y-8">
                        <div id="step-1" class="step-content">
                            <h3 class="text-xl font-bold text-gray-800 mb-2">Paso 1: Vaciado de Iniciativas de Crecimiento</h3>
                            <label class="text-gray-600 mb-4 block">Captura las 5 prioridades o proyectos que tienes en mente. No te limites, este es tu inventario de posibilidades antes del filtro estratégico.</label>
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

    // 3.6 INYECCIÓN DEL EJERCICIO 6 (EVALUACIÓN DEL RENDIMIENTO)
    document.getElementById('ej6').innerHTML = `
        <h2 class="text-2xl font-bold brand-orange mb-4">${sectionsData[5].title}</h2>
        <div class="instructions-box">
            <p><strong>Objetivo Transformacional:</strong> Dejarás de "apostar" dinero para empezar a "sembrar" resultados. Evaluarás si una inversión es un motor de flujo inmediato o un andamio de infraestructura. El objetivo es que ningún peso salga de tu caja sin una expectativa clara de retorno o de resolución de un problema raíz.</p>
        </div>
        <div class="instructions-box !bg-gray-50 !border-brand-orange">
            <p><strong>Instrucciones:</strong> Clasifica tu proyecto. Si genera ingresos directamente (maquinaria, marketing), utiliza el <strong>Análisis Cuantitativo</strong> para calcular tu rendimiento anualizado. Si mejora la estructura o el talento, utiliza el <strong>Análisis Cualitativo</strong> para calificar su impacto estratégico. Una inversión profesional debe ser excelente en rentabilidad o indispensable en estrategia.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-gray-50 p-6 rounded-lg border">
                <h3 class="text-lg font-bold text-gray-800 mb-2">Análisis Cuantitativo (ROI)</h3>
                <p class="text-sm text-gray-500 mb-4">Usa esta sección para inversiones con beneficio medible en dinero (ej: maquinaria, marketing).</p>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium">A. Monto Inversión</label>
                        <input type="number" id="monto-inversion-e6" placeholder="$100,000" 
                            class="autosave-input w-full mt-1 p-2 border rounded-md" 
                            data-section="ej6" data-id="ej6_monto_inversion"
                            oninput="PerformanceManager.calculateROI()">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">B. Rendimiento Total Esperado</label>
                        <input type="number" id="rendimiento-total-e6" placeholder="$50,000" 
                            class="autosave-input w-full mt-1 p-2 border rounded-md" 
                            data-section="ej6" data-id="ej6_rendimiento_total"
                            oninput="PerformanceManager.calculateROI()">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">C. Plazo en Meses</label>
                        <input type="number" id="plazo-e6" placeholder="24" 
                            class="autosave-input w-full mt-1 p-2 border rounded-md" 
                            data-section="ej6" data-id="ej6_plazo"
                            oninput="PerformanceManager.calculateROI()">
                    </div>
                </div>
                <div class="text-center mt-6 p-4 bg-white rounded-xl border shadow-inner">
                    <p class="text-xs text-gray-500 uppercase font-bold tracking-widest">Rendimiento Anualizado</p>
                    <div id="rendimiento-anualizado-result" class="text-5xl font-black my-2 text-gray-400">0%</div>
                    <div id="semaforo-rendimiento" class="semaforo-indicator bg-gray-400 inline-block">Introduce datos</div>
                </div>
            </div>

            <div class="bg-gray-50 p-6 rounded-lg border">
                <h3 class="text-lg font-bold text-gray-800 mb-2">Análisis Cualitativo</h3>
                <p class="text-sm text-gray-500 mb-4">Usa esta sección para inversiones estratégicas (ej: software de gestión, cultura organizacional).</p>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium">¿Qué problema clave resuelve?</label>
                        <textarea id="problema-e6" rows="2" placeholder="Ej: Alta rotación de personal técnico..." 
                            class="autosave-input w-full mt-1 p-2 border rounded-md" 
                            data-section="ej6" data-id="ej6_problema_resuelve"></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Calidad de la Solución</label>
                        <select id="calidad-solucion-e6" class="autosave-input w-full mt-1 p-2 border rounded-md" 
                            data-section="ej6" data-id="ej6_calidad_solucion"
                            onchange="PerformanceManager.handleQualitativeChange(this.value)">
                            <option value="default">Selecciona...</option>
                            <option value="verde">Verde: Estratégica (Resuelve causa raíz)</option>
                            <option value="azul">Azul: Táctica (Resuelve un síntoma importante)</option>
                            <option value="amarillo">Amarillo: Ordinaria (Mejora marginal)</option>
                            <option value="rojo">Rojo: Bajo Impacto (No resuelve problema clave)</option>
                        </select>
                    </div>
                </div>
                <div class="text-center mt-6 p-4 bg-white rounded-xl border shadow-inner">
                    <p class="text-xs text-gray-500 uppercase font-bold tracking-widest">Calificación de Impacto</p>
                    <div id="calificacion-final-e6" class="semaforo-indicator bg-gray-400 inline-block mt-2">Selecciona</div>
                </div>
            </div>
        </div>
    `;

    // 3.7 INYECCIÓN DEL EJERCICIO 7 (EVALUACIÓN DEL MONTO)
    document.getElementById('ej7').innerHTML = `
        <h2 class="text-2xl font-bold brand-orange mb-4">${sectionsData[6].title}</h2>
        <div class="instructions-box">
            <p><strong>Objetivo Transformacional:</strong> Aprenderás a medir el "Peso Específico" de tu inversión. No importa si algo es barato o caro en términos absolutos, lo que importa es cuántos meses de tu "oxígeno" (FCL) consume. El objetivo es asegurar que tu crecimiento no se convierta en tu sentencia de muerte por falta de liquidez.</p>
        </div>
        <div class="instructions-box !bg-gray-50 !border-brand-orange">
            <p><strong>Instrucciones:</strong> Utiliza el FCL promedio que calculaste en el Ejercicio 4 para determinar a cuántos meses de operación equivale este desembolso. Además, suma otros proyectos que tengas activos este año; si el total compromete más del 50% de tu FCL anual, estás entrando en zona de alto riesgo. Una inversión inteligente es aquella que el negocio puede "digerir" sin detenerse.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-gray-50 p-6 rounded-lg border">
                <h3 class="text-lg font-bold mb-4">Impacto en Liquidez</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium">Tu FCL Mensual (Promedio Ej. 4)</label>
                        <input type="number" id="fcl-mensual-e7" placeholder="$20,000" 
                            class="autosave-input w-full mt-1 p-2 border rounded-md" 
                            data-section="ej7" data-id="ej7_fcl_mensual"
                            oninput="AmountManager.calculateFCLMonths()">
                    </div>
                    <div>
                        <label class="block text-sm font-medium">Monto de la Inversión que evalúas</label>
                        <input type="number" id="monto-inversion-e7" placeholder="$30,000" 
                            class="autosave-input w-full mt-1 p-2 border rounded-md" 
                            data-section="ej7" data-id="ej7_monto_inversion"
                            oninput="AmountManager.calculateFCLMonths()">
                    </div>
                </div>
                <div class="text-center mt-6 p-4 bg-white rounded-xl border shadow-inner">
                    <p class="text-xs text-gray-500 uppercase font-bold tracking-widest">Esta inversión equivale a:</p>
                    <div id="meses-fcl-result" class="text-5xl font-black my-2 text-brand-blue">0</div>
                    <p class="text-sm font-bold text-gray-600 uppercase">Meses de tu Flujo Libre</p>
                    <div id="semaforo-meses-fcl" class="semaforo-indicator bg-gray-400 inline-block mt-2">Introduce datos</div>
                </div>
            </div>

            <div class="bg-gray-50 p-6 rounded-lg border flex flex-col">
                <h3 class="text-lg font-bold mb-4">Capacidad Anual Comprometida</h3>
                <div class="mb-4">
                    <label class="block text-xs font-bold text-gray-500 uppercase">Tu FCL Anual proyectado</label>
                    <p id="fcl-anual-display" class="text-xl font-bold brand-blue p-2 bg-blue-50 rounded-md mt-1 border border-blue-100">$0.00</p>
                </div>
                
                <p class="text-xs text-gray-600 mb-2 font-semibold">Agrega otros proyectos activos o planeados para este año:</p>
                <div id="proyectos-container-e7" class="space-y-2 flex-grow max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    </div>
                
                <button onclick="AmountManager.addProyecto()" class="mt-4 text-xs bg-white border border-brand-blue text-brand-blue font-bold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                    + Agregar otra inversión al análisis
                </button>

                <div class="mt-6 pt-4 border-t">
                    <div class="flex justify-between font-bold text-sm mb-1">
                        <span>Compromiso Total: <span id="total-consumo-e7" class="brand-orange">$0</span></span>
                        <span><span id="porcentaje-consumo-e7">0</span>% del FCL Anual</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                        <div id="consumo-bar-e7" class="bg-brand-blue h-full transition-all duration-700 ease-out" style="width: 0%;"></div>
                    </div>
                    <div id="semaforo-consumo-e7" class="text-center font-bold text-sm p-2 mt-3 rounded-md bg-gray-100 text-gray-400">
                        Pendiente de datos
                    </div>
                </div>
            </div>
        </div>
    `;

    // 3.8 INYECCIÓN DEL EJERCICIO 8 (EVALUACIÓN DEL PLAZO)
    document.getElementById('ej8').innerHTML = `
        <h2 class="text-2xl font-bold brand-orange mb-4">${sectionsData[7].title}</h2>
        <div class="instructions-box">
            <p><strong>Objetivo Transformacional:</strong> Dominarás el "Factor Tiempo" como medida de riesgo. En el mundo de las PYMES, el dinero detenido es dinero vulnerable. El objetivo es que visualices la velocidad de retorno como una póliza de seguro: mientras más rápido recuperes tu inversión, más pronto estarás listo para capturar la siguiente gran oportunidad.</p>
        </div>
        <div class="instructions-box !bg-gray-50 !border-brand-orange">
            <p><strong>Instrucciones:</strong> Define el plazo proyectado de recuperación (Payback) en meses. Este indicador no solo mide el éxito, mide tu exposición a la incertidumbre. Utiliza el semáforo de velocidad para validar si el tiempo de recuperación es saludable para tu flujo actual o si estás inmovilizando capital por un periodo que podría comprometer tu agilidad operativa.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div class="bg-gray-50 p-6 rounded-lg border space-y-4 shadow-sm">
                <h3 class="text-lg font-bold text-gray-800">Semaforización del Plazo</h3>
                <p class="text-sm text-gray-500 mb-4">Introduce el plazo estimado para recuperar la inversión inicial.</p>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Plazo propuesto (en Meses)</label>
                    <input type="number" id="plazo-inversion-e8" placeholder="6" 
                        class="autosave-input w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-brand-blue outline-none" 
                        data-section="ej8" data-id="ej8_plazo_propuesto"
                        oninput="TimeManager.evaluate()">
                </div>
            </div>
            
            <div class="text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p class="text-xs text-gray-500 uppercase font-bold tracking-widest">Diagnóstico de Velocidad</p>
                <div id="semaforo-plazo" class="semaforo-indicator bg-gray-400 inline-block mt-2 text-lg shadow-sm">
                    Introduce un plazo
                </div>
                <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p id="feedback-plazo" class="text-sm font-semibold text-gray-700 leading-relaxed"></p>
                </div>
            </div>
        </div>
    `;

    // 3.9 INYECCIÓN DEL EJERCICIO 9 (EVALUACIÓN DEL RIESGO)
    document.getElementById('ej9').innerHTML = `
        <h2 class="text-2xl font-bold brand-orange mb-4">${sectionsData[8].title}</h2>
        <div class="instructions-box">
            <p><strong>Objetivo Transformacional:</strong> Visualizarás las amenazas antes de que ocurran para diseñar tu "escudo de protección". Dejarás de temer al riesgo para empezar a gestionarlo, asegurando que un imprevisto no derribe todo tu plan de crecimiento.</p>
        </div>
        <div class="instructions-box !bg-gray-50 !border-brand-orange">
            <p><strong>Instrucciones:</strong> Toda inversión conlleva riesgos; el error no es tenerlos, sino ignorarlos. Identifica los eventos que podrían comprometer el éxito de este proyecto. Clasifícalos por su nivel de impacto y define con claridad un <strong>Plan A (Mitigación)</strong> para evitar que sucedan, y un <strong>Plan B (Contingencia)</strong> por si llegan a ocurrir. Gestionar el riesgo es lo que separa a un estratega de un apostador.</p>
        </div>

        <div class="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div class="p-4 bg-gray-800 text-white flex justify-between items-center">
                <h3 class="font-bold">Matriz de Mitigación de Riesgos</h3>
                <button onclick="RiskManager.addRiskRow()" class="text-xs bg-brand-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors">
                    + Agregar Riesgo
                </button>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-100 text-gray-700 text-xs uppercase font-black">
                            <th class="p-4 border-b w-1/4">Riesgo Identificado</th>
                            <th class="p-4 border-b w-1/6">Nivel de Impacto</th>
                            <th class="p-4 border-b w-1/4">Acción de Mitigación (Plan A)</th>
                            <th class="p-4 border-b w-1/4">Plan de Contingencia (Plan B)</th>
                        </tr>
                    </thead>
                    <tbody id="risk-table-body">
                        </tbody>
                </table>
            </div>
        </div>

        <div class="pro-tip mt-6">
            <p><strong>Consejo de Inversión:</strong> Si identificas un riesgo con impacto "Crítico" y no tienes un Plan B sólido, considera reducir el monto de la inversión o posponerla hasta tener mayor control sobre esa variable.</p>
        </div>
    `;

    // Inicializamos el Manager después de inyectar el HTML
    RiskManager.init();

    // 3.10 INYECCIÓN DEL EJERCICIO 10 (EVALUACIÓN DEL PROPÓSITO)
    document.getElementById('ej10').innerHTML = `
        <h2 class="text-2xl font-bold brand-orange mb-4">${sectionsData[9].title}</h2>
        <div class="instructions-box">
            <p><strong>Objetivo Transformacional:</strong> Conectarás el "alma" de tu empresa con tus decisiones de capital. Una inversión puede ser rentable y segura, pero si no te acerca a tu visión a 3 años, es una distracción costosa. Aquí es donde validas que el crecimiento tiene un sentido estratégico superior.</p>
        </div>
        <div class="instructions-box !bg-gray-50 !border-brand-orange">
            <p><strong>Instrucciones:</strong> Sintetiza todo tu análisis en una declaración de propósito poderosa. Define el área de impacto, la táctica y el resultado esperado. Al terminar, el sistema generará tu <strong>Pitch Estratégico</strong>: la herramienta definitiva para comunicar esta decisión a tus socios, equipo o para auto-validar tu convicción como dueño del negocio.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="space-y-6 bg-gray-50 p-6 rounded-lg border shadow-sm">
                <h3 class="text-lg font-bold text-gray-800 border-b pb-2">Definición Estratégica</h3>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700">1. Área de Impacto</label>
                    <select id="area-select-e10" class="autosave-input w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-brand-blue" 
                        data-section="ej10" data-id="ej10_area"
                        onchange="PurposeManager.handleAreaChange(this.value)">
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">2. Táctica Específica</label>
                    <select id="tactic-select-e10" class="autosave-input w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-brand-blue" 
                        data-section="ej10" data-id="ej10_tactic"
                        onchange="PurposeManager.updatePitch()">
                        <option value="">Selecciona primero un área...</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">3. ¿Qué problema u oportunidad ataca? (El Objetivo)</label>
                    <textarea id="objetivo-e10" placeholder="Ej: Reducir el cuello de botella en producción..." 
                        class="autosave-input w-full mt-1 p-2 border rounded-md h-20 text-sm" 
                        data-section="ej10" data-id="ej10_objetivo"
                        oninput="PurposeManager.updatePitch()"></textarea>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">4. ¿Cómo se ve el éxito? (El Resultado)</label>
                    <textarea id="resultado-e10" placeholder="Ej: Poder procesar un 20% más de pedidos diarios..." 
                        class="autosave-input w-full mt-1 p-2 border rounded-md h-20 text-sm" 
                        data-section="ej10" data-id="ej10_resultado"
                        oninput="PurposeManager.updatePitch()"></textarea>
                </div>
            </div>

            <div class="flex flex-col justify-center">
                <div class="bg-blue-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4 opacity-10">
                        <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM14.243 15.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM6.464 14.243a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707z"></path></svg>
                    </div>
                    
                    <h3 class="text-brand-orange font-black uppercase tracking-tighter mb-4 border-b border-blue-800 pb-2">Pitch Estratégico de Inversión</h3>
                    <p id="pitch-final-display" class="text-xl italic font-light leading-relaxed">
                        Completa los pasos a la izquierda para generar tu declaración de propósito...
                    </p>
                </div>
                
                <div class="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p class="text-green-800 font-bold text-sm">¡Felicidades! Has completado el diagnóstico integral de inversión.</p>
                    <p class="text-green-700 text-xs mt-1">Ahora tienes datos, plazos, riesgos y propósito para decidir con maestría.</p>
                </div>
            </div>
        </div>
    `;

    // Inicializamos el Manager para cargar las áreas
    PurposeManager.init();

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