import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllHabits, getHabitsById, getHabitsByName } from './services/habits.js';

// це щоб був html
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config();

const PORT = Number(getEnvVar('PORT', '3001'));



export const startServer =()=>{
const app = express();
  app.use(cors());


  // це щоб був html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.use(express.static(path.join(__dirname, '../public')));




app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);


app.use((req, res, next) => {
  console.log(`Time..............: ${new Date().toLocaleString()}`);
  next();
});

// ==================контролери





app.get('/habits', async (req, res) => {

  const allHabits = await getAllHabits();
    res.status(200).json({
      data: allHabits,
    });
});


app.get('/habits/:habitsId', async (req, res) => {
    const { habitsId } = req.params;
  const habitsById = await getHabitsById(habitsId);

    // Відповідь, якщо контакт не знайдено
	if (!habitsById) {
	  res.status(404).json({
		  message: 'habitsById not found'
	  });
	  return;
	}

	// Відповідь, якщо контакт знайдено
    res.status(200).json({
      data: habitsById,
    });
});




app.get('/habits', async (req, res) => {
  const { name } = req.query;

  if (name) {
    const habitsByName = await getHabitsByName(name);

    if (!habitsByName) {
      res.status(404).json({ message: 'HabitsByName not found' });
      return;
    }

    res.status(200).json({ data: habitsByName });
  } else {
    const allHabits = await getAllHabits();
    res.status(200).json({ data: allHabits });
  }
});




app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
  });
  next ();
});


app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
};
