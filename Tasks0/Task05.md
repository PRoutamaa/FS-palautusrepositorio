```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document and JS file
    deactivate server

    Note right of browser: The browser executes JS file and renders UI dynamically
