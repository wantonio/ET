var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    cls = require('cli-color'),
    blacklist = [/dev1/mgi, /dev3/mgi, /staging/mgi, /qa1/mgi, /content.solarwinds.com\/creative\/images/mgi, /web.swcdn.net\/creative\/images/mgi];

http.createServer(function(request, response) {
    console.log(cls.greenBright('Request Starting...'));
    var filePath = '.' + request.url;
    if (filePath == './') filePath = './index.html';
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
    }
    path.exists(filePath, function(exists) {
        if (exists) {
            if (path.extname(filePath) == '.html') {
                fs.readFile(filePath, 'utf-8', function(error, data) {
                    for (var i = blacklist.length - 1; i >= 0; i--) {
                        var info = data.match(blacklist[i]);
                        var statement = "was";
                        if (info) {
                            statement = (info.length <= 1) ? 'There was found ' + info.length + ' reference to ' : 'There were found ' + info.length + ' references to ';
                            console.log(cls.redBright(statement) + cls.yellowBright(blacklist[i].source) + cls.redBright(' in ') + cls.yellowBright(filePath));
							
                        }
                    };
                    if (!process.argv[2]) {
                        data = data.replace(/<%= RootCreativeImagePath %>/mgi, 'http://dev1.content.solarwinds.com/creative/images/');
                        data = data.replace(/<%=RootCreativeImagePath %>/mgi, 'http://dev1.content.solarwinds.com/creative/images/');
                    }

                    data = data.replace(/<%=RootJsPath%>/mgi, 'http://web.swcdn.net/web/js/');
                    data =  '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n<html>\n<head>\n<title>Page Title</title>\n <meta charset="UTF-8">\n <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n <meta http-equiv="content-language" content="en-us"/> \n </head>\n<body>\n' +
                            '<link rel="stylesheet" type="text/css" href="http://web.swcdn.net/web/css/master.min.css"> ' +
                            '\n <script src="http://web.swcdn.net/web/js/jQuery/jquery-1.6.4.min.js"></script> \n' +
                            data + '<div class="wrapperFooter" style="text-align:center"> <img src="resources/bg-footer.png" height="510" width="1" alt=""> </div>' +
                            '</body>\n</html>';
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.end(data, 'utf-8');
                });
            } else {
                fs.readFile(filePath, function(error, content) {
                    if (error) {
                        response.writeHead(500);
                        response.end();
                    } else {
                        response.writeHead(200, {
                            'Content-Type': contentType
                        });
                        response.end(content, 'utf-8');
                    }
                });
            }
        } else {
            response.writeHead(404);
            response.end(cls.redBright('File not found'));
        }
    });
}).listen(800);
console.log(cls.cyanBright('Server running at http://localhost/'));
