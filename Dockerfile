# ============================================
# Stage 1: build de Angular
# ============================================
FROM node:24-alpine AS builder

WORKDIR /app

# Instalar dependencias (usa npm install para tolerar deps opcionales
# platform-specific como @emnapi/core que no siempre están en el lock)
COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund --prefer-offline

# Copiar el resto del código y compilar
COPY . .
RUN npm run build -- --configuration production

# ============================================
# Stage 2: servir con nginx
# ============================================
FROM nginx:1.27-alpine AS runtime

# Eliminar la configuración por defecto y copiar la nuestra
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar el bundle compilado al directorio que sirve nginx
COPY --from=builder /app/dist/dummyjson-products/browser /usr/share/nginx/html

# nginx escucha en el puerto 80
EXPOSE 80

# Healthcheck básico — verifica que nginx responde
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
