import fs from "fs";
import readline from "readline";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
console.log("hello");
wss.on("connection", function connection(ws) {
  console.log("Client connected");

  const sendLogLines = () => {
    let lineCount = 0;
    const linesToSend = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(
        "/Users/kathykhong/log-viewer-poc/client/src/admin-api.log"
      ),
      crlfDelay: Infinity,
    });

    rl.on("line", (line) => {
      if (lineCount >= 10) {
        rl.close();
      } else {
        linesToSend.push(line);
        lineCount++;
      }
    });

    rl.on("close", () => {
      if (linesToSend.length > 0) {
        ws.send(linesToSend.join("\n"));
      }
    });
  };

  const interval = setInterval(sendLogLines, 1000);

  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});
