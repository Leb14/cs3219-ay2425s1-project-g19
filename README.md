[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/bzPrOe11)
# CS3219 Project (PeerPrep) - AY2425S1
## Group: G19

### Quickstart:
There are two ways to run our application:
1. Using Docker
2. Using `npm`

Fisrt download or `git clone` our code.

#### Using Docker:
1. Make sure Docker is running
2. Add a file named `.env` to current directory (i.e., project root directory), with the following content:

    ```
    # user-service
    JWT_SECRET=
    DB_CLOUD_URI=
    DB_LOCAL_URI=

    # questions-service
    MONGO_URL=

    # matching-service
    CLOUDAMQP_URL=
    ```
    Fill in it with your own environment variable values.
3. 
- If you are using running on MacOS or Linux, run the bash script:
    `./run_all_containerized_services.sh`
    
    If an error 
    
    `permission denied: ./run_all_containerized_services.sh` 
    
    occurs, please run 
    
    `chmod a+x run_all_containerized_services.sh` 

    before running the script.

- If you are using running on Windows, run:
    ```
    docker-compose build --no-cache
    docker-compose up -d
    ```
4. To stop all services, run:

    `docker compose down` or `docker-compose down`(for Windows)

#### Using `npm`:
1. Add a file named `.env` to user_service directory (i.e., `./backend/user-service`), with the following content:

    ```
    DB_CLOUD_URI=
    DB_LOCAL_URI=
    PORT=8000
    ENV=PROD
    JWT_SECRET=
    ```
    Fill in it with your own environment variable values.
2. Add a file named `.env` to questions_service directory (i.e., `./backend/questions_service`), with the following content:

    ```
    PORT=8001
    MONGO_URL=
    ```
    Fill in it with your own environment variable values.
3. 
- If you are running on MacOS or Linux, change back to the project root directory and run the script: 

    `./run_all_services.sh`

    If an error 
    
    `permission denied: ./run_all_services.sh` 
    
    occurs, please run 
    
    `chmod a+x run_all_services.sh` 

    before running the script.

    To stop all services, press `Ctrl + C`.

- If you are running on Windows:
    1. run `npm install` for all backend services.

    2. Change to the `/backend` directory, and run:
    `npm start`.

    3. Then change to the `/frontend` directory and run:

    ```
    npm install
    npm start
    ```
    4. To stop all services, press `Ctrl + C` in all service directories.


**Now the frontend can be viewed at `http://localhost:3000`.**
