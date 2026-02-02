class ConversorImagenes {
    constructor() {
        this.imagenOriginal = null;
        this.imagenConvertida = null;
        this.canvas = null;
        this.ctx = null;
        this.soporteAVIF = null;
    }

    render() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-arrow-left-right text-primary me-2"></i>Conversor de Imágenes</h2>
                            <p class="text-muted mb-0">Convierte entre PNG, JPG, WebP y AVIF con opciones avanzadas</p>
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
                                <i class="bi bi-upload me-2"></i>Imagen de Origen
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="mb-3">
                                        <label for="imagenInput" class="form-label fw-bold">Selecciona una imagen:</label>
                                        <input type="file" id="imagenInput" class="form-control" 
                                               accept="image/jpeg,image/jpg,image/png,image/webp,image/avif">
                                        <div class="form-text">
                                            Formatos soportados: JPG, PNG, WebP, AVIF | Tamaño máximo: 15MB
                                        </div>
                                    </div>
                                    
                                    <div id="infoImagenOriginal" class="d-none">
                                        <h6>Información de la imagen:</h6>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <ul class="list-unstyled">
                                                    <li><strong>Nombre:</strong> <span id="nombreOriginal">-</span></li>
                                                    <li><strong>Formato actual:</strong> <span id="formatoOriginal">-</span></li>
                                                    <li><strong>Tamaño:</strong> <span id="tamanoOriginal">-</span></li>
                                                </ul>
                                            </div>
                                            <div class="col-md-6">
                                                <ul class="list-unstyled">
                                                    <li><strong>Dimensiones:</strong> <span id="dimensionesOriginal">-</span></li>
                                                    <li><strong>Profundidad:</strong> <span id="profundidadColor">-</span></li>
                                                    <li><strong>Tiene transparencia:</strong> <span id="tieneTransparencia">-</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="border rounded p-3 text-center bg-light" id="dropZoneConversion" 
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
                                <i class="bi bi-gear-wide-connected me-2"></i>Configuración de Conversión
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <label for="formatoDestino" class="form-label fw-bold">Formato de destino:</label>
                                        <select id="formatoDestino" class="form-select">
                                            <option value="jpeg">JPEG (.jpg) - Compatible universalmente</option>
                                            <option value="png">PNG (.png) - Con transparencia</option>
                                            <option value="webp">WebP (.webp) - Moderno, mejor compresión</option>
                                            <option value="avif" id="opcionAVIF">AVIF (.avif) - Última generación</option>
                                        </select>
                                        <div class="form-text">
                                            <span id="descripcionFormato">Selecciona un formato para ver su descripción</span>
                                        </div>
                                    </div>

                                    <div id="configuracionCalidad" class="mb-3">
                                        <label for="calidadConversion" class="form-label fw-bold">
                                            Calidad: <span id="calidadValorConversion">90</span>%
                                        </label>
                                        <input type="range" id="calidadConversion" class="form-range" 
                                               min="1" max="100" value="90">
                                        <div class="d-flex justify-content-between">
                                            <small class="text-muted">Menor tamaño</small>
                                            <small class="text-muted">Mayor calidad</small>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="mb-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="mantenerTransparencia" checked>
                                            <label class="form-check-label fw-bold" for="mantenerTransparencia">
                                                Mantener transparencia (PNG/WebP/AVIF)
                                            </label>
                                        </div>
                                        <div class="form-text">Solo aplica si el formato de destino soporta transparencia</div>
                                    </div>

                                    <div class="mb-3">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" id="optimizarTamano">
                                            <label class="form-check-label fw-bold" for="optimizarTamano">
                                                Optimización agresiva de tamaño
                                            </label>
                                        </div>
                                        <div class="form-text">Reduce más el tamaño, puede afectar ligeramente la calidad</div>
                                    </div>

                                    <div class="d-grid">
                                        <button id="convertirImagen" class="btn btn-success btn-lg" disabled>
                                            <i class="bi bi-arrow-right-circle me-2"></i>Convertir Imagen
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
                                <i class="bi bi-eye-fill me-2"></i>Comparación de Formatos
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6 class="text-center mb-3">
                                        <span class="badge bg-secondary">Original</span>
                                        <span id="formatoOriginalBadge" class="badge bg-primary ms-2">-</span>
                                    </h6>
                                    <div class="border rounded p-2 bg-light text-center" style="min-height: 300px;">
                                        <img id="imagenOriginalPreview" class="img-fluid" style="max-height: 280px; display: none;">
                                        <div id="placeholderOriginalConversion" class="d-flex align-items-center justify-content-center h-100">
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
                                        <span class="badge bg-success">Convertida</span>
                                        <span id="formatoConvertidoBadge" class="badge bg-warning text-dark ms-2">-</span>
                                        <span id="diferenciaFormato" class="badge bg-info ms-2" style="display: none;">
                                            Cambio: 0%
                                        </span>
                                    </h6>
                                    <div class="border rounded p-2 bg-light text-center" style="min-height: 300px;">
                                        <img id="imagenConvertidaPreview" class="img-fluid" style="max-height: 280px; display: none;">
                                        <div id="placeholderConvertida" class="d-flex align-items-center justify-content-center h-100">
                                            <div class="text-muted">
                                                <i class="bi bi-image fs-1 d-block mb-2"></i>
                                                <p>Imagen convertida aparecerá aquí</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-center mt-2">
                                        <small class="text-muted">
                                            Tamaño: <span id="tamanoConvertidoBytes">-</span>
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-12">
                                    <div class="d-flex justify-content-center gap-3 flex-wrap">
                                        <button id="descargarConvertida" class="btn btn-primary" disabled>
                                            <i class="bi bi-download me-2"></i>Descargar Convertida
                                        </button>
                                        <button id="nuevaConversion" class="btn btn-outline-secondary">
                                            <i class="bi bi-arrow-clockwise me-2"></i>Nueva Conversión
                                        </button>
                                        <button id="convertirOtroFormato" class="btn btn-outline-info" disabled>
                                            <i class="bi bi-arrow-repeat me-2"></i>Probar Otro Formato
                                        </button>
                                        <button id="compararCalidades" class="btn btn-outline-warning" disabled>
                                            <i class="bi bi-speedometer me-2"></i>Comparar Calidades
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="panelAnalisis" class="row mb-4" style="display: none;">
                <div class="col-12">
                    <div class="card herramienta-card border-success">
                        <div class="card-header bg-success text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-bar-chart me-2"></i>Análisis de Conversión
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-3">
                                    <div class="text-center">
                                        <h4 class="text-primary" id="cambioTamano">0%</h4>
                                        <small class="text-muted">Cambio de tamaño</small>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="text-center">
                                        <h4 class="text-success" id="espacioDiferencia">0 KB</h4>
                                        <small class="text-muted">Diferencia</small>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="text-center">
                                        <h4 class="text-info" id="ratioCompresion">1:1</h4>
                                        <small class="text-muted">Ratio de compresión</small>
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    <div class="text-center">
                                        <h4 class="text-warning" id="tiempoConversion">0s</h4>
                                        <small class="text-muted">Tiempo de conversión</small>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row mt-3">
                                <div class="col-12">
                                    <h6>Características del formato:</h6>
                                    <div id="caracteristicasFormato" class="border rounded p-3 bg-light">
                                        <span class="text-muted">Selecciona un formato para ver sus características</span>
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
                                <i class="bi bi-collection me-2"></i>Conversión en Lote
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="mb-3">
                                        <label for="imagenesBatch" class="form-label fw-bold">Seleccionar múltiples imágenes:</label>
                                        <input type="file" id="imagenesBatch" class="form-control" 
                                               accept="image/jpeg,image/jpg,image/png,image/webp,image/avif" multiple>
                                        <div class="form-text">
                                            Puedes seleccionar hasta 10 imágenes para conversión en lote
                                        </div>
                                    </div>
                                    
                                    <div id="listaImagenesBatch" class="d-none">
                                        <h6>Imágenes seleccionadas:</h6>
                                        <div id="contenidoListaBatch" style="max-height: 200px; overflow-y: auto;">

                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="mb-3">
                                        <label for="formatoBatch" class="form-label fw-bold">Formato destino:</label>
                                        <select id="formatoBatch" class="form-select">
                                            <option value="jpeg">JPEG</option>
                                            <option value="png">PNG</option>
                                            <option value="webp">WebP</option>
                                            <option value="avif">AVIF</option>
                                        </select>
                                    </div>
                                    
                                    <div class="d-grid">
                                        <button id="convertirLote" class="btn btn-warning" disabled>
                                            <i class="bi bi-gear-wide-connected me-2"></i>Convertir Lote
                                        </button>
                                        <div class="mt-2">
                                            <div id="progresoBatch" class="progress" style="display: none;">
                                                <div id="barraPropresoBatch" class="progress-bar" role="progressbar" style="width: 0%"></div>
                                            </div>
                                            <small id="estadoBatch" class="text-muted"></small>
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
                                <i class="bi bi-info-circle-fill me-2"></i>Guía de Formatos de Imagen
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>Comparación de formatos:</h6>
                                    <div class="table-responsive">
                                        <table class="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Formato</th>
                                                    <th>Compresión</th>
                                                    <th>Transparencia</th>
                                                    <th>Soporte</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><strong>JPEG</strong></td>
                                                    <td><span class="badge bg-warning">Buena</span></td>
                                                    <td><span class="text-danger">No</span></td>
                                                    <td><span class="badge bg-success">Universal</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>PNG</strong></td>
                                                    <td><span class="badge bg-info">Sin pérdida</span></td>
                                                    <td><span class="text-success">Sí</span></td>
                                                    <td><span class="badge bg-success">Universal</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>WebP</strong></td>
                                                    <td><span class="badge bg-success">Excelente</span></td>
                                                    <td><span class="text-success">Sí</span></td>
                                                    <td><span class="badge bg-warning">Moderno</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>AVIF</strong></td>
                                                    <td><span class="badge bg-success">Óptima</span></td>
                                                    <td><span class="text-success">Sí</span></td>
                                                    <td><span class="badge bg-danger">Limitado</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <h6>Recomendaciones de uso:</h6>
                                    <ul class="list-unstyled">
                                        <li><strong>JPEG:</strong> Ideal para fotografías y imágenes con muchos colores</li>
                                        <li><strong>PNG:</strong> Perfecto para logos, iconos y imágenes con transparencia</li>
                                        <li><strong>WebP:</strong> Equilibrio perfecto entre calidad y tamaño para web</li>
                                        <li><strong>AVIF:</strong> La próxima generación, máxima eficiencia</li>
                                    </ul>
                                    
                                    <div class="alert alert-warning">
                                        <i class="bi bi-exclamation-triangle me-1"></i>
                                        <strong>Nota:</strong> AVIF requiere navegadores muy modernos. 
                                        Verifica la compatibilidad antes de usar en producción.
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
        this.verificarSoporteFormatos();
    }

    inicializarCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    async verificarSoporteFormatos() {
        try {
            this.soporteAVIF = await this.verificarSoporteAVIF();
            
            if (!this.soporteAVIF) {
                const opcionAVIF = document.getElementById('opcionAVIF');
                opcionAVIF.disabled = true;
                opcionAVIF.textContent += ' - No soportado en este navegador';
                opcionAVIF.style.color = '#666';
            }
        } catch (error) {
            console.log('Error verificando soporte AVIF:', error);
            this.soporteAVIF = false;
        }
    }

    verificarSoporteAVIF() {
        return new Promise((resolve) => {
            const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = avifData;
        });
    }

    configurarEventos() {
        this.configurarFavoritos();

        document.getElementById('imagenInput').addEventListener('change', (e) => {
            this.manejarSeleccionImagen(e);
        });

        const dropZone = document.getElementById('dropZoneConversion');
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

        document.getElementById('formatoDestino').addEventListener('change', (e) => {
            this.actualizarDescripcionFormato(e.target.value);
            this.actualizarConfiguracionCalidad(e.target.value);
        });

        document.getElementById('calidadConversion').addEventListener('input', (e) => {
            document.getElementById('calidadValorConversion').textContent = e.target.value;
        });

        document.getElementById('convertirImagen').addEventListener('click', () => {
            this.convertirImagen();
        });

        document.getElementById('descargarConvertida').addEventListener('click', () => {
            this.descargarImagenConvertida();
        });

        document.getElementById('nuevaConversion').addEventListener('click', () => {
            this.limpiarTodo();
        });

        document.getElementById('convertirOtroFormato').addEventListener('click', () => {
            this.volverAConfiguracion();
        });

        document.getElementById('imagenesBatch').addEventListener('change', (e) => {
            this.manejarImagenesLote(e);
        });

        document.getElementById('convertirLote').addEventListener('click', () => {
            this.convertirLoteImagenes();
        });

        this.actualizarDescripcionFormato('jpeg');
    }

    configurarFavoritos() {
        const boton = document.getElementById('botonFavoritos');
        const icono = document.getElementById('iconoFavoritos');
        const texto = document.getElementById('textoFavoritos');
        
        if (!boton || !icono || !texto) return;
        
        const esFavorito = localStorage.getItem('favoritos') ? 
            JSON.parse(localStorage.getItem('favoritos')).some(fav => fav.id === 'conversor-imagenes') : false;
        
        if (esFavorito) {
            icono.className = 'bi bi-star-fill me-1';
            texto.textContent = 'En Favoritos';
        } else {
            icono.className = 'bi bi-star me-1';
            texto.textContent = 'Agregar a Favoritos';
        }
        
        boton.addEventListener('click', () => {
            if (window.utils && window.utils.gestorFavoritos) {
                window.utils.gestorFavoritos.alternar('conversor-imagenes', 'Conversor de Imágenes', 'bi-arrow-left-right');
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
            this.mostrarNotificacion('Formato de archivo no soportado. Use JPG, PNG, WebP o AVIF.', 'error');
            return;
        }

        if (archivo.size > 15 * 1024 * 1024) {
            this.mostrarNotificacion('El archivo es demasiado grande. Máximo 15MB.', 'error');
            return;
        }

        const reader = new FileReader();
        
        reader.onload = (e) => {
            this.cargarImagenOriginal(e.target.result, archivo);
        };

        reader.onerror = () => {
            this.mostrarNotificacion('Error al leer el archivo', 'error');
        };

        reader.readAsDataURL(archivo);
    }

    validarTipoArchivo(archivo) {
        const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
        return tiposPermitidos.includes(archivo.type);
    }

    cargarImagenOriginal(src, archivo) {
        const img = new Image();
        
        img.onload = () => {
            this.imagenOriginal = {
                elemento: img,
                archivo: archivo,
                ancho: img.width,
                alto: img.height,
                tamano: archivo.size,
                formato: archivo.type,
                src: src
            };

            this.mostrarInformacionImagenOriginal();
            this.mostrarVistaPreviaOriginal();
            this.habilitarControles();
            
            this.mostrarNotificacion('Imagen cargada correctamente', 'success');
        };

        img.onerror = () => {
            this.mostrarNotificacion('Error al cargar la imagen', 'error');
        };

        img.src = src;
    }

    mostrarInformacionImagenOriginal() {
        const img = this.imagenOriginal;
        
        document.getElementById('nombreOriginal').textContent = img.archivo.name;
        document.getElementById('formatoOriginal').textContent = this.obtenerNombreFormato(img.formato);
        document.getElementById('tamanoOriginal').textContent = this.formatearTamano(img.tamano);
        document.getElementById('dimensionesOriginal').textContent = `${img.ancho} × ${img.alto}`;
        document.getElementById('profundidadColor').textContent = '24 bits (RGB)';
        
        const tieneAlpha = img.formato === 'image/png' || img.formato === 'image/webp' || img.formato === 'image/avif';
        document.getElementById('tieneTransparencia').textContent = tieneAlpha ? 'Posiblemente' : 'No';
        
        document.getElementById('infoImagenOriginal').classList.remove('d-none');
    }

    mostrarVistaPreviaOriginal() {
        const preview = document.getElementById('imagenOriginalPreview');
        const placeholder = document.getElementById('placeholderOriginalConversion');
        
        preview.src = this.imagenOriginal.src;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
        
        document.getElementById('tamanoOriginalBytes').textContent = this.formatearTamano(this.imagenOriginal.tamano);
        document.getElementById('formatoOriginalBadge').textContent = this.obtenerNombreFormato(this.imagenOriginal.formato).toUpperCase();
    }

    habilitarControles() {
        document.getElementById('convertirImagen').disabled = false;
    }

    async convertirImagen() {
        if (!this.imagenOriginal) {
            this.mostrarNotificacion('No hay imagen cargada', 'warning');
            return;
        }

        const formatoDestino = document.getElementById('formatoDestino').value;
        const calidad = parseInt(document.getElementById('calidadConversion').value) / 100;
        const mantenerTransparencia = document.getElementById('mantenerTransparencia').checked;
        const optimizar = document.getElementById('optimizarTamano').checked;

        if (formatoDestino === 'avif' && !this.soporteAVIF) {
            this.mostrarNotificacion('AVIF no está soportado en este navegador', 'error');
            return;
        }

        const tiempoInicio = Date.now();

        try {
            await this.realizarConversion(formatoDestino, calidad, mantenerTransparencia, optimizar);
            
            const tiempoFin = Date.now();
            const tiempoTotal = (tiempoFin - tiempoInicio) / 1000;
            
            this.mostrarResultadoConversion();
            this.mostrarAnalisisConversion(tiempoTotal);
            this.mostrarNotificacion('Conversión completada exitosamente', 'success');
            
        } catch (error) {
            this.mostrarNotificacion('Error durante la conversión: ' + error.message, 'error');
            console.error('Error de conversión:', error);
        }
    }

    realizarConversion(formato, calidad, mantenerTransparencia, optimizar) {
        return new Promise((resolve, reject) => {
            try {
                this.canvas.width = this.imagenOriginal.ancho;
                this.canvas.height = this.imagenOriginal.alto;

                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                if (!mantenerTransparencia && formato === 'jpeg') {
                    this.ctx.fillStyle = '#FFFFFF';
                    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                }

                this.ctx.drawImage(this.imagenOriginal.elemento, 0, 0);

                if (optimizar) {
                    this.aplicarOptimizaciones();
                }

                const tipoMime = `image/${formato}`;
                const dataURL = this.canvas.toDataURL(tipoMime, calidad);
                
                this.canvas.toBlob((blob) => {
                    if (!blob) {
                        reject(new Error('Error al generar imagen convertida'));
                        return;
                    }

                    this.imagenConvertida = {
                        dataURL: dataURL,
                        blob: blob,
                        formato: formato,
                        tipoMime: tipoMime,
                        calidad: calidad,
                        tamano: blob.size,
                        ancho: this.canvas.width,
                        alto: this.canvas.height
                    };

                    resolve();
                }, tipoMime, calidad);

            } catch (error) {
                reject(error);
            }
        });
    }

    aplicarOptimizaciones() {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.round(data[i] / 2) * 2;     
            data[i + 1] = Math.round(data[i + 1] / 2) * 2; 
            data[i + 2] = Math.round(data[i + 2] / 2) * 2; 
        }

        this.ctx.putImageData(imageData, 0, 0);
    }

    mostrarResultadoConversion() {
        const preview = document.getElementById('imagenConvertidaPreview');
        const placeholder = document.getElementById('placeholderConvertida');
        
        preview.src = this.imagenConvertida.dataURL;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
        
        document.getElementById('tamanoConvertidoBytes').textContent = 
            this.formatearTamano(this.imagenConvertida.tamano);
        document.getElementById('formatoConvertidoBadge').textContent = 
            this.obtenerNombreFormato(this.imagenConvertida.tipoMime).toUpperCase();

        const diferencia = ((this.imagenConvertida.tamano - this.imagenOriginal.tamano) / this.imagenOriginal.tamano) * 100;
        const badgeDiferencia = document.getElementById('diferenciaFormato');
        badgeDiferencia.textContent = `${diferencia > 0 ? '+' : ''}${diferencia.toFixed(1)}%`;
        badgeDiferencia.className = `badge ms-2 ${diferencia > 0 ? 'bg-warning text-dark' : 'bg-success'}`;
        badgeDiferencia.style.display = 'inline';

        document.getElementById('descargarConvertida').disabled = false;
        document.getElementById('convertirOtroFormato').disabled = false;
        document.getElementById('compararCalidades').disabled = false;
    }

    mostrarAnalisisConversion(tiempoConversion) {
        const original = this.imagenOriginal.tamano;
        const convertido = this.imagenConvertida.tamano;
        const cambio = ((convertido - original) / original) * 100;
        const diferencia = Math.abs(convertido - original);
        const ratio = original > convertido ? (original / convertido) : (convertido / original);

        document.getElementById('cambioTamano').textContent = `${cambio > 0 ? '+' : ''}${cambio.toFixed(1)}%`;
        document.getElementById('espacioDiferencia').textContent = 
            `${cambio > 0 ? '+' : '-'}${this.formatearTamano(diferencia)}`;
        document.getElementById('ratioCompresion').textContent = 
            `${ratio.toFixed(2)}:1`;
        document.getElementById('tiempoConversion').textContent = `${tiempoConversion.toFixed(2)}s`;

        this.mostrarCaracteristicasFormato(this.imagenConvertida.formato);
        
        document.getElementById('panelAnalisis').style.display = 'block';
    }

    mostrarCaracteristicasFormato(formato) {
        const caracteristicas = {
            jpeg: {
                compresion: 'Con pérdida, optimizada para fotografías',
                transparencia: 'No soporta canal alpha',
                compatibilidad: 'Universal - todos los navegadores',
                usoRecomendado: 'Fotos, imágenes con muchos colores'
            },
            png: {
                compresion: 'Sin pérdida, archivos más grandes',
                transparencia: 'Soporte completo de transparencia',
                compatibilidad: 'Universal - todos los navegadores',
                usoRecomendado: 'Logos, iconos, imágenes con transparencia'
            },
            webp: {
                compresion: 'Avanzada, mejor que JPEG y PNG',
                transparencia: 'Soporte completo de transparencia',
                compatibilidad: 'Navegadores modernos (>90%)',
                usoRecomendado: 'Web moderna, balance calidad/tamaño'
            },
            avif: {
                compresion: 'Última generación, máxima eficiencia',
                transparencia: 'Soporte completo de transparencia',
                compatibilidad: 'Navegadores muy recientes (~70%)',
                usoRecomendado: 'Aplicaciones futuras, máxima optimización'
            }
        };

        const info = caracteristicas[formato];
        document.getElementById('caracteristicasFormato').innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <strong>Compresión:</strong> ${info.compresion}<br>
                    <strong>Transparencia:</strong> ${info.transparencia}
                </div>
                <div class="col-md-6">
                    <strong>Compatibilidad:</strong> ${info.compatibilidad}<br>
                    <strong>Uso recomendado:</strong> ${info.usoRecomendado}
                </div>
            </div>
        `;
    }

    manejarImagenesLote(event) {
        const archivos = Array.from(event.target.files);
        
        if (archivos.length === 0) {
            document.getElementById('listaImagenesBatch').classList.add('d-none');
            document.getElementById('convertirLote').disabled = true;
            return;
        }

        if (archivos.length > 10) {
            this.mostrarNotificacion('Máximo 10 imágenes por lote', 'warning');
            return;
        }

        const archivosValidos = archivos.filter(archivo => this.validarTipoArchivo(archivo));
        
        if (archivosValidos.length !== archivos.length) {
            this.mostrarNotificacion('Algunos archivos no tienen formato válido y fueron omitidos', 'warning');
        }

        this.mostrarListaImagenesBatch(archivosValidos);
        document.getElementById('convertirLote').disabled = archivosValidos.length === 0;
    }

    mostrarListaImagenesBatch(archivos) {
        const contenedor = document.getElementById('contenidoListaBatch');
        
        const listaHTML = archivos.map((archivo, index) => `
            <div class="d-flex justify-content-between align-items-center border rounded p-2 mb-2">
                <div>
                    <strong>${archivo.name}</strong><br>
                    <small class="text-muted">
                        ${this.obtenerNombreFormato(archivo.type)} - ${this.formatearTamano(archivo.size)}
                    </small>
                </div>
                <span class="badge bg-secondary">Pendiente</span>
            </div>
        `).join('');
        
        contenedor.innerHTML = listaHTML;
        document.getElementById('listaImagenesBatch').classList.remove('d-none');
    }

    async convertirLoteImagenes() {
        const archivos = Array.from(document.getElementById('imagenesBatch').files);
        const formatoDestino = document.getElementById('formatoBatch').value;
        
        if (archivos.length === 0) return;

        const progreso = document.getElementById('progresoBatch');
        const barra = document.getElementById('barraPropresoBatch');
        const estado = document.getElementById('estadoBatch');
        
        progreso.style.display = 'block';
        document.getElementById('convertirLote').disabled = true;

        const archivosConvertidos = [];
        
        for (let i = 0; i < archivos.length; i++) {
            const archivo = archivos[i];
            estado.textContent = `Procesando ${archivo.name} (${i + 1}/${archivos.length})`;
            
            try {
                const imagenConvertida = await this.convertirArchivoLote(archivo, formatoDestino);
                archivosConvertidos.push(imagenConvertida);
                
                const badges = document.querySelectorAll('#contenidoListaBatch .badge');
                if (badges[i]) {
                    badges[i].className = 'badge bg-success';
                    badges[i].textContent = 'Completado';
                }
                
            } catch (error) {
                console.error('Error convirtiendo:', archivo.name, error);
                
                const badges = document.querySelectorAll('#contenidoListaBatch .badge');
                if (badges[i]) {
                    badges[i].className = 'badge bg-danger';
                    badges[i].textContent = 'Error';
                }
            }
            
            const porcentaje = ((i + 1) / archivos.length) * 100;
            barra.style.width = porcentaje + '%';
        }

        if (archivosConvertidos.length > 0) {
            this.descargarLoteImagenes(archivosConvertidos);
            estado.textContent = `Completado: ${archivosConvertidos.length}/${archivos.length} imágenes convertidas`;
            this.mostrarNotificacion(`${archivosConvertidos.length} imágenes convertidas y descargadas`, 'success');
        } else {
            estado.textContent = 'No se pudo convertir ninguna imagen';
            this.mostrarNotificacion('Error al procesar el lote de imágenes', 'error');
        }

        document.getElementById('convertirLote').disabled = false;
    }

    convertirArchivoLote(archivo, formatoDestino) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                
                img.onload = () => {
                    try {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        
                        canvas.width = img.width;
                        canvas.height = img.height;
                        
                        if (formatoDestino === 'jpeg') {
                            ctx.fillStyle = '#FFFFFF';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                        }
                        
                        ctx.drawImage(img, 0, 0);
                        
                        canvas.toBlob((blob) => {
                            if (blob) {
                                const nombreBase = archivo.name.split('.')[0];
                                const extension = formatoDestino === 'jpeg' ? 'jpg' : formatoDestino;
                                
                                resolve({
                                    blob: blob,
                                    nombre: `${nombreBase}.${extension}`,
                                    originalName: archivo.name
                                });
                            } else {
                                reject(new Error('Error generando blob'));
                            }
                        }, `image/${formatoDestino}`, 0.9);
                        
                    } catch (error) {
                        reject(error);
                    }
                };
                
                img.onerror = () => reject(new Error('Error cargando imagen'));
                img.src = e.target.result;
            };
            
            reader.onerror = () => reject(new Error('Error leyendo archivo'));
            reader.readAsDataURL(archivo);
        });
    }

    descargarLoteImagenes(imagenes) {
        imagenes.forEach((imagen, index) => {
            setTimeout(() => {
                const enlace = document.createElement('a');
                enlace.href = URL.createObjectURL(imagen.blob);
                enlace.download = imagen.nombre;
                document.body.appendChild(enlace);
                enlace.click();
                document.body.removeChild(enlace);
                URL.revokeObjectURL(enlace.href);
            }, index * 200);
        });
    }

    descargarImagenConvertida() {
        if (!this.imagenConvertida) {
            this.mostrarNotificacion('No hay imagen convertida para descargar', 'warning');
            return;
        }

        const enlace = document.createElement('a');
        const nombreBase = this.imagenOriginal.archivo.name.split('.')[0];
        const extension = this.imagenConvertida.formato === 'jpeg' ? 'jpg' : this.imagenConvertida.formato;
        
        enlace.href = this.imagenConvertida.dataURL;
        enlace.download = `${nombreBase}_convertida.${extension}`;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);

        this.mostrarNotificacion('Imagen descargada correctamente', 'success');
    }

    volverAConfiguracion() {
        const preview = document.getElementById('imagenConvertidaPreview');
        const placeholder = document.getElementById('placeholderConvertida');
        
        preview.style.display = 'none';
        placeholder.style.display = 'flex';
        
        document.getElementById('tamanoConvertidoBytes').textContent = '-';
        document.getElementById('formatoConvertidoBadge').textContent = '-';
        document.getElementById('diferenciaFormato').style.display = 'none';
        document.getElementById('panelAnalisis').style.display = 'none';
        
        document.getElementById('descargarConvertida').disabled = true;
        document.getElementById('convertirOtroFormato').disabled = true;
        document.getElementById('compararCalidades').disabled = true;
        
        this.imagenConvertida = null;
    }

    limpiarTodo() {
        this.imagenOriginal = null;
        this.imagenConvertida = null;
        
        document.getElementById('imagenOriginalPreview').style.display = 'none';
        document.getElementById('imagenConvertidaPreview').style.display = 'none';
        document.getElementById('placeholderOriginalConversion').style.display = 'flex';
        document.getElementById('placeholderConvertida').style.display = 'flex';
        
        document.getElementById('infoImagenOriginal').classList.add('d-none');
        document.getElementById('panelAnalisis').style.display = 'none';
        
        document.getElementById('imagenInput').value = '';
        document.getElementById('calidadConversion').value = '90';
        document.getElementById('calidadValorConversion').textContent = '90';
        document.getElementById('formatoDestino').value = 'jpeg';
        
        document.getElementById('imagenesBatch').value = '';
        document.getElementById('listaImagenesBatch').classList.add('d-none');
        document.getElementById('progresoBatch').style.display = 'none';
        
        document.getElementById('convertirImagen').disabled = true;
        document.getElementById('descargarConvertida').disabled = true;
        document.getElementById('convertirOtroFormato').disabled = true;
        document.getElementById('compararCalidades').disabled = true;
        document.getElementById('convertirLote').disabled = true;
        
        document.getElementById('tamanoOriginalBytes').textContent = '-';
        document.getElementById('tamanoConvertidoBytes').textContent = '-';
        document.getElementById('formatoOriginalBadge').textContent = '-';
        document.getElementById('formatoConvertidoBadge').textContent = '-';
        document.getElementById('diferenciaFormato').style.display = 'none';
        document.getElementById('estadoBatch').textContent = '';
    }

    actualizarDescripcionFormato(formato) {
        const descripciones = {
            jpeg: 'Ideal para fotografías. Excelente compresión con pérdida mínima de calidad.',
            png: 'Perfecto para imágenes con transparencia, logos e iconos. Sin pérdida de calidad.',
            webp: 'Formato moderno con mejor compresión que JPEG/PNG. Soportado en navegadores actuales.',
            avif: 'Formato de próxima generación con la mejor compresión. Soporte limitado en navegadores.'
        };
        
        document.getElementById('descripcionFormato').textContent = descripciones[formato] || '';
    }

    actualizarConfiguracionCalidad(formato) {
        const configCalidad = document.getElementById('configuracionCalidad');
        
        if (formato === 'png') {
            configCalidad.style.display = 'none';
        } else {
            configCalidad.style.display = 'block';
        }
    }

    obtenerNombreFormato(tipoMime) {
        const formatos = {
            'image/jpeg': 'JPEG',
            'image/jpg': 'JPG', 
            'image/png': 'PNG',
            'image/webp': 'WebP',
            'image/avif': 'AVIF'
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

window.conversorImagenes = new ConversorImagenes();