const jwt = require('jsonwebtoken')

const isAdmin = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.userdata.role != 'admin') {
            return res.status(403).json({ message: 'Access denied' })
        }
        req.user = decoded.userdata
        next()
    } catch (err) {
        res.status(401).json({ message: 'Authorized' })
    }
}

module.exports = isAdmin