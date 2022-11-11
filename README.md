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