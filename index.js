import express from 'express';
const app = express();
const port = process.env.PORT || 8080

//creating routes


app.get('/', (req, res)=>{
    res.send('welcome to our website')
})



app.listen(port, ()=>{
    console.log('server is running on port${port}')
})