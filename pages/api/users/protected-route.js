import authMiddleware from "../../../backend/backend/middlewares/authMiddleware";

const handler = (req, res) => {
    res.json(200).json({message:'This is a protected route'})

}

export default authMiddleware(handler);