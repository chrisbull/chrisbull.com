#!/bin/bash

# Portfolio Site Setup Script
# This script automates the Docker setup process

set -e  # Exit on any error

echo "🚀 Setting up Portfolio Site with Docker..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env exists, if not create it
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✅ Created .env file from env.example"
else
    echo "📝 .env file already exists"
fi

# Start Docker services
echo "🐳 Starting Docker services..."
docker compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 10

# Check if PostgreSQL is healthy
echo "🔍 Checking PostgreSQL connection..."
until docker compose exec postgres pg_isready -U postgres -d postgres; do
    echo "⏳ Waiting for PostgreSQL..."
    sleep 2
done

echo "✅ PostgreSQL is ready!"

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Push database schema
echo "🗄️  Setting up database schema..."
npm run db:push

# Seed the database
echo "🌱 Seeding database with sample data..."
npm run db:seed

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Available services:"
echo "   • Portfolio Site: http://localhost:3000"
echo "   • pgAdmin (Database UI): http://localhost:5050"
echo ""
echo "🔐 Admin login credentials:"
echo "   • Email: admin@admin.com"
echo "   • Password: admin123"
echo ""
echo "🚀 To start the development server:"
echo "   npm run dev"
echo ""
echo "📊 To view logs:"
echo "   docker compose logs -f"
echo ""
echo "🛑 To stop services:"
echo "   docker compose down"
echo "" 