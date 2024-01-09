const express = require('express')
const cors = require('cors');

const app = express();
app.use(cors());


app.use(express.json());

app.listen(8000, () => {
    console.log('The server has started! Oh Yea');
});

const cantripMap = new Map();

app.get("/", (request, response) => {
    const entriesArray = Array.from(cantripMap, ([key, value]) => `${key}: ${value}`);
    const obj = Object.fromEntries(cantripMap);
    response.send(obj);
});

app.post("/cantrip", (request, response) => {  
    cantripMap.set(request.body.name,request.body.range);
    response.send(request.body);
});

app.get("/entry/:name", (request, response) => {
    let entryName = request.params.name;
    if (cantripMap.has(entryName)) {
        const value = cantripMap.get(entryName);
        response.send(entryName + ":" + value); 
      } else {
        response.send("No entry found"); 
      }
});

app.put("/update", (request, response) => {  
    let toUpdate = cantripMap.get(request.body.name);
    if(toUpdate) {
        cantripMap.set(request.body.name, request.body.range);
        response.send('Updated: ' + request.body.name)
    } else {
        response.send('Cantrip not found');
    }
});

app.delete('/delete', function (request, response) {
    let toDelete = cantripMap.get(request.query.name);
    if(toDelete) {
        cantripMap.delete(request.query.name);
        response.status(200).json({ message: 'Data deleted successfully.' });
    } else {
        response.status(404).json({ error: 'Cantrip not found.' });
    }
  });