import { User } from "../../models";
import { CustomErrorHandler } from "../../services";

const userController = {
  async me(req, res, next) {
    // Get data
    try {
      const user = await User.findOne({ _id: req.user._id }).select(
        "-password -updaredAt -__v"
      );
      if (!user) {
        return next(CustomErrorHandler.notFound());
      }
      res.json(user);
    } catch (err) {
      return next(err);
    }
  },
};

export default userController;
