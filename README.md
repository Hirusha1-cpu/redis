# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Redis
redis-server

# Terminal 3: Start Backend
cd backend
npm start

# Terminal 4: Start Frontend
cd frontend
npm start

# Check if Redis server is running
redis-cli ping
# Should return "PONG"


curl -X POST http://localhost:5005/api/books \
-H "Content-Type: application/json" \
-d '{
    "title": "Test Book",
    "author": "Test Author",
    "price": 29.99,
    "publishedYear": 2024,
    "description": "Test Description"
}'

curl http://localhost:5000/api/books

#### Check Cache Contents
```bash
# Connect to Redis CLI
redis-cli

# List all keys
KEYS *

# Get specific cached book
GET "book:{id}"

# Get all books cache
GET "book:all"

# Monitor Redis operations in real-time
MONITOR


### 5.2 Redis Performance Monitoring
```bash
# Monitor Redis memory usage
redis-cli info memory

# Monitor Redis hits/misses
redis-cli info stats | grep hit

# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Redis
redis-server

# Terminal 3: Start Backend
cd backend
npm start

# Terminal 4: Start Frontend
cd frontend
npm start

brew install redis

mern-redis-books/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── redis.js
│   ├── controllers/
│   │   └── bookController.js
│   ├── models/
│   │   └── Book.js
│   ├── routes/
│   │   └── bookRoutes.js
│   ├── middleware/
│   │   └── cache.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── BookList.js
    │   │   ├── BookForm.js
    │   │   └── BookDetails.js
    │   ├── services/
    │   │   └── bookService.js
    │   ├── App.js
    │   └── index.js
    └── package.json
