const admin = require("../admin")
const Book = require("../models/Book")
const router = require("express").Router()


router.post("/", admin, async (req, res) => {
    try {

        const newBook = await Book.create(req.body)

        res.status(200).json(newBook)

    } catch (error) {
        res.status(500).json(error)
    }
})


router.put("/:id", async (req, res) => {
    try {

        const updateBook = await Book.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updateBook)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:id", async (req, res) => {
    try {

        const book = await Book.findById(req.params.id)

        if (!book) return res.status(404).json("Kitob mavjud emas!")

        res.status(200).json(book)

    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/find/with", async (req, res) => {
    try {
        const { category } = req.query

        if (!category) { return res.status(301).json("Noto'g'ri malumotlar") }

        const categoryArray = category.split(",")

        const books = await Book.find({
            category: {
                $in: categoryArray
            }
        })

        if (books.length === 0) { return res.status(404).json("No data") }

        res.status(200).json(books)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/", async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json(error)
    }
})



router.delete("/:id", async (req, res) => {
    try {

        await Book.create(req.params.id)

        res.status(200).json("Kitob o'chirildi")

    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/find/search", async (req, res) => {
    try {
        if (!req.query.searched || req.query.searched.trim() === "") {
            return res.status(400).json({ message: "Noto'g'ri ma'lumotlar" });
        }

        const searchQuery = req.query.searched.trim().toLowerCase();
        const books = await Book.find({
            title: { $regex: searchQuery, $options: 'i' }
        });

        if (books.length === 0) {
            return res.status(404).json({ message: "Malumot topilmadi!" });
        }

        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server xatosi", error });
    }
});


module.exports = router