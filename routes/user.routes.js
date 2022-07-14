module.exports = app => {
    const users = require("../controller/user.controller");
    var router = require("express").Router();
    router.post("/", users.create);
    router.get("/getuser", users.findAll);
    router.patch("/update", users.update);
    router.delete("/:id", users.deleteOne);
    app.use('/api/users', router);

}