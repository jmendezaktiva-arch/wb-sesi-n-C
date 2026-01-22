// js/exercises/ej1.js

// Nota: No necesitamos importar nada. La lógica de autoguardado de app.js 
// detectará automáticamente los inputs gracias a la clase 'autosave-input'.

export function renderEj1(container) {
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