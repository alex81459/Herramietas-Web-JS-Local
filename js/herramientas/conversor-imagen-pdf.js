class ConversorImagenPDF {
    constructor() {
        this.imagenes = [];
        this.configuracionPDF = {
            formato: 'a4',
            orientacion: 'portrait',
            calidad: 0.8,
            margen: 20,
            ajustar: 'fit'
        };
    }

    render(container) {
        container.innerHTML = `
            <div class="row">
                <div class="col-lg-4">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-upload me-2"></i>
                                Cargar Imágenes
                            </h5>
                        </div>
                        <div class="card-body">
                            <input type="file" class="form-control mb-3" id="inputImagenes" accept="image/*" multiple>
                            <div class="text-center">
                                <button class="btn btn-primary" id="cargarImagenes" disabled>
                                    <i class="bi bi-images"></i> Agregar Imágenes
                                </button>
                            </div>
                            <div class="alert alert-info mt-3">
                                <small>
                                    <i class="bi bi-info-circle me-1"></i>
                                    Puedes seleccionar múltiples imágenes a la vez
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-4" id="panelConfiguracion" style="display: none;">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Configuración PDF
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Tamaño de página</label>
                                <select class="form-select" id="formatoPDF">
                                    <option value="a4">A4 (210 x 297 mm)</option>
                                    <option value="letter">Letter (216 x 279 mm)</option>
                                    <option value="legal">Legal (216 x 356 mm)</option>
                                    <option value="a3">A3 (297 x 420 mm)</option>
                                    <option value="a5">A5 (148 x 210 mm)</option>
                                    <option value="custom">Personalizado</option>
                                </select>
                            </div>
                            <div id="tamanoCustom" class="mb-3" style="display: none;">
                                <label class="form-label">Dimensiones personalizadas (mm)</label>
                                <div class="row">
                                    <div class="col">
                                        <input type="number" class="form-control" id="anchoCustom" placeholder="Ancho" value="210">
                                    </div>
                                    <div class="col">
                                        <input type="number" class="form-control" id="altoCustom" placeholder="Alto" value="297">
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Orientación</label>
                                <div class="btn-group d-flex" role="group">
                                    <input type="radio" class="btn-check" name="orientacion" id="portrait" value="portrait" checked>
                                    <label class="btn btn-outline-primary" for="portrait">
                                        <i class="bi bi-gear me-1"></i>Vertical
                                    </label>  
                                    <input type="radio" class="btn-check" name="orientacion" id="landscape" value="landscape">
                                    <label class="btn btn-outline-primary" for="landscape">
                                        <i class="bi bi-gear me-1"></i>Horizontal
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Ajuste de imagen</label>
                                <select class="form-select" id="ajusteImagen">
                                    <option value="fit">Ajustar manteniendo proporción</option>
                                    <option value="fill">Llenar página (puede recortar)</option>
                                    <option value="center">Centrar sin redimensionar</option>
                                    <option value="stretch">Estirar para llenar</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Margen (mm)</label>
                                <input type="range" class="form-range" id="margenPDF" min="0" max="50" value="20">
                                <small class="text-muted">Margen: <span id="valorMargen">20</span>mm</small>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Calidad de compresión</label>
                                <input type="range" class="form-range" id="calidadPDF" min="0.1" max="1.0" step="0.1" value="0.8">
                                <small class="text-muted">Calidad: <span id="valorCalidad">80</span>%</small>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="unaImagenPorPagina" checked>
                                <label class="form-check-label" for="unaImagenPorPagina">
                                    Una imagen por página
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="card" id="panelGeneracion" style="display: none;">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-file-earmark-pdf me-2"></i>
                                Generar PDF
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Nombre del archivo</label>
                                <input type="text" class="form-control" id="nombreArchivo" value="imagenes-convertidas">
                                <small class="text-muted">Se agregará la extensión .pdf automáticamente</small>
                            </div>     
                            <div class="d-grid gap-2">
                                <button class="btn btn-success btn-lg" id="generarPDF">
                                    <i class="bi bi-file me-2"></i>
                                    Generar PDF
                                </button>
                                <div id="progreso" class="progress" style="display: none; height: 30px;">
                                    <div class="progress-bar progress-bar-striped progress-bar-animated" 
                                         role="progressbar" style="width: 0%">
                                        <span class="progress-text">0%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-images me-2"></i>
                                Imágenes Cargadas
                            </h5>
                            <button class="btn btn-outline-danger btn-sm" id="limpiarTodo" disabled>
                                <i class="bi bi-trash"></i> Limpiar Todo
                            </button>
                        </div>
                        <div class="card-body">
                            <div id="listaImagenes" class="row">
                                <div class="col-12 text-center text-muted">
                                    <i class="bi bi-images" style="font-size: 4rem;"></i>
                                    <p class="mt-2">No hay imágenes cargadas</p>
                                    <p class="small">Selecciona una o más imágenes para comenzar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mt-4" id="vistaPreviaConfiguracion" style="display: none;">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-eye me-2"></i>
                                Vista Previa de Configuración
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <table class="table table-sm">
                                        <tr>
                                            <td><strong>Formato:</strong></td>
                                            <td id="previewFormato">A4</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Orientación:</strong></td>
                                            <td id="previewOrientacion">Vertical</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Imágenes:</strong></td>
                                            <td id="previewCantidad">0</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="col-md-6">
                                    <table class="table table-sm">
                                        <tr>
                                            <td><strong>Páginas estimadas:</strong></td>
                                            <td id="previewPaginas">0</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Ajuste:</strong></td>
                                            <td id="previewAjuste">Ajustar manteniendo proporción</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Calidad:</strong></td>
                                            <td id="previewCalidad">80%</td>
                                        </tr>
                                    </table>
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
        document.getElementById('inputImagenes').addEventListener('change', (e) => {
            const archivos = e.target.files;
            if (archivos.length > 0) {
                document.getElementById('cargarImagenes').disabled = false;
            }
        });

        document.getElementById('cargarImagenes').addEventListener('click', () => {
            this.cargarImagenes();
        });

        document.getElementById('formatoPDF').addEventListener('change', (e) => {
            this.mostrarTamanoCustom(e.target.value === 'custom');
            this.actualizarConfiguracion();
        });

        document.querySelectorAll('input[name="orientacion"]').forEach(radio => {
            radio.addEventListener('change', () => {
                this.actualizarConfiguracion();
            });
        });

        document.getElementById('ajusteImagen').addEventListener('change', () => {
            this.actualizarConfiguracion();
        });

        document.getElementById('margenPDF').addEventListener('input', (e) => {
            document.getElementById('valorMargen').textContent = e.target.value;
            this.actualizarConfiguracion();
        });

        document.getElementById('calidadPDF').addEventListener('input', (e) => {
            const valor = Math.round(e.target.value * 100);
            document.getElementById('valorCalidad').textContent = valor;
            this.actualizarConfiguracion();
        });

        document.getElementById('unaImagenPorPagina').addEventListener('change', () => {
            this.actualizarConfiguracion();
        });

        document.getElementById('limpiarTodo').addEventListener('click', () => {
            this.limpiarTodo();
        });

        document.getElementById('generarPDF').addEventListener('click', () => {
            this.generarPDF();
        });
    }

    async cargarImagenes() {
        const archivos = document.getElementById('inputImagenes').files;
        
        for (let archivo of archivos) {
            if (archivo.type.startsWith('image/')) {
                try {
                    const imagenData = await this.procesarImagen(archivo);
                    this.imagenes.push(imagenData);
                } catch (error) {
                    console.error('Error al procesar imagen:', error);
                }
            }
        }
        
        this.actualizarVistaImagenes();
        this.mostrarPaneles();
        this.actualizarConfiguracion();
        document.getElementById('inputImagenes').value = '';
        document.getElementById('cargarImagenes').disabled = true;
    }

    procesarImagen(archivo) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        nombre: archivo.name,
                        tamaño: archivo.size,
                        width: img.width,
                        height: img.height,
                        dataURL: e.target.result,
                        tipo: archivo.type
                    });
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(archivo);
        });
    }

    actualizarVistaImagenes() {
        const contenedor = document.getElementById('listaImagenes');
        
        if (this.imagenes.length === 0) {
            contenedor.innerHTML = `
                <div class="col-12 text-center text-muted">
                    <i class="bi bi-images" style="font-size: 4rem;"></i>
                    <p class="mt-2">No hay imágenes cargadas</p>
                    <p class="small">Selecciona una o más imágenes para comenzar</p>
                </div>
            `;
            return;
        }

        let html = '';
        this.imagenes.forEach((imagen, index) => {
            const tamaño = (imagen.tamaño / 1024).toFixed(1);
            html += `
                <div class="col-md-6 col-lg-4 mb-3">
                    <div class="card">
                        <div class="position-relative">
                            <img src="${imagen.dataURL}" class="card-img-top" style="height: 150px; object-fit: cover;">
                            <button class="btn btn-danger btn-sm position-absolute top-0 end-0 m-2" 
                                    onclick="app.herramientaActual && app.herramientaActual.eliminarImagen && app.herramientaActual.eliminarImagen(${index})">
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                        <div class="card-body p-2">
                            <h6 class="card-title text-truncate" title="${imagen.nombre}">${imagen.nombre}</h6>
                            <small class="text-muted">
                                ${imagen.width} × ${imagen.height} • ${tamaño} KB
                            </small>
                        </div>
                    </div>
                </div>
            `;
        });

        contenedor.innerHTML = html;
        document.getElementById('limpiarTodo').disabled = false;
    }

    eliminarImagen(index) {
        this.imagenes.splice(index, 1);
        this.actualizarVistaImagenes();
        this.actualizarConfiguracion();
        
        if (this.imagenes.length === 0) {
            this.ocultarPaneles();
        }
    }

    mostrarTamanoCustom(mostrar) {
        const tamanoCustom = document.getElementById('tamanoCustom');
        tamanoCustom.style.display = mostrar ? 'block' : 'none';
    }

    actualizarConfiguracion() {
        if (this.imagenes.length === 0) return;
        
        this.configuracionPDF = {
            formato: document.getElementById('formatoPDF').value,
            orientacion: document.querySelector('input[name="orientacion"]:checked').value,
            calidad: parseFloat(document.getElementById('calidadPDF').value),
            margen: parseInt(document.getElementById('margenPDF').value),
            ajustar: document.getElementById('ajusteImagen').value,
            unaImagenPorPagina: document.getElementById('unaImagenPorPagina').checked
        };
        
        this.actualizarVistaPrevia();
    }

    actualizarVistaPrevia() {
        const formatoTexto = {
            'a4': 'A4 (210 × 297 mm)',
            'letter': 'Letter (216 × 279 mm)',
            'legal': 'Legal (216 × 356 mm)',
            'a3': 'A3 (297 × 420 mm)',
            'a5': 'A5 (148 × 210 mm)',
            'custom': 'Personalizado'
        };

        const orientacionTexto = {
            'portrait': 'Vertical',
            'landscape': 'Horizontal'
        };

        const ajusteTexto = {
            'fit': 'Ajustar manteniendo proporción',
            'fill': 'Llenar página (puede recortar)',
            'center': 'Centrar sin redimensionar',
            'stretch': 'Estirar para llenar'
        };

        document.getElementById('previewFormato').textContent = formatoTexto[this.configuracionPDF.formato];
        document.getElementById('previewOrientacion').textContent = orientacionTexto[this.configuracionPDF.orientacion];
        document.getElementById('previewCantidad').textContent = this.imagenes.length;
        document.getElementById('previewAjuste').textContent = ajusteTexto[this.configuracionPDF.ajustar];
        document.getElementById('previewCalidad').textContent = Math.round(this.configuracionPDF.calidad * 100) + '%';
        
        let paginasEstimadas = this.configuracionPDF.unaImagenPorPagina ? 
            this.imagenes.length : 
            Math.ceil(this.imagenes.length / 2);
        
        document.getElementById('previewPaginas').textContent = paginasEstimadas;
    }

    mostrarPaneles() {
        document.getElementById('panelConfiguracion').style.display = 'block';
        document.getElementById('panelGeneracion').style.display = 'block';
        document.getElementById('vistaPreviaConfiguracion').style.display = 'block';
        if (window.app) {
            window.app.herramientaActual = this;
        }
    }

    ocultarPaneles() {
        document.getElementById('panelConfiguracion').style.display = 'none';
        document.getElementById('panelGeneracion').style.display = 'none';
        document.getElementById('vistaPreviaConfiguracion').style.display = 'none';
        document.getElementById('limpiarTodo').disabled = true;
    }

    limpiarTodo() {
        this.imagenes = [];
        this.actualizarVistaImagenes();
        this.ocultarPaneles();
    }

    async generarPDF() {
        if (this.imagenes.length === 0) return;

        const boton = document.getElementById('generarPDF');
        const progreso = document.getElementById('progreso');
        const barraProgreso = progreso.querySelector('.progress-bar');
        const textoProgreso = progreso.querySelector('.progress-text');

        try {
            boton.disabled = true;
            progreso.style.display = 'block';
            
            const dimensiones = this.obtenerDimensionesPDF();
            
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: this.configuracionPDF.orientacion,
                unit: 'mm',
                format: this.configuracionPDF.formato === 'custom' ? 
                    [parseFloat(document.getElementById('anchoCustom').value), 
                     parseFloat(document.getElementById('altoCustom').value)] : 
                    this.configuracionPDF.formato
            });

            const paginaWidth = pdf.internal.pageSize.getWidth();
            const paginaHeight = pdf.internal.pageSize.getHeight();
            const margen = this.configuracionPDF.margen;
            const areaUtil = {
                width: paginaWidth - (margen * 2),
                height: paginaHeight - (margen * 2)
            };

            let paginaActual = 0;
            let imagenesPorPagina = this.configuracionPDF.unaImagenPorPagina ? 1 : 2;
            let imagenesEnPagina = 0;

            for (let i = 0; i < this.imagenes.length; i++) {
                const imagen = this.imagenes[i];
                
                const progresoPorcentaje = Math.round((i / this.imagenes.length) * 100);
                barraProgreso.style.width = progresoPorcentaje + '%';
                textoProgreso.textContent = `Procesando imagen ${i + 1} de ${this.imagenes.length}`;

                if (imagenesEnPagina === 0 && i > 0) {
                    pdf.addPage();
                }

                const posicion = this.calcularPosicionImagen(
                    imagen, areaUtil, imagenesEnPagina, imagenesPorPagina, margen
                );

                try {
                    pdf.addImage(
                        imagen.dataURL,
                        this.obtenerFormatoImagen(imagen.tipo),
                        posicion.x,
                        posicion.y,
                        posicion.width,
                        posicion.height,
                        '',
                        'FAST'
                    );
                } catch (error) {
                    console.error('Error al agregar imagen:', error);
                }

                imagenesEnPagina++;
                if (imagenesEnPagina >= imagenesPorPagina) {
                    imagenesEnPagina = 0;
                }

                await new Promise(resolve => setTimeout(resolve, 50));
            }

            barraProgreso.style.width = '100%';
            textoProgreso.textContent = 'Generando archivo...';

            const nombreArchivo = document.getElementById('nombreArchivo').value || 'imagenes-convertidas';
            pdf.save(`${nombreArchivo}.pdf`);

        } catch (error) {
            console.error('Error al generar PDF:', error);
            alert('Error al generar el PDF: ' + error.message);
        } finally {
            setTimeout(() => {
                progreso.style.display = 'none';
                boton.disabled = false;
                barraProgreso.style.width = '0%';
                textoProgreso.textContent = '0%';
            }, 1000);
        }
    }

    obtenerDimensionesPDF() {
        const formatos = {
            'a4': [210, 297],
            'letter': [216, 279],
            'legal': [216, 356],
            'a3': [297, 420],
            'a5': [148, 210]
        };

        if (this.configuracionPDF.formato === 'custom') {
            return [
                parseFloat(document.getElementById('anchoCustom').value),
                parseFloat(document.getElementById('altoCustom').value)
            ];
        }

        let dimensiones = formatos[this.configuracionPDF.formato];
        
        if (this.configuracionPDF.orientacion === 'landscape') {
            dimensiones = [dimensiones[1], dimensiones[0]];
        }

        return dimensiones;
    }

    calcularPosicionImagen(imagen, areaUtil, posicionEnPagina, imagenesPorPagina, margen) {
        let areaDestino = { ...areaUtil };
        let offsetY = 0;

        if (imagenesPorPagina > 1) {
            areaDestino.height = areaUtil.height / imagenesPorPagina;
            offsetY = posicionEnPagina * areaDestino.height;
        }

        const aspectoImagen = imagen.width / imagen.height;
        const aspectoDestino = areaDestino.width / areaDestino.height;

        let width, height, x, y;

        switch (this.configuracionPDF.ajustar) {
            case 'fit':
                if (aspectoImagen > aspectoDestino) {
                    width = areaDestino.width;
                    height = width / aspectoImagen;
                } else {
                    height = areaDestino.height;
                    width = height * aspectoImagen;
                }
                x = margen + (areaDestino.width - width) / 2;
                y = margen + offsetY + (areaDestino.height - height) / 2;
                break;
            
            case 'fill':
                if (aspectoImagen < aspectoDestino) {
                    width = areaDestino.width;
                    height = width / aspectoImagen;
                } else {
                    height = areaDestino.height;
                    width = height * aspectoImagen;
                }
                x = margen + (areaDestino.width - width) / 2;
                y = margen + offsetY + (areaDestino.height - height) / 2;
                break;
            
            case 'stretch':
                width = areaDestino.width;
                height = areaDestino.height;
                x = margen;
                y = margen + offsetY;
                break;
            
            case 'center':
            default:
                const factorEscala = 0.264583; 
                width = Math.min(imagen.width * factorEscala, areaDestino.width);
                height = Math.min(imagen.height * factorEscala, areaDestino.height);
                x = margen + (areaDestino.width - width) / 2;
                y = margen + offsetY + (areaDestino.height - height) / 2;
                break;
        }

        return { x, y, width, height };
    }

    obtenerFormatoImagen(mimeType) {
        if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return 'JPEG';
        if (mimeType.includes('png')) return 'PNG';
        if (mimeType.includes('webp')) return 'WEBP';
        return 'JPEG'; 
    }
}

if (typeof window !== 'undefined') {
    window.ConversorImagenPDF = ConversorImagenPDF;
}