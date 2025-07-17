[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19951371&assignment_repo_type=AssignmentRepo)
# Express.js Product API

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install express body-parser uuid dotenv
   ```
2. **Set up environment variables:**
   - Copy `.env.example` to `.env` and set your API key:
     ```
     API_KEY=your_api_key_here
     ```
3. **Run the server:**
   ```bash
   node server.js
   ```
   The server will run on [http://localhost:3000](http://localhost:3000)

## API Endpoints

All endpoints require an `x-api-key` header with your API key.

### Root
- `GET /`
  - Returns: Welcome message

### Products
- `GET /api/products`
  - List all products
  - Query params: `category`, `page`, `limit`
  - Example: `/api/products?category=electronics&page=1&limit=2`
- `GET /api/products/:id`
  - Get product by ID
- `POST /api/products`
  - Create a new product
  - Body: `{ name, description, price, category, inStock }`
- `PUT /api/products/:id`
  - Update a product
  - Body: `{ name, description, price, category, inStock }`
- `DELETE /api/products/:id`
  - Delete a product
- `GET /api/products/search?name=...`
  - Search products by name
- `GET /api/products/stats`
  - Get product count by category

## Example Requests

**Create Product:**
```
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key_here" \
  -d '{"name":"Tablet","description":"10-inch tablet","price":300,"category":"electronics","inStock":true}'
```

**Get Products (paginated):**
```
curl -H "x-api-key: your_api_key_here" http://localhost:3000/api/products?page=1&limit=2
```

**Search by Name:**
```
curl -H "x-api-key: your_api_key_here" http://localhost:3000/api/products/search?name=laptop
```

**Get Stats:**
```
curl -H "x-api-key: your_api_key_here" http://localhost:3000/api/products/stats
```

## Error Responses
- 400: Validation error
- 401: Unauthorized (missing/invalid API key)
- 404: Not found
- 500: Internal server error

---

**Author:** Francis Njuguna 