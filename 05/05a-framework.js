import { createServer } from 'node:http';

function framework() {
    let controllers = [];

    let app = {
        get: function (path, func) {
            controllers.push({ name: path, func: func });
        },
        listen: function (port, userCallback) {
            function serverCallback(request, response) {
                console.log("------------------------");
                console.log("url", request.url);

                let data = "";

                let tooLarge = false;

                request.on("data", function (part) {
                    data += part;
                    if (data.length > 1e6) { // 1MB
                        tooLarge = true;
                        request.destroy();
                    }
                });

                request.on("end", function () {
                    if (tooLarge) {
                        response.writeHead(413);
                        return response.end("Payload Too Large");
                    }

                    let parsed = data;
                    if ((request.headers['content-type'] || '').includes('application/json')) {
                        try { parsed = JSON.parse(data); }
                        catch { 
                            response.writeHead(400);
                            return response.end("Invalid JSON");
                        }
                    }

                    request.data = parsed;
                    request.test = 'ali';

                    console.log("data", data);

                    let found = false;
                    for (let item of controllers) {
                        if (request.url.startsWith('/' + item.name)) {
                            found = true;
                            item.func(request, response);
                            break;
                        }
                    }

                    if (!found) {
                        console.log("path not found.");
                        response.writeHead(404);
                        response.end("Not Found");
                    }
                });
            }

            let server = createServer(serverCallback);
            server.listen(port, userCallback);
        }
    };

    return app;
}

export { framework };
