# Educase Assignment

## Overview

This project is a Node.js backend application which provides endpoints to add new schools and list all the schools closest to the given coordinates(latitude and longitude). The application uses MySQL database to store the schools and their coordinates. The application uses the Haversine formula to calculate the distance between the given coordinates and the schools. The application is dockerized and can be run using docker-compose.

## Features

-   **Add Schools:** Add new schools to the database.
-   **Fetch Schools:** List all schools closest to user's latitude and longitude.
-   **Pagination:** Pagination support for listing schools using page and count query parameters.
-   **Distance Filter:** Optional distance filter for listing schools.
-   **Error Handling:** Handles common errors such as file upload issues and data validation.

## Tech Stack

-   **Node.js:** Backend application is built using Node.js.
-   **Express:** Web framework for Node.js.
-   **MySQL:** Database to store schools and their coordinates.
-   **Docker:** Dockerized application.
-   **Docker Compose:** Docker compose to run the application.
-   **Prisma:** ORM for interacting with MySQL database.

## Setup

### Prerequisites

-   Node.js (v18 or later)
-   Docker
-   Docker Compose
-   MySQL

_**Tests for both local and EC2 deployed API are available on the postman collection**_

### For EC2 deployed testing ONLY

**Health Check Endpoint**

-   **URL:** `http://52.66.213.165:3000/health`
-   **Method:** `GET`
-   **Description:** This endpoint checks the health of the application. It should return a simple response indicating that the server is running correctly.

**Add School Endpoint**

-   **URL:** `http://52.66.213.165:3000/api/v1/addSchool`
-   **Method:** `POST`
-   **Description:** This endpoint allows you to add schools to the database. You can use the following payload to add a new school:

```json
{
	"name": "School Name",
	"address": "School Address",
	"latitude": 12.9715987,
	"longitude": 77.5945627
}
```

**Steps to Test:**

1. Use a tool like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to send a POST request.
2. In Postman, select `POST` as the method and set the URL to `http://52.66.213.165:3000/api/v1/addSchool`.
3. In the `Body` tab, select `JSON` and use the payload above to add a new school.
4. Send the request and check the response to ensure that the data is uploaded to the database.

**List Schools Endpoint**

-   **URL:** `http://52.66.213.165:3000/api/v1/listSchools?latitude=12.9715987&longitude=77.5945627`
-   **Method:** `GET`
-   **Description:** This endpoint lists all schools closest to the given latitude and longitude. You can use the following query parameters to filter the results:
-   `lat`: Latitude of the user.
-   `lon`: Longitude of the user.
-   `dis`: Optional distance filter to list schools within a certain radius.
-   `page`: Page number for pagination.
-   `count`: Number of schools to display per page.

    **Steps to Test:**

1. Use a tool like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to send a POST request.
2. In Postman, select `POST` as the method and set the URL to `http://52.66.213.165:3000/api/v1/addSchool`.
3. In the `Body` tab, select `JSON` and use the payload above to add a new school.
4. Send the request and check the response to ensure that the data is uploaded to the database.

### Local Testing ONLY

1. Clone the repository:

```bash
git clone https://github.com/Vector-ops/educase-assignment.git
cd educase-assignment
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```bash
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=your_database
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password

DATABASE_URL="mysql://your_user:your_password@mysql:3306/your_database"
```

4.  **Build and Run with Makefile**

    The project includes a `Makefile` to simplify common tasks. Ensure you have [Make](https://www.gnu.org/software/make/) installed on your machine.

    Run the following command to build the Docker image and run it:

    ```bash
    make all
    ```

    To stop the container, run:

    ```bash
    make stop
    ```

    To clean up, run:

    ```bash
     make clean
    ```

5.  **Testing the Application**

    After setting up and running the application, you can test the following endpoints:

    **Health Check Endpoint**

    -   **URL:** `http://localhost:3000/health`
    -   **Method:** `GET`
    -   **Description:** This endpoint checks the health of the application. It should return a simple response indicating that the server is running correctly.

    **Add School Endpoint**

    -   **URL:** `http://localhost:3000/api/v1/addSchool`
    -   **Method:** `POST`
    -   **Description:** This endpoint allows you to add schools to the database. You can use the following payload to add a new school:

    ```json
    {
        "name": "School Name",
        "address: "School Address",
        "latitude": 12.9715987,
        "longitude": 77.5945627
    }
    ```

    **Steps to Test:**

    1. Use a tool like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to send a POST request.
    2. In Postman, select `POST` as the method and set the URL to `http://localhost:3000/api/v1/addSchool`.
    3. In the `Body` tab, select `JSON` and use the payload above to add a new school.
    4. Send the request and check the response to ensure that the data is uploaded to the database.

    **List Schools Endpoint**

    -   **URL:** `http://localhost:3000/api/v1/listSchools?latitude=12.9715987&longitude=77.5945627`
    -   **Method:** `GET`
    -   **Description:** This endpoint lists all schools closest to the given latitude and longitude. You can use the following query parameters to filter the results:
    -   `lat`: Latitude of the user.
    -   `lon`: Longitude of the user.
    -   `dis`: Optional distance filter to list schools within a certain radius.
    -   `page`: Page number for pagination.
    -   `count`: Number of schools to display per page.

        **Steps to Test:**

    1. Use a tool like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to send a POST request.
    2. In Postman, select `POST` as the method and set the URL to `http://localhost:3000/api/v1/addSchool`.
    3. In the `Body` tab, select `JSON` and use the payload above to add a new school.
    4. Send the request and check the response to ensure that the data is uploaded to the database.
