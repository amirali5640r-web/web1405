import { framework } from './05b-framework.js';
import { writeFile, readFile, unlink, rmdir } from 'node:fs';

const app = framework();
const port = 3000;

app.get('sum', function(request, response){
    let items = request.url.split("/");

    response.writeHead(200);
    response.write((Number(items[2]) + Number(items[3])).toString());
    response.end();
});

app.get('createFile', function(request, response){
    let items = request.url.split("/");

    writeFile(items[2], items[3], function(error){
        if(error){
            console.log('error', error);

            response.writeHead(500);
            response.write("createFile error");
            response.end();
        }
        else{
            console.log(3);
            console.log("createFile done");

            response.writeHead(200);
            response.write("createFile done");
            response.end();

            console.log(4);
        }
    });
});

app.get('readFile', function(request, response){
    let items = request.url.split("/");

    readFile(items[2], function(error, body){
        if(error){
            response.writeHead(500);
            response.write("readFile error");
            response.end();
        }
        else{
            console.log("readFile done");

            response.writeHead(200);
            response.write(body);
            response.end();
        }
    });
});

app.get('deleteFile', function(request, response){
    let items = request.url.split("/");

    unlink(items[2], function(error){
        if(error){
            console.log("deleteFile error", error);

            response.writeHead(500);
            response.write("deleteFile error");
            response.end();
        }
        else{
            console.log("deleteFile done");

            response.writeHead(200);
            response.write("deleteFile done");
            response.end();
        }
    });
});

app.get('delete', function(request, response){
    let items = request.url.split("/");

    unlink(items[2], function(error){
        if(error){
            console.log("deleteFile error", error);

            if(error.code === 'EPERM'){
                rmdir(items[2], function(error){
                    if(error){
                        console.log("delete error", error);

                        response.writeHead(500);
                        response.write("delete error");
                        response.end();
                    }
                    else{
                        console.log("delete done (folder)");

                        response.writeHead(200);
                        response.write("delete done");
                        response.end();
                    }
                });
            }
            else{
                response.writeHead(500);
                response.write("delete error");
                response.end();
            }
        }
        else{
            console.log("delete done (file)");

            response.writeHead(200);
            response.write("delete done");
            response.end();
        }
    });
});

app.get('signup', function(request, response){
    let items = request.url.split("/");

    readFile('db.json', function(error, fileData){
        if(error){
            console.log("error reading db.json", error);

            response.writeHead(500);
            response.write("error reading db.json");
            response.end();
        }
        else{

            fileData = fileData.toString();
            fileData = JSON.parse(fileData);

            let userId = Math.floor(10000000 + Math.random() * 90000000);

            request.data.id = userId;

            fileData.data.push(request.data);

            let newData = JSON.stringify(fileData);

            console.log('newData', newData);

            writeFile('db.json', newData, function(error){
                if(error){
                    console.log("error writing db.json", error);

                    response.writeHead(500);
                    response.write("signup error");
                    response.end();
                }
                else{
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
app.get('getuser', function(request, response){
    let items = request.url.split("/");
    let userId = Number(items[2]);

    readFile('db.json', function(error, fileData){
        if(error){
            console.log("error reading db.json", error);

            response.writeHead(500);
            response.write("getuser error");
            response.end();
        }
        else{
            fileData = JSON.parse(fileData.toString());

            let user = fileData.data.find(function(item){
                return item.id === userId;
            });

            if(user){
                response.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                response.write(JSON.stringify(user));
                response.end();
            }
            else{
                response.writeHead(404);
                response.write("user not found");
                response.end();
            }
        }
    });
});

app.listen(port, function(){
    console.log('app listening on port: ', port);
});
