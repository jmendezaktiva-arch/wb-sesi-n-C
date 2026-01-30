    // Variable para persistir los selectores en memoria y no buscarlos cada vez
    let memoizedEj3Selects = null;

    window.calculateEj3Scores = function() {
    let totalPoints = 0;
    const maxPossible = 48;

    // Si es la primera vez, cacheamos los selectores para optimizar rendimiento
    if (!memoizedEj3Selects) {
        memoizedEj3Selects = {
            1: document.querySelectorAll('[data-id*="_i1"]'),
            2: document.querySelectorAll('[data-id*="_i2"]'),
            3: document.querySelectorAll('[data-id*="_i3"]')
        };
    }

    // 1. Procesar cada inversión (columna)
    for (let inv = 1; inv <= 3; inv++) {
        let invScore = 0;
        const columnSelects = memoizedEj3Selects[inv];
        
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

/* === MANAGER DE CONSULTORÍA (ESTANDARIZADO) === */
const ConsultancyManager = {
    DESTINO: "contacto@miempresacrece.com.mx",

    send: function(tipo, dataAdicional = "") {
        const nombre = document.querySelector('[data-id="sesionc_nombre_participante"]')?.value || "Empresario";
        const empresa = document.querySelector('[data-id="sesionc_nombre_empresa"]')?.value || "Mi Empresa";
        
        let asunto = dataAdicional || `Solicitud de Asesoría - ${empresa}`;
        let mensaje = `Hola equipo de Mi Empresa Crece,\n\nSoy ${nombre}.\n\n`;

        // Construcción inteligente del mensaje según el contexto
        if (tipo === 'ej3') {
            const refl = document.getElementById('reflection')?.value || "Sin reflexión específica.";
            mensaje += `He concluido mi diagnóstico de gestión. Mi prioridad actual es:\n"${refl}"\n\nBusco apoyo para profesionalizar mis decisiones.`;
        } else if (tipo === 'ej7') {
            const total = document.getElementById('total-consumo-e7')?.innerText || "$0";
            const porc = document.getElementById('porcentaje-consumo-e7')?.innerText || "0";
            mensaje += `Tras analizar mi capacidad de inversión, mi compromiso anual es de ${total} (${porc}% del FCL).\n\nSolicito asesoría para: ${dataAdicional}.`;
        } else {
            mensaje += `Me gustaría recibir consultoría sobre los resultados obtenidos en mi Workbook.`;
        }

        window.location.href = `mailto:${this.DESTINO}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;
    }
};

// Puentes de compatibilidad para no tocar el HTML existente
window.sendConsultancyEmail = (id) => ConsultancyManager.send(id);
window.sendConsultancyEmailCustom = (asunto) => ConsultancyManager.send('ej7', asunto);

/* --- UTILIDADES DE LIMPIEZA FINANCIERA --- */
const FinanceUtils = {
    /**
     * Limpia un valor de entrada y lo convierte en un número seguro.
     * Si el campo está vacío o no es un número, devuelve 0.
     */
    parseSafeFloat: function(value) {
        if (!value) return 0;
        // Elimina comas (por si el usuario pega valores con formato) y convierte a float
        const cleanValue = parseFloat(value.toString().replace(/,/g, ''));
        return isNaN(cleanValue) ? 0 : cleanValue;
    }
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
            // Sumar Ingresos usando el limpiador centralizado
            const ing = FinanceUtils.parseSafeFloat(document.querySelector(`[data-id="ej4_m${i}_ing_ventas"]`)?.value) +
                        FinanceUtils.parseSafeFloat(document.querySelector(`[data-id="ej4_m${i}_ing_otros"]`)?.value);
            
            // Sumar Gastos Fijos
            const gf = FinanceUtils.parseSafeFloat(document.querySelector(`[data-id="ej4_m${i}_fix_renta"]`)?.value) +
                       FinanceUtils.parseSafeFloat(document.querySelector(`[data-id="ej4_m${i}_fix_sueldos"]`)?.value) +
                       FinanceUtils.parseSafeFloat(document.querySelector(`[data-id="ej4_m${i}_fix_otros"]`)?.value);
            
            // Sumar Gastos Variables
            const gv = FinanceUtils.parseSafeFloat(document.querySelector(`[data-id="ej4_m${i}_var_costo"]`)?.value) +
                       FinanceUtils.parseSafeFloat(document.querySelector(`[data-id="ej4_m${i}_var_promo"]`)?.value) +
                       FinanceUtils.parseSafeFloat(document.querySelector(`[data-id="ej4_m${i}_var_otros"]`)?.value);

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

        // Inyectamos los valores formateados
        const fmt = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN', maximumFractionDigits: 0});
        
        document.getElementById('avg-monthly-fcl-2-2').innerText = fmt.format(avg);
        document.getElementById('annual-fcl-2-2').innerText = fmt.format(annual);

        // SINCRONIZACIÓN ESTRUCTURAL: Asegura que el Ejercicio 7 siempre tenga el dato fresco
        const ej7Display = document.getElementById('fcl-display-value');
        const ej7HiddenInput = document.getElementById('fcl-mensual-e7');
        const isManual = document.querySelector('input[name="fcl_source"][value="manual"]')?.checked;
        
        // Solo inyectamos el promedio si el usuario NO ha bloqueado el modo manual
        if (ej7Display && !isManual) {
            ej7Display.innerText = fmt.format(avg);
            if (ej7HiddenInput) {
                ej7HiddenInput.value = avg;
                // Disparamos el recálculo de "Meses de FCL" en el Ejercicio 7
                if (window.AmountManager) window.AmountManager.calculateFCLMonths();
            }
        }

        // 2. Validación de Capacidad de Inversión
        const semaphoreContainer = document.querySelector('#fcl-results-container-2-2 .space-y-3');
        if (annual <= 0) {
            // Si no hay flujo positivo, ocultamos rangos y avisamos al usuario
            document.querySelectorAll('[id^="semaphore-"] p.text-sm').forEach(p => p.innerText = "Sin capacidad (FCL Negativo)");
        } else {
            // Si hay flujo positivo, procedemos con los cálculos de semáforos
            this.updateSemaphores(annual);
        }

        this.renderCTA(annual);
    },

    updateSemaphores: function(annual) {
        const fmt = (val) => new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(val);
        
        document.querySelector('#semaphore-green-2-2 p.text-sm').innerText = `${fmt(0)} - ${fmt(annual * 0.08)}`;
        document.querySelector('#semaphore-blue-2-2 p.text-sm').innerText = `${fmt(annual * 0.081)} - ${fmt(annual * 0.20)}`;
        document.querySelector('#semaphore-yellow-2-2 p.text-sm').innerText = `${fmt(annual * 0.21)} - ${fmt(annual * 0.70)}`;
        document.querySelector('#semaphore-red-2-2 p.text-sm').innerText = `${fmt(annual * 0.71)} - ${fmt(annual * 1.00)}`;
    },

    renderCTA: function(annual) {
        const container = document.getElementById('fcl-cta-container-2-2');
        if (!container) return;
        container.classList.remove('hidden');

        let config = {};
        
        if (annual <= 0) {
            config = {
                style: "border-red-200 bg-red-50",
                buttonClass: "bg-red-600 hover:bg-red-700",
                text: "Te gustaría que un consultor especializado te ayudara a realizar ajustes para que en 2 o 3 meses puedas empezar a tener margen para realizar inversiones en crecimiento?",
                subject: "Asesoría FCL - Ajuste de Márgenes (FCL Crítico)"
            };
        } else if (annual < 150000) {
            config = {
                style: "border-yellow-200 bg-yellow-50",
                buttonClass: "bg-yellow-500 hover:bg-yellow-600",
                text: "Te gustaría recibir ayuda de un consultor que ayude a implementar microinversiones que te ayuden a incrementar tus ingresos y utilidades?",
                subject: "Asesoría FCL - Implementación de Microinversiones"
            };
        } else {
            config = {
                style: "border-blue-200 bg-blue-50",
                buttonClass: "bg-brand-blue hover:bg-blue-800",
                text: "Te gustaría que un consultor te ayudara a encontrar las mejores inversiones para maximizar tu crecimiento e independientemente de lo que ya tienes, traerte avenidas nuevas de crecimiento?",
                subject: "Asesoría FCL - Maximizar Crecimiento y Nuevas Avenidas"
            };
        }

        container.innerHTML = `
            <div class="p-6 border-2 border-dashed rounded-2xl flex flex-col md:flex-row items-center gap-6 ${config.style}">
                <div class="flex-1">
                    <p class="text-gray-800 font-semibold text-lg leading-tight">${config.text}</p>
                </div>
                <button onclick="window.sendConsultancyEmailCustom('${config.subject}')" 
                        class="whitespace-nowrap ${config.buttonClass} text-white font-black py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105">
                    SOLICITAR ASESORÍA
                </button>
            </div>
        `;
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

    // 1. DICCIONARIO DE CONSEJOS (CONFIGURACIÓN CENTRALIZADA)
    ADVICE_CONFIG: {
        GREEN: {
            title: "✅ Interpretación: Bajo Impacto",
            text: "Tu capacidad financiera actual absorbe esta inversión sin estrés. Ejecuta con confianza (si el ROI es positivo). Puedes pagar de contado sin descapitalizarte.",
            style: "bg-green-50 border-green-500 text-green-900"
        },
        YELLOW: {
            title: "⚠️ Interpretación: Impacto Moderado",
            text: "Cuidado. Esta inversión compromete tu liquidez libre de hasta un trimestre. Evita el pago de contado. Negocia plazos con tu proveedor o busca financiamiento a corto plazo.",
            style: "bg-yellow-50 border-yellow-500 text-yellow-900"
        },
        RED: {
            title: "🚨 Interpretación: Alto Impacto",
            text: "Alerta. Intentar pagar esto con flujo operativo pondrá en riesgo tu nómina. Detente. Esta compra requiere Estructura de Capital (crédito largo plazo o inyección), no flujo de caja.",
            style: "bg-red-50 border-red-500 text-red-900"
        }
    },

    calculateFCLMonths: function() {
        const fcl = parseFloat(document.getElementById('fcl-mensual-e7')?.value) || 0;
        const monto = parseFloat(document.getElementById('monto-inversion-e7')?.value) || 0;
        const res = document.getElementById('meses-fcl-result');
        const semaforo = document.getElementById('semaforo-meses-fcl');
        
        // Referencias a elementos del consejo
        const adviceBox = document.getElementById('fcl-advice-box');
        const adviceContent = document.getElementById('fcl-advice-content');
        const adviceTitle = document.getElementById('fcl-advice-title');
        const adviceText = document.getElementById('fcl-advice-text');

        if (!res || !semaforo) return;

        // PROTECCIÓN DE NEGOCIO: Validación de capacidad real
        if (fcl <= 0 || monto === 0) {
            res.textContent = fcl < 0 ? 'CRÍTICO' : '0';
            semaforo.textContent = fcl < 0 ? 'FCL NEGATIVO' : 'Introduce FCL y Monto';
            semaforo.className = 'semaforo-indicator bg-red-600 text-white inline-block mt-2 mb-4 font-black';
            
            if(adviceBox) {
                adviceTitle.innerText = "🚨 Alerta: Sin capacidad de maniobra";
                adviceText.innerText = "Tu flujo de caja actual es negativo o nulo. Cualquier inversión en este estado pone en riesgo inminente la operación. Prioriza sanear tu flujo antes de comprometer capital.";
                adviceContent.className = "text-left text-sm p-4 rounded-lg border-l-4 shadow-sm bg-red-50 border-red-600 text-red-900";
                adviceBox.classList.remove('hidden');
            }
            return;
        }

        const meses = monto / fcl;
        res.textContent = meses.toFixed(1);
        
        let config = null;

        // Lógica de Semáforo y Selección de Consejo
        if (meses <= 1) {
            semaforo.textContent = 'Bajo Impacto';
            semaforo.className = 'semaforo-indicator bg-green-500 inline-block mt-2 mb-4';
            config = this.ADVICE_CONFIG.GREEN;
        } else if (meses <= 3) {
            semaforo.textContent = 'Impacto Moderado';
            semaforo.className = 'semaforo-indicator bg-yellow-500 text-black inline-block mt-2 mb-4';
            config = this.ADVICE_CONFIG.YELLOW;
        } else {
            semaforo.textContent = 'Alto Impacto';
            semaforo.className = 'semaforo-indicator bg-red-500 inline-block mt-2 mb-4';
            config = this.ADVICE_CONFIG.RED;
        }

        // Renderizado del Consejo
        if (adviceBox && config) {
            adviceTitle.innerText = config.title;
            adviceText.innerText = config.text;
            // Aplicamos estilos dinámicos (borde, fondo, texto)
            adviceContent.className = `text-left text-sm p-4 rounded-lg border-l-4 shadow-sm transition-colors duration-300 ${config.style}`;
            // Mostramos la caja
            adviceBox.classList.remove('hidden');
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

        // --- LÓGICA DE ACTIVACIÓN DINÁMICA DE CTA (EJERCICIO 7) ---
        // Buscamos el contenedor de las tarjetas que insertamos en el HTML
        const ctaContainer = document.getElementById('ej7-cta-dynamic-container');
        
        if (ctaContainer) {
            // Si el compromiso del flujo anual supera el 50%, resaltamos visualmente 
            // el contenedor para invitar a la consultoría técnica.
            if (p > 50) {
                // Aplicamos un anillo visual de advertencia y sombra para llamar la atención
                ctaContainer.classList.add('ring-2', 'ring-red-500', 'ring-offset-2', 'rounded-xl', 'shadow-lg');
            } else {
                // Si el nivel de inversión es manejable, mantenemos el estilo original
                ctaContainer.classList.remove('ring-2', 'ring-red-500', 'ring-offset-2', 'shadow-lg');
            }
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
                       value="${tactic}" data-section="ej5" data-id="ej5_tactic_${i}"
                       onchange="PriorityManager.handleTacticChange()">
                <span class="ml-3 font-medium text-gray-700">${tactic}</span>
            </label>
        `).join('');
    },

    handleTacticChange: function() {
        const selected = Array.from(document.querySelectorAll('.tactic-checkbox:checked')).map(cb => cb.value);
        const step4 = document.getElementById('step-4');
        const step5 = document.getElementById('step-5');

        if (selected.length > 0) {
            this.renderInitiatives(selected);
            step4?.classList.remove('hidden-step');
            step5?.classList.remove('hidden-step');
        } else {
            step4?.classList.add('hidden-step');
            step5?.classList.add('hidden-step');
        }
    },

    renderInitiatives: function(tactics) {
        const container = document.getElementById('initiatives-container');
        if (!container) return;
        
        container.innerHTML = tactics.map((tactic, i) => `
            <div class="p-4 border border-blue-100 bg-white rounded-xl shadow-sm animate-fade-in">
                <p class="text-[10px] font-black text-brand-blue uppercase mb-2">Iniciativa para: ${tactic}</p>
                <textarea class="autosave-input w-full p-3 border rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none" 
                          data-section="ej5" data-id="ej5_init_desc_${i}"
                          placeholder="Describe la acción o inversión concreta aquí..."
                          oninput="PriorityManager.updateSynthesis()"></textarea>
            </div>
        `).join('');
        this.updateSynthesis();
    },

    updateSynthesis: function() {
        const container = document.getElementById('synthesis-container');
        const inits = Array.from(document.querySelectorAll('#initiatives-container textarea'));
        if (!container) return;

        container.innerHTML = inits.map(txt => `
            <div class="flex items-start gap-3 bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
                <div class="mt-1 bg-brand-orange rounded-full p-1 text-white flex-shrink-0">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <p class="text-gray-700 font-bold text-sm leading-tight">${txt.value || '<span class="text-gray-300 italic">Escribiendo iniciativa...</span>'}</p>
            </div>
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
        this.renderInitiativeSelector();
        // Inicializamos la tabla si está vacía
        if (this.riskCount === 0) {
            this.addRiskRow();
            this.addRiskRow();
        }
        // Ejecutamos el diagnóstico inicial después de un breve retardo para asegurar que el DOM cargó
        setTimeout(() => this.updateInterpretation(), 500); 
    },

    renderInitiativeSelector: function() {
        const containerSection = document.getElementById('ej9');
        const tableBlock = containerSection ? containerSection.querySelector('.bg-white.rounded-xl.border.shadow-sm.overflow-hidden') : null;
        
        if (!containerSection || !tableBlock || document.getElementById('risk-initiative-selector-container')) return;

        const initiatives = Array.from(document.querySelectorAll('[data-id^="ej5_init_desc_"]'))
            .map(input => input.value)
            .filter(val => val && val.trim() !== "");

        let optionsHTML = '<option value="">-- Selecciona qué iniciativa vas a evaluar --</option>';
        if (initiatives.length > 0) {
            initiatives.forEach((init, idx) => {
                const shortText = init.length > 80 ? init.substring(0, 80) + '...' : init;
                optionsHTML += `<option value="${idx}">${shortText}</option>`;
            });
        } else {
            optionsHTML += '<option value="" disabled>⚠️ No hay iniciativas definidas en el Paso 5</option>';
        }

        const selectorHTML = document.createElement('div');
        selectorHTML.id = 'risk-initiative-selector-container';
        selectorHTML.className = 'mb-6 bg-blue-50 p-5 rounded-xl border border-blue-200 shadow-sm animate-fade-in';
        
        selectorHTML.innerHTML = `
            <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div class="w-full">
                    <label class="block text-brand-blue font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        Iniciativa a Evaluar
                    </label>
                    <select id="current-risk-initiative" class="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none bg-white text-gray-700 font-semibold shadow-inner">
                        ${optionsHTML}
                    </select>
                </div>
                <div class="hidden md:block w-px h-12 bg-blue-200 mx-2"></div>
                <div class="w-full md:w-1/3 text-xs text-blue-800 italic leading-tight opacity-80">
                    <p><strong>Instrucción:</strong> Selecciona una iniciativa del menú y agrega en la tabla inferior todos los riesgos asociados a ella.</p>
                </div>
            </div>
        `;
        containerSection.insertBefore(selectorHTML, tableBlock);
    },

    addRiskRow: function() {
        this.riskCount++;
        const container = document.getElementById('risk-table-body');
        if (!container) return;

        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-gray-50 transition-colors animate-fade-in';
        
        // AGREGAMOS TRIGGERS: 'oninput' y 'onchange' ahora llaman a updateInterpretation()
        tr.innerHTML = `
            <td class="p-3">
                <input type="text" placeholder="Describe el riesgo..." 
                    class="autosave-input w-full p-2 border rounded text-sm focus:border-brand-orange outline-none" 
                    data-section="ej9" data-id="ej9_r${this.riskCount}_desc"
                    oninput="RiskManager.updateInterpretation()"> 
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
                <textarea placeholder="Plan A: Prevención" 
                    class="autosave-input w-full p-2 border rounded text-xs h-16 resize-none focus:border-blue-400 outline-none" 
                    data-section="ej9" data-id="ej9_r${this.riskCount}_mitigacion"
                    oninput="RiskManager.updateInterpretation()"></textarea>
            </td>
            <td class="p-3">
                <textarea placeholder="Plan B: Contingencia" 
                    class="autosave-input w-full p-2 border rounded text-xs h-16 resize-none focus:border-blue-400 outline-none" 
                    data-section="ej9" data-id="ej9_r${this.riskCount}_contingencia"
                    oninput="RiskManager.updateInterpretation()"></textarea>
            </td>
            <td class="p-3">
                <select class="autosave-input w-full p-2 border rounded text-sm risk-level-select bg-green-100 text-green-800" 
                    data-section="ej9" data-id="ej9_r${this.riskCount}_reevaluacion"
                    onchange="RiskManager.updateRowStyle(this)">
                    <option value="bajo" selected>Bajo</option>
                    <option value="medio">Medio</option>
                    <option value="alto">Alto</option>
                    <option value="critico">Crítico</option>
                </select>
            </td>
        `;
        container.appendChild(tr);
        this.updateRowStyle(tr.querySelector('.risk-level-select'));
        this.updateInterpretation(); // Actualizar diagnóstico al agregar fila
    },

    updateRowStyle: function(select) {
        const colors = {
            bajo: 'bg-green-100 text-green-800 border-green-200',
            medio: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            alto: 'bg-orange-100 text-orange-800 border-orange-200',
            critico: 'bg-red-100 text-red-800 border-red-200'
        };
        const val = select.value;
        select.className = `autosave-input w-full p-2 border rounded text-sm font-bold transition-colors ${colors[val]}`;
        
        // Disparamos la reinterpretación global cada vez que cambia un nivel
        this.updateInterpretation();
    },

    // --- CEREBRO DE LA TARJETA DINÁMICA ---
    // --- CEREBRO DE DOBLE DIAGNÓSTICO ---
    updateInterpretation: function() {
        const rows = document.querySelectorAll('#risk-table-body tr');
        
        // Variables para Tarjeta 1 (Vulnerabilidad)
        let unmitigatedCount = 0; 
        let highRiskCount = 0;    
        let totalRisks = 0;

        // Variables para Tarjeta 2 (Efectividad)
        let riskReductionScore = 0; // +1 si baja, -1 si sube o se mantiene alto
        let criticalStagnant = 0;   // Riesgos críticos que NO bajaron

        // Helper para convertir texto a valor numérico
        const getVal = (val) => {
            const map = { 'bajo': 1, 'medio': 2, 'alto': 3, 'critico': 4 };
            return map[val] || 0;
        };

        rows.forEach(row => {
            const desc = row.querySelector('input[type="text"]')?.value || "";
            if(!desc) return; 

            totalRisks++;
            
            // 1. Análisis de Vulnerabilidad (Existencia de Plan B)
            const levelSelect = row.querySelector('select[data-id*="_level"]');
            const planB = row.querySelector('textarea[data-id*="_contingencia"]')?.value || "";
            const isMitigated = planB.trim().length > 3;
            const isHigh = (levelSelect.value === 'alto' || levelSelect.value === 'critico');

            if(isHigh) {
                highRiskCount++;
                if(!isMitigated) unmitigatedCount++;
            }

            // 2. Análisis de Efectividad (Delta entre Inicial vs Reevaluación)
            const reevalSelect = row.querySelector('select[data-id*="_reevaluacion"]');
            const initialVal = getVal(levelSelect.value);
            const finalVal = getVal(reevalSelect.value);

            if (finalVal < initialVal) {
                riskReductionScore++; // Bien: El riesgo bajó
            } else if (finalVal > initialVal) {
                riskReductionScore -= 2; // Mal: El riesgo aumentó (castigo doble)
            } else {
                // Si se mantuvo igual
                if (initialVal >= 3) { 
                    riskReductionScore--; // Mal: Se mantuvo Alto/Crítico
                    criticalStagnant++;
                }
                // Si se mantuvo Bajo/Medio no sumamos ni restamos (Neutro)
            }
        });

        // --- RENDERIZADO TARJETA 1: VULNERABILIDAD ---
        const card1 = document.getElementById('risk-interpretation-card');
        const icon1 = document.getElementById('risk-icon-container');
        const title1 = document.getElementById('risk-interpretation-title');
        const text1 = document.getElementById('risk-interpretation-text');

        if(card1) {
            // Reset
            card1.className = "bg-white p-4 rounded-xl border-l-4 shadow-sm flex items-start gap-3 transition-all duration-500";
            icon1.className = "p-2 rounded-full flex-shrink-0 transition-colors duration-500";

            if (totalRisks === 0) {
                card1.classList.add('border-gray-300');
                icon1.classList.add('bg-gray-100', 'text-gray-400');
                title1.innerText = "COBERTURA DE PLANES";
                title1.className = "font-bold text-gray-400 text-xs mb-1 uppercase tracking-wide";
                text1.innerText = "Sin datos...";
            } else if (unmitigatedCount > 0) {
                card1.classList.add('border-red-500', 'bg-red-50');
                icon1.classList.add('bg-red-100', 'text-red-600');
                title1.innerText = "⛔ PROYECTO VULNERABLE";
                title1.className = "font-bold text-red-700 text-xs mb-1 uppercase tracking-wide";
                text1.innerHTML = `Faltan <strong>${unmitigatedCount} Planes de Contingencia</strong> para riesgos críticos.`;
            } else if (highRiskCount > 0) {
                card1.classList.add('border-yellow-500');
                icon1.classList.add('bg-yellow-100', 'text-yellow-600');
                title1.innerText = "⚠️ COBERTURA COMPLETA";
                title1.className = "font-bold text-yellow-700 text-xs mb-1 uppercase tracking-wide";
                text1.innerText = "Tienes planes definidos, pero el nivel de amenaza inherente sigue siendo considerable.";
            } else {
                card1.classList.add('border-green-500');
                icon1.classList.add('bg-green-100', 'text-green-600');
                title1.innerText = "✅ COBERTURA SÓLIDA";
                title1.className = "font-bold text-green-700 text-xs mb-1 uppercase tracking-wide";
                text1.innerText = "Riesgos bajos y planes definidos. Buen control.";
            }
        }

        // --- RENDERIZADO TARJETA 2: EFECTIVIDAD (NUEVA LÓGICA) ---
        const card2 = document.getElementById('risk-effectiveness-card');
        const icon2 = document.getElementById('eff-icon-container');
        const title2 = document.getElementById('eff-title');
        const text2 = document.getElementById('eff-text');

        if(card2) {
             // Reset
            card2.className = "bg-white p-4 rounded-xl border-l-4 shadow-sm flex items-start gap-3 transition-all duration-500";
            icon2.className = "p-2 rounded-full flex-shrink-0 transition-colors duration-500";

            if (totalRisks === 0) {
                card2.classList.add('border-gray-300');
                icon2.classList.add('bg-gray-100', 'text-gray-400');
                title2.innerText = "IMPACTO ESTRATEGIA";
                text2.innerText = "Esperando evaluación...";
            } else if (criticalStagnant > 0) {
                // CASO ROJO: La estrategia no sirve (siguen críticos)
                card2.classList.add('border-red-500');
                icon2.classList.add('bg-red-100', 'text-red-600');
                title2.innerText = "❌ ESTRATEGIA INEFICAZ";
                title2.className = "font-bold text-red-700 text-xs mb-1 uppercase tracking-wide";
                text2.innerHTML = `Tus acciones <strong>NO reducen</strong> el impacto de ${criticalStagnant} riesgo(s) crítico(s). Busca soluciones más agresivas.`;
            } else if (riskReductionScore > 0) {
                // CASO VERDE: La mayoría de riesgos bajaron
                card2.classList.add('border-green-500');
                icon2.classList.add('bg-green-100', 'text-green-600');
                title2.innerText = "🚀 MITIGACIÓN EXITOSA";
                title2.className = "font-bold text-green-700 text-xs mb-1 uppercase tracking-wide";
                text2.innerText = "Tus planes logran reducir significativamente la exposición al riesgo del proyecto.";
            } else {
                // CASO AMARILLO: Resultados mixtos o estancados en nivel medio
                card2.classList.add('border-yellow-500');
                icon2.classList.add('bg-yellow-100', 'text-yellow-600');
                title2.innerText = "⚖️ IMPACTO LIMITADO";
                title2.className = "font-bold text-yellow-700 text-xs mb-1 uppercase tracking-wide";
                text2.innerText = "La estrategia contiene los riesgos pero no logra minimizarlos del todo.";
            }
        }
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
        // 1. Vincular Inversión del Ejercicio 6 (Monto como referencia principal)
        const montoRaw = document.getElementById('monto-inversion-e6')?.value || 0;
        const montoFmt = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(montoRaw);

        // 2. Vincular Área y Táctica del Ejercicio 5 (Seleccionadas en Ej10)
        const area = document.getElementById('area-select-e10')?.value || "_______";
        const tactic = document.getElementById('tactic-select-e10')?.value || "_______";

        const pitchDisplay = document.getElementById('pitch-final-display');
        if (pitchDisplay) {
            // Estructura de Reflexión Estratégica
            pitchDisplay.innerHTML = `
                La inversión de <span class="text-brand-orange font-bold">${montoFmt}</span> 
                enfocada en <span class="text-brand-blue font-bold">${area}</span> 
                a través de <span class="text-brand-blue font-bold">${tactic}</span>. 
                Tras evaluarla, ¿consideras que es la mejor inversión posible para generar crecimiento? 
                o ¿Podría haber una inversión de mayor impacto en otra área que sería conveniente abordar antes?
            `;
        }
    }
};

/* === MOTOR LÓGICO DEL EJERCICIO 11: PLAN DE IMPLEMENTACIÓN (RESUMEN EJECUTIVO) === */
const ImplementationManager = {
    init: function() {
        // Escuchamos cuando el usuario entra a esta sección para refrescar los datos
        window.addEventListener('hashchange', () => {
            if (window.location.hash === '#ej11') {
                this.refreshSummary();
            }
        });
    },

    refreshSummary: function() {
        // 1. Extraer Pitch del Ejercicio 10
        const pitch = document.getElementById('pitch-final-display')?.innerHTML || "Pendiente de definir en Ejercicio 10";
        document.getElementById('summary-pitch').innerHTML = pitch;

        // 2. Extraer Viabilidad Financiera (Ej 6 y 7) - ACTUALIZADO CON TRAZABILIDAD TOTAL
        const roi = document.getElementById('rendimiento-anualizado-result')?.innerText || "0%";
        const mesesFcl = document.getElementById('meses-fcl-result')?.innerText || "0";
        const semaforoMonto = document.getElementById('semaforo-meses-fcl')?.innerText || "Sin datos";
        const porcentajeConsumo = document.getElementById('porcentaje-consumo-e7')?.innerText || "0";
        const totalInversion = document.getElementById('total-consumo-e7')?.innerText || "$0";
        
        document.getElementById('summary-financial').innerHTML = `
            <div class="space-y-2">
                <div class="flex justify-between items-center p-3 bg-white rounded border">
                    <span class="text-sm font-medium text-gray-600">Retorno Anualizado:</span>
                    <span class="font-bold brand-blue">${roi}</span>
                </div>
                <div class="flex justify-between items-center p-3 bg-white rounded border">
                    <span class="text-sm font-medium text-gray-600">Esfuerzo (Meses FCL):</span>
                    <span class="font-bold brand-orange">${mesesFcl} meses</span>
                </div>
                <div class="p-3 bg-blue-50 rounded border border-blue-100">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[10px] font-black text-blue-800 uppercase">Capacidad Anual Comprometida</span>
                        <span class="text-xs font-bold ${porcentajeConsumo > 50 ? 'text-red-600' : 'text-blue-700'}">${porcentajeConsumo}%</span>
                    </div>
                    <p class="text-[10px] text-gray-500 italic leading-tight">Esta inversión representa ${totalInversion} de tu liquidez anual disponible.</p>
                </div>
            </div>
        `;

        // 3. Extraer Riesgos Críticos (Ej 9)
        const riesgos = Array.from(document.querySelectorAll('#risk-table-body tr')).slice(0, 2); // Tomamos los 2 primeros
        const riskContainer = document.getElementById('summary-risks');
        
        if (riesgos.length > 0 && riesgos[0].querySelector('input')?.value) {
            riskContainer.innerHTML = riesgos.map(tr => {
                const desc = tr.querySelector('input')?.value || "Riesgo no definido";
                const planA = tr.querySelector('textarea')?.value || "Sin plan de mitigación";
                return `<div class="mb-2 p-2 bg-red-50 rounded border border-red-100">
                            <p class="text-xs font-bold text-red-800">🚨 ${desc}</p>
                            <p class="text-[10px] text-red-700 italic">Plan A: ${planA}</p>
                        </div>`;
            }).join('');
        } else {
            riskContainer.innerHTML = `<p class="text-xs text-gray-400 italic">No se han registrado riesgos en el Ejercicio 9.</p>`;
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const navMenu = document.getElementById('nav-menu').querySelector('ul');

    // 1. Definición de Secciones (Incluye Ejercicio 11)
    const sectionsData = [
        { id: 'ej1', title: '1. Diagnóstico de Consolidación', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2' },
        { id: 'ej2', title: '2. Plan de Acción', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'ej3', title: '3. Autoevaluación de gestión', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
        { id: 'ej4', title: '4. Flujo de Caja Libre', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'ej5', title: '5. Prioridades de Negocio', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { id: 'ej6', title: '6. Evaluación del Rendimiento', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
        { id: 'ej7', title: '7. Evaluación del Monto', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
        { id: 'ej8', title: '8. Evaluación del Plazo', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'ej9', title: '9. Evaluación del Riesgo', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
        { id: 'ej10', title: '10. Evaluación del Propósito', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { id: 'ej11', title: '11. Plan de Implementación', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' }
    ];

    // 2. Generación dinámica de navegación por bloques
    const createNavItem = (data) => {
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
    };

    const addNavTitle = (text) => {
        const titleLi = document.createElement('li');
        titleLi.className = "mt-6 mb-2 px-3 text-[10px] font-black text-gray-400 uppercase tracking-widest";
        titleLi.innerText = text;
        navMenu.appendChild(titleLi);
    };

    // A. Bloque 1: Los primeros 5 ejercicios (Diagnóstico)
addNavTitle("Diagnóstico inicial");
sectionsData.slice(0, 5).forEach(createNavItem); 

// B. Bloque 2: Del ejercicio 6 al 10 (Metodología)
addNavTitle("Metodología para evaluar inversiones");
sectionsData.slice(5, 10).forEach(createNavItem); 

// C. Bloque 3: El último ejercicio (Cierre)
addNavTitle("Cierre y Ejecución"); 
sectionsData.slice(10).forEach(createNavItem);

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
                    "Conocías tu Flujo de Caja Libre (FCL) al momento de invertir. <button class='fcl-trigger' onclick='openFCLInfo(event)'>i</button>",
                    "Ponderaste la inversión según tu FCL contra otras posibles inversiones. <button class='fcl-trigger' onclick='openFCLInfo(event)'>i</button>",
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
                <h2 class="text-2xl font-bold brand-orange mb-4 flex items-center">
                    4. Cálculo de Flujo de Caja Libre
                    <button class="fcl-trigger" onclick="openFCLInfo(event)" title="¿Qué es el FCL?">i</button>
                </h2>
                <div class="instructions-box">
                    <p><strong>Objetivo Transformacional:</strong> Descubrirás la "liquidez Real" de tu negocio. El Flujo de Caja Libre (FCL) es el capital que queda tras cumplir con todas tus obligaciones operativas; es el único recurso con el que puedes comprar el futuro sin asfixiar el presente.</p>
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
                        <div id="fcl-cta-container-2-2" class="mt-8 hidden animate-fade-in"></div>
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
                            <label class="text-gray-600 mb-4 block">Captura las 5 prioridades o proyectos que tienes en mente. No te limites, este es tu inventario de posibilidades antes del filtro estratégico <strong>(Recuerda que no pueden existir dos prioridades con el mismo nivel)</strong>.</label>
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
                                
                                <div id="priority-areas-container" class="space-y-4"></div>

                                <div class="mt-8 p-6 bg-orange-50 border-2 border-dashed border-brand-orange rounded-2xl flex flex-col md:flex-row items-center gap-6 animate-fade-in">
                                    <div class="flex-1">
                                        <p class="text-gray-800 font-semibold text-lg leading-tight">
                                            ¿Te gustaría una llamada de 1 a 1 para definir esto con tu consultor de Mi Empresa Crece?
                                        </p>
                                    </div>
                                    <button onclick="window.sendConsultancyEmailCustom('Solicitud de Sesión 1 a 1 - Prioridades de Negocio')" 
                                            class="whitespace-nowrap bg-brand-orange hover:bg-orange-600 text-white font-black py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 uppercase tracking-tight">
                                        SOLICITAR SESIÓN 1 A 1
                                    </button>
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
        <h2 class="text-2xl font-bold brand-orange mb-4 flex items-center">
            ${sectionsData[6].title}
            <button class="fcl-trigger" onclick="openFCLInfo(event)" title="¿Qué es el FCL?">i</button>
        </h2>
        <div class="instructions-box">
            <p><strong>Objetivo Transformacional:</strong> Aprenderás a medir el "Peso Específico" de tu inversión. No importa si algo es barato o caro en términos absolutos, lo que importa es cuántos meses de tu "liquidez" (FCL) consume. El objetivo es asegurar que tu crecimiento no se convierta en tu sentencia de muerte por falta de liquidez.</p>
        </div>
        <div class="instructions-box !bg-gray-50 !border-brand-orange">
            <p><strong>Instrucciones:</strong> Utiliza el FCL promedio que calculaste en el Ejercicio 4 para determinar a cuántos meses de operación equivale este desembolso. Además, suma otros proyectos que tengas activos este año; si el total compromete más del 50% de tu FCL anual, estás entrando en zona de alto riesgo. Una inversión inteligente es aquella que el negocio puede "digerir" sin detenerse.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-gray-50 p-6 rounded-lg border">
                <h3 class="text-lg font-bold mb-4">Configuración de Capacidad (FCL)</h3>
                
                <div class="mb-6">
                    <p class="text-xs font-black text-gray-400 uppercase mb-4">¿Qué flujo usar para este análisis?</p>
                    <div class="fcl-selector-container">
                        <label class="fcl-option-card">
                            <input type="radio" name="fcl_source" value="real" class="autosave-input" data-id="ej7_fcl_source_real" onclick="toggleFCLSource('real')" checked>
                            <div class="fcl-option-content">
                                <span class="block text-lg font-bold">Usar FCL Ejercicio 4</span>
                                <span class="block text-xs text-gray-500 mt-1">(Dato Real)</span>
                            </div>
                        </label>
                        <label class="fcl-option-card">
                            <input type="radio" name="fcl_source" value="manual" class="autosave-input" data-id="ej7_fcl_source_manual" onclick="toggleFCLSource('manual')">
                            <div class="fcl-option-content">
                                <span class="block text-lg font-bold">Escenario Hipotético</span>
                                <span class="block text-xs text-gray-500 mt-1">(Dato Manual)</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="space-y-4">
                    <input type="hidden" id="fcl-mensual-e7" value="0">
                    
                    <div id="hypothetical-fcl-field" class="hypothetical-input-container">
                        <label class="block text-sm font-bold text-brand-orange mb-1 italic">Indica el FCL Mensual Hipotético:</label>
                        <input type="number" 
                               id="ej7_fcl_manual_value" 
                               class="autosave-input w-full p-2 border-2 border-brand-orange rounded-md bg-orange-50 outline-none" 
                               data-id="ej7_fcl_manual_value" 
                               placeholder="Ej: 50000">
                    </div>

                    <div class="p-4 bg-blue-900 rounded-xl text-white shadow-lg">
                        <p class="text-[10px] uppercase font-black opacity-60">FCL Mensual para evaluación:</p>
                        <p id="fcl-display-value" class="text-3xl font-black">$ 0.00</p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Monto de la Inversión que evalúas</label>
                        <p class="text-xs text-gray-500 mb-1 italic">Si no tienes un presupuesto real sustentado en cotizaciones, no dejes de elaborarlo, puedes hacer una evaluación preliminar con un estimado.</p>
                        <input type="number" id="monto-inversion-e7" placeholder="$30,000" 
                            class="autosave-input w-full mt-1 p-2 border rounded-md" 
                            data-section="ej7" data-id="ej7_monto_inversion"
                            oninput="AmountManager.calculateFCLMonths()">
                    </div>
                </div>
                </div>
                <div class="text-center mt-6 p-4 bg-white rounded-xl border shadow-inner">
                    <p class="text-xs text-gray-500 uppercase font-bold tracking-widest">Esta inversión equivale a:</p>
                    <div id="meses-fcl-result" class="text-5xl font-black my-2 text-brand-blue">0</div>
                    <p class="text-sm font-bold text-gray-600 uppercase">Meses de tu Flujo Libre</p>
                    <div id="semaforo-meses-fcl" class="semaforo-indicator bg-gray-400 inline-block mt-2 mb-4">Introduce datos</div>
                    
                    <div id="fcl-advice-box" class="hidden transition-all duration-500 ease-in-out">
                        <div id="fcl-advice-content" class="text-left text-sm p-4 rounded-lg border-l-4 shadow-sm">
                            <p class="font-bold mb-1" id="fcl-advice-title"></p>
                            <p class="text-gray-700 italic" id="fcl-advice-text"></p>
                        </div>
                    </div>
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

                <div id="ej7-cta-dynamic-container" class="mt-6 space-y-4">
                    <div class="p-4 bg-white border-2 border-dashed border-blue-200 rounded-xl hover:border-blue-400 transition-all">
                        <p class="text-sm text-gray-700 font-semibold mb-3 leading-tight">¿Quieres añadir un proyecto de inversión más ambicioso?</p>
                        <button onclick="window.sendConsultancyEmailCustom('Asesoría: Proyecto de Inversión Ambicioso')" 
                                class="w-full py-2 bg-brand-blue text-white text-xs font-black rounded-lg hover:bg-blue-800 transition-all uppercase">
                            Contáctanos
                        </button>
                    </div>

                    <div class="p-4 bg-white border-2 border-dashed border-orange-200 rounded-xl hover:border-orange-400 transition-all">
                        <p class="text-sm text-gray-700 font-semibold mb-3 leading-tight">¿Te gustaría la opinión de un experto para optimizar tu cesta de inversiones?</p>
                        <button onclick="window.sendConsultancyEmailCustom('Asesoría: Optimización de Cesta de Inversiones')" 
                                class="w-full py-2 bg-brand-orange text-white text-xs font-black rounded-lg hover:bg-orange-600 transition-all uppercase">
                            Solicitar Opinión Experta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 3.8 INYECCIÓN DEL EJERCICIO 8 (EVALUACIÓN DEL PLAZO)
    document.getElementById('ej8').innerHTML = `
        <h2 class="text-2xl font-bold brand-orange mb-4 flex items-center">
            ${sectionsData[7].title}
            <button class="fcl-trigger" onclick="openPlazoInfo(event)" title="Criterio de Plazos">i</button>
        </h2>
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
                            <th class="p-4 border-b w-1/5">Riesgo Identificado</th>
                            <th class="p-4 border-b w-1/6">Nivel de Impacto Inicial</th>
                            <th class="p-4 border-b w-1/5">Acción de Mitigación (Plan A)</th>
                            <th class="p-4 border-b w-1/5">Plan de Contingencia (Plan B)</th>
                            <th class="p-4 border-b w-1/6">Reevaluación del Impacto</th>
                        </tr>
                    </thead>
                    <tbody id="risk-table-body">
                        </tbody>
                </table>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 animate-fade-in">
                
                <div id="risk-interpretation-card" class="bg-white p-4 rounded-xl border-l-4 border-gray-300 shadow-sm flex items-start gap-3 transition-all duration-500">
                    <div id="risk-icon-container" class="bg-gray-100 p-2 rounded-full text-gray-500 flex-shrink-0 transition-colors duration-500">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <div>
                        <h4 id="risk-interpretation-title" class="font-bold text-gray-500 text-xs mb-1 uppercase tracking-wide">Cobertura de Planes</h4>
                        <p id="risk-interpretation-text" class="text-[10px] text-gray-500 leading-tight">
                            Esperando datos...
                        </p>
                    </div>
                </div>

                <div id="risk-effectiveness-card" class="bg-white p-4 rounded-xl border-l-4 border-gray-300 shadow-sm flex items-start gap-3 transition-all duration-500">
                    <div id="eff-icon-container" class="bg-gray-100 p-2 rounded-full text-gray-500 flex-shrink-0 transition-colors duration-500">
                        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    </div>
                    <div>
                        <h4 id="eff-title" class="font-bold text-gray-500 text-xs mb-1 uppercase tracking-wide">Impacto de la Estrategia</h4>
                        <p id="eff-text" class="text-[10px] text-gray-500 leading-tight">
                            Define el nivel de "Reevaluación" para medir tu éxito.
                        </p>
                    </div>
                </div>
            </div>
            <div class="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm animate-fade-in">
                <div class="flex-1">
                    <h5 class="font-bold text-brand-blue text-sm mb-1 flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        ¿Necesitas visión experta?
                    </h5>
                    <p class="text-xs text-blue-800 opacity-80 leading-relaxed">
                        A veces estamos demasiado cerca del proyecto para ver todos los riesgos. Un consultor puede ayudarte a identificar "puntos ciegos" y diseñar planes de contingencia blindados.
                    </p>
                </div>
                <button onclick="window.open('https://miempresacrece.com.mx/contacto', '_blank')" 
                    class="bg-brand-blue hover:bg-blue-800 text-white text-xs font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 whitespace-nowrap">
                    SOLICITAR AYUDA EXPERTA
                </button>
            </div>
    `;

    // Inicializamos el Manager después de inyectar el HTML
    RiskManager.init();

    // 3.10 INYECCIÓN DEL EJERCICIO 10 (EVALUACIÓN DEL PROPÓSITO)
    document.getElementById('ej10').innerHTML = `
        <h2 class="text-2xl font-bold brand-orange mb-4">10. Matriz de Definición Estratégica</h2>
        <div class="instructions-box">
            <p><strong>Objetivo Transformacional:</strong> Esta tabla consolida tu visión completa. Aquí es donde validas que tus prioridades financieras, tácticas y operativas están alineadas con el propósito de la empresa.</p>
        </div>

        <div class="overflow-x-auto bg-white rounded-2xl border shadow-sm">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-gray-800 text-white text-[10px] uppercase tracking-widest">
                        <th class="p-4 border-b w-1/4">Área y Prioridad (Paso 2)</th>
                        <th class="p-4 border-b w-1/4">Tácticas Seleccionadas (Paso 3)</th>
                        <th class="p-4 border-b w-1/4">Iniciativas</th>
                        <th class="p-4 border-b w-1/4">Éxito (El Resultado)</th>
                    </tr>
                </thead>
                <tbody id="matriz-estrategica-body">
                    </tbody>
            </table>
        </div>

        <div class="mt-8 p-8 bg-blue-900 text-white rounded-2xl shadow-2xl relative overflow-hidden">
            <h3 class="text-brand-orange font-black uppercase tracking-tighter mb-4 border-b border-blue-800 pb-2">Reflexión:</h3>
            <p id="pitch-final-display" class="text-lg italic font-light leading-relaxed">
                Completa los campos de la tabla para consolidar tu Pitch Estratégico...
            </p>
        </div>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            <div class="p-6 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-brand-orange hover:bg-orange-50 transition-all group text-center shadow-sm">
                <div class="mb-4 text-brand-orange group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                </div>
                <p class="text-base font-bold text-gray-800 mb-6 leading-tight">¿Te gustaría que te ayudáramos a identificar una mejor opción de inversión?</p>
                <button onclick="window.sendConsultancyEmailCustom('Solicitud Ej10: Identificar mejor opción de inversión')" 
                        class="w-full py-3 px-6 bg-brand-blue text-white font-black rounded-xl hover:bg-blue-800 transition-all transform hover:scale-105 text-sm uppercase shadow-md">
                    Explorar Opciones
                </button>
            </div>

            <div class="p-6 bg-white border-2 border-dashed border-gray-300 rounded-xl hover:border-brand-orange hover:bg-orange-50 transition-all group text-center shadow-sm">
                <div class="mb-4 text-brand-orange group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p class="text-base font-bold text-gray-800 mb-6 leading-tight">¿Te gustaría que un consultor te ayudara a garantizar el éxito de la inversión definida?</p>
                 <button onclick="window.sendConsultancyEmailCustom('Solicitud Ej10: Garantía de éxito en inversión')" 
                        class="w-full py-3 px-6 bg-brand-orange text-white font-black rounded-xl hover:bg-orange-600 transition-all transform hover:scale-105 text-sm uppercase shadow-md">
                    Asegurar mi Inversión
                </button>
            </div>
        </div>

        <div class="mt-10 p-6 bg-white border-2 border-brand-blue rounded-2xl shadow-inner text-center">
            <h4 class="text-lg font-bold brand-blue mb-3">¿Listo para consolidar tu diagnóstico?</h4>
            <button onclick="DataSyncManager.submitWorkbook()" 
                    class="bg-brand-orange hover:bg-orange-600 text-white font-black py-4 px-10 rounded-xl transition-all shadow-lg transform hover:scale-105">
                FINALIZAR Y ENVIAR RESULTADOS
            </button>
        </div>
    `;

    // Inyectamos la función de sincronización dentro del PurposeManager o globalmente
    window.syncStrategicMatrix = function() {
        const body = document.getElementById('matriz-estrategica-body');
        if (!body) return;

        body.innerHTML = PriorityManager.areas.map((area, i) => {
            const prioridad = document.querySelector(`[data-id="ej5_prio_val_${i}"]`)?.value || "N/A";
            const razon = document.querySelector(`[data-id="ej5_prio_reason_${i}"]`)?.value || "No definida";
            
            // Filtramos las tácticas que el usuario marcó en el paso 3 para ESTA área
            const areaTactics = PriorityManager.tacticsData[area] || [];
            const seleccionadas = Array.from(document.querySelectorAll('.tactic-checkbox:checked'))
                .map(cb => cb.value)
                .filter(val => areaTactics.includes(val));

            const tacticsHtml = seleccionadas.length > 0 
                ? seleccionadas.map(t => `<span class="block text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded mb-1 border border-blue-100 font-bold">${t}</span>`).join('')
                : '<span class="text-gray-400 italic text-xs">Sin tácticas</span>';

            return `
                <tr class="border-b hover:bg-gray-50 transition-colors">
                    <td class="p-4 align-top">
                        <div class="text-xs font-black text-brand-blue uppercase">${area}</div>
                        <div class="text-[10px] text-gray-500 mt-1">Prioridad: <strong>${prioridad}</strong></div>
                        <div class="text-[9px] text-gray-400 italic mt-1">${razon.substring(0,60)}...</div>
                    </td>
                    <td class="p-4 align-top">${tacticsHtml}</td>
                    <td class="p-4 align-top">
                        <div id="summary-inits-${i}" class="space-y-2">
                            ${(() => {
                                // Obtenemos todas las iniciativas guardadas en el Ejercicio 5
                                const inits = Array.from(document.querySelectorAll('#initiatives-container textarea'))
                                    .map(txt => txt.value)
                                    .filter(val => val.trim() !== "");
                                
                                // Si el área actual es la seleccionada como prioridad 1, mostramos las iniciativas
                                return (prioridad === "1" && inits.length > 0) 
                                    ? inits.map(text => `<p class="text-[10px] bg-orange-50 text-gray-700 p-2 rounded border border-orange-100 font-medium">🎯 ${text}</p>`).join('')
                                    : '<span class="text-gray-400 italic text-[10px]">Pendiente de iniciativas en Paso 5</span>';
                            })()}
                        </div>
                    </td>
                    <td class="p-4 align-top">
                        <textarea class="autosave-input w-full p-2 border rounded text-xs h-20 focus:ring-1 focus:ring-brand-orange" 
                            data-section="ej10" data-id="ej10_res_${i}" placeholder="Resultado esperado..."
                            oninput="PurposeManager.updatePitch()"></textarea>
                    </td>
                </tr>
            `;
        }).join('');
    };

    // 3.11 INYECCIÓN DEL EJERCICIO 11 (PLAN DE IMPLEMENTACIÓN)
    document.getElementById('ej11').innerHTML = `
        <h2 class="text-2xl font-bold brand-orange mb-4">11. Plan de Implementación Estratégico</h2>
        <div class="instructions-box">
            <p><strong>Objetivo Transformacional:</strong> Este es tu tablero de comando. Aquí consolidamos tu visión, tu capacidad financiera y tu gestión de riesgos en un solo plan de acción. No es solo un resumen; es la hoja de ruta que llevarás a la ejecución real.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div class="lg:col-span-2 bg-blue-900 text-white p-6 rounded-2xl shadow-lg">
                <h3 class="text-brand-orange font-black text-xs uppercase mb-3 tracking-widest">Resumen del Propósito (Pitch)</h3>
                <div id="summary-pitch" class="text-lg italic font-light leading-relaxed opacity-90">
                    Cargando tu declaración de propósito...
                </div>
            </div>

            <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h3 class="text-gray-800 font-black text-xs uppercase mb-3 tracking-widest">Viabilidad Financiera</h3>
                <div id="summary-financial"></div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h3 class="text-red-600 font-black text-xs uppercase mb-3 tracking-widest">Riesgos Críticos a Monitorear</h3>
                <div id="summary-risks"></div>
            </div>

            <div class="p-6 bg-brand-orange/5 rounded-2xl border-2 border-dashed border-brand-orange">
                <h3 class="text-brand-orange font-black text-xs uppercase mb-3 tracking-widest">Primer Paso Inmediato (Ejecución)</h3>
                <p class="text-xs text-gray-600 mb-3 italic">¿Cuál es la acción específica que realizarás en las próximas 48 horas para arrancar este proyecto?</p>
                <textarea class="autosave-input w-full p-3 border border-brand-orange/30 rounded-xl text-sm focus:ring-2 focus:ring-brand-orange outline-none h-24" 
                          data-section="ej11" data-id="ej11_first_step" 
                          placeholder="Ej: Llamar al proveedor para confirmar existencias y tiempos de entrega..."></textarea>
            </div>
        </div>

        <div class="mt-8 p-8 bg-gray-900 rounded-3xl text-center text-white">
            <h3 class="text-2xl font-bold mb-4 italic">"Una visión sin ejecución es solo una alucinación."</h3>
            <p class="text-gray-400 mb-6 max-w-2xl mx-auto">Has completado el rigor técnico necesario para ser un Arquitecto de Inversiones. Tu siguiente paso es descargar tu PDF y agendar la sesión de revisión con tu consultor.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button onclick="window.scrollTo(0,0); document.querySelector('a[href=\\'#ej10\\']').click();" 
                        class="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all text-sm font-bold uppercase">
                    Revisar Detalles
                </button>
                <button onclick="DataSyncManager.submitWorkbook()" 
                        class="px-10 py-3 bg-brand-orange text-white rounded-xl font-black shadow-lg hover:scale-105 transition-all uppercase">
                    Sincronizar y Cerrar Plan
                </button>
            </div>
        </div>
    `;

    // Inicializamos el Manager para cargar las áreas
    PurposeManager.init();

    // 4. Lógica de Navegación y Persistencia (Auto-guardado)
    const PersistenceManager = {
        save: function() {
            const data = {};
            document.querySelectorAll('.autosave-input').forEach(el => {
                if (el.type === 'checkbox') data[el.dataset.id] = el.checked;
                else if (el.type === 'radio') {
                    if (el.checked) data[el.dataset.id] = el.value;
                } else data[el.dataset.id] = el.value;
            });
            localStorage.setItem('workbook_sesion_c', JSON.stringify(data));
        },
        load: function() {
            const data = JSON.parse(localStorage.getItem('workbook_sesion_c') || '{}');
            Object.keys(data).forEach(id => {
                const elements = document.querySelectorAll(`[data-id="${id}"]`);
                
                elements.forEach((el, index) => {
                    // 1. Cargar el valor
                    if (el.type === 'checkbox') {
                        el.checked = data[id];
                    } else if (el.type === 'radio') {
                        if (el.value === data[id]) el.checked = true;
                    } else {
                        el.value = data[id];
                    }

                    // 2. Bloqueo Quirúrgico: Si es nombre/empresa y NO es el primero (el Master), bloquear.
                    const isIdentityField = (id === 'sesionc_nombre_participante' || id === 'sesionc_nombre_empresa');
                    if (isIdentityField && index > 0) {
                        el.readOnly = true;
                        el.classList.add('bg-gray-100', 'cursor-not-allowed', 'opacity-75');
                        el.placeholder = "Sincronizado...";
                    }
                });
            });
            // Recalcular y sincronizar estados dinámicos tras la carga de datos (Hydration)
            setTimeout(() => {
                // 1. Cálculos base de motores lógicos
                if (typeof window.calculateEj3Scores === 'function') window.calculateEj3Scores();
                if (window.FCLManager) window.FCLManager.calculate();
                if (window.TimeManager) window.TimeManager.evaluate();
                if (window.PerformanceManager) window.PerformanceManager.calculateROI();

                // 2. Sincronización crítica del Ejercicio 7 (Fuente de FCL)
                // Buscamos cuál radio button quedó marcado para disparar su lógica visual
                const savedFCLSource = document.querySelector('input[name="fcl_source"]:checked')?.value;
                if (savedFCLSource && typeof window.toggleFCLSource === 'function') {
                    window.toggleFCLSource(savedFCLSource);
                } else if (window.AmountManager) {
                    window.AmountManager.calculateFCLMonths();
                }

                // 3. Forzar actualización del Resumen si el usuario está en el cierre
                if (window.location.hash === '#ej11' && window.ImplementationManager) {
                    window.ImplementationManager.refreshSummary();
                }
            }, 200);
        }
    };

    function showSection(hash) {
        const id = hash.replace('#', '') || 'ej1';
        document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const target = document.getElementById(id);
        const link = document.querySelector(`a[href="#${id}"]`);
        if (target) target.classList.add('active');
        if (link) link.classList.add('active');
        window.scrollTo(0, 0);
        if (id === 'ej10') {
        window.syncStrategicMatrix();
        // Cargar datos guardados específicamente para los nuevos textareas generados
        PersistenceManager.load(); 
    }
    }

    // Eventos de Navegación y Guardado en Tiempo Real
    window.addEventListener('hashchange', () => showSection(window.location.hash));
    
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('autosave-input')) {
            const dataId = e.target.getAttribute('data-id');

            // Sincronización Quirúrgica: Si el campo es de identidad, replicar en todos los espejos
            if (dataId === 'sesionc_nombre_participante' || dataId === 'sesionc_nombre_empresa') {
                const mirrors = document.querySelectorAll(`[data-id="${dataId}"]`);
                mirrors.forEach(mirror => {
                    if (mirror !== e.target) mirror.value = e.target.value;
                });
            }
            
            PersistenceManager.save();
        }
    });
    
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('autosave-input')) PersistenceManager.save();
    });

    // Inicialización al cargar la página
    PersistenceManager.load();
    showSection(window.location.hash);

    // Al final del DOMContentLoaded
    ImplementationManager.init();
    
});

const DataSyncManager = {
    // Reemplaza con la URL que copiaste de Google Apps Script
    SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzRnmvd8-IliBupS-Tj70_zdO_6_yP8pGuDIDDiRnSJIGZ1-tQcOxfj9z-W7qMs5kFtyw/exec",

    async submitWorkbook() {
        const btn = document.getElementById('btn-submit-workbook');
        if (btn) btn.disabled = true; // Evitar múltiples envíos

        const name = document.querySelector('[data-id="sesionc_nombre_participante"]')?.value || "Sin Nombre";
        const inputs = document.querySelectorAll('.autosave-input');
        
        const payload = {
            // DEBE SER LA MISMA QUE PUSISTE EN EL SCRIPT DE GOOGLE
            token: "PROYECTO_DREAMS_2026", 
            timestamp: new Date().toLocaleString(),
            participante: name,
            respuestas: {}
        };

        // Recolección estandarizada de datos (Soporta Radio, Checkbox y Texto)
        inputs.forEach(input => {
            const id = input.getAttribute('data-id');
            if (!id) return;

            if (input.type === 'checkbox') {
                // Enviamos una respuesta clara para el análisis en Sheets
                payload.respuestas[id] = input.checked ? "Sí / Marcado" : "No / Sin marcar";
            } else if (input.type === 'radio') {
                // IMPORTANTE: Solo guardamos el valor de la opción que el usuario eligió
                if (input.checked) payload.respuestas[id] = input.value;
            } else {
                // Para campos de texto, números y áreas de reflexión
                payload.respuestas[id] = input.value;
            }
        });

        // Validación previa de conexión a internet
        if (!window.navigator.onLine) {
            alert("⚠️ No tienes conexión a internet. Revisa tu red para poder sincronizar tus respuestas.");
            if (btn) btn.disabled = false;
            return;
        }

        try {
            // Cambiamos el texto del botón para dar feedback de "Cargando"
            if (btn) btn.innerText = "⏳ Sincronizando...";

            await fetch(this.SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // Al ser no-cors, si el fetch no lanzó error de red, asumimos éxito tras una breve pausa
            setTimeout(() => {
                alert(`¡Excelente ${name}! Tus respuestas han sido enviadas a tu expediente. Ahora puedes exportar tu PDF.`);
                if (btn) {
                    btn.innerText = "✓ Información Sincronizada";
                    btn.classList.replace('bg-brand-orange', 'bg-green-600');
                }
            }, 1000);

        } catch (error) {
            console.error("Error en sincronización:", error);
            alert("❌ Error de comunicación: No se pudo conectar con el servidor. Verifica tu internet e intenta de nuevo.");
            if (btn) {
                btn.disabled = false;
                btn.innerText = "REINTENTAR ENVÍO";
            }
        }
    }
};

/* --- CONTROLADOR DE LA BURBUJA INFORMATIVA FCL --- */
const FCLInfoController = {
    init: function() {
        const modal = document.getElementById('fcl-modal');
        const overlay = document.getElementById('fcl-overlay');
        const closeBtn = document.getElementById('fcl-close');

        // Verificamos que los elementos existan en el DOM
        if (!modal || !overlay || !closeBtn) return;

        const toggle = (show) => {
            modal.classList.toggle('active', show);
            overlay.classList.toggle('active', show);
        };

        // Exponemos la función globalmente para los botones (i)
        window.openFCLInfo = (e) => {
            if (e) e.preventDefault();
            toggle(true);
        };

        // Eventos de cierre
        closeBtn.onclick = () => toggle(false);
        overlay.onclick = () => toggle(false);
        
        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') toggle(false);
        });
    }
};

/* --- NUEVO: CONTROLADOR DE LA BURBUJA INFORMATIVA PLAZO (EJERCICIO 8) --- */
const PlazoInfoController = {
    init: function() {
        const modal = document.getElementById('plazo-modal');
        // Reutilizamos el overlay del FCL para no duplicar elementos DOM innecesarios
        const overlay = document.getElementById('fcl-overlay');
        const closeBtn = document.getElementById('plazo-close');

        // Protección: Si no existen los elementos (ej. error de carga en HTML), no hacemos nada
        if (!modal || !overlay || !closeBtn) return;

        const toggle = (show) => {
            modal.classList.toggle('active', show);
            // Gestionamos el overlay compartido. Si abrimos, lo activamos.
            // Si cerramos, quitamos la clase active.
            if (show) overlay.classList.add('active');
            else overlay.classList.remove('active');
        };

        // Exponemos la función globalmente para el botón (i)
        window.openPlazoInfo = (e) => {
            if (e) e.preventDefault();
            e.stopPropagation(); // Evitamos conflictos de clic
            toggle(true);
        };

        // Eventos de cierre
        closeBtn.onclick = () => toggle(false);

        // IMPORTANTE: Usamos addEventListener en lugar de .onclick para el overlay
        // Esto permite que conviva con el controlador del FCL sin sobrescribir su comportamiento.
        // Al hacer clic en el fondo oscuro, se cerrarán ambos modales (si estuvieran abiertos).
        overlay.addEventListener('click', () => toggle(false));

        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') toggle(false);
        });
    }
};

// Inicialización de comportamientos dinámicos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // 1. Reactivación de Modales Informativos
    if (typeof FCLInfoController !== 'undefined') FCLInfoController.init();
    if (typeof PlazoInfoController !== 'undefined') PlazoInfoController.init();

    // 2. Control de visibilidad de Políticas de Compensación (Ejercicio 2)
    const compensacionRadios = document.querySelectorAll('input[name="tipo_compensacion"]');
    const toggleSections = () => {
        const selected = document.querySelector('input[name="tipo_compensacion"]:checked')?.value;
        const fijoSec = document.getElementById('sueldo-fijo-section');
        const varSec = document.getElementById('sueldo-variable-section');

        if (!fijoSec || !varSec) return;

        // Lógica de visualización quirúrgica
        fijoSec.style.display = (selected === 'fijo' || selected === 'mixto') ? 'block' : 'none';
        varSec.style.display = (selected === 'variable' || selected === 'mixto') ? 'block' : 'none';
    };

    // Escuchar cambios y ejecutar estado inicial
    compensacionRadios.forEach(r => r.addEventListener('change', toggleSections));
    toggleSections(); 
});

// 1. Función Maestra de Control (Corrige el conflicto Manual vs Hypothetical)
window.toggleFCLSource = function(source) {
    // Identificar elementos
    const container = document.querySelector('.hypothetical-input-container'); 
    const displayValue = document.getElementById('fcl-display-value'); 
    const manualInput = document.querySelector('[data-id="ej7_fcl_manual_value"]');
    const targetInput = document.getElementById('fcl-mensual-e7');

    // A. Gestión de Visibilidad
    // CORRECCIÓN: Aceptamos 'manual' (del HTML) O 'hypothetical' para evitar fallos
    const isManualMode = (source === 'manual' || source === 'hypothetical');

    if (isManualMode) {
        if (container) container.classList.add('active');
        // Delay para asegurar que el elemento es visible antes del focus
        setTimeout(() => { if(manualInput) manualInput.focus(); }, 100);
    } else {
        if (container) container.classList.remove('active');
    }

    // B. Obtención y Limpieza del Valor
    let newVal = 0;
    
    if (source === 'real') {
        // Opción 1: Extraer del Ejercicio 4
        const realText = document.getElementById('avg-monthly-fcl-2-2')?.innerText || "$0.00";
        newVal = parseMoneySafe(realText);
    } else {
        // Opción 2: Usar valor manual ingresado
        newVal = parseMoneySafe(manualInput?.value || "0");
    }

    // C. Renderizado y Actualización Global
    const fmt = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'});
    if (displayValue) displayValue.innerText = fmt.format(newVal);
    
    if (targetInput) {
        targetInput.value = newVal;
        // Forzamos el recálculo inmediato del Ejercicio 7
        if (typeof AmountManager !== 'undefined') {
            AmountManager.calculateFCLMonths();
        }
    }
};

// 2. Utilidad de Limpieza (Centralizada aquí para asegurar disponibilidad)
function parseMoneySafe(value) {
    if (!value) return 0;
    if (typeof value === 'number') return value;
    // Elimina todo lo que no sea número, punto o guion (soporta negativos)
    const cleanStr = value.toString().replace(/[^\d.-]/g, '');
    return parseFloat(cleanStr) || 0;
}

// 3. Inicialización de Eventos (DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Listeners para los Radio Buttons del Ejercicio 7
    const radios = document.querySelectorAll('input[name="fcl_source"]');
    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            window.toggleFCLSource(e.target.value);
        });
    });

    // B. Listener para escritura en tiempo real (Input Manual)
    const manualField = document.querySelector('[data-id="ej7_fcl_manual_value"]');
    if (manualField) {
        manualField.addEventListener('input', (e) => {
            // CORRECCIÓN: Buscamos el radio button con value="manual" que es como está en el HTML
            const manualRadio = document.querySelector('input[name="fcl_source"][value="manual"]');
            
            if (manualRadio && manualRadio.checked) {
                const val = parseMoneySafe(e.target.value);
                const displayValue = document.getElementById('fcl-display-value');
                const targetInput = document.getElementById('fcl-mensual-e7');
                
                // Actualizamos visualmente el cuadro azul
                if (displayValue) displayValue.innerText = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'}).format(val);
                
                // Actualizamos el dato oculto y recalculamos
                if (targetInput) {
                    targetInput.value = val;
                    if (typeof AmountManager !== 'undefined') {
                        AmountManager.calculateFCLMonths();
                    }
                }
            }
        });
    }

    // C. Restaurar estado inicial al cargar la página
    // Si el usuario ya había seleccionado una opción, aplicamos la lógica de inmediato
    const selectedSource = document.querySelector('input[name="fcl_source"]:checked');
    if (selectedSource) {
        window.toggleFCLSource(selectedSource.value);
    }
});