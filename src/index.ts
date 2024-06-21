import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to check server status
app.get('/ping', (req, res) => {
    res.send(true);
});

// Endpoint to submit a new entry
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;

    if (!name || !email || !phone || !github_link) {
        return res.status(400).send('All fields are required.');
    }

    console.log('Received submission:', req.body);

    const newEntry = { name, email, phone, github_link, stopwatch_time };

    fs.readFile('src/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal server error.');
        }

        let db;
        try {
            db = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            db = { submissions: [] };
        }

        db.submissions.push(newEntry);

        fs.writeFile('src/db.json', JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Internal server error.');
            }
            res.send('Submission saved successfully.');
        });
    });
});

// Endpoint to read a submission by index
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string, 10);

    fs.readFile('src/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal server error.');
        }

        let db;
        try {
            db = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).send('Internal server error.');
        }

        if (index < 0 || index >= db.submissions.length) {
            return res.status(404).send('Submission not found.');
        }
        res.json(db.submissions[index]);
    });
});

// Endpoint to delete a submission by index
app.delete('/delete', (req, res) => {
    const index = parseInt(req.query.index as string, 10);

    fs.readFile('src/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal server error.');
        }

        let db;
        try {
            db = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).send('Internal server error.');
        }

        if (index < 0 || index >= db.submissions.length) {
            return res.status(404).send('Submission not found.');
        }

        db.submissions.splice(index, 1);

        fs.writeFile('src/db.json', JSON.stringify(db, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Internal server error.');
            }
            res.send('Submission deleted successfully.');
        });
    });
});

// Initialize JSON file if it doesn't exist
if (!fs.existsSync('src/db.json')) {
    fs.writeFileSync('src/db.json', JSON.stringify({ submissions: [] }, null, 2));
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
