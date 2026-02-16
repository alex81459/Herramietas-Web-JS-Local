class ExtractorColores {
    constructor() {
        this.imagen = null;
        this.canvas = null;
        this.ctx = null;
        this.coloresExtraidos = [];
        this.colorSeleccionado = null;
    }

    render(container) {
        container.innerHTML = `
            <div class="row">
                <div class="col-lg-4">
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
                                    <i class="bi bi-image"></i> Cargar Imagen
                                </button>
                            </div>
                            <div class="alert alert-info mt-3">
                                <small>
                                    <i class="bi bi-info-circle me-1"></i>
                                    Formatos soportados: JPG, PNG, WebP, GIF
                                </small>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-4" id="panelExtraccion" style="display: none;">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Configuración
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Número de colores a extraer</label>
                                <input type="range" class="form-range" id="numeroColores" min="5" max="50" value="16">
                                <small class="text-muted">Colores: <span id="valorColores">16</span></small>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Tolerancia de agrupación</label>
                                <input type="range" class="form-range" id="tolerancia" min="10" max="100" value="30">
                                <small class="text-muted">Tolerancia: <span id="valorTolerancia">30</span></small>
                            </div>

                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="ignorarNegro" checked>
                                <label class="form-check-label" for="ignorarNegro">
                                    Ignorar negro/gris muy oscuro
                                </label>
                            </div>

                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="ignorarBlanco" checked>
                                <label class="form-check-label" for="ignorarBlanco">
                                    Ignorar blanco/gris muy claro
                                </label>
                            </div>

                            <div class="d-grid">
                                <button class="btn btn-success" id="extraerColores">
                                    <i class="bi bi-gear"></i> Extraer Paleta
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card" id="panelExportar" style="display: none;">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-download me-2"></i>
                                Exportar Paleta
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="d-grid gap-2">
                                <button class="btn btn-outline-primary" id="copiarPaleta">
                                    <i class="bi bi-clipboard"></i> Copiar como CSS
                                </button>
                                <button class="btn btn-outline-primary" id="descargarPaleta">
                                    <i class="bi bi-download"></i> Descargar JSON
                                </button>
                                <button class="btn btn-outline-primary" id="descargarASE">
                                    <i class="bi bi-download"></i> Descargar ASE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-image me-2"></i>
                                Imagen
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="contenedorImagen" class="text-center" style="border: 2px dashed #ccc; padding: 20px; min-height: 300px;">
                                <p class="text-muted">
                                    <i class="bi bi-image" style="font-size: 3rem;"></i><br>
                                    Carga una imagen para extraer colores
                                </p>
                            </div>
                            
                            <div id="instrucciones" class="alert alert-info mt-3" style="display: none;">
                                <i class="bi bi-info-circle me-2"></i>
                                <strong>Instrucciones:</strong>
                                <ul class="mb-0 mt-2">
                                    <li>Haz clic en cualquier parte de la imagen para obtener el color exacto</li>
                                    <li>Usa "Extraer Paleta" para obtener los colores dominantes</li>
                                    <li>Haz clic en cualquier color de la paleta para ver detalles</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card" id="panelPaleta" style="display: none;">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Paleta de Colores
                            </h5>
                            <span class="badge bg-primary" id="contadorColores">0 colores</span>
                        </div>
                        <div class="card-body">
                            <div id="paletaColores" class="row">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="modalColor" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="bi bi-gear me-2"></i>
                                Detalle del Color
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-4 text-center">
                                    <div id="muestraColor" class="border rounded" style="width: 100%; height: 150px; margin-bottom: 15px;"></div>
                                    <button class="btn btn-outline-primary btn-sm" id="copiarColorActual">
                                        <i class="bi bi-clipboard"></i> Copiar HEX
                                    </button>
                                </div>
                                <div class="col-md-8">
                                    <div class="table-responsive">
                                        <table class="table table-sm">
                                            <tr>
                                                <td><strong>HEX:</strong></td>
                                                <td>
                                                    <code id="colorHEX">#000000</code>
                                                    <button class="btn btn-outline-secondary btn-sm ms-2" onclick="this.parentElement.parentElement.previousElementSibling.select(); document.execCommand('copy')">
                                                        <i class="bi bi-clipboard"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><strong>RGB:</strong></td>
                                                <td><code id="colorRGB">rgb(0, 0, 0)</code></td>
                                            </tr>
                                            <tr>
                                                <td><strong>HSL:</strong></td>
                                                <td><code id="colorHSL">hsl(0, 0%, 0%)</code></td>
                                            </tr>
                                            <tr>
                                                <td><strong>HSV:</strong></td>
                                                <td><code id="colorHSV">hsv(0, 0%, 0%)</code></td>
                                            </tr>
                                            <tr>
                                                <td><strong>CMYK:</strong></td>
                                                <td><code id="colorCMYK">cmyk(0, 0, 0, 100)</code></td>
                                            </tr>
                                        </table>
                                    </div>
                                    
                                    <div class="mt-3">
                                        <label class="form-label">Variaciones</label>
                                        <div id="variacionesColor" class="d-flex flex-wrap gap-2">
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

        document.getElementById('numeroColores').addEventListener('input', (e) => {
            document.getElementById('valorColores').textContent = e.target.value;
        });

        document.getElementById('tolerancia').addEventListener('input', (e) => {
            document.getElementById('valorTolerancia').textContent = e.target.value;
        });

        document.getElementById('extraerColores').addEventListener('click', () => {
            this.extraerColoresDominantes();
        });

        document.getElementById('copiarPaleta').addEventListener('click', () => {
            this.copiarPaletaCSS();
        });

        document.getElementById('descargarPaleta').addEventListener('click', () => {
            this.descargarPaletaJSON();
        });

        document.getElementById('descargarASE').addEventListener('click', () => {
            this.descargarPaletaASE();
        });

        document.getElementById('copiarColorActual').addEventListener('click', () => {
            this.copiarColorSeleccionado();
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
                this.mostrarImagen();
                this.mostrarPaneles();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(archivo);
    }

    mostrarImagen() {
        const contenedor = document.getElementById('contenedorImagen');
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        const maxWidth = 600;
        const maxHeight = 400;
        
        let width = this.imagen.width;
        let height = this.imagen.height;
        
        if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
        }
        
        if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
        }
        
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.maxWidth = '100%';
        this.canvas.style.cursor = 'crosshair';
        this.canvas.style.border = '2px solid #007bff';
        
        this.ctx.drawImage(this.imagen, 0, 0, width, height);
        this.canvas.addEventListener('click', (e) => {
            this.obtenerColorEnPunto(e);
        });
        
        contenedor.innerHTML = '';
        contenedor.appendChild(this.canvas);
    }

    obtenerColorEnPunto(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) * (this.canvas.width / rect.width));
        const y = Math.floor((e.clientY - rect.top) * (this.canvas.height / rect.height));
        
        const imageData = this.ctx.getImageData(x, y, 1, 1);
        const pixel = imageData.data;
        
        const color = {
            r: pixel[0],
            g: pixel[1],
            b: pixel[2],
            a: pixel[3] / 255
        };
        
        this.mostrarDetalleColor(color);
    }

    extraerColoresDominantes() {
        if (!this.imagen) return;
        
        const boton = document.getElementById('extraerColores');
        boton.disabled = true;
        boton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Extrayendo...';
        
        setTimeout(() => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                const maxSize = 200;
                let width = this.imagen.width;
                let height = this.imagen.height;
                
                if (width > height) {
                    if (width > maxSize) {
                        height = (height * maxSize) / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width = (width * maxSize) / height;
                        height = maxSize;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(this.imagen, 0, 0, width, height);
                const imageData = ctx.getImageData(0, 0, width, height);
                const pixels = imageData.data;
                
                const colores = this.analizarColores(pixels);
                
                this.coloresExtraidos = colores;
                this.mostrarPaleta(colores);
                
            } catch (error) {
                console.error('Error al extraer colores:', error);
                alert('Error al extraer colores de la imagen');
            } finally {
                boton.disabled = false;
                boton.innerHTML = '<i class="bi bi-gear"></i> Extraer Paleta';
            }
        }, 100);
    }

    analizarColores(pixels) {
        const coloresMap = new Map();
        const numeroColores = parseInt(document.getElementById('numeroColores').value);
        const tolerancia = parseInt(document.getElementById('tolerancia').value);
        const ignorarNegro = document.getElementById('ignorarNegro').checked;
        const ignorarBlanco = document.getElementById('ignorarBlanco').checked;
        
        for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const a = pixels[i + 3];
            
            if (a < 128) continue;          
            if (ignorarNegro && this.esColorOscuro(r, g, b)) continue;
            if (ignorarBlanco && this.esColorClaro(r, g, b)) continue;
            
            const claveColor = this.agruparColor(r, g, b, tolerancia);
            
            if (coloresMap.has(claveColor)) {
                coloresMap.get(claveColor).count++;
                const color = coloresMap.get(claveColor);
                color.r = Math.round((color.r + r) / 2);
                color.g = Math.round((color.g + g) / 2);
                color.b = Math.round((color.b + b) / 2);
            } else {
                coloresMap.set(claveColor, { r, g, b, count: 1 });
            }
        }
        
        return Array.from(coloresMap.values())
            .sort((a, b) => b.count - a.count)
            .slice(0, numeroColores)
            .map(color => ({
                r: color.r,
                g: color.g,
                b: color.b,
                count: color.count,
                percentage: 0 
            }));
    }

    agruparColor(r, g, b, tolerancia) {
        const factor = Math.floor(255 / tolerancia);
        return `${Math.floor(r / factor)}-${Math.floor(g / factor)}-${Math.floor(b / factor)}`;
    }

    esColorOscuro(r, g, b) {
        const luminancia = (0.299 * r + 0.587 * g + 0.114 * b);
        return luminancia < 50;
    }

    esColorClaro(r, g, b) {
        const luminancia = (0.299 * r + 0.587 * g + 0.114 * b);
        return luminancia > 200;
    }

    mostrarPaleta(colores) {
        const contenedor = document.getElementById('paletaColores');
        const contador = document.getElementById('contadorColores');
        
        contador.textContent = `${colores.length} colores`;
        
        let html = '';
        colores.forEach((color, index) => {
            const hex = this.rgbToHex(color.r, color.g, color.b);
            const rgb = `rgb(${color.r}, ${color.g}, ${color.b})`;
            
            html += `
                <div class="col-md-3 col-sm-4 col-6 mb-3">
                    <div class="card h-100 color-card" data-index="${index}" style="cursor: pointer;">
                        <div class="color-muestra" style="background-color: ${rgb}; height: 100px; border-radius: 0.375rem 0.375rem 0 0;"></div>
                        <div class="card-body p-2">
                            <small class="d-block"><strong>${hex.toUpperCase()}</strong></small>
                            <small class="text-muted">${rgb}</small>
                            <div class="text-muted" style="font-size: 0.75rem;">
                                ${((color.count / colores.reduce((sum, c) => sum + c.count, 0)) * 100).toFixed(1)}%
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        contenedor.innerHTML = html;
        
        document.querySelectorAll('.color-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.mostrarDetalleColor(colores[index]);
            });
        });
        
        document.getElementById('panelPaleta').style.display = 'block';
        document.getElementById('panelExportar').style.display = 'block';
    }

    mostrarDetalleColor(color) {
        this.colorSeleccionado = color;
        
        const hex = this.rgbToHex(color.r, color.g, color.b);
        const hsl = this.rgbToHsl(color.r, color.g, color.b);
        const hsv = this.rgbToHsv(color.r, color.g, color.b);
        const cmyk = this.rgbToCmyk(color.r, color.g, color.b);
        
        document.getElementById('muestraColor').style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        document.getElementById('colorHEX').textContent = hex.toUpperCase();
        document.getElementById('colorRGB').textContent = `rgb(${color.r}, ${color.g}, ${color.b})`;
        document.getElementById('colorHSL').textContent = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        document.getElementById('colorHSV').textContent = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
        document.getElementById('colorCMYK').textContent = `cmyk(${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k})`;
        
        this.mostrarVariaciones(color);
        
        const modal = new bootstrap.Modal(document.getElementById('modalColor'));
        modal.show();
    }

    mostrarVariaciones(color) {
        const contenedor = document.getElementById('variacionesColor');
        const variaciones = this.generarVariaciones(color);
        
        let html = '';
        variaciones.forEach(variacion => {
            const rgb = `rgb(${variacion.r}, ${variacion.g}, ${variacion.b})`;
            const hex = this.rgbToHex(variacion.r, variacion.g, variacion.b);
            
            html += `
                <div class="variacion-color" 
                     style="width: 40px; height: 40px; background-color: ${rgb}; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;"
                     title="${hex.toUpperCase()} - ${variacion.nombre}"
                     onclick="navigator.clipboard.writeText('${hex}')">
                </div>
            `;
        });
        
        contenedor.innerHTML = html;
    }

    generarVariaciones(color) {
        const variaciones = [];
        const hsl = this.rgbToHsl(color.r, color.g, color.b);
        
        for (let i = 20; i <= 80; i += 20) {
            if (i !== hsl.l) {
                const rgb = this.hslToRgb(hsl.h, hsl.s, i);
                variaciones.push({
                    ...rgb,
                    nombre: i > hsl.l ? 'Más claro' : 'Más oscuro'
                });
            }
        }
        
        for (let i = 20; i <= 80; i += 30) {
            if (Math.abs(i - hsl.s) > 10) {
                const rgb = this.hslToRgb(hsl.h, i, hsl.l);
                variaciones.push({
                    ...rgb,
                    nombre: i > hsl.s ? 'Más saturado' : 'Menos saturado'
                });
            }
        }
        
        return variaciones.slice(0, 8);
    }

    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    rgbToHsv(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;
        const d = max - min;
        s = max === 0 ? 0 : d / max;
        
        if (max === min) {
            h = 0;
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            v: Math.round(v * 100)
        };
    }

    rgbToCmyk(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const k = 1 - Math.max(r, Math.max(g, b));
        const c = (1 - r - k) / (1 - k) || 0;
        const m = (1 - g - k) / (1 - k) || 0;
        const y = (1 - b - k) / (1 - k) || 0;
        
        return {
            c: Math.round(c * 100),
            m: Math.round(m * 100),
            y: Math.round(y * 100),
            k: Math.round(k * 100)
        };
    }

    hslToRgb(h, s, l) {
        h /= 360; s /= 100; l /= 100;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h * 6) % 2 - 1));
        const m = l - c / 2;
        let r, g, b;
        
        if (h < 1/6) { r = c; g = x; b = 0; }
        else if (h < 2/6) { r = x; g = c; b = 0; }
        else if (h < 3/6) { r = 0; g = c; b = x; }
        else if (h < 4/6) { r = 0; g = x; b = c; }
        else if (h < 5/6) { r = x; g = 0; b = c; }
        else { r = c; g = 0; b = x; }
        
        return {
            r: Math.round((r + m) * 255),
            g: Math.round((g + m) * 255),
            b: Math.round((b + m) * 255)
        };
    }

    copiarPaletaCSS() {
        if (this.coloresExtraidos.length === 0) return;
        
        let css = ':root {\n';
        this.coloresExtraidos.forEach((color, index) => {
            const hex = this.rgbToHex(color.r, color.g, color.b);
            css += `  --color-${index + 1}: ${hex};\n`;
        });
        css += '}';
        
        navigator.clipboard.writeText(css).then(() => {
            alert('Paleta copiada como CSS al portapapeles');
        });
    }

    descargarPaletaJSON() {
        if (this.coloresExtraidos.length === 0) return;
        
        const paleta = {
            nombre: 'Paleta extraída',
            fecha: new Date().toISOString(),
            colores: this.coloresExtraidos.map((color, index) => ({
                nombre: `Color ${index + 1}`,
                hex: this.rgbToHex(color.r, color.g, color.b),
                rgb: { r: color.r, g: color.g, b: color.b },
                hsl: this.rgbToHsl(color.r, color.g, color.b),
                porcentaje: ((color.count / this.coloresExtraidos.reduce((sum, c) => sum + c.count, 0)) * 100).toFixed(2)
            }))
        };
        
        const blob = new Blob([JSON.stringify(paleta, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'paleta-colores.json';
        link.click();
        URL.revokeObjectURL(url);
    }

    descargarPaletaASE() {
        alert('Función ASE en desarrollo. Usa JSON por ahora.');
    }

    copiarColorSeleccionado() {
        if (this.colorSeleccionado) {
            const hex = this.rgbToHex(this.colorSeleccionado.r, this.colorSeleccionado.g, this.colorSeleccionado.b);
            navigator.clipboard.writeText(hex).then(() => {
                alert('Color copiado al portapapeles: ' + hex);
            });
        }
    }

    mostrarPaneles() {
        document.getElementById('panelExtraccion').style.display = 'block';
        document.getElementById('instrucciones').style.display = 'block';
    }
}

if (typeof window !== 'undefined') {
    window.ExtractorColores = ExtractorColores;
}