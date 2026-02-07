class DivisorUnificadorPDF {
    constructor() {
        this.pdfUnificado = null;
        this.pdfDividido = null;
        this.archivosUnificar = [];
    }

    renderizar() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-file text-primary me-2"></i>Divisor / Unificador de PDF</h2>
                            <p class="text-muted mb-0">Combina o separa PDFs usando jsPDF y renderizado en Canvas</p>
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
                                <i class="bi bi-layer-forward me-2"></i>Unificar PDFs
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row g-3 align-items-end">
                                <div class="col-md-8">
                                    <label class="form-label fw-bold" for="archivosUnificar">Selecciona varios PDFs</label>
                                    <input type="file" id="archivosUnificar" class="form-control" accept="application/pdf" multiple>
                                </div>
                                <div class="col-md-4 d-grid">
                                    <button id="botonUnificar" class="btn btn-success" disabled>
                                        <i class="bi bi-arrow-right me-1"></i>Unificar PDF
                                    </button>
                                </div>
                            </div>
                            <div class="mt-3">
                                <label class="form-label fw-bold">Orden de archivos</label>
                                <div id="listaArchivosUnificar" class="border rounded p-2 bg-light">
                                    <small class="text-muted">No hay archivos seleccionados.</small>
                                </div>
                            </div>
                            <div class="mt-3 d-flex flex-wrap gap-2">
                                <button id="botonDescargarUnificado" class="btn btn-outline-success" disabled>
                                    <i class="bi bi-download me-1"></i>Descargar PDF
                                </button>
                            </div>
                            <div class="mt-3">
                                <div class="progress" style="height: 10px;">
                                    <div class="progress-bar" id="barraProgresoUnificar" role="progressbar" style="width: 0%;"></div>
                                </div>
                                <div class="mt-2 text-muted">
                                    <small id="estadoUnificar">Selecciona PDFs para iniciar.</small>
                                </div>
                            </div>
                            <div class="mt-3">
                                <ul class="list-unstyled text-muted mb-0">
                                    <li><strong>Paginas totales:</strong> <span id="paginasUnificadas">-</span></li>
                                    <li><strong>Tamano final:</strong> <span id="tamanoUnificado">-</span></li>
                                </ul>
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
                                <i class="bi bi-scissors me-2"></i>Dividir PDF
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row g-3 align-items-end">
                                <div class="col-md-6">
                                    <label class="form-label fw-bold" for="archivoDividir">Selecciona un PDF</label>
                                    <input type="file" id="archivoDividir" class="form-control" accept="application/pdf">
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="rangoPaginas">Rango de paginas</label>
                                    <input type="text" id="rangoPaginas" class="form-control" placeholder="1-3,5">
                                </div>
                                <div class="col-md-3">
                                    <label class="form-label fw-bold" for="modoDivision">Salida</label>
                                    <select id="modoDivision" class="form-select">
                                        <option value="unico" selected>Un PDF con el rango</option>
                                        <option value="por-pagina">Un PDF por pagina</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mt-3 d-flex flex-wrap gap-2">
                                <button id="botonDividir" class="btn btn-primary" disabled>
                                    <i class="bi bi-arrow-right me-1"></i>Dividir PDF
                                </button>
                                <button id="botonDescargarDividido" class="btn btn-outline-success" disabled>
                                    <i class="bi bi-download me-1"></i>Descargar PDF
                                </button>
                            </div>
                            <div class="mt-3">
                                <div class="progress" style="height: 10px;">
                                    <div class="progress-bar" id="barraProgresoDividir" role="progressbar" style="width: 0%;"></div>
                                </div>
                                <div class="mt-2 text-muted">
                                    <small id="estadoDividir">Selecciona un PDF para iniciar.</small>
                                </div>
                            </div>
                            <div class="mt-3">
                                <ul class="list-unstyled text-muted mb-0">
                                    <li><strong>Paginas seleccionadas:</strong> <span id="paginasDivididas">-</span></li>
                                    <li><strong>Tamano final:</strong> <span id="tamanoDividido">-</span></li>
                                </ul>
                            </div>
                            <div class="mt-3">
                                <label class="form-label fw-bold">Previsualizacion (primeras paginas)</label>
                                <div id="previsualizacionPaginas" class="d-flex flex-wrap gap-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="alert alert-warning" id="avisoLibrerias" style="display: none;">
                <i class="bi bi-exclamation-triangle me-1"></i>
                Faltan librerias PDF.js y/o jsPDF para procesar.
            </div>
        `;

        this.configurarEventos();
        this.validarLibrerias();
    }

    configurarEventos() {
        this.configurarFavoritos();

        document.getElementById('archivosUnificar').addEventListener('change', (e) => {
            const archivos = Array.from(e.target.files || []);
            this.archivosUnificar = archivos;
            this.renderizarListaArchivos();
            document.getElementById('botonUnificar').disabled = this.archivosUnificar.length === 0;
            document.getElementById('botonDescargarUnificado').disabled = true;
            this.actualizarEstadoUnificar('Listo para unificar.', 0);
        });

        document.getElementById('archivoDividir').addEventListener('change', (e) => {
            const archivo = e.target.files[0];
            document.getElementById('botonDividir').disabled = !archivo;
            document.getElementById('botonDescargarDividido').disabled = true;
            this.actualizarEstadoDividir('Listo para dividir.', 0);
            this.previsualizarPaginas(archivo);
        });

        document.getElementById('botonUnificar').addEventListener('click', () => {
            this.unificarPdf();
        });

        document.getElementById('botonDividir').addEventListener('click', () => {
            this.dividirPdf();
        });

        document.getElementById('botonDescargarUnificado').addEventListener('click', () => {
            this.descargarPdf(this.pdfUnificado, 'pdf_unificado.pdf');
        });

        document.getElementById('botonDescargarDividido').addEventListener('click', () => {
            this.descargarPdf(this.pdfDividido, 'pdf_dividido.pdf');
        });

        const lista = document.getElementById('listaArchivosUnificar');
        lista.addEventListener('click', (e) => {
            const boton = e.target.closest('button[data-accion]');
            if (!boton) return;
            const indice = parseInt(boton.dataset.indice, 10);
            if (Number.isNaN(indice)) return;
            if (boton.dataset.accion === 'arriba') {
                this.moverArchivo(indice, indice - 1);
            }
            if (boton.dataset.accion === 'abajo') {
                this.moverArchivo(indice, indice + 1);
            }
        });

        lista.addEventListener('dragstart', (e) => {
            const fila = e.target.closest('[data-draggable="archivo"]');
            if (!fila) return;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', fila.dataset.indice);
        });

        lista.addEventListener('dragover', (e) => {
            const fila = e.target.closest('[data-draggable="archivo"]');
            if (!fila) return;
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        lista.addEventListener('drop', (e) => {
            const fila = e.target.closest('[data-draggable="archivo"]');
            if (!fila) return;
            e.preventDefault();
            const origen = parseInt(e.dataTransfer.getData('text/plain'), 10);
            const destino = parseInt(fila.dataset.indice, 10);
            if (Number.isNaN(origen) || Number.isNaN(destino)) return;
            this.moverArchivo(origen, destino);
        });
    }

    configurarFavoritos() {
        const boton = document.getElementById('botonFavoritos');
        const icono = document.getElementById('iconoFavoritos');
        const texto = document.getElementById('textoFavoritos');

        if (!boton || !icono || !texto) return;

        const esFavorito = GestorFavoritos.esFavorito('divisor-unificador-pdf');

        if (esFavorito) {
            icono.className = 'bi bi-star-fill me-1';
            texto.textContent = 'En Favoritos';
        }

        boton.addEventListener('click', () => {
            const nuevoEstado = GestorFavoritos.alternarFavorito('divisor-unificador-pdf');
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

    async unificarPdf() {
        if (!this.validarLibrerias()) {
            UtilsUI.mostrarNotificacion('Faltan librerias para unificar PDFs', 'error');
            return;
        }

        const archivos = this.archivosUnificar;
        if (!archivos.length) {
            UtilsUI.mostrarNotificacion('Selecciona PDFs para unificar', 'warning');
            return;
        }

        document.getElementById('botonUnificar').disabled = true;
        this.actualizarEstadoUnificar('Cargando PDFs...', 0);

        try {
            const { jsPDF } = window.jspdf;
            let pdfSalida = null;
            let paginasTotales = 0;
            let paginasProcesadas = 0;

            for (const archivo of archivos) {
                const buffer = await archivo.arrayBuffer();
                const documento = await window.pdfjsLib.getDocument({ data: buffer }).promise;
                paginasTotales += documento.numPages;

                for (let pagina = 1; pagina <= documento.numPages; pagina += 1) {
                    const page = await documento.getPage(pagina);
                    const viewport = page.getViewport({ scale: 1.0 });
                    const imagen = await this.renderizarPagina(page, viewport);
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

                    paginasProcesadas += 1;
                    const progreso = Math.round((paginasProcesadas / paginasTotales) * 100);
                    this.actualizarEstadoUnificar(`Procesando pagina ${paginasProcesadas} de ${paginasTotales}...`, progreso);
                }
            }

            const blob = pdfSalida.output('blob');
            this.pdfUnificado = blob;
            document.getElementById('botonDescargarUnificado').disabled = false;
            document.getElementById('paginasUnificadas').textContent = paginasTotales;
            document.getElementById('tamanoUnificado').textContent = UtilsUI.formatearTamano(blob.size);
            this.actualizarEstadoUnificar('Unificacion terminada.', 100);
            UtilsUI.mostrarNotificacion('PDFs unificados correctamente', 'success', 1500);
        } catch (error) {
            console.error(error);
            UtilsUI.mostrarNotificacion('Error al unificar PDFs', 'error');
            this.actualizarEstadoUnificar('Error al procesar PDFs.', 0);
        } finally {
            document.getElementById('botonUnificar').disabled = false;
        }
    }

    async dividirPdf() {
        if (!this.validarLibrerias()) {
            UtilsUI.mostrarNotificacion('Faltan librerias para dividir PDFs', 'error');
            return;
        }

        const archivo = document.getElementById('archivoDividir').files[0];
        if (!archivo) {
            UtilsUI.mostrarNotificacion('Selecciona un PDF para dividir', 'warning');
            return;
        }

        document.getElementById('botonDividir').disabled = true;
        this.actualizarEstadoDividir('Cargando PDF...', 0);

        try {
            const buffer = await archivo.arrayBuffer();
            const documento = await window.pdfjsLib.getDocument({ data: buffer }).promise;
            const total = documento.numPages;
            const rangoTexto = document.getElementById('rangoPaginas').value.trim();
            const paginas = this.parsearRango(rangoTexto, total);
            const modo = document.getElementById('modoDivision').value;

            if (paginas.length === 0) {
                UtilsUI.mostrarNotificacion('Rango invalido o vacio', 'warning');
                this.actualizarEstadoDividir('Rango invalido.', 0);
                return;
            }

            document.getElementById('paginasDivididas').textContent = paginas.length;

            if (modo === 'por-pagina') {
                let procesadas = 0;
                for (const pagina of paginas) {
                    const page = await documento.getPage(pagina);
                    const viewport = page.getViewport({ scale: 1.0 });
                    const imagen = await this.renderizarPagina(page, viewport);
                    const orientacion = viewport.width > viewport.height ? 'l' : 'p';
                    const { jsPDF } = window.jspdf;
                    const pdfSalida = new jsPDF({
                        orientation: orientacion,
                        unit: 'pt',
                        format: [viewport.width, viewport.height]
                    });
                    pdfSalida.addImage(imagen, 'JPEG', 0, 0, viewport.width, viewport.height, undefined, 'FAST');
                    const blob = pdfSalida.output('blob');
                    this.descargarPdf(blob, `pagina_${pagina}.pdf`);
                    procesadas += 1;
                    const progreso = Math.round((procesadas / paginas.length) * 100);
                    this.actualizarEstadoDividir(`Descargando pagina ${pagina}...`, progreso);
                }

                this.pdfDividido = null;
                document.getElementById('botonDescargarDividido').disabled = true;
                document.getElementById('tamanoDividido').textContent = '-';
                this.actualizarEstadoDividir('Division por pagina completada.', 100);
                UtilsUI.mostrarNotificacion('Paginas descargadas', 'success', 1500);
                return;
            }

            const { jsPDF } = window.jspdf;
            let pdfSalida = null;
            let procesadas = 0;
            for (const pagina of paginas) {
                const page = await documento.getPage(pagina);
                const viewport = page.getViewport({ scale: 1.0 });
                const imagen = await this.renderizarPagina(page, viewport);
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
                procesadas += 1;
                const progreso = Math.round((procesadas / paginas.length) * 100);
                this.actualizarEstadoDividir(`Procesando pagina ${pagina}...`, progreso);
            }

            const blob = pdfSalida.output('blob');
            this.pdfDividido = blob;
            document.getElementById('tamanoDividido').textContent = UtilsUI.formatearTamano(blob.size);
            document.getElementById('botonDescargarDividido').disabled = false;
            this.actualizarEstadoDividir('Division terminada.', 100);
            UtilsUI.mostrarNotificacion('PDF dividido correctamente', 'success', 1500);
        } catch (error) {
            console.error(error);
            UtilsUI.mostrarNotificacion('Error al dividir PDF', 'error');
            this.actualizarEstadoDividir('Error al procesar PDF.', 0);
        } finally {
            document.getElementById('botonDividir').disabled = false;
        }
    }

        renderizarListaArchivos() {
            const contenedor = document.getElementById('listaArchivosUnificar');
            if (!this.archivosUnificar.length) {
                contenedor.innerHTML = '<small class="text-muted">No hay archivos seleccionados.</small>';
                return;
            }

            contenedor.innerHTML = this.archivosUnificar.map((archivo, indice) => `
                <div class="d-flex align-items-center justify-content-between py-1 border-bottom"
                     data-draggable="archivo" draggable="true" data-indice="${indice}">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-file me-2"></i>
                        <span>${archivo.name}</span>
                    </div>
                    <div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-outline-secondary" data-accion="arriba" data-indice="${indice}" ${indice === 0 ? 'disabled' : ''}>
                            <i class="bi bi-arrow-up"></i>
                        </button>
                        <button class="btn btn-outline-secondary" data-accion="abajo" data-indice="${indice}" ${indice === this.archivosUnificar.length - 1 ? 'disabled' : ''}>
                            <i class="bi bi-arrow-down"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        moverArchivo(origen, destino) {
            if (destino < 0 || destino >= this.archivosUnificar.length) return;
            const copia = [...this.archivosUnificar];
            const [item] = copia.splice(origen, 1);
            copia.splice(destino, 0, item);
            this.archivosUnificar = copia;
            this.renderizarListaArchivos();
        }

        async previsualizarPaginas(archivo) {
            const contenedor = document.getElementById('previsualizacionPaginas');
            contenedor.innerHTML = '';

            if (!archivo || !this.validarLibrerias()) {
                contenedor.innerHTML = '<small class="text-muted">Sin previsualizacion.</small>';
                return;
            }

            try {
                const buffer = await archivo.arrayBuffer();
                const documento = await window.pdfjsLib.getDocument({ data: buffer }).promise;
                const total = Math.min(documento.numPages, 8);

                for (let pagina = 1; pagina <= total; pagina += 1) {
                    const page = await documento.getPage(pagina);
                    const viewport = page.getViewport({ scale: 0.35 });
                    const canvas = document.createElement('canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    canvas.className = 'border rounded';
                    const contexto = canvas.getContext('2d');
                    await page.render({ canvasContext: contexto, viewport }).promise;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'text-center';
                    const label = document.createElement('small');
                    label.className = 'text-muted d-block mt-1';
                    label.textContent = `Pag ${pagina}`;
                    wrapper.appendChild(canvas);
                    wrapper.appendChild(label);
                    contenedor.appendChild(wrapper);
                }
            } catch (error) {
                console.error(error);
                contenedor.innerHTML = '<small class="text-muted">No se pudo generar la previsualizacion.</small>';
            }
        }

    async renderizarPagina(page, viewport) {
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const contexto = canvas.getContext('2d');
        await page.render({ canvasContext: contexto, viewport }).promise;
        return canvas.toDataURL('image/jpeg', 0.95);
    }

    parsearRango(texto, totalPaginas) {
        if (!texto) {
            return Array.from({ length: totalPaginas }, (_, i) => i + 1);
        }

        const resultado = new Set();
        const partes = texto.split(',').map((item) => item.trim()).filter(Boolean);
        for (const parte of partes) {
            if (parte.includes('-')) {
                const [inicio, fin] = parte.split('-').map((valor) => parseInt(valor.trim(), 10));
                if (Number.isNaN(inicio) || Number.isNaN(fin)) continue;
                const desde = Math.max(1, Math.min(inicio, fin));
                const hasta = Math.min(totalPaginas, Math.max(inicio, fin));
                for (let i = desde; i <= hasta; i += 1) {
                    resultado.add(i);
                }
            } else {
                const pagina = parseInt(parte, 10);
                if (!Number.isNaN(pagina) && pagina >= 1 && pagina <= totalPaginas) {
                    resultado.add(pagina);
                }
            }
        }

        return Array.from(resultado).sort((a, b) => a - b);
    }

    actualizarEstadoUnificar(texto, porcentaje) {
        document.getElementById('estadoUnificar').textContent = texto;
        document.getElementById('barraProgresoUnificar').style.width = `${porcentaje}%`;
    }

    actualizarEstadoDividir(texto, porcentaje) {
        document.getElementById('estadoDividir').textContent = texto;
        document.getElementById('barraProgresoDividir').style.width = `${porcentaje}%`;
    }

    descargarPdf(blob, nombreArchivo) {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = nombreArchivo;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    }
}

window.divisorUnificadorPDF = new DivisorUnificadorPDF();
