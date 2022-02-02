const express=require('express');
const app=express();
const dotenv=require('dotenv')
dotenv.config({ path: './config.env' }) // once this path is declared in index.js ie main file then u dont have to declare in dependent files
require('./db/conn')
const PORT= process.env.PORT || 5000;
const cors = require('cors')

app.use(cors())
app.use(express.json())

//const authRoute=require('./routes/auth')
//app.use(authRoute)
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.listen(PORT, () => {
  console.log(`iNotebook app listening at ${PORT}`)
})