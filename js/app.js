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
            id: 'ej3',
            title: '3. Práctica de Inversiones',
            icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            content: `
                <div class="max-w-4xl mx-auto">
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold text-brand-blue mb-4">Práctica de Análisis de Inversiones</h2>
                        <div class="instructions-box text-sm">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                Calculadora de ROI
                            </h4>
                            <p>Utiliza esta herramienta para evaluar la viabilidad de una inversión potencial (maquinaria, software, capacitación, etc.).</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 class="font-bold text-gray-700 mb-4 border-b pb-2">1. Datos de la Inversión</h3>
                            
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-600 mb-1">Nombre del Proyecto / Activo:</label>
                                    <input type="text" id="e3_project_name" class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Ej: Nueva Maquinaria">
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-600 mb-1">Costo Total de Inversión ($):</label>
                                    <input type="number" id="e3_investment_cost" class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00">
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-600 mb-1">Ganancia Esperada (Mensual $):</label>
                                    <input type="number" id="e3_monthly_return" class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00">
                                    <p class="text-xs text-gray-400 mt-1">* Ingreso adicional neto que generará este activo.</p>
                                </div>

                                <div>
                                    <label class="block text-sm font-semibold text-gray-600 mb-1">Costos de Mantenimiento (Mensual $):</label>
                                    <input type="number" id="e3_monthly_cost" class="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00">
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col justify-center">
                            <h3 class="font-bold text-gray-700 mb-4 border-b pb-2">2. Análisis de Retorno</h3>
                            
                            <div class="space-y-6 text-center">
                                <div>
                                    <p class="text-sm text-gray-500 mb-1">Retorno de Inversión (ROI) Anual</p>
                                    <div id="e3_roi_display" class="text-4xl font-black text-gray-300">--- %</div>
                                </div>

                                <div>
                                    <p class="text-sm text-gray-500 mb-1">Tiempo de Recuperación</p>
                                    <div id="e3_payback_display" class="text-2xl font-bold text-gray-600">--- meses</div>
                                </div>

                                <div id="e3_verdict_box" class="p-4 rounded bg-white border border-gray-200 mt-4 hidden">
                                    <p class="font-bold text-sm uppercase tracking-wide mb-1">Veredicto Financiero</p>
                                    <p id="e3_verdict_text" class="text-lg font-medium">---</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                        <h3 class="font-bold text-brand-blue mb-4">Reflexión Estratégica</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">¿Qué riesgos podrían afectar la ganancia esperada?</label>
                                <textarea id="e3_risk_analysis" rows="2" class="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"></textarea>
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-1">¿Es este el mejor uso de tu capital en este momento?</label>
                                <textarea id="e3_capital_use" rows="2" class="w-full p-2 border border-blue-200 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                `,
            initFunction: () => {
                // --- LÓGICA ORIGINAL DE CÁLCULO (Preservada) ---
                
                const costInput = document.getElementById('e3_investment_cost');
                const returnInput = document.getElementById('e3_monthly_return');
                const maintInput = document.getElementById('e3_monthly_cost');
                
                const roiDisplay = document.getElementById('e3_roi_display');
                const paybackDisplay = document.getElementById('e3_payback_display');
                const verdictBox = document.getElementById('e3_verdict_box');
                const verdictText = document.getElementById('e3_verdict_text');

                function calculate() {
                    const cost = parseFloat(costInput.value) || 0;
                    const monthlyReturn = parseFloat(returnInput.value) || 0;
                    const monthlyCost = parseFloat(maintInput.value) || 0;

                    if (cost > 0) {
                        // 1. Cálculo de Flujo Neto Mensual
                        const netMonthly = monthlyReturn - monthlyCost;
                        
                        // 2. Cálculo de Payback (Meses para recuperar)
                        let monthsToRecover = 0;
                        if (netMonthly > 0) {
                            monthsToRecover = (cost / netMonthly).toFixed(1);
                        } else {
                            monthsToRecover = "Infinity";
                        }

                        // 3. Cálculo de ROI Anualizado ((Ganancia Neta Anual - Costo) / Costo) * 100
                        // *Nota: En ROI simple anual, asumimos el flujo neto x 12
                        const annualNet = netMonthly * 12;
                        const roi = ((annualNet - cost) / cost) * 100;

                        // --- Actualización de UI ---
                        
                        // Payback
                        if(netMonthly <= 0) {
                            paybackDisplay.textContent = "Nunca (Flujo negativo)";
                            paybackDisplay.className = "text-2xl font-bold text-red-500";
                        } else {
                            paybackDisplay.textContent = `${monthsToRecover} meses`;
                            paybackDisplay.className = "text-2xl font-bold text-gray-800";
                        }

                        // ROI
                        roiDisplay.textContent = `${roi.toFixed(1)}%`;
                        
                        // Colores y Veredicto
                        verdictBox.classList.remove('hidden');
                        if (roi > 20) {
                            roiDisplay.className = "text-4xl font-black text-green-600";
                            verdictBox.className = "p-4 rounded bg-green-50 border border-green-200 mt-4";
                            verdictText.textContent = "Excelente Oportunidad";
                            verdictText.className = "text-lg font-bold text-green-700";
                        } else if (roi > 0) {
                            roiDisplay.className = "text-4xl font-black text-yellow-600";
                            verdictBox.className = "p-4 rounded bg-yellow-50 border border-yellow-200 mt-4";
                            verdictText.textContent = "Rentable (Evaluar Riesgos)";
                            verdictText.className = "text-lg font-bold text-yellow-700";
                        } else {
                            roiDisplay.className = "text-4xl font-black text-red-600";
                            verdictBox.className = "p-4 rounded bg-red-50 border border-red-200 mt-4";
                            verdictText.textContent = "No Rentable / Pérdida";
                            verdictText.className = "text-lg font-bold text-red-700";
                        }

                    } else {
                        // Estado inicial
                        roiDisplay.textContent = "--- %";
                        roiDisplay.className = "text-4xl font-black text-gray-300";
                        paybackDisplay.textContent = "--- meses";
                        verdictBox.classList.add('hidden');
                    }
                }

                // Listeners para cálculo en tiempo real
                [costInput, returnInput, maintInput].forEach(input => {
                    if(input) input.addEventListener('input', calculate);
                });

                // Ejecutar cálculo inicial por si hay datos guardados (localStorage)
                // Usamos un pequeño delay para asegurar que el 'restoreData' global ya haya llenado los campos
                setTimeout(calculate, 100);
                }
        },
        
        {
            id: 'ej4',
            title: '4. Calculadora FCL',
            icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`,
            content: `
                <style>
                    .fcl-tab-button.active { border-bottom: 4px solid #F68D2E; color: #F68D2E; font-weight: 700; background-color: #fff; }
                    .fcl-tab-content { display: none; }
                    .fcl-tab-content.active { display: block; animation: fadeIn 0.3s ease-out; }
                </style>

                <div class="max-w-6xl mx-auto">
                    <div class="mb-8">
                        <h2 class="text-2xl font-bold text-brand-blue mb-4">Calculadora de Flujo de Caja Libre (FCL)</h2>
                        <div class="instructions-box text-sm">
                            <h4 class="font-bold mb-2 flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                Objetivo
                            </h4>
                            <p>Transformar el cálculo del FCL de una simple resta a un diagnóstico dinámico de tu capacidad real de inversión.</p>
                        </div>
                    </div>

                    <div id="fcl-container" class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div class="border-b border-gray-200 bg-gray-50">
                            <nav class="flex" aria-label="Tabs">
                                <button class="fcl-tab-button active flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-700 transition-all" data-tab="calculator">
                                    📊 Mi Calculadora FCL
                                </button>
                                <button class="fcl-tab-button flex-1 py-4 text-center font-medium text-gray-500 hover:text-gray-700 transition-all" data-tab="example">
                                    💡 Ejemplo Guiado
                                </button>
                            </nav>
                        </div>

                        <div id="calculator-content" class="fcl-tab-content active p-6">
                            <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                                <p class="text-gray-600 text-sm">Proyecta tu flujo de efectivo para los próximos meses:</p>
                                <div class="inline-flex rounded-lg shadow-sm">
                                    <button id="view-3m" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-50 focus:z-10 focus:ring-2 focus:ring-blue-500">3 Meses</button>
                                    <button id="view-6m" class="px-4 py-2 text-sm font-medium text-white bg-brand-blue border border-brand-blue rounded-r-lg hover:bg-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-500">6 Meses</button>
                                </div>
                            </div>

                            <div class="overflow-x-auto mb-8 border rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200" id="fcl-input-table">
                                    </table>
                            </div>

                            <div id="fcl-results-container" class="bg-gray-50 p-6 rounded-xl border border-gray-200 hidden">
                                <h3 class="text-lg font-bold text-gray-800 mb-6 text-center border-b pb-4">Diagnóstico de Capacidad de Inversión</h3>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100">
                                        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Promedio Mensual Disponible</p>
                                        <p id="avg-monthly-fcl" class="text-3xl font-black text-brand-blue">$0.00</p>
                                    </div>
                                    <div class="bg-white p-5 rounded-lg shadow-sm text-center border border-gray-100">
                                        <p class="text-xs text-gray-500 uppercase tracking-wide mb-1">Proyección Anualizada</p>
                                        <p id="annual-fcl" class="text-3xl font-black text-brand-blue">$0.00</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 class="font-bold text-gray-700 mb-4 text-sm text-center">Niveles de Riesgo para Inversión (Anual)</h4>
                                    <div class="space-y-3 text-sm">
                                        <div id="sem-green" class="flex items-center p-3 bg-green-50 border-l-4 border-green-500 rounded-r">
                                            <div class="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                                            <div class="flex-1 flex justify-between">
                                                <span class="font-bold text-green-900">Inversión Segura (0-8%)</span>
                                                <span class="font-mono text-green-700 val">---</span>
                                            </div>
                                        </div>
                                        <div id="sem-blue" class="flex items-center p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                                            <div class="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                                            <div class="flex-1 flex justify-between">
                                                <span class="font-bold text-blue-900">Inversión Calculada (8-20%)</span>
                                                <span class="font-mono text-blue-700 val">---</span>
                                            </div>
                                        </div>
                                        <div id="sem-yellow" class="flex items-center p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded-r">
                                            <div class="w-2 h-2 rounded-full bg-yellow-500 mr-3"></div>
                                            <div class="flex-1 flex justify-between">
                                                <span class="font-bold text-yellow-900">Alto Riesgo (21-70%)</span>
                                                <span class="font-mono text-yellow-700 val">---</span>
                                            </div>
                                        </div>
                                        <div id="sem-red" class="flex items-center p-3 bg-red-50 border-l-4 border-red-500 rounded-r">
                                            <div class="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                                            <div class="flex-1 flex justify-between">
                                                <span class="font-bold text-red-900">Peligro / Descapitalización (>70%)</span>
                                                <span class="font-mono text-red-700 val">---</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="example-content" class="fcl-tab-content p-6">
                            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                                <h4 class="font-bold text-brand-blue mb-2">Caso: "Creativa Digital"</h4>
                                <p class="text-sm text-gray-700">Agencia con 5 empleados. Ingresos variables pero gastos fijos altos. En verano sus ventas caen a la mitad.</p>
                            </div>
                            <img src="https://placehold.co/800x400/f8fafc/cbd5e1?text=Tabla+de+Ejemplo+FCL+(Imagen+Placeholder)" class="w-full rounded border shadow-sm" alt="Ejemplo FCL">
                        </div>
                    </div>
                </div>
                `,
            initFunction: () => {
                const container = document.getElementById('fcl-container');
                if (!container) return;

                let period = 6;
                const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

                // Configuración de filas
                const tableConfig = [
                    { category: 'INGRESOS', type: 'header', color: 'blue' },
                    { id: 'sales', label: 'Ventas Cobradas', type: 'row' },
                    { id: 'other_inc', label: 'Otros Ingresos', type: 'row' },
                    { category: 'EGRESOS FIJOS', type: 'header', color: 'red' },
                    { id: 'rent', label: 'Renta / Oficina', type: 'row' },
                    { id: 'payroll', label: 'Nómina Fija', type: 'row' },
                    { id: 'services', label: 'Servicios / Software', type: 'row' },
                    { category: 'EGRESOS VARIABLES', type: 'header', color: 'yellow' },
                    { id: 'cogs', label: 'Costo de Ventas', type: 'row' },
                    { id: 'ads', label: 'Publicidad / Ads', type: 'row' }
                ];

                // Función Principal: Construir Tabla
                const buildTable = () => {
                    const table = document.getElementById('fcl-input-table');
                    table.innerHTML = '';

                    // Header
                    let thead = `<thead class="bg-gray-50"><tr><th class="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase w-1/3">Concepto</th>`;
                    for(let i=1; i<=period; i++) thead += `<th class="px-2 py-3 text-center text-xs font-bold text-gray-500 uppercase">Mes ${i}</th>`;
                    thead += `</tr></thead>`;
                    table.innerHTML = thead;

                    // Body
                    const tbody = document.createElement('tbody');
                    tbody.className = "bg-white divide-y divide-gray-200";
                    
                    tableConfig.forEach(row => {
                        const tr = document.createElement('tr');
                        if(row.type === 'header') {
                            const bg = row.color === 'blue' ? 'bg-blue-50 text-blue-800' : (row.color === 'red' ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800');
                            tr.className = `${bg} font-bold text-xs uppercase tracking-wider`;
                            tr.innerHTML = `<td colspan="${period+1}" class="px-4 py-2">${row.category}</td>`;
                        } else {
                            let html = `<td class="px-4 py-2 text-sm text-gray-600 font-medium">${row.label}</td>`;
                            for(let i=1; i<=period; i++) {
                                // ID único: fcl_sales_1, fcl_rent_2, etc.
                                const inputId = `fcl_${row.id}_${i}`;
                                // Nota el oninput: guarda en localStorage al escribir
                                html += `<td class="p-1"><input type="number" id="${inputId}" class="w-full text-right p-1.5 border border-gray-300 rounded text-sm focus:border-brand-blue outline-none" placeholder="0" oninput="localStorage.setItem('sesionc_ej4_'+this.id, this.value)"></td>`;
                            }
                            tr.innerHTML = html;
                        }
                        tbody.appendChild(tr);
                    });
                    table.appendChild(tbody);

                    // Restaurar datos guardados y Recalcular
                    restoreLocalData();
                    calculate();
                };

                const restoreLocalData = () => {
                    container.querySelectorAll('input').forEach(input => {
                        const saved = localStorage.getItem('sesionc_ej4_' + input.id);
                        if(saved) input.value = saved;
                    });
                };

                const calculate = () => {
                    const getData = (id, month) => parseFloat(document.getElementById(`fcl_${id}_${month}`)?.value || 0);
                    
                    let totalFCL = 0;
                    let monthlyFCLs = [];

                    for(let i=1; i<=period; i++) {
                        const income = getData('sales', i) + getData('other_inc', i);
                        const expenses = getData('rent', i) + getData('payroll', i) + getData('services', i) + getData('cogs', i) + getData('ads', i);
                        const fcl = income - expenses;
                        totalFCL += fcl;
                        monthlyFCLs.push(fcl);
                    }

                    const avg = totalFCL / period;
                    const annual = avg * 12;

                    // Update DOM
                    document.getElementById('avg-monthly-fcl').textContent = formatCurrency(avg);
                    document.getElementById('annual-fcl').textContent = formatCurrency(annual);
                    
                    const resContainer = document.getElementById('fcl-results-container');
                    resContainer.classList.remove('hidden');

                    // Semáforos
                    const ranges = [
                        { id: 'sem-green', min: 0, max: annual * 0.08 },
                        { id: 'sem-blue', min: annual * 0.08, max: annual * 0.20 },
                        { id: 'sem-yellow', min: annual * 0.20, max: annual * 0.70 },
                        { id: 'sem-red', min: annual * 0.70, max: annual }
                    ];

                    ranges.forEach(r => {
                        const el = document.querySelector(`#${r.id} .val`);
                        if(annual > 0) {
                            el.textContent = `${formatCurrency(r.min)} - ${formatCurrency(r.max)}`;
                        } else {
                            el.textContent = "---";
                        }
                    });
                };

                // Event Listeners
                container.addEventListener('input', calculate);

                // Tabs
                container.querySelectorAll('.fcl-tab-button').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const tab = btn.dataset.tab;
                        container.querySelectorAll('.fcl-tab-button').forEach(b => b.classList.remove('active', 'border-brand-orange', 'text-brand-orange', 'bg-white'));
                        btn.classList.add('active');
                        
                        container.querySelectorAll('.fcl-tab-content').forEach(c => c.classList.remove('active'));
                        document.getElementById(`${tab}-content`).classList.add('active');
                    });
                });

                // Period Toggle
                document.getElementById('view-3m').addEventListener('click', (e) => {
                    period = 3;
                    buildTable();
                    e.target.classList.replace('bg-white', 'bg-brand-blue');
                    e.target.classList.replace('text-gray-900', 'text-white');
                    e.target.classList.remove('border-gray-200');
                    e.target.classList.add('border-brand-blue');
                    
                    const other = document.getElementById('view-6m');
                    other.classList.replace('bg-brand-blue', 'bg-white');
                    other.classList.replace('text-white', 'text-gray-900');
                    other.classList.add('border-gray-200');
                });

                document.getElementById('view-6m').addEventListener('click', (e) => {
                    period = 6;
                    buildTable();
                    e.target.classList.replace('bg-white', 'bg-brand-blue');
                    e.target.classList.replace('text-gray-900', 'text-white');
                    
                    const other = document.getElementById('view-3m');
                    other.classList.replace('bg-brand-blue', 'bg-white');
                    other.classList.replace('text-white', 'text-gray-900');
                });

                // Inicializar
                buildTable();
            }
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