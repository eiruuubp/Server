import dotenv from "dotenv"

dotenv.config() // env 파일을 읽어들일 수 있음

function required(key, defaultValue=undefined) {
    const value = process.env[key] || defaultValue
    // key가 넘어왔는데 process.env로 접근할 때 key값이나 defaultValue 있으면 value에 값을 넣기
    if (value == null) {
        throw new Error(`키 ${key}는 undefined`)
    }
    return value
}

// 외부에서 사용할 수 있는 객체 생성
export const config = {
    jwt: {
        secretKey: required("JWT_SECRET"),
        expiresInSec: parseInt(required("JWT_EXPIRES_SEC"))
    },
    bcrypt: {
        saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10))
    },
    host: {
        port: parseInt(required("HOST_PORT", 8080))
    },
    db: {
        host: required("DB_HOST")
    }
}