# Museum Visitors API

## Data:
Example of a museum list data JSON object:
```
Call api https://data.lacity.org/resource/trxm-jn3c.json

```

## Project Specifications:
The model implementation is not available.

The task is to create an API to fetch visitors, total visitors for a museum, with given filters of date (mandatory) and a museum to ignore(optional):

- GET request to `/visitors`:
    - converts the timestamp to month and year
    - calls the API to fetch JSON.
    - iterates till the year and month is matched with the given JSON.
    - if no data is matched, returns data doesn't exist.
    - on matched - checks if the museum needs to be ignored
    - if ignored - sends highest, lowest and total visitors excluding the ignored museum.
    - if not - sends highest, lowest and total visitors.
    - returns 200 for successful response, 500 for error.


## Environment 
- Node Version: v12 (LTS)
- Default Port: 3000

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
