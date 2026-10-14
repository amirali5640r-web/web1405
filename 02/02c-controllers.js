let controllers = [
    {
        name: "sum",
        func: function (input){
            console.log("sum is:", Number(input[0]) + Number(input[1]));
        }
    },
    {
        name: "minus",
        func: function (input){
            console.log("minus is:", Number(input[0]) - Number(input[1]));
        }
    },
    {
        name: "print",
        func: function (input){
            let info = {
                "name": input[0],
                "email": input[1],
                "age": Number(input[2])
            }
            console.log("info is:", info);
        }
    },
]

export {controllers};