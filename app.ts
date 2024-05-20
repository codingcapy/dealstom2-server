import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import users from "./routes/users"
import user from "./routes/user"
import budgets from "./routes/budgets"
import addresses from "./routes/addresses"

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.get("/", (req, res) => res.send("welcome"))
app.use("/api/users", users)
app.use("/api/user", user)
app.use("/api/budgets", budgets)
app.use("/api/addresses", addresses)
app.listen(port, () => console.log(`Server listening on port: ${port}`))