const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()

const cors = require('cors')
const app = express()


//middleware
app.use(express.json())

app.use(cors({
    origin: ["http://localhost:5173", "https://vovinamspkt.vercel.app"],
    credentials: true
}))


//routes

app.use("/api/fighters", require("./src/routes/fighter.route"));
app.use('/api/tournaments', require("./src/routes/tournament.route"));
app.use('/api/matches', require("./src/routes/match.route"));



const port = process.env.PORT || 3000

async function main() {
    await mongoose.connect(process.env.DB_URL);
    // routes
    app.use('/', (req, res) => {
        res.send('this is my server')
    })
}

main().then( () => console.log("Mongodb connect successfully!")).catch(err => console.log(err))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})