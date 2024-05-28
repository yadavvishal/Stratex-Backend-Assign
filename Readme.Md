Stratex Backend Assignment

Objective

Develop a REST backend using Node.js, Express.js, and MongoDB, that supports user (buyer) and seller functionalities. Sellers can manage books via a URL pointing to a CSV file, while users can view books. Authentication and authorization are implemented to ensure proper access control.

Requirements

A seller can have many books, but each book belongs to one seller.
Users and sellers can register and log in.
Sellers can upload books from a URL (CSV format).
Users can view all books and details of specific books.
Sellers can view, edit, and delete their own books.
Sellers cannot access or modify books uploaded by other sellers.

Setup Instructions
Prerequisites
Node.js and npm: Ensure Node.js and npm are installed on your machine.
MongoDB: You need a MongoDB instance running. You can use a local MongoDB server or a cloud service like MongoDB Atlas.

Installation
Clone the project:

bash

git clone https://github.com/yadavvishal/stratex-backend-Assign

cd stratex-backend
Install dependencies:

bash

npm install

Create a .env file:
Create a .env file in the root of the project directory with the following content:

makefile

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000

Replace your_mongodb_uri with your MongoDB connection string.
Replace your_jwt_secret with a secure secret string of your choice.
Start the server:

bash

npm run dev

API Endpoints
User Registration
Endpoint: POST /api/users/register
Request Body:
json

{
"name": "John Doe",
"email": "john@example.com",
"password": "password123",
"role": "buyer" // or "seller"
}
User Login
Endpoint: POST /api/users/login
Request Body:
json

{
"email": "john@example.com",
"password": "password123"
}
Response:
json

{
"token": "your_jwt_token"
}
Upload Books from URL (for sellers)
Endpoint: POST /api/books/upload
Headers:
Authorization: Bearer your_jwt_token
Request Body:
json

{
"url": "https://docs.google.com/spreadsheets/d/16dSwNe8u4Aj4wCRka3bYtIWhFyjDlVZuXPRgmPQKpE0/export?format=csv&gid=1612897053"
}
Get All Books (for users)
Endpoint: GET /api/books
Headers:
Authorization: Bearer your_jwt_token
Get Seller's Books
Endpoint: GET /api/books/seller
Headers:
Authorization: Bearer your_jwt_token
Update a Book (for sellers)
Endpoint: PUT /api/books/:id
Headers:
Authorization: Bearer your_jwt_token
Request Body:
json

{
"title": "New Title",
"author": "New Author"
}
Delete a Book (for sellers)
Endpoint: DELETE /api/books/:id
Headers:
Authorization: Bearer your_jwt_token
Get Book by ID (for users)
Endpoint: GET /api/books/:id
Headers:
Authorization: Bearer your_jwt_token
Example Testing Steps
Register a seller:

json

POST /api/users/register
{
"name": "John Seller",
"email": "seller@example.com",
"password": "password123",
"role": "seller"
}
Login as the seller:

json

POST /api/users/login
{
"email": "seller@example.com",
"password": "password123"
}
Use the returned token in the Authorization header for the following requests.
Upload books from URL:

json

POST /api/books/upload
{
"url": "https://docs.google.com/spreadsheets/d/16dSwNe8u4Aj4wCRka3bYtIWhFyjDlVZuXPRgmPQKpE0/export?format=csv&gid=1612897053"
}
View seller's books:

json

GET /api/books/seller
Update a book:

json

PUT /api/books/:id
{
"title": "Updated Title",
"author": "Updated Author"
}
Delete a book:

json

DELETE /api/books/:id
Register a buyer:

json

POST /api/users/register
{
"name": "John Buyer",
"email": "buyer@example.com",
"password": "password123",
"role": "buyer"
}
Login as the buyer:

json

POST /api/users/login
{
"email": "buyer@example.com",
"password": "password123"
}
Use the returned token in the Authorization header for the following requests.
View all books:

json

GET /api/books
View book details:

json

GET /api/books/:id
