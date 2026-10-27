import { createServer } from "http"
import { writeFile } from 'node:fs';

const port = 5050;


const contorllist = [
    {
        name: "sum",
        func: (req, res) => {
            let url = req.url
            let numbers = url.split("/")
            let todo = numbers[1]
            let number1 = Number(numbers[2]);
            let number2 = Number(numbers[3]);
            res.write(`${number1 + number2}`)
        }
    },
    {
        name: "minus",
        func: (req, res) => {
            let url = req.url
            let numbers = url.split("/")
            let todo = numbers[1]
            let number1 = Number(numbers[2]);
            let number2 = Number(numbers[3]);
            res.write(`${number1 - number2}`)
        }
    },

    {
        name: "createFile",
        func: (req, res) => {
            let url = req.url
            let numbers = url.split("/")
            let todo = numbers[1]



            writeFile(numbers[2], numbers[3], 'utf8', () => {
                console.log("done");

            });



            res.write(`done`)
        }
    }
]

const serverCallBack = (req, res) => {
    console.log("----------------");
    let url = req.url

    res.writeHead(200);


    for (let contorl of contorllist) {
        if (url.startsWith("/" + contorl.name)) {
            contorl.func(req, res)
            break;
        }
    }

    res.end()


}
const server = createServer(serverCallBack);
server.listen(port);
