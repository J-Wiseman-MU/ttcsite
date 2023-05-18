Demo Link:https://www.youtube.com/watch?v=pV6b8nx77b4
Database Structure:
This website requires that you have a mySQL installed and a database called ttcbase with the following structure created.
ttcbase
	TABLE users
		ROWS username(VARCHAR(64)), password(VARCHAR(64)
	TABLE games 
		ROWS user(VARCHAR(64),num(int),c0(int),c1(int),c2(int),c3(int),c4(int),c5(int),c6(int),c7(int),c8(int),gameName(VARCHAR(64),gamescol(int)
This application is a website that allows users to create an account, log in, and then play and save games of tic-tac-toe. User login information is stored on a database
alongside saved game data. The frontend is composed of four components: Login.jsx, CreateAccount.jsx, Lobby.jsx, and Game.jsx. These components are rendered out through
the index.html file locaited in /frontend/public. In addition to those components, the frontend utilizes seven helper functions locaited in /frontend/src.
Login.jsx:
This component displays a basic login page comprised of a username field, a password field, a submit button, and a link to CreateAccount.jsx. When the submit button is 
clicked, the contents of both fields are checked to see if they contain any non alphanumeric characters. If they do, both fields clear, otherwise, they are sent as 
parameters to the authenticate function in auth.js. That function returns a true/false value based on an axios post to http://localhost:8000/users/login that sends
the username and password to the post with that link in the backend. From there, that post sends the username and password to a backend function login. Login returns a 
promise. That promise first makes an sql query, fetching all rows in the ttcbase.users table where the users column is equal to username. If the query fails in an error,
the promise is rejected and the error is returned to the post function. If the query finds no matches, the promise is resolved as false. If the query returns a row, then
a bcrypt.compare is run on the password parameter and the password field of the returned row. The promise is resolved with the value of that bcrypt.compare. After 
the login function has resolved, the post funciton returns the value that the login funciton passed back to authenticate in the frontend. That value is then passed back
to the Login.jsx component. If it is true, the user state of App.js is set to the contents of the username field and the app navigates to /lobby, which is the route for
Lobby.jsx. The link at the bottom of the page navigates the app to /createaccount, which is the route for Lobby.jsx.
CreateAccount.jsx:
This component displays a basic account creation page with a username field, a password field, and a submit button. When clicked, the submit button first checks both 
username and password for any non-alphanumeric characters, if any are found, both fields are cleared. If none are found ,username and password are sent to the create 
funtion in create.js. That function makes an axios POST to http://localhost:8000/users/create, sending username and password in the req body. When the post receives the
request, it sends the username and password received to a function called create, which returns a promise. The promise first queris ttcbase.users for all user rows where
username = the sent username. If the query fails in an error, the promise is rejected and the error is sent back. If the query returns any rows, the promise is resolved
as false, otherwise, the promise attempts to insert a new row into the table where the values of the username and password columns are equal to the username and password
parameters. If there is an error inserting, the promise resolves as false, otherwise the promise resolves as true. The post function then returns the value of the 
resolved promise to create, which then sends that value back to the CreateAccount.jsx component. If that value is true, the app navigates to /, which is the route for
Login.jsx, otherwise, it clears both fields.
Lobby.jsx:
This component displays all of the games in ttcbase.games where user = the user set by Login.jsx. Each of the games is displayed with a button that allows the user to
resume that game, which is done by setting the G state of App.js to a json object that represents the board of that game and then navigating to /game, the route for the
Game.jsx component. This component receives the user state from App.js as name. Before the rendering logic is resolved, a useEffect is used to set the state of rows, 
which is an array of json objects that represent tic-tac-toe games. The useEffect calls the funciton games, imported from games.js, sending name as a parameter. The 
games function makes an axios post call to http://localhost:8000/api/games, sending name. The post funciton on the server.js backend sends the passed name to a function
called findGames. findGames returns a promise. That promise attempts to select all games where the user key is equal to the user value passed to findgames from the games
table of ttcbase. If the selection ends in an error, the promise is rejected, otherwise, the results of the query are sent with the resolution of the promise. The post
funciton then sends the array returned by the promise back to the games funciton. The games funciton then returns that result back to the Lobby.jsx component, which uses
the array of games to render out all of the games. At the bottom of the page, there is a New Game, and Logout button. The New Game button uses the setGame function sent
to this component to set the G property of App.js to a json objec that represents a new game, and then navigates to /game, the route for the Game.jsx component. If 
the Logout button is clicked, the user state of App.js is set to '' using the setN function sent to this component, and then the app navigates to /, the route for 
Login.jsx.
Game.jsx:
This component is used for the actual playing of the game. It receives game, which is always a one of the json objects that represents the state of the tic-tac-toe game.
It uses the game object to render out the state of the board and set which player's turn it is. checkWin checks the board after any given move and outputs a win message
whenever a player wins. Each square of the tic-tac-toe board has a button with an on click handler that recieves the index of the clicked button and uses that to update
the game state accordingly. At the bottom of the component, there is a text field, a button labeled Save, and a button labeled quit. When the save button is clicked,
the name of the user, player whose turn it is, boardstate of the game, and contents of the text field are put into an array and passed to the save funciton imported from
save.js. The save funciton posts the game object to http://localhost:8000/api/save. The post function at that link then sends the received game object to the saveGame
function. That funciton inserts a row into the games table of the ttcbase using the contents of the array. The Quit button navigates the app to /lobby.