const express = require("express");
const cors = require("cors");
const {connection} = require("./connection")
const { userRouter } = require("./Route/userRoute");
const PORT = process.env.PORT || 7700;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);

app.get("/",(req,res)=>{
    res.send("Hi, You are on BrandWick API")
})

app.listen(PORT,async()=>{
    try {
        await connection;
        console.log('Server is connected with mongoDBAtlas');
        console.log(`Server is running on PORT ${PORT}.`);
    } catch (error) {
        console.log(error)
    }
})