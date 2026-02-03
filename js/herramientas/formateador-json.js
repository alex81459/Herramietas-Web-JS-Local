class FormateadorJSON {
    constructor() {
        this.jsonActual = null;
        this.historialAcciones = [];
    }

    render() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-code-slash text-primary me-2"></i>Formateador JSON</h2>
                            <p class="text-muted mb-0">Formatea, minifica y valida archivos JSON</p>
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
                                <i class="bi bi-input-cursor me-2"></i>JSON de Entrada
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="jsonInput" class="form-label fw-bold">Pega o escribe tu JSON:</label>
                                <textarea 
                                    id="jsonInput" 
                                    class="form-control font-monospace" 
                                    rows="12" 
                                    placeholder='{"nombre": "Juan", "edad": 30, "activo": true, "hobbies": ["programar", "leer"]}'></textarea>
                                <div class="d-flex justify-content-between mt-2">
                                    <div>
                                        <span id="estadoValidacion" class="badge bg-secondary">En espera</span>
                                        <small class="text-muted ms-2">
                                            Caracteres: <span id="contadorCaracteres">0</span> |
                                            Líneas: <span id="contadorLineas">0</span>
                                        </small>
                                    </div>
                                    <div>
                                        <button id="validarJSON" class="btn btn-sm btn-info me-2">
                                            <i class="bi bi-check-circle me-1"></i>Validar
                                        </button>
                                        <button id="limpiarJSON" class="btn btn-sm btn-outline-secondary">
                                            <i class="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="d-flex gap-2 mb-2">
                                        <button id="formatearJSON" class="btn btn-success btn-sm">
                                            <i class="bi bi-code me-1"></i>Formatear
                                        </button>
                                        <button id="minificarJSON" class="btn btn-warning btn-sm">
                                            <i class="bi bi-arrows-collapse me-1"></i>Minificar
                                        </button>
                                        <button id="cargarArchivo" class="btn btn-outline-info btn-sm">
                                            <i class="bi bi-upload me-1"></i>Cargar archivo
                                        </button>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="d-flex gap-2 mb-2 justify-content-end">
                                        <button id="pegarEjemplo" class="btn btn-outline-secondary btn-sm">
                                            <i class="bi bi-clipboard-plus me-1"></i>Usar ejemplo
                                        </button>
                                        <button id="copiarEntrada" class="btn btn-outline-primary btn-sm" disabled>
                                            <i class="bi bi-clipboard me-1"></i>Copiar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <input type="file" id="archivoJSON" class="d-none" accept=".json,.txt">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card herramienta-card">
                        <div class="card-header bg-success text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-file-text me-2"></i>JSON Procesado
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <label for="jsonOutput" class="form-label fw-bold mb-0">Resultado:</label>
                                    <div class="d-flex gap-2">
                                        <select id="indentacionSelect" class="form-select form-select-sm" style="width: auto;">
                                            <option value="2">2 espacios</option>
                                            <option value="4" selected>4 espacios</option>
                                            <option value="tab">Tab</option>
                                            <option value="0">Minificado</option>
                                        </select>
                                        <button id="aplicarIndentacion" class="btn btn-sm btn-outline-primary">
                                            <i class="bi bi-arrow-repeat me-1"></i>Aplicar
                                        </button>
                                    </div>
                                </div>
                                <textarea 
                                    id="jsonOutput" 
                                    class="form-control font-monospace" 
                                    rows="12" 
                                    placeholder="Aquí aparecerá el JSON procesado..."
                                    readonly></textarea>
                                <div class="d-flex justify-content-between mt-2">
                                    <small class="text-muted">
                                        Tamaño: <span id="tamanoSalida">0 bytes</span> |
                                        Líneas: <span id="lineasSalida">0</span> |
                                        Compresión: <span id="porcentajeCompresion">0%</span>
                                    </small>
                                    <div>
                                        <button id="copiarSalida" class="btn btn-sm btn-success me-2" disabled>
                                            <i class="bi bi-clipboard me-1"></i>Copiar
                                        </button>
                                        <button id="descargarJSON" class="btn btn-sm btn-outline-success" disabled>
                                            <i class="bi bi-download me-1"></i>Descargar
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
                        <div class="card-header bg-info text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-graph-up me-2"></i>Análisis del JSON
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>Estadísticas:</h6>
                                    <ul class="list-unstyled">
                                        <li><strong>Objetos:</strong> <span id="conteoObjetos">0</span></li>
                                        <li><strong>Arrays:</strong> <span id="conteoArrays">0</span></li>
                                        <li><strong>Propiedades:</strong> <span id="conteoPropiedades">0</span></li>
                                        <li><strong>Strings:</strong> <span id="conteoStrings">0</span></li>
                                        <li><strong>Números:</strong> <span id="conteoNumeros">0</span></li>
                                        <li><strong>Booleanos:</strong> <span id="conteoBooleanos">0</span></li>
                                        <li><strong>Nulos:</strong> <span id="conteoNulos">0</span></li>
                                    </ul>
                                </div>
                                <div class="col-lg-6">
                                    <h6>Estructura:</h6>
                                    <ul class="list-unstyled">
                                        <li><strong>Profundidad máxima:</strong> <span id="profundidadMaxima">0</span></li>
                                        <li><strong>Array más grande:</strong> <span id="arrayMasGrande">0 elementos</span></li>
                                        <li><strong>Objeto con más propiedades:</strong> <span id="objetoMasGrande">0 propiedades</span></li>
                                        <li><strong>String más largo:</strong> <span id="stringMasLargo">0 caracteres</span></li>
                                    </ul>
                                    
                                    <h6>Claves encontradas:</h6>
                                    <div id="clavesEncontradas" class="border rounded p-2 bg-light" style="max-height: 120px; overflow-y: auto;">
                                        <small class="text-muted">No hay JSON analizado</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="panelErrores" class="row mb-4" style="display: none;">
                <div class="col-12">
                    <div class="card herramienta-card border-danger">
                        <div class="card-header bg-danger text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-exclamation-triangle me-2"></i>Errores de Validación
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="listaErrores">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card herramienta-card border-warning">
                        <div class="card-header bg-warning">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-info-circle me-2"></i>Guía de JSON
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>Tipos de datos válidos:</h6>
                                    <ul class="list-unstyled">
                                        <li><code>string</code> - "texto entre comillas"</li>
                                        <li><code>number</code> - 123, 45.67, -89</li>
                                        <li><code>boolean</code> - true, false</li>
                                        <li><code>null</code> - valor nulo</li>
                                        <li><code>object</code> - {"clave": "valor"}</li>
                                        <li><code>array</code> - [1, 2, 3]</li>
                                    </ul>
                                </div>
                                <div class="col-lg-6">
                                    <h6>Reglas importantes:</h6>
                                    <ul class="list-unstyled">
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Usar comillas dobles para strings</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Separar elementos con comas</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>No comas al final de listas</li>
                                        <li><i class="bi bi-x-circle text-danger me-1"></i>No comentarios permitidos</li>
                                        <li><i class="bi bi-x-circle text-danger me-1"></i>No comillas simples</li>
                                    </ul>
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

        document.getElementById('jsonInput').addEventListener('input', (e) => {
            this.actualizarContadores(e.target.value);
            this.validarJSONEnVivo(e.target.value);
        });
        document.getElementById('validarJSON').addEventListener('click', () => {
            this.validarJSON();
        });

        document.getElementById('formatearJSON').addEventListener('click', () => {
            this.formatearJSON();
        });

        document.getElementById('minificarJSON').addEventListener('click', () => {
            this.minificarJSON();
        });

        document.getElementById('aplicarIndentacion').addEventListener('click', () => {
            this.aplicarIndentacion();
        });
        document.getElementById('cargarArchivo').addEventListener('click', () => {
            document.getElementById('archivoJSON').click();
        });

        document.getElementById('archivoJSON').addEventListener('change', (e) => {
            this.cargarArchivo(e);
        });

        document.getElementById('pegarEjemplo').addEventListener('click', () => {
            this.usarEjemplo();
        });

        document.getElementById('limpiarJSON').addEventListener('click', () => {
            this.limpiarTodo();
        });

        document.getElementById('copiarEntrada').addEventListener('click', () => {
            this.copiarAlPortapapeles(document.getElementById('jsonInput').value);
        });

        document.getElementById('copiarSalida').addEventListener('click', () => {
            this.copiarAlPortapapeles(document.getElementById('jsonOutput').value);
        });

        document.getElementById('descargarJSON').addEventListener('click', () => {
            this.descargarJSON();
        });
    }

    configurarFavoritos() {
        const boton = document.getElementById('botonFavoritos');
        const icono = document.getElementById('iconoFavoritos');
        const texto = document.getElementById('textoFavoritos');
        
        if (!boton || !icono || !texto) return;
        
        const esFavorito = localStorage.getItem('favoritos') ? 
            JSON.parse(localStorage.getItem('favoritos')).some(fav => fav.id === 'json-formatter') : false;
        
        if (esFavorito) {
            icono.className = 'bi bi-star-fill me-1';
            texto.textContent = 'En Favoritos';
        } else {
            icono.className = 'bi bi-star me-1';
            texto.textContent = 'Agregar a Favoritos';
        }
        
        boton.addEventListener('click', () => {
            if (window.utils && window.utils.gestorFavoritos) {
                window.utils.gestorFavoritos.alternar('json-formatter', 'Formateador JSON', 'bi-code-slash');
                setTimeout(() => this.configurarFavoritos(), 100);
            }
        });
    }

    actualizarContadores(texto) {
        const caracteres = texto.length;
        const lineas = texto.split('\n').length;
        
        document.getElementById('contadorCaracteres').textContent = caracteres;
        document.getElementById('contadorLineas').textContent = lineas;
        document.getElementById('copiarEntrada').disabled = caracteres === 0;
    }

    validarJSONEnVivo(texto) {
        const estado = document.getElementById('estadoValidacion');
        
        if (texto.trim().length === 0) {
            estado.className = 'badge bg-secondary';
            estado.textContent = 'En espera';
            return;
        }

        try {
            JSON.parse(texto);
            estado.className = 'badge bg-success';
            estado.textContent = 'JSON válido';
        } catch (error) {
            estado.className = 'badge bg-danger';
            estado.textContent = 'JSON inválido';
        }
    }

    validarJSON() {
        const texto = document.getElementById('jsonInput').value.trim();
        
        if (!texto) {
            this.mostrarNotificacion('Por favor ingresa JSON para validar', 'warning');
            return;
        }

        try {
            const objeto = JSON.parse(texto);
            this.jsonActual = objeto;
            this.analizarJSON(objeto);
            this.ocultarErrores();
            this.mostrarNotificacion('JSON válido', 'success');
        } catch (error) {
            this.mostrarErrores([error]);
            this.mostrarNotificacion('JSON inválido: ' + error.message, 'error');
        }
    }

    formatearJSON() {
        const texto = document.getElementById('jsonInput').value.trim();
        
        if (!texto) {
            this.mostrarNotificacion('Por favor ingresa JSON para formatear', 'warning');
            return;
        }

        try {
            const objeto = JSON.parse(texto);
            const indentacion = this.obtenerIndentacion();
            const formateado = JSON.stringify(objeto, null, indentacion);
            
            document.getElementById('jsonOutput').value = formateado;
            this.actualizarEstadisticasSalida(texto, formateado);
            this.habilitarBotonesSalida();
            
            this.jsonActual = objeto;
            this.analizarJSON(objeto);
            
            this.mostrarNotificacion('JSON formateado correctamente', 'success');
        } catch (error) {
            this.mostrarErrores([error]);
            this.mostrarNotificacion('Error al formatear JSON: ' + error.message, 'error');
        }
    }

    minificarJSON() {
        const texto = document.getElementById('jsonInput').value.trim();
        
        if (!texto) {
            this.mostrarNotificacion('Por favor ingresa JSON para minificar', 'warning');
            return;
        }

        try {
            const objeto = JSON.parse(texto);
            const minificado = JSON.stringify(objeto);
            
            document.getElementById('jsonOutput').value = minificado;
            this.actualizarEstadisticasSalida(texto, minificado);
            this.habilitarBotonesSalida();
            
            this.jsonActual = objeto;
            this.analizarJSON(objeto);
            
            this.mostrarNotificacion('JSON minificado correctamente', 'success');
        } catch (error) {
            this.mostrarErrores([error]);
            this.mostrarNotificacion('Error al minificar JSON: ' + error.message, 'error');
        }
    }

    aplicarIndentacion() {
        if (!this.jsonActual) {
            this.mostrarNotificacion('Primero valida o procesa un JSON', 'warning');
            return;
        }

        const indentacion = this.obtenerIndentacion();
        const formateado = JSON.stringify(this.jsonActual, null, indentacion);
        
        document.getElementById('jsonOutput').value = formateado;
        this.actualizarEstadisticasSalida(document.getElementById('jsonInput').value, formateado);
    }

    obtenerIndentacion() {
        const valor = document.getElementById('indentacionSelect').value;
        return valor === 'tab' ? '\t' : (valor === '0' ? undefined : parseInt(valor));
    }

    cargarArchivo(event) {
        const archivo = event.target.files[0];
        
        if (!archivo) return;

        const reader = new FileReader();
        
        reader.onload = (e) => {
            const contenido = e.target.result;
            document.getElementById('jsonInput').value = contenido;
            this.actualizarContadores(contenido);
            this.validarJSONEnVivo(contenido);
            this.mostrarNotificacion('Archivo cargado correctamente', 'success');
        };

        reader.onerror = () => {
            this.mostrarNotificacion('Error al leer el archivo', 'error');
        };

        reader.readAsText(archivo);
    }

    usarEjemplo() {
        const ejemplo = {
            "usuario": {
                "id": 1,
                "nombre": "Juan Pérez",
                "email": "juan@ejemplo.com",
                "activo": true,
                "fechaRegistro": "2023-01-15T10:30:00Z",
                "perfil": {
                    "edad": 28,
                    "ciudad": "Santiago",
                    "intereses": ["programación", "música", "deportes"]
                },
                "configuracion": {
                    "tema": "oscuro",
                    "idioma": "es",
                    "notificaciones": {
                        "email": true,
                        "push": false,
                        "sms": null
                    }
                }
            },
            "metadatos": {
                "version": "1.2.3",
                "timestamp": 1642248600,
                "servidor": "api.ejemplo.com"
            }
        };
        
        const ejemploTexto = JSON.stringify(ejemplo, null, 2);
        document.getElementById('jsonInput').value = ejemploTexto;
        this.actualizarContadores(ejemploTexto);
        this.validarJSONEnVivo(ejemploTexto);
        this.mostrarNotificacion('Ejemplo cargado', 'info');
    }

    analizarJSON(objeto) {
        const estadisticas = this.calcularEstadisticas(objeto);
        
        document.getElementById('conteoObjetos').textContent = estadisticas.objetos;
        document.getElementById('conteoArrays').textContent = estadisticas.arrays;
        document.getElementById('conteoPropiedades').textContent = estadisticas.propiedades;
        document.getElementById('conteoStrings').textContent = estadisticas.strings;
        document.getElementById('conteoNumeros').textContent = estadisticas.numeros;
        document.getElementById('conteoBooleanos').textContent = estadisticas.booleanos;
        document.getElementById('conteoNulos').textContent = estadisticas.nulos;
        
        document.getElementById('profundidadMaxima').textContent = estadisticas.profundidad;
        document.getElementById('arrayMasGrande').textContent = estadisticas.arrayMasGrande + ' elementos';
        document.getElementById('objetoMasGrande').textContent = estadisticas.objetoMasGrande + ' propiedades';
        document.getElementById('stringMasLargo').textContent = estadisticas.stringMasLargo + ' caracteres';
        
        this.mostrarClaves(estadisticas.claves);
    }

    calcularEstadisticas(objeto) {
        const estadisticas = {
            objetos: 0,
            arrays: 0,
            propiedades: 0,
            strings: 0,
            numeros: 0,
            booleanos: 0,
            nulos: 0,
            profundidad: 0,
            arrayMasGrande: 0,
            objetoMasGrande: 0,
            stringMasLargo: 0,
            claves: new Set()
        };

        const analizarRecursivo = (valor, profundidad = 1) => {
            estadisticas.profundidad = Math.max(estadisticas.profundidad, profundidad);

            if (valor === null) {
                estadisticas.nulos++;
            } else if (Array.isArray(valor)) {
                estadisticas.arrays++;
                estadisticas.arrayMasGrande = Math.max(estadisticas.arrayMasGrande, valor.length);
                valor.forEach(item => analizarRecursivo(item, profundidad + 1));
            } else if (typeof valor === 'object') {
                estadisticas.objetos++;
                const claves = Object.keys(valor);
                estadisticas.propiedades += claves.length;
                estadisticas.objetoMasGrande = Math.max(estadisticas.objetoMasGrande, claves.length);
                
                claves.forEach(clave => {
                    estadisticas.claves.add(clave);
                    analizarRecursivo(valor[clave], profundidad + 1);
                });
            } else if (typeof valor === 'string') {
                estadisticas.strings++;
                estadisticas.stringMasLargo = Math.max(estadisticas.stringMasLargo, valor.length);
            } else if (typeof valor === 'number') {
                estadisticas.numeros++;
            } else if (typeof valor === 'boolean') {
                estadisticas.booleanos++;
            }
        };

        analizarRecursivo(objeto);
        return estadisticas;
    }

    mostrarClaves(claves) {
        const container = document.getElementById('clavesEncontradas');
        
        if (claves.size === 0) {
            container.innerHTML = '<small class="text-muted">No hay claves encontradas</small>';
            return;
        }

        const clavesArray = Array.from(claves);
        const clavesHTML = clavesArray.map(clave => 
            `<span class="badge bg-secondary text-white me-1 mb-1"><code>${clave}</code></span>`
        ).join('');
        
        container.innerHTML = clavesHTML;
    }

    actualizarEstadisticasSalida(entrada, salida) {
        const tamanoEntrada = new Blob([entrada]).size;
        const tamanoSalida = new Blob([salida]).size;
        const lineas = salida.split('\n').length;
        const compresion = tamanoEntrada > 0 ? 
            Math.round((1 - tamanoSalida / tamanoEntrada) * 100) : 0;

        document.getElementById('tamanoSalida').textContent = this.formatearTamano(tamanoSalida);
        document.getElementById('lineasSalida').textContent = lineas;
        document.getElementById('porcentajeCompresion').textContent = compresion + '%';
    }

    habilitarBotonesSalida() {
        document.getElementById('copiarSalida').disabled = false;
        document.getElementById('descargarJSON').disabled = false;
    }

    mostrarErrores(errores) {
        const panel = document.getElementById('panelErrores');
        const lista = document.getElementById('listaErrores');
        
        const erroresHTML = errores.map(error => `
            <div class="alert alert-danger mb-2">
                <strong>Error:</strong> ${error.message}
            </div>
        `).join('');
        
        lista.innerHTML = erroresHTML;
        panel.style.display = 'block';
    }

    ocultarErrores() {
        document.getElementById('panelErrores').style.display = 'none';
    }

    descargarJSON() {
        const contenido = document.getElementById('jsonOutput').value;
        
        if (!contenido) {
            this.mostrarNotificacion('No hay contenido para descargar', 'warning');
            return;
        }

        const blob = new Blob([contenido], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        
        enlace.href = url;
        enlace.download = 'formato.json';
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
        
        this.mostrarNotificacion('JSON descargado correctamente', 'success');
    }

    limpiarTodo() {
        document.getElementById('jsonInput').value = '';
        document.getElementById('jsonOutput').value = '';
        
        this.actualizarContadores('');
        this.validarJSONEnVivo('');
        this.ocultarErrores();
        
        document.getElementById('copiarSalida').disabled = true;
        document.getElementById('descargarJSON').disabled = true;
        
        // Limpiar análisis
        ['conteoObjetos', 'conteoArrays', 'conteoPropiedades', 'conteoStrings', 
         'conteoNumeros', 'conteoBooleanos', 'conteoNulos', 'profundidadMaxima'].forEach(id => {
            document.getElementById(id).textContent = '0';
        });
        
        document.getElementById('arrayMasGrande').textContent = '0 elementos';
        document.getElementById('objetoMasGrande').textContent = '0 propiedades';
        document.getElementById('stringMasLargo').textContent = '0 caracteres';
        document.getElementById('clavesEncontradas').innerHTML = '<small class="text-muted">No hay JSON analizado</small>';
        
        document.getElementById('tamanoSalida').textContent = '0 bytes';
        document.getElementById('lineasSalida').textContent = '0';
        document.getElementById('porcentajeCompresion').textContent = '0%';
        
        this.jsonActual = null;
    }

    formatearTamano(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const tamaños = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + tamaños[i];
    }

    copiarAlPortapapeles(texto) {
        navigator.clipboard.writeText(texto).then(() => {
            this.mostrarNotificacion('Copiado al portapapeles', 'success');
        }).catch(() => {
            const textarea = document.createElement('textarea');
            textarea.value = texto;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.mostrarNotificacion('Copiado al portapapeles', 'success');
        });
    }

    mostrarNotificacion(mensaje, tipo = 'info') {
        const notificacion = document.createElement('div');
        notificacion.className = `alert alert-${tipo === 'error' ? 'danger' : tipo} alert-dismissible fade show position-fixed`;
        notificacion.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notificacion.innerHTML = `
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 3000);
    }
}

window.formateadorJSON = new FormateadorJSON();