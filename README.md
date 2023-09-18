(Only tested this way)

Brave Browser (Mozzila not working properly)

Server and App 1 2 3 run on the CLI.
Login App needs to run with Live Server Extension on VSCode.


Server Folder Commands :

-> node server.js (PORT 5000)


App 1 2 3 Folder Commands :

App1:

-> python -m http.server --bind 127.0.0.1 1000

App2:

-> python -m http.server --bind 127.0.0.1 2000

App3:

-> python -m http.server --bind 127.0.0.1 3000


Login app credentials:
(PORT 8000)
email: user1@example.com ; user2@example.com ... (10 users)
pw: 123
