const fs=require('fs');
const http=require('http');
const { title } = require('process');
const url=require('url')
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
const replaceTemplate=(temp,product)=>{
   let output=temp.replace(/{%T%}/g,product.features[0])
   output=output.replace(/{%DIS%}/g,product.detail)
   output=output.replace(/{%N%}/g,product.carName)
   output=output.replace(/{%P%}/g,product.carPrice)
   output=output.replace(/{%S%}/g,product.includedInThePrice[0])
   output=output.replace(/{%PHOTO%}/g,product. images[1])
   output=output.replace(/{%ID%}/g,product.id)
        //    if(!product.status) output.replace(/{%STATUS%}/g,product.error)

  return output;

}
const cardtemp=fs.readFileSync(`${__dirname}/template/cardtemp.html`,'utf-8')
const template=fs.readFileSync(`${__dirname}/template/index.html`,'utf-8')
// const data=fs.readFileSync(`${__dirname}/json/Data.json`,'utf-8');
const data=fs.readFileSync(`${__dirname}/json/4f7bf80f-e4c8-44c5-9be2-afc649a5af96.json`,'utf-8');

const dataObi=JSON.parse(data);

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
        const product=dataObi[query.id];
        res.writeHead(200,{
            'content-type':'text/html'
        })
        const output=replaceTemplate(cardtemp,product)
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
    console.log('server is running on', 40000)
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
