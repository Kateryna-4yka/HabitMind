
// Сервіси допомагають організувати код та функціонал застосунку, розділяючи їх на логічні частини. Вони застосовуються для реалізації операцій, що не залучені безпосередньо до обробки маршрутів, наприклад, взаємодії з базою даних або зовнішніми API. Сервіси виступають як посередники між контролерами, які обробляють HTTP-запити, та базою даних, тим самим оптимізуючи архітектуру застосунку.



import { habitsCollection } from '../db/models/habits.js';

export const getAllHabits = async () => {
  const habits = await habitsCollection.find();
  return habits;
};


export const getHabitsById = async (habitsId) => {
  const habits = await habitsCollection.findById( habitsId);
  return habits;
};


export const getHabitsByName = async (habitsName) => {
  const habits = await habitsCollection.findOne( { 'name': habitsName });
  return habits;
};
