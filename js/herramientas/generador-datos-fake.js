class GeneradorDatosFake {
    constructor() {
        this.datosGenerados = [];
        this.limiteTabla = 50;
        this.dominiosCorreo = ['empresa.cl', 'correo.com', 'mail.com', 'pruebas.local'];
        this.nombres = [
            'Ana', 'Luis', 'Camila', 'Pedro', 'Valentina', 'Javier', 'Carla', 'Diego',
            'Fernanda', 'Marco', 'Daniela', 'Sofia', 'Tomas', 'Paula', 'Miguel', 'Jose'
        ];
        this.apellidos = [
            'Gonzalez', 'Rodriguez', 'Perez', 'Sanchez', 'Munoz', 'Rojas', 'Diaz', 'Vargas',
            'Castillo', 'Torres', 'Silva', 'Morales', 'Flores', 'Herrera', 'Araya', 'Navarro'
        ];
        this.calles = [
            'Los Alerces', 'Nueva', 'Libertad', 'O Higgins', 'Providencia', 'San Martin',
            'Los Pinos', 'La Florida', 'Las Condes', 'Colon', 'Independencia', 'San Pablo'
        ];
        this.comunas = [
            'Santiago', 'Providencia', 'Las Condes', 'Nunoa', 'La Florida', 'Maipu',
            'Puente Alto', 'San Miguel', 'La Reina', 'Quilicura'
        ];
    }

    renderizar() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-people-fill text-primary me-2"></i>Generador de Datos Fake</h2>
                            <p class="text-muted mb-0">Personas con RUT, correos, telefonos y direcciones para pruebas</p>
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
                                <i class="bi bi-sliders me-2"></i>Configuracion
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row g-3 align-items-end">
                                <div class="col-md-3">
                                    <label for="cantidadRegistros" class="form-label fw-bold">Cantidad</label>
                                    <input type="number" id="cantidadRegistros" class="form-control" min="1" max="500" value="25">
                                </div>
                                <div class="col-md-3">
                                    <label for="dominioCorreo" class="form-label fw-bold">Dominio correo</label>
                                    <select id="dominioCorreo" class="form-select">
                                        <option value="empresa.cl">empresa.cl</option>
                                        <option value="correo.com">correo.com</option>
                                        <option value="mail.com">mail.com</option>
                                        <option value="pruebas.local">pruebas.local</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label for="formatoSalida" class="form-label fw-bold">Formato JSON</label>
                                    <select id="formatoSalida" class="form-select">
                                        <option value="2">2 espacios</option>
                                        <option value="4" selected>4 espacios</option>
                                        <option value="0">Minificado</option>
                                    </select>
                                </div>
                                <div class="col-md-3 d-grid">
                                    <button id="botonGenerar" class="btn btn-success">
                                        <i class="bi bi-magic me-1"></i>Generar datos
                                    </button>
                                </div>
                            </div>
                            <div class="mt-3 text-muted">
                                <small>Se generan hasta 500 registros. La tabla muestra maximo ${this.limiteTabla} filas.</small>
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
                                <i class="bi bi-table me-2"></i>Vista previa
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <small class="text-muted" id="resumenSalida">Sin datos generados</small>
                                <div class="d-flex gap-2">
                                    <button id="copiarJson" class="btn btn-sm btn-outline-primary" disabled>
                                        <i class="bi bi-clipboard me-1"></i>Copiar JSON
                                    </button>
                                    <button id="descargarJson" class="btn btn-sm btn-outline-success" disabled>
                                        <i class="bi bi-download me-1"></i>Descargar JSON
                                    </button>
                                    <button id="copiarCsv" class="btn btn-sm btn-outline-primary" disabled>
                                        <i class="bi bi-clipboard me-1"></i>Copiar CSV
                                    </button>
                                    <button id="descargarCsv" class="btn btn-sm btn-outline-success" disabled>
                                        <i class="bi bi-download me-1"></i>Descargar CSV
                                    </button>
                                </div>
                            </div>
                            <div class="table-responsive" style="max-height: 360px; overflow-y: auto;">
                                <table class="table table-sm table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>RUT</th>
                                            <th>Correo</th>
                                            <th>Telefono</th>
                                            <th>Direccion</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tablaResultados">
                                        <tr>
                                            <td colspan="7" class="text-muted">No hay datos generados</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-6 mb-4">
                    <div class="card herramienta-card">
                        <div class="card-header bg-success text-white">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-braces me-2"></i>Salida JSON
                            </h5>
                        </div>
                        <div class="card-body">
                            <textarea id="salidaJson" class="form-control font-monospace" rows="12" readonly
                                placeholder="Aqui aparecera el JSON generado..."></textarea>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 mb-4">
                    <div class="card herramienta-card">
                        <div class="card-header bg-warning text-dark">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-filetype-csv me-2"></i>Salida CSV
                            </h5>
                        </div>
                        <div class="card-body">
                            <textarea id="salidaCsv" class="form-control font-monospace" rows="12" readonly
                                placeholder="Aqui aparecera el CSV generado..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.configurarEventos();
    }

    configurarEventos() {
        this.configurarFavoritos();

        document.getElementById('botonGenerar').addEventListener('click', () => {
            this.generarDatos();
        });

        document.getElementById('copiarJson').addEventListener('click', () => {
            UtilsUI.copiarAlPortapapeles(document.getElementById('salidaJson').value);
        });

        document.getElementById('descargarJson').addEventListener('click', () => {
            UtilsArchivo.descargarArchivo(document.getElementById('salidaJson').value, 'datos_fake.json', 'application/json');
        });

        document.getElementById('copiarCsv').addEventListener('click', () => {
            UtilsUI.copiarAlPortapapeles(document.getElementById('salidaCsv').value);
        });

        document.getElementById('descargarCsv').addEventListener('click', () => {
            UtilsArchivo.descargarArchivo(document.getElementById('salidaCsv').value, 'datos_fake.csv', 'text/csv');
        });
    }

    configurarFavoritos() {
        const boton = document.getElementById('botonFavoritos');
        const icono = document.getElementById('iconoFavoritos');
        const texto = document.getElementById('textoFavoritos');

        if (!boton || !icono || !texto) return;

        const esFavorito = GestorFavoritos.esFavorito('generador-datos-fake');

        if (esFavorito) {
            icono.className = 'bi bi-star-fill me-1';
            texto.textContent = 'En Favoritos';
        }

        boton.addEventListener('click', () => {
            const nuevoEstado = GestorFavoritos.alternarFavorito('generador-datos-fake');
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

    generarDatos() {
        const cantidad = Math.min(Math.max(parseInt(document.getElementById('cantidadRegistros').value, 10) || 0, 1), 500);
        const dominio = document.getElementById('dominioCorreo').value;
        const indent = parseInt(document.getElementById('formatoSalida').value, 10);

        this.datosGenerados = Array.from({ length: cantidad }, () => this.crearRegistro(dominio));

        const salidaJson = JSON.stringify(this.datosGenerados, null, indent === 0 ? 0 : indent);
        const salidaCsv = this.convertirCsv(this.datosGenerados);

        document.getElementById('salidaJson').value = salidaJson;
        document.getElementById('salidaCsv').value = salidaCsv;

        this.renderizarTabla(this.datosGenerados);
        this.actualizarResumen(cantidad);

        document.getElementById('copiarJson').disabled = salidaJson.length === 0;
        document.getElementById('descargarJson').disabled = salidaJson.length === 0;
        document.getElementById('copiarCsv').disabled = salidaCsv.length === 0;
        document.getElementById('descargarCsv').disabled = salidaCsv.length === 0;

        UtilsUI.mostrarNotificacion('Datos generados correctamente', 'success', 1500);
    }

    crearRegistro(dominio) {
        const nombre = this.obtenerAleatorio(this.nombres);
        const apellido = this.obtenerAleatorio(this.apellidos);
        const rut = this.generarRutValido();
        const correo = this.generarCorreo(nombre, apellido, dominio);
        const telefono = this.generarTelefono();
        const direccion = this.generarDireccion();

        return {
            nombre,
            apellido,
            rut,
            correo,
            telefono,
            direccion
        };
    }

    renderizarTabla(registros) {
        const cuerpo = document.getElementById('tablaResultados');
        if (!registros.length) {
            cuerpo.innerHTML = '<tr><td colspan="7" class="text-muted">No hay datos generados</td></tr>';
            return;
        }

        const filas = registros.slice(0, this.limiteTabla).map((registro, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${registro.nombre}</td>
                <td>${registro.apellido}</td>
                <td>${registro.rut}</td>
                <td>${registro.correo}</td>
                <td>${registro.telefono}</td>
                <td>${registro.direccion}</td>
            </tr>
        `).join('');

        cuerpo.innerHTML = filas;
    }

    actualizarResumen(cantidad) {
        const resumen = document.getElementById('resumenSalida');
        const cantidadTabla = Math.min(cantidad, this.limiteTabla);
        resumen.textContent = `Registros: ${cantidad}. Mostrando ${cantidadTabla} en tabla.`;
    }

    convertirCsv(registros) {
        if (!registros.length) return '';
        const encabezados = Object.keys(registros[0]);
        const filas = [encabezados.join(',')];
        registros.forEach((registro) => {
            const valores = encabezados.map((clave) => this.escaparCsv(String(registro[clave] ?? '')));
            filas.push(valores.join(','));
        });
        return filas.join('\n');
    }

    escaparCsv(valor) {
        const requiere = /[",\n\r]/.test(valor);
        if (!requiere) return valor;
        return `"${valor.replace(/"/g, '""')}"`;
    }

    generarRutValido() {
        const cuerpo = String(this.obtenerNumeroAleatorio(7_000_000, 25_000_000));
        const dv = this.calcularDigitoVerificador(cuerpo);
        return this.formatearRut(cuerpo, dv);
    }

    calcularDigitoVerificador(cuerpo) {
        let suma = 0;
        let multiplicador = 2;
        for (let i = cuerpo.length - 1; i >= 0; i -= 1) {
            suma += parseInt(cuerpo[i], 10) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        const resto = 11 - (suma % 11);
        if (resto === 11) return '0';
        if (resto === 10) return 'K';
        return String(resto);
    }

    formatearRut(cuerpo, dv) {
        const numero = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${numero}-${dv}`;
    }

    generarCorreo(nombre, apellido, dominio) {
        const base = `${nombre}.${apellido}`.toLowerCase().replace(/\s+/g, '');
        const sufijo = this.obtenerNumeroAleatorio(1, 9999);
        return `${base}${sufijo}@${dominio}`;
    }

    generarTelefono() {
        const numero = this.obtenerNumeroAleatorio(1000, 9999);
        const numero2 = this.obtenerNumeroAleatorio(1000, 9999);
        return `+56 9 ${numero} ${numero2}`;
    }

    generarDireccion() {
        const calle = this.obtenerAleatorio(this.calles);
        const numero = this.obtenerNumeroAleatorio(10, 9999);
        const comuna = this.obtenerAleatorio(this.comunas);
        return `${calle} ${numero}, ${comuna}`;
    }

    obtenerAleatorio(lista) {
        return lista[Math.floor(Math.random() * lista.length)];
    }

    obtenerNumeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

window.generadorDatosFake = new GeneradorDatosFake();
