import Choosy from "./choosy";

declare global {
    interface Window {
        choosy: Choosy;
    }
}

if (!window.choosy) {
    window.choosy = new Choosy()
}