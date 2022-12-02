const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

app.use(express.static(__dirname + '/src/assets/images/uploaded/'));
        
app.post('/upload', (req, res) => {
    const { image } = req.files;

    if (!image || !/^image/.test(image.mimetype)) {
        return res.sendStatus(400);
    }

    image.mv(__dirname + '/src/assets/images/uploaded/' + image.name);
    res.status(200).json({ status: 'OK' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});