# Hogwarts
Hogwarts is a school of magic for Witchcraft and Wizardry

## Technologies
- Node 9
- Express 4
- JWT
- Passport

## Architecture
Hogwarts was designed following the **Hexagonal Architecture** principles (also called **Port-Adapters Architecture**).

This type of architecture allows your application to become framework agnostic and your business logic is independent from any external agency that your application may use.
Your business logic is only made of **pure functions** (with plain Javascript) and it becomes easily testable.
Each dependencies is then injected through **ports** (http server, database I/O, auth middleware, etc.)

For more information about Hexagonal Architecture, check out [this website](http://www.google.com)

## JWT
Hogwarts uses JWT as authentication system:

1. When the user log himself into the system, the API returns an JWT token.
2. This token must be saved locally (e.g in the local storage, or wherever you want)
3. Whenever a request wants to access a private resource, it must include the JWT token in the header of the request
```
Authorization: JWT <token>
```
      
## Usage
**App config**
```
const appConfig = {
    // The root path for the generated API
    root_path: '/api/v2',
    
    // The port on which the API will listen
    port: 8080,
    
    // Database infos
    database: {
        // Required
        host: 'localhost',
        port: 27017,
        
        // Optional
        username: 'albus',
        password: 'SherbetLemon',
        database: 'hogwart',
        options: {}
    },
    
    // Secret token for JWT
    jwt_secret: 'shhhhhhh'
}
```

The order in which you declare your middlewares is the same in which they will get passed through
