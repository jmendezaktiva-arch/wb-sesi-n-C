// js/exercises/ej2.js

export function renderEj2(container) {
    // 1. INYECCIÓN DEL HTML ORIGINAL
    // Extraído exactamente de tu archivo Workbook.html
    const html = `
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
    container.innerHTML = html;

    // 2. RECUPERACIÓN DE LÓGICA (Funciones y Event Listeners)
    // Extraída de la función setupExercise2() original

    const compensacionGroup = container.querySelector('#tipo-compensacion-group');
    const sueldoFijoSection = container.querySelector('#sueldo-fijo-section');
    const sueldoVariableSection = container.querySelector('#sueldo-variable-section');

    function handleCompensacionChange() {
        // Buscamos el radio checked dentro del contenedor
        const selectedRadio = compensacionGroup.querySelector('input[name="tipo_compensacion"]:checked');
        
        if (!selectedRadio) {
            // Estado por defecto si nada está seleccionado
            sueldoFijoSection.classList.add('hidden');
            sueldoVariableSection.classList.add('hidden');
            return;
        }
        
        const selectedValue = selectedRadio.value;

        // Aplicamos la lógica de visibilidad basada en el valor
        if (selectedValue === 'fijo') {
            sueldoFijoSection.classList.remove('hidden');
            sueldoVariableSection.classList.add('hidden');
        } else if (selectedValue === 'variable') {
            sueldoFijoSection.classList.add('hidden');
            sueldoVariableSection.classList.remove('hidden');
        } else if (selectedValue === 'mixto') {
            sueldoFijoSection.classList.remove('hidden');
            sueldoVariableSection.classList.remove('hidden');
        }
    }

    // Agregamos el listener al grupo de radios
    if (compensacionGroup) {
        compensacionGroup.addEventListener('change', handleCompensacionChange);
        
        // Ejecutar una vez al inicio para establecer el estado correcto 
        // (por si el HTML ya viene con "Mixto" checked o si se carga data)
        handleCompensacionChange();
    }
}