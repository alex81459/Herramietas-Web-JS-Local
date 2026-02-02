// Bootstrap Icons Loader - Carga iconos SVG localmente
class BootstrapIconsLoader {
    constructor() {
        this.iconCache = new Map();
        this.basePath = 'lib/bootstrap-icons/icons/';
    }

    // Carga un icono SVG desde el archivo local
    async loadIcon(iconName) {
        // Si ya está en caché, devolverlo
        if (this.iconCache.has(iconName)) {
            return this.iconCache.get(iconName);
        }

        try {
            const response = await fetch(`${this.basePath}${iconName}.svg`);
            if (!response.ok) {
                console.warn(`Icon not found: ${iconName}`);
                return null;
            }
            
            const svgText = await response.text();
            // Guardar en caché
            this.iconCache.set(iconName, svgText);
            return svgText;
        } catch (error) {
            console.warn(`Error loading icon ${iconName}:`, error);
            return null;
        }
    }

    // Reemplaza todos los iconos en el documento
    async replaceAllIcons() {
        const iconElements = document.querySelectorAll('[class*="bi-"]');
        
        for (const element of iconElements) {
            const classList = Array.from(element.classList);
            const iconClass = classList.find(cls => cls.startsWith('bi-') && cls !== 'bi');
            
            if (iconClass) {
                const iconName = iconClass.substring(3); // Remover 'bi-'
                const svgContent = await this.loadIcon(iconName);
                
                if (svgContent) {
                    // Crear un contenedor para el SVG
                    const wrapper = document.createElement('span');
                    wrapper.className = element.className;
                    wrapper.innerHTML = svgContent;
                    
                    // Aplicar estilos al SVG
                    const svg = wrapper.querySelector('svg');
                    if (svg) {
                        svg.style.width = '1em';
                        svg.style.height = '1em';
                        svg.style.fill = 'currentColor';
                        svg.style.verticalAlign = '-0.125em';
                    }
                    
                    // Reemplazar el elemento original
                    element.parentNode.replaceChild(wrapper, element);
                }
            }
        }
    }
}

// Inicializar el cargador de iconos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    const iconLoader = new BootstrapIconsLoader();
    await iconLoader.replaceAllIcons();
});

// Función global para cargar iconos dinámicamente
window.loadBootstrapIcon = async (iconName) => {
    const iconLoader = new BootstrapIconsLoader();
    return await iconLoader.loadIcon(iconName);
};