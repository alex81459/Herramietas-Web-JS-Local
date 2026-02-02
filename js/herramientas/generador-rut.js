class GeneradorRUT {
    constructor() {
        this.rutGenerado = null;
    }

    render(container) {
        container.innerHTML = `
            <div class="row">
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-plus-circle me-2"></i>
                                Generar RUT
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Tipo de RUT</label>
                                <select class="form-select" id="tipoRUT">
                                    <option value="persona">Persona Natural (1.000.000 - 25.000.000)</option>
                                    <option value="empresa">Empresa (50.000.000 - 99.999.999)</option>
                                    <option value="personalizado">Rango personalizado</option>
                                </select>
                            </div>

                            <div id="rangoPersonalizado" style="display: none;">
                                <div class="row">
                                    <div class="col-6">
                                        <label class="form-label">Desde</label>
                                        <input type="number" class="form-control" id="rangoDesde" min="1000000" max="99999999">
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label">Hasta</label>
                                        <input type="number" class="form-control" id="rangoHasta" min="1000000" max="99999999">
                                    </div>
                                </div>
                            </div>

                            <div class="d-grid gap-2 mt-3">
                                <button class="btn btn-primary" id="generarRUT">
                                    <i class="bi bi-lightning me-2"></i>
                                    Generar RUT
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-check-circle me-2"></i>
                                Validar RUT
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">RUT a validar</label>
                                <input type="text" class="form-control" id="rutValidar" 
                                       placeholder="12.345.678-9 o 12345678-9">
                                <div class="form-text">Puedes incluir o no los puntos y guion</div>
                            </div>

                            <div class="d-grid gap-2">
                                <button class="btn btn-success" id="validarRUT">
                                    <i class="bi bi-shield-check me-2"></i>
                                    Validar RUT
                                </button>
                            </div>

                            <div id="resultadoValidacion" class="mt-3"></div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-clipboard me-2"></i>
                                Resultado
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="resultadoGeneracion">
                                <div class="text-center text-muted py-4">
                                    <i class="bi bi-arrow-left display-4"></i>
                                    <p class="mt-2">Genera un RUT para ver el resultado aquí</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-info-circle me-2"></i>
                                Información
                            </h5>
                        </div>
                        <div class="card-body">
                            <h6>¿Cómo funciona el RUT?</h6>
                            <ul class="list-unstyled">
                                <li><i class="bi bi-check-circle text-success me-2"></i>El RUT consta de 8 dígitos + 1 dígito verificador</li>
                                <li><i class="bi bi-check-circle text-success me-2"></i>Se puede formatear con puntos y guion</li>
                                <li><i class="bi bi-check-circle text-success me-2"></i>El dígito verificador se calcula con algoritmo oficial</li>
                                <li><i class="bi bi-check-circle text-success me-2"></i>Personas: 1.000.000 - 25.000.000</li>
                                <li><i class="bi bi-check-circle text-success me-2"></i>Empresas: 50.000.000 - 99.999.999</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.configurarEventos();
    }

    configurarEventos() {
        document.getElementById('tipoRUT').addEventListener('change', (e) => {
            const rangoPersonalizado = document.getElementById('rangoPersonalizado');
            rangoPersonalizado.style.display = e.target.value === 'personalizado' ? 'block' : 'none';
        });
        document.getElementById('generarRUT').addEventListener('click', () => {
            this.generarRUT();
        });
        document.getElementById('validarRUT').addEventListener('click', () => {
            this.validarRUT();
        });
        document.getElementById('rutValidar').addEventListener('input', (e) => {
            this.formatearRUTInput(e.target);
        });
    }

    generarRUT() {
        const tipo = document.getElementById('tipoRUT').value;
        let min, max;

        switch (tipo) {
            case 'persona':
                min = 1000000;
                max = 25000000;
                break;
            case 'empresa':
                min = 50000000;
                max = 99999999;
                break;
            case 'personalizado':
                min = parseInt(document.getElementById('rangoDesde').value) || 1000000;
                max = parseInt(document.getElementById('rangoHasta').value) || 99999999;
                break;
        }

        if (min > max) {
            UtilsUI.mostrarNotificacion('El rango "desde" no puede ser mayor que "hasta"', 'warning');
            return;
        }

        const numeroBase = Math.floor(Math.random() * (max - min + 1)) + min;
        const digitoVerificador = this.calcularDigitoVerificador(numeroBase);
        
        this.rutGenerado = {
            numero: numeroBase,
            dv: digitoVerificador,
            completo: `${numeroBase}-${digitoVerificador}`,
            formateado: this.formatearRUT(numeroBase, digitoVerificador)
        };

        this.mostrarResultadoGeneracion();
    }

    calcularDigitoVerificador(rut) {
        let suma = 0;
        let multiplicador = 2;
        const rutStr = rut.toString();

        for (let i = rutStr.length - 1; i >= 0; i--) {
            suma += parseInt(rutStr[i]) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }

        const resto = suma % 11;
        const dv = 11 - resto;

        if (dv === 11) return '0';
        if (dv === 10) return 'K';
        return dv.toString();
    }

    formatearRUT(numero, dv) {
        const numeroStr = numero.toString();
        const miles = numeroStr.slice(-3);
        const millones = numeroStr.slice(-6, -3);
        const resto = numeroStr.slice(0, -6);

        let formateado = miles;
        if (millones) formateado = millones + '.' + formateado;
        if (resto) formateado = resto + '.' + formateado;

        return formateado + '-' + dv;
    }

    mostrarResultadoGeneracion() {
        const container = document.getElementById('resultadoGeneracion');
        const rut = this.rutGenerado;

        container.innerHTML = `
            <div class="text-center">
                <div class="display-6 text-primary fw-bold mb-3">${rut.formateado}</div>
                
                <div class="row g-3">
                    <div class="col-12">
                        <div class="input-group">
                            <span class="input-group-text">Con formato</span>
                            <input type="text" class="form-control" value="${rut.formateado}" readonly>
                            <button class="btn btn-outline-secondary" onclick="UtilsUI.copiarAlPortapapeles('${rut.formateado}')">
                                <i class="bi bi-clipboard"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="col-12">
                        <div class="input-group">
                            <span class="input-group-text">Sin formato</span>
                            <input type="text" class="form-control" value="${rut.completo}" readonly>
                            <button class="btn btn-outline-secondary" onclick="UtilsUI.copiarAlPortapapeles('${rut.completo}')">
                                <i class="bi bi-clipboard"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="col-6">
                        <div class="input-group">
                            <span class="input-group-text">Número</span>
                            <input type="text" class="form-control" value="${rut.numero}" readonly>
                        </div>
                    </div>
                    
                    <div class="col-6">
                        <div class="input-group">
                            <span class="input-group-text">DV</span>
                            <input type="text" class="form-control" value="${rut.dv}" readonly>
                        </div>
                    </div>
                </div>

                <div class="mt-3">
                    <button class="btn btn-primary btn-sm me-2" onclick="this.closest('.card').querySelector('#generarRUT').click()">
                        <i class="bi bi-arrow-clockwise me-1"></i>
                        Generar otro
                    </button>
                    <button class="btn btn-success btn-sm" onclick="UtilsUI.copiarAlPortapapeles('${rut.formateado}')">
                        <i class="bi bi-clipboard-check me-1"></i>
                        Copiar
                    </button>
                </div>
            </div>
        `;

        container.classList.add('fade-in');
    }

    validarRUT() {
        const input = document.getElementById('rutValidar');
        const rutLimpio = this.limpiarRUT(input.value);
        const resultado = document.getElementById('resultadoValidacion');

        if (!rutLimpio || rutLimpio.length < 2) {
            resultado.innerHTML = `
                <div class="alert alert-warning">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    Por favor ingresa un RUT válido
                </div>
            `;
            return;
        }

        const numero = rutLimpio.slice(0, -1);
        const dv = rutLimpio.slice(-1).toUpperCase();
        const dvCalculado = this.calcularDigitoVerificador(parseInt(numero));
        const esValido = dv === dvCalculado;

        resultado.innerHTML = `
            <div class="alert alert-${esValido ? 'success' : 'danger'}">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <i class="bi bi-${esValido ? 'check-circle' : 'x-circle'} me-2"></i>
                        <strong>RUT ${esValido ? 'VÁLIDO' : 'INVÁLIDO'}</strong>
                    </div>
                    <div class="badge bg-${esValido ? 'success' : 'danger'}">
                        ${esValido ? '✓' : '✗'}
                    </div>
                </div>
                
                <div class="mt-2">
                    <small>
                        <strong>RUT formateado:</strong> ${this.formatearRUT(parseInt(numero), dv)}<br>
                        <strong>Dígito verificador esperado:</strong> ${dvCalculado}<br>
                        <strong>Dígito verificador ingresado:</strong> ${dv}
                    </small>
                </div>
            </div>
        `;

        if (esValido) {
            UtilsUI.mostrarNotificacion('RUT válido', 'success', 2000);
        }
    }

    limpiarRUT(rut) {
        return rut.replace(/[^0-9kK]/g, '');
    }

    formatearRUTInput(input) {
        let valor = input.value.replace(/[^0-9kK]/g, '');
        
        if (valor.length > 1) {
            const numero = valor.slice(0, -1);
            const dv = valor.slice(-1);
            const numeroFormateado = numero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            valor = numeroFormateado + '-' + dv;
        }
        
        input.value = valor;
    }
}

window.GeneradorRUT = GeneradorRUT;