# Usa la imagen base oficial de Nginx
FROM nginx:alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/share/nginx/html

# Elimina los archivos predeterminados de Nginx
RUN rm -rf ./*

# Copia los archivos del frontend al contenedor
COPY . .

# Expone el puerto 80 para el servidor Nginx
EXPOSE 80

# Nginx inicia automáticamente al ejecutar el contenedor
