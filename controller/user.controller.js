const db = require("../models");

const Users = db.users;

const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    let dd = await Users.findOne({ where: { id: req.body.id } });
    if (dd) {
        res.status(400).send({
            message: "Id is already exist",
            status: false,
        });
    } else {
        if (
            !req.body.firstname &&
            !req.body.lastname &&
            !req.body.id &&
            !req.body.location
        ) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
            return;
        }
        const users = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            id: req.body.id,
            location: req.body.location,
        }
        Users.create(users)
            .then((data) => {
                res.status(200).send({
                    message: " successfully.",
                    status: true,
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the testing.",
                });
            });
    }
};

exports.findAll = (req, res) => {
    Users.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials.",
            });
        });
};


exports.update = async (req, res) => {
    let dd = await Users.findOne({
        where: { name: name, id: req.body.id },
    });

    if (dd) {
        res.status(400).send({
            message: "first AllReady Present",
            status: false,
        });
    } else {
        if (!name) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
            return;
        }

        Users.update(
            {
                name: name,
            },
            {
                where: { id: req.body.id },
            }
        )
            .then((data) => {
                if (data[0] === 1) {
                    Users.findOne({
                        where: { id: req.body.id },
                    })
                        .then((data) => {
                            res.send({
                                id: data.dataValues.id,
                                firstname:
                                    data.dataValues.name.split(" ")[0] === null
                                        ? null
                                        : data.dataValues.name.split(" ")[0],
                                lastname:
                                    data.dataValues.name.split(" ")[1] === null
                                        ? null
                                        : data.dataValues.name.split(" ")[1],
                                location: data.dataValues.phone,
                            });
                        })
                        .catch((err) => {
                            res.status(500).send({
                                message:
                                    err.message ||
                                    "Some error occurred while retrieving user details",
                            });
                        });
                } else {
                    res.status(400).send({
                        status: false,
                        message: "firstname update failer",
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while updating user information",
                });
            });
    }
};
exports.deleteOne = (req, res) => {
    Users.destroy({
        where: { id: req.params.id },
    })
        .then((data) => {
            if (data !== 0) {
                res.status(200).send({
                    message: "successfully deleting user ",
                });
            } else {
                res.status(400).send({
                    message: "user not found",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting user",
            });
        });
};
