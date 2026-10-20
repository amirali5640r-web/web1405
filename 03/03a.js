import {createServer} from "http"

function servercb(){
    console.log("----------------");
}
let server = createServer(servercb);
server.listen(5050);
