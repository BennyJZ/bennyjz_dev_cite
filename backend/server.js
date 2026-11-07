import app from "./app.js";

app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`Backend listening on port ${process.env.PORT}`);
});
