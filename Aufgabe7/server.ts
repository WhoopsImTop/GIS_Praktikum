import * as http from "http";

const hostname: string = "127.0.0.1"; // localhost
const port: number = 3000;

const server: http.Server = http.createServer(
  async (request: http.IncomingMessage, response: http.ServerResponse) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
    let url: URL = new URL(request.url || "", `http://${request.headers.host}`);
    switch (url.pathname) {
      case "/":
        response.end("Server erreichbar");
        break;
      case "/convertDate":
        let param = url.searchParams.get("date")
        let res = await convertDate(param);
        response.end(JSON.stringify(res));
      default:
        response.statusCode = 404;
    }
    response.end();
  }
);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function convertDate(date: string) {
  let newDate : Date;
  if(date.includes(".")){
    let convertedDate : string[] = date.split(".");  
    newDate = new Date(convertedDate[2] + "." + convertedDate[1] + "." + convertedDate[0]);
  } else {
    newDate = new Date(date);
  }
  let Months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  let Response : Object = {
    "Day": newDate.getDate(),
    "Month": Months[newDate.getMonth()],
    "Year": newDate.getFullYear(),
    "DateString": `Day: ${newDate.getDate()} Month: ${Months[newDate.getMonth()]} Year: ${newDate.getFullYear()}`
    };
  return Response;
}