const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
const app=require('./app')
// console.log(process.env)
const port=process.env.PORT|| 2500

app.listen(port,'127.0.0.1',()=>console.log(`server is running on${port}`))

