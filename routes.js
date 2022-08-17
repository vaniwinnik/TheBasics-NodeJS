const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Hello</title><head>');
        res.write(
        '<body><p>Hello World!</p></body>'
        );
        res.write(
        '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
        );
        res.write('</html>');
        return res.end();
    }
    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>Users</title><head>');
        res.write(
        '<body><ul><li>User1</li><br><li>User2</li><br><li>User3</li></ul></body>'
        );
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
        });
        return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const username = parsedBody.split('=')[1];
        console.log(username);
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports.handler = requestHandler;