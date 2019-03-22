const path = require("path")
const express = require("express")
const app= express()
const server = app.listen(3000,"0.0.0.0")
const io= require("socket.io").listen(server)
const cv = require("opencv4nodejs")

const FPS=30
const videoCapture =new cv.VideoCapture(0)
videoCapture.set(cv.CAP_PROP_FRAME_HEIGHT,300)
videoCapture.set(cv.CAP_PROP_FRAME_WIDTH,300)

app.get("/",(req,res)=>{
    res. header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.sendFile(path.join(__dirname,"index.html"))

})
setInterval(()=>{
    const frame= videoCapture.read()
    const image=cv.imencode(".jpg",frame).toString("base64")
  
    io.emit('image',image)

 
},1000/FPS)


