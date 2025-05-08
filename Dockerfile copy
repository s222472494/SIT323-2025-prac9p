# Use a base image with Node.js
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your app runs on (change if needed)
EXPOSE 3000

# Command to run your application
CMD ["node", "index.js"]
