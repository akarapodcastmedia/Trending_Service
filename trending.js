require("dotenv").config();
// express

const express = require("express");
const cors = require("cors");
const trending = express();
trending.use(express.json());
trending.use(express.urlencoded({extended : true}));
const router = require("./router");
const { middlewarer } = require("./middleware/authorization");
trending.use(cors());
//============= << middleware >> ====================
// =================================================
trending.use('/trending',middlewarer,router);
//==================================================
trending.listen(process.env.PORT,()=>console.log(`trending service is being listened at PORT ${process.env.PORT} `));
