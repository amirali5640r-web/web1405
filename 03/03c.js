import { createServer } from "http"

const servercb = (req, res) => {
    console.log("----------------");

    let url = req.url
    let numbers = url.split("/")
    let todo = numbers[1]
    let number1 = Number(numbers[2]);
    let number2 = Number(numbers[3]);
    console.log(numbers);

    res.writeHead("200")
    if(todo=="sum"){
         res.write(`${number1 + number2}`)
    }else if (todo=="minus") {
        res.write(`${number1 - number2}`)
    } 
    
    else{
         res.write(`error`)
    }
    res.end()


}
let server = createServer(servercb);
server.listen(5050);
