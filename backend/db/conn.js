const mongoose=require('mongoose')

// database connection
//const dbURI = 'mongodb+srv://farah:farah123@cluster0.jojfs.mongodb.net/inbdb';
const dbURI=process.env.DATABASE;
mongoose.connect(dbURI)
  .then((result) => {
   console.log("db connected")
  })
  .catch((err) => console.log(err));

  