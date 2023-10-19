# Use the official Node.js image as the base image for the frontend
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the frontend port (change the port if needed)
EXPOSE 3000

# Start the frontend development server
CMD ["npm", "start"]
