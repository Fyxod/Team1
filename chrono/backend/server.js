const http = require("http");//1
const app = require("./main");
const { PORT } = require("./config/config");//2

const server = http.createServer(app);//3
server.listen(PORT, () => console.log("Server running on port 5000"));
