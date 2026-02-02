class CompresorImagenes {
    constructor() {
        this.imagenOriginal = null;
        this.imagenComprimida = null;
        this.canvas = null;
        this.ctx = null;
    }

    render() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-images text-primary me-2"></i>Compresor de Imágenes</h2>
                            <p class="text-muted mb-0">Reduce el tamaño de imágenes JPG, PNG y WebP manteniendo la calidad</p>
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
                                <i class="bi bi-upload me-2"></i>Seleccionar Imagen
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="mb-3">
                                        <label for="imagenInput" class="form-label fw-bold">Selecciona una imagen:</label>
                                        <input type="file" id="imagenInput" class="form-control" 
                                               accept="image/jpeg,image/png,image/webp,image/jpg">
                                        <div class="form-text">
                                            Formatos soportados: JPG, PNG, WebP | Tamaño máximo: 10MB
                                        </div>
                                    </div>
                                    
                                    <div id="infoImagen" class="d-none">
                                        <h6>Información de la imagen:</h6>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <ul class="list-unstyled">
                                                    <li><strong>Nombre:</strong> <span id="nombreArchivo">-</span></li>
                                                    <li><strong>Formato:</strong> <span id="formatoArchivo">-</span></li>
                                                    <li><strong>Tamaño original:</strong> <span id="tamanoOriginal">-</span></li>
                                                </ul>
                                            </div>
                                            <div class="col-md-6">
                                                <ul class="list-unstyled">
                                                    <li><strong>Dimensiones:</strong> <span id="dimensiones">-</span></li>
                                                    <li><strong>Relación de aspecto:</strong> <span id="aspectRatio">-</span></li>
                                                    <li><strong>DPI estimado:</strong> <span id="dpiEstimado">-</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="border rounded p-3 text-center bg-light" id="dropZone" 
                                         style="min-height: 150px; cursor: pointer;">
                                        <i class="bi bi-cloud-upload fs-1 text-muted"></i>
                                        <p class="text-muted mb-0">Arrastra una imagen aquí<br>o haz clic para seleccionar</p>
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
                                <i class="bi bi-sliders me-2"></i>Configuración de Compresión
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="calidadRange" class="form-label fw-bold">
                                            Calidad: <span id="calidadValor">80</span>%
                                        </label>
                                        <input type="range" id="calidadRange" class="form-range" 
                                               min="1" max="100" value="80">
                                        <div class="d-flex justify-content-between">
                                            <small class="text-muted">Mínima</small>
                                            <small class="text-muted">Máxima</small>
                                        </div>
                                    </div>

                                    <div class="mb-3">
                                        <label for="formatoSalida" class="form-label fw-bold">Formato de salida:</label>
                                        <select id="formatoSalida" class="form-select">
                                            <option value="jpeg">JPEG (mejor compresión)</option>
                                            <option value="png">PNG (con transparencia)</option>
                                            <option value="webp">WebP (moderno, mejor calidad)</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="redimensionar">
                                            <label class="form-check-label fw-bold" for="redimensionar">
                                                Redimensionar imagen
                                            </label>
                                        </div>
                                        
                                        <div id="opcionesRedimension" class="mt-2" style="display: none;">
                                            <div class="row">
                                                <div class="col-6">
                                                    <label class="form-label">Ancho (px)</label>
                                                    <input type="number" id="nuevoAncho" class="form-control" placeholder="Auto">
                                                </div>
                                                <div class="col-6">
                                                    <label class="form-label">Alto (px)</label>
                                                    <input type="number" id="nuevoAlto" class="form-control" placeholder="Auto">
                                                </div>
                                            </div>
                                            <div class="form-check mt-2">
                                                <input class="form-check-input" type="checkbox" id="mantenerAspecto" checked>
                                                <label class="form-check-label" for="mantenerAspecto">
                                                    Mantener relación de aspecto
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-grid">
                                        <button id="comprimirImagen" class="btn btn-success" disabled>
                                            <i class="bi bi-compress me-2"></i>Comprimir Imagen
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
                                <i class="bi bi-eye me-2"></i>Comparación de Resultados
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6 class="text-center mb-3">
                                        <span class="badge bg-secondary">Original</span>
                                    </h6>
                                    <div class="border rounded p-2 bg-light text-center" style="min-height: 300px;">
                                        <img id="imagenOriginalPreview" class="img-fluid" style="max-height: 280px; display: none;">
                                        <div id="placeholderOriginal" class="d-flex align-items-center justify-content-center h-100">
                                            <div class="text-muted">
                                                <i class="bi bi-image fs-1 d-block mb-2"></i>
                                                <p>Imagen original aparecerá aquí</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center mt-2">
                                        <small class="text-muted">
                                            Tamaño: <span id="tamanoOriginalBytes">-</span>
                                        </small>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <h6 class="text-center mb-3">
                                        <span class="badge bg-success">Comprimida</span>
                                        <span id="porcentajeReduccion" class="badge bg-warning text-dark ms-2" style="display: none;">
                                            -50%
                                        </span>
                                    </h6>
                                    <div class="border rounded p-2 bg-light text-center" style="min-height: 300px;">
                                        <img id="imagenComprimidaPreview" class="img-fluid" style="max-height: 280px; display: none;">
                                        <div id="placeholderComprimida" class="d-flex align-items-center justify-content-center h-100">
                                            <div class="text-muted">
                                                <i class="bi bi-image fs-1 d-block mb-2"></i>
                                                <p>Imagen comprimida aparecerá aquí</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center mt-2">
                                        <small class="text-muted">
                                            Tamaño: <span id="tamanoComprimidoBytes">-</span>
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-12">
                                    <div class="d-flex justify-content-center gap-3">
                                        <button id="descargarComprimida" class="btn btn-primary" disabled>
                                            <i class="bi bi-download me-2"></i>Descargar Comprimida
                                        </button>
                                        <button id="nuevaImagen" class="btn btn-outline-secondary">
                                            <i class="bi bi-arrow-clockwise me-2"></i>Nueva Imagen
                                        </button>
                                        <button id="ajustarConfiguracion" class="btn btn-outline-info" disabled>
                                            <i class="bi bi-gear me-2"></i>Ajustar Configuración
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="panelEstadisticas" class="row mb-4" style="display: none;">
                <div class="col-12">
                    <div class="card herramienta-card border-success">
                        <div class="card-header bg-success text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-graph-up me-2"></i>Estadísticas de Compresión
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="text-center">
                                        <h4 class="text-primary" id="reduccionTamano">0%</h4>
                                        <small class="text-muted">Reducción de tamaño</small>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="text-center">
                                        <h4 class="text-success" id="espacioAhorrado">0 KB</h4>
                                        <small class="text-muted">Espacio ahorrado</small>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="text-center">
                                        <h4 class="text-info" id="nuevasDimensiones">-</h4>
                                        <small class="text-muted">Dimensiones finales</small>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="text-center">
                                        <h4 class="text-warning" id="formatoFinal">-</h4>
                                        <small class="text-muted">Formato final</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card herramienta-card border-warning">
                        <div class="card-header bg-warning text-dark">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-info-circle me-2"></i>Guía de Compresión de Imágenes
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>Formatos recomendados:</h6>
                                    <ul class="list-unstyled">
                                        <li><span class="badge bg-primary me-2">JPEG</span>Fotos, imágenes con muchos colores</li>
                                        <li><span class="badge bg-success me-2">PNG</span>Imágenes con transparencia, logos</li>
                                        <li><span class="badge bg-info me-2">WebP</span>Moderno, mejor compresión y calidad</li>
                                    </ul>
                                    
                                    <h6>Niveles de calidad:</h6>
                                    <ul class="list-unstyled">
                                        <li><strong>90-100%:</strong> Máxima calidad, archivos grandes</li>
                                        <li><strong>70-90%:</strong> Excelente calidad, buen balance</li>
                                        <li><strong>50-70%:</strong> Buena calidad, archivos medianos</li>
                                        <li><strong>30-50%:</strong> Calidad aceptable, archivos pequeños</li>
                                    </ul>
                                </div>
                                <div class="col-lg-6">
                                    <h6>Consejos de optimización:</h6>
                                    <ul class="list-unstyled">
                                        <li><i class="bi bi-lightbulb text-warning me-1"></i>Usa WebP para web moderna</li>
                                        <li><i class="bi bi-lightbulb text-warning me-1"></i>JPEG para fotografías</li>
                                        <li><i class="bi bi-lightbulb text-warning me-1"></i>PNG solo si necesitas transparencia</li>
                                        <li><i class="bi bi-lightbulb text-warning me-1"></i>Redimensiona antes de comprimir</li>
                                        <li><i class="bi bi-lightbulb text-warning me-1"></i>Prueba diferentes niveles de calidad</li>
                                    </ul>
                                    
                                    <div class="alert alert-info">
                                        <i class="bi bi-info-circle me-1"></i>
                                        <strong>Tip:</strong> Esta herramienta procesa las imágenes localmente en tu navegador, 
                                        manteniendo tu privacidad.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.configurarEventos();
        this.inicializarCanvas();
    }

    inicializarCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    configurarEventos() {
        this.configurarFavoritos();

        document.getElementById('imagenInput').addEventListener('change', (e) => {
            this.manejarSeleccionImagen(e);
        });
        const dropZone = document.getElementById('dropZone');
        dropZone.addEventListener('click', () => {
            document.getElementById('imagenInput').click();
        });

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('bg-primary', 'text-white');
        });

        dropZone.addEventListener('dragleave', (e) => {
            e.preventDefault();
            dropZone.classList.remove('bg-primary', 'text-white');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('bg-primary', 'text-white');
            
            const archivos = e.dataTransfer.files;
            if (archivos.length > 0) {
                this.procesarArchivo(archivos[0]);
            }
        });

        document.getElementById('calidadRange').addEventListener('input', (e) => {
            document.getElementById('calidadValor').textContent = e.target.value;
        });

        document.getElementById('redimensionar').addEventListener('change', (e) => {
            document.getElementById('opcionesRedimension').style.display = 
                e.target.checked ? 'block' : 'none';
        });

        document.getElementById('nuevoAncho').addEventListener('input', (e) => {
            if (document.getElementById('mantenerAspecto').checked && this.imagenOriginal) {
                this.calcularAltoProporcionado(e.target.value);
            }
        });

        document.getElementById('nuevoAlto').addEventListener('input', (e) => {
            if (document.getElementById('mantenerAspecto').checked && this.imagenOriginal) {
                this.calcularAnchoProporcionado(e.target.value);
            }
        });

        document.getElementById('comprimirImagen').addEventListener('click', () => {
            this.comprimirImagen();
        });

        document.getElementById('descargarComprimida').addEventListener('click', () => {
            this.descargarImagen();
        });

        document.getElementById('nuevaImagen').addEventListener('click', () => {
            this.limpiarTodo();
        });

        document.getElementById('ajustarConfiguracion').addEventListener('click', () => {
            this.volverAConfiguracion();
        });
    }

    configurarFavoritos() {
        const boton = document.getElementById('botonFavoritos');
        const icono = document.getElementById('iconoFavoritos');
        const texto = document.getElementById('textoFavoritos');
        
        if (!boton || !icono || !texto) return;
        
        const esFavorito = localStorage.getItem('favoritos') ? 
            JSON.parse(localStorage.getItem('favoritos')).some(fav => fav.id === 'compresor-imagenes') : false;
        
        if (esFavorito) {
            icono.className = 'bi bi-star-fill me-1';
            texto.textContent = 'En Favoritos';
        } else {
            icono.className = 'bi bi-star me-1';
            texto.textContent = 'Agregar a Favoritos';
        }
        
        boton.addEventListener('click', () => {
            if (window.utils && window.utils.gestorFavoritos) {
                window.utils.gestorFavoritos.alternar('compresor-imagenes', 'Compresor de Imágenes', 'bi-images');
                setTimeout(() => this.configurarFavoritos(), 100);
            }
        });
    }

    manejarSeleccionImagen(event) {
        const archivo = event.target.files[0];
        if (archivo) {
            this.procesarArchivo(archivo);
        }
    }

    procesarArchivo(archivo) {
        if (!this.validarTipoArchivo(archivo)) {
            this.mostrarNotificacion('Formato de archivo no soportado. Use JPG, PNG o WebP.', 'error');
            return;
        }

        if (archivo.size > 10 * 1024 * 1024) {
            this.mostrarNotificacion('El archivo es demasiado grande. Máximo 10MB.', 'error');
            return;
        }

        const reader = new FileReader();
        
        reader.onload = (e) => {
            this.cargarImagen(e.target.result, archivo);
        };

        reader.onerror = () => {
            this.mostrarNotificacion('Error al leer el archivo', 'error');
        };

        reader.readAsDataURL(archivo);
    }

    validarTipoArchivo(archivo) {
        const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        return tiposPermitidos.includes(archivo.type);
    }

    cargarImagen(src, archivo) {
        const img = new Image();
        
        img.onload = () => {
            this.imagenOriginal = {
                elemento: img,
                archivo: archivo,
                ancho: img.width,
                alto: img.height,
                tamano: archivo.size,
                formato: archivo.type
            };

            this.mostrarInformacionImagen();
            this.mostrarVistaPrevia();
            this.habilitarControles();
            
            this.mostrarNotificacion('Imagen cargada correctamente', 'success');
        };

        img.onerror = () => {
            this.mostrarNotificacion('Error al cargar la imagen', 'error');
        };

        img.src = src;
    }

    mostrarInformacionImagen() {
        const img = this.imagenOriginal;
        
        document.getElementById('nombreArchivo').textContent = img.archivo.name;
        document.getElementById('formatoArchivo').textContent = this.obtenerNombreFormato(img.formato);
        document.getElementById('tamanoOriginal').textContent = this.formatearTamano(img.tamano);
        document.getElementById('dimensiones').textContent = `${img.ancho} × ${img.alto}`;
        document.getElementById('aspectRatio').textContent = this.calcularAspectRatio(img.ancho, img.alto);
        document.getElementById('dpiEstimado').textContent = this.estimarDPI(img.ancho, img.alto);
        
        document.getElementById('infoImagen').classList.remove('d-none');
        
        document.getElementById('nuevoAncho').placeholder = img.ancho;
        document.getElementById('nuevoAlto').placeholder = img.alto;
    }

    mostrarVistaPrevia() {
        const preview = document.getElementById('imagenOriginalPreview');
        const placeholder = document.getElementById('placeholderOriginal');
        
        preview.src = this.imagenOriginal.elemento.src;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
        
        document.getElementById('tamanoOriginalBytes').textContent = this.formatearTamano(this.imagenOriginal.tamano);
    }

    habilitarControles() {
        document.getElementById('comprimirImagen').disabled = false;
    }

    comprimirImagen() {
        if (!this.imagenOriginal) {
            this.mostrarNotificacion('No hay imagen cargada', 'warning');
            return;
        }

        const calidad = parseInt(document.getElementById('calidadRange').value) / 100;
        const formato = document.getElementById('formatoSalida').value;
        const redimensionar = document.getElementById('redimensionar').checked;

        let ancho = this.imagenOriginal.ancho;
        let alto = this.imagenOriginal.alto;

        if (redimensionar) {
            const nuevoAncho = document.getElementById('nuevoAncho').value;
            const nuevoAlto = document.getElementById('nuevoAlto').value;
            
            if (nuevoAncho) ancho = parseInt(nuevoAncho);
            if (nuevoAlto) alto = parseInt(nuevoAlto);
        }

        this.realizarCompresion(ancho, alto, calidad, formato);
    }

    realizarCompresion(ancho, alto, calidad, formato) {
        this.canvas.width = ancho;
        this.canvas.height = alto;

        this.ctx.drawImage(this.imagenOriginal.elemento, 0, 0, ancho, alto);

        const tipoMime = `image/${formato}`;
        const dataURL = this.canvas.toDataURL(tipoMime, calidad);
        
        this.canvas.toBlob((blob) => {
            this.imagenComprimida = {
                dataURL: dataURL,
                blob: blob,
                ancho: ancho,
                alto: alto,
                formato: formato,
                calidad: calidad,
                tamano: blob.size
            };

            this.mostrarResultadoCompresion();
            this.mostrarEstadisticas();
            
        }, tipoMime, calidad);
    }

    mostrarResultadoCompresion() {
        const preview = document.getElementById('imagenComprimidaPreview');
        const placeholder = document.getElementById('placeholderComprimida');
        
        preview.src = this.imagenComprimida.dataURL;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
        
        document.getElementById('tamanoComprimidoBytes').textContent = 
            this.formatearTamano(this.imagenComprimida.tamano);

        const reduccion = ((this.imagenOriginal.tamano - this.imagenComprimida.tamano) / this.imagenOriginal.tamano) * 100;
        const badgeReduccion = document.getElementById('porcentajeReduccion');
        badgeReduccion.textContent = `${reduccion > 0 ? '-' : '+'}${Math.abs(reduccion).toFixed(1)}%`;
        badgeReduccion.style.display = 'inline';
        badgeReduccion.className = `badge ms-2 ${reduccion > 0 ? 'bg-success' : 'bg-danger'}`;

        document.getElementById('descargarComprimida').disabled = false;
        document.getElementById('ajustarConfiguracion').disabled = false;
    }

    mostrarEstadisticas() {
        const original = this.imagenOriginal.tamano;
        const comprimido = this.imagenComprimida.tamano;
        const reduccion = ((original - comprimido) / original) * 100;
        const ahorrado = original - comprimido;

        document.getElementById('reduccionTamano').textContent = `${reduccion.toFixed(1)}%`;
        document.getElementById('espacioAhorrado').textContent = this.formatearTamano(ahorrado);
        document.getElementById('nuevasDimensiones').textContent = 
            `${this.imagenComprimida.ancho} × ${this.imagenComprimida.alto}`;
        document.getElementById('formatoFinal').textContent = 
            this.obtenerNombreFormato(`image/${this.imagenComprimida.formato}`).toUpperCase();

        document.getElementById('panelEstadisticas').style.display = 'block';
    }

    descargarImagen() {
        if (!this.imagenComprimida) {
            this.mostrarNotificacion('No hay imagen comprimida para descargar', 'warning');
            return;
        }

        const enlace = document.createElement('a');
        const nombreBase = this.imagenOriginal.archivo.name.split('.')[0];
        const extension = this.imagenComprimida.formato === 'jpeg' ? 'jpg' : this.imagenComprimida.formato;
        
        enlace.href = this.imagenComprimida.dataURL;
        enlace.download = `${nombreBase}_comprimida.${extension}`;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);

        this.mostrarNotificacion('Imagen descargada correctamente', 'success');
    }

    volverAConfiguracion() {
        const preview = document.getElementById('imagenComprimidaPreview');
        const placeholder = document.getElementById('placeholderComprimida');
        
        preview.style.display = 'none';
        placeholder.style.display = 'flex';
        
        document.getElementById('tamanoComprimidoBytes').textContent = '-';
        document.getElementById('porcentajeReduccion').style.display = 'none';
        document.getElementById('panelEstadisticas').style.display = 'none';
        
        document.getElementById('descargarComprimida').disabled = true;
        document.getElementById('ajustarConfiguracion').disabled = true;
        
        this.imagenComprimida = null;
    }

    limpiarTodo() {
        this.imagenOriginal = null;
        this.imagenComprimida = null;
        
        document.getElementById('imagenOriginalPreview').style.display = 'none';
        document.getElementById('imagenComprimidaPreview').style.display = 'none';
        document.getElementById('placeholderOriginal').style.display = 'flex';
        document.getElementById('placeholderComprimida').style.display = 'flex';
        
        document.getElementById('infoImagen').classList.add('d-none');
        document.getElementById('panelEstadisticas').style.display = 'none';

        document.getElementById('imagenInput').value = '';
        document.getElementById('calidadRange').value = '80';
        document.getElementById('calidadValor').textContent = '80';
        document.getElementById('formatoSalida').value = 'jpeg';
        document.getElementById('redimensionar').checked = false;
        document.getElementById('opcionesRedimension').style.display = 'none';
        document.getElementById('nuevoAncho').value = '';
        document.getElementById('nuevoAlto').value = '';
        
        document.getElementById('comprimirImagen').disabled = true;
        document.getElementById('descargarComprimida').disabled = true;
        document.getElementById('ajustarConfiguracion').disabled = true;
        
        document.getElementById('tamanoOriginalBytes').textContent = '-';
        document.getElementById('tamanoComprimidoBytes').textContent = '-';
        document.getElementById('porcentajeReduccion').style.display = 'none';
    }

    calcularAltoProporcionado(ancho) {
        if (this.imagenOriginal && ancho) {
            const ratio = this.imagenOriginal.alto / this.imagenOriginal.ancho;
            const alto = Math.round(parseInt(ancho) * ratio);
            document.getElementById('nuevoAlto').value = alto;
        }
    }

    calcularAnchoProporcionado(alto) {
        if (this.imagenOriginal && alto) {
            const ratio = this.imagenOriginal.ancho / this.imagenOriginal.alto;
            const ancho = Math.round(parseInt(alto) * ratio);
            document.getElementById('nuevoAncho').value = ancho;
        }
    }

    calcularAspectRatio(ancho, alto) {
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(ancho, alto);
        return `${ancho / divisor}:${alto / divisor}`;
    }

    estimarDPI(ancho, alto) {
        if (ancho >= 3000 || alto >= 3000) return '~300 DPI';
        if (ancho >= 1200 || alto >= 1200) return '~150 DPI';
        return '~72 DPI';
    }

    obtenerNombreFormato(tipoMime) {
        const formatos = {
            'image/jpeg': 'JPEG',
            'image/jpg': 'JPG',
            'image/png': 'PNG',
            'image/webp': 'WebP'
        };
        return formatos[tipoMime] || 'Desconocido';
    }

    formatearTamano(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const tamaños = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + tamaños[i];
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

window.compresorImagenes = new CompresorImagenes();