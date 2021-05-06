module.exports = {
    post : async (req, res) => {
        res.status(200).send(req.file.path)
    }
};