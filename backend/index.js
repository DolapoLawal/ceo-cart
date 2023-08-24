const express = require ("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app =express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080
// mongodb connection
console.log(process.env.MONGODB_URI)
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Connect to Database"))
.catch((err)=>console.log(err))

// schema
const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type : String,
        unique : true,
    },
    password : String,
    confirmPassword : String
})

const userModel = mongoose.model("user",userSchema)

// api
app.get("/",(req,res)=>{
    res.send("Server is running")
})
app.post("/signup",(req,res)=>{
    console.log(req.body)
    const {email} = req.body 
    userModel.findOne({ email: email })
    .exec()
    .then(result => {
        console.log(result);
        if (result) {
            res.send({ message: "Email id is already registered",alert : false});
        } else {
            const data = userModel(req.body);
            const save = data.save()
                .then(() => {
                    res.send({ message: "Successfully sign up",alert : true});
                })
                .catch(saveErr => {
                    console.error(saveErr);
                    res.status(500).send({ message: "Failed to sign up" });
                });
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).send({ message: "Failed to check email" });
    });


})
// api login
app.post("/login",(req,res)=>{
    console.log(req.body)
    const {email} = req.body 
    userModel.findOne({ email: email })
    .exec()
    .then(result => {
        if (result) {
        const datasend = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
        };
           console.log(datasend)
            res.send({ message: "Successfully login",alert : true,data : datasend});
        } else {
            res.send({ message: "Email is not available, please sign up",alert : false});
        }
        

       
    })


})


//product section 

const schemaProduct = mongoose.Schema({
    name : String,
    category : String,
    image :  String,
    price :  String,
    description :  String,
});
const productModel = mongoose.model("product",schemaProduct)



//save product in data
//api

app.post('/uploadProduct',async(req,res)=>{
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send ({message : "Upload successfully"})

})

// 
app.get("/product",async(req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
  })

// server is running
app.listen(PORT,()=>console.log("server is running at the port : " +  PORT))


