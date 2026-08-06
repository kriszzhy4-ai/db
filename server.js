const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/files/:id', (req, res) => {
    const fileId = req.params.id;
    const filePath = path.join(__dirname, 'public', fileId);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
