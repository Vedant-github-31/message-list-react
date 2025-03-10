### To start the project

    docker-compose build && docker-compose up -d

### To tear it down

    docker-compose down

### To enter the PHP server interactive terminal

    docker exec -it docker-server-web-1 /bin/bash

### To exit the interactive terminal

    exit

### To list all containers (stopped or running)

    docker container list -a

### To view logs for a container (stopped or running)

    docker logs <container id>

### To view your React project (in your browser)

    localhost:3000
