# Use the official Node.js 14 image as the base image
FROM node:14

# Install npm version 9.5.0
RUN npm install -g npm@9.5.0

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["remix", "run"]