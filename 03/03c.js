import { createServer } from "http"

const servercb = (req, res) => {
    console.log("----------------");

    let url = req.url
    let numbers = url.split("/")

    let number1 = Number(numbers[1]);
    let number2 = Number(numbers[2]);
    console.log(numbers);

    res.writeHead("200")
    res.write(`${number1 + number2}`)
    res.end()


}
let server = createServer(servercb);
server.listen(5050);
