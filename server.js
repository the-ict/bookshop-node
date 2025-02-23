const connect = require("./connect")
const express = require("express")
const dotenv = require("dotenv")
const multer = require("multer")
const cors = require("cors")
const path = require("path")

const authRoute = require("./routes/Auth")
const bookRoute = require("./routes/Book")

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './media')
    },
    filename: (req, res, cb) => {
        cb(null, req.body.name)
    },
})

const upload = multer({ storage })


dotenv.config()

const app = express()
const port = 5000 || process.env.PORT

app.use(cors())
app.use(express.json())


app.use("/api/auth", authRoute)
app.use("/api/book", bookRoute)
app.use("/medias", express.static(path.join(__dirname, "media")))

app.get("/test", (req, res) => {
    res.send("Routing is working ✅")
})

app.post('/media', upload.single("file"), (req, res) => {
    res.status(200).json({
        message: "File yuklab olindi!"
    })
})

app.listen(port, () => {
    connect()
    console.log("Connected to SERVER✔")
})
