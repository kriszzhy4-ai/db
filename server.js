const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve files from public folder with streaming
app.get('/files/:id', (req, res) => {
    const fileId = req.params.id;
    const filePath = path.join(__dirname, 'public', fileId);
    
    // Check if file exists
    if (fs.existsSync(filePath)) {
        // Get file stats for content length
        const stat = fs.statSync(filePath);
        
        // Set headers for streaming
        res.writeHead(200, {
            'Content-Type': getContentType(fileId),
            'Content-Length': stat.size,
            'Cache-Control': 'no-cache'
        });
        
        // Create read stream and pipe to response
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    } else {
        res.status(404).send('File not found');
    }
});

// Helper function to get content type based on file extension
function getContentType(filename) {
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes = {
        '.mp3': 'audio/mpeg',
        '.mp4': 'video/mp4',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.pdf': 'application/pdf',
        '.txt': 'text/plain',
        '.mpg': 'video/mpeg',
        '.mpeg': 'video/mpeg',
        '.avi': 'video/x-msvideo',
        '.mov': 'video/quicktime',
        '.wmv': 'video/x-ms-wmv',
        '.flv': 'video/x-flv',
        '.mkv': 'video/x-matroska',
        '.webm': 'video/webm'
    };
    return mimeTypes[ext] || 'application/octet-stream';
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
