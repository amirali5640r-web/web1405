import { createServer } from 'node:http';

function framework() {
    let controllers = [];

    let app = {
        get: function (path, func) {
            controllers.push({
                method: 'GET',
                name: path,
                func: func
            });
        },

        POST: function (path, func) {
            controllers.push({
                method: 'POST',
                name: path,
                func: func
            });
        },

        PUT: function (path, func) {
            controllers.push({
                method: 'PUT',
                name: path,
                func: func
            });
        },

        delete: function (path, func) {
            controllers.push({
                method: 'DELETE',
                name: path,
                func: func
            });
        },

        listen: function (port, userCallback) {

            function serverCallback(request, response) {

                console.log("---------------------------------------------");
                console.log("(framework) url: ", request.url);

                let data = "";

                request.on("data", function (part) {
                    data += part;
                });

                request.on("end", function () {

                    console.log("(framework) data:", data);

                    try {
                        request.data = data ? JSON.parse(data) : {};
                    } catch (e) {
                        request.data = data;
                    }

                    request.myKey = 'salam!';

                    let found = false;

                    let pathname = new URL(request.url, 'http://localhost').pathname;
                    let route = pathname.split('/')[1];
                    let method = request.method.toUpperCase();

                    for (let item of controllers) {

                        if (route === item.name && method === item.method) {

                            console.log("(framework) controller: ", item.name);

                            found = true;
                            item.func(request, response);
                            break;
                        }
                    }

                    if (!found) {
                        console.log("path not found.");

                        response.writeHead(404);
                        response.end("404 - path not found");
                    }
                });
            }

            let server = createServer(serverCallback);
            server.listen(port, userCallback);
        }
    };

    return app;
}

export {
    framework
};
