const path = require('path')
const express = require('express')

const app = express()

const port = process.env.PORT || 3000

// define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

// setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})