const http=require('http')
const EvetEmiiter=require('events')
 class Myemmitter extends EvetEmiiter{
    constructor(){
        super();
    }
 }

 const server=http.createServer();
 server.on('request',(req,res)=>{
    res.end("request received!")
    console.log("request received!")
 })
 server.on('request',(req,res)=>{
    res.end("another request received!")
    console.log("another request received!")
 })
 server.on('close',(req,res)=>{
    res.end("close!")
    console.log("closed!!")
 })
 server.listen(6000,"127.0.0.1",()=>{console.log("server is running",6000)})