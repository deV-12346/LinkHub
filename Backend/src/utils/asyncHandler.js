const asyncHandler = (fun) => async(req,res,next) =>{
      try {
            await fun(req,res,next)
      } catch (error) {
            return res.status(error.statusCode || 500).json({
                  success:false,
                  message: error.message
            })
      }
}
export default asyncHandler