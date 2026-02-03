class GeneradorUUID {
    constructor() {
        this.historialUUIDs = [];
        this.maxHistorial = 50;
    }

    render() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-hash text-primary me-2"></i>Generador de UUID v4</h2>
                            <p class="text-muted mb-0">Genera identificadores únicos universales usando crypto.randomUUID()</p>
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
                                <i class="bi bi-gear me-2"></i>Generador de UUID
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="mb-3">
                                        <label for="uuidOutput" class="form-label fw-bold">UUID Generado:</label>
                                        <div class="input-group">
                                            <input 
                                                type="text" 
                                                id="uuidOutput" 
                                                class="form-control font-monospace bg-light" 
                                                value="Presiona 'Generar' para crear un UUID"
                                                readonly>
                                            <button id="copiarUUID" class="btn btn-success" disabled>
                                                <i class="bi bi-clipboard me-1"></i>Copiar
                                            </button>
                                        </div>
                                        <div class="form-text">
                                            Ejemplo: 550e8400-e29b-41d4-a716-446655440000
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="d-flex flex-column gap-2">
                                        <button id="generarUUID" class="btn btn-primary btn-lg">
                                            <i class="bi bi-arrow-clockwise me-2"></i>Generar UUID
                                        </button>
                                        <button id="generarLote" class="btn btn-outline-primary">
                                            <i class="bi bi-list-ul me-1"></i>Generar lote
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
                                <i class="bi bi-list-ul me-2"></i>Generación en Lote
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label for="cantidadLote" class="form-label fw-bold">Cantidad:</label>
                                    <div class="input-group">
                                        <input type="number" id="cantidadLote" class="form-control" value="5" min="1" max="100">
                                        <span class="input-group-text">UUIDs</span>
                                    </div>
                                    <div class="form-text">Máximo 100 UUIDs por lote</div>
                                </div>
                                <div class="col-md-6">
                                    <label for="formatoLote" class="form-label fw-bold">Formato de salida:</label>
                                    <select id="formatoLote" class="form-select">
                                        <option value="lista">Lista simple</option>
                                        <option value="json">Array JSON</option>
                                        <option value="csv">CSV</option>
                                        <option value="sql">INSERT SQL</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <label for="loteOutput" class="form-label fw-bold mb-0">UUIDs Generados:</label>
                                    <div>
                                        <button id="generarLoteBtn" class="btn btn-success me-2">
                                            <i class="bi bi-plus-circle me-1"></i>Generar Lote
                                        </button>
                                        <button id="copiarLote" class="btn btn-outline-success" disabled>
                                            <i class="bi bi-clipboard me-1"></i>Copiar Todo
                                        </button>
                                    </div>
                                </div>
                                <textarea 
                                    id="loteOutput" 
                                    class="form-control font-monospace" 
                                    rows="8" 
                                    placeholder="Los UUIDs generados aparecerán aquí..."
                                    readonly></textarea>
                                <div class="d-flex justify-content-between mt-2">
                                    <small class="text-muted">
                                        Total: <span id="totalUUIDs">0</span> UUIDs |
                                        Tamaño: <span id="tamanoTotal">0 bytes</span>
                                    </small>
                                    <button id="descargarLote" class="btn btn-sm btn-outline-primary" disabled>
                                        <i class="bi bi-download me-1"></i>Descargar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mb-4">
                <div class="col-lg-6">
                    <div class="card herramienta-card h-100">
                        <div class="card-header bg-info text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-clock-history me-2"></i>Historial Reciente
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between mb-3">
                                <small class="text-muted">Últimos <span id="contadorHistorial">0</span> UUIDs generados</small>
                                <button id="limpiarHistorial" class="btn btn-sm btn-outline-danger" disabled>
                                    <i class="bi bi-trash me-1"></i>Limpiar
                                </button>
                            </div>
                            <div id="listaHistorial" style="max-height: 300px; overflow-y: auto;">
                                <p class="text-muted text-center">No hay UUIDs generados aún</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-6">
                    <div class="card herramienta-card h-100">
                        <div class="card-header bg-warning">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-info-circle me-2"></i>Análisis UUID
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="uuidAnalizar" class="form-label fw-bold">UUID a analizar:</label>
                                <input type="text" id="uuidAnalizar" class="form-control font-monospace" 
                                       placeholder="Pega un UUID aquí para analizarlo...">
                            </div>
                            
                            <div id="analisisResultado">
                                <h6>Información del UUID:</h6>
                                <ul class="list-unstyled">
                                    <li><strong>Versión:</strong> <span id="versionUUID">-</span></li>
                                    <li><strong>Variante:</strong> <span id="varianteUUID">-</span></li>
                                    <li><strong>Formato válido:</strong> <span id="validoUUID" class="badge bg-secondary">-</span></li>
                                    <li><strong>Longitud:</strong> <span id="longitudUUID">-</span></li>
                                    <li><strong>Timestamp:</strong> <span id="timestampUUID">-</span></li>
                                </ul>
                                
                                <h6>Componentes:</h6>
                                <div class="border rounded p-2 bg-light">
                                    <small class="font-monospace" id="componentesUUID">
                                        <span class="text-danger">xxxxxxxx</span>-<span class="text-success">xxxx</span>-<span class="text-info">xxxx</span>-<span class="text-warning">xxxx</span>-<span class="text-primary">xxxxxxxxxxxx</span><br>
                                        <small class="text-muted">time-low | time-mid | time-hi-version | clock-seq | node</small>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card herramienta-card border-info">
                        <div class="card-header bg-info text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-book me-2"></i>¿Qué es UUID v4?
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>Universally Unique Identifier v4</h6>
                                    <p class="text-muted">
                                        Es un identificador único de 128 bits generado de forma aleatoria. 
                                        La probabilidad de duplicación es extremadamente baja.
                                    </p>
                                    
                                    <h6>Características:</h6>
                                    <ul class="list-unstyled">
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Únicos a nivel global</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>No requieren coordinación central</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Generación rápida</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>128 bits de entropía</li>
                                    </ul>
                                </div>
                                <div class="col-lg-6">
                                    <h6>Casos de uso comunes:</h6>
                                    <ul class="list-unstyled">
                                        <li><code>Base de datos</code> - IDs primarios</li>
                                        <li><code>APIs</code> - Identificadores de recursos</li>
                                        <li><code>Sesiones</code> - Tokens de sesión</li>
                                        <li><code>Archivos</code> - Nombres únicos</li>
                                        <li><code>Microservicios</code> - Trazabilidad</li>
                                    </ul>
                                    
                                    <h6>Formato estándar:</h6>
                                    <div class="border rounded p-2 bg-light">
                                        <code class="small">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code><br>
                                        <small class="text-muted">8-4-4-4-12 caracteres hexadecimales</small>
                                    </div>
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

        document.getElementById('generarUUID').addEventListener('click', () => {
            this.generarUUIDIndividual();
        });

        document.getElementById('copiarUUID').addEventListener('click', () => {
            this.copiarAlPortapapeles(document.getElementById('uuidOutput').value);
        });
        document.getElementById('generarLote').addEventListener('click', () => {
            this.mostrarModalLote();
        });

        document.getElementById('generarLoteBtn').addEventListener('click', () => {
            this.generarLoteUUIDs();
        });

        document.getElementById('copiarLote').addEventListener('click', () => {
            this.copiarAlPortapapeles(document.getElementById('loteOutput').value);
        });

        document.getElementById('descargarLote').addEventListener('click', () => {
            this.descargarLote();
        });
        document.getElementById('limpiarHistorial').addEventListener('click', () => {
            this.limpiarHistorial();
        });

        document.getElementById('uuidAnalizar').addEventListener('input', (e) => {
            this.analizarUUID(e.target.value);
        });
    }

    configurarFavoritos() {
        const boton = document.getElementById('botonFavoritos');
        const icono = document.getElementById('iconoFavoritos');
        const texto = document.getElementById('textoFavoritos');
        
        if (!boton || !icono || !texto) return;
        
        const esFavorito = localStorage.getItem('favoritos') ? 
            JSON.parse(localStorage.getItem('favoritos')).some(fav => fav.id === 'generador-uuid') : false;
        
        if (esFavorito) {
            icono.className = 'bi bi-star-fill me-1';
            texto.textContent = 'En Favoritos';
        } else {
            icono.className = 'bi bi-star me-1';
            texto.textContent = 'Agregar a Favoritos';
        }
        
        boton.addEventListener('click', () => {
            if (window.utils && window.utils.gestorFavoritos) {
                window.utils.gestorFavoritos.alternar('generador-uuid', 'Generador de UUID v4', 'bi-hash');
                setTimeout(() => this.configurarFavoritos(), 100);
            }
        });
    }

    generarUUIDIndividual() {
        try {
            let uuid;
            
            if (crypto && crypto.randomUUID) {
                uuid = crypto.randomUUID();
            } else {
                uuid = this.generarUUIDFallback();
            }

            document.getElementById('uuidOutput').value = uuid;
            document.getElementById('copiarUUID').disabled = false;
            
            this.agregarAlHistorial(uuid);
            this.mostrarNotificacion('UUID v4 generado correctamente', 'success');
            
        } catch (error) {
            this.mostrarNotificacion('Error al generar UUID: ' + error.message, 'error');
            console.error('Error UUID:', error);
        }
    }

    generarUUIDFallback() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    generarLoteUUIDs() {
        const cantidad = parseInt(document.getElementById('cantidadLote').value);
        const formato = document.getElementById('formatoLote').value;
        
        if (cantidad < 1 || cantidad > 100) {
            this.mostrarNotificacion('La cantidad debe estar entre 1 y 100', 'warning');
            return;
        }

        try {
            const uuids = [];
            
            for (let i = 0; i < cantidad; i++) {
                const uuid = crypto && crypto.randomUUID ? 
                    crypto.randomUUID() : this.generarUUIDFallback();
                uuids.push(uuid);
                this.agregarAlHistorial(uuid);
            }

            const salida = this.formatearLote(uuids, formato);
            document.getElementById('loteOutput').value = salida;
            document.getElementById('copiarLote').disabled = false;
            document.getElementById('descargarLote').disabled = false;
            
            this.actualizarEstadisticasLote(uuids, salida);
            this.mostrarNotificacion(`${cantidad} UUIDs generados correctamente`, 'success');
            
        } catch (error) {
            this.mostrarNotificacion('Error al generar lote: ' + error.message, 'error');
            console.error('Error lote UUID:', error);
        }
    }

    formatearLote(uuids, formato) {
        switch (formato) {
            case 'lista':
                return uuids.join('\n');
            
            case 'json':
                return JSON.stringify(uuids, null, 2);
            
            case 'csv':
                return 'uuid\n' + uuids.join('\n');
            
            case 'sql':
                const valores = uuids.map(uuid => `('${uuid}')`).join(',\n');
                return `INSERT INTO tabla (uuid) VALUES\n${valores};`;
            
            default:
                return uuids.join('\n');
        }
    }

    actualizarEstadisticasLote(uuids, salida) {
        document.getElementById('totalUUIDs').textContent = uuids.length;
        document.getElementById('tamanoTotal').textContent = this.formatearTamano(new Blob([salida]).size);
    }

    agregarAlHistorial(uuid) {
        const ahora = new Date();
        const entrada = {
            uuid: uuid,
            timestamp: ahora.toLocaleString(),
            timestampRaw: ahora.getTime()
        };

        this.historialUUIDs.unshift(entrada);
        
        if (this.historialUUIDs.length > this.maxHistorial) {
            this.historialUUIDs = this.historialUUIDs.slice(0, this.maxHistorial);
        }

        this.actualizarHistorialUI();
    }

    actualizarHistorialUI() {
        const container = document.getElementById('listaHistorial');
        const contador = document.getElementById('contadorHistorial');
        const botonLimpiar = document.getElementById('limpiarHistorial');
        
        contador.textContent = this.historialUUIDs.length;
        
        if (this.historialUUIDs.length === 0) {
            container.innerHTML = '<p class="text-muted text-center">No hay UUIDs generados aún</p>';
            botonLimpiar.disabled = true;
            return;
        }

        botonLimpiar.disabled = false;
        
        const historialHTML = this.historialUUIDs.map(entrada => `
            <div class="border rounded p-2 mb-2 bg-light">
                <div class="d-flex justify-content-between align-items-start">
                    <code class="small">${entrada.uuid}</code>
                    <button class="btn btn-sm btn-outline-primary" onclick="window.generadorUUID.copiarAlPortapapeles('${entrada.uuid}')">
                        <i class="bi bi-clipboard"></i>
                    </button>
                </div>
                <small class="text-muted">${entrada.timestamp}</small>
            </div>
        `).join('');
        
        container.innerHTML = historialHTML;
    }

    limpiarHistorial() {
        this.historialUUIDs = [];
        this.actualizarHistorialUI();
        this.mostrarNotificacion('Historial limpiado', 'info');
    }

    analizarUUID(uuid) {
        const limpio = uuid.trim();
        
        if (!limpio) {
            this.limpiarAnalisis();
            return;
        }

        const esValido = this.validarUUID(limpio);
        const info = this.extraerInfoUUID(limpio);
        
        document.getElementById('validoUUID').className = `badge bg-${esValido ? 'success' : 'danger'}`;
        document.getElementById('validoUUID').textContent = esValido ? 'Válido' : 'Inválido';
        
        document.getElementById('versionUUID').textContent = info.version || '-';
        document.getElementById('varianteUUID').textContent = info.variant || '-';
        document.getElementById('longitudUUID').textContent = limpio.length;
        document.getElementById('timestampUUID').textContent = info.timestamp || 'No aplica (v4)';
        
        this.mostrarComponentesUUID(limpio);
    }

    validarUUID(uuid) {
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return regex.test(uuid);
    }

    extraerInfoUUID(uuid) {
        if (!this.validarUUID(uuid)) {
            return { version: 'Inválido', variant: 'Inválido' };
        }

        const partes = uuid.split('-');
        const versionHex = partes[2][0];
        const variantHex = partes[3][0];
        
        const version = parseInt(versionHex, 16);
        const variant = parseInt(variantHex, 16);
        
        let variantText = 'Desconocido';
        if ((variant & 0x8) === 0) variantText = 'NCS backward compatible';
        else if ((variant & 0xc) === 0x8) variantText = 'RFC 4122';
        else if ((variant & 0xe) === 0xc) variantText = 'Microsoft GUID';
        else if ((variant & 0xf) === 0xe) variantText = 'Reservado futuro';

        return {
            version: `v${version}`,
            variant: variantText,
            timestamp: version === 1 ? 'UUID v1 (con timestamp)' : null
        };
    }

    mostrarComponentesUUID(uuid) {
        if (!this.validarUUID(uuid)) {
            document.getElementById('componentesUUID').innerHTML = `
                <span class="text-danger">UUID inválido</span><br>
                <small class="text-muted">Formato esperado: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</small>
            `;
            return;
        }

        const partes = uuid.split('-');
        document.getElementById('componentesUUID').innerHTML = `
            <span class="text-danger">${partes[0]}</span>-<span class="text-success">${partes[1]}</span>-<span class="text-info">${partes[2]}</span>-<span class="text-warning">${partes[3]}</span>-<span class="text-primary">${partes[4]}</span><br>
            <small class="text-muted">time-low | time-mid | time-hi-version | clock-seq | node</small>
        `;
    }

    limpiarAnalisis() {
        document.getElementById('versionUUID').textContent = '-';
        document.getElementById('varianteUUID').textContent = '-';
        document.getElementById('validoUUID').className = 'badge bg-secondary';
        document.getElementById('validoUUID').textContent = '-';
        document.getElementById('longitudUUID').textContent = '-';
        document.getElementById('timestampUUID').textContent = '-';
        
        document.getElementById('componentesUUID').innerHTML = `
            <span class="text-danger">xxxxxxxx</span>-<span class="text-success">xxxx</span>-<span class="text-info">xxxx</span>-<span class="text-warning">xxxx</span>-<span class="text-primary">xxxxxxxxxxxx</span><br>
            <small class="text-muted">time-low | time-mid | time-hi-version | clock-seq | node</small>
        `;
    }

    mostrarModalLote() {
        document.querySelector('.card-header.bg-success').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    descargarLote() {
        const contenido = document.getElementById('loteOutput').value;
        const formato = document.getElementById('formatoLote').value;
        
        if (!contenido) {
            this.mostrarNotificacion('No hay contenido para descargar', 'warning');
            return;
        }

        let extension = 'txt';
        let tipoMime = 'text/plain';
        
        switch (formato) {
            case 'json':
                extension = 'json';
                tipoMime = 'application/json';
                break;
            case 'csv':
                extension = 'csv';
                tipoMime = 'text/csv';
                break;
            case 'sql':
                extension = 'sql';
                tipoMime = 'text/sql';
                break;
        }

        const blob = new Blob([contenido], { type: tipoMime });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        
        enlace.href = url;
        enlace.download = `uuids.${extension}`;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
        
        this.mostrarNotificacion('Lote descargado correctamente', 'success');
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

window.generadorUUID = new GeneradorUUID();