# Establece la imagen base oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Copia el resto de la aplicación al contenedor
COPY . .

# Expone el puerto en el que se ejecuta la aplicación (por defecto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
