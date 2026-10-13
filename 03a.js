let command = process.argv[2];
let input = process.argv.slice(3);

console.log("------------------------");
console.log("command is:", command);
console.log("inputs are:", input);

let controlers = [
    {
        name:"sum",
        func:function sum(input){
         console.log("sum is:", Number(input[0]) + Number(input[1]))
}
    },
    {
        name:"minus",
        func:function minus(input){
            console.log("sum is:", Number(input[0]) - Number(input[1]))
        }
    },
    {
        name:"print",
        func:function (input){
            let x={
                name:input[0],
                email:input[1],
                age:input[2]
            }
            console.log("object is: ",x);
        }
    }
]

let found = false;
for(let i=0;i<controlers.length;i++){
if(controlers[i].name === command){
    found=true;
    controlers[i].func(input);
    break;
}
}
if(!found){
    console.log("command not fnd.")
}
