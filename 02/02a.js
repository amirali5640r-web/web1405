let command = process.argv[2];
let input = process.argv.slice(3);

console.log("command is :", command);
console.log("input is : ",input);

function sum(a,b) {
    console.log("sum is : ",Number(a) + Number(b));
    
}
function minus(a,b) {
    console.log("minus is : ",Number(a) - Number(b));
    
}
function print(input) {
    
    let x = {
        name : input[0],
        email: input[1],
        age: input [2],
    }
    console.log("Object is : ",x);
    
    
}

if (command==="sum") {
    sum(input[0],input[1]);
}

else if (command==="minus") {
    minus(input[0],input[1]);
}

else if (command==="print") {
    print(input);
}

else   {
    console.log("Not found");

}