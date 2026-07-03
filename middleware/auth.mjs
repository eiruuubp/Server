import jwt from "jsonwebtoken"
import { config } from "../config.mjs"
import * as authRepository from "../data/auth.mjs"

const AUTH_ERROR = { message: "인증 에러" }

export const isAuth = async (req, res, next) => {
    const authHeader = req.get("Authorization")
    console.log(authHeader)

    // Bearer로 헤더가 들어오는지 확인하기
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("헤더에러")
        return res.status(401).json(AUTH_ERROR)
    }

    //Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDVmNzJjZmVmY2UxZDVhMDQ2YjA1MiIsImlhdCI6MTc4MzAzODQ4OSwiZXhwIjoxNzgzMTI0ODg5fQ.N-Olisdcp-SQnMrcWFDYbqOARZ3iwMl1ycs8rE0ZDlQ

    const token = authHeader.split(" ")[1]
    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
        if(error) {
            console.log("토큰에러")
            return res.status(401).json(AUTH_ERROR)
        }
        // console.log(decoded)
        // id 찾기
        const user = await authRepository.findById(decoded.id)
        if (!user) {
            console.log("해당 아이디 없음")
            return res.status(401).json(AUTH_ERROR)
        }
        console.log("user.id: ", user.id)
        console.log("user.userid: ", user.userid)
        req.id = user.id
        req.token = token
        next()
    })

}