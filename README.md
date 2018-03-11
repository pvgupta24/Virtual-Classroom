
## Dependencies
* MongoDB
* NodeJS
* Angular-cli

## Usage
* Start MongoDB
* Clone the repo
* `npm install` to install API dependencies and `npm start` to start the server API's.
* Open a new terminal and navigate to the `client` directory, `npm install` to setup the Angular dependencies, and `npm start` to start the local development server which auto loads the changes in frontend.
Use the following commands if changes are not served automatically
```
sudo sysctl fs.inotify.max_user_watches=524288
sudo sysctl -p --system
```
* Open http://localhost:4200 to see the application