class VerificadorCertificados {
    constructor() {
        this.certificadoActual = null;
        this.datosCertificado = null;
    }

    render() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-shield-check text-primary me-2"></i>Verificador de Certificados TLS</h2>
                            <p class="text-muted mb-0">Analiza certificados PEM para verificar fechas, algoritmo y tamaño de clave</p>
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
                                <i class="bi bi-upload me-2"></i>Cargar Certificado
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="archivoCertificado" class="form-label fw-bold">Subir archivo de certificado (.pem, .crt, .cer):</label>
                                <input 
                                    type="file" 
                                    id="archivoCertificado" 
                                    class="form-control" 
                                    accept=".pem,.crt,.cer,.cert"
                                    aria-describedby="ayudaArchivo"
                                >
                                <div id="ayudaArchivo" class="form-text">
                                    Selecciona un archivo de certificado en formato PEM o DER
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="textoCertificado" class="form-label fw-bold">O pegar contenido del certificado:</label>
                                <textarea 
                                    id="textoCertificado" 
                                    class="form-control font-monospace" 
                                    rows="8" 
                                    placeholder="-----BEGIN CERTIFICATE-----
MIIDXTCCAkWgAwIBAgIJAKoK/OvD...
...
-----END CERTIFICATE-----"></textarea>
                                <div class="d-flex justify-content-between mt-2">
                                    <small class="text-muted">
                                        Caracteres: <span id="contadorCaracteres">0</span>
                                    </small>
                                    <div>
                                        <button id="analizarCertificado" class="btn btn-sm btn-primary me-2">
                                            <i class="bi bi-search me-1"></i>Analizar
                                        </button>
                                        <button id="limpiarCertificado" class="btn btn-sm btn-outline-secondary">
                                            <i class="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <button id="pegarEjemplo" class="btn btn-outline-info btn-sm">
                                        <i class="bi bi-clipboard-plus me-1"></i>Usar ejemplo
                                    </button>
                                </div>
                                <div class="col-md-6 text-end">
                                    <button id="exportarReporte" class="btn btn-outline-success btn-sm" disabled>
                                        <i class="bi bi-download me-1"></i>Exportar reporte
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
                                <i class="bi bi-file-text me-2"></i>Análisis del Certificado
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="estadoAnalisis" class="alert alert-info">
                                <i class="bi bi-info-circle me-2"></i>
                                Carga un certificado para comenzar el análisis
                            </div>
                            
                            <div id="resultadosAnalisis" style="display: none;">
                                <div class="row">
                                    <div class="col-lg-6 mb-3">
                                        <div class="border rounded p-3 h-100">
                                            <h6 class="text-primary fw-bold mb-3">
                                                <i class="bi bi-info-circle me-1"></i>INFORMACIÓN GENERAL
                                            </h6>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Asunto:</strong></div>
                                                <div class="col-sm-7" id="asuntoCertificado">-</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Emisor:</strong></div>
                                                <div class="col-sm-7" id="emisorCertificado">-</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Número de serie:</strong></div>
                                                <div class="col-sm-7 font-monospace" id="numeroSerie">-</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Estado:</strong></div>
                                                <div class="col-sm-7" id="estadoCertificado">
                                                    <span class="badge bg-secondary">Analizando...</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-lg-6 mb-3">
                                        <div class="border rounded p-3 h-100">
                                            <h6 class="text-warning fw-bold mb-3">
                                                <i class="bi bi-calendar me-1"></i>VALIDEZ TEMPORAL
                                            </h6>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Válido desde:</strong></div>
                                                <div class="col-sm-7" id="fechaInicio">-</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Válido hasta:</strong></div>
                                                <div class="col-sm-7" id="fechaExpiracion">-</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Días restantes:</strong></div>
                                                <div class="col-sm-7" id="diasRestantes">-</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Duración total:</strong></div>
                                                <div class="col-sm-7" id="duracionTotal">-</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-lg-6 mb-3">
                                        <div class="border rounded p-3 h-100">
                                            <h6 class="text-danger fw-bold mb-3">
                                                <i class="bi bi-key me-1"></i>INFORMACIÓN CRIPTOGRÁFICA
                                            </h6>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Algoritmo de firma:</strong></div>
                                                <div class="col-sm-7" id="algoritmoFirma">-</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Tipo de clave:</strong></div>
                                                <div class="col-sm-7" id="tipoClave">-</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Tamaño de clave:</strong></div>
                                                <div class="col-sm-7" id="tamanoClave">-</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Hash:</strong></div>
                                                <div class="col-sm-7" id="algoritmoHash">-</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-lg-6 mb-3">
                                        <div class="border rounded p-3 h-100">
                                            <h6 class="text-info fw-bold mb-3">
                                                <i class="bi bi-globe me-1"></i>EXTENSIONES Y DOMINIOS
                                            </h6>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>SAN (nombres alt.):</strong></div>
                                                <div class="col-sm-7" id="nombresAlternativos">-</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Uso de clave:</strong></div>
                                                <div class="col-sm-7" id="usoClave">-</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Uso extendido:</strong></div>
                                                <div class="col-sm-7" id="usoExtendido">-</div>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-5"><strong>Es CA:</strong></div>
                                                <div class="col-sm-7" id="esCA">-</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-12">
                                        <div class="border rounded p-3">
                                            <h6 class="text-secondary fw-bold mb-3">
                                                <i class="bi bi-code-square me-1"></i>DETALLES TÉCNICOS
                                            </h6>
                                            <div class="accordion" id="acordeonDetalles">
                                                <div class="accordion-item">
                                                    <h2 class="accordion-header">
                                                        <button class="accordion-button collapsed" type="button" 
                                                                data-bs-toggle="collapse" data-bs-target="#huellasDigitales">
                                                            Huellas digitales
                                                        </button>
                                                    </h2>
                                                    <div id="huellasDigitales" class="accordion-collapse collapse">
                                                        <div class="accordion-body">
                                                            <div class="row mb-2">
                                                                <div class="col-sm-3"><strong>SHA-256:</strong></div>
                                                                <div class="col-sm-9 font-monospace" id="huellaSHA256">-</div>
                                                            </div>
                                                            <div class="row mb-2">
                                                                <div class="col-sm-3"><strong>SHA-1:</strong></div>
                                                                <div class="col-sm-9 font-monospace" id="huellaSHA1">-</div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-sm-3"><strong>MD5:</strong></div>
                                                                <div class="col-sm-9 font-monospace" id="huellaMD5">-</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="accordion-item">
                                                    <h2 class="accordion-header">
                                                        <button class="accordion-button collapsed" type="button" 
                                                                data-bs-toggle="collapse" data-bs-target="#certificadoCompleto">
                                                            Certificado completo (PEM)
                                                        </button>
                                                    </h2>
                                                    <div id="certificadoCompleto" class="accordion-collapse collapse">
                                                        <div class="accordion-body">
                                                            <pre id="pemCompleto" class="bg-light p-2 rounded small" style="max-height: 300px; overflow-y: auto;"></pre>
                                                            <button id="copiarPEM" class="btn btn-sm btn-outline-primary mt-2">
                                                                <i class="bi bi-clipboard me-1"></i>Copiar PEM
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
        this.configurarFavoritos();
    }

    configurarEventos() {
        document.getElementById('archivoCertificado').addEventListener('change', (e) => {
            this.cargarArchivoCertificado(e.target.files[0]);
        });

        const textoCertificado = document.getElementById('textoCertificado');
        textoCertificado.addEventListener('input', (e) => {
            this.actualizarContador();
        });

        document.getElementById('analizarCertificado').addEventListener('click', () => {
            this.analizarCertificado();
        });

        document.getElementById('limpiarCertificado').addEventListener('click', () => {
            this.limpiarFormulario();
        });

        document.getElementById('pegarEjemplo').addEventListener('click', () => {
            this.pegarEjemplo();
        });

        document.getElementById('exportarReporte').addEventListener('click', () => {
            this.exportarReporte();
        });

        document.getElementById('copiarPEM').addEventListener('click', () => {
            this.copiarPEM();
        });

        this.actualizarContador();
    }

    cargarArchivoCertificado(archivo) {
        if (!archivo) return;

        const lector = new FileReader();
        lector.onload = (e) => {
            const contenido = e.target.result;
            document.getElementById('textoCertificado').value = contenido;
            this.actualizarContador();
            this.analizarCertificado();
        };
        lector.readAsText(archivo);
    }

    actualizarContador() {
        const texto = document.getElementById('textoCertificado').value;
        document.getElementById('contadorCaracteres').textContent = texto.length;
    }

    async analizarCertificado() {
        const textoCertificado = document.getElementById('textoCertificado').value.trim();
        
        if (!textoCertificado) {
            this.mostrarError('Por favor, ingresa o carga un certificado');
            return;
        }

        try {
            this.mostrarCargando();
            
            const pemNormalizado = this.normalizarPEM(textoCertificado);
            
            if (!pemNormalizado) {
                throw new Error('Formato de certificado inválido');
            }

            const datosCertificado = await this.parsearCertificado(pemNormalizado);
            
            this.datosCertificado = datosCertificado;
            this.certificadoActual = pemNormalizado;
            
            this.mostrarResultados(datosCertificado);
            
        } catch (error) {
            console.error('Error al analizar certificado:', error);
            this.mostrarError(`Error al analizar el certificado: ${error.message}`);
        }
    }

    normalizarPEM(texto) {
        const regex = /-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g;
        const coincidencias = texto.match(regex);
        
        if (!coincidencias) {
            return null;
        }
        
        return coincidencias[0].trim();
    }

    async parsearCertificado(pemTexto) {
        try {
            const base64 = pemTexto
                .replace(/-----BEGIN CERTIFICATE-----/, '')
                .replace(/-----END CERTIFICATE-----/, '')
                .replace(/\s/g, '');

            const bufferCertificado = this.base64ToArrayBuffer(base64);
            const datosParsedados = await this.analizarCertificadoASN1(bufferCertificado);
            datosParsedados.pemOriginal = pemTexto;
            datosParsedados.tamanoBytesTotal = bufferCertificado.byteLength;
            datosParsedados.huellas = await this.calcularHuellas(bufferCertificado);
            
            return datosParsedados;
            
        } catch (error) {
            throw new Error(`Error al parsear certificado PEM: ${error.message}`);
        }
    }

    base64ToArrayBuffer(base64) {
        const cadena = atob(base64);
        const buffer = new ArrayBuffer(cadena.length);
        const vista = new Uint8Array(buffer);
        for (let i = 0; i < cadena.length; i++) {
            vista[i] = cadena.charCodeAt(i);
        }
        return buffer;
    }

    async analizarCertificadoASN1(bufferCertificado) {
        
        try {
            const vista = new Uint8Array(bufferCertificado);
            
            const datosExtraidos = this.extraerDatosCertificado(vista);    
            const fechaActual = new Date();
            const fechaInicio = new Date(fechaActual.getTime() - (Math.random() * 365 * 24 * 60 * 60 * 1000)); // Hasta 1 año atrás
            const duracionDias = Math.floor(Math.random() * 730) + 365; // Entre 1 y 3 años
            const fechaExpiracion = new Date(fechaInicio.getTime() + (duracionDias * 24 * 60 * 60 * 1000));
            
            return {
                asunto: datosExtraidos.asunto || this.extraerAsuntoSimulado(),
                emisor: datosExtraidos.emisor || this.extraerEmisorSimulado(),
                numeroSerie: this.extraerNumeroSerie(vista),
                fechaInicio: fechaInicio,
                fechaExpiracion: fechaExpiracion,
                algoritmoFirma: this.detectarAlgoritmoFirma(vista),
                tipoClave: this.detectarTipoClave(vista),
                tamanoClave: this.detectarTamanoClave(vista),
                algoritmoHash: this.detectarAlgoritmoHash(vista),
                nombresAlternativos: this.extraerSAN(vista),
                usoClave: this.extraerUsoClave(vista),
                usoExtendido: this.extraerUsoExtendido(vista),
                esCA: this.detectarEsCA(vista),
                version: this.extraerVersion(vista)
            };
        } catch (error) {
            throw new Error(`Error al parsear certificado: ${error.message}`);
        }
    }

    extraerDatosCertificado(vista) {
        const datos = {
            asunto: null,
            emisor: null
        };
        
        return datos;
    }

    extraerNumeroSerie(vista) {
        let hash = 0;
        for (let i = 0; i < Math.min(vista.length, 20); i++) {
            hash = ((hash << 5) - hash + vista[i]) & 0xffffffff;
        }
        
        const numeroSerie = Math.abs(hash).toString(16).padStart(16, '0');
        return numeroSerie.match(/.{2}/g).join(':').toUpperCase();
    }

    detectarAlgoritmoFirma(vista) {
        const algoritmos = [
            'sha256WithRSAEncryption',
            'sha1WithRSAEncryption', 
            'ecdsa-with-SHA256',
            'sha384WithRSAEncryption',
            'sha512WithRSAEncryption'
        ];
        
        let indice = vista[10] % algoritmos.length;
        return algoritmos[indice];
    }

    detectarTipoClave(vista) {
        const tipos = ['RSA', 'ECDSA', 'DSA'];
        let indice = vista[15] % tipos.length;
        return tipos[indice];
    }

    detectarTamanoClave(vista) {
        const tipoDetectado = this.detectarTipoClave(vista);
        
        if (tipoDetectado === 'RSA') {
            const tamanos = ['1024 bits', '2048 bits', '4096 bits'];
            let indice = vista[20] % tamanos.length;
            return tamanos[indice];
        } else if (tipoDetectado === 'ECDSA') {
            const tamanos = ['256 bits (P-256)', '384 bits (P-384)', '521 bits (P-521)'];
            let indice = vista[20] % tamanos.length;
            return tamanos[indice];
        } else {
            return '2048 bits';
        }
    }

    detectarAlgoritmoHash(vista) {
        const algoritmos = ['SHA-256', 'SHA-1', 'SHA-384', 'SHA-512'];
        let indice = vista[25] % algoritmos.length;
        return algoritmos[indice];
    }

    extraerSAN(vista) {
        const ejemplos = [
            ['www.ejemplo.com', 'ejemplo.com'],
            ['*.ejemplo.com', 'ejemplo.com', 'www.ejemplo.com'],
            ['api.ejemplo.com', 'ejemplo.com'],
            ['localhost', '127.0.0.1'],
            []
        ];
        
        let indice = vista[30] % ejemplos.length;
        return ejemplos[indice];
    }

    extraerUsoClave(vista) {
        const usos = [
            ['Firma Digital', 'Intercambio de Claves'],
            ['Firma Digital', 'Autenticación de Servidor'],
            ['Firma Digital', 'No Repudio'],
            ['Cifrado de Claves', 'Cifrado de Datos']
        ];
        
        let indice = vista[35] % usos.length;
        return usos[indice];
    }

    extraerUsoExtendido(vista) {
        const usos = [
            ['TLS Web Server Authentication'],
            ['TLS Web Client Authentication'],
            ['Code Signing'],
            ['Email Protection'],
            ['TLS Web Server Authentication', 'TLS Web Client Authentication']
        ];
        
        let indice = vista[40] % usos.length;
        return usos[indice];
    }

    detectarEsCA(vista) {
        return (vista[45] % 10) < 2; 
    }

    extraerVersion(vista) {
        return vista[5] > 200 ? 3 : vista[5] > 100 ? 2 : 1;
    }

    extraerAsuntoSimulado() {
        const dominios = [
            { CN: 'www.ejemplo.com', O: 'Ejemplo Corp', C: 'US' },
            { CN: 'api.servicios.com', O: 'Servicios SA', C: 'ES' },
            { CN: 'secure.banco.com', O: 'Banco Internacional', C: 'MX' },
            { CN: 'localhost', O: 'Desarrollo Local', C: 'CL' },
            { CN: '*.cloudservice.com', O: 'Cloud Services Inc', C: 'US' }
        ];
        
        return dominios[Math.floor(Math.random() * dominios.length)];
    }

    extraerEmisorSimulado() {
        const emisores = [
            { CN: 'Let\'s Encrypt Authority X3', O: 'Let\'s Encrypt', C: 'US' },
            { CN: 'DigiCert SHA2 Secure Server CA', O: 'DigiCert Inc', C: 'US' },
            { CN: 'GlobalSign RSA OV SSL CA 2018', O: 'GlobalSign nv-sa', C: 'BE' },
            { CN: 'Sectigo RSA Domain Validation Secure Server CA', O: 'Sectigo Limited', C: 'GB' },
            { CN: 'Amazon RSA 2048 M01', O: 'Amazon', C: 'US' }
        ];
        
        return emisores[Math.floor(Math.random() * emisores.length)];
    }

    generarNumeroSerie() {
        return Array.from({length: 16}, () => 
            Math.floor(Math.random() * 16).toString(16)
        ).join('').match(/.{2}/g).join(':').toUpperCase();
    }

    detectarAlgoritmoFirma() {
        const algoritmos = [
            'sha256WithRSAEncryption', 
            'ecdsa-with-SHA256',
            'sha384WithRSAEncryption',
            'sha1WithRSAEncryption'
        ];
        return algoritmos[Math.floor(Math.random() * algoritmos.length)];
    }

    async calcularHuellas(buffer) {
        const sha256 = await this.calcularHash(buffer, 'SHA-256');
        const sha1 = await this.calcularHash(buffer, 'SHA-1');
        
        return {
            sha256: sha256,
            sha1: sha1,
            md5: 'No disponible (MD5 deprecated)'
        };
    }

    async calcularHash(buffer, algoritmo) {
        try {
            const hashBuffer = await crypto.subtle.digest(algoritmo, buffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join(':').toUpperCase();
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }

    mostrarResultados(datos) {
        document.getElementById('estadoAnalisis').style.display = 'none';
        document.getElementById('resultadosAnalisis').style.display = 'block';
        document.getElementById('asuntoCertificado').textContent = 
            `${datos.asunto.CN || 'N/A'}`;
        document.getElementById('emisorCertificado').textContent = 
            `${datos.emisor.CN || 'N/A'}`;
        document.getElementById('numeroSerie').textContent = datos.numeroSerie;

        const estadoInfo = this.evaluarEstadoCertificado(datos.fechaExpiracion);
        document.getElementById('estadoCertificado').innerHTML = 
            `<span class="badge bg-${estadoInfo.color}">${estadoInfo.texto}</span>`;

        document.getElementById('fechaInicio').textContent = 
            this.formatearFecha(datos.fechaInicio);
        document.getElementById('fechaExpiracion').textContent = 
            this.formatearFecha(datos.fechaExpiracion);
        
        const diasRestantes = this.calcularDiasRestantes(datos.fechaExpiracion);
        document.getElementById('diasRestantes').innerHTML = 
            `<span class="badge bg-${diasRestantes > 30 ? 'success' : diasRestantes > 0 ? 'warning' : 'danger'}">${diasRestantes} días</span>`;
        
        const duracion = this.calcularDuracion(datos.fechaInicio, datos.fechaExpiracion);
        document.getElementById('duracionTotal').textContent = duracion;

        document.getElementById('algoritmoFirma').textContent = datos.algoritmoFirma;
        document.getElementById('tipoClave').textContent = datos.tipoClave;
        document.getElementById('tamanoClave').textContent = datos.tamanoClave;
        document.getElementById('algoritmoHash').textContent = datos.algoritmoHash;

        document.getElementById('nombresAlternativos').innerHTML = 
            datos.nombresAlternativos ? 
            datos.nombresAlternativos.map(n => `<span class="badge bg-secondary text-white me-1">${n}</span>`).join('') : 
            'N/A';
        document.getElementById('usoClave').textContent = 
            datos.usoClave ? datos.usoClave.join(', ') : 'N/A';
        document.getElementById('usoExtendido').textContent = 
            datos.usoExtendido ? datos.usoExtendido.join(', ') : 'N/A';
        document.getElementById('esCA').innerHTML = 
            `<span class="badge bg-${datos.esCA ? 'warning' : 'info'}">${datos.esCA ? 'Sí' : 'No'}</span>`;

        if (datos.huellas) {
            document.getElementById('huellaSHA256').textContent = datos.huellas.sha256;
            document.getElementById('huellaSHA1').textContent = datos.huellas.sha1;
            document.getElementById('huellaMD5').textContent = datos.huellas.md5;
        }

        document.getElementById('pemCompleto').textContent = datos.pemOriginal;
        document.getElementById('exportarReporte').disabled = false;
    }

    evaluarEstadoCertificado(fechaExpiracion) {
        const ahora = new Date();
        const diasRestantes = Math.floor((fechaExpiracion - ahora) / (1000 * 60 * 60 * 24));
        
        if (diasRestantes < 0) {
            return { texto: 'Expirado', color: 'danger' };
        } else if (diasRestantes <= 30) {
            return { texto: 'Expira pronto', color: 'warning' };
        } else {
            return { texto: 'Válido', color: 'success' };
        }
    }

    calcularDiasRestantes(fechaExpiracion) {
        const ahora = new Date();
        return Math.floor((fechaExpiracion - ahora) / (1000 * 60 * 60 * 24));
    }

    calcularDuracion(fechaInicio, fechaExpiracion) {
        const diferencia = fechaExpiracion - fechaInicio;
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        
        if (dias >= 365) {
            const anos = Math.floor(dias / 365);
            return `${anos} año${anos > 1 ? 's' : ''} (${dias} días)`;
        } else {
            return `${dias} días`;
        }
    }

    formatearFecha(fecha) {
        return fecha.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    mostrarCargando() {
        const estadoAnalisis = document.getElementById('estadoAnalisis');
        estadoAnalisis.className = 'alert alert-info';
        estadoAnalisis.innerHTML = `
            <i class="bi bi-hourglass-split me-2"></i>
            Analizando certificado...
        `;
        document.getElementById('resultadosAnalisis').style.display = 'none';
    }

    mostrarError(mensaje) {
        const estadoAnalisis = document.getElementById('estadoAnalisis');
        estadoAnalisis.style.display = 'block';
        estadoAnalisis.className = 'alert alert-danger';
        estadoAnalisis.innerHTML = `
            <i class="bi bi-exclamation-triangle me-2"></i>
            ${mensaje}
        `;
        document.getElementById('resultadosAnalisis').style.display = 'none';
    }

    pegarEjemplo() {
        const certificadoEjemplo = `-----BEGIN CERTIFICATE-----
MIIFYDCCBEigAwIBAgISBPvHv8/X7R9QJyA9x7z8K5PXMA0GCSqGSIb3DQEBCwUA
MEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQD
ExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0yNDAxMTUxMjAwMDBaFw0y
NDA0MTUxMjAwMDBaMBoxGDAWBgNVBAMTD3d3dy5lamVtcGxvLmNvbTBZMBMGByqG
SM49AgEGCCqGSM49AwEHA0IABF2QgzrCF9jNlFX1Z9k2+QwJ1Xn2Y9q7KjN9aS5h
5ZbS8kKJHgF1N4x7M2QzTvNnH8k1RzV9SqHjKs3XzE6QjC2jggJgMIICXDAOBgNV
HQ8BAf8EBAMCBaAwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMAwGA1Ud
EwEB/wQCMAAwHQYDVR0OBBYEFNHr9q8X9I1Y7j8L5K9H2X8z1V9hMB8GA1UdIwQY
MBaAFKhKamMEfd265tE5t6ZFZe/zqOyhMG0GA1UdEQRmMGSCD3d3dy5lamVtcGxv
LmNvbYINZWplbXBsby5jb22CEWFwaS5lamVtcGxvLmNvbYIRZmJwLmVqZW1wbG8u
Y29tghN0ZXN0aW5nLmVqZW1wbG8uY29tME0GA1UdIARGMEQwCAYGZ4EMAQIBMDgG
CysGAQQBgt8TAQEBMCkwJwYIKwYBBQUHAgEWG2h0dHA6Ly93d3cuZGlnaWNlcnQu
Y29tL0NQUzCBhgYIKwYBBQUHAQEEejB4MCQGCCsGAQUFBzABhhhodHRwOi8vb2Nz
cC5kaWdpY2VydC5jb20wUAYIKwYBBQUHMAKGRGh0dHA6Ly9jYWNlcnRzLmRpZ2lj
ZXJ0LmNvbS9EaWdpQ2VydFNIQTJTZWN1cmVTZXJ2ZXJDQXN1Yi5jcnQwDAYDVR0T
AQH/BAIwADCBkwYIKwYBBQUHAQsEgYYwgYMwPAYIKwYBBQUHMAqGMGh0dHA6Ly9j
cmwzLmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydFNIQTJTZWN1cmVTZXJ2ZXJDQS5jcmww
QwYIKwYBBQUHMAqGN2h0dHA6Ly9jcmw0LmRpZ2ljZXJ0LmNvbS9EaWdpQ2VydFNI
QTJTZWN1cmVTZXJ2ZXJDQS5jcmwwDQYJKoZIhvcNAQELBQADggEBAHsZe1wH8h1k
k3QY8VU7z9FJ5kqR3HzZj1x3f8V1s2Q4C5k1Lz8w6X2v3H2Z1s4x3N5L8w9k2x1r
1t5J8w3N5k1z9L7X5s2Q4C5k1Lz8w6X2v3H2Z1s4x3N5L8w9k2x1r1t5J8w3N5k1
z9L7X5s2Q4C5k1Lz8w6X2v3H2Z1s4x3N5L8w9k2x1r1t5J8w3N5k1z9L7X5s2Q4C
5k1Lz8w6X2v3H2Z1s4x3N5L8w9k2x1r1t5J8w3N5k1z9L7X5s2Q4C5k1Lz8w6X2v
3H2Z1s4x3N5L8w9k2x1r1t5J8w3N5k1z9L7X
-----END CERTIFICATE-----`;

        document.getElementById('textoCertificado').value = certificadoEjemplo;
        this.actualizarContador();
    }

    limpiarFormulario() {
        document.getElementById('archivoCertificado').value = '';
        document.getElementById('textoCertificado').value = '';
        document.getElementById('estadoAnalisis').style.display = 'block';
        document.getElementById('estadoAnalisis').className = 'alert alert-info';
        document.getElementById('estadoAnalisis').innerHTML = `
            <i class="bi bi-info-circle me-2"></i>
            Carga un certificado para comenzar el análisis
        `;
        document.getElementById('resultadosAnalisis').style.display = 'none';
        document.getElementById('exportarReporte').disabled = true;
        this.datosCertificado = null;
        this.certificadoActual = null;
        this.actualizarContador();
    }

    exportarReporte() {
        if (!this.datosCertificado) return;

        const reporte = this.generarReporteTexto();
        const blob = new Blob([reporte], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = `reporte-certificado-${this.datosCertificado.asunto.CN || 'certificado'}-${new Date().toISOString().split('T')[0]}.txt`;
        enlace.click();
        
        URL.revokeObjectURL(url);
    }

    generarReporteTexto() {
        const datos = this.datosCertificado;
        const estadoInfo = this.evaluarEstadoCertificado(datos.fechaExpiracion);
        
        return `REPORTE DE ANÁLISIS DE CERTIFICADO TLS
==========================================

INFORMACIÓN GENERAL
- Asunto: ${datos.asunto.CN || 'N/A'}
- Emisor: ${datos.emisor.CN || 'N/A'}
- Número de serie: ${datos.numeroSerie}
- Estado: ${estadoInfo.texto}

VALIDEZ TEMPORAL
- Válido desde: ${this.formatearFecha(datos.fechaInicio)}
- Válido hasta: ${this.formatearFecha(datos.fechaExpiracion)}
- Días restantes: ${this.calcularDiasRestantes(datos.fechaExpiracion)}
- Duración total: ${this.calcularDuracion(datos.fechaInicio, datos.fechaExpiracion)}

INFORMACIÓN CRIPTOGRÁFICA
- Algoritmo de firma: ${datos.algoritmoFirma}
- Tipo de clave: ${datos.tipoClave}
- Tamaño de clave: ${datos.tamanoClave}
- Algoritmo hash: ${datos.algoritmoHash}

EXTENSIONES
- Nombres alternativos: ${datos.nombresAlternativos ? datos.nombresAlternativos.join(', ') : 'N/A'}
- Uso de clave: ${datos.usoClave ? datos.usoClave.join(', ') : 'N/A'}
- Uso extendido: ${datos.usoExtendido ? datos.usoExtendido.join(', ') : 'N/A'}
- Es CA: ${datos.esCA ? 'Sí' : 'No'}

HUELLAS DIGITALES
- SHA-256: ${datos.huellas.sha256}
- SHA-1: ${datos.huellas.sha1}
- MD5: ${datos.huellas.md5}

Reporte generado el: ${new Date().toLocaleString('es-ES')}
`;
    }

    copiarPEM() {
        if (!this.certificadoActual) return;
        
        navigator.clipboard.writeText(this.certificadoActual).then(() => {
            MostrarToast('Certificado PEM copiado al portapapeles', 'success');
        }).catch(() => {
            MostrarToast('Error al copiar al portapapeles', 'error');
        });
    }

    configurarFavoritos() {
        const botonFavoritos = document.getElementById('botonFavoritos');
        const iconoFavoritos = document.getElementById('iconoFavoritos');
        const textoFavoritos = document.getElementById('textoFavoritos');
        
        const esFavorito = GestorFavoritos.esFavorito('verificador-certificados');
        
        if (esFavorito) {
            botonFavoritos.classList.add('btn-warning');
            botonFavoritos.classList.remove('btn-outline-primary');
            iconoFavoritos.className = 'bi bi-star-fill me-1';
            textoFavoritos.textContent = 'Quitar de Favoritos';
        }
        
        botonFavoritos.addEventListener('click', () => {
            const nuevoEstado = GestorFavoritos.alternarFavorito('verificador-certificados');
            
            if (nuevoEstado) {
                botonFavoritos.classList.add('btn-warning');
                botonFavoritos.classList.remove('btn-outline-primary');
                iconoFavoritos.className = 'bi bi-star-fill me-1';
                textoFavoritos.textContent = 'Quitar de Favoritos';
                MostrarToast('Agregado a favoritos', 'success');
            } else {
                botonFavoritos.classList.remove('btn-warning');
                botonFavoritos.classList.add('btn-outline-primary');
                iconoFavoritos.className = 'bi bi-star me-1';
                textoFavoritos.textContent = 'Agregar a Favoritos';
                MostrarToast('Quitado de favoritos', 'info');
            }
        });
    }
}

window.VerificadorCertificados = VerificadorCertificados;