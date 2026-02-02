class ContadorTexto {
    constructor() {
        this.textoOriginal = '';
        this.estadisticasActuales = null;
        this.historialTextos = [];
    }

    render() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-card-text text-primary me-2"></i>Contador de Texto</h2>
                            <p class="text-muted mb-0">Analiza, cuenta y limpia texto con estadísticas detalladas</p>
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
                                <i class="bi bi-pencil-square me-2"></i>Editor de Texto
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="mb-3">
                                        <label for="textoContador" class="form-label fw-bold">
                                            Escribe o pega tu texto aquí:
                                        </label>
                                        <textarea id="textoContador" class="form-control" 
                                                  rows="12" 
                                                  placeholder="Escribe aquí tu texto para analizar...
                                                  
Puedes pegar contenido desde el portapapeles o escribir directamente.
El análisis se actualiza en tiempo real mientras escribes."
                                                  style="font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.5;"></textarea>
                                        <div class="form-text d-flex justify-content-between">
                                            <span>El contador se actualiza automáticamente</span>
                                            <span id="contadorCaracteresRapido" class="badge bg-secondary">0 caracteres</span>
                                        </div>
                                    </div>
                                    
                                    <div class="d-flex gap-2 flex-wrap">
                                        <button id="limpiarTexto" class="btn btn-warning">
                                            <i class="bi bi-eraser me-1"></i>Limpiar Todo
                                        </button>
                                        <button id="cargarEjemplo" class="btn btn-outline-info">
                                            <i class="bi bi-file-text me-1"></i>Cargar Ejemplo
                                        </button>
                                        <button id="pegarPortapapeles" class="btn btn-outline-secondary">
                                            <i class="bi bi-clipboard me-1"></i>Pegar desde Portapapeles
                                        </button>
                                        <button id="copiarTexto" class="btn btn-outline-success">
                                            <i class="bi bi-copy me-1"></i>Copiar Texto
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="col-lg-4">
                                    <div class="card border-info">
                                        <div class="card-header bg-info text-white py-2">
                                            <h6 class="mb-0">
                                                <i class="bi bi-speedometer2 me-1"></i>Estadísticas en Tiempo Real
                                            </h6>
                                        </div>
                                        <div class="card-body py-2">
                                            <div class="row g-2 text-center">
                                                <div class="col-6">
                                                    <div class="border rounded p-2">
                                                        <div class="h4 text-primary mb-0" id="contadorCaracteres">0</div>
                                                        <small class="text-muted">Caracteres</small>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="border rounded p-2">
                                                        <div class="h4 text-success mb-0" id="contadorCaracteresSinEspacios">0</div>
                                                        <small class="text-muted">Sin espacios</small>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="border rounded p-2">
                                                        <div class="h4 text-warning mb-0" id="contadorPalabras">0</div>
                                                        <small class="text-muted">Palabras</small>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="border rounded p-2">
                                                        <div class="h4 text-info mb-0" id="contadorLineas">0</div>
                                                        <small class="text-muted">Líneas</small>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="border rounded p-2">
                                                        <div class="h4 text-danger mb-0" id="contadorParrafos">0</div>
                                                        <small class="text-muted">Párrafos</small>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <div class="border rounded p-2">
                                                        <div class="h4 text-secondary mb-0" id="contadorOraciones">0</div>
                                                        <small class="text-muted">Oraciones</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="card border-secondary mt-3">
                                        <div class="card-header bg-secondary text-white py-2">
                                            <h6 class="mb-0">
                                                <i class="bi bi-clock-history me-1"></i>Tiempo de Lectura
                                            </h6>
                                        </div>
                                        <div class="card-body py-2 text-center">
                                            <div class="h5 text-primary mb-1" id="tiempoLectura">0 min</div>
                                            <small class="text-muted">Promedio: 200 palabras/min</small>
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
                        <div class="card-header bg-success text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-bar-chart-fill me-2"></i>Análisis Detallado
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>Estadísticas de caracteres:</h6>
                                    <div class="table-responsive">
                                        <table class="table table-sm">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Caracteres totales:</strong></td>
                                                    <td><span id="estatCaracteresTotales">0</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Letras:</strong></td>
                                                    <td><span id="estatLetras">0</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Números:</strong></td>
                                                    <td><span id="estatNumeros">0</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Espacios:</strong></td>
                                                    <td><span id="estatEspacios">0</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Signos de puntuación:</strong></td>
                                                    <td><span id="estatPuntuacion">0</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Caracteres especiales:</strong></td>
                                                    <td><span id="estatEspeciales">0</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                                <div class="col-lg-6">
                                    <h6>Estadísticas de texto:</h6>
                                    <div class="table-responsive">
                                        <table class="table table-sm">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Palabras únicas:</strong></td>
                                                    <td><span id="estatPalabrasUnicas">0</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Promedio por línea:</strong></td>
                                                    <td><span id="estatPromedioLinea">0</span> palabras</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Promedio por párrafo:</strong></td>
                                                    <td><span id="estatPromedioParrafo">0</span> palabras</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Promedio por oración:</strong></td>
                                                    <td><span id="estatPromedioOracion">0</span> palabras</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Palabra más larga:</strong></td>
                                                    <td><span id="estatPalabraMasLarga">-</span></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Densidad de texto:</strong></td>
                                                    <td><span id="estatDensidad">0%</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
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
                                <i class="bi bi-tools me-2"></i>Herramientas de Limpieza y Formateo
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>Limpieza básica:</h6>
                                    <div class="d-grid gap-2">
                                        <button id="eliminarEspaciosExtra" class="btn btn-outline-primary">
                                            <i class="bi bi-spaces me-1"></i>Eliminar Espacios Extra
                                        </button>
                                        <button id="eliminarLineasVacias" class="btn btn-outline-primary">
                                            <i class="bi bi-text-paragraph me-1"></i>Eliminar Líneas Vacías
                                        </button>
                                        <button id="eliminarTabulaciones" class="btn btn-outline-primary">
                                            <i class="bi bi-arrow-right me-1"></i>Eliminar Tabulaciones
                                        </button>
                                    </div>
                                    
                                    <h6 class="mt-3">Formateo de texto:</h6>
                                    <div class="d-grid gap-2">
                                        <button id="convertirMayusculas" class="btn btn-outline-secondary">
                                            <i class="bi bi-type me-1"></i>MAYÚSCULAS
                                        </button>
                                        <button id="convertirMinusculas" class="btn btn-outline-secondary">
                                            <i class="bi bi-type me-1"></i>minúsculas
                                        </button>
                                        <button id="convertirCapitales" class="btn btn-outline-secondary">
                                            <i class="bi bi-type-bold me-1"></i>Primeras Mayúsculas
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="col-lg-6">
                                    <h6>Limpieza avanzada:</h6>
                                    <div class="d-grid gap-2">
                                        <button id="eliminarNumeros" class="btn btn-outline-danger">
                                            <i class="bi bi-123 me-1"></i>Eliminar Números
                                        </button>
                                        <button id="eliminarPuntuacion" class="btn btn-outline-danger">
                                            <i class="bi bi-dot me-1"></i>Eliminar Puntuación
                                        </button>
                                        <button id="eliminarCaracteresEspeciales" class="btn btn-outline-danger">
                                            <i class="bi bi-exclamation-triangle me-1"></i>Eliminar Caracteres Especiales
                                        </button>
                                        <button id="soloLetrasEspacios" class="btn btn-outline-danger">
                                            <i class="bi bi-fonts me-1"></i>Solo Letras y Espacios
                                        </button>
                                    </div>
                                    
                                    <h6 class="mt-3">Herramientas especiales:</h6>
                                    <div class="d-grid gap-2">
                                        <button id="ordenarLineas" class="btn btn-outline-info">
                                            <i class="bi bi-sort-alpha-down me-1"></i>Ordenar Líneas
                                        </button>
                                        <button id="eliminarDuplicados" class="btn btn-outline-info">
                                            <i class="bi bi-collection me-1"></i>Eliminar Duplicados
                                        </button>
                                        <button id="invertirTexto" class="btn btn-outline-info">
                                            <i class="bi bi-arrow-counterclockwise me-1"></i>Invertir Texto
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row mt-3">
                                <div class="col-12">
                                    <div class="d-flex gap-2 justify-content-center">
                                        <button id="deshacerCambio" class="btn btn-success" disabled>
                                            <i class="bi bi-arrow-counterclockwise me-1"></i>Deshacer
                                        </button>
                                        <button id="restaurarOriginal" class="btn btn-warning" disabled>
                                            <i class="bi bi-arrow-clockwise me-1"></i>Restaurar Original
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
                                <i class="bi bi-graph-up me-2"></i>Análisis de Frecuencia de Palabras
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>Palabras más frecuentes:</h6>
                                    <div id="palabrasFrecuentes" class="border rounded p-3 bg-light" style="min-height: 200px;">
                                        <p class="text-muted text-center">
                                            <i class="bi bi-info-circle me-1"></i>
                                            Escribe texto para ver las palabras más frecuentes
                                        </p>
                                    </div>
                                </div>
                                
                                <div class="col-lg-6">
                                    <h6>Configuración del análisis:</h6>
                                    <div class="mb-3">
                                        <label for="longitudMinima" class="form-label">Longitud mínima de palabra:</label>
                                        <input type="range" id="longitudMinima" class="form-range" min="1" max="10" value="3">
                                        <div class="d-flex justify-content-between">
                                            <small>1</small>
                                            <small id="valorLongitudMinima">3</small>
                                            <small>10</small>
                                        </div>
                                    </div>
                                    
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="checkbox" id="ignorarMayusculas" checked>
                                        <label class="form-check-label" for="ignorarMayusculas">
                                            Ignorar mayúsculas y minúsculas
                                        </label>
                                    </div>
                                    
                                    <div class="form-check mb-3">
                                        <input class="form-check-input" type="checkbox" id="ignorarPalabrasComunes" checked>
                                        <label class="form-check-label" for="ignorarPalabrasComunes">
                                            Ignorar palabras comunes (el, la, de, que, etc.)
                                        </label>
                                    </div>
                                    
                                    <div class="mb-3">
                                        <label for="numeroResultados" class="form-label">Mostrar top:</label>
                                        <select id="numeroResultados" class="form-select">
                                            <option value="10">10 palabras</option>
                                            <option value="20" selected>20 palabras</option>
                                            <option value="50">50 palabras</option>
                                            <option value="100">100 palabras</option>
                                        </select>
                                    </div>
                                    
                                    <button id="actualizarAnalisis" class="btn btn-info w-100">
                                        <i class="bi bi-arrow-clockwise me-1"></i>Actualizar Análisis
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-12">
                    <div class="card herramienta-card border-success">
                        <div class="card-header bg-success text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-download me-2"></i>Exportar Resultados
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>Exportar texto:</h6>
                                    <div class="d-grid gap-2">
                                        <button id="descargarTexto" class="btn btn-success">
                                            <i class="bi bi-file-text me-1"></i>Descargar como TXT
                                        </button>
                                        <button id="copiarEstadisticas" class="btn btn-outline-success">
                                            <i class="bi bi-clipboard-data me-1"></i>Copiar Estadísticas
                                        </button>
                                    </div>
                                </div>
                                
                                <div class="col-lg-6">
                                    <h6>Exportar análisis:</h6>
                                    <div class="d-grid gap-2">
                                        <button id="descargarEstadisticas" class="btn btn-outline-info">
                                            <i class="bi bi-file-earmark-spreadsheet me-1"></i>Estadísticas como CSV
                                        </button>
                                        <button id="descargarFrecuencias" class="btn btn-outline-info">
                                            <i class="bi bi-bar-chart me-1"></i>Frecuencias como CSV
                                        </button>
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
                                <i class="bi bi-info-circle-fill me-2"></i>Guía de Uso
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>Funcionalidades principales:</h6>
                                    <ul class="list-unstyled">
                                        <li><i class="bi bi-check2 text-success me-2"></i><strong>Análisis en tiempo real:</strong> Las estadísticas se actualizan mientras escribes</li>
                                        <li><i class="bi bi-check2 text-success me-2"></i><strong>Limpieza de texto:</strong> Herramientas para formatear y limpiar contenido</li>
                                        <li><i class="bi bi-check2 text-success me-2"></i><strong>Análisis de frecuencia:</strong> Encuentra las palabras más utilizadas</li>
                                        <li><i class="bi bi-check2 text-success me-2"></i><strong>Historial:</strong> Deshacer cambios y restaurar texto original</li>
                                    </ul>
                                </div>
                                <div class="col-lg-6">
                                    <h6>Consejos útiles:</h6>
                                    <ul class="list-unstyled">
                                        <li><i class="bi bi-lightbulb text-warning me-2"></i>Usa <kbd>Ctrl+V</kbd> para pegar texto rápidamente</li>
                                        <li><i class="bi bi-lightbulb text-warning me-2"></i>Las estadísticas incluyen tiempo de lectura estimado</li>
                                        <li><i class="bi bi-lightbulb text-warning me-2"></i>Puedes exportar tanto el texto como las estadísticas</li>
                                        <li><i class="bi bi-lightbulb text-warning me-2"></i>El análisis de frecuencia excluye palabras comunes por defecto</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.configurarEventos();
        this.inicializar();
    }

    configurarEventos() {
        this.configurarFavoritos();

        const textarea = document.getElementById('textoContador');
        textarea.addEventListener('input', () => {
            this.analizarTexto();
        });

        textarea.addEventListener('paste', () => {
            setTimeout(() => this.analizarTexto(), 10);
        });

        document.getElementById('limpiarTexto').addEventListener('click', () => {
            this.limpiarTodo();
        });

        document.getElementById('cargarEjemplo').addEventListener('click', () => {
            this.cargarTextoEjemplo();
        });

        document.getElementById('pegarPortapapeles').addEventListener('click', () => {
            this.pegarDesdePortapapeles();
        });

        document.getElementById('copiarTexto').addEventListener('click', () => {
            this.copiarTexto();
        });

        document.getElementById('eliminarEspaciosExtra').addEventListener('click', () => {
            this.aplicarLimpieza('espaciosExtra');
        });

        document.getElementById('eliminarLineasVacias').addEventListener('click', () => {
            this.aplicarLimpieza('lineasVacias');
        });

        document.getElementById('eliminarTabulaciones').addEventListener('click', () => {
            this.aplicarLimpieza('tabulaciones');
        });

        document.getElementById('convertirMayusculas').addEventListener('click', () => {
            this.aplicarFormateo('mayusculas');
        });

        document.getElementById('convertirMinusculas').addEventListener('click', () => {
            this.aplicarFormateo('minusculas');
        });

        document.getElementById('convertirCapitales').addEventListener('click', () => {
            this.aplicarFormateo('capitales');
        });

        document.getElementById('eliminarNumeros').addEventListener('click', () => {
            this.aplicarLimpieza('numeros');
        });

        document.getElementById('eliminarPuntuacion').addEventListener('click', () => {
            this.aplicarLimpieza('puntuacion');
        });

        document.getElementById('eliminarCaracteresEspeciales').addEventListener('click', () => {
            this.aplicarLimpieza('especiales');
        });

        document.getElementById('soloLetrasEspacios').addEventListener('click', () => {
            this.aplicarLimpieza('soloLetras');
        });

        document.getElementById('ordenarLineas').addEventListener('click', () => {
            this.aplicarHerramientaEspecial('ordenar');
        });

        document.getElementById('eliminarDuplicados').addEventListener('click', () => {
            this.aplicarHerramientaEspecial('duplicados');
        });

        document.getElementById('invertirTexto').addEventListener('click', () => {
            this.aplicarHerramientaEspecial('invertir');
        });

        document.getElementById('deshacerCambio').addEventListener('click', () => {
            this.deshacerCambio();
        });

        document.getElementById('restaurarOriginal').addEventListener('click', () => {
            this.restaurarOriginal();
        });

        document.getElementById('longitudMinima').addEventListener('input', (e) => {
            document.getElementById('valorLongitudMinima').textContent = e.target.value;
            this.analizarFrecuenciaPalabras();
        });

        document.getElementById('ignorarMayusculas').addEventListener('change', () => {
            this.analizarFrecuenciaPalabras();
        });

        document.getElementById('ignorarPalabrasComunes').addEventListener('change', () => {
            this.analizarFrecuenciaPalabras();
        });

        document.getElementById('numeroResultados').addEventListener('change', () => {
            this.analizarFrecuenciaPalabras();
        });

        document.getElementById('actualizarAnalisis').addEventListener('click', () => {
            this.analizarFrecuenciaPalabras();
        });

        document.getElementById('descargarTexto').addEventListener('click', () => {
            this.descargarTexto();
        });

        document.getElementById('copiarEstadisticas').addEventListener('click', () => {
            this.copiarEstadisticas();
        });

        document.getElementById('descargarEstadisticas').addEventListener('click', () => {
            this.descargarEstadisticas();
        });

        document.getElementById('descargarFrecuencias').addEventListener('click', () => {
            this.descargarFrecuencias();
        });
    }

    configurarFavoritos() {
        const boton = document.getElementById('botonFavoritos');
        const icono = document.getElementById('iconoFavoritos');
        const texto = document.getElementById('textoFavoritos');
        
        if (!boton || !icono || !texto) return;
        
        const esFavorito = localStorage.getItem('favoritos') ? 
            JSON.parse(localStorage.getItem('favoritos')).some(fav => fav.id === 'contador-texto') : false;
        
        if (esFavorito) {
            icono.className = 'bi bi-star-fill me-1';
            texto.textContent = 'En Favoritos';
        } else {
            icono.className = 'bi bi-star me-1';
            texto.textContent = 'Agregar a Favoritos';
        }
        
        boton.addEventListener('click', () => {
            if (window.utils && window.utils.gestorFavoritos) {
                window.utils.gestorFavoritos.alternar('contador-texto', 'Contador de Texto', 'bi-card-text');
                setTimeout(() => this.configurarFavoritos(), 100);
            }
        });
    }

    inicializar() {
        this.analizarTexto();
        this.analizarFrecuenciaPalabras();
    }

    analizarTexto() {
        const texto = document.getElementById('textoContador').value;

        if (this.textoOriginal === '' && texto !== '') {
            this.textoOriginal = texto;
            this.habilitarBotonesHistorial();
        }

        const estadisticas = this.calcularEstadisticas(texto);
        this.estadisticasActuales = estadisticas;
        
        this.actualizarContadoresRapidos(estadisticas);
        this.actualizarEstadisticasDetalladas(estadisticas);
        this.analizarFrecuenciaPalabras();
    }

    calcularEstadisticas(texto) {
        const stats = {
            caracteresTotales: texto.length,
            caracteresSinEspacios: texto.replace(/\s/g, '').length,
            espacios: (texto.match(/\s/g) || []).length,
            letras: (texto.match(/[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/g) || []).length,
            numeros: (texto.match(/[0-9]/g) || []).length,
            puntuacion: (texto.match(/[.,;:!?¡¿"""''()[\]{}\-]/g) || []).length,
            especiales: (texto.match(/[^a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s.,;:!?¡¿"""''()[\]{}\-]/g) || []).length
        };

        const palabras = texto.trim() === '' ? [] : texto.trim().split(/\s+/);
        stats.palabras = palabras.length === 1 && palabras[0] === '' ? 0 : palabras.length;
        
        const palabrasLimpias = palabras.filter(p => p.trim() !== '');
        stats.palabrasUnicas = new Set(palabrasLimpias.map(p => p.toLowerCase())).size;
        stats.palabraMasLarga = palabrasLimpias.reduce((max, palabra) => 
            palabra.length > max.length ? palabra : max, '');

        const lineas = texto.split('\n');
        stats.lineas = lineas.length;
        stats.lineasNoVacias = lineas.filter(linea => linea.trim() !== '').length;
        
        const parrafos = texto.split(/\n\s*\n/);
        stats.parrafos = texto.trim() === '' ? 0 : parrafos.filter(p => p.trim() !== '').length;

        const oraciones = texto.split(/[.!?]+/).filter(o => o.trim() !== '');
        stats.oraciones = oraciones.length;

        stats.promedioLinea = stats.lineasNoVacias > 0 ? Math.round(stats.palabras / stats.lineasNoVacias) : 0;
        stats.promedioParrafo = stats.parrafos > 0 ? Math.round(stats.palabras / stats.parrafos) : 0;
        stats.promedioOracion = stats.oraciones > 0 ? Math.round(stats.palabras / stats.oraciones) : 0;

        stats.densidad = stats.caracteresTotales > 0 ? 
            Math.round((stats.letras / stats.caracteresTotales) * 100) : 0;

        stats.tiempoLectura = Math.max(1, Math.round(stats.palabras / 200));

        return stats;
    }

    actualizarContadoresRapidos(stats) {
        document.getElementById('contadorCaracteres').textContent = stats.caracteresTotales;
        document.getElementById('contadorCaracteresSinEspacios').textContent = stats.caracteresSinEspacios;
        document.getElementById('contadorPalabras').textContent = stats.palabras;
        document.getElementById('contadorLineas').textContent = stats.lineas;
        document.getElementById('contadorParrafos').textContent = stats.parrafos;
        document.getElementById('contadorOraciones').textContent = stats.oraciones;
        document.getElementById('tiempoLectura').textContent = 
            stats.tiempoLectura + (stats.tiempoLectura === 1 ? ' min' : ' min');
        
        document.getElementById('contadorCaracteresRapido').textContent = 
            stats.caracteresTotales + (stats.caracteresTotales === 1 ? ' carácter' : ' caracteres');
    }

    actualizarEstadisticasDetalladas(stats) {
        document.getElementById('estatCaracteresTotales').textContent = stats.caracteresTotales;
        document.getElementById('estatLetras').textContent = stats.letras;
        document.getElementById('estatNumeros').textContent = stats.numeros;
        document.getElementById('estatEspacios').textContent = stats.espacios;
        document.getElementById('estatPuntuacion').textContent = stats.puntuacion;
        document.getElementById('estatEspeciales').textContent = stats.especiales;
        
        document.getElementById('estatPalabrasUnicas').textContent = stats.palabrasUnicas;
        document.getElementById('estatPromedioLinea').textContent = stats.promedioLinea;
        document.getElementById('estatPromedioParrafo').textContent = stats.promedioParrafo;
        document.getElementById('estatPromedioOracion').textContent = stats.promedioOracion;
        document.getElementById('estatPalabraMasLarga').textContent = stats.palabraMasLarga || '-';
        document.getElementById('estatDensidad').textContent = stats.densidad + '%';
    }

    analizarFrecuenciaPalabras() {
        const texto = document.getElementById('textoContador').value;
        if (!texto.trim()) {
            document.getElementById('palabrasFrecuentes').innerHTML = `
                <p class="text-muted text-center">
                    <i class="bi bi-info-circle me-1"></i>
                    Escribe texto para ver las palabras más frecuentes
                </p>
            `;
            return;
        }

        const longitudMinima = parseInt(document.getElementById('longitudMinima').value);
        const ignorarMayusculas = document.getElementById('ignorarMayusculas').checked;
        const ignorarComunes = document.getElementById('ignorarPalabrasComunes').checked;
        const numeroResultados = parseInt(document.getElementById('numeroResultados').value);

        const palabrasComunes = [
            'el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son',
            'con', 'para', 'al', 'del', 'los', 'las', 'una', 'como', 'pero', 'sus', 'fue', 'han', 'mi', 'me', 'si',
            'sin', 'muy', 'ya', 'más', 'o', 'él', 'hasta', 'desde', 'cuando', 'donde', 'quien', 'cual', 'sobre',
            'entre', 'durante', 'antes', 'después', 'dentro', 'fuera', 'bajo', 'hacia', 'mediante', 'según'
        ];

        let palabras = texto.match(/\b[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+\b/g) || [];
        
        palabras = palabras.filter(palabra => palabra.length >= longitudMinima);
        
        if (ignorarMayusculas) {
            palabras = palabras.map(palabra => palabra.toLowerCase());
        }
        
        if (ignorarComunes) {
            palabras = palabras.filter(palabra => !palabrasComunes.includes(palabra.toLowerCase()));
        }

        const frecuencias = {};
        palabras.forEach(palabra => {
            frecuencias[palabra] = (frecuencias[palabra] || 0) + 1;
        });

        const palabrasOrdenadas = Object.entries(frecuencias)
            .sort(([,a], [,b]) => b - a)
            .slice(0, numeroResultados);

        if (palabrasOrdenadas.length === 0) {
            document.getElementById('palabrasFrecuentes').innerHTML = `
                <p class="text-muted text-center">
                    <i class="bi bi-search me-1"></i>
                    No se encontraron palabras con los filtros aplicados
                </p>
            `;
        } else {
            const maxFrecuencia = palabrasOrdenadas[0][1];
            const html = palabrasOrdenadas.map(([palabra, frecuencia], index) => {
                const porcentaje = (frecuencia / maxFrecuencia) * 100;
                const badge = index < 3 ? 'bg-warning' : index < 10 ? 'bg-info' : 'bg-secondary';
                
                return `
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <div class="d-flex align-items-center">
                            <span class="badge ${badge} me-2">${index + 1}</span>
                            <strong>${palabra}</strong>
                        </div>
                        <div class="d-flex align-items-center">
                            <div class="progress me-2" style="width: 60px; height: 8px;">
                                <div class="progress-bar bg-primary" style="width: ${porcentaje}%"></div>
                            </div>
                            <span class="badge bg-primary">${frecuencia}</span>
                        </div>
                    </div>
                `;
            }).join('');
            
            document.getElementById('palabrasFrecuentes').innerHTML = html;
        }
    }

    cargarTextoEjemplo() {
        const textoEjemplo = `El análisis de texto es una técnica fundamental en el procesamiento de lenguaje natural. Esta herramienta permite examinar diversos aspectos del texto escrito.

La importancia del análisis textual radica en su capacidad para extraer información significativa de grandes volúmenes de texto. Los desarrolladores y escritores utilizan estas técnicas para mejorar la calidad de sus contenidos.

En el mundo digital actual, el procesamiento de texto automatizado se ha vuelto indispensable. Las aplicaciones van desde la corrección ortográfica hasta algoritmos de inteligencia artificial que comprenden el contexto y significado del texto.

Esta herramienta proporciona estadísticas detalladas sobre:
- Conteo de caracteres, palabras y párrafos
- Análisis de frecuencia de palabras
- Tiempo estimado de lectura
- Limpieza y formateo automatizado

El análisis de texto no solo es útil para escritores profesionales, sino también para estudiantes, investigadores y cualquier persona que trabaje regularmente con contenido escrito.`;

        this.establecerTexto(textoEjemplo);
        this.mostrarNotificacion('Texto de ejemplo cargado', 'success');
    }

    async pegarDesdePortapapeles() {
        try {
            if (navigator.clipboard && navigator.clipboard.readText) {
                const texto = await navigator.clipboard.readText();
                if (texto.trim()) {
                    this.establecerTexto(texto);
                    this.mostrarNotificacion('Texto pegado desde portapapeles', 'success');
                } else {
                    this.mostrarNotificacion('El portapapeles está vacío', 'warning');
                }
            } else {
                this.mostrarNotificacion('Función no disponible. Usa Ctrl+V manualmente', 'warning');
            }
        } catch (error) {
            this.mostrarNotificacion('Error al acceder al portapapeles', 'error');
        }
    }

    copiarTexto() {
        const texto = document.getElementById('textoContador').value;
        if (!texto.trim()) {
            this.mostrarNotificacion('No hay texto para copiar', 'warning');
            return;
        }

        navigator.clipboard.writeText(texto).then(() => {
            this.mostrarNotificacion('Texto copiado al portapapeles', 'success');
        }).catch(() => {
            const textarea = document.getElementById('textoContador');
            textarea.select();
            document.execCommand('copy');
            this.mostrarNotificacion('Texto copiado al portapapeles', 'success');
        });
    }

    aplicarLimpieza(tipo) {
        const textarea = document.getElementById('textoContador');
        const textoActual = textarea.value;
        
        if (!textoActual.trim()) {
            this.mostrarNotificacion('No hay texto para limpiar', 'warning');
            return;
        }

        this.guardarEnHistorial(textoActual);
        
        let textoLimpio;
        
        switch (tipo) {
            case 'espaciosExtra':
                textoLimpio = textoActual.replace(/\s+/g, ' ').trim();
                break;
            case 'lineasVacias':
                textoLimpio = textoActual.replace(/\n\s*\n/g, '\n').trim();
                break;
            case 'tabulaciones':
                textoLimpio = textoActual.replace(/\t/g, ' ');
                break;
            case 'numeros':
                textoLimpio = textoActual.replace(/[0-9]/g, '');
                break;
            case 'puntuacion':
                textoLimpio = textoActual.replace(/[.,;:!?¡¿"""''()[\]{}\-]/g, '');
                break;
            case 'especiales':
                textoLimpio = textoActual.replace(/[^a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s.,;:!?¡¿"""''()[\]{}\-]/g, '');
                break;
            case 'soloLetras':
                textoLimpio = textoActual.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]/g, '');
                break;
            default:
                return;
        }
        
        this.establecerTexto(textoLimpio);
        this.mostrarNotificacion('Limpieza aplicada correctamente', 'success');
    }

    aplicarFormateo(tipo) {
        const textarea = document.getElementById('textoContador');
        const textoActual = textarea.value;
        
        if (!textoActual.trim()) {
            this.mostrarNotificacion('No hay texto para formatear', 'warning');
            return;
        }

        this.guardarEnHistorial(textoActual);
        
        let textoFormateado;
        
        switch (tipo) {
            case 'mayusculas':
                textoFormateado = textoActual.toUpperCase();
                break;
            case 'minusculas':
                textoFormateado = textoActual.toLowerCase();
                break;
            case 'capitales':
                textoFormateado = textoActual.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
                break;
            default:
                return;
        }
        
        this.establecerTexto(textoFormateado);
        this.mostrarNotificacion('Formateo aplicado correctamente', 'success');
    }

    aplicarHerramientaEspecial(tipo) {
        const textarea = document.getElementById('textoContador');
        const textoActual = textarea.value;
        
        if (!textoActual.trim()) {
            this.mostrarNotificacion('No hay texto para procesar', 'warning');
            return;
        }

        this.guardarEnHistorial(textoActual);
        
        let textoModificado;
        
        switch (tipo) {
            case 'ordenar':
                const lineas = textoActual.split('\n');
                textoModificado = lineas.sort().join('\n');
                break;
            case 'duplicados':
                const lineasUnicas = [...new Set(textoActual.split('\n'))];
                textoModificado = lineasUnicas.join('\n');
                break;
            case 'invertir':
                textoModificado = textoActual.split('').reverse().join('');
                break;
            default:
                return;
        }
        
        this.establecerTexto(textoModificado);
        this.mostrarNotificacion('Herramienta aplicada correctamente', 'success');
    }

    guardarEnHistorial(texto) {
        this.historialTextos.push(texto);
        if (this.historialTextos.length > 10) {
            this.historialTextos.shift();
        }
        this.habilitarBotonesHistorial();
    }

    deshacerCambio() {
        if (this.historialTextos.length > 0) {
            const textoAnterior = this.historialTextos.pop();
            this.establecerTexto(textoAnterior);
            this.mostrarNotificacion('Cambio deshecho', 'info');
            
            if (this.historialTextos.length === 0) {
                document.getElementById('deshacerCambio').disabled = true;
            }
        }
    }

    restaurarOriginal() {
        if (this.textoOriginal !== '') {
            this.establecerTexto(this.textoOriginal);
            this.historialTextos = [];
            document.getElementById('deshacerCambio').disabled = true;
            this.mostrarNotificacion('Texto original restaurado', 'info');
        }
    }

    habilitarBotonesHistorial() {
        document.getElementById('deshacerCambio').disabled = this.historialTextos.length === 0;
        document.getElementById('restaurarOriginal').disabled = this.textoOriginal === '';
    }

    establecerTexto(texto) {
        document.getElementById('textoContador').value = texto;
        this.analizarTexto();
    }

    limpiarTodo() {
        document.getElementById('textoContador').value = '';
        this.textoOriginal = '';
        this.historialTextos = [];
        this.estadisticasActuales = null;
        
        this.analizarTexto();
        this.habilitarBotonesHistorial();
        
        this.mostrarNotificacion('Todo el contenido ha sido limpiado', 'info');
    }

    descargarTexto() {
        const texto = document.getElementById('textoContador').value;
        if (!texto.trim()) {
            this.mostrarNotificacion('No hay texto para descargar', 'warning');
            return;
        }

        const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = 'texto_analizado.txt';
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(enlace.href);

        this.mostrarNotificacion('Texto descargado como archivo TXT', 'success');
    }

    copiarEstadisticas() {
        if (!this.estadisticasActuales) {
            this.mostrarNotificacion('No hay estadísticas para copiar', 'warning');
            return;
        }

        const stats = this.estadisticasActuales;
        const resumen = `ESTADÍSTICAS DE TEXTO
========================
Caracteres totales: ${stats.caracteresTotales}
Caracteres sin espacios: ${stats.caracteresSinEspacios}
Palabras: ${stats.palabras}
Palabras únicas: ${stats.palabrasUnicas}
Líneas: ${stats.lineas}
Párrafos: ${stats.parrafos}
Oraciones: ${stats.oraciones}
Tiempo de lectura: ${stats.tiempoLectura} minutos

DISTRIBUCIÓN DE CARACTERES
==========================
Letras: ${stats.letras}
Números: ${stats.numeros}
Espacios: ${stats.espacios}
Puntuación: ${stats.puntuacion}
Especiales: ${stats.especiales}

PROMEDIOS
=========
Palabras por línea: ${stats.promedioLinea}
Palabras por párrafo: ${stats.promedioParrafo}
Palabras por oración: ${stats.promedioOracion}
Palabra más larga: ${stats.palabraMasLarga}
Densidad de texto: ${stats.densidad}%`;

        navigator.clipboard.writeText(resumen).then(() => {
            this.mostrarNotificacion('Estadísticas copiadas al portapapeles', 'success');
        }).catch(() => {
            this.mostrarNotificacion('Error al copiar estadísticas', 'error');
        });
    }

    descargarEstadisticas() {
        if (!this.estadisticasActuales) {
            this.mostrarNotificacion('No hay estadísticas para descargar', 'warning');
            return;
        }

        const stats = this.estadisticasActuales;
        const csv = `Métrica,Valor
Caracteres totales,${stats.caracteresTotales}
Caracteres sin espacios,${stats.caracteresSinEspacios}
Palabras,${stats.palabras}
Palabras únicas,${stats.palabrasUnicas}
Líneas,${stats.lineas}
Párrafos,${stats.parrafos}
Oraciones,${stats.oraciones}
Letras,${stats.letras}
Números,${stats.numeros}
Espacios,${stats.espacios}
Puntuación,${stats.puntuacion}
Especiales,${stats.especiales}
Promedio palabras por línea,${stats.promedioLinea}
Promedio palabras por párrafo,${stats.promedioParrafo}
Promedio palabras por oración,${stats.promedioOracion}
Palabra más larga,${stats.palabraMasLarga}
Densidad de texto (%),${stats.densidad}
Tiempo de lectura (min),${stats.tiempoLectura}`;

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = 'estadisticas_texto.csv';
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(enlace.href);

        this.mostrarNotificacion('Estadísticas descargadas como CSV', 'success');
    }

    descargarFrecuencias() {
        const texto = document.getElementById('textoContador').value;
        if (!texto.trim()) {
            this.mostrarNotificacion('No hay texto para analizar frecuencias', 'warning');
            return;
        }

        const palabras = texto.match(/\b[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+\b/g) || [];
        const frecuencias = {};
        palabras.forEach(palabra => {
            const palabraNorm = palabra.toLowerCase();
            frecuencias[palabraNorm] = (frecuencias[palabraNorm] || 0) + 1;
        });

        const palabrasOrdenadas = Object.entries(frecuencias)
            .sort(([,a], [,b]) => b - a);

        let csv = 'Palabra,Frecuencia\n';
        palabrasOrdenadas.forEach(([palabra, frecuencia]) => {
            csv += `${palabra},${frecuencia}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = 'frecuencia_palabras.csv';
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(enlace.href);

        this.mostrarNotificacion('Frecuencias descargadas como CSV', 'success');
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

window.contadorTexto = new ContadorTexto();