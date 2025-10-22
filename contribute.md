-   install docker
-   create network
    `docker network create mynetwork`
- run postgres
    `docker run --network=mynetwork -d -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword --name mypostgres postgres`
- build image
    `docker build -f ./Docker/dockerfile.backend -t mybackend:1 .`
-   run docker container
    `docker run --network=mynetwork -d -p 8080:8080 -e DATABASE_URL=postgresql://postgres:mysecretpassword@mypostgres:5432 --name mybackend mybackend:1`

    ## ws
- build image
    `docker build -f ./Docker/dockerfile.ws -t ws:1 .`
-   run docker container
    `docker run --network=mynetwork -d -p 8081:8081 -e DATABASE_URL=postgresql://postgres:mysecretpassword@mypostgres:5432 --name myws ws:1`

    ## frontend

-   build image
    `docker build -f ./Docker/dockerfile.frontend --build-arg DATABASE_URL=postgresql://postgres:mysecretpassword@mypostgres:5432 -t frontend:1 .`
-   run docker container
    `docker run --network=mynetwork -d -p 3000:3000 --name myfrontend frontend:1`