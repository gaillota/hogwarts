module.exports = (req, res, next) => {
    if (req.output) {
        const {status = 200} = req.output

        return res.status(status).json(req.output)
    }

    next()
}
