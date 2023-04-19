# Usa una imagen de node.js
FROM node:14

COPY package*.json /app/
# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install
RUN npm install -g sass
RUN npm install -g remix


# Compila el código Sass
RUN npm run build:css

# Compila el proyecto de RemixJS
RUN npm run build

# Expone el puerto 3000 para que el servidor web sea accesible
EXPOSE 3000

# Ejecuta el servidor de RemixJS
CMD [ "npm", "run", "start" ]
