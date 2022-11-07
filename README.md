![Choosy](art/banner.png)

# Choosy

A standalone select widget written in vanilla javascript.

# Installation

```
npm i @michael-brauner/choosy
yarn add @michael-brauner/choosy
```

# Setup

```html
<select name="cars" id="cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
</select>
```

```javascript
import Choosy from "@michael-brauner/choosy";

new Choosy(document.getElementById("cars"));
```