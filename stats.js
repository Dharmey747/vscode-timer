const fs = require("fs");
const path = require("path");

function renderAnalytics () {
    const payload = fs.readFileSync(path.resolve(__dirname, 'content.html'), 'utf8');
    return payload;
};

module.exports = {renderAnalytics};