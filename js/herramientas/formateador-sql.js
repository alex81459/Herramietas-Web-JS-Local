class FormateadorSQL {
    constructor() {
        this.sqlActual = null;
        this.historialAcciones = [];
    }

    render() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-database text-primary me-2"></i>Formateador SQL</h2>
                            <p class="text-muted mb-0">Formatea y estructura consultas SQL para MySQL/PostgreSQL</p>
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
                                <i class="bi bi-input-cursor me-2"></i>SQL de Entrada
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="sqlInput" class="form-label fw-bold">Pega o escribe tu consulta SQL:</label>
                                <textarea 
                                    id="sqlInput" 
                                    class="form-control font-monospace" 
                                    rows="10" 
                                    placeholder="SELECT u.id, u.name, u.email, p.title FROM users u LEFT JOIN posts p ON u.id = p.user_id WHERE u.active = 1 AND p.created_at > '2024-01-01' ORDER BY u.name, p.created_at DESC;"></textarea>
                                <div class="d-flex justify-content-between mt-2">
                                    <div>
                                        <span id="estadoValidacion" class="badge bg-secondary">En espera</span>
                                        <small class="text-muted ms-2">
                                            Caracteres: <span id="contadorCaracteres">0</span> |
                                            Líneas: <span id="contadorLineas">0</span>
                                        </small>
                                    </div>
                                    <div>
                                        <button id="validarSQL" class="btn btn-sm btn-info me-2">
                                            <i class="bi bi-check-circle me-1"></i>
                                            Validar
                                        </button>
                                        <button id="limpiarEntrada" class="btn btn-sm btn-outline-warning">
                                            <i class="bi bi-trash me-1"></i>
                                            Limpiar
                                        </button>
                                    </div>
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
                                <i class="bi bi-gear me-2"></i>Opciones de Formato
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-check form-switch mb-3">
                                        <input class="form-check-input" type="checkbox" id="mayusculas" checked>
                                        <label class="form-check-label" for="mayusculas">
                                            Palabras clave en mayúsculas
                                        </label>
                                    </div>
                                    <div class="form-check form-switch mb-3">
                                        <input class="form-check-input" type="checkbox" id="nuevaLineaSelect" checked>
                                        <label class="form-check-label" for="nuevaLineaSelect">
                                            Nueva línea en SELECT
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="indentacion" class="form-label">Indentación:</label>
                                        <select class="form-select form-select-sm" id="indentacion">
                                            <option value="2">2 espacios</option>
                                            <option value="4" selected>4 espacios</option>
                                            <option value="tab">Tab</option>
                                        </select>
                                    </div>
                                    <div class="form-check form-switch mb-3">
                                        <input class="form-check-input" type="checkbox" id="commasLeading">
                                        <label class="form-check-label" for="commasLeading">
                                            Comas al inicio
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label for="tipoSQL" class="form-label">Tipo de SQL:</label>
                                        <select class="form-select form-select-sm" id="tipoSQL">
                                            <option value="standard" selected>SQL Estándar</option>
                                            <option value="mysql">MySQL</option>
                                            <option value="postgresql">PostgreSQL</option>
                                        </select>
                                    </div>
                                    <button id="formatearSQL" class="btn btn-primary w-100">
                                        <i class="bi bi-magic me-1"></i>
                                        Formatear SQL
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
                        <div class="card-header bg-info text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-output me-2"></i>SQL Formateado
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <label for="sqlOutput" class="form-label fw-bold">Resultado:</label>
                                    <div>
                                        <button id="copiarSQL" class="btn btn-sm btn-outline-primary me-2" disabled>
                                            <i class="bi bi-clipboard me-1"></i>
                                            Copiar
                                        </button>
                                        <button id="descargarSQL" class="btn btn-sm btn-outline-success" disabled>
                                            <i class="bi bi-download me-1"></i>
                                            Descargar
                                        </button>
                                    </div>
                                </div>
                                <textarea 
                                    id="sqlOutput" 
                                    class="form-control font-monospace" 
                                    rows="12" 
                                    readonly 
                                    placeholder="El SQL formateado aparecerá aquí..."></textarea>
                                <div class="mt-2">
                                    <small class="text-muted">
                                        Líneas: <span id="contadorLineasSalida">0</span> |
                                        Mejoras aplicadas: <span id="mejosAplicadas">Ninguna</span>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <div class="card herramienta-card">
                        <div class="card-header bg-warning text-dark">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-lightbulb me-2"></i>Ayuda y Consejos
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6 class="text-primary">Consultas soportadas:</h6>
                                    <ul class="list-unstyled">
                                        <li><i class="bi bi-check-circle text-success me-1"></i> SELECT con JOIN, WHERE, ORDER BY</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i> INSERT INTO con VALUES</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i> UPDATE con SET y WHERE</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i> DELETE con WHERE</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i> CREATE TABLE y ALTER TABLE</li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h6 class="text-primary">Características:</h6>
                                    <ul class="list-unstyled">
                                        <li><i class="bi bi-star text-warning me-1"></i> Formato consistente de palabras clave</li>
                                        <li><i class="bi bi-star text-warning me-1"></i> Indentación automática</li>
                                        <li><i class="bi bi-star text-warning me-1"></i> Alineación de cláusulas</li>
                                        <li><i class="bi bi-star text-warning me-1"></i> Validación básica de sintaxis</li>
                                        <li><i class="bi bi-star text-warning me-1"></i> Preserva comentarios</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.configurarEventos();
        manejarFavoritos('formateador-sql');
        this.actualizarContadores();
    }

    configurarEventos() {
        const sqlInput = document.getElementById('sqlInput');
        const formatearBtn = document.getElementById('formatearSQL');
        const copiarBtn = document.getElementById('copiarSQL');
        const descargarBtn = document.getElementById('descargarSQL');
        const limpiarBtn = document.getElementById('limpiarEntrada');
        const validarBtn = document.getElementById('validarSQL');

        sqlInput.addEventListener('input', () => {
            this.actualizarContadores();
            this.validarSQL();
        });

        formatearBtn.addEventListener('click', () => this.formatearSQL());

        copiarBtn.addEventListener('click', () => {
            const sqlOutput = document.getElementById('sqlOutput');
            navigator.clipboard.writeText(sqlOutput.value).then(() => {
                mostrarNotificacion('SQL copiado al portapapeles', 'success');
            });
        });

        descargarBtn.addEventListener('click', () => this.descargarSQL());

        limpiarBtn.addEventListener('click', () => {
            sqlInput.value = '';
            document.getElementById('sqlOutput').value = '';
            this.actualizarContadores();
            this.actualizarBotones();
        });

        validarBtn.addEventListener('click', () => this.validarSQL());

        document.getElementById('mayusculas').addEventListener('change', () => {
            if (document.getElementById('sqlOutput').value) {
                this.formatearSQL();
            }
        });

        document.getElementById('nuevaLineaSelect').addEventListener('change', () => {
            if (document.getElementById('sqlOutput').value) {
                this.formatearSQL();
            }
        });

        document.getElementById('indentacion').addEventListener('change', () => {
            if (document.getElementById('sqlOutput').value) {
                this.formatearSQL();
            }
        });

        document.getElementById('commasLeading').addEventListener('change', () => {
            if (document.getElementById('sqlOutput').value) {
                this.formatearSQL();
            }
        });
    }

    validarSQL() {
        const sqlInput = document.getElementById('sqlInput');
        const estadoValidacion = document.getElementById('estadoValidacion');
        const sql = sqlInput.value.trim();

        if (!sql) {
            estadoValidacion.className = 'badge bg-secondary';
            estadoValidacion.textContent = 'En espera';
            return false;
        }

        const errores = this.validarSintaxisBasica(sql);
        
        if (errores.length === 0) {
            estadoValidacion.className = 'badge bg-success';
            estadoValidacion.textContent = 'Válido';
            return true;
        } else {
            estadoValidacion.className = 'badge bg-danger';
            estadoValidacion.textContent = `Errores: ${errores.length}`;
            estadoValidacion.title = errores.join(', ');
            return false;
        }
    }

    validarSintaxisBasica(sql) {
        const errores = [];
        const sqlUpper = sql.toUpperCase();

        const palabrasClaveValidas = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'WITH'];
        const primeraPalabra = sql.trim().split(/\s+/)[0].toUpperCase();
        
        if (!palabrasClaveValidas.includes(primeraPalabra)) {
            errores.push('La consulta debe comenzar con una palabra clave SQL válida');
        }

        let parentesis = 0;
        for (let char of sql) {
            if (char === '(') parentesis++;
            if (char === ')') parentesis--;
            if (parentesis < 0) {
                errores.push('Paréntesis desbalanceados');
                break;
            }
        }
        if (parentesis > 0) {
            errores.push('Paréntesis sin cerrar');
        }

        let comillasSimples = 0;
        let comillasDobles = 0;
        let escapado = false;
        
        for (let i = 0; i < sql.length; i++) {
            const char = sql[i];
            const prevChar = i > 0 ? sql[i-1] : '';
            
            if (char === "'" && prevChar !== '\\' && !escapado) {
                comillasSimples = comillasSimples === 0 ? 1 : 0;
            }
            if (char === '"' && prevChar !== '\\' && !escapado) {
                comillasDobles = comillasDobles === 0 ? 1 : 0;
            }
            
            escapado = char === '\\' && !escapado;
        }
        
        if (comillasSimples > 0) {
            errores.push('Comillas simples sin cerrar');
        }
        if (comillasDobles > 0) {
            errores.push('Comillas dobles sin cerrar');
        }

        return errores;
    }

    formatearSQL() {
        const sqlInput = document.getElementById('sqlInput');
        const sqlOutput = document.getElementById('sqlOutput');
        const sql = sqlInput.value.trim();

        if (!sql) {
            mostrarNotificacion('Por favor, ingresa una consulta SQL', 'warning');
            return;
        }

        try {
            const sqlFormateado = this.procesarSQL(sql);
            sqlOutput.value = sqlFormateado;
            this.actualizarContadores();
            this.actualizarBotones();
            this.mostrarMejoras();
            mostrarNotificacion('SQL formateado correctamente', 'success');
        } catch (error) {
            mostrarNotificacion('Error al formatear SQL: ' + error.message, 'error');
        }
    }

    procesarSQL(sql) {
        const opciones = this.obtenerOpciones();
        
        let sqlProcesado = sql.replace(/\s+/g, ' ').trim();
        
        const comentarios = [];
        sqlProcesado = sqlProcesado.replace(/(--[^\r\n]*|\/\*[\s\S]*?\*\/)/g, (match, comment) => {
            comentarios.push(comment);
            return `__COMENTARIO_${comentarios.length - 1}__`;
        });

        if (this.esSelect(sqlProcesado)) {
            sqlProcesado = this.formatearSelect(sqlProcesado, opciones);
        } else if (this.esInsert(sqlProcesado)) {
            sqlProcesado = this.formatearInsert(sqlProcesado, opciones);
        } else if (this.esUpdate(sqlProcesado)) {
            sqlProcesado = this.formatearUpdate(sqlProcesado, opciones);
        } else if (this.esDelete(sqlProcesado)) {
            sqlProcesado = this.formatearDelete(sqlProcesado, opciones);
        } else if (this.esCreate(sqlProcesado)) {
            sqlProcesado = this.formatearCreate(sqlProcesado, opciones);
        }

        comentarios.forEach((comentario, index) => {
            sqlProcesado = sqlProcesado.replace(`__COMENTARIO_${index}__`, comentario);
        });

        return sqlProcesado;
    }

    obtenerOpciones() {
        return {
            mayusculas: document.getElementById('mayusculas').checked,
            nuevaLineaSelect: document.getElementById('nuevaLineaSelect').checked,
            indentacion: this.obtenerIndentacion(),
            commasLeading: document.getElementById('commasLeading').checked,
            tipoSQL: document.getElementById('tipoSQL').value
        };
    }

    obtenerIndentacion() {
        const valor = document.getElementById('indentacion').value;
        if (valor === 'tab') return '\t';
        return ' '.repeat(parseInt(valor));
    }

    esSelect(sql) {
        return /^\s*SELECT\s/i.test(sql);
    }

    esInsert(sql) {
        return /^\s*INSERT\s/i.test(sql);
    }

    esUpdate(sql) {
        return /^\s*UPDATE\s/i.test(sql);
    }

    esDelete(sql) {
        return /^\s*DELETE\s/i.test(sql);
    }

    esCreate(sql) {
        return /^\s*(CREATE|ALTER)\s/i.test(sql);
    }

    formatearSelect(sql, opciones) {
        const palabrasClave = ['SELECT', 'FROM', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'OFFSET'];
        const joins = ['JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'CROSS JOIN'];
        
        let resultado = '';
        const tokens = this.tokenizarSQL(sql);
        let nivelIndentacion = 0;
        let enSelect = false;
        let primeraColumna = true;

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            const tokenUpper = token.toUpperCase();
            
            if (palabrasClave.includes(tokenUpper)) {
                if (resultado && !resultado.endsWith('\n')) {
                    resultado += '\n';
                }
                resultado += opciones.mayusculas ? tokenUpper : token;
                
                if (tokenUpper === 'SELECT') {
                    enSelect = true;
                    primeraColumna = true;
                    if (opciones.nuevaLineaSelect) {
                        resultado += '\n' + opciones.indentacion;
                    } else {
                        resultado += ' ';
                    }
                } else {
                    enSelect = false;
                    resultado += ' ';
                }
                nivelIndentacion = tokenUpper === 'SELECT' ? 1 : 0;
            } else if (joins.some(join => tokenUpper.includes(join))) {
                resultado += '\n' + (opciones.mayusculas ? tokenUpper : token) + ' ';
            } else if (token === ',' && enSelect && opciones.nuevaLineaSelect) {
                if (opciones.commasLeading) {
                    resultado += '\n' + opciones.indentacion + ', ';
                } else {
                    resultado += ',\n' + opciones.indentacion;
                }
                primeraColumna = false;
            } else if (token === '(') {
                resultado += token;
                nivelIndentacion++;
            } else if (token === ')') {
                resultado += token;
                nivelIndentacion = Math.max(0, nivelIndentacion - 1);
            } else {
                if (token !== ' ') {
                    resultado += token;
                }
                
                if (i < tokens.length - 1) {
                    const siguienteToken = tokens[i + 1];
                    if (![',', ')', '(', ';'].includes(siguienteToken) && ![',', ')', '(', ';'].includes(token)) {
                        resultado += ' ';
                    }
                }
            }
        }

        return this.limpiarEspacios(resultado);
    }

    formatearInsert(sql, opciones) {
        const regex = /INSERT\s+INTO\s+(\w+)\s*(\([^)]+\))?\s*VALUES\s*(.+)/i;
        const match = sql.match(regex);
        
        if (!match) return sql;

        const tabla = match[1];
        const columnas = match[2] || '';
        const valores = match[3];

        let resultado = opciones.mayusculas ? 'INSERT INTO' : 'INSERT INTO';
        resultado += ` ${tabla}`;
        
        if (columnas) {
            resultado += ` ${columnas}`;
        }
        
        resultado += '\n' + (opciones.mayusculas ? 'VALUES' : 'VALUES');
        
        const valoresFormateados = this.formatearValores(valores, opciones);
        resultado += valoresFormateados;

        return resultado;
    }

    formatearUpdate(sql, opciones) {
        const partes = sql.split(/\s+(SET|WHERE)\s+/i);
        let resultado = opciones.mayusculas ? 'UPDATE' : 'UPDATE';
        
        if (partes.length >= 1) {
            const tabla = partes[0].replace(/^UPDATE\s+/i, '');
            resultado += ` ${tabla}\n`;
        }
        
        if (partes.length >= 3) {
            resultado += (opciones.mayusculas ? 'SET' : 'SET') + ' ';
            resultado += partes[2].replace(/,\s*/g, ',\n' + opciones.indentacion);
        }
        
        if (partes.length >= 5) {
            resultado += '\n' + (opciones.mayusculas ? 'WHERE' : 'WHERE') + ' ';
            resultado += partes[4];
        }

        return this.limpiarEspacios(resultado);
    }

    formatearDelete(sql, opciones) {
        const partes = sql.split(/\s+(WHERE)\s+/i);
        let resultado = opciones.mayusculas ? 'DELETE FROM' : 'DELETE FROM';
        
        if (partes.length >= 1) {
            const tabla = partes[0].replace(/^DELETE\s+FROM\s+/i, '');
            resultado += ` ${tabla}`;
        }
        
        if (partes.length >= 3) {
            resultado += '\n' + (opciones.mayusculas ? 'WHERE' : 'WHERE') + ' ';
            resultado += partes[2];
        }

        return this.limpiarEspacios(resultado);
    }

    formatearCreate(sql, opciones) {
        if (/CREATE\s+TABLE/i.test(sql)) {
            return this.formatearCreateTable(sql, opciones);
        }
        return sql;
    }

    formatearCreateTable(sql, opciones) {
        const match = sql.match(/CREATE\s+TABLE\s+(\w+)\s*\(([^)]+)\)/i);
        if (!match) return sql;

        const tabla = match[1];
        const columnas = match[2];

        let resultado = opciones.mayusculas ? 'CREATE TABLE' : 'CREATE TABLE';
        resultado += ` ${tabla} (\n`;

        const columnasArray = columnas.split(',');
        columnasArray.forEach((columna, index) => {
            resultado += opciones.indentacion + columna.trim();
            if (index < columnasArray.length - 1) {
                resultado += ',';
            }
            resultado += '\n';
        });

        resultado += ');';
        return resultado;
    }

    formatearValores(valores, opciones) {
        let resultado = '';
        const grupos = valores.split(/\),\s*\(/);
        
        grupos.forEach((grupo, index) => {
            if (index === 0) {
                resultado += '\n' + opciones.indentacion + '(' + grupo;
            } else if (index === grupos.length - 1) {
                resultado += ',\n' + opciones.indentacion + '(' + grupo;
            } else {
                resultado += ',\n' + opciones.indentacion + '(' + grupo + ')';
            }
        });

        if (!resultado.endsWith(')')) {
            resultado += ')';
        }

        return resultado + ';';
    }

    tokenizarSQL(sql) {
        const tokens = [];
        let tokenActual = '';
        let enComillas = false;
        let tipoComillas = '';

        for (let i = 0; i < sql.length; i++) {
            const char = sql[i];
            
            if (!enComillas && (char === '"' || char === "'")) {
                if (tokenActual) {
                    tokens.push(tokenActual);
                    tokenActual = '';
                }
                enComillas = true;
                tipoComillas = char;
                tokenActual = char;
            } else if (enComillas && char === tipoComillas) {
                tokenActual += char;
                tokens.push(tokenActual);
                tokenActual = '';
                enComillas = false;
                tipoComillas = '';
            } else if (!enComillas && /\s/.test(char)) {
                if (tokenActual) {
                    tokens.push(tokenActual);
                    tokenActual = '';
                }
                if (char !== ' ') {
                    tokens.push(' ');
                }
            } else if (!enComillas && /[(),;]/.test(char)) {
                if (tokenActual) {
                    tokens.push(tokenActual);
                    tokenActual = '';
                }
                tokens.push(char);
            } else {
                tokenActual += char;
            }
        }

        if (tokenActual) {
            tokens.push(tokenActual);
        }

        return tokens.filter(token => token && token !== ' ');
    }

    limpiarEspacios(sql) {
        return sql
            .replace(/\s+/g, ' ')
            .replace(/\s*,\s*/g, ', ')
            .replace(/\s*\(\s*/g, '(')
            .replace(/\s*\)\s*/g, ')')
            .replace(/\s*;\s*/g, ';')
            .replace(/\n\s+\n/g, '\n')
            .trim();
    }

    actualizarContadores() {
        const sqlInput = document.getElementById('sqlInput');
        const sqlOutput = document.getElementById('sqlOutput');
        
        document.getElementById('contadorCaracteres').textContent = sqlInput.value.length;
        document.getElementById('contadorLineas').textContent = sqlInput.value.split('\n').length;
        
        if (sqlOutput) {
            document.getElementById('contadorLineasSalida').textContent = sqlOutput.value.split('\n').length;
        }
    }

    actualizarBotones() {
        const sqlOutput = document.getElementById('sqlOutput');
        const tieneContenido = sqlOutput.value.trim().length > 0;
        
        document.getElementById('copiarSQL').disabled = !tieneContenido;
        document.getElementById('descargarSQL').disabled = !tieneContenido;
    }

    mostrarMejoras() {
        const mejoras = [];
        const opciones = this.obtenerOpciones();
        
        if (opciones.mayusculas) mejoras.push('Mayúsculas');
        if (opciones.nuevaLineaSelect) mejoras.push('Formato SELECT');
        if (opciones.commasLeading) mejoras.push('Comas delanteras');
        
        document.getElementById('mejosAplicadas').textContent = 
            mejoras.length > 0 ? mejoras.join(', ') : 'Ninguna';
    }

    descargarSQL() {
        const sqlOutput = document.getElementById('sqlOutput');
        const contenido = sqlOutput.value;
        
        if (!contenido) {
            mostrarNotificacion('No hay contenido para descargar', 'warning');
            return;
        }

        const blob = new Blob([contenido], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'consulta_formateada.sql';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        mostrarNotificacion('Archivo SQL descargado', 'success');
    }
}

window.FormateadorSQL = FormateadorSQL;