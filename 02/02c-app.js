import { controllers } from "./02c-controllers.js";

let command = process.argv[2];
let input = process.argv.slice(3);

let found = false;

for(let i=0; i < controllers.length; i++){
    if(controllers[i].name === command){
        controllers[i].func(input);
        found = true;
        break;
    }
}
if(!found){
    console.log("command not found.");
}
