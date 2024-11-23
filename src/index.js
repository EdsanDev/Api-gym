import app from '../app.js';
import { connectDB } from './db.js';

connectDB();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})