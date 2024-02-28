# Vincent Baheux - Fulll Backend Project

This document contains the instructions to run the project, with the answers to the Step 3 section of the instructions.

## Project documentation
### Setup
Run `yarn init-db` to init the MySQL database (make sure your docker engine is up).

### Testing

To run the Cucumber.js test suite, run `yarn test`.
> Calls to the MySQL database are currently mocked by a different implementation of the repositories.

### Running the app
You can use the following commands in the current directory:
```
./fleet create <userId> # returns fleetId on the standard output
./fleet register-vehicle <fleetId> <vehiclePlateNumber>
./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
```
> **Note:** the current fleet command was configured on MacOS.
> You may need to change the first line of the file depending on your bash/zsh path, or directly run `ts-node ./src/index.ts $@` instead of ./fleet .

You can run `./fleet -h` or `./fleet <command> -h` if needed.

The database is initialised with these following users, you can use their uuids with `./fleet create <userId>`:

| uuid | username |
|---|---|
| 8e07aad4-fb2f-4067-a66f-3cdb54224214 | User 1 |
| 77cc3b61-b366-4d6b-9c77-8a72a0bbe09d | User 2 |

### Further information
#### Other commands
- `yarn build`: compile the TypeScript code to JavaScript in the `dist` folder.
- `yarn lint`: lint the project's code with eslint.

#### Dependencies
- The in-app database connection is provided by the **mysql2** package.
- The CLI is provided by Commander.js.

## Step 3 - Answers
### Code quality tools
I have set up `eslint` and `prettier` in this project as dev dependencies, along with their configuration files.

I used this configuration with my IDE (WebStorm, but VSCode supports it as well) to prettify the code on each file save.

### CI/CD Process
We can configure the Git remote repository (with Github, Gitlab or Bitbucket) to automatically run a pipeline when modifications are merged onto a branch (for instance, `main` for production and `develop` for UAT).

For the Git repository: it is recommanded to use distinct branches forked from `develop` for each feature / fix. We can also use the conventional commit syntax when commiting / merging on the repository.

The pipeline could run as follows:
* `yarn lint`
* `yarn build`
* `yarn test`
* If all of the above succeeded: a `deploy` command to deploy the current version in the target environment.

We can deploy running instances on Docker containers, to make sure the configuration is equivalent.
In order to set up the infrastructure, inject environment variables and configure our project's network, we could use an infra-as-code solution such as Terraform.

About environment variables: in this project, the local database access codes are currently pushed alongside the code in a .env file. Bad practise! But in a real-life situation, we can imagine the environment variables are injected during deployment. 

>For instance: when using AWS, these variables can be stored in the Key Management Service.

### Possible improvements
In its current state, we could implement the following features for this app :
- An authentication system using Oauth2 / JWT (to manage user access and roles)
- An interface to read user / fleet / vehicle information (the current CLI is focused on the update flow of the CQRS architecture)
- A REST/GraphQL API to interact with our data
- Unit testing (with Jest for instance?)
- A better dependency injection system for instantiating services / repositories used by the app (using TypeDI for instance)
