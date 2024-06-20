import express ,{Request, Response} from 'express';
const cors  = require('cors');
import "dotenv/config";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log("database connection established!"));

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:300'], // adjust to your frontend URL
  credentials: true,
}));

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Bob Smith' },
];



app.get('/api/users', (req : Request, res: Response) => {
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



