const Task = require("../../models/Task");

module.exports = {
  getById: async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    return res
      .status(200)
      .json({ status: { message: `found!`, code: 200 }, data: task });
  },

  getAll: (req, res, next) => {
    console.log(req.query);

    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.currentpage;

    const taskQuery = Task.find();

    if (pageSize && currentPage > -1) {
      taskQuery.skip(pageSize * currentPage).limit(pageSize);
    }

    taskQuery
      .then(async (tasks) => {
        res.json({
          status: {
            message: "successfull",
            code: 200,
          },
          data: tasks,
          totalCount: await Task.count(),
        });
      })
      .catch((e) => {
        res.status(500).json({
          status: {
            message: e.message,
            code: 500,
          },
        });
      });
  },
};
