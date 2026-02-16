class RedactorImagenes {
    constructor() {
        this.imagen = null;
        this.canvas = null;
        this.ctx = null;
        this.seleccionando = false;
        this.rectangulos = [];
        this.rectanguloActual = null;
        this.startX = 0;
        this.startY = 0;
        this.escala = 1;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    render(container) {
        container.innerHTML = `
            <div class="row">
                <div class="col-lg-3">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-upload me-2"></i>
                                Cargar Imagen
                            </h5>
                        </div>
                        <div class="card-body">
                            <input type="file" class="form-control mb-3" id="inputImagen" accept="image/*">
                            <div class="text-center">
                                <button class="btn btn-primary" id="cargarImagen" disabled>
                                    <i class="bi bi-image"></i> Cargar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-4" id="panelHerramientas" style="display: none;">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-tools me-2"></i>
                                Herramientas
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Modo de Redacción</label>
                                <div class="btn-group-vertical d-grid gap-2">
                                    <input type="radio" class="btn-check" name="modoRedaccion" id="modoPixelar" value="pixelar" checked>
                                    <label class="btn btn-outline-primary" for="modoPixelar">
                                        <i class="bi bi-list me-2"></i>Pixelar
                                    </label>
                                    
                                    <input type="radio" class="btn-check" name="modoRedaccion" id="modoTapar" value="tapar">
                                    <label class="btn btn-outline-primary" for="modoTapar">
                                        <i class="bi bi-gear me-2"></i>Tapar (Negro)
                                    </label>
                                    
                                    <input type="radio" class="btn-check" name="modoRedaccion" id="modoDesenfoque" value="desenfocar">
                                    <label class="btn btn-outline-primary" for="modoDesenfoque">
                                        <i class="bi bi-gear me-2"></i>Desenfocar
                                    </label>
                                </div>
                            </div>
                            <div class="mb-3" id="opcionesPixelado">
                                <label class="form-label">Tamaño del Pixel</label>
                                <input type="range" class="form-range" id="tamanoPixel" min="5" max="50" value="15">
                                <small class="text-muted">Tamaño: <span id="valorPixel">15</span>px</small>
                            </div>

                            <div class="mb-3" id="opcionesDesenfoque" style="display: none;">
                                <label class="form-label">Intensidad del Desenfoque</label>
                                <input type="range" class="form-range" id="intensidadDesenfoque" min="5" max="30" value="15">
                                <small class="text-muted">Intensidad: <span id="valorDesenfoque">15</span>px</small>
                            </div>
                            <div class="d-grid gap-2">
                                <button class="btn btn-warning" id="deshacerUltimo" disabled>
                                    <i class="bi bi-arrow-left"></i> Deshacer Último
                                </button>
                                <button class="btn btn-danger" id="limpiarTodo" disabled>
                                    <i class="bi bi-trash"></i> Limpiar Todo
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card" id="panelDescargar" style="display: none;">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-download me-2"></i>
                                Descargar
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Formato</label>
                                <select class="form-select" id="formatoDescarga">
                                    <option value="png">PNG (recomendado)</option>
                                    <option value="jpeg">JPEG</option>
                                    <option value="webp">WebP</option>
                                </select>
                            </div>
                            <div class="mb-3" id="opcionesCalidad" style="display: none;">
                                <label class="form-label">Calidad</label>
                                <input type="range" class="form-range" id="calidad" min="0.1" max="1.0" step="0.1" value="0.9">
                                <small class="text-muted">Calidad: <span id="valorCalidad">90</span>%</small>
                            </div>
                            <div class="d-grid">
                                <button class="btn btn-success" id="descargarImagen">
                                    <i class="bi bi-download"></i> Descargar Imagen
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-image me-2"></i>
                                Editor de Imagen
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="contenedorCanvas" class="text-center" style="border: 2px dashed #ccc; padding: 20px; min-height: 400px; overflow: auto;">
                                <p class="text-muted">
                                    <i class="bi bi-image" style="font-size: 3rem;"></i><br>
                                    Carga una imagen para comenzar a editarla
                                </p>
                            </div>            
                            <div id="instrucciones" class="alert alert-info mt-3" style="display: none;">
                                <i class="bi bi-info-circle me-2"></i>
                                <strong>Instrucciones:</strong>
                                <ul class="mb-0 mt-2">
                                    <li>Haz clic y arrastra para seleccionar el área a redactar</li>
                                    <li>Usa las herramientas de la izquierda para cambiar el modo de redacción</li>
                                    <li>Puedes hacer múltiples selecciones</li>
                                    <li>Deshacer el último cambio o limpiar todo si es necesario</li>
                                </ul>
                            </div>
                            <div id="estadisticas" class="mt-3" style="display: none;">
                                <div class="row text-center">
                                    <div class="col-md-3">
                                        <div class="border p-2 rounded">
                                            <strong id="dimensionesOriginales">0 x 0</strong>
                                            <small class="d-block text-muted">Dimensiones originales</small>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="border p-2 rounded">
                                            <strong id="tamanoArchivo">0 KB</strong>
                                            <small class="d-block text-muted">Tamaño original</small>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="border p-2 rounded">
                                            <strong id="zonasRedactadas">0</strong>
                                            <small class="d-block text-muted">Zonas redactadas</small>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="border p-2 rounded">
                                            <strong id="escalaActual">100%</strong>
                                            <small class="d-block text-muted">Escala de vista</small>
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
    }

    configurarEventos() {
        document.getElementById('inputImagen').addEventListener('change', (e) => {
            const archivo = e.target.files[0];
            if (archivo) {
                document.getElementById('cargarImagen').disabled = false;
            }
        });

        document.getElementById('cargarImagen').addEventListener('click', () => {
            this.cargarImagen();
        });

        document.querySelectorAll('input[name="modoRedaccion"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.cambiarModoRedaccion(e.target.value);
            });
        });

        document.getElementById('tamanoPixel').addEventListener('input', (e) => {
            document.getElementById('valorPixel').textContent = e.target.value;
        });

        document.getElementById('intensidadDesenfoque').addEventListener('input', (e) => {
            document.getElementById('valorDesenfoque').textContent = e.target.value;
        });

        document.getElementById('formatoDescarga').addEventListener('change', (e) => {
            const opcionesCalidad = document.getElementById('opcionesCalidad');
            if (e.target.value === 'jpeg' || e.target.value === 'webp') {
                opcionesCalidad.style.display = 'block';
            } else {
                opcionesCalidad.style.display = 'none';
            }
        });

        document.getElementById('calidad').addEventListener('input', (e) => {
            const valor = Math.round(e.target.value * 100);
            document.getElementById('valorCalidad').textContent = valor;
        });

        document.getElementById('deshacerUltimo').addEventListener('click', () => {
            this.deshacerUltimo();
        });

        document.getElementById('limpiarTodo').addEventListener('click', () => {
            this.limpiarTodo();
        });

        document.getElementById('descargarImagen').addEventListener('click', () => {
            this.descargarImagen();
        });
    }

    cargarImagen() {
        const archivo = document.getElementById('inputImagen').files[0];
        if (!archivo) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.imagen = img;
                this.inicializarCanvas();
                this.mostrarPaneles();
                this.actualizarEstadisticas();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(archivo);
    }

    inicializarCanvas() {
        const contenedor = document.getElementById('contenedorCanvas');
        contenedor.innerHTML = '';
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        const maxWidth = contenedor.clientWidth - 40;
        const maxHeight = 600;
        
        const escalaX = maxWidth / this.imagen.width;
        const escalaY = maxHeight / this.imagen.height;
        this.escala = Math.min(escalaX, escalaY, 1);
        
        this.canvas.width = this.imagen.width * this.escala;
        this.canvas.height = this.imagen.height * this.escala;
        this.canvas.style.border = '2px solid #007bff';
        this.canvas.style.cursor = 'crosshair';
        this.canvas.style.display = 'block';
        this.canvas.style.margin = '0 auto';
    
        this.dibujarImagen();
        this.configurarEventosCanvas();
        contenedor.appendChild(this.canvas);
    }

    configurarEventosCanvas() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.iniciarSeleccion(e);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.actualizarSeleccion(e);
        });

        this.canvas.addEventListener('mouseup', (e) => {
            this.finalizarSeleccion(e);
        });

        this.canvas.addEventListener('mouseleave', () => {
            if (this.seleccionando) {
                this.finalizarSeleccion();
            }
        });
    }

    iniciarSeleccion(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.startX = (e.clientX - rect.left) / this.escala;
        this.startY = (e.clientY - rect.top) / this.escala;
        this.seleccionando = true;
        this.rectanguloActual = {
            x: this.startX,
            y: this.startY,
            width: 0,
            height: 0
        };
    }

    actualizarSeleccion(e) {
        if (!this.seleccionando) return;

        const rect = this.canvas.getBoundingClientRect();
        const currentX = (e.clientX - rect.left) / this.escala;
        const currentY = (e.clientY - rect.top) / this.escala;
        this.rectanguloActual.width = currentX - this.startX;
        this.rectanguloActual.height = currentY - this.startY;

        this.dibujarImagen();
        this.dibujarSeleccionTemporal();
    }

    finalizarSeleccion(e) {
        if (!this.seleccionando || !this.rectanguloActual) return;
        this.seleccionando = false;

        if (Math.abs(this.rectanguloActual.width) > 5 && Math.abs(this.rectanguloActual.height) > 5) {
            const rect = {
                x: Math.min(this.startX, this.startX + this.rectanguloActual.width),
                y: Math.min(this.startY, this.startY + this.rectanguloActual.height),
                width: Math.abs(this.rectanguloActual.width),
                height: Math.abs(this.rectanguloActual.height),
                modo: document.querySelector('input[name="modoRedaccion"]:checked').value
            };

            this.rectangulos.push(rect);
            this.aplicarRedaccion(rect);
            this.actualizarContadores();
        }

        this.rectanguloActual = null;
    }

    aplicarRedaccion(rectangulo) {
        const modo = rectangulo.modo;
        
        switch (modo) {
            case 'pixelar':
                this.pixelarArea(rectangulo);
                break;
            case 'tapar':
                this.taparArea(rectangulo);
                break;
            case 'desenfocar':
                this.desenfocarArea(rectangulo);
                break;
        }
    }

    pixelarArea(rectangulo) {
        const tamanoPixel = parseInt(document.getElementById('tamanoPixel').value);
        
        const imageData = this.ctx.getImageData(
            rectangulo.x * this.escala,
            rectangulo.y * this.escala,
            rectangulo.width * this.escala,
            rectangulo.height * this.escala
        );
        
        const pixelado = this.aplicarPixelado(imageData, tamanoPixel * this.escala);
        
        this.ctx.putImageData(
            pixelado,
            rectangulo.x * this.escala,
            rectangulo.y * this.escala
        );
    }

    aplicarPixelado(imageData, tamanoPixel) {
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        
        for (let y = 0; y < height; y += tamanoPixel) {
            for (let x = 0; x < width; x += tamanoPixel) {
                let r = 0, g = 0, b = 0, a = 0;
                let count = 0;
                
                for (let dy = 0; dy < tamanoPixel && y + dy < height; dy++) {
                    for (let dx = 0; dx < tamanoPixel && x + dx < width; dx++) {
                        const idx = ((y + dy) * width + (x + dx)) * 4;
                        r += data[idx];
                        g += data[idx + 1];
                        b += data[idx + 2];
                        a += data[idx + 3];
                        count++;
                    }
                }
                
                r = Math.floor(r / count);
                g = Math.floor(g / count);
                b = Math.floor(b / count);
                a = Math.floor(a / count);
                
                for (let dy = 0; dy < tamanoPixel && y + dy < height; dy++) {
                    for (let dx = 0; dx < tamanoPixel && x + dx < width; dx++) {
                        const idx = ((y + dy) * width + (x + dx)) * 4;
                        data[idx] = r;
                        data[idx + 1] = g;
                        data[idx + 2] = b;
                        data[idx + 3] = a;
                    }
                }
            }
        }
        
        return imageData;
    }

    taparArea(rectangulo) {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(
            rectangulo.x * this.escala,
            rectangulo.y * this.escala,
            rectangulo.width * this.escala,
            rectangulo.height * this.escala
        );
    }

    desenfocarArea(rectangulo) {
        const intensidad = parseInt(document.getElementById('intensidadDesenfoque').value);
        
        const imageData = this.ctx.getImageData(
            rectangulo.x * this.escala,
            rectangulo.y * this.escala,
            rectangulo.width * this.escala,
            rectangulo.height * this.escala
        );
        
        const desenfocado = this.aplicarDesenfoque(imageData, intensidad);

        this.ctx.putImageData(
            desenfocado,
            rectangulo.x * this.escala,
            rectangulo.y * this.escala
        );
    }

    aplicarDesenfoque(imageData, radio) {
        const data = imageData.data;
        const width = imageData.width;
        const height = imageData.height;
        const output = new Uint8ClampedArray(data);
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let r = 0, g = 0, b = 0, a = 0;
                let count = 0;
                
                for (let dy = -radio; dy <= radio; dy++) {
                    for (let dx = -radio; dx <= radio; dx++) {
                        const ny = y + dy;
                        const nx = x + dx;
                        
                        if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
                            const idx = (ny * width + nx) * 4;
                            r += data[idx];
                            g += data[idx + 1];
                            b += data[idx + 2];
                            a += data[idx + 3];
                            count++;
                        }
                    }
                }
                
                const idx = (y * width + x) * 4;
                output[idx] = r / count;
                output[idx + 1] = g / count;
                output[idx + 2] = b / count;
                output[idx + 3] = a / count;
            }
        }
        
        return new ImageData(output, width, height);
    }

    dibujarImagen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.imagen, 0, 0, this.canvas.width, this.canvas.height);
    }

    dibujarSeleccionTemporal() {
        if (!this.rectanguloActual) return;

        this.ctx.strokeStyle = '#007bff';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]);
        this.ctx.strokeRect(
            this.rectanguloActual.x * this.escala,
            this.rectanguloActual.y * this.escala,
            this.rectanguloActual.width * this.escala,
            this.rectanguloActual.height * this.escala
        );
        this.ctx.setLineDash([]);
    }

    cambiarModoRedaccion(modo) {
        const opcionesPixelado = document.getElementById('opcionesPixelado');
        const opcionesDesenfoque = document.getElementById('opcionesDesenfoque');
        
        opcionesPixelado.style.display = 'none';
        opcionesDesenfoque.style.display = 'none';
        
        if (modo === 'pixelar') {
            opcionesPixelado.style.display = 'block';
        } else if (modo === 'desenfocar') {
            opcionesDesenfoque.style.display = 'block';
        }
    }

    deshacerUltimo() {
        if (this.rectangulos.length === 0) return;
        
        this.rectangulos.pop();
        this.redibujarTodo();
        this.actualizarContadores();
    }

    limpiarTodo() {
        this.rectangulos = [];
        this.redibujarTodo();
        this.actualizarContadores();
    }

    redibujarTodo() {
        this.dibujarImagen();
        
        this.rectangulos.forEach(rect => {
            this.aplicarRedaccion(rect);
        });
    }

    descargarImagen() {
        const formato = document.getElementById('formatoDescarga').value;
        const calidad = parseFloat(document.getElementById('calidad').value);
        
        let mimeType = 'image/png';
        let extension = 'png';
        
        if (formato === 'jpeg') {
            mimeType = 'image/jpeg';
            extension = 'jpg';
        } else if (formato === 'webp') {
            mimeType = 'image/webp';
            extension = 'webp';
        }
    
        const canvasDescarga = document.createElement('canvas');
        const ctxDescarga = canvasDescarga.getContext('2d');
        
        canvasDescarga.width = this.imagen.width;
        canvasDescarga.height = this.imagen.height;
        
        ctxDescarga.drawImage(this.imagen, 0, 0);
        
        this.rectangulos.forEach(rect => {
            this.aplicarRedaccionDescarga(ctxDescarga, rect);
        });
        
        const url = canvasDescarga.toDataURL(mimeType, calidad);
        const link = document.createElement('a');
        link.download = `imagen-redactada.${extension}`;
        link.href = url;
        link.click();
    }

    aplicarRedaccionDescarga(ctx, rectangulo) {
        const modo = rectangulo.modo;
        
        switch (modo) {
            case 'pixelar':
                this.pixelarAreaDescarga(ctx, rectangulo);
                break;
            case 'tapar':
                ctx.fillStyle = '#000000';
                ctx.fillRect(rectangulo.x, rectangulo.y, rectangulo.width, rectangulo.height);
                break;
            case 'desenfocar':
                this.desenfocarAreaDescarga(ctx, rectangulo);
                break;
        }
    }

    pixelarAreaDescarga(ctx, rectangulo) {
        const tamanoPixel = parseInt(document.getElementById('tamanoPixel').value);
        const imageData = ctx.getImageData(rectangulo.x, rectangulo.y, rectangulo.width, rectangulo.height);
        const pixelado = this.aplicarPixelado(imageData, tamanoPixel);
        ctx.putImageData(pixelado, rectangulo.x, rectangulo.y);
    }

    desenfocarAreaDescarga(ctx, rectangulo) {
        const intensidad = parseInt(document.getElementById('intensidadDesenfoque').value);
        const imageData = ctx.getImageData(rectangulo.x, rectangulo.y, rectangulo.width, rectangulo.height);
        const desenfocado = this.aplicarDesenfoque(imageData, intensidad);
        ctx.putImageData(desenfocado, rectangulo.x, rectangulo.y);
    }

    mostrarPaneles() {
        document.getElementById('panelHerramientas').style.display = 'block';
        document.getElementById('panelDescargar').style.display = 'block';
        document.getElementById('instrucciones').style.display = 'block';
        document.getElementById('estadisticas').style.display = 'block';
    }

    actualizarEstadisticas() {
        document.getElementById('dimensionesOriginales').textContent = `${this.imagen.width} x ${this.imagen.height}`;
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.imagen.width;
        canvas.height = this.imagen.height;
        ctx.drawImage(this.imagen, 0, 0);
        
        const dataURL = canvas.toDataURL('image/png');
        const tamanoBytes = Math.round((dataURL.length * 3) / 4);
        const tamanoKB = Math.round(tamanoBytes / 1024);
        
        document.getElementById('tamanoArchivo').textContent = `${tamanoKB} KB`;
        document.getElementById('escalaActual').textContent = `${Math.round(this.escala * 100)}%`;
    }

    actualizarContadores() {
        document.getElementById('zonasRedactadas').textContent = this.rectangulos.length;
        
        const deshacerBtn = document.getElementById('deshacerUltimo');
        const limpiarBtn = document.getElementById('limpiarTodo');
        
        const hayRectangulos = this.rectangulos.length > 0;
        deshacerBtn.disabled = !hayRectangulos;
        limpiarBtn.disabled = !hayRectangulos;
    }
}

if (typeof window !== 'undefined') {
    window.RedactorImagenes = RedactorImagenes;
}