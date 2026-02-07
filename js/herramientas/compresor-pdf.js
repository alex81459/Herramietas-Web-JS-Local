class CompresorPDF {
    constructor() {
        this.archivoActual = null;
        this.pdfComprimido = null;
        this.paginasProcesadas = 0;
    }

    renderizar() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-file text-primary me-2"></i>Compresor de PDF</h2>
                            <p class="text-muted mb-0">Reduce el peso de PDFs renderizando paginas en Canvas</p>
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
                                <i class="bi bi-upload me-2"></i>Archivo PDF
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row g-3 align-items-end">
                                <div class="col-md-6">
                                    <label class="form-label fw-bold" for="archivoPdf">Selecciona un PDF</label>
                                    <input type="file" id="archivoPdf" class="form-control" accept="application/pdf">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold" for="nivelCompresion">Nivel de Compresion</label>
                                    <select id="nivelCompresion" class="form-select">
                                        <option value="muy-alta">Muy Alta</option>
                                        <option value="alta">Alta</option>
                                        <option value="media" selected>Media</option>
                                        <option value="baja">Baja</option>
                                    </select>
                                    <div class="text-muted"><small id="descripcionCompresion"></small></div>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="calidadJpeg">Calidad JPEG</label>
                                    <input type="range" class="form-range" id="calidadJpeg" min="0.2" max="1" step="0.05" value="0.7">
                                    <div class="text-muted"><small>Actual: <span id="valorCalidad">0.70</span></small></div>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="escalaRender">Escala de render</label>
                                    <input type="range" class="form-range" id="escalaRender" min="0.5" max="1.5" step="0.1" value="1.0">
                                    <div class="text-muted"><small>Actual: <span id="valorEscala">1.0</span>x</small></div>
                                </div>
                            </div>
                            <div class="mt-3 d-flex flex-wrap gap-2">
                                <button id="botonComprimir" class="btn btn-success" disabled>
                                    <i class="bi bi-lightning me-1"></i>Comprimir PDF
                                </button>
                                <button id="botonDescargar" class="btn btn-outline-success" disabled>
                                    <i class="bi bi-download me-1"></i>Descargar PDF
                                </button>
                            </div>
                            <div class="mt-3">
                                <div class="progress" style="height: 10px;">
                                    <div class="progress-bar" id="barraProgreso" role="progressbar" style="width: 0%;"></div>
                                </div>
                                <div class="mt-2 text-muted">
                                    <small id="estadoProceso">Selecciona un PDF para iniciar.</small>
                                </div>
                            </div>
                            <div class="mt-3">
                                <ul class="list-unstyled text-muted mb-0">
                                    <li><strong>Tamano original:</strong> <span id="tamanoOriginal">-</span></li>
                                    <li><strong>Tamano comprimido:</strong> <span id="tamanoComprimido">-</span></li>
                                    <li><strong>Paginas:</strong> <span id="totalPaginas">-</span></li>
                                </ul>
                            </div>
                            <div class="alert alert-warning mt-3 mb-0" id="avisoLibrerias" style="display: none;">
                                <i class="bi bi-exclamation-triangle me-1"></i>
                                Faltan librerias PDF.js y/o jsPDF para comprimir.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.configurarEventos();
        this.validarLibrerias();
    }

    configurarEventos() {
        this.configurarFavoritos();

        document.getElementById('archivoPdf').addEventListener('change', (e) => {
            this.seleccionarArchivo(e.target.files[0]);
        });

        document.getElementById('nivelCompresion').addEventListener('change', (e) => {
            this.aplicarNivelCompresion(e.target.value);
        });

        document.getElementById('calidadJpeg').addEventListener('input', (e) => {
            document.getElementById('valorCalidad').textContent = Number(e.target.value).toFixed(2);
        });

        document.getElementById('escalaRender').addEventListener('input', (e) => {
            document.getElementById('valorEscala').textContent = Number(e.target.value).toFixed(1);
        });

        document.getElementById('botonComprimir').addEventListener('click', () => {
            this.comprimirPdf();
        });

        document.getElementById('botonDescargar').addEventListener('click', () => {
            this.descargarPdf();
        });

        this.aplicarNivelCompresion(document.getElementById('nivelCompresion').value);
    }

    configurarFavoritos() {
        const boton = document.getElementById('botonFavoritos');
        const icono = document.getElementById('iconoFavoritos');
        const texto = document.getElementById('textoFavoritos');

        if (!boton || !icono || !texto) return;

        const esFavorito = GestorFavoritos.esFavorito('compresor-pdf');

        if (esFavorito) {
            icono.className = 'bi bi-star-fill me-1';
            texto.textContent = 'En Favoritos';
        }

        boton.addEventListener('click', () => {
            const nuevoEstado = GestorFavoritos.alternarFavorito('compresor-pdf');
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

    validarLibrerias() {
        const aviso = document.getElementById('avisoLibrerias');
        const ok = Boolean(window.pdfjsLib && window.jspdf && window.jspdf.jsPDF);
        if (ok && window.pdfjsLib.GlobalWorkerOptions) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'lib/pdf.worker.min.js';
        }
        aviso.style.display = ok ? 'none' : 'block';
        return ok;
    }

    seleccionarArchivo(archivo) {
        this.archivoActual = archivo || null;
        this.pdfComprimido = null;
        this.paginasProcesadas = 0;

        document.getElementById('botonComprimir').disabled = !archivo;
        document.getElementById('botonDescargar').disabled = true;
        document.getElementById('tamanoOriginal').textContent = archivo ? UtilsUI.formatearTamano(archivo.size) : '-';
        document.getElementById('tamanoComprimido').textContent = '-';
        document.getElementById('totalPaginas').textContent = '-';
        document.getElementById('barraProgreso').style.width = '0%';
        document.getElementById('estadoProceso').textContent = archivo ? 'Listo para comprimir.' : 'Selecciona un PDF para iniciar.';
    }

    aplicarNivelCompresion(nivel) {
        const config = this.obtenerConfiguracionCompresion(nivel);
        const calidad = document.getElementById('calidadJpeg');
        const escala = document.getElementById('escalaRender');
        const descripcion = document.getElementById('descripcionCompresion');

        calidad.value = String(config.calidad);
        escala.value = String(config.escala);
        document.getElementById('valorCalidad').textContent = Number(config.calidad).toFixed(2);
        document.getElementById('valorEscala').textContent = Number(config.escala).toFixed(1);
        descripcion.textContent = config.descripcion;
    }

    obtenerConfiguracionCompresion(nivel) {
        const configuraciones = {
            'muy-alta': {
                calidad: 0.45,
                escala: 0.8,
                descripcion: 'Maxima reduccion de tamano, perdida notable de calidad.'
            },
            'alta': {
                calidad: 0.6,
                escala: 0.9,
                descripcion: 'Buena reduccion manteniendo legibilidad general.'
            },
            'media': {
                calidad: 0.75,
                escala: 1.0,
                descripcion: 'Equilibrio entre peso y calidad para uso diario.'
            },
            'baja': {
                calidad: 0.9,
                escala: 1.1,
                descripcion: 'Poca reduccion, conserva mejor la calidad.'
            }
        };

        return configuraciones[nivel] || configuraciones.media;
    }

    async comprimirPdf() {
        if (!this.archivoActual) {
            UtilsUI.mostrarNotificacion('Selecciona un PDF primero', 'warning');
            return;
        }

        if (!this.validarLibrerias()) {
            UtilsUI.mostrarNotificacion('Faltan librerias para comprimir PDFs', 'error');
            return;
        }

        const boton = document.getElementById('botonComprimir');
        boton.disabled = true;
        this.actualizarEstado('Cargando PDF...', 0);

        try {
            const buffer = await this.archivoActual.arrayBuffer();
            const documento = await window.pdfjsLib.getDocument({ data: buffer }).promise;
            const total = documento.numPages;
            document.getElementById('totalPaginas').textContent = total;

            const calidad = Number(document.getElementById('calidadJpeg').value);
            const escala = Number(document.getElementById('escalaRender').value);
            const { jsPDF } = window.jspdf;
            let pdfSalida = null;

            for (let pagina = 1; pagina <= total; pagina += 1) {
                const page = await documento.getPage(pagina);
                const viewport = page.getViewport({ scale: escala });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const contexto = canvas.getContext('2d');

                await page.render({ canvasContext: contexto, viewport }).promise;

                const imagen = canvas.toDataURL('image/jpeg', calidad);
                const orientacion = viewport.width > viewport.height ? 'l' : 'p';

                if (!pdfSalida) {
                    pdfSalida = new jsPDF({
                        orientation: orientacion,
                        unit: 'pt',
                        format: [viewport.width, viewport.height]
                    });
                } else {
                    pdfSalida.addPage([viewport.width, viewport.height], orientacion);
                }

                pdfSalida.addImage(imagen, 'JPEG', 0, 0, viewport.width, viewport.height, undefined, 'FAST');

                this.paginasProcesadas = pagina;
                const progreso = Math.round((pagina / total) * 100);
                this.actualizarEstado(`Procesando pagina ${pagina} de ${total}...`, progreso);
            }

            const blob = pdfSalida.output('blob');
            this.pdfComprimido = blob;
            document.getElementById('tamanoComprimido').textContent = UtilsUI.formatearTamano(blob.size);
            document.getElementById('botonDescargar').disabled = false;
            this.actualizarEstado('Compresion terminada.', 100);
            UtilsUI.mostrarNotificacion('PDF comprimido correctamente', 'success', 1500);
        } catch (error) {
            console.error(error);
            UtilsUI.mostrarNotificacion('Error al comprimir el PDF', 'error');
            this.actualizarEstado('Error al procesar el PDF.', 0);
        } finally {
            boton.disabled = false;
        }
    }

    actualizarEstado(texto, porcentaje) {
        document.getElementById('estadoProceso').textContent = texto;
        document.getElementById('barraProgreso').style.width = `${porcentaje}%`;
    }

    descargarPdf() {
        if (!this.pdfComprimido) return;

        const url = URL.createObjectURL(this.pdfComprimido);
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = 'pdf_comprimido.pdf';
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    }
}

window.compresorPDF = new CompresorPDF();
