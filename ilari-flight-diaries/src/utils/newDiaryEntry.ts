import { NewDiaryEntry } from "../types";

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  console.log(object);
  
  const newEntry: NewDiaryEntry = {
    weather: "cloudy",
    visibility: "good",
    date: "2023-02-08",
    comment: "Rastaclat"
  };
  return newEntry;
};

export default toNewDiaryEntry;