import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
