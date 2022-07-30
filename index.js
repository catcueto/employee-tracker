// Importing and requiring express
const express = require("express");
// Importing and requiring mysql2
const mysql = require("mysql2");

// Connecting to database & importing mysql library
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root1234",
    database: "staff_db",
  },
  console.log(`Successfully connected to the staff_db database.`)
);
