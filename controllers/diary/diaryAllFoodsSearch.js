const { diary: service } = require('../../services');

const diaryAllFoodsSearch = async (req, res) => {
    const result = await service.diaryAllFoodsSearch(req);
    if (result.length === 0) {
        res.status(404).json({
            status: 'Not Found',
            code: 404,
            data: {
                message: `No foods were found for ${req.params.title}`,
            },
        });
        return;
    }
    res.status(200).json({
        status: "Success",
        code: 200,
        message: 'Food was found',
        data: result,
    });
};

module.exports = diaryAllFoodsSearch;