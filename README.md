# API for MeLi's Front End Challenge

API made to retrieve all items for a specific query or the data for a specific item ID.

## Installation

Install NPM Packages

```sh
$ npm install
```

Create a .env file by copying the contents on .env-sample. Possible environment values:

| Variable       | Description                              | Default value                 |
| -------------- | ---------------------------------------- | ----------------------------- |
| PORT           | Port on which the API should run         | 80                            |
| LOG_LEVEL      | Log level for Bunyan                     | warn                          |
| MELI_API       | Host for the MeLi's API                  | https://api.mercadolibre.com/ |
| CORS_WHITELIST | Comma delimited hostnames to enable CORS | \*                            |

Start the app

```sh
$ npm start
```
