const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 2434;

const DATA_DIRECTORY = path.join(__dirname, '../data');
const PUBLIC_DIRECTORY = path.join(__dirname, '../public');
const IMAGE_DIRECTORY = path.join(__dirname, '../public/images');

function getHTML(filename) {
    const htmlFile = path.join(PUBLIC_DIRECTORY, filename)

    return fs.readFileSync(htmlFile, 'utf8');
}

function getImage(filename) {
    const imgFile = path.join(IMAGE_DIRECTORY, filename)
    return fs.readFileSync(imgFile, 'utf8');

}

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;

    // __dirname will resolve to the directory the executing script resides in.
    // So if your script resides in /home/sites/app.js, __dirname will resolve
    // to /home/sites.

    console.log(__dirname + path);

    fs.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        }
        else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}


function onRequest(req, res) {
    switch (req.url) {
        case "/":
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end(getHTML("index.html"));
            break;

        case "/data/cars.json":
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.end(fs.readFileSync(path.join(DATA_DIRECTORY, '/cars.json')), 'binary');
            break;

        case "/scripts/car.js":
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.end(fs.readFileSync(path.join(PUBLIC_DIRECTORY, '/scripts/car.js')), 'binary');
            break;

        case "/scripts/app.js":
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.end(fs.readFileSync(path.join(PUBLIC_DIRECTORY, '/scripts/app.js')), 'binary');
            break;

        case "/scripts/car_helper.js":
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.end(fs.readFileSync(path.join(PUBLIC_DIRECTORY, '/scripts/car_helper.js')), 'binary');
            break;

        case "/scripts/main.js":
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.end(fs.readFileSync(path.join(PUBLIC_DIRECTORY, '/scripts/main.js')), 'binary');
            break;

        case "/scripts/car_form.js":
            res.writeHead(200, { 'Content-Type': 'text/js' });
            res.end(fs.readFileSync(path.join(PUBLIC_DIRECTORY, '/scripts/car_form.js')), 'binary');
            break;

        case '/icon_facebook.png':
            serveStaticFile(res, '/public/img/icon_facebook.png', 'image/png');
            break;

        case '/icon_instagram.png':
            serveStaticFile(res, '/public/img/icon_instagram.png', 'image/png');
            break;

        case '/icon_twitter.png':
            serveStaticFile(res, '/public/img/icon_twitter.png', 'image/png');
            break;

        case '/icon_mail.png':
            serveStaticFile(res, '/public/img/icon_mail.png', 'image/png');
            break;

        case '/icon_twitch.png':
            serveStaticFile(res, '/public/img/icon_twitch.png', 'image/png');
            break;

        case "/ex":
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end(getHTML("index.example.html"));
            break;

        case "/cars":
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end(getHTML("cars.html"));

            break;
        default:
            res.setHeader('Content-Type', 'text/html');
            res.writeHead(200);
            res.end(getHTML("404.html"));

            break;
    }
}

const server = http.createServer(onRequest);

server.listen(PORT, () => {
    console.log(`HTTP Server running on http://localhost:${PORT}`)
})