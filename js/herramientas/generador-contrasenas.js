class GeneradorContrasenas {
    constructor() {
        this.caracteresDisponibles = {
            minusculas: 'abcdefghijklmnopqrstuvwxyz',
            mayusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 
            numeros: '0123456789',
            simbolos: '!@#$%^&*()_+-=[]{}|;:,.<>?',
            simbolosBasicos: '!@#$%^&*',
            ambiguos: 'il1Lo0O'
        };
        this.configuracion = this.obtenerConfiguracionPorDefecto();
    }

    obtenerConfiguracionPorDefecto() {
        return {
            longitud: 16,
            incluirMinusculas: true,
            incluirMayusculas: true,
            incluirNumeros: true,
            incluirSimbolos: true,
            usarSimbolosBasicos: false,
            evitarAmbiguos: true,
            sinCaracteresRepetidos: false,
            comenzarConLetra: false,
            incluirPalabras: false
        };
    }

    render(container) {
        container.innerHTML = `
            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Configuración
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Longitud de la contraseña</label>
                                <div class="input-group">
                                    <input type="range" class="form-range" id="longitudContrasena" 
                                           min="4" max="128" value="16">
                                    <input type="number" class="form-control" id="longitudNumero" 
                                           min="4" max="128" value="16" style="max-width: 80px;">
                                </div>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Caracteres a incluir</label>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="incluirMinusculas" checked>
                                    <label class="form-check-label" for="incluirMinusculas">
                                        Minúsculas (a-z)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="incluirMayusculas" checked>
                                    <label class="form-check-label" for="incluirMayusculas">
                                        Mayúsculas (A-Z)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="incluirNumeros" checked>
                                    <label class="form-check-label" for="incluirNumeros">
                                        Números (0-9)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="incluirSimbolos" checked>
                                    <label class="form-check-label" for="incluirSimbolos">
                                        Símbolos (!@#$%^&*)
                                    </label>
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="usarSimbolosBasicos">
                                    <label class="form-check-label" for="usarSimbolosBasicos">
                                        Solo símbolos básicos (!@#$%^&*)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="evitarAmbiguos" checked>
                                    <label class="form-check-label" for="evitarAmbiguos">
                                        Evitar caracteres ambiguos (i, l, 1, L, o, 0, O)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="sinRepetidos">
                                    <label class="form-check-label" for="sinRepetidos">
                                        Sin caracteres repetidos
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="comenzarConLetra">
                                    <label class="form-check-label" for="comenzarConLetra">
                                        Comenzar con letra
                                    </label>
                                </div>
                            </div>

                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" id="generarContrasena">
                                    <i class="bi bi-lightning me-2"></i>
                                    Generar Contraseña
                                </button>
                                <button class="btn btn-outline-secondary" id="generarMultiples">
                                    <i class="bi bi-collection me-2"></i>
                                    Generar 5 Contraseñas
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-shield-lock me-2"></i>
                                Contraseña Generada
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="resultadoContrasena">
                                <div class="text-center text-muted py-4">
                                    <i class="bi bi-key display-4"></i>
                                    <p class="mt-2">Genera una contraseña para verla aquí</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-bar-chart me-2"></i>
                                Análisis de Seguridad
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="analisisSeguridad">
                                <p class="text-muted">El análisis aparecerá cuando generes una contraseña</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.configurarEventos();
    }

    configurarEventos() {
        const rangeElement = document.getElementById('longitudContrasena');
        const numberElement = document.getElementById('longitudNumero');
        
        rangeElement.addEventListener('input', () => {
            numberElement.value = rangeElement.value;
        });
        
        numberElement.addEventListener('input', () => {
            rangeElement.value = numberElement.value;
        });

        document.getElementById('generarContrasena').addEventListener('click', () => {
            this.generarContrasenaIndividual();
        });

        document.getElementById('generarMultiples').addEventListener('click', () => {
            this.generarMultiplesContrasenas();
        });

        const checkboxes = ['incluirMinusculas', 'incluirMayusculas', 'incluirNumeros', 'incluirSimbolos'];
        checkboxes.forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.validarSeleccionCaracteres();
            });
        });
    }

    validarSeleccionCaracteres() {
        const checkboxes = ['incluirMinusculas', 'incluirMayusculas', 'incluirNumeros', 'incluirSimbolos'];
        const algunoSeleccionado = checkboxes.some(id => document.getElementById(id).checked);
        
        const btnGenerar = document.getElementById('generarContrasena');
        const btnMultiples = document.getElementById('generarMultiples');
        
        if (!algunoSeleccionado) {
            btnGenerar.disabled = true;
            btnMultiples.disabled = true;
            UtilsUI.mostrarNotificacion('Debes seleccionar al menos un tipo de carácter', 'warning');
        } else {
            btnGenerar.disabled = false;
            btnMultiples.disabled = false;
        }
    }

    obtenerConfiguracionActual() {
        return {
            longitud: parseInt(document.getElementById('longitudContrasena').value),
            incluirMinusculas: document.getElementById('incluirMinusculas').checked,
            incluirMayusculas: document.getElementById('incluirMayusculas').checked,
            incluirNumeros: document.getElementById('incluirNumeros').checked,
            incluirSimbolos: document.getElementById('incluirSimbolos').checked,
            usarSimbolosBasicos: document.getElementById('usarSimbolosBasicos').checked,
            evitarAmbiguos: document.getElementById('evitarAmbiguos').checked,
            sinCaracteresRepetidos: document.getElementById('sinRepetidos').checked,
            comenzarConLetra: document.getElementById('comenzarConLetra').checked
        };
    }

    construirConjuntoCaracteres(config) {
        let caracteres = '';
        
        if (config.incluirMinusculas) caracteres += this.caracteresDisponibles.minusculas;
        if (config.incluirMayusculas) caracteres += this.caracteresDisponibles.mayusculas;
        if (config.incluirNumeros) caracteres += this.caracteresDisponibles.numeros;
        if (config.incluirSimbolos) {
            caracteres += config.usarSimbolosBasicos ? 
                this.caracteresDisponibles.simbolosBasicos : 
                this.caracteresDisponibles.simbolos;
        }

        if (config.evitarAmbiguos) {
            caracteres = caracteres.split('')
                .filter(char => !this.caracteresDisponibles.ambiguos.includes(char))
                .join('');
        }

        return caracteres;
    }

    generarContrasena(config) {
        const conjuntoCaracteres = this.construirConjuntoCaracteres(config);
        
        if (conjuntoCaracteres.length === 0) {
            throw new Error('No hay caracteres disponibles con la configuración actual');
        }

        let contrasena = '';
        const caracteresUsados = new Set();

        if (config.comenzarConLetra) {
            const letras = this.caracteresDisponibles.minusculas + this.caracteresDisponibles.mayusculas;
            let letrasDisponibles = letras;
            
            if (config.evitarAmbiguos) {
                letrasDisponibles = letras.split('')
                    .filter(char => !this.caracteresDisponibles.ambiguos.includes(char))
                    .join('');
            }
            
            const primeraLetra = letrasDisponibles[Math.floor(Math.random() * letrasDisponibles.length)];
            contrasena += primeraLetra;
            
            if (config.sinCaracteresRepetidos) {
                caracteresUsados.add(primeraLetra);
            }
        }

        const longitudRestante = config.longitud - contrasena.length;
        
        for (let i = 0; i < longitudRestante; i++) {
            let caracteresDisponibles = conjuntoCaracteres;
            
            if (config.sinCaracteresRepetidos) {
                caracteresDisponibles = conjuntoCaracteres.split('')
                    .filter(char => !caracteresUsados.has(char))
                    .join('');
                
                if (caracteresDisponibles.length === 0) {
                    caracteresDisponibles = conjuntoCaracteres;
                }
            }
            
            const indiceAleatorio = Math.floor(Math.random() * caracteresDisponibles.length);
            const caracter = caracteresDisponibles[indiceAleatorio];
            contrasena += caracter;
            
            if (config.sinCaracteresRepetidos) {
                caracteresUsados.add(caracter);
            }
        }

        return contrasena;
    }

    generarContrasenaIndividual() {
        try {
            const config = this.obtenerConfiguracionActual();
            const contrasena = this.generarContrasena(config);
            
            this.mostrarContrasena(contrasena);
            this.analizarSeguridad(contrasena);
        } catch (error) {
            UtilsUI.mostrarNotificacion('Error al generar contraseña: ' + error.message, 'danger');
        }
    }

    generarMultiplesContrasenas() {
        try {
            const config = this.obtenerConfiguracionActual();
            const contrasenas = [];
            
            for (let i = 0; i < 5; i++) {
                contrasenas.push(this.generarContrasena(config));
            }
            
            this.mostrarMultiplesContrasenas(contrasenas);
            this.analizarSeguridad(contrasenas[0]); 
        } catch (error) {
            UtilsUI.mostrarNotificacion('Error al generar contraseñas: ' + error.message, 'danger');
        }
    }

    mostrarContrasena(contrasena) {
        const container = document.getElementById('resultadoContrasena');
        
        container.innerHTML = `
            <div class="text-center">
                <div class="mb-3">
                    <div class="input-group">
                        <input type="text" class="form-control form-control-lg text-center fw-bold" 
                               value="${contrasena}" readonly id="contrasenaGenerada"
                               style="font-family: 'Courier New', monospace; letter-spacing: 1px;">
                        <button class="btn btn-outline-secondary" onclick="this.previousElementSibling.type = this.previousElementSibling.type === 'password' ? 'text' : 'password'; this.innerHTML = this.innerHTML.includes('eye-slash') ? '<i class=\\'bi bi-eye\\'></i>' : '<i class=\\'bi bi-eye-slash\\'></i>'">
                            <i class="bi bi-eye-slash"></i>
                        </button>
                        <button class="btn btn-primary" onclick="UtilsUI.copiarAlPortapapeles('${contrasena}')">
                            <i class="bi bi-clipboard"></i>
                        </button>
                    </div>
                </div>
                
                <div class="d-flex justify-content-center gap-2">
                    <button class="btn btn-outline-primary btn-sm" onclick="this.closest('.card').querySelector('#generarContrasena').click()">
                        <i class="bi bi-arrow-clockwise me-1"></i>
                        Generar otra
                    </button>
                    <button class="btn btn-success btn-sm" onclick="UtilsUI.copiarAlPortapapeles('${contrasena}')">
                        <i class="bi bi-clipboard-check me-1"></i>
                        Copiar
                    </button>
                </div>
            </div>
        `;

        const input = container.querySelector('input');
        input.type = 'text';
    }

    mostrarMultiplesContrasenas(contrasenas) {
        const container = document.getElementById('resultadoContrasena');
        
        container.innerHTML = `
            <div class="mb-3">
                <h6 class="mb-3">5 Contraseñas Generadas</h6>
                ${contrasenas.map((contrasena, index) => `
                    <div class="input-group mb-2">
                        <span class="input-group-text" style="min-width: 40px;">${index + 1}</span>
                        <input type="text" class="form-control" value="${contrasena}" readonly
                               style="font-family: 'Courier New', monospace;">
                        <button class="btn btn-outline-secondary btn-sm" onclick="UtilsUI.copiarAlPortapapeles('${contrasena}')">
                            <i class="bi bi-clipboard"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
            
            <div class="text-center">
                <button class="btn btn-outline-primary btn-sm me-2" onclick="this.closest('.card').querySelector('#generarMultiples').click()">
                    <i class="bi bi-arrow-clockwise me-1"></i>
                    Generar otras 5
                </button>
                <button class="btn btn-success btn-sm" onclick="UtilsUI.copiarAlPortapapeles('${contrasenas.join('\\n')}')">
                    <i class="bi bi-clipboard-check me-1"></i>
                    Copiar todas
                </button>
            </div>
        `;
    }

    analizarSeguridad(contrasena) {
        const analisis = this.calcularFuerzaContrasena(contrasena);
        const container = document.getElementById('analisisSeguridad');
        
        const colorNivel = {
            'Muy débil': 'danger',
            'Débil': 'warning',
            'Regular': 'info',
            'Fuerte': 'success',
            'Muy fuerte': 'success'
        };

        container.innerHTML = `
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="card border-${colorNivel[analisis.nivel]}">
                        <div class="card-body text-center">
                            <h6 class="card-title">Nivel de Seguridad</h6>
                            <div class="display-6 text-${colorNivel[analisis.nivel]}">${analisis.nivel}</div>
                            <div class="progress mt-2">
                                <div class="progress-bar bg-${colorNivel[analisis.nivel]}" 
                                     style="width: ${analisis.porcentaje}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-title">Entropía</h6>
                            <div class="mb-2">
                                <strong>${analisis.entropia.toFixed(2)} bits</strong>
                            </div>
                            <small class="text-muted">
                                ${analisis.combinacionesPosibles.toExponential(2)} combinaciones posibles
                            </small>
                        </div>
                    </div>
                </div>
                
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-title">Tiempo estimado para romper</h6>
                            <div class="row g-3 text-center">
                                <div class="col-6 col-md-3">
                                    <div class="border rounded p-2">
                                        <div class="fw-bold text-danger">${analisis.tiempoRomper.online}</div>
                                        <small class="text-muted">Ataque online</small>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div class="border rounded p-2">
                                        <div class="fw-bold text-warning">${analisis.tiempoRomper.offline}</div>
                                        <small class="text-muted">Ataque offline</small>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div class="border rounded p-2">
                                        <div class="fw-bold text-info">${analisis.tiempoRomper.gpu}</div>
                                        <small class="text-muted">GPU potente</small>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div class="border rounded p-2">
                                        <div class="fw-bold text-success">${analisis.tiempoRomper.supercomputer}</div>
                                        <small class="text-muted">Supercomputadora</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="card-title">Características detectadas</h6>
                            <div class="d-flex flex-wrap gap-1">
                                ${analisis.caracteristicas.map(carac => 
                                    `<span class="badge bg-primary">${carac}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    calcularFuerzaContrasena(contrasena) {
        const longitud = contrasena.length;
        let conjuntoCaracteres = 0;
        const caracteristicas = [];

        if (/[a-z]/.test(contrasena)) {
            conjuntoCaracteres += 26;
            caracteristicas.push('Minúsculas');
        }
        if (/[A-Z]/.test(contrasena)) {
            conjuntoCaracteres += 26;
            caracteristicas.push('Mayúsculas');
        }
        if (/[0-9]/.test(contrasena)) {
            conjuntoCaracteres += 10;
            caracteristicas.push('Números');
        }
        if (/[^a-zA-Z0-9]/.test(contrasena)) {
            conjuntoCaracteres += 32; 
            caracteristicas.push('Símbolos');
        }

        const entropia = longitud * Math.log2(conjuntoCaracteres);
        const combinacionesPosibles = Math.pow(conjuntoCaracteres, longitud);

        let nivel, porcentaje;
        if (entropia < 30) {
            nivel = 'Muy débil';
            porcentaje = 20;
        } else if (entropia < 50) {
            nivel = 'Débil';
            porcentaje = 40;
        } else if (entropia < 70) {
            nivel = 'Regular';
            porcentaje = 60;
        } else if (entropia < 90) {
            nivel = 'Fuerte';
            porcentaje = 80;
        } else {
            nivel = 'Muy fuerte';
            porcentaje = 100;
        }

        const intentosPorSegundo = {
            online: 1000,           
            offline: 1e9,          
            gpu: 1e11,            
            supercomputer: 1e15    
        };

        const tiempoRomper = {};
        Object.entries(intentosPorSegundo).forEach(([tipo, velocidad]) => {
            const segundos = combinacionesPosibles / (2 * velocidad); 
            tiempoRomper[tipo] = this.formatearTiempo(segundos);
        });

        if (longitud >= 12) caracteristicas.push('Longitud adecuada');
        if (longitud >= 16) caracteristicas.push('Longitud excelente');
        if (!/(.)\1/.test(contrasena)) caracteristicas.push('Sin repeticiones');

        return {
            nivel,
            porcentaje,
            entropia,
            combinacionesPosibles,
            caracteristicas,
            tiempoRomper
        };
    }

    formatearTiempo(segundos) {
        if (segundos < 1) return 'Instantáneo';
        if (segundos < 60) return `${Math.round(segundos)} segundos`;
        if (segundos < 3600) return `${Math.round(segundos / 60)} minutos`;
        if (segundos < 86400) return `${Math.round(segundos / 3600)} horas`;
        if (segundos < 31536000) return `${Math.round(segundos / 86400)} días`;
        if (segundos < 31536000000) return `${Math.round(segundos / 31536000)} años`;
        
        const millones = segundos / 31536000000000;
        if (millones < 1000) return `${millones.toFixed(1)} millones de años`;
        
        const miles = millones / 1000;
        if (miles < 1000) return `${miles.toFixed(1)} miles de millones de años`;
        
        return 'Más de un billón de años';
    }
}

window.GeneradorContrasenas = GeneradorContrasenas;