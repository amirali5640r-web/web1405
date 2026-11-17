import {
    framework
} from './07a-framework.js';
import {
    writeFile,
    readFile,
    unlink,
    rmdir
} from 'node:fs';

const app = framework();
const port = 3000;

app.get('sum', function (request, response) {

    let items = request.url.split("/");

    let num1 = Number(items[2]);
    let num2 = Number(items[3]);

    response.writeHead(200);
    response.write((num1 + num2).toString());
    response.end();

});

app.get('createFile', function (request, response) {

    let items = request.url.split("/");

    writeFile(items[2], items[3], function (error) {

        if (error) {
            console.log('error', error);

            response.writeHead(500);
            response.write("createFile error");
            response.end();
        } else {
            console.log("createFile done");

            response.writeHead(200);
            response.write("createFile done");
            response.end();
        }
    });

});

app.get('readFile', function (request, response) {

    let items = request.url.split("/");

    readFile(items[2], function (error, body) {

        if (error) {
            response.writeHead(500);
            response.write("readFile error");
            response.end();
        } else {
            console.log("readFile done");

            response.writeHead(200);
            response.write(body);
            response.end();
        }
    });

});

app.get('deleteFile', function (request, response) {

    let items = request.url.split("/");

    unlink(items[2], function (error) {

        if (error) {
            console.log("deleteFile error", error);

            response.writeHead(500);
            response.write("deleteFile error");
            response.end();
        } else {
            console.log("deleteFile done");

            response.writeHead(200);
            response.write("deleteFile done");
            response.end();
        }
    });

});

app.get('delete', function (request, response) {

    let items = request.url.split("/");


    unlink(items[2], function (error) {

        if (error) {

            console.log("deleteFile error", error);

            if (error.code === 'EPERM' || error.code === 'EISDIR') {

                rmdir(items[2], function (error) {

                    if (error) {
                        console.log("delete error", error);

                        response.writeHead(500);
                        response.write("delete error");
                        response.end();
                    } else {
                        console.log("delete done (folder)");

                        response.writeHead(200);
                        response.write("delete done");
                        response.end();
                    }
                });
            } else {
                response.writeHead(500);
                response.write("delete error");
                response.end();
            }
        } else {
            console.log("delete done (file)");

            response.writeHead(200);
            response.write("delete done");
            response.end();
        }
    });

});

app.POST('user', function (request, response) {

    let [email, password, name] = [
        request.headers.email,
        request.headers.password,
        request.headers.name
    ];


    if (!email || !password) {
        response.writeHead(400);
        response.end("email and password are required");
        return;
    }

    readFile('db.json', function (error, fileData) {

        if (error) {
            console.log("error reading db.json", error);

            response.writeHead(500);
            response.write("error reading db.json");
            response.end();
        } else {

            fileData = JSON.parse(fileData.toString());

            let userId = Math.floor(10000000 + Math.random() * 90000000);

            request.data.id = userId;
            request.data.name = name;
            request.data.email = email;
            request.data.type = 'user';
            request.data.password = password;

            console.log("signup done", request.data);
            fileData.data.push(request.data);
            let newData = JSON.stringify(fileData);

            writeFile('db.json', newData, function (error) {

                if (error) {
                    console.log("error writing db.json", error);

                    response.writeHead(500);
                    response.write("signup error");
                    response.end();
                } else {
                    console.log("signup done");
                    console.log("user ID:", userId);

                    response.writeHead(200);
                    response.write("signup done");
                    response.end();
                }
            });
        }
    });

});

app.get('user', function (request, response) {

    let items = request.url.split("/");
    let userId = Number(items[2]);

    readFile('db.json', function (error, fileData) {

        if (error) {
            console.log("error reading db.json", error);

            response.writeHead(500);
            response.write("getuser error");
            response.end();
        } else {

            fileData = JSON.parse(fileData.toString());

            let user = fileData.data.find(function (item) {
                return item.id === userId;
            });

            if (user) {
                response.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                response.write(JSON.stringify(user));
                response.end();
            } else {
                response.writeHead(404);
                response.write("user not found");
                response.end();
            }
        }
    });

});


app.delete('user', function (request, response) {

    let items = request.url.split("/");
    let userId = Number(items[2]);
    const adminID = 85751504;

    let [user, pass] = [request.headers.email, request.headers.password];
    console.log("user and pass", user, pass);

    readFile('db.json', function (error, fileData) {

        if (error) {
            response.writeHead(500);
            response.end("removeuser error");
            return;
        }

        fileData = JSON.parse(fileData.toString());

        let found = false;

        for (let x of fileData.data) {

            if (
                x.email === user &&
                x.paassword === pass &&
                x.type === 'admin'
            ) {
                found = true;
                break;
            }
        }

        if (!found) {

            console.log("invalid user and/or pass", user, pass);

            response.writeHead(403);
            response.end("invalid user or pass");
            return;

        }

        let userIndex = fileData.data.findIndex(function (item) {
            return item.id === userId;
        });

        if (userIndex !== -1 && userId !== adminID) {

            fileData.data.splice(userIndex, 1);

            let newData = JSON.stringify(fileData);

            writeFile('db.json', newData, function (error) {

                if (error) {
                    response.writeHead(500);
                    response.end("removeuser error");
                } else {
                    response.writeHead(200);
                    response.end("removeuser done");
                }

            });

        } else {
            response.writeHead(404);
            response.end("user not found");
        }

    });

});


app.PUT('user', function (request, response) {

    let userId = Number(request.headers.id);

    readFile('db.json', function (error, fileData) {

        if (error) {
            console.log("error reading db.json", error);

            response.writeHead(500);
            response.write("updateuser error");
            response.end();
        } else {

            fileData = JSON.parse(fileData.toString());
            const admin = fileData.data.find(function (item) {
                return item.type === 'admin';
            });
            let user = fileData.data.find(function (item) {
                return item.id === userId;
            });

            if (user && userId !== admin.id) {

                Object.assign(user, request.data);

                user.id = userId;

                let newData = JSON.stringify(fileData);

                writeFile('db.json', newData, function (error) {

                    if (error) {
                        console.log("error writing db.json", error);

                        response.writeHead(500);
                        response.write("updateuser error");
                        response.end();
                    } else {
                        console.log("updateuser done");

                        response.writeHead(200);
                        response.write("updateuser done");
                        response.end();
                    }
                });
            } else {
                response.writeHead(404);
                response.write("user not found");
                response.end();
            }
        }
    });

});

app.listen(port, function () {
    console.log('app listening on port: ', port);
});
