class FirmadorPDF {
    constructor() {
        this.archivoPdf = null;
        this.pdfDoc = null;
        this.firmaImagen = null;
        this.firmaDataUrl = '';
        this.pdfFirmado = null;
        this.firmas = [];
    }

    renderizar() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-pencil text-primary me-2"></i>Firmador visual de PDF</h2>
                            <p class="text-muted mb-0">Inserta una imagen de firma en una pagina especifica (sin firma criptografica)</p>
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
                                <i class="bi bi-upload me-2"></i>Archivos
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label fw-bold" for="archivoPdf">PDF a firmar</label>
                                    <input type="file" id="archivoPdf" class="form-control" accept="application/pdf">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold" for="archivoFirma">Imagen de firma (PNG/JPG)</label>
                                    <input type="file" id="archivoFirma" class="form-control" accept="image/png,image/jpeg">
                                </div>
                            </div>
                            <div class="mt-3">
                                <ul class="list-unstyled text-muted mb-0">
                                    <li><strong>Paginas:</strong> <span id="totalPaginas">-</span></li>
                                    <li><strong>Tamano PDF:</strong> <span id="tamanoPdf">-</span></li>
                                </ul>
                            </div>
                            <div class="alert alert-warning mt-3 mb-0" id="avisoLibrerias" style="display: none;">
                                <i class="bi bi-exclamation-triangle me-1"></i>
                                Faltan librerias PDF.js y/o jsPDF para firmar.
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
                                <i class="bi bi-gear me-2"></i>Posicion de la firma
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row g-3 align-items-end">
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="paginaFirma">Pagina</label>
                                    <input type="number" id="paginaFirma" class="form-control" min="1" value="1">
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="presetPosicion">Preset</label>
                                    <select id="presetPosicion" class="form-select">
                                        <option value="abajo-derecha" selected>Abajo derecha</option>
                                        <option value="abajo-izquierda">Abajo izquierda</option>
                                        <option value="centro">Centro</option>
                                        <option value="arriba-derecha">Arriba derecha</option>
                                        <option value="arriba-izquierda">Arriba izquierda</option>
                                    </select>
                                    <div class="text-muted"><small id="descripcionPreset"></small></div>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="posicionX">Posicion X (%)</label>
                                    <input type="range" id="posicionX" class="form-range" min="0" max="100" value="60">
                                    <div class="text-muted"><small>Actual: <span id="valorX">60</span>%</small></div>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="posicionY">Posicion Y (%)</label>
                                    <input type="range" id="posicionY" class="form-range" min="0" max="100" value="80">
                                    <div class="text-muted"><small>Actual: <span id="valorY">80</span>%</small></div>
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="anchoFirma">Ancho firma (%)</label>
                                    <input type="range" id="anchoFirma" class="form-range" min="10" max="60" value="30">
                                    <div class="text-muted"><small>Actual: <span id="valorAncho">30</span>%</small></div>
                                </div>
                            </div>
                            <div class="mt-3">
                                <div class="d-flex flex-wrap gap-2">
                                    <button id="botonAgregarFirma" class="btn btn-outline-secondary" disabled>
                                        <i class="bi bi-plus-circle me-1"></i>Agregar firma
                                    </button>
                                    <button id="botonLimpiarFirmas" class="btn btn-outline-secondary" disabled>
                                        <i class="bi bi-trash me-1"></i>Limpiar firmas
                                    </button>
                                </div>
                                <div class="mt-2" id="listaFirmas">
                                    <small class="text-muted">Aun no hay firmas agregadas.</small>
                                </div>
                            </div>
                            <div class="mt-3 d-flex flex-wrap gap-2">
                                <button id="botonPrevisualizar" class="btn btn-outline-primary" disabled>
                                    <i class="bi bi-eye me-1"></i>Previsualizar
                                </button>
                                <button id="botonFirmar" class="btn btn-success" disabled>
                                    <i class="bi bi-pencil me-1"></i>Firmar PDF
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
                                    <small id="estadoProceso">Selecciona un PDF y una firma para iniciar.</small>
                                </div>
                            </div>
                            <div class="mt-3">
                                <canvas id="lienzoPrevia" class="border rounded w-100" style="max-height: 460px;"></canvas>
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
            const archivo = e.target.files[0];
            this.cargarPdf(archivo);
        });

        document.getElementById('archivoFirma').addEventListener('change', (e) => {
            const archivo = e.target.files[0];
            this.cargarFirma(archivo);
        });

        document.getElementById('paginaFirma').addEventListener('input', () => {
            this.actualizarBotones();
        });

        document.getElementById('presetPosicion').addEventListener('change', (e) => {
            this.aplicarPreset(e.target.value);
        });

        document.getElementById('posicionX').addEventListener('input', (e) => {
            document.getElementById('valorX').textContent = e.target.value;
        });

        document.getElementById('posicionY').addEventListener('input', (e) => {
            document.getElementById('valorY').textContent = e.target.value;
        });

        document.getElementById('anchoFirma').addEventListener('input', (e) => {
            document.getElementById('valorAncho').textContent = e.target.value;
        });

        document.getElementById('botonPrevisualizar').addEventListener('click', () => {
            this.previsualizar();
        });

        document.getElementById('botonFirmar').addEventListener('click', () => {
            this.firmarPdf();
        });

        document.getElementById('botonDescargar').addEventListener('click', () => {
            this.descargarPdf();
        });

        document.getElementById('botonAgregarFirma').addEventListener('click', () => {
            this.agregarFirma();
        });

        document.getElementById('botonLimpiarFirmas').addEventListener('click', () => {
            this.firmas = [];
            this.renderizarListaFirmas();
            this.actualizarBotones();
        });

        document.getElementById('listaFirmas').addEventListener('click', (e) => {
            const boton = e.target.closest('button[data-indice]');
            if (!boton) return;
            const indice = parseInt(boton.dataset.indice, 10);
            if (Number.isNaN(indice)) return;
            this.eliminarFirma(indice);
        });

        this.aplicarPreset(document.getElementById('presetPosicion').value);
    }

    configurarFavoritos() {
        const boton = document.getElementById('botonFavoritos');
        const icono = document.getElementById('iconoFavoritos');
        const texto = document.getElementById('textoFavoritos');

        if (!boton || !icono || !texto) return;

        const esFavorito = GestorFavoritos.esFavorito('firmador-pdf');

        if (esFavorito) {
            icono.className = 'bi bi-star-fill me-1';
            texto.textContent = 'En Favoritos';
        }

        boton.addEventListener('click', () => {
            const nuevoEstado = GestorFavoritos.alternarFavorito('firmador-pdf');
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

    async cargarPdf(archivo) {
        this.archivoPdf = archivo || null;
        this.pdfDoc = null;
        this.pdfFirmado = null;
        this.firmas = [];
        this.renderizarListaFirmas();
        document.getElementById('tamanoPdf').textContent = archivo ? UtilsUI.formatearTamano(archivo.size) : '-';
        document.getElementById('totalPaginas').textContent = '-';
        document.getElementById('paginaFirma').value = 1;
        document.getElementById('barraProgreso').style.width = '0%';
        document.getElementById('estadoProceso').textContent = archivo ? 'PDF cargado.' : 'Selecciona un PDF y una firma para iniciar.';

        if (!archivo) {
            this.actualizarBotones();
            return;
        }

        if (!this.validarLibrerias()) {
            this.actualizarBotones();
            return;
        }

        try {
            const buffer = await archivo.arrayBuffer();
            this.pdfDoc = await window.pdfjsLib.getDocument({ data: buffer }).promise;
            document.getElementById('totalPaginas').textContent = this.pdfDoc.numPages;
            this.actualizarBotones();
        } catch (error) {
            console.error(error);
            UtilsUI.mostrarNotificacion('No se pudo leer el PDF', 'error');
            this.pdfDoc = null;
            this.actualizarBotones();
        }
    }

    cargarFirma(archivo) {
        this.firmaImagen = null;
        this.firmaDataUrl = '';
        this.firmas = [];
        this.renderizarListaFirmas();
        if (!archivo) {
            this.actualizarBotones();
            return;
        }

        const lector = new FileReader();
        lector.onload = (e) => {
            this.firmaDataUrl = e.target.result;
            const img = new Image();
            img.onload = () => {
                this.firmaImagen = img;
                this.actualizarBotones();
            };
            img.onerror = () => {
                this.firmaImagen = null;
                UtilsUI.mostrarNotificacion('No se pudo cargar la imagen de firma', 'error');
                this.actualizarBotones();
            };
            img.src = this.firmaDataUrl;
        };
        lector.readAsDataURL(archivo);
    }

    actualizarBotones() {
        const listo = Boolean(this.pdfDoc && this.firmaImagen);
        document.getElementById('botonPrevisualizar').disabled = !listo;
        document.getElementById('botonFirmar').disabled = !listo;
        document.getElementById('botonDescargar').disabled = !this.pdfFirmado;
        document.getElementById('botonAgregarFirma').disabled = !listo;
        document.getElementById('botonLimpiarFirmas').disabled = this.firmas.length === 0;
    }

    aplicarPreset(preset) {
        const config = this.obtenerPreset(preset);
        document.getElementById('posicionX').value = String(config.x);
        document.getElementById('posicionY').value = String(config.y);
        document.getElementById('anchoFirma').value = String(config.ancho);
        document.getElementById('valorX').textContent = String(config.x);
        document.getElementById('valorY').textContent = String(config.y);
        document.getElementById('valorAncho').textContent = String(config.ancho);
        document.getElementById('descripcionPreset').textContent = config.descripcion;
    }

    obtenerPreset(preset) {
        const presets = {
            'abajo-derecha': { x: 65, y: 90, ancho: 30, descripcion: 'Esquina inferior derecha.' },
            'abajo-izquierda': { x: 5, y: 90, ancho: 30, descripcion: 'Esquina inferior izquierda.' },
            'centro': { x: 35, y: 60, ancho: 35, descripcion: 'Centro de la pagina.' },
            'arriba-derecha': { x: 65, y: 25, ancho: 28, descripcion: 'Esquina superior derecha.' },
            'arriba-izquierda': { x: 5, y: 25, ancho: 28, descripcion: 'Esquina superior izquierda.' }
        };

        return presets[preset] || presets['abajo-derecha'];
    }

    agregarFirma() {
        const pagina = this.obtenerIndicePagina();
        if (!this.pdfDoc || pagina < 1 || pagina > this.pdfDoc.numPages) {
            UtilsUI.mostrarNotificacion('Pagina fuera de rango', 'warning');
            return;
        }

        const firma = {
            pagina,
            xPercent: Number(document.getElementById('posicionX').value) / 100,
            yPercent: Number(document.getElementById('posicionY').value) / 100,
            anchoPercent: Number(document.getElementById('anchoFirma').value) / 100
        };

        this.firmas.push(firma);
        this.renderizarListaFirmas();
        this.actualizarBotones();
    }

    eliminarFirma(indice) {
        this.firmas.splice(indice, 1);
        this.renderizarListaFirmas();
        this.actualizarBotones();
    }

    renderizarListaFirmas() {
        const contenedor = document.getElementById('listaFirmas');
        if (!this.firmas.length) {
            contenedor.innerHTML = '<small class="text-muted">Aun no hay firmas agregadas.</small>';
            return;
        }

        contenedor.innerHTML = this.firmas.map((firma, indice) => `
            <div class="d-flex align-items-center justify-content-between py-1 border-bottom">
                <div>
                    <small class="text-muted">Pagina ${firma.pagina} | X ${Math.round(firma.xPercent * 100)}% | Y ${Math.round(firma.yPercent * 100)}% | Ancho ${Math.round(firma.anchoPercent * 100)}%</small>
                </div>
                <button class="btn btn-sm btn-outline-secondary" data-indice="${indice}">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        `).join('');
    }

    obtenerConfiguracionFirma(pageWidth, firma) {
        const xPercent = firma ? firma.xPercent : Number(document.getElementById('posicionX').value) / 100;
        const yPercent = firma ? firma.yPercent : Number(document.getElementById('posicionY').value) / 100;
        const anchoPercent = firma ? firma.anchoPercent : Number(document.getElementById('anchoFirma').value) / 100;
        const firmaAncho = pageWidth * anchoPercent;
        const firmaAlto = firmaAncho * (this.firmaImagen.height / this.firmaImagen.width);
        return {
            x: pageWidth * xPercent,
            y: null,
            width: firmaAncho,
            height: firmaAlto,
            yPercent
        };
    }

    obtenerFirmasPagina() {
        if (!this.firmas.length) {
            return [{
                pagina: this.obtenerIndicePagina(),
                xPercent: Number(document.getElementById('posicionX').value) / 100,
                yPercent: Number(document.getElementById('posicionY').value) / 100,
                anchoPercent: Number(document.getElementById('anchoFirma').value) / 100
            }];
        }
        const pagina = this.obtenerIndicePagina();
        return this.firmas.filter((firma) => firma.pagina === pagina);
    }

    obtenerFirmasPaginaPorNumero(pagina) {
        if (!this.firmas.length) {
            return [{
                pagina,
                xPercent: Number(document.getElementById('posicionX').value) / 100,
                yPercent: Number(document.getElementById('posicionY').value) / 100,
                anchoPercent: Number(document.getElementById('anchoFirma').value) / 100
            }];
        }
        return this.firmas.filter((firma) => firma.pagina === pagina);
    }

    async previsualizar() {
        if (!this.pdfDoc || !this.firmaImagen) return;
        const pagina = this.obtenerPaginaObjetivo();
        if (!pagina) return;

        const lienzo = document.getElementById('lienzoPrevia');
        const contexto = lienzo.getContext('2d');
        const viewport = pagina.getViewport({ scale: 1.1 });
        lienzo.width = viewport.width;
        lienzo.height = viewport.height;

        await pagina.render({ canvasContext: contexto, viewport }).promise;

        const firmas = this.obtenerFirmasPagina();
        firmas.forEach((firma) => {
            const config = this.obtenerConfiguracionFirma(viewport.width, firma);
            const yPos = viewport.height * config.yPercent - config.height;
            contexto.drawImage(this.firmaImagen, config.x, yPos, config.width, config.height);
        });
        this.actualizarEstado('Previsualizacion lista.', 100);
    }

    async firmarPdf() {
        if (!this.pdfDoc || !this.firmaImagen) return;

        const paginaObjetivo = this.obtenerIndicePagina();
        const paginasObjetivo = this.firmas.length
            ? this.firmas
                .map((firma) => firma.pagina)
                .filter((pagina) => pagina >= 1 && pagina <= this.pdfDoc.numPages)
            : (paginaObjetivo >= 1 && paginaObjetivo <= this.pdfDoc.numPages ? [paginaObjetivo] : []);

        if (!paginasObjetivo.length) {
            UtilsUI.mostrarNotificacion('Pagina fuera de rango', 'warning');
            return;
        }

        document.getElementById('botonFirmar').disabled = true;
        this.actualizarEstado('Firmando PDF...', 0);

        try {
            const { jsPDF } = window.jspdf;
            let pdfSalida = null;

            for (let pagina = 1; pagina <= this.pdfDoc.numPages; pagina += 1) {
                const page = await this.pdfDoc.getPage(pagina);
                const viewport = page.getViewport({ scale: 1.0 });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                const contexto = canvas.getContext('2d');

                await page.render({ canvasContext: contexto, viewport }).promise;

                if (paginasObjetivo.includes(pagina)) {
                    const firmas = this.obtenerFirmasPaginaPorNumero(pagina);
                    firmas.forEach((firma) => {
                        const config = this.obtenerConfiguracionFirma(viewport.width, firma);
                        const yPos = viewport.height * config.yPercent - config.height;
                        contexto.drawImage(this.firmaImagen, config.x, yPos, config.width, config.height);
                    });
                }

                const imagen = canvas.toDataURL('image/jpeg', 0.92);
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
                const progreso = Math.round((pagina / this.pdfDoc.numPages) * 100);
                this.actualizarEstado(`Procesando pagina ${pagina} de ${this.pdfDoc.numPages}...`, progreso);
            }

            this.pdfFirmado = pdfSalida.output('blob');
            document.getElementById('botonDescargar').disabled = false;
            this.actualizarEstado('PDF firmado correctamente.', 100);
            UtilsUI.mostrarNotificacion('PDF firmado correctamente', 'success', 1500);
        } catch (error) {
            console.error(error);
            UtilsUI.mostrarNotificacion('Error al firmar el PDF', 'error');
            this.actualizarEstado('Error al firmar el PDF.', 0);
        } finally {
            document.getElementById('botonFirmar').disabled = false;
        }
    }

    obtenerIndicePagina() {
        return parseInt(document.getElementById('paginaFirma').value, 10) || 1;
    }

    obtenerPaginaObjetivo() {
        const indice = this.obtenerIndicePagina();
        if (!this.pdfDoc || indice < 1 || indice > this.pdfDoc.numPages) {
            return null;
        }
        return this.pdfDoc.getPage(indice);
    }

    actualizarEstado(texto, porcentaje) {
        document.getElementById('estadoProceso').textContent = texto;
        document.getElementById('barraProgreso').style.width = `${porcentaje}%`;
    }

    descargarPdf() {
        if (!this.pdfFirmado) return;
        const url = URL.createObjectURL(this.pdfFirmado);
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = 'pdf_firmado.pdf';
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    }
}

window.firmadorPDF = new FirmadorPDF();
