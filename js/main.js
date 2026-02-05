class SuiteHerramientas {
    constructor() {
        this.herramientaActual = null;
        this.herramientas = [];
        this.init();
    }

    init() {
        this.cargarTema();
        this.configurarEventos();
        this.cargarHerramientas();
        this.renderizarInterfaz();
    }

    cargarTema() {
        GestorTemas.aplicarTema(GestorTemas.temaActual());
    }

    configurarEventos() {
        document.getElementById('alternarTema')?.addEventListener('click', () => {
            GestorTemas.alternarTema();
        });

        document.getElementById('verFavoritos')?.addEventListener('click', () => {
            this.mostrarModalFavoritos();
        });

        const buscador = document.getElementById('buscadorHerramientas');
        if (buscador) {
            buscador.addEventListener('input', debounce((e) => {
                this.filtrarHerramientas(e.target.value);
            }, 300));
        }

        document.getElementById('filtroCategoria')?.addEventListener('change', (e) => {
            this.filtrarPorCategoria(e.target.value);
        });
        this.configurarNavigacionMovil();
    }

    configurarNavigacionMovil() {
        const toggleBtn = document.querySelector('.navbar-toggler');
        const sidebar = document.getElementById('sidebar');
        
        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('show');
            });
            
            document.querySelector('main')?.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    sidebar.classList.remove('show');
                }
            });
        }
    }

    cargarHerramientas() {
        this.herramientas = [
            {
                id: 'generador-rut',
                nombre: 'Generador de RUT',
                descripcion: 'Genera y valida RUTs chilenos con formato correcto',
                categoria: 'ti',
                icono: 'bi-person-badge',
                tags: ['rut', 'validacion', 'chile', 'identificacion'],
                modulo: 'generador-rut'
            },
            {
                id: 'generador-contrasenas',
                nombre: 'Generador de Contraseñas',
                descripcion: 'Crea contraseñas seguras personalizables',
                categoria: 'ti',
                icono: 'bi-key',
                tags: ['password', 'seguridad', 'encriptacion'],
                modulo: 'generador-contrasenas'
            },
            {
                id: 'generador-hashes',
                nombre: 'Generador de Hashes',
                descripcion: 'Genera SHA-256, SHA-1 y MD5 de texto o archivos',
                categoria: 'ti',
                icono: 'bi-shield-lock',
                tags: ['hash', 'sha256', 'md5', 'criptografia'],
                modulo: 'generador-hashes'
            },
            {
                id: 'base64-conversor',
                nombre: 'Conversor Base64',
                descripcion: 'Convierte archivos a Base64 y muestra metadata',
                categoria: 'ti',
                icono: 'bi-file-earmark-code',
                tags: ['base64', 'archivo', 'codificacion'],
                modulo: 'base64-conversor'
            },
            {
                id: 'jwt-decoder',
                nombre: 'Decodificador JWT',
                descripcion: 'Decodifica tokens JWT para debugging',
                categoria: 'ti',
                icono: 'bi-key-fill',
                tags: ['jwt', 'token', 'debug'],
                modulo: 'jwt-decoder'
            },
            {
                id: 'json-formatter',
                nombre: 'Formateador JSON',
                descripcion: 'Formatea, minifica y valida archivos JSON',
                categoria: 'ti',
                icono: 'bi-code-slash',
                tags: ['json', 'formatear', 'validar'],
                modulo: 'json-formatter'
            },
            {
                id: 'generador-uuid',
                nombre: 'Generador de UUID v4',
                descripcion: 'Genera identificadores únicos universales usando crypto.randomUUID()',
                categoria: 'ti',
                icono: 'bi-hash',
                tags: ['uuid', 'identificador', 'unico', 'crypto'],
                modulo: 'generador-uuid'
            },
            {
                id: 'compresor-imagenes',
                nombre: 'Compresor de Imágenes',
                descripcion: 'Reduce el tamaño de imágenes JPG, PNG y WebP',
                categoria: 'imagenes',
                icono: 'bi-images',
                tags: ['imagen', 'comprimir', 'optimizar'],
                modulo: 'compresor-imagenes'
            },
            {
                id: 'conversor-imagenes',
                nombre: 'Conversor de Imágenes',
                descripcion: 'Convierte entre PNG, JPG, WebP y AVIF',
                categoria: 'imagenes',
                icono: 'bi-arrow-left-right',
                tags: ['imagen', 'convertir', 'formato'],
                modulo: 'conversor-imagenes'
            },
            {
                id: 'contador-texto',
                nombre: 'Contador de Texto',
                descripcion: 'Cuenta palabras, caracteres y limpia texto',
                categoria: 'documentos',
                icono: 'bi-card-text',
                tags: ['texto', 'contar', 'limpiar'],
                modulo: 'contador-texto'
            },
            {
                id: 'verificador-certificados',
                nombre: 'Verificador de Certificados TLS',
                descripcion: 'Analiza certificados PEM: fechas, algoritmo y tamaño de clave',
                categoria: 'ti',
                icono: 'bi-shield-check',
                tags: ['certificado', 'tls', 'ssl', 'pem', 'seguridad'],
                modulo: 'verificador-certificados'
            },
            {
                id: 'formateador-sql',
                nombre: 'Formateador SQL',
                descripcion: 'Formatea consultas SELECT/INSERT/UPDATE para MySQL/PostgreSQL',
                categoria: 'ti',
                icono: 'bi-code-slash',
                tags: ['sql', 'formatear', 'mysql', 'postgresql', 'consulta'],
                modulo: 'formateador-sql'
            }
        ];
    }

    renderizarInterfaz() {
        this.actualizarEstadisticas();
        this.renderizarHerramientas();
        this.renderizarSidebar();
        this.renderizarHistorial();
        this.actualizarContadorFavoritos();
    }

    actualizarEstadisticas() {
        const totalHerramientas = this.herramientas.length;
        const totalFavoritos = GestorFavoritos.obtenerFavoritos().length;
        const totalUsadas = GestorHistorial.obtenerHistorial().length;

        document.getElementById('totalHerramientas').textContent = totalHerramientas;
        document.getElementById('totalFavoritos').textContent = totalFavoritos;
        document.getElementById('totalUsadas').textContent = totalUsadas;
    }

    renderizarHerramientas(herramientas = this.herramientas) {
        const container = document.getElementById('cardsHerramientas');
        if (!container) return;

        container.innerHTML = herramientas.map(herramienta => `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card card-herramienta h-100" data-id="${herramienta.id}">
                    <div class="card-body position-relative">
                        <button class="btn btn-favorito ${GestorFavoritos.esFavorito(herramienta.id) ? 'favorito-activo' : ''}"
                                data-id="${herramienta.id}">
                            <i class="bi bi-heart${GestorFavoritos.esFavorito(herramienta.id) ? '-fill' : ''}"></i>
                        </button>
                        
                        <span class="badge badge-categoria bg-${this.obtenerColorCategoria(herramienta.categoria)}">
                            ${this.obtenerNombreCategoria(herramienta.categoria)}
                        </span>
                        
                        <div class="text-center">
                            <i class="${herramienta.icono} icono-herramienta"></i>
                            <h5 class="card-title">${herramienta.nombre}</h5>
                            <p class="card-text text-muted">${herramienta.descripcion}</p>
                        </div>
                        
                        <div class="mt-3">
                            ${herramienta.tags.map(tag => 
                                `<span class="badge bg-secondary text-white me-1 mb-1">${tag}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        this.configurarEventosCards();
    }

    configurarEventosCards() {
        document.querySelectorAll('.card-herramienta').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.btn-favorito')) return;
                const id = card.dataset.id;
                this.abrirHerramienta(id);
            });
        });

        document.querySelectorAll('.btn-favorito').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                this.alternarFavorito(id, btn);
            });
        });
    }

    alternarFavorito(id, btn) {
        const esFavorito = GestorFavoritos.alternarFavorito(id);
        
        btn.classList.toggle('favorito-activo', esFavorito);
        const icon = btn.querySelector('i');
        icon.className = `bi bi-heart${esFavorito ? '-fill' : ''}`;
        
        this.actualizarContadorFavoritos();
        this.actualizarEstadisticas();
        
        UtilsUI.mostrarNotificacion(
            esFavorito ? 'Agregado a favoritos' : 'Removido de favoritos',
            esFavorito ? 'success' : 'info',
            1500
        );
    }

    abrirHerramienta(id) {
        const herramienta = this.herramientas.find(h => h.id === id);
        if (!herramienta) return;

        this.herramientaActual = herramienta;
        GestorHistorial.agregarAlHistorial(id);

        document.getElementById('vistaInicio').style.display = 'none';
        
        const vistaHerramienta = document.getElementById('vistaHerramienta');
        vistaHerramienta.style.display = 'block';

        this.actualizarBreadcrumb(herramienta);

        this.cargarModuloHerramienta(herramienta);

        this.renderizarHistorial();
        this.actualizarEstadisticas();
    }

    cargarModuloHerramienta(herramienta) {
        const vistaHerramienta = document.getElementById('vistaHerramienta');
        
        vistaHerramienta.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 class="mb-2">
                        <i class="${herramienta.icono} me-2"></i>
                        ${herramienta.nombre}
                    </h2>
                    <p class="text-muted mb-0">${herramienta.descripcion}</p>
                </div>
                <button class="btn btn-outline-secondary" onclick="app.volverAlInicio()">
                    <i class="bi bi-arrow-left"></i> Volver
                </button>
            </div>
            <div id="contenidoHerramienta">
            </div>
        `;

        switch (herramienta.modulo) {
            case 'generador-rut':
                if (window.GeneradorRUT) {
                    new GeneradorRUT().render(document.getElementById('contenidoHerramienta'));
                }
                break;
            case 'generador-contrasenas':
                if (window.GeneradorContrasenas) {
                    new GeneradorContrasenas().render(document.getElementById('contenidoHerramienta'));
                }
                break;
            case 'generador-hashes':
                if (window.GeneradorHashes) {
                    new GeneradorHashes().render(document.getElementById('contenidoHerramienta'));
                }
                break;
            case 'base64-conversor':
                if (window.base64Conversor) {
                    window.base64Conversor.render();
                }
                break;
            case 'jwt-decoder':
                if (window.decodificadorJWT) {
                    window.decodificadorJWT.render();
                }
                break;
            case 'json-formatter':
                if (window.formateadorJSON) {
                    window.formateadorJSON.render();
                }
                break;
            case 'generador-uuid':
                if (window.generadorUUID) {
                    window.generadorUUID.render();
                }
                break;
            case 'compresor-imagenes':
                if (window.compresorImagenes) {
                    window.compresorImagenes.render();
                }
                break;
            case 'conversor-imagenes':
                if (window.conversorImagenes) {
                    window.conversorImagenes.render();
                }
                break;
            case 'contador-texto':
                if (window.contadorTexto) {
                    window.contadorTexto.render();
                }
                break;
            case 'verificador-certificados':
                if (window.VerificadorCertificados) {
                    new VerificadorCertificados().render();
                }
                break;
            case 'formateador-sql':
                if (window.FormateadorSQL) {
                    new FormateadorSQL().render();
                }
                break;
            default:
                document.getElementById('contenidoHerramienta').innerHTML = `
                    <div class="alert alert-info">
                        <i class="bi bi-info-circle me-2"></i>
                        Esta herramienta está en desarrollo.
                    </div>
                `;
        }
    }

    volverAlInicio() {
        document.getElementById('vistaHerramienta').style.display = 'none';
        document.getElementById('vistaInicio').style.display = 'block';
        
        document.getElementById('breadcrumb').innerHTML = '<li class="breadcrumb-item active">Inicio</li>';
        
        this.herramientaActual = null;
    }

    actualizarBreadcrumb(herramienta) {
        const breadcrumb = document.getElementById('breadcrumb');
        breadcrumb.innerHTML = `
            <li class="breadcrumb-item">
                <a href="#" onclick="app.volverAlInicio()">Inicio</a>
            </li>
            <li class="breadcrumb-item active">${herramienta.nombre}</li>
        `;
    }

    renderizarSidebar() {
        const lista = document.getElementById('listaHerramientas');
        if (!lista) return;

        const herramientasPorCategoria = {};
        this.herramientas.forEach(h => {
            if (!herramientasPorCategoria[h.categoria]) {
                herramientasPorCategoria[h.categoria] = [];
            }
            herramientasPorCategoria[h.categoria].push(h);
        });

        let html = '';
        Object.entries(herramientasPorCategoria).forEach(([categoria, herramientas]) => {
            html += `
                <li class="nav-item mb-2">
                    <h6 class="nav-header text-uppercase text-muted fw-bold">
                        ${this.obtenerNombreCategoria(categoria)}
                    </h6>
                </li>
            `;
            
            herramientas.forEach(h => {
                html += `
                    <li class="nav-item">
                        <a href="#" class="nav-link ${this.herramientaActual?.id === h.id ? 'active' : ''}"
                           data-id="${h.id}">
                            <i class="${h.icono} icono-nav"></i>
                            ${h.nombre}
                        </a>
                    </li>
                `;
            });
        });

        lista.innerHTML = html;
        lista.querySelectorAll('.nav-link[data-id]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.abrirHerramienta(link.dataset.id);
            });
        });
    }

    renderizarHistorial() {
        const lista = document.getElementById('historialReciente');
        const historial = GestorHistorial.obtenerHistorial().slice(0, 5);
        
        if (historial.length === 0) {
            lista.innerHTML = '<li class="nav-item"><small class="text-muted">Sin historial</small></li>';
            return;
        }

        lista.innerHTML = historial.map(item => {
            const herramienta = this.herramientas.find(h => h.id === item.id);
            if (!herramienta) return '';
            
            return `
                <li class="nav-item">
                    <a href="#" class="nav-link nav-link-sm" data-id="${item.id}">
                        <i class="${herramienta.icono} icono-nav"></i>
                        <small>${herramienta.nombre}</small>
                    </a>
                </li>
            `;
        }).join('');

        lista.querySelectorAll('.nav-link[data-id]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.abrirHerramienta(link.dataset.id);
            });
        });
    }

    actualizarContadorFavoritos() {
        const contador = document.getElementById('contadorFavoritos');
        const favoritos = GestorFavoritos.obtenerFavoritos();
        contador.textContent = favoritos.length;
        contador.style.display = favoritos.length > 0 ? 'inline' : 'none';
    }

    mostrarModalFavoritos() {
        const favoritos = GestorFavoritos.obtenerFavoritos();
        const lista = document.getElementById('listaFavoritosModal');
        
        if (favoritos.length === 0) {
            lista.innerHTML = '<p class="text-muted">No tienes herramientas favoritas aún.</p>';
        } else {
            lista.innerHTML = favoritos.map(id => {
                const herramienta = this.herramientas.find(h => h.id === id);
                if (!herramienta) return '';
                
                return `
                    <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
                        <div class="d-flex align-items-center">
                            <i class="${herramienta.icono} me-2 text-primary"></i>
                            <span>${herramienta.nombre}</span>
                        </div>
                        <button class="btn btn-sm btn-primary" onclick="app.abrirHerramienta('${id}'); bootstrap.Modal.getInstance(document.getElementById('modalFavoritos')).hide();">
                            Abrir
                        </button>
                    </div>
                `;
            }).join('');
        }

        const modal = new bootstrap.Modal(document.getElementById('modalFavoritos'));
        modal.show();
    }

    filtrarHerramientas(termino) {
        const filtradas = this.herramientas.filter(h => 
            h.nombre.toLowerCase().includes(termino.toLowerCase()) ||
            h.descripcion.toLowerCase().includes(termino.toLowerCase()) ||
            h.tags.some(tag => tag.toLowerCase().includes(termino.toLowerCase()))
        );
        this.renderizarHerramientas(filtradas);
    }

    filtrarPorCategoria(categoria) {
        const filtradas = categoria ? 
            this.herramientas.filter(h => h.categoria === categoria) : 
            this.herramientas;
        this.renderizarHerramientas(filtradas);
    }

    obtenerColorCategoria(categoria) {
        const colores = {
            'ti': 'primary',
            'imagenes': 'success',
            'documentos': 'warning'
        };
        return colores[categoria] || 'secondary';
    }

    obtenerNombreCategoria(categoria) {
        const nombres = {
            'ti': 'Herramientas TI',
            'imagenes': 'Imágenes',
            'documentos': 'Documentos'
        };
        return nombres[categoria] || categoria;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new SuiteHerramientas();
});