class CalculadoraUPS {
    constructor() {
        this.tiposBateria = {
            'plomo-acido': {
                nombre: 'Plomo-ácido (Sellada/AGM)',
                voltajePorCelda: 2.0,
                eficiencia: 0.85,
                profundidadDescarga: 0.5,
                factorCorreccion: 1.0
            },
            'gel': {
                nombre: 'Gel',
                voltajePorCelda: 2.0,
                eficiencia: 0.88,
                profundidadDescarga: 0.6,
                factorCorreccion: 1.1
            },
            'litio': {
                nombre: 'Litio (LiFePO4)',
                voltajePorCelda: 3.2,
                eficiencia: 0.95,
                profundidadDescarga: 0.8,
                factorCorreccion: 1.3
            }
        };

        this.factoresPotencia = {
            'computadoras': 0.7,
            'servidores': 0.8,
            'networking': 0.6,
            'iluminacion-led': 0.9,
            'iluminacion-incandescente': 1.0,
            'motores': 0.75,
            'otros': 0.8
        };
    }

    render(container) {
        container.innerHTML = `
            <div class="row">
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-lightning me-2"></i>
                                Configuración del UPS
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Potencia del UPS</label>
                                <div class="row">
                                    <div class="col">
                                        <div class="input-group">
                                            <input type="number" class="form-control" id="potenciaVA" placeholder="VA">
                                            <span class="input-group-text">VA</span>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="input-group">
                                            <input type="number" class="form-control" id="potenciaWatts" placeholder="Watts">
                                            <span class="input-group-text">W</span>
                                        </div>
                                    </div>
                                </div>
                                <small class="form-text text-muted">Si introduces uno, el otro se calculará automáticamente (Factor de potencia típico: 0.8)</small>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Factor de Potencia</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="factorPotencia" value="0.8" min="0.1" max="1.0" step="0.01">
                                    <span class="input-group-text">
                                        <i class="bi bi-info-circle" title="Relación entre Watts y VA (normalmente 0.6-1.0)"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Eficiencia del UPS (%)</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="eficienciaUPS" value="90" min="50" max="99" step="1">
                                    <span class="input-group-text">%</span>
                                </div>
                                <small class="form-text text-muted">Eficiencia típica: Online: 85-95%, Line-Interactive: 90-98%</small>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Configuración de Batería
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Tipo de Batería</label>
                                <select class="form-select" id="tipoBateria">
                                    <option value="plomo-acido">Plomo-ácido (Sellada/AGM)</option>
                                    <option value="gel">Gel</option>
                                    <option value="litio">Litio (LiFePO4)</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Capacidad de la Batería</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="capacidadBateria" placeholder="Ah">
                                    <span class="input-group-text">Ah</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Voltaje del Sistema</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" id="voltajeBateria" placeholder="V" value="12">
                                    <span class="input-group-text">V</span>
                                </div>
                                <small class="form-text text-muted">Voltajes típicos: 12V, 24V, 48V</small>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Número de Baterías</label>
                                <input type="number" class="form-control" id="numeroBaterias" value="1" min="1" step="1">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Equipos Conectados
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="listaEquipos">
                            </div>
                            <button type="button" class="btn btn-outline-primary" id="agregarEquipo">
                                <i class="bi bi-plus"></i> Agregar Equipo
                            </button>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-calculator me-2"></i>
                                Resultados
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="resultados">
                                <div class="alert alert-info">
                                    <i class="bi bi-info-circle me-2"></i>
                                    Complete la configuración para ver los cálculos
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.configurarEventos();
        this.agregarEquipoInicial();
    }

    configurarEventos() {
        document.getElementById('potenciaVA')?.addEventListener('input', () => {
            this.convertirVAaWatts();
        });

        document.getElementById('potenciaWatts')?.addEventListener('input', () => {
            this.convertirWattsaVA();
        });

        document.getElementById('factorPotencia')?.addEventListener('input', () => {
            this.actualizarCalculos();
        });

        document.getElementById('agregarEquipo')?.addEventListener('click', () => {
            this.agregarEquipo();
        });

        ['eficienciaUPS', 'tipoBateria', 'capacidadBateria', 'voltajeBateria', 'numeroBaterias'].forEach(id => {
            document.getElementById(id)?.addEventListener('input', () => {
                this.actualizarCalculos();
            });
        });

        document.getElementById('tipoBateria')?.addEventListener('change', () => {
            this.actualizarCalculos();
        });
    }

    convertirVAaWatts() {
        const va = parseFloat(document.getElementById('potenciaVA').value);
        const fp = parseFloat(document.getElementById('factorPotencia').value) || 0.8;
        
        if (va && fp) {
            const watts = va * fp;
            document.getElementById('potenciaWatts').value = Math.round(watts);
            this.actualizarCalculos();
        }
    }

    convertirWattsaVA() {
        const watts = parseFloat(document.getElementById('potenciaWatts').value);
        const fp = parseFloat(document.getElementById('factorPotencia').value) || 0.8;
        
        if (watts && fp) {
            const va = watts / fp;
            document.getElementById('potenciaVA').value = Math.round(va);
            this.actualizarCalculos();
        }
    }

    agregarEquipoInicial() {
        this.agregarEquipo();
    }

    agregarEquipo() {
        const listaEquipos = document.getElementById('listaEquipos');
        const equipoId = 'equipo_' + Date.now();
        
        const equipoHtml = `
            <div class="card mb-3 equipo-item" data-id="${equipoId}">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-3">
                            <input type="text" class="form-control form-control-sm" placeholder="Nombre del equipo" data-field="nombre">
                        </div>
                        <div class="col-md-2">
                            <select class="form-select form-select-sm" data-field="tipo">
                                <option value="computadoras">PC/Laptop</option>
                                <option value="servidores">Servidor</option>
                                <option value="networking">Red/Switch</option>
                                <option value="iluminacion-led">LED</option>
                                <option value="iluminacion-incandescente">Incandescente</option>
                                <option value="motores">Motor</option>
                                <option value="otros">Otros</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <div class="input-group input-group-sm">
                                <input type="number" class="form-control" placeholder="Watts" data-field="potencia">
                                <span class="input-group-text">W</span>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <input type="number" class="form-control form-control-sm" placeholder="Qty" value="1" min="1" data-field="cantidad">
                        </div>
                        <div class="col-md-2">
                            <div class="form-check">
                                <input type="checkbox" class="form-check-input" data-field="critico" checked>
                                <label class="form-check-label">
                                    <small>Crítico</small>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-1">
                            <button type="button" class="btn btn-outline-danger btn-sm eliminar-equipo">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        listaEquipos.insertAdjacentHTML('beforeend', equipoHtml);
        
        const equipoElement = listaEquipos.querySelector(`[data-id="${equipoId}"]`);
        
        equipoElement.querySelector('.eliminar-equipo').addEventListener('click', () => {
            equipoElement.remove();
            this.actualizarCalculos();
        });
        
        equipoElement.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => {
                this.actualizarCalculos();
            });
            input.addEventListener('change', () => {
                this.actualizarCalculos();
            });
        });
        
        this.actualizarCalculos();
    }

    obtenerEquipos() {
        const equipos = [];
        document.querySelectorAll('.equipo-item').forEach(item => {
            const nombre = item.querySelector('[data-field="nombre"]').value || 'Sin nombre';
            const tipo = item.querySelector('[data-field="tipo"]').value;
            const potencia = parseFloat(item.querySelector('[data-field="potencia"]').value) || 0;
            const cantidad = parseInt(item.querySelector('[data-field="cantidad"]').value) || 1;
            const critico = item.querySelector('[data-field="critico"]').checked;
            
            if (potencia > 0) {
                equipos.push({
                    nombre,
                    tipo,
                    potencia,
                    cantidad,
                    critico,
                    factorPotencia: this.factoresPotencia[tipo] || 0.8
                });
            }
        });
        return equipos;
    }

    actualizarCalculos() {
        const equipos = this.obtenerEquipos();
        const upsVA = parseFloat(document.getElementById('potenciaVA').value) || 0;
        const upsWatts = parseFloat(document.getElementById('potenciaWatts').value) || 0;
        const eficienciaUPS = parseFloat(document.getElementById('eficienciaUPS').value) || 90;
        const capacidadBateria = parseFloat(document.getElementById('capacidadBateria').value) || 0;
        const voltajeBateria = parseFloat(document.getElementById('voltajeBateria').value) || 12;
        const numeroBaterias = parseInt(document.getElementById('numeroBaterias').value) || 1;
        const tipoBateriaKey = document.getElementById('tipoBateria').value;
        const tipoBateria = this.tiposBateria[tipoBateriaKey];

        if (equipos.length === 0 || (!upsVA && !upsWatts)) {
            document.getElementById('resultados').innerHTML = `
                <div class="alert alert-info">
                    <i class="bi bi-info-circle me-2"></i>
                    Complete la configuración para ver los cálculos
                </div>
            `;
            return;
        }

        let consumoTotalWatts = 0;
        let consumoTotalVA = 0;
        let consumoCritico = 0;
        
        equipos.forEach(equipo => {
            const watts = equipo.potencia * equipo.cantidad;
            const va = watts / equipo.factorPotencia;
            
            consumoTotalWatts += watts;
            consumoTotalVA += va;
            
            if (equipo.critico) {
                consumoCritico += watts;
            }
        });

        const energiaBateria = capacidadBateria * voltajeBateria * numeroBaterias; 
        const energiaUtilizable = energiaBateria * tipoBateria.profundidadDescarga; 
        const consumoReal = consumoTotalWatts / (eficienciaUPS / 100); 

        const autonomiaHoras = energiaUtilizable / consumoReal;
        const autonomiaMinutos = autonomiaHoras * 60;

        const consumoCriticosReal = consumoCritico / (eficienciaUPS / 100);
        const autonomiaCriticaHoras = energiaUtilizable / consumoCriticosReal;
        const autonomiaCriticaMinutos = autonomiaCriticaHoras * 60;

        const cargaPorcentajeWatts = (consumoTotalWatts / upsWatts) * 100;
        const cargaPorcentajeVA = (consumoTotalVA / upsVA) * 100;

        let resultadosHtml = `
            <div class="row">
                <div class="col-md-6">
                    <h6 class="fw-bold">Resumen de Carga</h6>
                    <table class="table table-sm">
                        <tr>
                            <td>Consumo Total:</td>
                            <td><strong>${consumoTotalWatts.toFixed(0)} W / ${consumoTotalVA.toFixed(0)} VA</strong></td>
                        </tr>
                        <tr>
                            <td>Equipos Críticos:</td>
                            <td><strong>${consumoCritico.toFixed(0)} W</strong></td>
                        </tr>
                        <tr>
                            <td>Carga UPS:</td>
                            <td>
                                <span class="badge ${cargaPorcentajeWatts > 80 ? 'bg-danger' : cargaPorcentajeWatts > 60 ? 'bg-warning' : 'bg-success'}">
                                    ${cargaPorcentajeWatts.toFixed(1)}% (W)
                                </span>
                                <span class="badge ${cargaPorcentajeVA > 80 ? 'bg-danger' : cargaPorcentajeVA > 60 ? 'bg-warning' : 'bg-success'}">
                                    ${cargaPorcentajeVA.toFixed(1)}% (VA)
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-md-6">
                    <h6 class="fw-bold">Autonomía Estimada</h6>
                    <table class="table table-sm">
                        <tr>
                            <td>Carga Completa:</td>
                            <td><strong>${this.formatearTiempo(autonomiaMinutos)}</strong></td>
                        </tr>
                        <tr>
                            <td>Solo Críticos:</td>
                            <td><strong>${this.formatearTiempo(autonomiaCriticaMinutos)}</strong></td>
                        </tr>
                        <tr>
                            <td>Energía Disponible:</td>
                            <td><strong>${energiaUtilizable.toFixed(0)} Wh</strong></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="mt-3">
        `;

        if (cargaPorcentajeWatts > 100 || cargaPorcentajeVA > 100) {
            resultadosHtml += `
                <div class="alert alert-danger">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    <strong>¡SOBRECARGA!</strong> El consumo excede la capacidad del UPS.
                </div>
            `;
        } else if (cargaPorcentajeWatts > 80 || cargaPorcentajeVA > 80) {
            resultadosHtml += `
                <div class="alert alert-warning">
                    <i class="bi bi-exclamation-triangle me-2"></i>
                    <strong>Carga alta</strong> (>80%). Considere reducir la carga o usar un UPS de mayor capacidad.
                </div>
            `;
        }

        if (autonomiaMinutos < 5) {
            resultadosHtml += `
                <div class="alert alert-warning">
                    <i class="bi bi-clock me-2"></i>
                    <strong>Autonomía baja</strong> (<5 min). Considere aumentar la capacidad de batería.
                </div>
            `;
        }

        resultadosHtml += `</div>`;

        if (equipos.length > 0) {
            resultadosHtml += `
                <div class="mt-4">
                    <h6 class="fw-bold">Detalle de Equipos</h6>
                    <div class="table-responsive">
                        <table class="table table-sm table-striped">
                            <thead>
                                <tr>
                                    <th>Equipo</th>
                                    <th>Tipo</th>
                                    <th>Qty</th>
                                    <th>Watts</th>
                                    <th>VA</th>
                                    <th>Crítico</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            equipos.forEach(equipo => {
                const wattsTotal = equipo.potencia * equipo.cantidad;
                const vaTotal = wattsTotal / equipo.factorPotencia;
                
                resultadosHtml += `
                    <tr>
                        <td>${equipo.nombre}</td>
                        <td>${equipo.tipo}</td>
                        <td>${equipo.cantidad}</td>
                        <td>${wattsTotal.toFixed(0)} W</td>
                        <td>${vaTotal.toFixed(0)} VA</td>
                        <td>
                            ${equipo.critico ? '<i class="bi bi-check-circle text-success"></i>' : '<i class="bi bi-circle text-muted"></i>'}
                        </td>
                    </tr>
                `;
            });

            resultadosHtml += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        document.getElementById('resultados').innerHTML = resultadosHtml;
    }

    formatearTiempo(minutos) {
        if (minutos < 1) {
            return `${Math.round(minutos * 60)} seg`;
        } else if (minutos < 60) {
            return `${Math.round(minutos)} min`;
        } else {
            const horas = Math.floor(minutos / 60);
            const mins = Math.round(minutos % 60);
            return `${horas}h ${mins}m`;
        }
    }
}

if (typeof window !== 'undefined') {
    window.CalculadoraUPS = CalculadoraUPS;
}