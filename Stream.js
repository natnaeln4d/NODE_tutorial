const fs=require('fs')
const http=require('http')

const server=http.createServer();
server.on('request',(req,res)=>{
    // fs.readFile('./txt/i.txt',(err,data)=>{
    //     if(!err){
    //    res.end(data);
    //     }
    // })
    const readableStream=fs.createReadStream('./txt/i.txt');
    // readableStream.on('data',(data)=>{
    //     res.end(data);
    // })
    // readableStream.on('end',end=>{
    //     res.end(end);
    // })
    // readableStream.on('error',(err)=>{
        
    //     res.statusCode=500
    //     res.end("page not found");
    //     console.log(err);
    // })
    readableStream.pipe(res);

})

server.listen(2000,'127.0.0.1',()=>{
    console.log("server is running.....",2000);
});