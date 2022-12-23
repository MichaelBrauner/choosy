import Choosy from "/dist/choosy.min.js";

new Choosy(document.getElementById("cars_disabled"), {
    enabled: false
});

new Choosy(document.getElementById("cars_limited_2"), {
    limit: 2
})