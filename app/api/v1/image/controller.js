const {StatusCodes} = require('http-status-codes')
const { createImage } = require('../../../service/mongoose/image')



const create = async (req, res, next) => { 
    try {
        // console.log('req.file >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        // console.log(req.file)
        const result = await createImage(req)

        res.send(StatusCodes.CREATED, {data: result})
    } catch (error) {
        next(error)
    }
}


module.exports = {create}