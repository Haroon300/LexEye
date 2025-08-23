import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;