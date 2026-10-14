let command = process.argv[2];
let input = process.argv.slice(3);

console.log("command is :", command);
console.log("inputs are : ", input);

let controllers = [
    {
        name: "sum",
        func: function (input) {
            console.log("sum is : ", Number(input[0]) + Number(input[1]));
        }
    },
    {
        name: "minus",
        func: function (input) {
            console.log("minus is : ", Number(input[0]) - Number(input[1]));
        }
    },
    {
        name: "print",
        func: function (input) {
            let x = {
                name: input[0],
                email: input[1],
                age: input[2]
            };
            console.log("Object is :", x);
        }
    }
];

for (let i = 0; i < controllers.length; i++) {
    if (controllers[i].name === command) {
        controllers[i].func(input);
    }
}


