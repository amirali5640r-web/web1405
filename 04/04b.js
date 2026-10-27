import { createServer } from "http"
import { error } from "node:console";
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



            writeFile(numbers[2], numbers[3], 'utf8', (err) => {


                if (err) {
                    console.log("error");
                    res.writeHead(500);
                    res.write(`error`)
                    res.end()
                } else {

                    res.writeHead(200);
                    res.write(`done`)
                    res.end()
                }
            });



        }
    }
]

const serverCallBack = (req, res) => {
    console.log("----------------");
    let url = req.url




    for (let contorl of contorllist) {
        if (url.startsWith("/" + contorl.name)) {
            contorl.func(req, res)
            break;
        }
    }

  


}
const server = createServer(serverCallBack);
server.listen(port);
