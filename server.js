const app = require("./app");
const cloudinary = require('cloudinary')
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// Handling Uncaught Exception
process.on('uncaughtException',(err)=>{
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1)
})

// Config
dotenv.config({
  path: "config/config.env",
});

// Connnecting to database
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandler Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
