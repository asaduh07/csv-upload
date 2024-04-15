# CSV File Viewer
This project is a simple CSV file viewer that allows users to upload CSV files and view the data in a table format. It includes features such as displaying a list of uploaded CSV files, searching within the table, sorting columns, and pagination.

## Setup Instructions
To set up the project on your local system, follow these steps:

1. Clone the Repository: Start by cloning this repository to your local machine using the following command: git clone <repository-url>
2. Install Dependencies: Navigate to the project directory and install the required dependencies using npm: npm install
3. Create Environment File: Create a .env file in the root of the backend repository with the following variables:
DB_URL=<your-database-url>
PORT=<port-number>
Replace <your-database-url> with the URL of your MongoDB database and <port-number> with the port number on which you want the server to run.
Start the Server: Once the dependencies are installed.

Usage
Once the server is running, you can access the application in your web browser. Here's how to use the main features:

Upload CSV File: Click on the "Upload CSV File" button to select a CSV file from your local system and upload it.
View Uploaded Files: The list of uploaded CSV files will be displayed on the main page. Click on a file name to view its data.
Search Data: Use the search box to search within the displayed table. Only rows that match the search criteria will be shown.
Sort Columns: Click on the column headers to sort the data in ascending or descending order.
Pagination: The table displays a maximum of 100 records per page. Use the pagination controls to navigate through the data.
Extra Features
Well-Commented Code: The code is thoroughly commented to explain the functionality of each part.
Validation: Both client-side and server-side validation are implemented to ensure that only CSV files can be uploaded.
Dynamic Table Headers: The table headers are dynamically generated based on the column headers of the uploaded CSV file.
Technologies Used
Node.js
Express.js
HTML
CSS
JavaScript
Bootstrap
Feel free to explore the codebase and make any modifications as needed. If you have any questions or encounter any issues, don't hesitate to reach out to the project maintainers. Happy coding!