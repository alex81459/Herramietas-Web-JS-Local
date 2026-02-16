class InspectorNavegador {
    constructor() {
        this.informacion = {};
        this.obtenerInformacion();
    }

    obtenerInformacion() {
        this.informacion.userAgent = navigator.userAgent;
        this.informacion.navegador = this.detectarNavegador();
        this.informacion.version = this.detectarVersionNavegador();
        this.informacion.plataforma = navigator.platform;
        this.informacion.idioma = navigator.language;
        this.informacion.idiomas = navigator.languages;
        this.informacion.cookiesHabilitadas = navigator.cookieEnabled;
        this.informacion.resolucionPantalla = `${screen.width} x ${screen.height}`;
        this.informacion.resolucionDisponible = `${screen.availWidth} x ${screen.availHeight}`;
        this.informacion.profundidadColor = screen.colorDepth;
        this.informacion.orientacion = screen.orientation ? screen.orientation.type : 'No disponible';
        this.informacion.resolucionVentana = `${window.innerWidth} x ${window.innerHeight}`;
        this.informacion.factorZoom = window.devicePixelRatio;
        this.informacion.conexion = this.obtenerInfoConexion();
        this.informacion.zonaHoraria = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.informacion.offsetZonaHoraria = new Date().getTimezoneOffset();
        this.informacion.nucleosCPU = navigator.hardwareConcurrency || 'No disponible';
        this.informacion.memoriaProbable = this.estimarRAM();

        this.obtenerInfoAlmacenamiento();
        this.informacion.servicioActivo = 'serviceWorker' in navigator;
        this.informacion.notificacionesDisponibles = 'Notification' in window;
        this.informacion.gelocalizacionDisponible = 'geolocation' in navigator;
        this.informacion.bluetoothDisponible = 'bluetooth' in navigator;
        this.informacion.usbDisponible = 'usb' in navigator;
        this.informacion.webGL = this.obtenerInfoWebGL();
        this.informacion.tactilDisponible = 'ontouchstart' in window;
        this.informacion.bateria = this.obtenerInfoBateria();
        this.informacion.protocoloSeguro = location.protocol === 'https:';
        this.informacion.modoPrivado = this.detectarModoPrivado();
        this.informacion.plugins = this.obtenerPlugins();
        this.informacion.dispositivoMovil = this.esDispositivoMovil();
    }

    detectarNavegador() {
        const ua = navigator.userAgent;
        
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Chrome') && !ua.includes('Chromium')) return 'Chrome';
        if (ua.includes('Chromium')) return 'Chromium';
        if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        if (ua.includes('Opera')) return 'Opera';
        if (ua.includes('Trident') || ua.includes('MSIE')) return 'Internet Explorer';
        
        return 'Desconocido';
    }

    detectarVersionNavegador() {
        const ua = navigator.userAgent;
        let match;
        
        if ((match = ua.match(/Firefox\/(\d+)/))) return match[1];
        if ((match = ua.match(/Chrome\/(\d+)/))) return match[1];
        if ((match = ua.match(/Safari\/(\d+)/))) return match[1];
        if ((match = ua.match(/Edge\/(\d+)/))) return match[1];
        if ((match = ua.match(/Opera\/(\d+)/))) return match[1];
        
        return 'Desconocida';
    }

    obtenerInfoConexion() {
        const conexion = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (!conexion) return 'No disponible';
        
        return {
            tipoEfectivo: conexion.effectiveType || 'Desconocido',
            velocidadBajada: conexion.downlink ? `${conexion.downlink} Mbps` : 'Desconocido',
            rtt: conexion.rtt ? `${conexion.rtt} ms` : 'Desconocido',
            guardarDatos: conexion.saveData || false
        };
    }

    estimarRAM() {
        const memoria = navigator.deviceMemory;
        if (memoria) return `${memoria} GB`;
        const cores = navigator.hardwareConcurrency || 0;
        if (cores >= 8) return '8+ GB (estimado)';
        if (cores >= 4) return '4-8 GB (estimado)';
        if (cores >= 2) return '2-4 GB (estimado)';
        return '< 2 GB (estimado)';
    }

    obtenerInfoAlmacenamiento() {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            navigator.storage.estimate().then(estimate => {
                const cuotaGB = (estimate.quota / (1024 * 1024 * 1024)).toFixed(2);
                const usoGB = (estimate.usage / (1024 * 1024 * 1024)).toFixed(2);
                
                this.informacion.almacenamientoEstimado = {
                    cuota: `${cuotaGB} GB`,
                    uso: `${usoGB} GB`,
                    disponible: `${(cuotaGB - usoGB).toFixed(2)} GB`
                };
                
                this.actualizarAlmacenamiento();
            });
        } else {
            this.informacion.almacenamientoEstimado = 'No disponible';
        }
    }

    obtenerInfoWebGL() {
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            if (!gl) return 'No disponible';
            
            const renderer = gl.getParameter(gl.RENDERER);
            const vendor = gl.getParameter(gl.VENDOR);
            const version = gl.getParameter(gl.VERSION);
            
            return {
                renderer: renderer,
                vendor: vendor,
                version: version,
                extensiones: gl.getSupportedExtensions().length
            };
        } catch (e) {
            return 'Error al obtener información WebGL';
        }
    }

    obtenerInfoBateria() {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                this.informacion.bateria = {
                    nivel: Math.round(battery.level * 100) + '%',
                    cargando: battery.charging ? 'Sí' : 'No',
                    tiempoRestante: battery.dischargingTime !== Infinity ? 
                        `${Math.round(battery.dischargingTime / 3600)} horas` : 'N/A',
                    tiempoCarga: battery.chargingTime !== Infinity ? 
                        `${Math.round(battery.chargingTime / 3600)} horas` : 'N/A'
                };
                
                this.actualizarBateria();
            });
        } else {
            return 'No disponible';
        }
    }

    detectarModoPrivado() {
        try {
            localStorage.setItem('test', '1');
            localStorage.removeItem('test');
            return false;
        } catch (e) {
            return true;
        }
    }

    obtenerPlugins() {
        const plugins = [];
        for (let i = 0; i < navigator.plugins.length; i++) {
            plugins.push({
                nombre: navigator.plugins[i].name,
                version: navigator.plugins[i].version || 'N/A'
            });
        }
        return plugins;
    }

    esDispositivoMovil() {
        const ua = navigator.userAgent;
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    }

    render(container) {
        container.innerHTML = `
            <div class="row">
                <!-- Información del Navegador -->
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Navegador
                            </h5>
                        </div>
                        <div class="card-body">
                            <table class="table table-sm">
                                <tr>
                                    <td><strong>Navegador:</strong></td>
                                    <td>${this.informacion.navegador}</td>
                                </tr>
                                <tr>
                                    <td><strong>Versión:</strong></td>
                                    <td>${this.informacion.version}</td>
                                </tr>
                                <tr>
                                    <td><strong>User-Agent:</strong></td>
                                    <td class="text-break small">${this.informacion.userAgent}</td>
                                </tr>
                                <tr>
                                    <td><strong>Plataforma:</strong></td>
                                    <td>${this.informacion.plataforma}</td>
                                </tr>
                                <tr>
                                    <td><strong>Idioma:</strong></td>
                                    <td>${this.informacion.idioma}</td>
                                </tr>
                                <tr>
                                    <td><strong>Cookies habilitadas:</strong></td>
                                    <td>
                                        <span class="badge ${this.informacion.cookiesHabilitadas ? 'bg-success' : 'bg-danger'}">
                                            ${this.informacion.cookiesHabilitadas ? 'Sí' : 'No'}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Modo privado:</strong></td>
                                    <td>
                                        <span class="badge ${this.informacion.modoPrivado ? 'bg-warning' : 'bg-success'}">
                                            ${this.informacion.modoPrivado ? 'Sí' : 'No'}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Protocolo seguro:</strong></td>
                                    <td>
                                        <span class="badge ${this.informacion.protocoloSeguro ? 'bg-success' : 'bg-danger'}">
                                            ${this.informacion.protocoloSeguro ? 'HTTPS' : 'HTTP'}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Hardware
                            </h5>
                        </div>
                        <div class="card-body">
                            <table class="table table-sm">
                                <tr>
                                    <td><strong>Núcleos CPU:</strong></td>
                                    <td>${this.informacion.nucleosCPU}</td>
                                </tr>
                                <tr>
                                    <td><strong>RAM estimada:</strong></td>
                                    <td>${this.informacion.memoriaProbable}</td>
                                </tr>
                                <tr>
                                    <td><strong>Dispositivo móvil:</strong></td>
                                    <td>
                                        <span class="badge ${this.informacion.dispositivoMovil ? 'bg-info' : 'bg-secondary'}">
                                            ${this.informacion.dispositivoMovil ? 'Sí' : 'No'}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Pantalla táctil:</strong></td>
                                    <td>
                                        <span class="badge ${this.informacion.tactilDisponible ? 'bg-info' : 'bg-secondary'}">
                                            ${this.informacion.tactilDisponible ? 'Disponible' : 'No disponible'}
                                        </span>
                                    </td>
                                </tr>
                            </table>
                            
                            <div id="infoBateria" class="mt-3">
                                <!-- Se llenará dinámicamente -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Pantalla y Ventana
                            </h5>
                        </div>
                        <div class="card-body">
                            <table class="table table-sm">
                                <tr>
                                    <td><strong>Resolución pantalla:</strong></td>
                                    <td>${this.informacion.resolucionPantalla}</td>
                                </tr>
                                <tr>
                                    <td><strong>Área disponible:</strong></td>
                                    <td>${this.informacion.resolucionDisponible}</td>
                                </tr>
                                <tr>
                                    <td><strong>Resolución ventana:</strong></td>
                                    <td id="resolucionVentana">${this.informacion.resolucionVentana}</td>
                                </tr>
                                <tr>
                                    <td><strong>Factor de zoom:</strong></td>
                                    <td>${this.informacion.factorZoom}x</td>
                                </tr>
                                <tr>
                                    <td><strong>Profundidad color:</strong></td>
                                    <td>${this.informacion.profundidadColor} bits</td>
                                </tr>
                                <tr>
                                    <td><strong>Orientación:</strong></td>
                                    <td id="orientacion">${this.informacion.orientacion}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Red y Conexión
                            </h5>
                        </div>
                        <div class="card-body">
                            ${this.renderizarInfoRed()}
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                APIs y Capacidades
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-2">
                                        <span class="badge ${this.informacion.servicioActivo ? 'bg-success' : 'bg-secondary'}">
                                            Service Worker
                                        </span>
                                    </div>
                                    <div class="mb-2">
                                        <span class="badge ${this.informacion.notificacionesDisponibles ? 'bg-success' : 'bg-secondary'}">
                                            Notificaciones
                                        </span>
                                    </div>
                                    <div class="mb-2">
                                        <span class="badge ${this.informacion.gelocalizacionDisponible ? 'bg-success' : 'bg-secondary'}">
                                            Geolocalización
                                        </span>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-2">
                                        <span class="badge ${this.informacion.bluetoothDisponible ? 'bg-success' : 'bg-secondary'}">
                                            Bluetooth
                                        </span>
                                    </div>
                                    <div class="mb-2">
                                        <span class="badge ${this.informacion.usbDisponible ? 'bg-success' : 'bg-secondary'}">
                                            USB API
                                        </span>
                                    </div>
                                    <div class="mb-2">
                                        <span class="badge ${this.informacion.webGL !== 'No disponible' ? 'bg-success' : 'bg-secondary'}">
                                            WebGL
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <!-- WebGL Info -->
                    ${this.renderizarInfoWebGL()}
                </div>
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Almacenamiento
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="infoAlmacenamiento">
                                <p class="text-muted">Calculando...</p>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-clock me-2"></i>
                                Zona Horaria
                            </h5>
                        </div>
                        <div class="card-body">
                            <table class="table table-sm">
                                <tr>
                                    <td><strong>Zona horaria:</strong></td>
                                    <td>${this.informacion.zonaHoraria}</td>
                                </tr>
                                <tr>
                                    <td><strong>Offset UTC:</strong></td>
                                    <td>${this.informacion.offsetZonaHoraria / -60} horas</td>
                                </tr>
                                <tr>
                                    <td><strong>Hora local:</strong></td>
                                    <td id="horaLocal">${new Date().toLocaleString()}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
        this.configurarEventos();
        this.iniciarActualizaciones();
    }

    renderizarInfoRed() {
        if (this.informacion.conexion === 'No disponible') {
            return '<p class="text-muted">Información de red no disponible</p>';
        }

        return `
            <table class="table table-sm">
                <tr>
                    <td><strong>Tipo de conexión:</strong></td>
                    <td>${this.informacion.conexion.tipoEfectivo}</td>
                </tr>
                <tr>
                    <td><strong>Velocidad de bajada:</strong></td>
                    <td>${this.informacion.conexion.velocidadBajada}</td>
                </tr>
                <tr>
                    <td><strong>RTT:</strong></td>
                    <td>${this.informacion.conexion.rtt}</td>
                </tr>
                <tr>
                    <td><strong>Ahorro de datos:</strong></td>
                    <td>
                        <span class="badge ${this.informacion.conexion.guardarDatos ? 'bg-info' : 'bg-secondary'}">
                            ${this.informacion.conexion.guardarDatos ? 'Activado' : 'Desactivado'}
                        </span>
                    </td>
                </tr>
            </table>
        `;
    }

    renderizarInfoWebGL() {
        if (this.informacion.webGL === 'No disponible') {
            return `
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="card-title mb-0">
                            <i class="bi bi-display-fill me-2"></i>
                            WebGL
                        </h5>
                    </div>
                    <div class="card-body">
                        <p class="text-muted">WebGL no disponible</p>
                    </div>
                </div>
            `;
        }

        return `
            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mb-0">
                        <i class="bi bi-display-fill me-2"></i>
                        WebGL
                    </h5>
                </div>
                <div class="card-body">
                    <table class="table table-sm">
                        <tr>
                            <td><strong>Renderer:</strong></td>
                            <td class="text-break small">${this.informacion.webGL.renderer}</td>
                        </tr>
                        <tr>
                            <td><strong>Vendor:</strong></td>
                            <td>${this.informacion.webGL.vendor}</td>
                        </tr>
                        <tr>
                            <td><strong>Versión:</strong></td>
                            <td>${this.informacion.webGL.version}</td>
                        </tr>
                        <tr>
                            <td><strong>Extensiones:</strong></td>
                            <td>${this.informacion.webGL.extensiones}</td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    }

    configurarEventos() {
        window.addEventListener('resize', () => {
            const resolucionVentana = document.getElementById('resolucionVentana');
            if (resolucionVentana) {
                resolucionVentana.textContent = `${window.innerWidth} x ${window.innerHeight}`;
            }
        });

        if (screen.orientation) {
            screen.orientation.addEventListener('change', () => {
                const orientacion = document.getElementById('orientacion');
                if (orientacion) {
                    orientacion.textContent = screen.orientation.type;
                }
            });
        }
    }

    iniciarActualizaciones() {
        setInterval(() => {
            const horaLocal = document.getElementById('horaLocal');
            if (horaLocal) {
                horaLocal.textContent = new Date().toLocaleString();
            }
        }, 1000);
    }

    actualizarAlmacenamiento() {
        const contenedor = document.getElementById('infoAlmacenamiento');
        if (contenedor && this.informacion.almacenamientoEstimado !== 'No disponible') {
            contenedor.innerHTML = `
                <table class="table table-sm">
                    <tr>
                        <td><strong>Cuota total:</strong></td>
                        <td>${this.informacion.almacenamientoEstimado.cuota}</td>
                    </tr>
                    <tr>
                        <td><strong>Usado:</strong></td>
                        <td>${this.informacion.almacenamientoEstimado.uso}</td>
                    </tr>
                    <tr>
                        <td><strong>Disponible:</strong></td>
                        <td>${this.informacion.almacenamientoEstimado.disponible}</td>
                    </tr>
                </table>
            `;
        } else if (contenedor) {
            contenedor.innerHTML = '<p class="text-muted">Información de almacenamiento no disponible</p>';
        }
    }

    actualizarBateria() {
        const contenedor = document.getElementById('infoBateria');
        if (contenedor && this.informacion.bateria && typeof this.informacion.bateria === 'object') {
            contenedor.innerHTML = `
                <h6 class="fw-bold">Batería</h6>
                <table class="table table-sm">
                    <tr>
                        <td><strong>Nivel:</strong></td>
                        <td>${this.informacion.bateria.nivel}</td>
                    </tr>
                    <tr>
                        <td><strong>Cargando:</strong></td>
                        <td>${this.informacion.bateria.cargando}</td>
                    </tr>
                    <tr>
                        <td><strong>Tiempo restante:</strong></td>
                        <td>${this.informacion.bateria.tiempoRestante}</td>
                    </tr>
                    <tr>
                        <td><strong>Tiempo de carga:</strong></td>
                        <td>${this.informacion.bateria.tiempoCarga}</td>
                    </tr>
                </table>
            `;
        }
    }
}

if (typeof window !== 'undefined') {
    window.InspectorNavegador = InspectorNavegador;
}