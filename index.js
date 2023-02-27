const fs=require('fs');
const http=require('http');
const { title } = require('process');
const url=require('url')
const slugify=require('slugify');
const replaceTemplate=require('./module/ReplaceTemp')
const superagent=require('superagent');
const EvetEmiiter=require('events')
// fs.readFile('./txt/i.txt','utf-8',(err,data)=>{

//    console.log(data+"fff")
//    fs.readFile(`./txt/${data}`,'utf-8',(err,data1)=>{
//     console.log(data1+"ggg")
//     fs.readFile('./txt/i.txt','utf-8',(err,data2)=>{
//         console.log(data2)
//         fs.writeFile('./txt/final.txt',`${data1}\n ${data2}`,'utf-8',(err)=>{
//             console.log("file written")
//         })
//     })
//    })
// })

const cardtemp=fs.readFileSync(`${__dirname}/template/cardtemp.html`,'utf-8')
const producttemp=fs.readFileSync(`${__dirname}/template/producttemp.html`,'utf-8')
const template=fs.readFileSync(`${__dirname}/template/index.html`,'utf-8')

// const data=fs.readFileSync(`${__dirname}/json/Data.json`,'utf-8');
const data=fs.readFileSync(`${__dirname}/json/4f7bf80f-e4c8-44c5-9be2-afc649a5af96.json`,'utf-8');

const dataObi=JSON.parse(data);
// const slug=dataObi.map(el=>slugify(el.carName,{lower:true}))
// console.log(slug)
const server=http.createServer((req,res)=>{
    const {query,pathname}=url.parse(req.url,true);
    
    if(pathname==='/'||pathname==='/overview'){
        res.writeHead(200,{
            'content-type':'text/html'
        })
  
        const cardhtml=dataObi.map(el=>replaceTemplate(cardtemp,el)).join('')
        // console.log(dataObi)
        const output=template.replace('{%PROUCT_CARD%}',cardhtml)
       
        console.log(query)
         res.end(output)
       console.log(query)
    }else if(pathname==='/product'){
       
        res.writeHead(200,{
            'content-type':'text/html'
        })
        const product=data;
        const output=replaceTemplate(producttemp,product)
        res.end(output)
    }
    else if(pathname==="/api"){
        // req.end('API')
        // fs.readFile('./json/Data.json','utf-8',(err,data)=>{
        //     res.writeHead(200,{
        //         'content-type':'application/json'
        //     })
        //     res.end(data)
        // })
       
    }
    else{
       
        res.writeHead(404,{
            'content-type':'text/html',
            'my-own-header':'my-own-header'
        })
         res.end("<h1>page not found</h1>")
         console.log(req.url)
    }
})

server.listen(4000,'127.0.0.1',()=>{
    console.log('server is running on', 4000)
})

// const txtoutput=`the world is cool...${Date.now()}`
// fs.writeFileSync('outtxt.txt',txtoutput,(err)=>{
//     console.log(err)
// })
// console.log("write end")
// const express =require('express')
// const app=express()
// const port=5000
// app.get('/',(req,res)=>{
//     res.send("hello NATTY");
//     res.send("hello NATTY");
//     res.send("hello NATTY");
  
// });

// app.listen(port,()=>{console.log('server is running on', port)})

// class Myemmitter extends EvetEmiiter{
//     constructor(){
//         super();
//     }
//  }

//  const server=http.createServer();
//  server.on("request",(req,res)=>{
//     res.end("request received!")
//     console.log(req.url)
//     console.log("request received!")
//  })
//  server.on("request",(req,res)=>{
//     res.end("another request received!")
//     console.log("another request received!")
//  })
//  server.on("close",(req,res)=>{
//     res.end("close!")
//     console.log("closed!!")
//  })
//  const port=4000

// server.listen(port,'127.0.0.1',()=>{
// console.log("server is starting at",port)
// })

// fs.readFile(`${__dirname}/txt/i.txt`,'utf-8',(err,data)=>{
//    superagent.get(`https://dog.ceo/api/breeds/${data}/image/random`).then(res=>{
//       console.log(res.body.message)

//       fs.writeFile(`./txt/dog.txt`,res.body.message,'utf-8',(err)=>{   
//       console.log("file written")
//    })
   
// }).catch(err=>{
//    console.log(err.message)
// })
// })
// 
