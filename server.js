const express = require("express")
const bodyParser = require("body-parser")

const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
dotenv.config()

const app = express()
app.use(bodyParser.json())

app.use("/api/auth", authRoute)

app.listen(3000, () => console.log("Server running on port 3000"))

