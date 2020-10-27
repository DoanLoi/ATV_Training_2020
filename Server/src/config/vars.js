import path from 'path'
import * as dotenv from 'dotenv-safe'

dotenv.config();

export default {
    port:process.env.PORT,
    host:process.env.HOST,
    sercet:process.env.SERCET
}