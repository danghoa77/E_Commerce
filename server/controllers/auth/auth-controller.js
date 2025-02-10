
const bcypress = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../../models/User.js');




//register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body


    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, 
            email, 
            password: hashPassword,
        })

        awaitnewUser.save()
        res.status(200).json({
            success: true,
            message: "Registration successful"
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Some error occured",
            success: false
        })
    }
}



//login


const login = async (req, res) => {

    try {   

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Some error occured",
            success: false
        })
    }
}


//logout



//auth middleware



module.exports = {registerUser}