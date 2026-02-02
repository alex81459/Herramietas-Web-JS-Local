class DecodificadorJWT {
    constructor() {
        this.tokenActual = null;
    }

    render() {
        document.getElementById('vistaHerramienta').innerHTML = `
            <div class="row">
                <div class="col-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h2><i class="bi bi-key text-primary me-2"></i>Decodificador JWT</h2>
                            <p class="text-muted mb-0">Decodifica tokens JWT para debugging y análisis</p>
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
                                <i class="bi bi-input-cursor me-2"></i>Token JWT
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="tokenInput" class="form-label fw-bold">Ingresa el token JWT:</label>
                                <textarea 
                                    id="tokenInput" 
                                    class="form-control font-monospace" 
                                    rows="4" 
                                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"></textarea>
                                <div class="d-flex justify-content-between mt-2">
                                    <div>
                                        <span id="estadoValidacion" class="badge bg-secondary">En espera</span>
                                        <small class="text-muted ms-2">
                                            Caracteres: <span id="contadorCaracteres">0</span>
                                        </small>
                                    </div>
                                    <div>
                                        <button id="decodificarToken" class="btn btn-sm btn-primary me-2">
                                            <i class="bi bi-unlock me-1"></i>Decodificar
                                        </button>
                                        <button id="limpiarToken" class="btn btn-sm btn-outline-secondary">
                                            <i class="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-6">
                                    <button id="pegarEjemplo" class="btn btn-outline-info btn-sm">
                                        <i class="bi bi-clipboard-plus me-1"></i>Usar ejemplo
                                    </button>
                                </div>
                                <div class="col-md-6 text-end">
                                    <button id="copiarToken" class="btn btn-outline-success btn-sm" disabled>
                                        <i class="bi bi-clipboard me-1"></i>Copiar token
                                    </button>
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
                                <i class="bi bi-file-text me-2"></i>Resultado de la Decodificación
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-4 mb-3">
                                    <div class="border rounded p-3 h-100">
                                        <h6 class="text-danger fw-bold mb-3">
                                            <i class="bi bi-gear me-1"></i>HEADER
                                        </h6>
                                        <pre id="headerDecodificado" class="bg-light p-2 rounded small mb-2">
{
  "alg": "...",
  "typ": "..."
}</pre>
                                        <div class="d-flex justify-content-between">
                                            <small class="text-muted">Algoritmo y tipo</small>
                                            <button id="copiarHeader" class="btn btn-sm btn-outline-primary" disabled>
                                                <i class="bi bi-clipboard"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <div class="border rounded p-3 h-100">
                                        <h6 class="text-info fw-bold mb-3">
                                            <i class="bi bi-database me-1"></i>PAYLOAD
                                        </h6>
                                        <pre id="payloadDecodificado" class="bg-light p-2 rounded small mb-2">
{
  "sub": "...",
  "name": "...",
  "iat": ...
}</pre>
                                        <div class="d-flex justify-content-between">
                                            <small class="text-muted">Datos del token</small>
                                            <button id="copiarPayload" class="btn btn-sm btn-outline-primary" disabled>
                                                <i class="bi bi-clipboard"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 mb-3">
                                    <div class="border rounded p-3 h-100">
                                        <h6 class="text-warning fw-bold mb-3">
                                            <i class="bi bi-shield-check me-1"></i>SIGNATURE
                                        </h6>
                                        <pre id="signatureBase64" class="bg-light p-2 rounded small mb-2 text-break">Firmaturaencoded...</pre>
                                        <div class="d-flex justify-content-between">
                                            <small class="text-muted">Firma del token</small>
                                            <button id="copiarSignature" class="btn btn-sm btn-outline-primary" disabled>
                                                <i class="bi bi-clipboard"></i>
                                            </button>
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
                        <div class="card-header bg-warning text-dark">
                            <h5 class="card-title mb-0">
                                <i class="bi bi-graph-up me-2"></i>Análisis del Token
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>Información General:</h6>
                                    <ul class="list-unstyled" id="infoGeneral">
                                        <li><strong>Algoritmo:</strong> <span id="algoritmo">-</span></li>
                                        <li><strong>Tipo:</strong> <span id="tipoToken">-</span></li>
                                        <li><strong>Partes:</strong> <span id="partesToken">-</span></li>
                                        <li><strong>Tamaño:</strong> <span id="tamanoToken">-</span></li>
                                    </ul>
                                </div>
                                <div class="col-lg-6">
                                    <h6>Claims Temporales:</h6>
                                    <ul class="list-unstyled" id="claimsTempo">
                                        <li><strong>Emitido en (iat):</strong> <span id="issuedAt">-</span></li>
                                        <li><strong>Expira en (exp):</strong> <span id="expiresAt">-</span></li>
                                        <li><strong>No antes de (nbf):</strong> <span id="notBefore">-</span></li>
                                        <li><strong>Estado:</strong> <span id="estadoToken" class="badge bg-secondary">Desconocido</span></li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="row mt-3">
                                <div class="col-12">
                                    <h6>Claims Encontrados:</h6>
                                    <div id="claimsEncontrados" class="border rounded p-2 bg-light">
                                        <small class="text-muted">No hay token decodificado</small>
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
                                <i class="bi bi-info-circle me-2"></i>¿Qué es JWT?
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <h6>JSON Web Token (JWT)</h6>
                                    <p class="text-muted">
                                        Es un estándar abierto que define una forma compacta y segura de transmitir 
                                        información entre partes como un objeto JSON.
                                    </p>
                                    <h6>Estructura:</h6>
                                    <ul class="list-unstyled">
                                        <li><span class="badge bg-danger me-2">Header</span>Algoritmo y tipo</li>
                                        <li><span class="badge bg-info me-2">Payload</span>Claims (datos)</li>
                                        <li><span class="badge bg-warning text-dark me-2">Signature</span>Verificación</li>
                                    </ul>
                                </div>
                                <div class="col-lg-6">
                                    <h6>Claims comunes:</h6>
                                    <ul class="list-unstyled">
                                        <li><code>iss</code> - Issuer (emisor)</li>
                                        <li><code>sub</code> - Subject (sujeto)</li>
                                        <li><code>aud</code> - Audience (audiencia)</li>
                                        <li><code>exp</code> - Expiration (expiración)</li>
                                        <li><code>nbf</code> - Not Before (no antes de)</li>
                                        <li><code>iat</code> - Issued At (emitido en)</li>
                                        <li><code>jti</code> - JWT ID (identificador)</li>
                                    </ul>
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
        this.configurarFavoritos();

        document.getElementById('tokenInput').addEventListener('input', (e) => {
            this.validarToken(e.target.value);
        });

        document.getElementById('decodificarToken').addEventListener('click', () => {
            this.decodificarJWT();
        });

        document.getElementById('limpiarToken').addEventListener('click', () => {
            this.limpiarTodo();
        });

        document.getElementById('pegarEjemplo').addEventListener('click', () => {
            this.usarTokenEjemplo();
        });

        document.getElementById('copiarToken').addEventListener('click', () => {
            this.copiarAlPortapapeles(document.getElementById('tokenInput').value);
        });

        document.getElementById('copiarHeader').addEventListener('click', () => {
            this.copiarAlPortapapeles(document.getElementById('headerDecodificado').textContent);
        });

        document.getElementById('copiarPayload').addEventListener('click', () => {
            this.copiarAlPortapapeles(document.getElementById('payloadDecodificado').textContent);
        });

        document.getElementById('copiarSignature').addEventListener('click', () => {
            this.copiarAlPortapapeles(document.getElementById('signatureBase64').textContent);
        });
    }

    configurarFavoritos() {
        const boton = document.getElementById('botonFavoritos');
        const icono = document.getElementById('iconoFavoritos');
        const texto = document.getElementById('textoFavoritos');
        
        if (!boton || !icono || !texto) return;
        
        const esFavorito = localStorage.getItem('favoritos') ? 
            JSON.parse(localStorage.getItem('favoritos')).some(fav => fav.id === 'decodificador-jwt') : false;
        
        if (esFavorito) {
            icono.className = 'bi bi-star-fill me-1';
            texto.textContent = 'En Favoritos';
        } else {
            icono.className = 'bi bi-star me-1';
            texto.textContent = 'Agregar a Favoritos';
        }
        
        boton.addEventListener('click', () => {
            if (window.utils && window.utils.gestorFavoritos) {
                window.utils.gestorFavoritos.alternar('decodificador-jwt', 'Decodificador JWT', 'bi-key');
                setTimeout(() => this.configurarFavoritos(), 100);
            }
        });
    }

    validarToken(token) {
        const contador = document.getElementById('contadorCaracteres');
        const estado = document.getElementById('estadoValidacion');
        const botonCopiar = document.getElementById('copiarToken');
        
        contador.textContent = token.length;
        
        if (token.length === 0) {
            estado.className = 'badge bg-secondary';
            estado.textContent = 'En espera';
            botonCopiar.disabled = true;
            return;
        }

        const partes = token.split('.');
        
        if (partes.length === 3) {
            estado.className = 'badge bg-success';
            estado.textContent = 'Formato válido';
            botonCopiar.disabled = false;
        } else {
            estado.className = 'badge bg-danger';
            estado.textContent = 'Formato inválido';
            botonCopiar.disabled = false; 
        }
    }

    decodificarJWT() {
        const token = document.getElementById('tokenInput').value.trim();
        
        if (!token) {
            this.mostrarNotificacion('Por favor ingresa un token JWT', 'warning');
            return;
        }

        try {
            const partes = token.split('.');
            
            if (partes.length !== 3) {
                throw new Error('El token JWT debe tener 3 partes separadas por puntos');
            }

            const header = JSON.parse(this.decodificarBase64URL(partes[0]));
            
            const payload = JSON.parse(this.decodificarBase64URL(partes[1]));
            
            const signature = partes[2];

            this.mostrarResultados(header, payload, signature, token);
            
            this.mostrarNotificacion('Token JWT decodificado exitosamente', 'success');
            
        } catch (error) {
            this.mostrarNotificacion('Error al decodificar el token: ' + error.message, 'error');
            console.error('Error de decodificación JWT:', error);
        }
    }

    decodificarBase64URL(str) {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        
        const padding = base64.length % 4;
        if (padding) {
            base64 += '='.repeat(4 - padding);
        }
        
        return decodeURIComponent(escape(atob(base64)));
    }

    mostrarResultados(header, payload, signature, tokenCompleto) {
        document.getElementById('headerDecodificado').textContent = JSON.stringify(header, null, 2);
        document.getElementById('copiarHeader').disabled = false;

        document.getElementById('payloadDecodificado').textContent = JSON.stringify(payload, null, 2);
        document.getElementById('copiarPayload').disabled = false;

        document.getElementById('signatureBase64').textContent = signature;
        document.getElementById('copiarSignature').disabled = false;

        this.analizarToken(header, payload, tokenCompleto);
        
        this.tokenActual = { header, payload, signature };
    }

    analizarToken(header, payload, token) {
        document.getElementById('algoritmo').textContent = header.alg || 'Desconocido';
        document.getElementById('tipoToken').textContent = header.typ || 'Desconocido';
        document.getElementById('partesToken').textContent = token.split('.').length;
        document.getElementById('tamanoToken').textContent = token.length + ' caracteres';

        this.analizarClaimsTemporal(payload);
        
        this.mostrarClaimsEncontrados(payload);
    }

    analizarClaimsTemporal(payload) {
        const iat = payload.iat;
        const exp = payload.exp;
        const nbf = payload.nbf;
        
        document.getElementById('issuedAt').textContent = iat ? 
            new Date(iat * 1000).toLocaleString() : '-';
        
        document.getElementById('expiresAt').textContent = exp ? 
            new Date(exp * 1000).toLocaleString() : '-';
            
        document.getElementById('notBefore').textContent = nbf ? 
            new Date(nbf * 1000).toLocaleString() : '-';

        const ahora = Math.floor(Date.now() / 1000);
        const estadoElement = document.getElementById('estadoToken');
        
        if (exp && ahora > exp) {
            estadoElement.className = 'badge bg-danger';
            estadoElement.textContent = 'Expirado';
        } else if (nbf && ahora < nbf) {
            estadoElement.className = 'badge bg-warning text-dark';
            estadoElement.textContent = 'No válido aún';
        } else if (exp) {
            estadoElement.className = 'badge bg-success';
            estadoElement.textContent = 'Válido';
        } else {
            estadoElement.className = 'badge bg-secondary';
            estadoElement.textContent = 'Sin expiración';
        }
    }

    mostrarClaimsEncontrados(payload) {
        const container = document.getElementById('claimsEncontrados');
        const claims = Object.keys(payload);
        
        if (claims.length === 0) {
            container.innerHTML = '<small class="text-muted">No hay claims en el payload</small>';
            return;
        }

        const claimsHTML = claims.map(claim => {
            const valor = typeof payload[claim] === 'object' ? 
                JSON.stringify(payload[claim]) : payload[claim];
            return `<span class="badge bg-light text-dark me-1 mb-1"><code>${claim}</code>: ${valor}</span>`;
        }).join('');
        
        container.innerHTML = claimsHTML;
    }

    usarTokenEjemplo() {
        const tokenEjemplo = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSJ9.4Adcj3UFYzPUVaVF43FmMab6RlaQD8A9V8wFzzht-KQ';
        
        document.getElementById('tokenInput').value = tokenEjemplo;
        this.validarToken(tokenEjemplo);
        this.mostrarNotificacion('Token de ejemplo cargado', 'info');
    }

    limpiarTodo() {
        document.getElementById('tokenInput').value = '';
        document.getElementById('contadorCaracteres').textContent = '0';
        document.getElementById('estadoValidacion').className = 'badge bg-secondary';
        document.getElementById('estadoValidacion').textContent = 'En espera';
        
        document.getElementById('headerDecodificado').textContent = '{\n  "alg": "...",\n  "typ": "..."\n}';
        document.getElementById('payloadDecodificado').textContent = '{\n  "sub": "...",\n  "name": "...",\n  "iat": ...\n}';
        document.getElementById('signatureBase64').textContent = 'Firmaturaencoded...';
        
        document.getElementById('copiarToken').disabled = true;
        document.getElementById('copiarHeader').disabled = true;
        document.getElementById('copiarPayload').disabled = true;
        document.getElementById('copiarSignature').disabled = true;
        
        document.getElementById('algoritmo').textContent = '-';
        document.getElementById('tipoToken').textContent = '-';
        document.getElementById('partesToken').textContent = '-';
        document.getElementById('tamanoToken').textContent = '-';
        document.getElementById('issuedAt').textContent = '-';
        document.getElementById('expiresAt').textContent = '-';
        document.getElementById('notBefore').textContent = '-';
        document.getElementById('estadoToken').className = 'badge bg-secondary';
        document.getElementById('estadoToken').textContent = 'Desconocido';
        document.getElementById('claimsEncontrados').innerHTML = '<small class="text-muted">No hay token decodificado</small>';
        
        this.tokenActual = null;
    }

    copiarAlPortapapeles(texto) {
        navigator.clipboard.writeText(texto).then(() => {
            this.mostrarNotificacion('Copiado al portapapeles', 'success');
        }).catch(() => {
            const textarea = document.createElement('textarea');
            textarea.value = texto;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            this.mostrarNotificacion('Copiado al portapapeles', 'success');
        });
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

window.decodificadorJWT = new DecodificadorJWT();