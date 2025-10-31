const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const app = express();

//Middleware

//secure HTTP headers
app.use(helmet());

// log request cli
app.use(morgan('dev'));

app.use(compression());

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "https://vovinamhcmute.vercel.app"],
  credentials: true
}));

app.use("/api/fighters", require("./src/routes/fighter.route"));
app.use("/api/tournaments", require("./src/routes/tournament.route"));
app.use("/api/matches", require("./src/routes/match.route"));
app.use("/api/auth", require("./src/routes/adminAuth"));

const port = process.env.PORT || 3000;

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Mongodb connected successfully!");

  app.get('/', (req, res) => {
    res.send('Server is running securely and fast!');
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

main().catch(err => console.error("MongoDB connection error:", err));
