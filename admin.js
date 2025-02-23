const User = require("./models/User")

const admin = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.user_id)
        if (!user) return res.status(404).json("Malumotlar yo'q!")


        if (user.isAdmin != true) return res.status(400).json("Siz admin emassiz!")

        next()
    } catch (error) {
        res.status(500).json({ error: "Server xatosi", details: error.message })
    }
}

module.exports = admin
