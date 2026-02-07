class ConversorJsonCsv {
    constructor() {
        this.ultimoCsv = '';
        this.ultimoJson = '';
    }

    renderizar() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-arrow-left-right text-primary me-2"></i>Conversor JSON a CSV</h2>
                            <p class="text-muted mb-0">Convierte JSON a CSV y CSV a JSON de forma rapida</p>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-primary" id="botonFavoritos">
                                <i class="bi bi-star me-1" id="iconoFavoritos"></i>
                                <span id="textoFavoritos">Agregar a Favoritos</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card herramienta-card">
                        <div class="card-header bg-primary text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-braces-asterisk me-2"></i>JSON a CSV
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6 mb-3">
                                    <label for="jsonToCsvInput" class="form-label fw-bold">JSON de entrada:</label>
                                    <textarea
                                        id="jsonToCsvInput"
                                        class="form-control font-monospace"
                                        rows="10"
                                        placeholder='[{"nombre":"Ana","edad":29},{"nombre":"Luis","edad":34}]'></textarea>
                                    <div class="d-flex justify-content-between mt-2">
                                        <small class="text-muted">
                                            Caracteres: <span id="jsonToCsvChars">0</span> |
                                            Lineas: <span id="jsonToCsvLines">0</span>
                                        </small>
                                        <div>
                                            <button id="jsonToCsvEjemplo" class="btn btn-sm btn-outline-secondary me-2">
                                                <i class="bi bi-clipboard-plus me-1"></i>Ejemplo
                                            </button>
                                            <button id="jsonToCsvLimpiar" class="btn btn-sm btn-outline-secondary">
                                                <i class="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 mb-3">
                                    <label for="jsonToCsvOutput" class="form-label fw-bold">CSV de salida:</label>
                                    <textarea
                                        id="jsonToCsvOutput"
                                        class="form-control font-monospace"
                                        rows="10"
                                        placeholder="Aqui aparecera el CSV..."
                                        readonly></textarea>
                                    <div class="d-flex justify-content-between mt-2">
                                        <small class="text-muted">
                                            Filas: <span id="jsonToCsvRows">0</span> |
                                            Columnas: <span id="jsonToCsvCols">0</span>
                                        </small>
                                        <div>
                                            <button id="jsonToCsvCopiar" class="btn btn-sm btn-success me-2" disabled>
                                                <i class="bi bi-clipboard me-1"></i>Copiar
                                            </button>
                                            <button id="jsonToCsvDescargar" class="btn btn-sm btn-outline-success" disabled>
                                                <i class="bi bi-download me-1"></i>Descargar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-2 align-items-center">
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="jsonToCsvDelimitador">Delimitador:</label>
                                    <select id="jsonToCsvDelimitador" class="form-select form-select-sm">
                                        <option value=",">Coma (,)</option>
                                        <option value=";">Punto y coma (;)</option>
                                        <option value="tab">Tab</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="jsonToCsvIncluirHeaders">Encabezados:</label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="jsonToCsvIncluirHeaders" checked>
                                        <label class="form-check-label" for="jsonToCsvIncluirHeaders">Incluir primera fila</label>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="jsonToCsvQuote">Comillas:</label>
                                    <select id="jsonToCsvQuote" class="form-select form-select-sm">
                                        <option value='"'>Doble (")</option>
                                        <option value="'">Simple (')</option>
                                    </select>
                                </div>
                                <div class="col-md-3 d-grid">
                                    <button id="botonJsonToCsv" class="btn btn-primary mt-4">
                                        <i class="bi bi-arrow-right me-1"></i>Convertir a CSV
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card herramienta-card">
                        <div class="card-header bg-success text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-table me-2"></i>CSV a JSON
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6 mb-3">
                                    <label for="csvToJsonInput" class="form-label fw-bold">CSV de entrada:</label>
                                    <textarea
                                        id="csvToJsonInput"
                                        class="form-control font-monospace"
                                        rows="10"
                                        placeholder="nombre,edad\nAna,29\nLuis,34"></textarea>
                                    <div class="d-flex justify-content-between mt-2">
                                        <small class="text-muted">
                                            Caracteres: <span id="csvToJsonChars">0</span> |
                                            Lineas: <span id="csvToJsonLines">0</span>
                                        </small>
                                        <div>
                                            <button id="csvToJsonEjemplo" class="btn btn-sm btn-outline-secondary me-2">
                                                <i class="bi bi-clipboard-plus me-1"></i>Ejemplo
                                            </button>
                                            <button id="csvToJsonLimpiar" class="btn btn-sm btn-outline-secondary">
                                                <i class="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 mb-3">
                                    <label for="csvToJsonOutput" class="form-label fw-bold">JSON de salida:</label>
                                    <textarea
                                        id="csvToJsonOutput"
                                        class="form-control font-monospace"
                                        rows="10"
                                        placeholder="Aqui aparecera el JSON..."
                                        readonly></textarea>
                                    <div class="d-flex justify-content-between mt-2">
                                        <small class="text-muted">
                                            Filas: <span id="csvToJsonRows">0</span> |
                                            Columnas: <span id="csvToJsonCols">0</span>
                                        </small>
                                        <div>
                                            <button id="csvToJsonCopiar" class="btn btn-sm btn-success me-2" disabled>
                                                <i class="bi bi-clipboard me-1"></i>Copiar
                                            </button>
                                            <button id="csvToJsonDescargar" class="btn btn-sm btn-outline-success" disabled>
                                                <i class="bi bi-download me-1"></i>Descargar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-2 align-items-center">
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="csvToJsonDelimitador">Delimitador:</label>
                                    <select id="csvToJsonDelimitador" class="form-select form-select-sm">
                                        <option value=",">Coma (,)</option>
                                        <option value=";">Punto y coma (;)</option>
                                        <option value="tab">Tab</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="csvToJsonHeaders">Encabezados:</label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="csvToJsonHeaders" checked>
                                        <label class="form-check-label" for="csvToJsonHeaders">Usar primera fila</label>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="csvToJsonTipos">Tipos:</label>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="csvToJsonTipos" checked>
                                        <label class="form-check-label" for="csvToJsonTipos">Detectar tipos</label>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="csvToJsonIndent">Formato:</label>
                                    <select id="csvToJsonIndent" class="form-select form-select-sm">
                                        <option value="2">2 espacios</option>
                                        <option value="4" selected>4 espacios</option>
                                        <option value="0">Minificado</option>
                                    </select>
                                </div>
                                <div class="col-12 d-grid mt-2">
                                    <button id="botonCsvToJson" class="btn btn-success">
                                        <i class="bi bi-arrow-left me-1"></i>Convertir a JSON
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.configurarEventos();
    }

    configurarEventos() {
        this.configurarFavoritos();

        document.getElementById('jsonToCsvInput').addEventListener('input', (e) => {
            this.actualizarContadores('jsonToCsv', e.target.value);
        });

        document.getElementById('csvToJsonInput').addEventListener('input', (e) => {
            this.actualizarContadores('csvToJson', e.target.value);
        });

        document.getElementById('botonJsonToCsv').addEventListener('click', () => {
            this.convertirJsonACsv();
        });

        document.getElementById('botonCsvToJson').addEventListener('click', () => {
            this.convertirCsvAJson();
        });

        document.getElementById('jsonToCsvEjemplo').addEventListener('click', () => {
            const ejemplo = JSON.stringify([
                { nombre: 'Ana', edad: 29, activo: true, ciudad: 'Santiago' },
                { nombre: 'Luis', edad: 34, activo: false, ciudad: 'Valparaiso' }
            ], null, 2);
            document.getElementById('jsonToCsvInput').value = ejemplo;
            this.actualizarContadores('jsonToCsv', ejemplo);
        });

        document.getElementById('csvToJsonEjemplo').addEventListener('click', () => {
            const ejemplo = 'nombre,edad,activo,ciudad\nAna,29,true,Santiago\nLuis,34,false,Valparaiso';
            document.getElementById('csvToJsonInput').value = ejemplo;
            this.actualizarContadores('csvToJson', ejemplo);
        });

        document.getElementById('jsonToCsvLimpiar').addEventListener('click', () => {
            document.getElementById('jsonToCsvInput').value = '';
            document.getElementById('jsonToCsvOutput').value = '';
            this.actualizarContadores('jsonToCsv', '');
            this.actualizarEstadisticasSalida('jsonToCsv', 0, 0);
            this.alternarBotonesSalida('jsonToCsv', false);
        });

        document.getElementById('csvToJsonLimpiar').addEventListener('click', () => {
            document.getElementById('csvToJsonInput').value = '';
            document.getElementById('csvToJsonOutput').value = '';
            this.actualizarContadores('csvToJson', '');
            this.actualizarEstadisticasSalida('csvToJson', 0, 0);
            this.alternarBotonesSalida('csvToJson', false);
        });

        document.getElementById('jsonToCsvCopiar').addEventListener('click', () => {
            UtilsUI.copiarAlPortapapeles(document.getElementById('jsonToCsvOutput').value);
        });

        document.getElementById('csvToJsonCopiar').addEventListener('click', () => {
            UtilsUI.copiarAlPortapapeles(document.getElementById('csvToJsonOutput').value);
        });

        document.getElementById('jsonToCsvDescargar').addEventListener('click', () => {
            UtilsArchivo.descargarArchivo(this.ultimoCsv, 'convertido.csv', 'text/csv');
        });

        document.getElementById('csvToJsonDescargar').addEventListener('click', () => {
            UtilsArchivo.descargarArchivo(this.ultimoJson, 'convertido.json', 'application/json');
        });
    }

    configurarFavoritos() {
        const boton = document.getElementById('botonFavoritos');
        const icono = document.getElementById('iconoFavoritos');
        const texto = document.getElementById('textoFavoritos');

        if (!boton || !icono || !texto) return;

        const esFavorito = GestorFavoritos.esFavorito('json-csv-conversor');

        if (esFavorito) {
            icono.className = 'bi bi-star-fill me-1';
            texto.textContent = 'En Favoritos';
        }

        boton.addEventListener('click', () => {
            const nuevoEstado = GestorFavoritos.alternarFavorito('json-csv-conversor');
            if (nuevoEstado) {
                icono.className = 'bi bi-star-fill me-1';
                texto.textContent = 'En Favoritos';
                UtilsUI.mostrarNotificacion('Agregado a favoritos', 'success', 1500);
            } else {
                icono.className = 'bi bi-star me-1';
                texto.textContent = 'Agregar a Favoritos';
                UtilsUI.mostrarNotificacion('Quitado de favoritos', 'info', 1500);
            }
        });
    }

    actualizarContadores(prefijo, texto) {
        const chars = texto.length;
        const lines = texto ? texto.split('\n').length : 0;
        document.getElementById(`${prefijo}Chars`).textContent = chars;
        document.getElementById(`${prefijo}Lines`).textContent = lines;
    }

    actualizarEstadisticasSalida(prefijo, filas, columnas) {
        document.getElementById(`${prefijo}Rows`).textContent = filas;
        document.getElementById(`${prefijo}Cols`).textContent = columnas;
    }

    alternarBotonesSalida(prefijo, habilitar) {
        document.getElementById(`${prefijo}Copiar`).disabled = !habilitar;
        document.getElementById(`${prefijo}Descargar`).disabled = !habilitar;
    }

    convertirJsonACsv() {
        const texto = document.getElementById('jsonToCsvInput').value.trim();
        if (!texto) {
            UtilsUI.mostrarNotificacion('Ingresa un JSON valido para convertir', 'warning');
            return;
        }

        let data;
        try {
            data = JSON.parse(texto);
        } catch (error) {
            UtilsUI.mostrarNotificacion(`JSON invalido: ${error.message}`, 'error');
            return;
        }

        const filas = Array.isArray(data) ? data : [data];
        if (!filas.length || typeof filas[0] !== 'object' || filas[0] === null) {
            UtilsUI.mostrarNotificacion('El JSON debe ser un objeto o un arreglo de objetos', 'warning');
            return;
        }

        const incluirHeaders = document.getElementById('jsonToCsvIncluirHeaders').checked;
        const delimitador = this.obtenerDelimitador('jsonToCsvDelimitador');
        const quote = document.getElementById('jsonToCsvQuote').value;
        const encabezados = this.obtenerEncabezados(filas);

        const filasCsv = [];
        if (incluirHeaders) {
            filasCsv.push(encabezados.map((h) => this.escaparCsv(h, delimitador, quote)).join(delimitador));
        }

        filas.forEach((fila) => {
            const valores = encabezados.map((encabezado) => this.formatearValorCsv(fila[encabezado], delimitador, quote));
            filasCsv.push(valores.join(delimitador));
        });

        const csv = filasCsv.join('\n');
        this.ultimoCsv = csv;
        document.getElementById('jsonToCsvOutput').value = csv;
        this.actualizarEstadisticasSalida('jsonToCsv', filas.length, encabezados.length);
        this.alternarBotonesSalida('jsonToCsv', csv.length > 0);
        UtilsUI.mostrarNotificacion('CSV generado correctamente', 'success', 1500);
    }

    convertirCsvAJson() {
        const texto = document.getElementById('csvToJsonInput').value.trim();
        if (!texto) {
            UtilsUI.mostrarNotificacion('Ingresa un CSV valido para convertir', 'warning');
            return;
        }

        const delimitador = this.obtenerDelimitador('csvToJsonDelimitador');
        const usarHeaders = document.getElementById('csvToJsonHeaders').checked;
        const detectarTipos = document.getElementById('csvToJsonTipos').checked;
        const indent = parseInt(document.getElementById('csvToJsonIndent').value, 10);

        const filas = this.parsearCsv(texto, delimitador, '"');
        if (!filas.length) {
            UtilsUI.mostrarNotificacion('No se detectaron filas en el CSV', 'warning');
            return;
        }

        let encabezados = [];
        if (usarHeaders) {
            encabezados = this.normalizarEncabezados(filas.shift());
        } else {
            const columnas = Math.max(...filas.map((fila) => fila.length));
            encabezados = Array.from({ length: columnas }, (_, i) => `columna_${i + 1}`);
        }

        const resultado = filas.map((fila) => {
            const obj = {};
            encabezados.forEach((encabezado, index) => {
                const valor = fila[index] ?? '';
                obj[encabezado] = detectarTipos ? this.detectarTipo(valor) : valor;
            });
            return obj;
        });

        const json = JSON.stringify(resultado, null, indent === 0 ? 0 : indent);
        this.ultimoJson = json;
        document.getElementById('csvToJsonOutput').value = json;
        this.actualizarEstadisticasSalida('csvToJson', resultado.length, encabezados.length);
        this.alternarBotonesSalida('csvToJson', json.length > 0);
        UtilsUI.mostrarNotificacion('JSON generado correctamente', 'success', 1500);
    }

    obtenerDelimitador(id) {
        const valor = document.getElementById(id).value;
        return valor === 'tab' ? '\t' : valor;
    }

    obtenerEncabezados(filas) {
        const encabezados = new Set();
        filas.forEach((fila) => {
            if (typeof fila !== 'object' || fila === null) return;
            Object.keys(fila).forEach((clave) => encabezados.add(clave));
        });
        return Array.from(encabezados);
    }

    formatearValorCsv(valor, delimitador, quote) {
        if (valor === null || typeof valor === 'undefined') return '';
        const serializado = typeof valor === 'object' ? JSON.stringify(valor) : String(valor);
        return this.escaparCsv(serializado, delimitador, quote);
    }

    escaparCsv(valor, delimitador, quote) {
        const necesitaComillas = valor.includes(delimitador) || valor.includes('\n') || valor.includes('\r') || valor.includes(quote);
        if (!necesitaComillas) return valor;
        const escapado = valor.replace(new RegExp(quote, 'g'), `${quote}${quote}`);
        return `${quote}${escapado}${quote}`;
    }

    parsearCsv(texto, delimitador, quote) {
        const filas = [];
        let fila = [];
        let actual = '';
        let enComillas = false;

        for (let i = 0; i < texto.length; i += 1) {
            const char = texto[i];
            const siguiente = texto[i + 1];

            if (enComillas) {
                if (char === quote && siguiente === quote) {
                    actual += quote;
                    i += 1;
                } else if (char === quote) {
                    enComillas = false;
                } else {
                    actual += char;
                }
                continue;
            }

            if (char === quote) {
                enComillas = true;
                continue;
            }

            if (char === delimitador) {
                fila.push(actual);
                actual = '';
                continue;
            }

            if (char === '\n') {
                fila.push(actual);
                filas.push(fila);
                fila = [];
                actual = '';
                continue;
            }

            if (char === '\r') {
                continue;
            }

            actual += char;
        }

        fila.push(actual);
        if (fila.length > 1 || fila[0] !== '') {
            filas.push(fila);
        }

        return filas.filter((row) => row.some((cell) => cell !== ''));
    }

    normalizarEncabezados(encabezados) {
        const vistos = new Map();
        return encabezados.map((encabezado, index) => {
            const base = (encabezado || `columna_${index + 1}`).trim() || `columna_${index + 1}`;
            const conteo = vistos.get(base) || 0;
            vistos.set(base, conteo + 1);
            return conteo === 0 ? base : `${base}_${conteo + 1}`;
        });
    }

    detectarTipo(valor) {
        const texto = String(valor).trim();
        if (texto === '') return '';
        if (/^(true|false)$/i.test(texto)) return texto.toLowerCase() === 'true';
        if (texto.toLowerCase() === 'null') return null;
        if (/^-?\d+(\.\d+)?$/.test(texto)) return Number(texto);
        return valor;
    }
}

window.conversorJsonCsv = new ConversorJsonCsv();
