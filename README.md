# RandomPicker Project

A Mini RandomPicker Project built with vite.
This Project Generates a random student that will have an assigned subject and the date of his assigned subject with the possibily to export to a csv file.


## Features
- Adding Students to a list.
- Export to csv file.
- Possibilty to reset the date and subject from the list (reset button).

## Getting started

# Install JSON Server
- npm install -g json-server
# Start Vite Server
- npm run dev
# Start JSON Server
- json-server --watch db.json

## Routes List:

### Elements

| Method     | URI                               | Details  
|------------|-----------------------------------|------------------------------------------|
| `POST`     | `elements`                        | `Add an element/student`                 |
| `GET`      | `elements`                        | `Get All an elements/students`           |
| `PUT`      | `elements/{element.id}`           | `Update a specific element/student`      |
