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
        
        {
            id: 'ej5',
            title: '5. Análisis de Prioridades',
            icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`,
            content: `
                <style>
                    .step-content { transition: all 0.5s ease-in-out; overflow: hidden; }
                    .hidden-step { opacity: 0; max-height: 0; margin: 0; padding: 0; pointer-events: none; }
                    .visible-step { opacity: 1; max-height: 2000px; margin-top: 2rem; }
                </style>

                <div class="max-w-4xl mx-auto" id="ej5-container">
                    <div class="mb-6">
                        <h2 class="text-2xl font-bold text-brand-orange mb-4">5. Análisis Rápido de Prioridades de Negocio</h2>
                        <div class="instructions-box text-sm">
                            <p><strong>Meta Transformacional:</strong> Pasar de una lista de ideas a un enfoque estratégico claro. Este ejercicio te guiará para identificar tu área de mayor prioridad y definir las iniciativas clave que impulsarán tu crecimiento.</p>
                        </div>
                    </div>

                    <div class="space-y-8">
                        <div id="step-1" class="step-content visible-step">
                            <h3 class="text-xl font-bold text-gray-800 mb-2">Paso 1: Lluvia de Ideas Estratégicas</h3>
                            <label class="text-gray-600 mb-4 block">Escribe hasta 5 prioridades de mejora o crecimiento que tengas en mente para tu negocio.</label>
                            <div class="space-y-3">
                                <input type="text" id="ej5_prio1" placeholder="Prioridad 1..." class="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-blue outline-none">
                                <input type="text" id="ej5_prio2" placeholder="Prioridad 2..." class="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-blue outline-none">
                                <input type="text" id="ej5_prio3" placeholder="Prioridad 3..." class="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-blue outline-none">
                                <input type="text" id="ej5_prio4" placeholder="Prioridad 4..." class="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-blue outline-none">
                                <input type="text" id="ej5_prio5" placeholder="Prioridad 5..." class="w-full p-3 border border-gray-300 rounded-lg focus:border-brand-blue outline-none">
                            </div>
                            <div class="text-right mt-6">
                                <button id="btn-start-analysis" class="bg-brand-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-800 transition-colors shadow-md">
                                    Terminé la lluvia de ideas, iniciar análisis →
                                </button>
                            </div>
                        </div>

                        <div id="guided-analysis-container" class="hidden space-y-8 border-t border-gray-200 pt-8 mt-8">
                            
                            <div id="step-2" class="step-content visible-step">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Paso 2: Priorización de Áreas Clave</h3>
                                <p class="text-gray-600 mb-4">Asigna una prioridad del 1 (más importante) al 4 a cada área estratégica y explica brevemente tu razonamiento.</p>
                                <div id="priority-areas-container" class="space-y-4">
                                    </div>
                            </div>

                            <div id="step-3" class="step-content hidden-step">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Paso 3: Selección de Tácticas</h3>
                                <p class="text-gray-600 mb-4">Basado en tu prioridad máxima (<strong id="selected-priority-area" class="text-brand-orange">---</strong>), selecciona <strong>exactamente 2 tácticas</strong> de interés.</p>
                                <div id="tactics-container" class="space-y-4">
                                    </div>
                            </div>
                            
                            <div id="step-4" class="step-content hidden-step">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Paso 4: Detalle de Iniciativas</h3>
                                <p class="text-gray-600 mb-4">Detalla una iniciativa concreta para cada táctica seleccionada.</p>
                                <div id="initiatives-container" class="space-y-6">
                                    </div>
                            </div>

                            <div id="step-5" class="step-content hidden-step">
                                <h3 class="text-xl font-bold text-gray-800 mb-2">Paso 5: Síntesis Estratégica</h3>
                                <p class="text-gray-600 mb-4">Este es el resumen de tu enfoque estratégico para las siguientes sesiones.</p>
                                <div id="synthesis-container" class="bg-blue-50 border border-blue-200 p-6 rounded-lg space-y-4 shadow-sm">
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                `,
            initFunction: () => {
                const container = document.getElementById('ej5-container');
                if(!container) return;

                // --- 1. DATOS MAESTROS ---
                const areas = {
                    Ventas: {
                        label: 'Ventas',
                        description: 'Incrementar unidades vendidas.',
                        tactics: [
                            { id: 'cierre', label: 'Incrementar tasa de cierre (Desempeño)' },
                            { id: 'canales', label: 'Aumentar canales / Prospectos (Desarrollo)' },
                            { id: 'recompra', label: 'Mejorar recompra y fidelización' }
                        ]
                    },
                    Utilidad: {
                        label: 'Utilidad',
                        description: 'Mejorar ganancia por unidad.',
                        tactics: [
                            { id: 'precio', label: 'Valor Percibido / Precio Premium' },
                            { id: 'costos', label: 'Optimización de Costos Producción' },
                            { id: 'eficiencia', label: 'Eficiencia en Costos Fijos' },
                            { id: 'cac', label: 'Eficiencia Comercial (CAC)' }
                        ]
                    },
                    Operacion: {
                        label: 'Operación',
                        description: 'Capacidad de entrega y soporte.',
                        tactics: [
                            { id: 'capacidad', label: 'Incrementar Capacidad Instalada' },
                            { id: 'atencion', label: 'Mejorar Calidad/Tiempos Atención' },
                            { id: 'soporte', label: 'Eficiencia Áreas Soporte (Admin/TI)' },
                            { id: 'mandos', label: 'Desarrollo Mandos Medios' }
                        ]
                    },
                    Expansion: {
                        label: 'Expansión',
                        description: 'Nuevos mercados o productos.',
                        tactics: [
                            { id: 'sucursales', label: 'Nuevas Sucursales' },
                            { id: 'territorios', label: 'Nuevos Territorios' },
                            { id: 'mercados', label: 'Nuevos Mercados' },
                            { id: 'productos', label: 'Nuevos Productos' }
                        ]
                    }
                };

                // --- 2. REFERENCIAS DOM ---
                const step1 = document.getElementById('step-1');
                const guidedContainer = document.getElementById('guided-analysis-container');
                const priorityContainer = document.getElementById('priority-areas-container');
                const tacticsContainer = document.getElementById('tactics-container');
                const initiativesContainer = document.getElementById('initiatives-container');
                const synthesisContainer = document.getElementById('synthesis-container');
                const selectedAreaLabel = document.getElementById('selected-priority-area');

                // Helper para visibilidad
                const setVisible = (id, visible) => {
                    const el = document.getElementById(id);
                    if(visible) { el.classList.remove('hidden-step'); el.classList.add('visible-step'); }
                    else { el.classList.add('hidden-step'); el.classList.remove('visible-step'); }
                };

                // --- 3. LOGICA PRINCIPAL ---

                // A. Renderizado Inicial (Paso 2)
                const renderPriorityAreas = () => {
                    priorityContainer.innerHTML = '';
                    Object.keys(areas).forEach(key => {
                        const area = areas[key];
                        const div = document.createElement('div');
                        div.className = 'grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-gray-50 p-4 rounded-lg border border-gray-100';
                        div.innerHTML = `
                            <div class="md:col-span-1">
                                <label class="font-bold text-gray-800">${area.label}</label>
                                <p class="text-xs text-gray-500">${area.description}</p>
                            </div>
                            <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                                <select id="ej5_prio_sel_${key}" data-area="${key}" class="priority-select w-full p-2 border rounded text-sm sm:col-span-1 bg-white">
                                    <option value="0">Prioridad...</option>
                                    <option value="1">1 (Máxima)</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                <textarea id="ej5_prio_reason_${key}" placeholder="¿Por qué?" rows="1" class="w-full p-2 border rounded text-sm sm:col-span-2"></textarea>
                            </div>
                        `;
                        priorityContainer.appendChild(div);
                    });

                    // Listeners dinámicos
                    priorityContainer.querySelectorAll('select, textarea').forEach(el => {
                        el.addEventListener('change', (e) => {
                            localStorage.setItem('sesionc_' + e.target.id, e.target.value);
                            if(e.target.tagName === 'SELECT') handlePriorityChange();
                        });
                        // Restaurar valor si existe
                        const saved = localStorage.getItem('sesionc_' + el.id);
                        if(saved) el.value = saved;
                    });
                };

                // B. Manejo de Cambio de Prioridad
                const handlePriorityChange = () => {
                    let minPrio = 5;
                    let topAreaKey = null;

                    priorityContainer.querySelectorAll('.priority-select').forEach(sel => {
                        const val = parseInt(sel.value);
                        if(val > 0 && val < minPrio) {
                            minPrio = val;
                            topAreaKey = sel.dataset.area;
                        }
                    });

                    if(topAreaKey) {
                        selectedAreaLabel.textContent = areas[topAreaKey].label;
                        renderTactics(topAreaKey);
                        setVisible('step-3', true);
                    } else {
                        setVisible('step-3', false);
                        setVisible('step-4', false);
                        setVisible('step-5', false);
                    }
                };

                // C. Renderizado Tácticas (Paso 3)
                const renderTactics = (areaKey) => {
                    tacticsContainer.innerHTML = '';
                    const area = areas[areaKey];
                    const div = document.createElement('div');
                    div.className = 'bg-gray-50 p-4 rounded-lg border border-gray-100';
                    
                    let html = `<h4 class="font-bold text-gray-800 mb-3 text-sm">Opciones para ${area.label}:</h4><div class="space-y-2">`;
                    area.tactics.forEach(t => {
                        html += `
                            <label class="flex items-center p-2 rounded hover:bg-white cursor-pointer transition">
                                <input type="checkbox" value="${t.label}" data-area="${areaKey}" id="ej5_tac_${t.id}" class="tactic-check w-5 h-5 text-brand-blue rounded border-gray-300">
                                <span class="ml-3 text-sm text-gray-700">${t.label}</span>
                            </label>`;
                    });
                    html += `</div>`;
                    div.innerHTML = html;
                    tacticsContainer.appendChild(div);

                    // Logic de checkboxes
                    const checks = tacticsContainer.querySelectorAll('.tactic-check');
                    checks.forEach(chk => {
                        // Restaurar
                        if(localStorage.getItem('sesionc_' + chk.id) === 'true') chk.checked = true;

                        chk.addEventListener('change', (e) => {
                            localStorage.setItem('sesionc_' + e.target.id, e.target.checked);
                            
                            // Validar max 2
                            const checked = Array.from(checks).filter(c => c.checked);
                            if(checked.length > 2) {
                                e.target.checked = false;
                                localStorage.setItem('sesionc_' + e.target.id, 'false');
                                alert("Solo puedes seleccionar 2 tácticas clave.");
                                return;
                            }
                            
                            if(checked.length === 2) {
                                renderInitiatives(areaKey, checked.map(c => c.value));
                                setVisible('step-4', true);
                            } else {
                                setVisible('step-4', false);
                                setVisible('step-5', false);
                            }
                        });
                    });
                    
                    // Trigger inicial por si ya había datos guardados
                    const checkedInitial = Array.from(checks).filter(c => c.checked);
                    if(checkedInitial.length === 2) {
                         renderInitiatives(areaKey, checkedInitial.map(c => c.value));
                         setVisible('step-4', true);
                    }
                };

                // D. Renderizado Iniciativas (Paso 4)
                const renderInitiatives = (areaKey, tacticsLabels) => {
                    initiativesContainer.innerHTML = '';
                    tacticsLabels.forEach((label, idx) => {
                        const div = document.createElement('div');
                        div.className = 'bg-gray-50 p-4 rounded-lg border border-gray-100';
                        div.innerHTML = `
                            <p class="text-xs font-bold text-brand-blue mb-1">Táctica ${idx+1}:</p>
                            <p class="text-sm font-bold text-gray-800 mb-2">${label}</p>
                            <textarea id="ej5_init_text_${idx}" placeholder="Describe la acción concreta..." rows="2" class="init-text w-full p-2 border rounded text-sm"></textarea>
                        `;
                        initiativesContainer.appendChild(div);
                    });

                    const texts = initiativesContainer.querySelectorAll('.init-text');
                    texts.forEach(txt => {
                        // Restaurar
                        const saved = localStorage.getItem('sesionc_' + txt.id);
                        if(saved) txt.value = saved;

                        txt.addEventListener('input', (e) => {
                            localStorage.setItem('sesionc_' + e.target.id, e.target.value);
                            
                            // Check completitud
                            const allFilled = Array.from(texts).every(t => t.value.trim().length > 0);
                            if(allFilled) {
                                renderSynthesis(areaKey, tacticsLabels);
                                setVisible('step-5', true);
                            } else {
                                setVisible('step-5', false);
                            }
                        });
                    });

                    // Trigger inicial
                    const allFilled = Array.from(texts).every(t => t.value.trim().length > 0);
                    if(allFilled && texts.length > 0) {
                        renderSynthesis(areaKey, tacticsLabels);
                        setVisible('step-5', true);
                    }
                };

                // E. Síntesis (Paso 5)
                const renderSynthesis = (areaKey, tactics) => {
                    const init1 = document.getElementById('ej5_init_text_0')?.value || '';
                    const init2 = document.getElementById('ej5_init_text_1')?.value || '';
                    
                    synthesisContainer.innerHTML = `
                         <div class="flex items-center gap-2 mb-4">
                            <span class="bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded">PRIORIDAD MÁXIMA</span>
                            <span class="text-lg font-bold text-gray-800">${areas[areaKey].label}</span>
                         </div>
                         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="bg-white p-3 rounded border border-gray-200">
                                <p class="text-xs text-gray-500 font-bold uppercase">Iniciativa 1</p>
                                <p class="text-sm font-bold text-brand-blue mb-1">${tactics[0]}</p>
                                <p class="text-sm text-gray-700 italic">"${init1}"</p>
                            </div>
                            <div class="bg-white p-3 rounded border border-gray-200">
                                <p class="text-xs text-gray-500 font-bold uppercase">Iniciativa 2</p>
                                <p class="text-sm font-bold text-brand-blue mb-1">${tactics[1]}</p>
                                <p class="text-sm text-gray-700 italic">"${init2}"</p>
                            </div>
                         </div>
                    `;
                };

                // --- 4. EVENTOS INICIALES ---
                document.getElementById('btn-start-analysis').addEventListener('click', () => {
                    step1.classList.add('hidden'); // Ocultar visualmente pero no destructivamente
                    guidedContainer.classList.remove('hidden');
                    localStorage.setItem('sesionc_ej5_started', 'true');
                });

                // Restaurar estado global del ejercicio
                if(localStorage.getItem('sesionc_ej5_started') === 'true') {
                    step1.classList.add('hidden');
                    guidedContainer.classList.remove('hidden');
                }

                // Arrancar lógica
                renderPriorityAreas();
                
                // Si ya había prioridades seleccionadas, esto desencadenará la cascada de restauraciones
                handlePriorityChange();
            }
        },
        
        {
            id: 'ej6',
            title: '6. Evaluación del Rendimiento',
            icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`,
            content: `
                <div class="max-w-5xl mx-auto">
                    <h2 class="text-2xl font-bold text-brand-orange mb-4">6. Evaluación del Rendimiento</h2>
                    <div class="instructions-box text-sm mb-8">
                        <p><strong>Meta Transformacional:</strong> Traducir tu inversión a un lenguaje universal (numérico o estratégico) para tomar decisiones objetivas y dejar de operar por "intuición".</p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        
                        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 class="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">A. Análisis Cuantitativo (ROI)</h3>
                            <p class="text-xs text-gray-500 mb-4">Úsalo para inversiones con beneficio medible directamente en dinero (maquinaria, campañas, stock).</p>
                            
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700">1. Monto Total Inversión ($)</label>
                                    <input type="number" id="e6_monto" placeholder="Ej: 100000" class="w-full mt-1 p-2 border border-gray-300 rounded focus:border-brand-blue outline-none transition-colors">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700">2. Rendimiento Total Esperado ($)</label>
                                    <input type="number" id="e6_rendimiento" placeholder="Ganancia total al final del periodo" class="w-full mt-1 p-2 border border-gray-300 rounded focus:border-brand-blue outline-none transition-colors">
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700">3. Plazo de Retorno (Meses)</label>
                                    <input type="number" id="e6_plazo" placeholder="Ej: 24" class="w-full mt-1 p-2 border border-gray-300 rounded focus:border-brand-blue outline-none transition-colors">
                                </div>
                            </div>

                            <div class="text-center mt-8 bg-white p-4 rounded-lg border border-gray-100">
                                <p class="text-gray-500 text-xs uppercase tracking-wide font-bold">Rendimiento Anualizado</p>
                                <div id="e6_roi_result" class="text-5xl font-black my-2 text-gray-300 transition-colors duration-500">0%</div>
                                <div id="e6_roi_badge" class="inline-block px-4 py-2 rounded-full font-bold text-white text-sm bg-gray-400 transition-colors duration-300">
                                    Faltan datos
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                            <h3 class="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">B. Análisis Cualitativo</h3>
                            <p class="text-xs text-gray-500 mb-4">Para inversiones estratégicas (software, capacitación, imagen) cuyo retorno directo es difícil de medir.</p>

                            <div class="space-y-6">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-1">¿Qué problema raíz resuelve?</label>
                                    <textarea id="e6_problema" rows="3" placeholder="Ej: Alta rotación de personal técnico que frena la operación..." class="w-full p-2 border border-gray-300 rounded focus:border-brand-blue outline-none text-sm"></textarea>
                                </div>
                                
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700 mb-2">Nivel de Impacto Estratégico</label>
                                    <select id="e6_calidad" class="w-full p-3 border border-gray-300 rounded bg-white focus:border-brand-blue outline-none text-sm cursor-pointer">
                                        <option value="default">Selecciona el nivel de impacto...</option>
                                        <option value="verde">🟢 ESTRATÉGICA: Resuelve una causa raíz (Vital)</option>
                                        <option value="azul">🔵 TÁCTICA: Resuelve un síntoma grave (Necesaria)</option>
                                        <option value="amarillo">🟡 ORDINARIA: Mejora marginal (Deseable)</option>
                                        <option value="rojo">🔴 BAJO IMPACTO: No resuelve problemas clave</option>
                                    </select>
                                </div>
                            </div>

                            <div class="text-center mt-8 bg-white p-4 rounded-lg border border-gray-100">
                                <p class="text-gray-500 text-xs uppercase tracking-wide font-bold">Calificación de Inversión</p>
                                <div id="e6_calidad_badge" class="inline-block mt-3 px-6 py-3 rounded-full font-bold text-white bg-gray-400 transition-all duration-300 transform scale-100">
                                    Pendiente
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                `,
            initFunction: () => {
                // --- 1. LÓGICA ROI (CUANTITATIVA) ---
                const montoInput = document.getElementById('e6_monto');
                const rendInput = document.getElementById('e6_rendimiento');
                const plazoInput = document.getElementById('e6_plazo');
                const roiResult = document.getElementById('e6_roi_result');
                const roiBadge = document.getElementById('e6_roi_badge');

                const calculateROI = () => {
                    const m = parseFloat(montoInput.value) || 0;
                    const r = parseFloat(rendInput.value) || 0;
                    const p = parseFloat(plazoInput.value) || 0;

                    if (m > 0 && p > 0) {
                        // Fórmula: (Ganancia / Inversión) / (Meses / 12) * 100
                        // Esto anualiza el rendimiento para poder compararlo con tasas bancarias anuales.
                        const roi = (r / m) / (p / 12) * 100;
                        
                        roiResult.textContent = `${roi.toFixed(1)}%`;

                        // Reglas de semáforo financiero
                        if (roi <= 10) {
                            roiBadge.textContent = 'Bajo Interés (Riesgo)';
                            roiBadge.className = 'inline-block px-4 py-2 rounded-full font-bold text-white text-sm bg-red-500';
                            roiResult.classList.replace('text-gray-300', 'text-red-500');
                        } else if (roi <= 20) {
                            roiBadge.textContent = 'Comparable (Mercado)';
                            roiBadge.className = 'inline-block px-4 py-2 rounded-full font-bold text-white text-sm bg-blue-500';
                            roiResult.classList.remove('text-gray-300', 'text-red-500', 'text-blue-700', 'text-green-500');
                            roiResult.classList.add('text-blue-500');
                        } else if (roi <= 30) {
                            roiBadge.textContent = 'Aceptable (Bueno)';
                            roiBadge.className = 'inline-block px-4 py-2 rounded-full font-bold text-white text-sm bg-blue-700';
                             roiResult.classList.remove('text-gray-300', 'text-red-500', 'text-blue-500', 'text-green-500');
                            roiResult.classList.add('text-blue-700');
                        } else {
                            roiBadge.textContent = 'Excelente Oportunidad';
                            roiBadge.className = 'inline-block px-4 py-2 rounded-full font-bold text-white text-sm bg-green-500 shadow-lg';
                            roiResult.classList.remove('text-gray-300', 'text-red-500', 'text-blue-500', 'text-blue-700');
                            roiResult.classList.add('text-green-500');
                        }
                    } else {
                        roiResult.textContent = '0%';
                        roiResult.className = 'text-5xl font-black my-2 text-gray-300 transition-colors duration-500';
                        roiBadge.textContent = 'Introduce datos';
                        roiBadge.className = 'inline-block px-4 py-2 rounded-full font-bold text-white text-sm bg-gray-400';
                    }
                };

                // Listeners ROI
                [montoInput, rendInput, plazoInput].forEach(input => {
                    input.addEventListener('input', calculateROI);
                });

                // --- 2. LÓGICA CUALITATIVA (SEMÁFORO) ---
                const calidadSelect = document.getElementById('e6_calidad');
                const calidadBadge = document.getElementById('e6_calidad_badge');

                const updateCalidad = () => {
                    const val = calidadSelect.value;
                    const config = {
                        verde: { t: 'INVERSIÓN ESTRATÉGICA', c: 'bg-green-500 shadow-lg scale-110' },
                        azul: { t: 'INVERSIÓN TÁCTICA', c: 'bg-blue-500' },
                        amarillo: { t: 'INVERSIÓN ORDINARIA', c: 'bg-yellow-500 text-black' },
                        rojo: { t: 'BAJO IMPACTO', c: 'bg-red-500' },
                        default: { t: 'Selecciona opción', c: 'bg-gray-400' }
                    };

                    const selection = config[val] || config.default;
                    calidadBadge.textContent = selection.t;
                    // Reset classes base y aplicar nuevas
                    calidadBadge.className = `inline-block mt-3 px-6 py-3 rounded-full font-bold text-white transition-all duration-300 transform ${selection.c}`;
                };

                calidadSelect.addEventListener('change', updateCalidad);

                // --- 3. RESTAURACIÓN DE ESTADO ---
                // Pequeño delay para asegurar que el sistema global 'restoreData' ya puso los valores en los inputs
                setTimeout(() => {
                    calculateROI();
                    updateCalidad();
                }, 100);
            }
        },

        {
            id: 'ej7',
            title: '7. Evaluación del Monto',
            icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            content: `
                <div class="max-w-6xl mx-auto">
                    <h2 class="text-2xl font-bold text-brand-orange mb-4">7. Evaluación del Monto de Inversión</h2>
                    <div class="instructions-box text-sm mb-8">
                        <p><strong>Meta Transformacional:</strong> Dejar de ver el costo como un número aislado y empezar a verlo como un porcentaje de tu capacidad real de generación de efectivo.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span class="bg-brand-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">A</span>
                                Impacto Individual (Meses de FCL)
                            </h3>
                            <p class="text-xs text-gray-500 mb-6">¿Cuántos meses de tu "Flujo Libre" actual cuesta este proyecto?</p>

                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700">Tu Flujo de Caja Libre (Mensual)</label>
                                    <input type="number" id="e7_fcl_mensual" placeholder="$0.00" class="w-full mt-1 p-2 border border-gray-300 rounded focus:border-brand-blue outline-none transition-colors">
                                    <p class="text-xs text-gray-400 mt-1">* Dato del Ejercicio 4</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-gray-700">Monto del Proyecto</label>
                                    <input type="number" id="e7_monto_proyecto" placeholder="$0.00" class="w-full mt-1 p-2 border border-gray-300 rounded focus:border-brand-blue outline-none transition-colors">
                                </div>
                            </div>

                            <div class="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-100 text-center">
                                <p class="text-xs font-bold text-gray-500 uppercase">Costo en "Meses de Trabajo"</p>
                                <div id="e7_meses_result" class="text-4xl font-black text-gray-800 my-2">0.0</div>
                                <div id="e7_semaforo_meses" class="inline-block px-3 py-1 rounded text-xs font-bold bg-gray-200 text-gray-600">
                                    Pendiente
                                </div>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span class="bg-brand-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">B</span>
                                Capacidad Anual (Portafolio)
                            </h3>
                            <p class="text-xs text-gray-500 mb-6">Suma todas tus inversiones deseadas y compáralas con tu capacidad anual.</p>

                            <div class="mb-4 flex justify-between items-end border-b pb-2">
                                <div>
                                    <p class="text-xs text-gray-500">Capacidad Anual de Inversión (FCL x 12)</p>
                                    <p id="e7_fcl_anual_display" class="text-xl font-bold text-brand-blue">$0.00</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-xs text-gray-500">Total Proyectos</p>
                                    <p id="e7_total_consumo" class="text-xl font-bold text-gray-800">$0.00</p>
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="block text-xs font-bold text-gray-700 mb-2">Lista de Inversiones (Suma aquí todos tus proyectos)</label>
                                <div id="e7_proyectos_list" class="space-y-2 max-h-40 overflow-y-auto pr-2">
                                    </div>
                                <button id="e7_btn_add" class="mt-2 text-xs font-bold text-brand-blue hover:text-blue-700 flex items-center gap-1">
                                    + Agregar Proyecto
                                </button>
                            </div>

                            <div class="mt-6">
                                <div class="flex justify-between text-xs mb-1">
                                    <span class="font-bold text-gray-700">Consumo de Capacidad</span>
                                    <span id="e7_porcentaje_consumo" class="font-bold text-gray-700">0%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                                    <div id="e7_consumo_bar" class="h-full bg-green-500 transition-all duration-500 ease-out" style="width: 0%"></div>
                                </div>
                                <div id="e7_semaforo_consumo" class="mt-2 text-center text-xs font-bold py-1 px-2 rounded bg-gray-100 text-gray-500">
                                    Nivel de Riesgo
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                `,
            initFunction: () => {
                // Referencias DOM
                const fclInput = document.getElementById('e7_fcl_mensual');
                const montoInput = document.getElementById('e7_monto_proyecto');
                const mesesResult = document.getElementById('e7_meses_result');
                const semaforoMeses = document.getElementById('e7_semaforo_meses');

                const fclAnualDisplay = document.getElementById('e7_fcl_anual_display');
                const totalConsumoDisplay = document.getElementById('e7_total_consumo');
                const consumoBar = document.getElementById('e7_consumo_bar');
                const porcentajeDisplay = document.getElementById('e7_porcentaje_consumo');
                const semaforoConsumo = document.getElementById('e7_semaforo_consumo');
                const proyectosList = document.getElementById('e7_proyectos_list');
                const btnAdd = document.getElementById('e7_btn_add');

                const formatCurrency = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

                // --- 1. LÓGICA IMPACTO INDIVIDUAL ---
                const calculateIndividual = () => {
                    const fcl = parseFloat(fclInput.value) || 0;
                    const monto = parseFloat(montoInput.value) || 0;

                    if (fcl > 0) {
                        const meses = monto / fcl;
                        mesesResult.textContent = meses.toFixed(1);

                        // Semáforo Meses
                        if (meses <= 1) {
                            semaforoMeses.className = 'inline-block px-3 py-1 rounded text-xs font-bold bg-green-100 text-green-700';
                            semaforoMeses.textContent = '🟢 Bajo Impacto (Fácil)';
                        } else if (meses <= 3) {
                            semaforoMeses.className = 'inline-block px-3 py-1 rounded text-xs font-bold bg-yellow-100 text-yellow-700';
                            semaforoMeses.textContent = '🟡 Moderado (Planear)';
                        } else {
                            semaforoMeses.className = 'inline-block px-3 py-1 rounded text-xs font-bold bg-red-100 text-red-700';
                            semaforoMeses.textContent = '🔴 Alto Impacto (Riesgo)';
                        }
                        
                        // Actualizar Anual también
                        calculatePortfolio();
                    } else {
                        mesesResult.textContent = '0.0';
                        semaforoMeses.className = 'inline-block px-3 py-1 rounded text-xs font-bold bg-gray-200 text-gray-600';
                        semaforoMeses.textContent = 'Introduce FCL';
                    }
                };

                // --- 2. LÓGICA PORTAFOLIO (BARRA PROGRESO) ---
                const calculatePortfolio = () => {
                    const fcl = parseFloat(fclInput.value) || 0;
                    const fclAnual = fcl * 12;
                    fclAnualDisplay.textContent = formatCurrency(fclAnual);

                    // Sumar proyectos de la lista
                    let totalInversion = 0;
                    proyectosList.querySelectorAll('.proyecto-monto').forEach(inp => {
                        totalInversion += parseFloat(inp.value) || 0;
                    });
                    totalConsumoDisplay.textContent = formatCurrency(totalInversion);

                    if(fclAnual > 0) {
                        const porcentaje = (totalInversion / fclAnual) * 100;
                        porcentajeDisplay.textContent = `${porcentaje.toFixed(1)}%`;
                        
                        // Tope visual de barra al 100%
                        const barWidth = Math.min(porcentaje, 100);
                        consumoBar.style.width = `${barWidth}%`;

                        // Semáforo Barra
                        if (porcentaje <= 20) {
                            consumoBar.className = 'h-full transition-all duration-500 ease-out bg-green-500';
                            semaforoConsumo.className = 'mt-2 text-center text-xs font-bold py-1 px-2 rounded bg-green-100 text-green-700';
                            semaforoConsumo.textContent = 'Nivel Saludable (Sostenible)';
                        } else if (porcentaje <= 50) {
                            consumoBar.className = 'h-full transition-all duration-500 ease-out bg-yellow-500';
                            semaforoConsumo.className = 'mt-2 text-center text-xs font-bold py-1 px-2 rounded bg-yellow-100 text-yellow-700';
                            semaforoConsumo.textContent = 'Nivel Considerable (Precaución)';
                        } else {
                            consumoBar.className = 'h-full transition-all duration-500 ease-out bg-red-500';
                            semaforoConsumo.className = 'mt-2 text-center text-xs font-bold py-1 px-2 rounded bg-red-100 text-red-700';
                            semaforoConsumo.textContent = '¡Alerta! Alto Riesgo de Liquidez';
                        }
                    }
                };

                // --- 3. GESTIÓN LISTA PROYECTOS ---
                let projectCount = 0;
                const addProjectInput = (desc = '', val = '') => {
                    projectCount++;
                    const div = document.createElement('div');
                    div.className = 'grid grid-cols-3 gap-2';
                    div.innerHTML = `
                        <input type="text" placeholder="Nombre P${projectCount}" value="${desc}" class="col-span-2 p-1.5 text-xs border rounded bg-gray-50 focus:bg-white outline-none autosave-dynamic" id="e7_p${projectCount}_desc">
                        <input type="number" placeholder="$" value="${val}" class="proyecto-monto p-1.5 text-xs border rounded bg-gray-50 focus:bg-white text-right outline-none autosave-dynamic" id="e7_p${projectCount}_val">
                    `;
                    proyectosList.appendChild(div);

                    // Listeners para nuevos inputs
                    const valInput = div.querySelector('.proyecto-monto');
                    valInput.addEventListener('input', () => {
                        calculatePortfolio();
                        // Guardado manual para dinámicos
                        localStorage.setItem('sesionc_' + valInput.id, valInput.value);
                    });
                    
                    const descInput = div.querySelector('input[type="text"]');
                    descInput.addEventListener('input', () => {
                         localStorage.setItem('sesionc_' + descInput.id, descInput.value);
                    });
                };

                // Listener Botón Agregar
                btnAdd.addEventListener('click', () => {
                    if(projectCount < 5) addProjectInput();
                    else alert("Máximo 5 proyectos para este ejercicio rápido.");
                });

                // Listeners Inputs Principales
                [fclInput, montoInput].forEach(inp => inp.addEventListener('input', calculateIndividual));

                // --- 4. RESTAURACIÓN ---
                // Delay para esperar a que el sistema global llene fclInput y montoInput
                setTimeout(() => {
                    // 1. Restaurar Proyectos Dinámicos
                    // Buscamos si existen datos guardados para p1, p2...
                    let i = 1;
                    let found = true;
                    // Limpiar lista inicial por si acaso
                    proyectosList.innerHTML = '';
                    projectCount = 0;

                    while(found && i <= 5) {
                        const savedDesc = localStorage.getItem(`sesionc_e7_p${i}_desc`);
                        const savedVal = localStorage.getItem(`sesionc_e7_p${i}_val`);
                        
                        if(savedDesc !== null || savedVal !== null) {
                            addProjectInput(savedDesc || '', savedVal || '');
                            i++;
                        } else if (i === 1) {
                            // Si no hay nada guardado, al menos poner 1 vacío
                            addProjectInput();
                            found = false;
                        } else {
                            found = false;
                        }
                    }

                    calculateIndividual(); // Esto dispara también portfolio
                }, 100);
            }
        },

        {
            id: 'ej8',
            title: '8. Evaluación del Plazo',
            icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            content: `
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-2xl font-bold text-brand-orange mb-4">8. Evaluación del Plazo de Recuperación</h2>
                    <div class="instructions-box text-sm mb-8">
                        <p><strong>Meta Transformacional:</strong> Entender la velocidad de tu dinero. Un retorno rápido aumenta tu liquidez y reduce el riesgo de mercado.</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div class="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                            <label class="block text-lg font-bold text-gray-800 mb-2">Plazo de Recuperación Estimado</label>
                            <p class="text-sm text-gray-500 mb-4">¿En cuántos meses estimas recuperar el 100% de la inversión inicial?</p>
                            
                            <div class="relative">
                                <input type="number" id="e8_plazo_input" placeholder="0" class="w-full text-4xl font-black text-brand-blue p-4 border-2 border-gray-200 rounded-xl focus:border-brand-blue outline-none text-center transition-all">
                                <span class="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">meses</span>
                            </div>
                        </div>

                        <div class="text-center">
                            <div id="e8_semaforo_card" class="bg-gray-50 p-6 rounded-xl border border-gray-200 transition-all duration-500">
                                <p class="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2">Diagnóstico de Liquidez</p>
                                
                                <div id="e8_semaforo_badge" class="inline-block px-6 py-2 rounded-full font-bold text-white text-sm bg-gray-400 mb-4 transition-colors duration-300 shadow-md">
                                    Pendiente
                                </div>
                                
                                <p id="e8_feedback_text" class="text-gray-600 font-medium text-sm min-h-[3rem]">
                                    Introduce un plazo para ver el análisis.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                        <svg class="w-6 h-6 text-brand-blue flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div>
                            <h4 class="font-bold text-brand-blue text-sm">¿Por qué importa esto?</h4>
                            <p class="text-sm text-gray-700 mt-1">En PyMEs, la liquidez es reina. Un proyecto muy rentable que tarda 2 años en devolver el dinero puede quebrar la empresa por falta de flujo antes de ver ganancias.</p>
                        </div>
                    </div>
                </div>
                `,
            initFunction: () => {
                const pInput = document.getElementById('e8_plazo_input');
                const semaforoBadge = document.getElementById('e8_semaforo_badge');
                const feedbackText = document.getElementById('e8_feedback_text');
                const semaforoCard = document.getElementById('e8_semaforo_card');

                const evaluatePlazo = () => {
                    const m = parseFloat(pInput.value);

                    if (!pInput.value || isNaN(m) || m <= 0) {
                        semaforoBadge.textContent = 'Pendiente';
                        semaforoBadge.className = 'inline-block px-6 py-2 rounded-full font-bold text-white text-sm bg-gray-400 mb-4 transition-colors duration-300 shadow-md';
                        feedbackText.textContent = 'Introduce un plazo para ver el análisis.';
                        semaforoCard.className = 'bg-gray-50 p-6 rounded-xl border border-gray-200 transition-all duration-500';
                        return;
                    }

                    // Reglas de negocio
                    if (m <= 3) {
                        semaforoBadge.textContent = 'Excelente (0-3 meses)';
                        semaforoBadge.className = 'inline-block px-6 py-2 rounded-full font-bold text-white text-sm bg-green-500 mb-4 transition-colors duration-300 shadow-lg transform scale-105';
                        feedbackText.textContent = 'Recuperación muy rápida. Ideal para mantener alta liquidez y reinvertir constantemente.';
                        semaforoCard.className = 'bg-green-50 p-6 rounded-xl border border-green-200 transition-all duration-500';
                    } 
                    else if (m <= 6) {
                        semaforoBadge.textContent = 'Bueno (3-6 meses)';
                        semaforoBadge.className = 'inline-block px-6 py-2 rounded-full font-bold text-white text-sm bg-blue-500 mb-4 transition-colors duration-300 shadow-md';
                        feedbackText.textContent = 'Buen plazo de recuperación. Permite un crecimiento ágil sin comprometer el flujo.';
                        semaforoCard.className = 'bg-blue-50 p-6 rounded-xl border border-blue-200 transition-all duration-500';
                    } 
                    else if (m <= 12) {
                        semaforoBadge.textContent = 'Aceptable (6-12 meses)';
                        semaforoBadge.className = 'inline-block px-6 py-2 rounded-full font-bold text-black text-sm bg-yellow-400 mb-4 transition-colors duration-300 shadow-md';
                        feedbackText.textContent = 'Plazo estándar. Asegúrate de tener capital de trabajo para soportar la espera.';
                        semaforoCard.className = 'bg-yellow-50 p-6 rounded-xl border border-yellow-200 transition-all duration-500';
                    } 
                    else if (m <= 18) {
                        semaforoBadge.textContent = 'Precaución (12-18 meses)';
                        semaforoBadge.className = 'inline-block px-6 py-2 rounded-full font-bold text-white text-sm bg-orange-500 mb-4 transition-colors duration-300 shadow-md';
                        feedbackText.textContent = 'Plazo largo. Aumenta el riesgo por cambios en el mercado o imprevistos.';
                        semaforoCard.className = 'bg-orange-50 p-6 rounded-xl border border-orange-200 transition-all duration-500';
                    } 
                    else {
                        semaforoBadge.textContent = 'Alto Riesgo (+18 meses)';
                        semaforoBadge.className = 'inline-block px-6 py-2 rounded-full font-bold text-white text-sm bg-red-500 mb-4 transition-colors duration-300 shadow-md';
                        feedbackText.textContent = 'Plazo muy largo. Inmoviliza capital demasiado tiempo; solo hazlo si el ROI es excepcional.';
                        semaforoCard.className = 'bg-red-50 p-6 rounded-xl border border-red-200 transition-all duration-500';
                    }
                };

                // Listener y Restauración
                pInput.addEventListener('input', () => {
                    localStorage.setItem('sesionc_e8_plazo', pInput.value);
                    evaluatePlazo();
                });

                // Restaurar dato guardado
                const saved = localStorage.getItem('sesionc_e8_plazo');
                if(saved) {
                    pInput.value = saved;
                    setTimeout(evaluatePlazo, 100);
                }
            }
        },

        {
            id: 'ej9',
            title: '9. Evaluación del Riesgo',
            icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
            content: `
                <style>
                    .tab-btn-risk { border-bottom: 3px solid transparent; color: #6b7280; }
                    .tab-btn-risk.active { border-color: #F68D2E; color: #F68D2E; font-weight: bold; background-color: #fff; }
                    .risk-content { display: none; }
                    .risk-content.active { display: block; animation: fadeIn 0.3s ease; }
                </style>

                <div class="max-w-5xl mx-auto">
                    <h2 class="text-2xl font-bold text-brand-orange mb-4">9. Evaluación del Riesgo</h2>
                    <div class="instructions-box text-sm mb-6">
                        <p><strong>Meta Transformacional:</strong> No existen inversiones sin riesgo. El objetivo es identificarlo, medirlo y mitigarlo antes de que ocurra.</p>
                    </div>

                    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div class="flex border-b border-gray-200 bg-gray-50">
                            <button class="tab-btn-risk active flex-1 py-4 text-center font-medium transition-all" data-target="riesgo-interno">
                                🏢 Riesgos Internos (Empresa)
                            </button>
                            <button class="tab-btn-risk flex-1 py-4 text-center font-medium transition-all" data-target="riesgo-externo">
                                🌍 Riesgos Externos (Mercado)
                            </button>
                        </div>

                        <div class="p-6">
                            <div id="riesgo-interno" class="risk-content active space-y-6">
                                <p class="text-sm text-gray-500 italic mb-4">Ejemplos: Falta de personal capacitado, fallas en procesos, resistencia al cambio, problemas de flujo de caja.</p>
                                <div id="container-riesgos-internos" class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
                            </div>

                            <div id="riesgo-externo" class="risk-content space-y-6">
                                <p class="text-sm text-gray-500 italic mb-4">Ejemplos: Entrada de nuevos competidores, cambios regulatorios, inflación, cambios en tecnología.</p>
                                <div id="container-riesgos-externos" class="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 class="font-bold text-gray-700 text-sm mb-2">Guía de Niveles de Riesgo</h4>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            <div class="bg-green-100 p-2 rounded text-green-800 border border-green-200">
                                <strong>🟢 Bajo:</strong> Recuperación garantizada, riesgo mínimo.
                            </div>
                            <div class="bg-blue-100 p-2 rounded text-blue-800 border border-blue-200">
                                <strong>🔵 Medio:</strong> Recuperación probable, rendimiento variable.
                            </div>
                            <div class="bg-orange-100 p-2 rounded text-orange-800 border border-orange-200">
                                <strong>🟠 Alto:</strong> Posible pérdida parcial de capital.
                            </div>
                            <div class="bg-red-100 p-2 rounded text-red-800 border border-red-200">
                                <strong>🔴 Muy Alto:</strong> Riesgo de pérdida total de inversión.
                            </div>
                        </div>
                    </div>
                </div>
                `,
            initFunction: () => {
                const internalContainer = document.getElementById('container-riesgos-internos');
                const externalContainer = document.getElementById('container-riesgos-externos');

                // Función factoría para crear las tarjetas de riesgo
                const createRiskCard = (idPrefix, title) => {
                    const div = document.createElement('div');
                    div.className = 'bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col gap-3';
                    
                    div.innerHTML = `
                        <h4 class="font-bold text-brand-blue text-sm border-b pb-1">${title}</h4>
                        
                        <div>
                            <label class="block text-xs font-semibold text-gray-600 mb-1">Descripción del Riesgo</label>
                            <textarea id="${idPrefix}_desc" rows="2" class="w-full p-2 text-xs border border-gray-300 rounded focus:border-brand-blue outline-none resize-none" placeholder="¿Qué podría pasar?"></textarea>
                        </div>

                        <div class="grid grid-cols-2 gap-2">
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-1">Nivel Inicial</label>
                                <select id="${idPrefix}_lvl1" class="w-full p-1.5 text-xs border border-gray-300 rounded bg-white focus:border-brand-blue outline-none">
                                    <option value="0">-</option>
                                    <option value="1">Bajo</option>
                                    <option value="2">Medio</option>
                                    <option value="3">Alto</option>
                                    <option value="4">Muy Alto</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-600 mb-1">Impacto ($)</label>
                                <select id="${idPrefix}_lvl2" class="w-full p-1.5 text-xs border border-gray-300 rounded bg-white focus:border-brand-blue outline-none">
                                    <option value="0">-</option>
                                    <option value="1">Bajo</option>
                                    <option value="2">Medio</option>
                                    <option value="3">Alto</option>
                                    <option value="4">Catastrófico</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-gray-600 mb-1">Acción de Mitigación</label>
                            <textarea id="${idPrefix}_mitiga" rows="2" class="w-full p-2 text-xs border border-gray-300 rounded focus:border-brand-blue outline-none resize-none" placeholder="¿Cómo lo evitamos?"></textarea>
                        </div>
                    `;

                    // Auto-guardado local para estos elementos generados
                    div.querySelectorAll('textarea, select').forEach(el => {
                        el.addEventListener('input', (e) => localStorage.setItem('sesionc_' + e.target.id, e.target.value));
                        // Restaurar
                        const saved = localStorage.getItem('sesionc_' + el.id);
                        if(saved) el.value = saved;
                    });

                    return div;
                };

                // Generar 3 tarjetas internas
                for(let i=1; i<=3; i++) {
                    internalContainer.appendChild(createRiskCard(`e9_int_r${i}`, `Factor Interno #${i}`));
                }

                // Generar 3 tarjetas externas
                for(let i=1; i<=3; i++) {
                    externalContainer.appendChild(createRiskCard(`e9_ext_r${i}`, `Factor Externo #${i}`));
                }

                // Lógica de Tabs
                const tabBtns = document.querySelectorAll('.tab-btn-risk');
                const tabContents = document.querySelectorAll('.risk-content');

                tabBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        // Reset UI
                        tabBtns.forEach(b => b.classList.remove('active'));
                        tabContents.forEach(c => c.classList.remove('active'));
                        
                        // Activate new
                        btn.classList.add('active');
                        document.getElementById(btn.dataset.target).classList.add('active');
                    });
                });
            }
        },
        
        {
            id: 'ej10',
            title: '10. Evaluación del Propósito',
            icon: `<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
            content: `
                <div class="max-w-5xl mx-auto">
                    <h2 class="text-2xl font-bold text-brand-orange mb-4">10. Evaluación del Propósito</h2>
                    <div class="instructions-box text-sm mb-8">
                        <p><strong>Meta Transformacional:</strong> El filtro definitivo. Asegurar que tu inversión esté 100% alineada con las prioridades estratégicas que definiste al inicio.</p>
                    </div>

                    <div class="space-y-8">
                        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">1. Mapa de Alineación Estratégica</h3>
                            <div class="overflow-x-auto">
                                <table class="w-full text-sm text-left">
                                    <thead class="bg-gray-50 text-gray-500 uppercase font-bold text-xs">
                                        <tr>
                                            <th class="p-3 w-1/4">Área Clave</th>
                                            <th class="p-3">Tácticas de Desarrollo</th>
                                        </tr>
                                    </thead>
                                    <tbody id="e10_tactics_table" class="divide-y divide-gray-100">
                                        </tbody>
                                </table>
                            </div>
                            
                            <div class="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <label class="block text-sm font-bold text-brand-blue mb-2">Reflexión de Impacto:</label>
                                <p class="text-xs text-gray-600 mb-2">¿Tu inversión actual toca claramente una de estas áreas, o estás invirtiendo en algo que NO es prioridad?</p>
                                <textarea id="e10_reflexion_impacto" rows="2" class="w-full p-2 text-sm border border-gray-300 rounded focus:border-brand-blue outline-none" placeholder="Escribe tu conclusión..."></textarea>
                            </div>
                        </div>

                        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">2. Validación contra Prioridades (Del Ejercicio 5)</h3>
                            <p class="text-sm text-gray-500 mb-4">Selecciona qué iniciativa estratégica estás atacando con esta inversión.</p>

                            <div class="space-y-4">
                                <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                    <h4 class="font-bold text-sm text-gray-700 mb-3">Iniciativa Principal</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <select class="e10-area-select w-full p-2 border rounded text-sm bg-white" data-target="e10_tac_1" id="e10_area_1">
                                            <option value="">Selecciona Área...</option>
                                            </select>
                                        <select id="e10_tac_1" class="w-full p-2 border rounded text-sm bg-white">
                                            <option value="">Selecciona Táctica...</option>
                                            </select>
                                        <input type="text" id="e10_init_1" placeholder="Nombre de la iniciativa..." class="w-full p-2 border rounded text-sm">
                                    </div>
                                </div>

                                <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                    <h4 class="font-bold text-sm text-gray-700 mb-3">Iniciativa Secundaria (Opcional)</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <select class="e10-area-select w-full p-2 border rounded text-sm bg-white" data-target="e10_tac_2" id="e10_area_2">
                                            <option value="">Selecciona Área...</option>
                                        </select>
                                        <select id="e10_tac_2" class="w-full p-2 border rounded text-sm bg-white">
                                            <option value="">Selecciona Táctica...</option>
                                        </select>
                                        <input type="text" id="e10_init_2" placeholder="Nombre de la iniciativa..." class="w-full p-2 border rounded text-sm">
                                    </div>
                                </div>
                            </div>

                            <div class="mt-6">
                                <label class="block text-sm font-bold text-gray-700 mb-2">Veredicto Final:</label>
                                <p class="text-xs text-gray-500 mb-2">¿Esta inversión está 100% justificada por tus prioridades actuales?</p>
                                <textarea id="e10_veredicto" rows="3" class="w-full p-2 text-sm border border-gray-300 rounded focus:border-brand-blue outline-none bg-green-50 border-green-200" placeholder="Conclusión final..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                `,
            initFunction: () => {
                // DATOS MAESTROS (Mismos del Ejercicio 5 para coherencia)
                const tacticsData = { 
                    Ventas: ["Incrementar tasa de cierre", "Aumentar canales/prospectos", "Mejorar recompra"], 
                    Utilidad: ["Precio Premium", "Optimización de Costos", "Eficiencia en Gastos"], 
                    Operacion: ["Incrementar capacidad", "Mejorar atención", "Desarrollo mandos medios"], 
                    Expansion: ["Nuevas sucursales", "Nuevos mercados", "Nuevos productos"] 
                };

                const tableBody = document.getElementById('e10_tactics_table');
                const areaSelects = document.querySelectorAll('.e10-area-select');

                // 1. LLENAR TABLA DE REFERENCIA
                tableBody.innerHTML = '';
                Object.entries(tacticsData).forEach(([area, tactics]) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td class="p-3 font-bold text-gray-700 align-top">${area}</td><td class="p-3 text-gray-600 border-l">${tactics.join(', ')}</td>`;
                    tableBody.appendChild(row);
                });

                // 2. CONFIGURAR DROPDOWNS ENCADENADOS
                areaSelects.forEach(sel => {
                    // Llenar opciones de Área
                    let opts = '<option value="">Selecciona Área...</option>';
                    Object.keys(tacticsData).forEach(a => opts += `<option value="${a}">${a}</option>`);
                    sel.innerHTML = opts;

                    // Evento Change
                    sel.addEventListener('change', (e) => {
                        const targetId = sel.dataset.target;
                        const tacSel = document.getElementById(targetId);
                        const area = sel.value;

                        // Guardar selección de área
                        localStorage.setItem('sesionc_' + sel.id, area);

                        // Actualizar Tácticas
                        if(area && tacticsData[area]) {
                            let tOpts = '<option value="">Selecciona Táctica...</option>';
                            tacticsData[area].forEach(t => tOpts += `<option value="${t}">${t}</option>`);
                            tacSel.innerHTML = tOpts;
                            tacSel.disabled = false;
                        } else {
                            tacSel.innerHTML = '<option value="">Selecciona Táctica...</option>';
                            tacSel.disabled = true;
                        }
                    });

                    // Restaurar Área Guardada
                    const savedArea = localStorage.getItem('sesionc_' + sel.id);
                    if(savedArea) {
                        sel.value = savedArea;
                        // Disparar evento para llenar el segundo select
                        sel.dispatchEvent(new Event('change')); 
                    }
                });

                // 3. RESTAURAR TÁCTICAS (El segundo nivel)
                // Esto debe hacerse después de que el evento 'change' del área haya poblado las opciones
                setTimeout(() => {
                    document.querySelectorAll('select[id^="e10_tac_"]').forEach(tacSel => {
                        const savedTac = localStorage.getItem('sesionc_' + tacSel.id);
                        if(savedTac) tacSel.value = savedTac;
                        
                        // Listener para guardar cambio de táctica
                        tacSel.addEventListener('change', (e) => localStorage.setItem('sesionc_' + e.target.id, e.target.value));
                    });
                }, 200);

                // Inputs de texto simples
                ['e10_init_1', 'e10_init_2', 'e10_reflexion_impacto', 'e10_veredicto'].forEach(id => {
                    const el = document.getElementById(id);
                    if(el) {
                        el.addEventListener('input', (e) => localStorage.setItem('sesionc_' + id, e.target.value));
                        const saved = localStorage.getItem('sesionc_' + id);
                        if(saved) el.value = saved;
                    }
                });
            }
        },
        
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