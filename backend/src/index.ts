import { App } from "./app";

const PORT: number = Number(process.env.APP_PORT) || 8080;
const app = new App(PORT);
app.start();

