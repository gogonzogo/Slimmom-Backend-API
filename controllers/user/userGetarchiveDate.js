const { user: service } = require("../../services");

const userGetarchiveDate = async (req, res) => {
    const result = await service.userGetarchiveDate(req);
    console.log('controller results', result)
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

module.exports = userGetarchiveDate;