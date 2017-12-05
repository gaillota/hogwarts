# List of useful commands
This is an non-exhaustive list of commands for this project

## Run (development mode)
`docker-compose`
```
// Default command (detached mode)
docker-compose up -d

// Force re-build
docker-compose up -d --build

// Overriding default CMD (with ports mapped to host)
docker-compose run --rm --service-ports app yarn run dev
```

`docker`
```
// Remove all containers
docker rm -f $(docker ps -aq)

// See every running containers
docker ps -a
```
