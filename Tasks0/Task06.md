```mermaid
sequenceDiagram
	participant browser
	participant server
	
	Note right of browser: User makes a note and presses save button

	browser->>server: sends AJAX POST request to the server https://studies.cs.helsinki.fi/exampleapp/spa
   	activate server
	Note left of server: Server saves the note in the server and responses
	server-->>browser: response 201 Created
    	deactivate server
    
	Note right of browser: Browser updates the UI, after receiving the response from server