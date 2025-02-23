const User = require("../models/User")
const bcrypt = require("bcryptjs")
const router = require("express").Router()
const admin = require("../admin")


// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const newUser = new User({
            ...req.body,
            password: hash
        })

        newUser.save()


        if (!newUser) return res.status(199).json("Userni yaratib bo'lmadi")

        res.status(200).json(newUser)

    } catch (error) {
        res.status(500).json(error)
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const comparePassword = bcrypt.compareSync(req.body.password, user.password)

            if (!comparePassword) { return res.status(301).json("Noto'g'ri malumotlar") }

            const { password, ...others } = user._doc

            res.status(200).json(others)

        } else return res.status(404).json("User mavjud emas!")

    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router