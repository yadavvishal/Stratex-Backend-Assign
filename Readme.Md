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


Installation

Clone the project:

git clone https://github.com/yadavvishal/stratex-backend-Assign


Install dependencies:

npm install

Start the server: 

npm run dev

API Endpoints:

1- Register a Seller 

POST /api/users/register
{
"name": "John Seller",
"email": "seller@example.com",
"password": "password123",
"role": "seller"
}


2- Login as the seller:

POST /api/users/login
{
"email": "seller@example.com",
"password": "password123"
}


Use the returned token in the Authorization header for the following requests.

3- Upload books from URL:


POST /api/books/upload
{
"url": "https://docs.google.com/spreadsheets/d/16dSwNe8u4Aj4wCRka3bYtIWhFyjDlVZuXPRgmPQKpE0/export?format=csv&gid=1612897053"
}


4- View seller's books:


GET /api/books/seller


5- Update a book:


PUT /api/books/:id
{
"title": "Updated Title",
"author": "Updated Author"
}


6- Delete a book:


DELETE /api/books/:id


7- Register a buyer:


POST /api/users/register
{
"name": "John Buyer",
"email": "buyer@example.com",
"password": "password123",
"role": "buyer"
}


8- Login as the buyer:


POST /api/users/login
{
"email": "buyer@example.com",
"password": "password123"
}


Use the returned token in the Authorization header for the following requests.


9- View all books:


GET /api/books


10- View book details:



GET /api/books/:id

