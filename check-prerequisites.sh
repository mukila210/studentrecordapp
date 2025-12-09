#!/bin/bash

echo "╔════════════════════════════════════════════════════════════╗"
echo "║    STUDENT RECORD SYSTEM - Prerequisites Check             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check Java
echo "Checking prerequisites..."
echo ""

if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    echo "✓ Java: $JAVA_VERSION"
else
    echo "✗ Java: NOT INSTALLED"
fi

# Check Maven
if command -v mvn &> /dev/null; then
    MVN_VERSION=$(mvn --version 2>&1 | head -n 1)
    echo "✓ Maven: $MVN_VERSION"
else
    echo "✗ Maven: NOT INSTALLED"
fi

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js: $NODE_VERSION"
else
    echo "✗ Node.js: NOT INSTALLED"
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✓ npm: $NPM_VERSION"
else
    echo "✗ npm: NOT INSTALLED"
fi

# Check MySQL
if command -v mysql &> /dev/null; then
    MYSQL_VERSION=$(mysql --version)
    echo "✓ MySQL: $MYSQL_VERSION"
else
    echo "✗ MySQL: NOT INSTALLED"
fi

echo ""
echo "════════════════════════════════════════════════════════════"
echo ""
echo "If all are installed, you're ready to run the project!"
echo ""
echo "NEXT STEPS:"
echo "1. Setup database:     mysql -u root -p < database/student_db.sql"
echo "2. Start backend:      cd backend && mvn spring-boot:run"
echo "3. Start frontend:     cd frontend && npm install && npm start"
echo ""
