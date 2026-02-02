const Almacenamiento = {
    obtener: (clave) => {
        try {
            return JSON.parse(localStorage.getItem(clave)) || null;
        } catch {
            return null;
        }
    },
    
    guardar: (clave, valor) => {
        try {
            localStorage.setItem(clave, JSON.stringify(valor));
            return true;
        } catch {
            return false;
        }
    },
    
    eliminar: (clave) => {
        localStorage.removeItem(clave);
    }
};

const GestorFavoritos = {
    obtenerFavoritos: () => Almacenamiento.obtener('favoritos') || [],
    
    esFavorito: (idHerramienta) => {
        const favoritos = GestorFavoritos.obtenerFavoritos();
        return favoritos.includes(idHerramienta);
    },
    
    alternarFavorito: (idHerramienta) => {
        const favoritos = GestorFavoritos.obtenerFavoritos();
        const indice = favoritos.indexOf(idHerramienta);
        
        if (indice > -1) {
            favoritos.splice(indice, 1);
        } else {
            favoritos.push(idHerramienta);
        }
        
        Almacenamiento.guardar('favoritos', favoritos);
        return favoritos.includes(idHerramienta);
    }
};

const GestorHistorial = {
    agregarAlHistorial: (idHerramienta) => {
        const historial = Almacenamiento.obtener('historial') || [];
        
        const indice = historial.findIndex(item => item.id === idHerramienta);
        if (indice > -1) {
            historial.splice(indice, 1);
        }
        
        historial.unshift({
            id: idHerramienta,
            fecha: new Date().toISOString(),
            contador: (historial.find(item => item.id === idHerramienta)?.contador || 0) + 1
        });
        
        if (historial.length > 10) {
            historial.splice(10);
        }
        
        Almacenamiento.guardar('historial', historial);
    },
    
    obtenerHistorial: () => Almacenamiento.obtener('historial') || []
};

const GestorTemas = {
    temaActual: () => Almacenamiento.obtener('tema') || 'light',
    
    aplicarTema: (tema) => {
        document.documentElement.setAttribute('data-theme', tema);
        Almacenamiento.guardar('tema', tema);
        const icono = document.getElementById('iconoTema');
        if (icono) {
            icono.className = tema === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
        }
    },
    
    alternarTema: () => {
        const temaActual = GestorTemas.temaActual();
        const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
        GestorTemas.aplicarTema(nuevoTema);
        return nuevoTema;
    }
};

const UtilsUI = {
    mostrarNotificacion: (mensaje, tipo = 'info', duracion = 3000) => {
        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${tipo} border-0`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${mensaje}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            container.style.zIndex = '9999';
            document.body.appendChild(container);
        }
        
        container.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast, { delay: duracion });
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    },
    
    copiarAlPortapapeles: async (texto) => {
        try {
            await navigator.clipboard.writeText(texto);
            UtilsUI.mostrarNotificacion('Copiado al portapapeles', 'success', 2000);
            return true;
        } catch {
            const textarea = document.createElement('textarea');
            textarea.value = texto;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            UtilsUI.mostrarNotificacion('Copiado al portapapeles', 'success', 2000);
            return true;
        }
    },
    
    formatearFecha: (fecha) => {
        if (typeof fecha === 'string') fecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(fecha);
    },
    
    formatearTamano: (bytes) => {
        const unidades = ['B', 'KB', 'MB', 'GB'];
        let tam = bytes;
        let unidadIndex = 0;
        
        while (tam >= 1024 && unidadIndex < unidades.length - 1) {
            tam /= 1024;
            unidadIndex++;
        }
        
        return `${tam.toFixed(unidadIndex > 0 ? 1 : 0)} ${unidades[unidadIndex]}`;
    }
};

const Validaciones = {
    esEmail: (email) => {
        const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return patron.test(email);
    },
    
    esTelefono: (telefono) => {
        const patron = /^(\+?56)?[\s-]?[2-9]\d{8}$/;
        return patron.test(telefono.replace(/\s|-/g, ''));
    },
    
    esURL: (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },
    
    soloNumeros: (texto) => {
        return /^\d+$/.test(texto);
    },
    
    soloLetras: (texto) => {
        return /^[a-zA-ZÁáÉéÍíÓóÚúÑñ\s]+$/.test(texto);
    }
};

const UtilsArchivo = {
    leerArchivoComoTexto: (archivo) => {
        return new Promise((resolver, rechazar) => {
            const lector = new FileReader();
            lector.onload = e => resolver(e.target.result);
            lector.onerror = e => rechazar(e);
            lector.readAsText(archivo);
        });
    },
    
    leerArchivoComoDataURL: (archivo) => {
        return new Promise((resolver, rechazar) => {
            const lector = new FileReader();
            lector.onload = e => resolver(e.target.result);
            lector.onerror = e => rechazar(e);
            lector.readAsDataURL(archivo);
        });
    },
    
    leerArchivoComoArrayBuffer: (archivo) => {
        return new Promise((resolver, rechazar) => {
            const lector = new FileReader();
            lector.onload = e => resolver(e.target.result);
            lector.onerror = e => rechazar(e);
            lector.readAsArrayBuffer(archivo);
        });
    },
    
    descargarArchivo: (contenido, nombreArchivo, tipoMime = 'text/plain') => {
        const blob = new Blob([contenido], { type: tipoMime });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = nombreArchivo;
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    }
};

const UtilsCrypto = {
    generarHashSHA256: async (texto) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(texto);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    },
    
    generarHashSHA1: async (texto) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(texto);
        const hash = await crypto.subtle.digest('SHA-1', data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    },
    
    generarUUIDv4: () => {
        if (crypto.randomUUID) {
            return crypto.randomUUID();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

window.Almacenamiento = Almacenamiento;
window.GestorFavoritos = GestorFavoritos;
window.GestorHistorial = GestorHistorial;
window.GestorTemas = GestorTemas;
window.UtilsUI = UtilsUI;
window.Validaciones = Validaciones;
window.UtilsArchivo = UtilsArchivo;
window.UtilsCrypto = UtilsCrypto;
window.debounce = debounce;
window.throttle = throttle;