
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../../models/User.js');




//register
const registerUser = async (req, res) => {
    const { username, email, password } = req.body

    try {

        const checkUser = await User.findOne({ email })
        if (checkUser)
            return res.json({
                success: false,
                message: "User Already exists with the same email. Please try with another email!"
            })

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        })

        await newUser.save()
        console.log("Registration successful")
        res.status(200).json({
            success: true,
            message: "Registration successful"
        })
    } catch (e) {
        console.log("Error in registerUser:", e)
        res.status(500).json({
            message: "Some error occured",
            success: false
        })
    }
}



//login


const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const checkUser = await User.findOne({ email })
        if (!checkUser)
            return res.json({
                success: false,
                message: "User doesn't exists! Please try register first"
            })

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)
        if (!checkPasswordMatch) return res.json({
            success: false,
            message: "Incorrect password! "
        })

        const token = jwt.sign(
            { id: checkUser._id, role: checkUser.role, email: checkUser.email },
            'CLIENT_SECRET_KEY',
            { expiresIn: '60m' }
        )

        res.cookie('token', token, { httpOnly: true, secure: false }).json({
            success: true,
            message: 'Logged in successfully',
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id
            }
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Some error occured",
            success: false
        })
    }
}


//logout
const logoutUser = (res, req) => {
    res.clearCookie('token').json({
        success: true,
        message: " Logged out successfully!"
    })
}


//auth middleware

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({
        success: false,
        message: 'Unauthorised user!'
    })

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY')
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({
            success: false,
            message: 'Unauthorised user!'
        })
    }
}

module.exports = { registerUser, loginUser, logoutUser, authMiddleware }