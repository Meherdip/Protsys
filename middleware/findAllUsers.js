
var express = require("express");
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const assetsModal= require('../model/assets.js')

var findAllUsers = function (req, res) {

    const assets= assetsModal.find()
    console.log(assets)
    let ass=JSON.stringify(assets)
        res.json(ass)
};
module.exports = findAllUsers;