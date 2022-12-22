![Choosy](art/banner.png)

# Choosy

A lightweight vanilla-js choice-picker written in typescript.

# Installation

```
npm i @michael-brauner/choosy
yarn add @michael-brauner/choosy
```

# Setup

```javascript
import Choosy from "@michael-brauner/choosy";

new Choosy(document.getElementById("cars"));
```

```html
<select name="cars" id="cars" multiple>
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
</select>
```

> Be aware that Choosy automaticly restricts the input limit to `1` as soon as the `multiple` attribute is not set onto the `select` element.

# Contributing

Since Choosy is an open-source project you are very welcome to contribute by sending a PR.

## Testing

Choosy uses [Cypress](https://www.cypress.io/) for testing.  
So you are able to start the testsuite with this command: 

```shell
yarn tests 
```

If you want to use the cypress client to debug your tests in a real browser, you have to start the `http-server` first then you can open the cypress-suite:

```shell
yarn http-server -c-1 &
yarn cypress open
```

You can actually use the `test.sh` script for testing: 

```shell
sh test
```

Don't forget to stop the server after you are done: 

```shell
CTRL + c # to stop the cypress suite
fg # to bring the http-server in the foreground
CTRL + c # stop the http-server
```
