import jwt from "jsonwebtoken";

//Doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const { doctortoken } = req.headers;

    if (!doctortoken) {
      return res.json({
        success: false,
        message: "Not Authorized. Please Log In Again",
      });
    }

    const token_decode = jwt.verify(doctortoken, process.env.JWT_SECRET);

    req.user = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
