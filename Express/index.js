const express = require('express');
const fs = require("fs")
const users = require('./MOCK_DATA.json')
const app = express();

const PORT = 8000;

// middleware -plugin
app.use(express.urlencoded({extended:false}));

app.use((req,res,next) => {
    console.log("hello from 2");
    next(); // call next function
})
app.use((req,res,next) => {
    console.log("hello from 3");
    next();
   // return res.end("ended");
})

// Show all the users to page
app.get("/api/users",(req,res) => {
    return res.json(users);
});


// Showing all the firstName only
app.get("/users", (req,res) => {
    const html = `<ul> ${users.map((user) => `<li>${user.first_name}</li>`).join("")} </ul`;  // join to remove ,
    res.send(html)

});


// showing data basics of user id
app.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    console.log("Requested user ID:", id);
    const user = users.find((user) => user.id == id); // Use loose comparison
    console.log("Found user:", user);
    return res.json(user);
});


app.post("/api/users/", (req,res) => {
    
    const body = req.body;
    console.log("Body:",body);
    users.push({...body, id: users.length +1});

    fs.writeFile('MOCK_DATA.json', JSON.stringify(users), (err,data) => {
        return res.json({status:"success", id: users.length} )
    })
});

app.patch("/api/users/:id", (req,res) => {

    // Todo: Edit user with id
    return res.json({status:"pending"});
});



// group all the request in the route method
/*app.route("/api/users/:id").get((req,res) => {
    const id = req.params.id;
    console.log("Requested user ID:", id);
    const user = users.find((user) => user.id == id); // Use loose comparison
    console.log("Found user:", user);
    return res.json(user);
})
.post("/api/users",(req,res) => {} )
.put((req,res) => {} )
.delete((req,res) => {})
*/



app.listen(PORT,()=> console.log("Server Started"));
