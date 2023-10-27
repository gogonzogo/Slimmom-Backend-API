const { user: service } = require("../../services");

const userGetArchive = async (req, res) => {
    console.log('controller')
    const result = await service.userGetArchive(req);
    console.log('return to controller')
    console.log('controller result', result)
    if (result === 400) {
        res.status(400).json({
            status: "Bad request",
            code: 400,
            data: {
                message: "Missing required fields",
            },
        });
        return;
    }
    if (result) {
        res.status(200).json({
            status: "Success",
            code: 200,
            data: result,
        });
    }
};

module.exports = userGetArchive;