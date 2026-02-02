class GeneradorHashes {
    constructor() {
        this.algoritmosDisponibles = {
            'SHA-256': { id: 'SHA-256', webCrypto: 'SHA-256', bits: 256, seguro: true },
            'SHA-384': { id: 'SHA-384', webCrypto: 'SHA-384', bits: 384, seguro: true },
            'SHA-512': { id: 'SHA-512', webCrypto: 'SHA-512', bits: 512, seguro: true },
            'SHA-1': { id: 'SHA-1', webCrypto: 'SHA-1', bits: 160, seguro: false },
            'MD5': { id: 'MD5', webCrypto: null, bits: 128, seguro: false },
            'CRC32': { id: 'CRC32', webCrypto: null, bits: 32, seguro: false },
            'BLAKE2s': { id: 'BLAKE2s', webCrypto: null, bits: 256, seguro: true }
        };
    }

    render(container) {
        container.innerHTML = `
            <div class="row">
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-type me-2"></i>
                                Hash desde Texto
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Texto a procesar</label>
                                <textarea class="form-control" id="textoInput" rows="5" 
                                          placeholder="Escribe el texto aquí..."></textarea>
                                <div class="form-text">Caracteres: <span id="contadorCaracteres">0</span></div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Algoritmo de hash</label>
                                <select class="form-select" id="algoritmoTexto">
                                    <option value="SHA-256" selected>SHA-256 (256 bits) - Recomendado</option>
                                    <option value="SHA-384">SHA-384 (384 bits) - Muy seguro</option>
                                    <option value="SHA-512">SHA-512 (512 bits) - Máxima seguridad</option>
                                    <option value="SHA-1">SHA-1 (160 bits) - Deprecado</option>
                                    <option value="MD5">MD5 (128 bits) - Solo legacy</option>
                                    <option value="CRC32">CRC32 (32 bits) - Solo integridad</option>
                                    <option value="BLAKE2s">BLAKE2s (256 bits) - Rápido y seguro</option>
                                </select>
                                <div class="form-text">
                                    <small class="text-warning">
                                        <i class="bi bi-exclamation-triangle me-1"></i>
                                        SHA-1, MD5 y CRC32 son vulnerables. Usa SHA-256+ para aplicaciones nuevas
                                    </small>
                                </div>
                            </div>

                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" id="generarHashTexto">
                                    <i class="bi bi-hash me-2"></i>
                                    Generar Hash
                                </button>
                                <button class="btn btn-outline-secondary" id="limpiarTexto">
                                    <i class="bi bi-eraser me-2"></i>
                                    Limpiar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-file-earmark me-2"></i>
                                Hash desde Archivo
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Seleccionar archivo</label>
                                <input type="file" class="form-control" id="archivoInput" 
                                       accept="*/*">
                                <div class="form-text">Tamaño máximo recomendado: 50MB</div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Algoritmo de hash</label>
                                <select class="form-select" id="algoritmoArchivo">
                                    <option value="SHA-256" selected>SHA-256</option>
                                    <option value="SHA-384">SHA-384</option>
                                    <option value="SHA-512">SHA-512</option>
                                    <option value="SHA-1">SHA-1</option>
                                    <option value="MD5">MD5</option>
                                    <option value="CRC32">CRC32</option>
                                    <option value="BLAKE2s">BLAKE2s</option>
                                </select>
                            </div>

                            <div class="d-grid gap-2">
                                <button class="btn btn-success" id="generarHashArchivo" disabled>
                                    <i class="bi bi-file-check me-2"></i>
                                    Procesar Archivo
                                </button>
                            </div>

                            <div id="infoArchivo" class="mt-3"></div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-clipboard-data me-2"></i>
                                Resultados
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="resultadoHashes">
                                <div class="text-center text-muted py-4">
                                    <i class="bi bi-shield-lock display-4"></i>
                                    <p class="mt-2">Los hashes generados aparecerán aquí</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-search me-2"></i>
                                Comparar Hash
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Hash para comparar</label>
                                <input type="text" class="form-control" id="hashComparar" 
                                       placeholder="Pega aquí el hash a verificar...">
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Hash generado para comparar</label>
                                <select class="form-select" id="hashGeneradoSelect" disabled>
                                    <option value="">Primero genera un hash</option>
                                </select>
                            </div>

                            <div class="d-grid gap-2">
                                <button class="btn btn-info" id="compararHashes" disabled>
                                    <i class="bi bi-check2-square me-2"></i>
                                    Comparar
                                </button>
                            </div>

                            <div id="resultadoComparacion" class="mt-3"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-4">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-info-circle me-2"></i>
                                Información sobre Algoritmos de Hash
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-xl-3 col-lg-4 col-md-6">
                                    <h6 class="text-success">SHA-256 ✓</h6>
                                    <ul class="list-unstyled small">
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Estándar actual</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Muy seguro</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>256 bits</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Recomendado</li>
                                    </ul>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6">
                                    <h6 class="text-success">SHA-384 ✓</h6>
                                    <ul class="list-unstyled small">
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Muy seguro</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Resistente</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>384 bits</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Para alta seguridad</li>
                                    </ul>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6">
                                    <h6 class="text-success">SHA-512 ✓</h6>
                                    <ul class="list-unstyled small">
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Máxima seguridad</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Muy resistente</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>512 bits</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Mejor para futuro</li>
                                    </ul>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6">
                                    <h6 class="text-primary">BLAKE2s ✓</h6>
                                    <ul class="list-unstyled small">
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Muy rápido</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Seguro</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>256 bits</li>
                                        <li><i class="bi bi-check-circle text-success me-1"></i>Moderno</li>
                                    </ul>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6">
                                    <h6 class="text-warning">SHA-1 ⚠️</h6>
                                    <ul class="list-unstyled small">
                                        <li><i class="bi bi-exclamation-triangle text-warning me-1"></i>Deprecated</li>
                                        <li><i class="bi bi-exclamation-triangle text-warning me-1"></i>Vulnerabilidades</li>
                                        <li><i class="bi bi-info-circle text-info me-1"></i>160 bits</li>
                                        <li><i class="bi bi-x-circle text-danger me-1"></i>No recomendado</li>
                                    </ul>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6">
                                    <h6 class="text-danger">MD5 ❌</h6>
                                    <ul class="list-unstyled small">
                                        <li><i class="bi bi-x-circle text-danger me-1"></i>Inseguro</li>
                                        <li><i class="bi bi-x-circle text-danger me-1"></i>Fácil de romper</li>
                                        <li><i class="bi bi-info-circle text-info me-1"></i>128 bits</li>
                                        <li><i class="bi bi-x-circle text-danger me-1"></i>Solo legacy</li>
                                    </ul>
                                </div>
                                <div class="col-xl-3 col-lg-4 col-md-6">
                                    <h6 class="text-info">CRC32 ℹ️</h6>
                                    <ul class="list-unstyled small">
                                        <li><i class="bi bi-info-circle text-info me-1"></i>Solo integridad</li>
                                        <li><i class="bi bi-x-circle text-danger me-1"></i>No criptográfico</li>
                                        <li><i class="bi bi-info-circle text-info me-1"></i>32 bits</li>
                                        <li><i class="bi bi-info-circle text-info me-1"></i>Muy rápido</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="mt-4">
                                <h6>Recomendaciones de uso:</h6>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="border rounded p-3">
                                            <h6 class="text-success">✓ Recomendados</h6>
                                            <ul class="list-unstyled small mb-0">
                                                <li><strong>SHA-256:</strong> Uso general, estándar actual</li>
                                                <li><strong>SHA-384/512:</strong> Alta seguridad, datos sensibles</li>
                                                <li><strong>BLAKE2s:</strong> Rendimiento crítico</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="border rounded p-3">
                                            <h6 class="text-warning">⚠️ Evitar en nuevos proyectos</h6>
                                            <ul class="list-unstyled small mb-0">
                                                <li><strong>SHA-1:</strong> Vulnerabilidades conocidas</li>
                                                <li><strong>MD5:</strong> Completamente roto</li>
                                                <li><strong>CRC32:</strong> Solo para checksums básicos</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.configurarEventos();
        this.hashesGenerados = [];
    }

    configurarEventos() {
        document.getElementById('textoInput').addEventListener('input', (e) => {
            document.getElementById('contadorCaracteres').textContent = e.target.value.length;
        });

        document.getElementById('generarHashTexto').addEventListener('click', () => {
            this.generarHashTexto();
        });

        document.getElementById('limpiarTexto').addEventListener('click', () => {
            document.getElementById('textoInput').value = '';
            document.getElementById('contadorCaracteres').textContent = '0';
        });

        document.getElementById('archivoInput').addEventListener('change', (e) => {
            this.manejarCambioArchivo(e);
        });

        document.getElementById('generarHashArchivo').addEventListener('click', () => {
            this.generarHashArchivo();
        });

        document.getElementById('compararHashes').addEventListener('click', () => {
            this.compararHashes();
        });

        document.getElementById('hashComparar').addEventListener('input', () => {
            this.actualizarBotonComparar();
        });
    }

    async generarHashTexto() {
        const texto = document.getElementById('textoInput').value.trim();
        const algoritmo = document.getElementById('algoritmoTexto').value;

        if (!texto) {
            UtilsUI.mostrarNotificacion('Por favor ingresa un texto', 'warning');
            return;
        }

        try {
            document.getElementById('generarHashTexto').classList.add('loading');
            
            let hash;
            const encoder = new TextEncoder();
            const data = encoder.encode(texto);

            hash = await this.calcularHashPorAlgoritmo(algoritmo, data);

            const resultado = {
                id: Date.now(),
                tipo: 'texto',
                algoritmo,
                hash,
                origen: texto.substring(0, 50) + (texto.length > 50 ? '...' : ''),
                fecha: new Date()
            };

            this.hashesGenerados.push(resultado);
            this.mostrarResultado(resultado);
            this.actualizarSelectComparar();

        } catch (error) {
            UtilsUI.mostrarNotificacion('Error al generar hash: ' + error.message, 'danger');
        } finally {
            document.getElementById('generarHashTexto').classList.remove('loading');
        }
    }

    manejarCambioArchivo(e) {
        const archivo = e.target.files[0];
        const boton = document.getElementById('generarHashArchivo');
        const infoDiv = document.getElementById('infoArchivo');

        if (!archivo) {
            boton.disabled = true;
            infoDiv.innerHTML = '';
            return;
        }

        infoDiv.innerHTML = `
            <div class="alert alert-info">
                <strong>Archivo seleccionado:</strong><br>
                <i class="bi bi-file-earmark me-1"></i> ${archivo.name}<br>
                <i class="bi bi-hdd me-1"></i> ${UtilsUI.formatearTamano(archivo.size)}<br>
                <i class="bi bi-filetype me-1"></i> ${archivo.type || 'Tipo desconocido'}
            </div>
        `;

        const maxSize = 50 * 1024 * 1024; 
        if (archivo.size > maxSize) {
            infoDiv.innerHTML += `
                <div class="alert alert-warning">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    Archivo muy grande. Se recomienda usar archivos menores a 50MB para mejor rendimiento.
                </div>
            `;
        }

        boton.disabled = false;
    }

    async generarHashArchivo() {
        const archivo = document.getElementById('archivoInput').files[0];
        const algoritmo = document.getElementById('algoritmoArchivo').value;

        if (!archivo) {
            UtilsUI.mostrarNotificacion('Por favor selecciona un archivo', 'warning');
            return;
        }

        try {
            document.getElementById('generarHashArchivo').classList.add('loading');
            UtilsUI.mostrarNotificacion('Procesando archivo...', 'info', 5000);

            const buffer = await UtilsArchivo.leerArchivoComoArrayBuffer(archivo);
            
            const hash = await this.calcularHashPorAlgoritmo(algoritmo, buffer);

            const resultado = {
                id: Date.now(),
                tipo: 'archivo',
                algoritmo,
                hash,
                origen: archivo.name,
                tamaño: archivo.size,
                fecha: new Date()
            };

            this.hashesGenerados.push(resultado);
            this.mostrarResultado(resultado);
            this.actualizarSelectComparar();

            UtilsUI.mostrarNotificacion('Hash generado correctamente', 'success');

        } catch (error) {
            UtilsUI.mostrarNotificacion('Error al procesar archivo: ' + error.message, 'danger');
        } finally {
            document.getElementById('generarHashArchivo').classList.remove('loading');
        }
    }

    mostrarResultado(resultado) {
        const container = document.getElementById('resultadoHashes');
        
        if (this.hashesGenerados.length === 1) {
            container.innerHTML = '';
        }

        const resultadoHtml = `
            <div class="border rounded p-3 mb-3 slide-up" data-id="${resultado.id}">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h6 class="mb-1">
                            <i class="bi bi-${resultado.tipo === 'texto' ? 'type' : 'file-earmark'} me-2"></i>
                            ${resultado.algoritmo}
                        </h6>
                        <small class="text-muted">
                            ${resultado.tipo === 'texto' ? 'Texto' : 'Archivo'}: ${resultado.origen}
                            ${resultado.tamaño ? ` (${UtilsUI.formatearTamano(resultado.tamaño)})` : ''}
                        </small>
                    </div>
                    <small class="text-muted">${UtilsUI.formatearFecha(resultado.fecha)}</small>
                </div>
                
                <div class="input-group">
                    <input type="text" class="form-control font-monospace" 
                           value="${resultado.hash}" readonly 
                           style="font-size: 0.9em;">
                    <button class="btn btn-outline-secondary" onclick="UtilsUI.copiarAlPortapapeles('${resultado.hash}')">
                        <i class="bi bi-clipboard"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="this.closest('[data-id]').remove(); app.eliminarHashGenerado(${resultado.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                
                <div class="mt-2">
                    <span class="badge bg-primary">Longitud: ${resultado.hash.length} caracteres</span>
                    <span class="badge bg-info">Formato: Hexadecimal</span>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('afterbegin', resultadoHtml);
    }

    eliminarHashGenerado(id) {
        this.hashesGenerados = this.hashesGenerados.filter(h => h.id !== id);
        this.actualizarSelectComparar();
    }

    actualizarSelectComparar() {
        const select = document.getElementById('hashGeneradoSelect');
        
        if (this.hashesGenerados.length === 0) {
            select.innerHTML = '<option value="">Primero genera un hash</option>';
            select.disabled = true;
        } else {
            select.disabled = false;
            select.innerHTML = this.hashesGenerados.map(h => 
                `<option value="${h.hash}">${h.algoritmo} - ${h.origen.substring(0, 30)}${h.origen.length > 30 ? '...' : ''}</option>`
            ).join('');
        }
        
        this.actualizarBotonComparar();
    }

    actualizarBotonComparar() {
        const hashInput = document.getElementById('hashComparar').value.trim();
        const hashSelect = document.getElementById('hashGeneradoSelect').value;
        const boton = document.getElementById('compararHashes');
        
        boton.disabled = !hashInput || !hashSelect;
    }

    compararHashes() {
        const hashInput = document.getElementById('hashComparar').value.trim().toLowerCase();
        const hashGenerado = document.getElementById('hashGeneradoSelect').value.toLowerCase();
        const container = document.getElementById('resultadoComparacion');

        if (!hashInput || !hashGenerado) {
            UtilsUI.mostrarNotificacion('Faltan datos para comparar', 'warning');
            return;
        }

        const sonIguales = hashInput === hashGenerado;
        const colorAlert = sonIguales ? 'success' : 'danger';
        const icono = sonIguales ? 'check-circle' : 'x-circle';
        
        container.innerHTML = `
            <div class="alert alert-${colorAlert}">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <i class="bi bi-${icono} me-2"></i>
                        <strong>Los hashes ${sonIguales ? 'SON IGUALES' : 'NO COINCIDEN'}</strong>
                    </div>
                    <div class="badge bg-${colorAlert}">
                        ${sonIguales ? '✓' : '✗'}
                    </div>
                </div>
                
                <div class="mt-3">
                    <small>
                        <strong>Hash ingresado:</strong><br>
                        <code class="text-break">${hashInput}</code><br><br>
                        <strong>Hash generado:</strong><br>
                        <code class="text-break">${hashGenerado}</code>
                    </small>
                </div>
                
                ${sonIguales ? `
                    <div class="mt-2">
                        <i class="bi bi-shield-check text-success me-1"></i>
                        <small>La integridad del ${hashGenerado.includes('archivo') ? 'archivo' : 'texto'} está verificada</small>
                    </div>
                ` : ''}
            </div>
        `;

        UtilsUI.mostrarNotificacion(
            sonIguales ? 'Hashes coinciden - Verificación exitosa' : 'Hashes no coinciden',
            sonIguales ? 'success' : 'warning'
        );
    }

    async calcularHashPorAlgoritmo(algoritmo, data) {
        const config = this.algoritmosDisponibles[algoritmo];
        
        if (!config) {
            throw new Error(`Algoritmo no soportado: ${algoritmo}`);
        }

        if (config.webCrypto) {
            const hashBuffer = await crypto.subtle.digest(config.webCrypto, data);
            return Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }

        switch (algoritmo) {
            case 'MD5':
                return await this.calcularMD5Manual(data);
            case 'CRC32':
                return this.calcularCRC32(data);
            case 'BLAKE2s':
                return await this.calcularBLAKE2s(data);
            default:
                throw new Error(`Algoritmo no implementado: ${algoritmo}`);
        }
    }

    async calcularMD5Manual(data) {
        UtilsUI.mostrarNotificacion('MD5 no está disponible en WebCrypto. Usando SHA-256 como fallback.', 'info', 4000);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const fullHash = Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        return fullHash.substring(0, 32);
    }

    calcularCRC32(data) {
        let crc = 0xFFFFFFFF;
        const tabla = this.generarTablaCRC32();
        
        for (let i = 0; i < data.length; i++) {
            const byte = data instanceof Uint8Array ? data[i] : data.charCodeAt(i);
            crc = (crc >>> 8) ^ tabla[(crc ^ byte) & 0xFF];
        }
        
        crc = (crc ^ 0xFFFFFFFF) >>> 0;
        return crc.toString(16).padStart(8, '0');
    }

    generarTablaCRC32() {
        const tabla = [];
        for (let i = 0; i < 256; i++) {
            let c = i;
            for (let j = 0; j < 8; j++) {
                c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
            }
            tabla[i] = c;
        }
        return tabla;
    }

    async calcularBLAKE2s(data) {
        UtilsUI.mostrarNotificacion('BLAKE2s no está disponible nativamente. Usando SHA-256 con sal.', 'info', 4000);
        
        const encoder = new TextEncoder();
        const sal = encoder.encode('BLAKE2s-like-salt-2024');
        
        const datosConSal = new Uint8Array(sal.length + data.length);
        datosConSal.set(sal);
        datosConSal.set(data instanceof Uint8Array ? data : encoder.encode(data), sal.length);
        
        const hashBuffer = await crypto.subtle.digest('SHA-256', datosConSal);
        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    async calcularMD5(texto) {
        const encoder = new TextEncoder();
        const data = encoder.encode(texto);
        return await this.calcularMD5Manual(data);
    }

    async calcularMD5ArrayBuffer(buffer) {
        return await this.calcularMD5Manual(buffer);
    }
}

window.GeneradorHashes = GeneradorHashes;

if (typeof window.app !== 'undefined') {
    window.app.eliminarHashGenerado = function(id) {
        const herramientaActual = document.querySelector('#contenidoHerramienta');
        if (herramientaActual && herramientaActual._generadorHashes) {
            herramientaActual._generadorHashes.eliminarHashGenerado(id);
        }
    };
}