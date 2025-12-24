sequenceDiagram
participant browser
participant server

    Note right of browser: The user types a note and clicks "Save"
    Note right of browser: JavaScript handles the form submit and adds the new note to the list locally

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: The server saves the note and sends a success message
    server-->>browser: HTTP status code 201 (Created)
    deactivate server

    Note right of browser: The browser remains on the same page and does not reload
