class CalculadoraImpresion {
    constructor() {
        this.tiposImpresora = {
            'inyeccion-tinta': {
                nombre: 'Inyección de tinta',
                consumoWatts: 15,
                costoCartucho: 25,
                paginasCartucho: 300,
                desgastePorPagina: 0.02
            },
            'laser-monocromo': {
                nombre: 'Láser monocromo',
                consumoWatts: 400,
                costoCartucho: 45,
                paginasCartucho: 2000,
                desgastePorPagina: 0.015
            },
            'laser-color': {
                nombre: 'Láser color',
                consumoWatts: 500,
                costoCartucho: 120,
                paginasCartucho: 1500,
                desgastePorPagina: 0.025
            },
            'sublimacion': {
                nombre: 'Sublimación',
                consumoWatts: 250,
                costoCartucho: 35,
                paginasCartucho: 400,
                desgastePorPagina: 0.03
            },
            'matriz-puntos': {
                nombre: 'Matriz de puntos',
                consumoWatts: 25,
                costoCartucho: 15,
                paginasCartucho: 1000,
                desgastePorPagina: 0.01
            }
        };

        this.tiposPapel = {
            'bond-75': {
                nombre: 'Bond 75g (A4)',
                costoPorHoja: 0.02,
                factor: 1.0
            },
            'bond-90': {
                nombre: 'Bond 90g (A4)',
                costoPorHoja: 0.025,
                factor: 1.2
            },
            'foto-180': {
                nombre: 'Fotográfico 180g',
                costoPorHoja: 0.15,
                factor: 2.0
            },
            'foto-240': {
                nombre: 'Fotográfico 240g',
                costoPorHoja: 0.25,
                factor: 2.5
            },
            'cartulina': {
                nombre: 'Cartulina',
                costoPorHoja: 0.08,
                factor: 1.5
            },
            'transparencia': {
                nombre: 'Transparencia',
                costoPorHoja: 0.12,
                factor: 1.3
            }
        };

        this.coberturaColores = {
            'texto-negro': { cyan: 0, magenta: 0, amarillo: 0, negro: 5 },
            'texto-mixto': { cyan: 2, magenta: 2, amarillo: 1, negro: 8 },
            'graficos-basicos': { cyan: 8, magenta: 8, amarillo: 5, negro: 3 },
            'graficos-complejos': { cyan: 15, magenta: 15, amarillo: 10, negro: 5 },
            'fotos': { cyan: 25, magenta: 20, amarillo: 15, negro: 8 },
            'fotos-alta-calidad': { cyan: 35, magenta: 30, amarillo: 25, negro: 10 }
        };
    }

    render(container) {
        container.innerHTML = `
            <div class="row">
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Configuración de Impresora
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Tipo de impresora</label>
                                <select class="form-select" id="tipoImpresora">
                                    <option value="inyeccion-tinta">Inyección de tinta</option>
                                    <option value="laser-monocromo">Láser monocromo</option>
                                    <option value="laser-color">Láser color</option>
                                    <option value="sublimacion">Sublimación</option>
                                    <option value="matriz-puntos">Matriz de puntos</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Consumo energético (Watts)</label>
                                <input type="number" class="form-control" id="consumoWatts" value="15">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Costo de energía (por kWh)</label>
                                <div class="input-group">
                                    <span class="input-group-text">$</span>
                                    <input type="number" class="form-control" id="costoEnergia" value="0.12" step="0.01">
                                    <span class="input-group-text">/ kWh</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Tiempo promedio por página (segundos)</label>
                                <input type="number" class="form-control" id="tiempoPagina" value="30">
                            </div>
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2" style="color: #0dcaf0;"></i>
                                Cartuchos / Tinta
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="configuracionCartuchos">
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-file me-2"></i>
                                Papel
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Tipo de papel</label>
                                <select class="form-select" id="tipoPapel">
                                    <option value="bond-75">Bond 75g (A4)</option>
                                    <option value="bond-90">Bond 90g (A4)</option>
                                    <option value="foto-180">Fotográfico 180g</option>
                                    <option value="foto-240">Fotográfico 240g</option>
                                    <option value="cartulina">Cartulina</option>
                                    <option value="transparencia">Transparencia</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Costo por hoja</label>
                                <div class="input-group">
                                    <span class="input-group-text">$</span>
                                    <input type="number" class="form-control" id="costoPapel" value="0.02" step="0.001">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-file me-2"></i>
                                Trabajo de Impresión
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Número de páginas</label>
                                <input type="number" class="form-control" id="numeroPaginas" value="100" min="1">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Tipo de contenido</label>
                                <select class="form-select" id="tipoContenido">
                                    <option value="texto-negro">Texto en negro (5% cobertura)</option>
                                    <option value="texto-mixto">Texto mixto (8% cobertura)</option>
                                    <option value="graficos-basicos">Gráficos básicos (15% cobertura)</option>
                                    <option value="graficos-complejos">Gráficos complejos (25% cobertura)</option>
                                    <option value="fotos">Fotografías (35% cobertura)</option>
                                    <option value="fotos-alta-calidad">Fotos alta calidad (50% cobertura)</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Número de copias</label>
                                <input type="number" class="form-control" id="numeroCopias" value="1" min="1">
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="impresionDobleCaras">
                                <label class="form-check-label" for="impresionDobleCaras">
                                    Impresión a doble cara (dúplex)
                                </label>
                            </div>

                            <div class="d-grid">
                                <button class="btn btn-primary btn-lg" id="calcularCostos">
                                    <i class="bi bi-gear me-2"></i>
                                    Calcular Costos
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-gear me-2"></i>
                                Resultados
                            </h5>
                        </div>
                        <div class="card-body">
                            <div id="resultadosCostos">
                                <div class="text-center text-muted">
                                    <i class="bi bi-gear" style="font-size: 3rem;"></i>
                                    <p class="mt-2">Configure los parámetros y haga clic en "Calcular Costos"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mt-4" id="tablaComparativa" style="display: none;">
                <div class="card-header">
                    <h5 class="card-title mb-0">
                        <i class="bi bi-list me-2"></i>
                        Análisis por Volumen
                    </h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Páginas</th>
                                    <th>Costo Tinta</th>
                                    <th>Costo Papel</th>
                                    <th>Costo Energía</th>
                                    <th>Desgaste</th>
                                    <th>Total</th>
                                    <th>Por Página</th>
                                </tr>
                            </thead>
                            <tbody id="tablaVolumen">
                                <!-- Se llenará dinámicamente -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        this.configurarEventos();
        this.actualizarConfiguracionImpresora();
    }

    configurarEventos() {
        document.getElementById('tipoImpresora').addEventListener('change', () => {
            this.actualizarConfiguracionImpresora();
        });

        document.getElementById('tipoPapel').addEventListener('change', () => {
            this.actualizarConfiguracionPapel();
        });

        document.getElementById('calcularCostos').addEventListener('click', () => {
            this.calcularCostos();
        });

        ['consumoWatts', 'costoEnergia', 'tiempoPagina', 'costoPapel', 
         'numeroPaginas', 'numeroCopias'].forEach(id => {
            document.getElementById(id)?.addEventListener('input', () => {
                this.calcularCostos();
            });
        });
    }

    actualizarConfiguracionImpresora() {
        const tipo = document.getElementById('tipoImpresora').value;
        const config = this.tiposImpresora[tipo];
        
        document.getElementById('consumoWatts').value = config.consumoWatts;
        
        this.mostrarConfiguracionCartuchos(tipo);
    }

    mostrarConfiguracionCartuchos(tipoImpresora) {
        const contenedor = document.getElementById('configuracionCartuchos');
        const esColor = tipoImpresora.includes('color') || tipoImpresora === 'inyeccion-tinta';
        
        if (esColor) {
            contenedor.innerHTML = `
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Costo cartucho Negro</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control" id="costoNegro" value="25" step="0.01">
                        </div>
                        <small class="text-muted">Páginas: <input type="number" class="form-control form-control-sm mt-1" id="paginasNegro" value="300"></small>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Costo cartucho Color</label>
                        <div class="input-group">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control" id="costoColor" value="30" step="0.01">
                        </div>
                        <small class="text-muted">Páginas: <input type="number" class="form-control form-control-sm mt-1" id="paginasColor" value="250"></small>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3 mb-2">
                        <label class="form-label small">Cyan</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control" id="costoCyan" value="15" step="0.01">
                        </div>
                    </div>
                    <div class="col-md-3 mb-2">
                        <label class="form-label small">Magenta</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control" id="costoMagenta" value="15" step="0.01">
                        </div>
                    </div>
                    <div class="col-md-3 mb-2">
                        <label class="form-label small">Amarillo</label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text">$</span>
                            <input type="number" class="form-control" id="costoAmarillo" value="15" step="0.01">
                        </div>
                    </div>
                    <div class="col-md-3 mb-2">
                        <label class="form-label small">Páginas c/u</label>
                        <input type="number" class="form-control form-control-sm" id="paginasColoresIndividuales" value="400">
                    </div>
                </div>
            `;
        } else {
            const config = this.tiposImpresora[tipoImpresora];
            contenedor.innerHTML = `
                <div class="mb-3">
                    <label class="form-label">Costo del cartucho/tóner</label>
                    <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input type="number" class="form-control" id="costoCartucho" value="${config.costoCartucho}" step="0.01">
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Páginas por cartucho</label>
                    <input type="number" class="form-control" id="paginasCartucho" value="${config.paginasCartucho}">
                </div>
            `;
        }
    }

    actualizarConfiguracionPapel() {
        const tipo = document.getElementById('tipoPapel').value;
        const config = this.tiposPapel[tipo];
        
        document.getElementById('costoPapel').value = config.costoPorHoja;
    }

    calcularCostos() {
        const tipoImpresora = document.getElementById('tipoImpresora').value;
        const numeroPaginas = parseInt(document.getElementById('numeroPaginas').value) || 1;
        const numeroCopias = parseInt(document.getElementById('numeroCopias').value) || 1;
        const tipoContenido = document.getElementById('tipoContenido').value;
        const dobleCaras = document.getElementById('impresionDobleCaras').checked;      
        const totalPaginas = numeroPaginas * numeroCopias;
        const totalHojas = dobleCaras ? Math.ceil(totalPaginas / 2) : totalPaginas;
        
        const costoTinta = this.calcularCostoTinta(tipoImpresora, totalPaginas, tipoContenido);
        const costoPapel = this.calcularCostoPapel(totalHojas);
        const costoEnergia = this.calcularCostoEnergia(totalPaginas);
        const costoDesgaste = this.calcularCostoDesgaste(tipoImpresora, totalPaginas);
        
        const costoTotal = costoTinta + costoPapel + costoEnergia + costoDesgaste;
        const costoPorPagina = costoTotal / totalPaginas;
        
        this.mostrarResultados({
            totalPaginas,
            totalHojas,
            costoTinta,
            costoPapel,
            costoEnergia,
            costoDesgaste,
            costoTotal,
            costoPorPagina
        });
        
        this.mostrarTablaComparativa();
    }

    calcularCostoTinta(tipoImpresora, paginas, tipoContenido) {
        const esColor = tipoImpresora.includes('color') || tipoImpresora === 'inyeccion-tinta';
        const cobertura = this.coberturaColores[tipoContenido];
        
        if (esColor) {
            const costoCyan = parseFloat(document.getElementById('costoCyan')?.value || 15);
            const costoMagenta = parseFloat(document.getElementById('costoMagenta')?.value || 15);
            const costoAmarillo = parseFloat(document.getElementById('costoAmarillo')?.value || 15);
            const costoNegro = parseFloat(document.getElementById('costoNegro')?.value || 25);
            const paginasColores = parseInt(document.getElementById('paginasColoresIndividuales')?.value || 400);
            const paginasNegro = parseInt(document.getElementById('paginasNegro')?.value || 300);
            
            const costoCyanTotal = (costoCyan / paginasColores) * (cobertura.cyan / 100) * paginas;
            const costoMagentaTotal = (costoMagenta / paginasColores) * (cobertura.magenta / 100) * paginas;
            const costoAmarilloTotal = (costoAmarillo / paginasColores) * (cobertura.amarillo / 100) * paginas;
            const costoNegroTotal = (costoNegro / paginasNegro) * (cobertura.negro / 100) * paginas;
            
            return costoCyanTotal + costoMagentaTotal + costoAmarilloTotal + costoNegroTotal;
        } else {
            const costoCartucho = parseFloat(document.getElementById('costoCartucho').value);
            const paginasCartucho = parseInt(document.getElementById('paginasCartucho').value);
            const coberturaTotal = cobertura.negro || 5;
            
            return (costoCartucho / paginasCartucho) * (coberturaTotal / 100) * paginas;
        }
    }

    calcularCostoPapel(hojas) {
        const costoPorHoja = parseFloat(document.getElementById('costoPapel').value);
        return costoPorHoja * hojas;
    }

    calcularCostoEnergia(paginas) {
        const consumoWatts = parseFloat(document.getElementById('consumoWatts').value);
        const costoKWh = parseFloat(document.getElementById('costoEnergia').value);
        const tiempoPorPagina = parseFloat(document.getElementById('tiempoPagina').value);
        
        const tiempoTotalHoras = (tiempoPorPagina * paginas) / 3600;
        const consumoKWh = (consumoWatts / 1000) * tiempoTotalHoras;
        
        return consumoKWh * costoKWh;
    }

    calcularCostoDesgaste(tipoImpresora, paginas) {
        const config = this.tiposImpresora[tipoImpresora];
        return config.desgastePorPagina * paginas;
    }

    mostrarResultados(resultados) {
        const contenedor = document.getElementById('resultadosCostos');
        
        contenedor.innerHTML = `
            <div class="row text-center mb-4">
                <div class="col-md-6">
                    <div class="border p-3 rounded">
                        <h3 class="text-primary mb-0">$${resultados.costoTotal.toFixed(3)}</h3>
                        <small class="text-muted">Costo Total</small>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="border p-3 rounded">
                        <h3 class="text-info mb-0">$${resultados.costoPorPagina.toFixed(4)}</h3>
                        <small class="text-muted">Por Página</small>
                    </div>
                </div>
            </div>
            
            <div class="table-responsive">
                <table class="table table-sm">
                    <tr>
                        <td><strong>Páginas a imprimir:</strong></td>
                        <td>${resultados.totalPaginas.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td><strong>Hojas de papel:</strong></td>
                        <td>${resultados.totalHojas.toLocaleString()}</td>
                    </tr>
                    <tr class="table-info">
                        <td><strong>Costo de tinta/tóner:</strong></td>
                        <td>$${resultados.costoTinta.toFixed(3)}</td>
                    </tr>
                    <tr class="table-warning">
                        <td><strong>Costo de papel:</strong></td>
                        <td>$${resultados.costoPapel.toFixed(3)}</td>
                    </tr>
                    <tr class="table-success">
                        <td><strong>Costo de energía:</strong></td>
                        <td>$${resultados.costoEnergia.toFixed(3)}</td>
                    </tr>
                    <tr class="table-secondary">
                        <td><strong>Desgaste estimado:</strong></td>
                        <td>$${resultados.costoDesgaste.toFixed(3)}</td>
                    </tr>
                </table>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <canvas id="graficoComposicion" width="200" height="200"></canvas>
                </div>
                <div class="col-md-6">
                    <h6>Composición del costo:</h6>
                    <ul class="list-unstyled">
                        <li><span class="badge bg-info me-2"></span>Tinta: ${((resultados.costoTinta/resultados.costoTotal)*100).toFixed(1)}%</li>
                        <li><span class="badge bg-warning me-2"></span>Papel: ${((resultados.costoPapel/resultados.costoTotal)*100).toFixed(1)}%</li>
                        <li><span class="badge bg-success me-2"></span>Energía: ${((resultados.costoEnergia/resultados.costoTotal)*100).toFixed(1)}%</li>
                        <li><span class="badge bg-secondary me-2"></span>Desgaste: ${((resultados.costoDesgaste/resultados.costoTotal)*100).toFixed(1)}%</li>
                    </ul>
                </div>
            </div>
        `;
        
        this.dibujarGraficoComposicion(resultados);
    }

    mostrarTablaComparativa() {
        const volumes = [50, 100, 500, 1000, 5000, 10000];
        const tbody = document.getElementById('tablaVolumen');
        const tipoImpresora = document.getElementById('tipoImpresora').value;
        const tipoContenido = document.getElementById('tipoContenido').value;
        
        let html = '';
        volumes.forEach(volumen => {
            const costoTinta = this.calcularCostoTinta(tipoImpresora, volumen, tipoContenido);
            const costoPapel = this.calcularCostoPapel(volumen);
            const costoEnergia = this.calcularCostoEnergia(volumen);
            const costoDesgaste = this.calcularCostoDesgaste(tipoImpresora, volumen);
            const total = costoTinta + costoPapel + costoEnergia + costoDesgaste;
            
            html += `
                <tr>
                    <td>${volumen.toLocaleString()}</td>
                    <td>$${costoTinta.toFixed(3)}</td>
                    <td>$${costoPapel.toFixed(3)}</td>
                    <td>$${costoEnergia.toFixed(3)}</td>
                    <td>$${costoDesgaste.toFixed(3)}</td>
                    <td><strong>$${total.toFixed(3)}</strong></td>
                    <td>$${(total/volumen).toFixed(4)}</td>
                </tr>
            `;
        });
        
        tbody.innerHTML = html;
        document.getElementById('tablaComparativa').style.display = 'block';
    }

    dibujarGraficoComposicion(resultados) {
        const canvas = document.getElementById('graficoComposicion');
        const ctx = canvas.getContext('2d');
        
        const datos = [
            { label: 'Tinta', valor: resultados.costoTinta, color: '#0dcaf0' },
            { label: 'Papel', valor: resultados.costoPapel, color: '#ffc107' },
            { label: 'Energía', valor: resultados.costoEnergia, color: '#198754' },
            { label: 'Desgaste', valor: resultados.costoDesgaste, color: '#6c757d' }
        ];
        
        const total = resultados.costoTotal;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        
        let currentAngle = -Math.PI / 2;
        
        datos.forEach(dato => {
            const sliceAngle = (dato.valor / total) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = dato.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            currentAngle += sliceAngle;
        });
    }
}

if (typeof window !== 'undefined') {
    window.CalculadoraImpresion = CalculadoraImpresion;
}