const express = require("express");
const app = express();
const mysql = require("mysql2");


//middleware 
app.use(express.json());

//create database connection
const connection = mysql.createConnection({
    host: 'localhost', user: 'root', password: '1234', database: 'new_schema'
});

//connnect database
connection.connect(error => {
    if (error) {
        console.error("err connecting to mysql", error);
        return;
    }
    console.log("sql running");
    //starting szerver
    app.listen(3000, () => (console.log("server running")));

});


//api2 
app.get("/Api/",(req, res) => {
    const {ticker,column,period}=req.query;

    
    if (ticker!==undefined && column===undefined && period===undefined){

        connection.query(`SELECT * FROM data WHERE ticker='${ticker}'`,(err, result) => {
            if (err) {
                return;
            }
            res.json(result);
        }
    )
    }
    else if(ticker!==undefined && column!==undefined && period===undefined){
    
     connection.query(`SELECT ticker,${column} FROM data WHERE ticker='${ticker}'`,(err, result) => {
            if (err) {
                return;
            }
            res.json(result);
        }
    )}
    else{
    
      
     connection.query(`SELECT ticker,${column},date FROM data WHERE ticker='${ticker}' ORDER BY date desc`,(err, result) => {
        if (err) {
            return;
        }
        res.json(result);
    }
)  
    }

});