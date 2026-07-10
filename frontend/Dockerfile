FROM node:18-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Delete node_modules folder and package-lock.json Install dependencies
RUN rm -rf node_modules package-lock.json && npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]