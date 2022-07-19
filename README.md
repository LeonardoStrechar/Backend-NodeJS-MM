# PROJECT INSTALATION

## REQUIREMENTS

    - Docker
    - Git
    - NodeJS

### Choose a location to clone the project.

### Use the command in your terminal

## `git clone https://github.com/LeonardoStrechar/Backend-NodeJS-MM.git`

### Check if a folder named Backend-NodeJS-MM chosen local was created

### if everything is correct run the command in the terminal with the selected folder:

## `npm install`

### if everything goes well enter the directory, I copied the contents of the file ".env.example" create a new file named ".env" and place the content inside

## `.env.example ` -> `.env`

### Then execute the command:

## `docker-compose up`

### after docker create the container run the command for the migrations in another terminal:

## `npx prisma migrate reset`

## If everything went well, the project is running on port 3001!

## If there is an error connecting to docker

### run the command and with docker-compose running

## `docker inspect database`

### get the value of "IPAddress"

### and put it in the .env file replacing "172.18.0.3" for new ip

##### DATABASE_URL="postgresql://teste:teste@172.18.0.3:5432/project_node?schema=public"
