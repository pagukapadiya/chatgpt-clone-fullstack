#!/bin/bash

echo "Setting up ChatGPT Backend..."

# Create project structure
mkdir -p src/{controllers,services,repositories,models,routes,middleware,utils,types}
mkdir -p logs data

# Initialize package.json
npm init -y

# Install dependencies
echo "Installing dependencies..."
npm install express cors uuid dotenv helmet morgan compression
npm install -D @types/express @types/cors @types/uuid @types/node @types/morgan @types/compression typescript ts-node nodemon

# Create TypeScript config
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@controllers/*": ["src/controllers/*"],
      "@services/*": ["src/services/*"],
      "@models/*": ["src/models/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Create environment file
cat > .env << 'EOF'
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
API_PREFIX=/api
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
dist/
logs/
.env
.DS_Store
*.log
EOF

# Create README
cat > README.md << 'EOF'
# ChatGPT Clone Backend

A TypeScript-based backend API for a ChatGPT-style application.

## Features
- RESTful API with TypeScript
- MVC Architecture
- In-memory session storage
- Real-time chat functionality
- Session management
- Table data generation

## Installation

1. Install dependencies:
```bash
npm install
Set up environment variables:

bash
cp .env.example .env
Start development server:

bash
npm run dev
API Endpoints
Chat
POST /api/chat/start - Start new chat

POST /api/chat/:sessionId/message - Send message

PUT /api/chat/:sessionId/message/:messageId/feedback - Update feedback

Sessions
GET /api/sessions - Get all sessions

GET /api/sessions/:sessionId - Get session details

DELETE /api/sessions/:sessionId - Delete session

PUT /api/sessions/:sessionId/title - Update title

Development
bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
EOF

echo "Backend setup complete! 🎉"
echo ""
echo "To start the backend:"
echo "cd backend && npm run dev"
echo ""
echo "Server will run on: http://localhost:5000"
echo "API Documentation: http://localhost:5000/api/docs"

text

---

## 🚀 **Quick Start**

```bash
# Make setup script executable
chmod +x setup.sh

# Run setup
./setup.sh

# Install additional dependencies
npm install joi @types/joi winston

# Start development server
npm run dev