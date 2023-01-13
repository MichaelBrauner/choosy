![Choosy](art/banner.png)

# Choosy

A lightweight vanilla-js choice-picker written in typescript.

- [Setup](#setup)
- [Options](#options)
  - [enabled](#enabled)
  - [limit](#limit)
- [Contributing](#contributing)
  - [Testing](#testing)

# Setup 

```
npm i @michael-brauner/choosy
yarn add @michael-brauner/choosy
```

```javascript
import Choosy from "@michael-brauner/choosy";

new Choosy(document.getElementById("cars"));
```

```html
<!-- import this inside of the `head` of your html document -->
<link rel="stylesheet" href="/dist/choosy.min.css">

<select name="cars" id="cars" multiple>
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
</select>
```

> Be aware that Choosy automatically restricts the input limit to `1` as soon as the `multiple` attribute is not set
> onto the `select` element.

# Options

Your choosy widget can be configured with some options.  
Just pass your options object as second argument into the `Choosy` constructor.

After the widget got initialized the full `Choosy` object got stored inside a `__x` variable.
This way you can access all public methods even after initialisation.

## enabled

Enable or disable your Choosy.

This causes that no input is possible anymore, the widget is locked at the current state and can't be focused anymore.
A greyed-out effect visualizes this behavior and the cursor shows `not-allowed`.

```javascript
new Choosy(document.getElementById("cars_disabled"), {
    enabled: false
});
```

It is possible to enable / disable the whole widget after initialisation:

```javascript
// enable the widget
getElementById("cars_disabled").__x.enable()

// disable the widget again
getElementById("cars_disabled").__x.disable()
```

## limit

Limits the items you can select with your `Choosy` widget.

```javascript
new Choosy(document.getElementById("cars_limited_2"), {
    limit: 2
})
```

# Contributing

Since Choosy is an open-source project you are very welcome to contribute by sending a PR.

## Testing

Choosy uses [Cypress](https://www.cypress.io/) for testing.  
So you are able to start the testsuite with this command:

```shell
yarn tests 
```

If you want to use the cypress client to debug your tests in a real browser, you have to start the `http-server` first
then you can open the cypress-suite:

```shell
yarn http-server -c-1 &
yarn cypress open
```

Actually you can use the `test` script for testing:

```shell
sh test
```

Don't forget to stop the server after you are done:

```shell
CTRL + c # to stop the cypress suite
fg # to bring the http-server in the foreground
CTRL + c # stop the http-server
```
