import Option from "../option";

export default {
    canAdd(){
        return !Option.allTaken
    }
}