class Base64Conversor {
    constructor() {
        this.archivosConvertidos = [];
    }

    render() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-code-square text-primary me-2"></i>Conversor Base64</h2>
                            <p class="text-muted mb-0">Codifica y decodifica texto y archivos en formato Base64</p>
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
                                <i class="bi bi-type me-2"></i>Conversión de Texto
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6 mb-3">
                                    <label for="textoInput" class="form-label fw-bold">Texto Original:</label>
                                    <textarea 
                                        id="textoInput" 
                                        class="form-control" 
                                        rows="8" 
                                        placeholder="Ingresa el texto que quieres convertir a Base64..."></textarea>
                                    <div class="d-flex justify-content-between mt-2">
                                        <small class="text-muted">
                                            Caracteres: <span id="contadorTexto">0</span> | 
                                            Bytes: <span id="contadorBytesTexto">0</span>
                                        </small>
                                        <div>
                                            <button id="codificarTexto" class="btn btn-sm btn-primary me-2">
                                                <i class="bi bi-arrow-right me-1"></i>Codificar
                                            </button>
                                            <button class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('textoInput').value = ''; document.getElementById('contadorTexto').textContent = '0'; document.getElementById('contadorBytesTexto').textContent = '0';">
                                                <i class="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 mb-3">
                                    <label for="base64Salida" class="form-label fw-bold">Base64 Codificado:</label>
                                    <textarea 
                                        id="base64Salida" 
                                        class="form-control font-monospace" 
                                        rows="8" 
                                        placeholder="Aquí aparecerá el resultado en Base64..."
                                        readonly></textarea>
                                    <div class="d-flex justify-content-between mt-2">
                                        <small class="text-muted">
                                            Caracteres: <span id="contadorBase64Salida">0</span> | 
                                            Expansión: <span id="expansionPorcentaje">0%</span>
                                        </small>
                                        <div>
                                            <button id="copiarBase64Salida" class="btn btn-sm btn-success me-2" disabled>
                                                <i class="bi bi-clipboard me-1"></i>Copiar
                                            </button>
                                            <button class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('base64Salida').value = ''; document.getElementById('copiarBase64Salida').disabled = true; document.getElementById('contadorBase64Salida').textContent = '0'; document.getElementById('expansionPorcentaje').textContent = '0%';">
                                                <i class="bi bi-x-lg"></i>
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
                                <i class="bi bi-arrow-left-right me-2"></i>Decodificación de Base64
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6 mb-3">
                                    <label for="base64Input" class="form-label fw-bold">Código Base64:</label>
                                    <textarea 
                                        id="base64Input" 
                                        class="form-control font-monospace" 
                                        rows="8" 
                                        placeholder="Pega aquí el código Base64 que quieres decodificar..."></textarea>
                                    <div class="d-flex justify-content-between mt-2">
                                        <div>
                                            <span id="estadoValidacion" class="badge bg-secondary">En espera</span>
                                            <small class="text-muted ms-2">
                                                Caracteres: <span id="contadorBase64Input">0</span>
                                            </small>
                                        </div>
                                        <div>
                                            <button id="decodificarTexto" class="btn btn-sm btn-success me-2">
                                                <i class="bi bi-arrow-left me-1"></i>Decodificar
                                            </button>
                                            <button class="btn btn-sm btn-outline-secondary" onclick="window.base64Conversor.limpiarDecodificacion()">
                                                <i class="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 mb-3">
                                    <label for="textoSalida" class="form-label fw-bold">Texto Decodificado:</label>
                                    <textarea 
                                        id="textoSalida" 
                                        class="form-control" 
                                        rows="8" 
                                        placeholder="Aquí aparecerá el texto decodificado..."
                                        readonly></textarea>
                                    <div class="d-flex justify-content-between mt-2">
                                        <small class="text-muted">
                                            Caracteres: <span id="contadorTextoSalida">0</span> | 
                                            Bytes: <span id="contadorBytesTextoSalida">0</span>
                                        </small>
                                        <div>
                                            <button id="copiarTextoSalida" class="btn btn-sm btn-success me-2" disabled>
                                                <i class="bi bi-clipboard me-1"></i>Copiar
                                            </button>
                                            <button class="btn btn-sm btn-outline-secondary" onclick="document.getElementById('textoSalida').value = ''; document.getElementById('copiarTextoSalida').disabled = true; document.getElementById('contadorTextoSalida').textContent = '0'; document.getElementById('contadorBytesTextoSalida').textContent = '0';">
                                                <i class="bi bi-x-lg"></i>
                                            </button>
                                        </div>
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
                        <div class="card-header bg-warning text-dark">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-file-earmark-code me-2"></i>Conversión de Archivos
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6 mb-3">
                                    <label for="archivoInput" class="form-label fw-bold">Seleccionar Archivo:</label>
                                    <input type="file" id="archivoInput" class="form-control">
                                    <div class="mt-3">
                                        <div id="infoArchivo" class="d-none">
                                            <h6>Información del Archivo:</h6>
                                            <ul class="list-unstyled">
                                                <li><strong>Nombre:</strong> <span id="nombreArchivo"></span></li>
                                                <li><strong>Tamaño:</strong> <span id="tamanoArchivo"></span></li>
                                                <li><strong>Tipo:</strong> <span id="tipoArchivo"></span></li>
                                                <li><strong>Última modificación:</strong> <span id="fechaModificacion"></span></li>
                                            </ul>
                                        </div>
                                        <div class="d-grid gap-2">
                                            <button id="convertirArchivo" class="btn btn-warning" disabled>
                                                <i class="bi bi-file-arrow-up me-2"></i>Convertir a Base64
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 mb-3">
                                    <label for="resultadoArchivo" class="form-label fw-bold">Resultado Base64:</label>
                                    <textarea 
                                        id="resultadoArchivo" 
                                        class="form-control font-monospace" 
                                        rows="10" 
                                        placeholder="Aquí aparecerá el archivo codificado en Base64..."
                                        readonly></textarea>
                                    <div class="d-flex justify-content-between mt-2">
                                        <small class="text-muted">
                                            Tamaño codificado: <span id="tamanoBase64">0 bytes</span>
                                        </small>
                                        <div>
                                            <button id="copiarResultadoArchivo" class="btn btn-sm btn-success me-2" disabled>
                                                <i class="bi bi-clipboard me-1"></i>Copiar
                                            </button>
                                            <button id="limpiarArchivo" class="btn btn-sm btn-outline-secondary">
                                                <i class="bi bi-arrow-clockwise me-1"></i>Limpiar Todo
                                            </button>
                                        </div>
                                    </div>
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
                                <i class="bi bi-info-circle me-2"></i>Información sobre Base64
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>¿Qué es Base64?</h6>
                                    <p class="text-muted">
                                        Base64 es un esquema de codificación que convierte datos binarios en texto ASCII 
                                        usando solo 64 caracteres (A-Z, a-z, 0-9, +, /).
                                    </p>
                                    <h6>Casos de uso comunes:</h6>
                                    <ul class="list-unstyled">
                                        <li><i class="bi bi-check-circle text-success me-2"></i>Incrustación de imágenes en HTML/CSS</li>
                                        <li><i class="bi bi-check-circle text-success me-2"></i>Envío de archivos por email</li>
                                        <li><i class="bi bi-check-circle text-success me-2"></i>Almacenamiento en bases de datos</li>
                                        <li><i class="bi bi-check-circle text-success me-2"></i>APIs REST y JSON</li>
                                    </ul>
                                </div>
                                <div class="col-lg-6">
                                    <h6>Características importantes:</h6>
                                    <ul class="list-unstyled">
                                        <li><i class="bi bi-info-circle text-info me-2"></i>Aumenta tamaño ~33%</li>
                                        <li><i class="bi bi-info-circle text-info me-2"></i>Solo caracteres ASCII</li>
                                        <li><i class="bi bi-info-circle text-info me-2"></i>Reversible sin pérdida</li>
                                        <li><i class="bi bi-info-circle text-info me-2"></i>Seguro para texto/URL</li>
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
        
        document.getElementById('textoInput').addEventListener('input', (e) => {
            this.actualizarContadores(e.target.value, 'texto');
        });

        document.getElementById('codificarTexto').addEventListener('click', () => {
            this.codificarTextoABase64();
        });

        document.getElementById('copiarBase64Salida').addEventListener('click', () => {
            this.copiarAlPortapapeles(document.getElementById('base64Salida').value);
        });

        document.getElementById('base64Input').addEventListener('input', (e) => {
            this.validarBase64(e.target.value);
        });

        document.getElementById('decodificarTexto').addEventListener('click', () => {
            this.decodificarBase64ATexto();
        });

        document.getElementById('copiarTextoSalida').addEventListener('click', () => {
            this.copiarAlPortapapeles(document.getElementById('textoSalida').value);
        });

        document.getElementById('archivoInput').addEventListener('change', (e) => {
            this.manejarSeleccionArchivo(e);
        });

        document.getElementById('convertirArchivo').addEventListener('click', () => {
            this.convertirArchivoABase64();
        });

        document.getElementById('copiarResultadoArchivo').addEventListener('click', () => {
            this.copiarAlPortapapeles(document.getElementById('resultadoArchivo').value);
        });

        document.getElementById('limpiarArchivo').addEventListener('click', () => {
            this.limpiarArchivo();
        });
    }

    configurarFavoritos() {
        const boton = document.getElementById('botonFavoritos');
        const icono = document.getElementById('iconoFavoritos');
        const texto = document.getElementById('textoFavoritos');
        
        if (!boton || !icono || !texto) return;
        
        const esFavorito = localStorage.getItem('favoritos') ? 
            JSON.parse(localStorage.getItem('favoritos')).some(fav => fav.id === 'base64-conversor') : false;
        
        if (esFavorito) {
            icono.className = 'bi bi-star-fill me-1';
            texto.textContent = 'En Favoritos';
        } else {
            icono.className = 'bi bi-star me-1';
            texto.textContent = 'Agregar a Favoritos';
        }
        
        boton.addEventListener('click', () => {
            if (window.utils && window.utils.gestorFavoritos) {
                window.utils.gestorFavoritos.alternar('base64-conversor', 'Conversor Base64', 'bi-code-square');
                setTimeout(() => this.configurarFavoritos(), 100);
            }
        });
    }

    codificarTextoABase64() {
        const texto = document.getElementById('textoInput').value;
        
        if (!texto.trim()) {
            this.mostrarNotificacion('Por favor ingresa algún texto para codificar', 'warning');
            return;
        }

        try {
            const base64 = btoa(unescape(encodeURIComponent(texto)));
            document.getElementById('base64Salida').value = base64;
            document.getElementById('copiarBase64Salida').disabled = false;
            
            this.actualizarContadoresBase64Salida(base64, texto);
            
            this.mostrarNotificacion('Texto codificado exitosamente', 'success');
        } catch (error) {
            this.mostrarNotificacion('Error al codificar el texto', 'error');
            console.error('Error de codificación:', error);
        }
    }

    decodificarBase64ATexto() {
        const base64 = document.getElementById('base64Input').value.trim();
        
        if (!base64) {
            this.mostrarNotificacion('Por favor ingresa código Base64 para decodificar', 'warning');
            return;
        }

        try {
            const texto = decodeURIComponent(escape(atob(base64)));
            document.getElementById('textoSalida').value = texto;
            document.getElementById('copiarTextoSalida').disabled = false;
            
            this.actualizarContadores(texto, 'textoSalida');
            
            this.mostrarNotificacion('Base64 decodificado exitosamente', 'success');
        } catch (error) {
            this.mostrarNotificacion('Error: El código Base64 no es válido', 'error');
            console.error('Error de decodificación:', error);
        }
    }

    manejarSeleccionArchivo(event) {
        const archivo = event.target.files[0];
        
        if (!archivo) {
            document.getElementById('infoArchivo').classList.add('d-none');
            document.getElementById('convertirArchivo').disabled = true;
            return;
        }

        document.getElementById('nombreArchivo').textContent = archivo.name;
        document.getElementById('tamanoArchivo').textContent = this.formatearTamano(archivo.size);
        document.getElementById('tipoArchivo').textContent = archivo.type || 'Desconocido';
        document.getElementById('fechaModificacion').textContent = new Date(archivo.lastModified).toLocaleString();
        
        document.getElementById('infoArchivo').classList.remove('d-none');
        document.getElementById('convertirArchivo').disabled = false;
    }

    convertirArchivoABase64() {
        const archivoInput = document.getElementById('archivoInput');
        const archivo = archivoInput.files[0];
        
        if (!archivo) {
            this.mostrarNotificacion('Por favor selecciona un archivo', 'warning');
            return;
        }

        if (archivo.size > 10 * 1024 * 1024) {
            this.mostrarNotificacion('El archivo es muy grande (máximo 10MB)', 'warning');
            return;
        }

        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const base64 = e.target.result.split(',')[1]; 
                document.getElementById('resultadoArchivo').value = base64;
                document.getElementById('copiarResultadoArchivo').disabled = false;
                document.getElementById('tamanoBase64').textContent = this.formatearTamano(base64.length);
                
                this.mostrarNotificacion('Archivo convertido a Base64 exitosamente', 'success');
            } catch (error) {
                this.mostrarNotificacion('Error al convertir el archivo', 'error');
                console.error('Error de conversión:', error);
            }
        };

        reader.onerror = () => {
            this.mostrarNotificacion('Error al leer el archivo', 'error');
        };

        reader.readAsDataURL(archivo);
    }

    actualizarContadores(texto, tipo) {
        const caracteres = texto.length;
        const bytes = new Blob([texto]).size;
        
        if (tipo === 'texto') {
            document.getElementById('contadorTexto').textContent = caracteres;
            document.getElementById('contadorBytesTexto').textContent = bytes;
        } else if (tipo === 'textoSalida') {
            document.getElementById('contadorTextoSalida').textContent = caracteres;
            document.getElementById('contadorBytesTextoSalida').textContent = bytes;
        }
    }

    actualizarContadoresBase64Salida(base64, textoOriginal) {
        document.getElementById('contadorBase64Salida').textContent = base64.length;
        
        const expansion = textoOriginal.length > 0 ? 
            Math.round((base64.length / textoOriginal.length - 1) * 100) : 0;
        document.getElementById('expansionPorcentaje').textContent = expansion + '%';
    }

    validarBase64(base64) {
        const contador = document.getElementById('contadorBase64Input');
        const estado = document.getElementById('estadoValidacion');
        
        contador.textContent = base64.length;
        
        if (base64.length === 0) {
            estado.className = 'badge bg-secondary';
            estado.textContent = 'En espera';
            return;
        }

        const regex = /^[A-Za-z0-9+/]*={0,2}$/;
        const esValido = regex.test(base64) && base64.length % 4 === 0;
        
        if (esValido) {
            estado.className = 'badge bg-success';
            estado.textContent = 'Base64 válido';
        } else {
            estado.className = 'badge bg-danger';
            estado.textContent = 'Formato inválido';
        }
    }

    limpiarDecodificacion() {
        document.getElementById('base64Input').value = '';
        document.getElementById('textoSalida').value = '';
        document.getElementById('estadoValidacion').className = 'badge bg-secondary';
        document.getElementById('estadoValidacion').textContent = 'En espera';
        document.getElementById('contadorBase64Input').textContent = '0';
        document.getElementById('contadorTextoSalida').textContent = '0';
        document.getElementById('contadorBytesTextoSalida').textContent = '0';
        document.getElementById('copiarTextoSalida').disabled = true;
    }

    limpiarArchivo() {
        document.getElementById('archivoInput').value = '';
        document.getElementById('resultadoArchivo').value = '';
        document.getElementById('infoArchivo').classList.add('d-none');
        document.getElementById('convertirArchivo').disabled = true;
        document.getElementById('copiarResultadoArchivo').disabled = true;
        document.getElementById('tamanoBase64').textContent = '0 bytes';
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

window.base64Conversor = new Base64Conversor();