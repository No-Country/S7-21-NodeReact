# Usa una imagen de node.js
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install --production

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Compila el código Sass
RUN npm run build:css

# Compila el proyecto de RemixJS
RUN npm run build

# Expone el puerto 3000 para que el servidor web sea accesible
EXPOSE 3000

# Ejecuta el servidor de RemixJS
CMD ["npm", "start"]
