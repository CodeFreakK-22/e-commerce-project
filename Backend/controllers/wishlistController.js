import userModel from '../models/userModel.js'

// ADD OR REMOVE
const toggleWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body
        const user = await userModel.findById(userId)

        let wishlist = user.wishlist || []

        if (wishlist.includes(productId)) {
            wishlist = wishlist.filter(id => id !== productId)
        } else {
            wishlist.push(productId)
        }

        await userModel.findByIdAndUpdate(userId, { wishlist })

        res.json({ success: true, wishlist })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// GET
const getWishlist = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await userModel.findById(userId)
        res.json({ success: true, wishlist: user.wishlist || [] })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { toggleWishlist, getWishlist }