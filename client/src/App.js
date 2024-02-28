import { LazyLog } from "react-lazylog";
function App() {
  return (
    <div>
      <h1>Lazy Log PoC</h1>
      <LazyLog
        height={800}
        caseInsensitive
        enableSearch
        extraLines={100}
        url='ws://localhost:8080'
        follow
        highlight={[400, 425]}
        rowHeight={25}
        selectableLines
        websocket
        websocketOptions={{
          onOpen: (e, sock) => {
            sock.send(JSON.stringify({ message: "Socket has been opened!" }));
          },
        }}
        style={{ color: "lightblue" }}
      />
    </div>
  );
}

export default App;
