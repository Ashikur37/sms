const express = require("express");
const app = express();
var mysql = require("mysql");

// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'ecr'
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;
var clients = [];
io.sockets.on("connection", function(socket) {
    console.log("connected");
    socket.on("storeClientInfo", function(data) {
        var clientInfo = new Object();
        clientInfo.customId = data.customId;
        clientInfo.clientId = socket.id;
        clients.push(clientInfo);
    });

    socket.on("disconnect", function(data) {
        for (var i = 0, len = clients.length; i < len; ++i) {
            var c = clients[i];

            if (c.clientId == socket.id) {
                clients.splice(i, 1);
                break;
            }
        }
    });
});
// app.get('/send', (req, res) => {

//     con.query('SELECT * from clients where id=' + req.query.id, function(error, results, fields) {
//         let data = results[0];
//         //(data.owner_name != 'null' ? data.owner_name : 'user') + "(" +
//         let msg = "Hi " + data.company_name + ", Ready to boost your business? Takwasoft has provided the exclusive  business solution to help you to grow your business including e-commerce, accounting, POS, company website, and any other website, mobile app, digital marketingt at a reasonable price. Please visit the demo here ecom.takwasoft.com. Find us on Facebook www.facebook.com/takwasoft Call us: 01940780758";
//         io.emit("send message", {
//             number: data.mobile,
//             msg: msg
//         });
//     });

//     res.send("ok")
// })
app.get("/", (req, res) => {
    res.send("ok");
});
app.get("/send-sms", (req, res) => {
    io.emit("send message", {
        number: req.mobile,
        msg: req.msg,
    });
});

server.listen(port, () => console.log("server running on port:" + port));