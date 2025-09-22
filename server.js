
import express from 'express';
import connectDb from './connection/db.js';
import dotenv from 'dotenv';
import checkUserName from './routes/auth/checkUserName.js'
import cors from 'cors';
import routes from './routes/index.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDb(process.env.MONGODB_CONNECTION_URI);

app.get('/', (req, res) => {
  res.send('Server is running fine!');
});

app.use('/api', routes);
app.use('/auth', checkUserName);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
