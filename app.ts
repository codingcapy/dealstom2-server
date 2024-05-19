import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import users from "./routes/users"
import user from "./routes/user"

dotenv.config()
const app = express()
const port = 3333

app.use(cors())
app.use(express.json())
app.get("/", (req, res) => res.send("welcome"))
app.use("/api/users", users)
app.use("/api/user", user)
app.listen(port, () => console.log(`Server listening on port: ${port}`))