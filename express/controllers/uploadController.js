const uploadDao = require('../dao/uploadDao');
const path = require('path');
const fs = require('fs');

var uploadController = {
    uploadTrackingData: uploadTrackingData
}

async function uploadTrackingData(req, res) {
    if (!req.user.isAdmin) {
        return res.status(403).send("No permissions for this action");
    } else {
        if (!req.files || Object.keys(req.files).length === 0 || path.extname(req.files.file.name) != '.csv') {
            return res.status(400).send(`Bad request: no valid CSV file uploaded.`);
        } 
        let file = req.files.file
        file.mv('./tmp/' + file.name, function(err) {
            if (err) return res.status(500).send(err);
            res.send(`File uploaded!`);
        });
        fs.unlink('./tmp/' + file.name, (err) => {
            if (err) console.error(err);
        }) // remove csv file when done
    }
}

module.exports = uploadController;