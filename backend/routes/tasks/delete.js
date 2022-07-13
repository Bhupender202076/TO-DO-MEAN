const Task = require("../../models/Task");
const ObjectId = require('mongoose').Schema.Types.ObjectId

module.exports = {
  deleteTask: async (req, res, next) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(req.params.id);
        console.log(req.userData.userId);
        const task = await Task.deleteOne({
          _id: req.params.id,
          creator: req.userData.userId,
          
        });
        console.log(`task deleted`, task)
        return res
          .status(200)
          .json({ stauts: { message: `deleted!`, code: 201 } });
      } catch (error) {
        console.log(`something went wrong`);
        return res
          .status(500)
          .json({ status: `something wemt wrong`, code: 500 });
      }
    });
  },
};
