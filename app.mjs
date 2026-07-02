import express from "express"
import { config } from "./config.mjs"
import { connectDB } from "./db/database.mjs"
import authRouter from "./router/auth.mjs"
import postsRouter from "./router/posts.mjs"
// 라우터 import 하기 (auth, posts)

const app = express()

app.use(express.json()) 
app.use("/auth", authRouter)
app.use("/post",postsRouter)
// auth, posts 미들웨어 등록

app.use((req, res) => {
    res.sendStatus(404)
}) // 잘못 들어왔을 때


connectDB().then(() => {
    app.listen(config.host.port, () => {
        console.log("DB/웹 서버 실행 중...")
    })
}).catch(console.error)