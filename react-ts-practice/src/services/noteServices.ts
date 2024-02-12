import axios from "axios"
import { Note, NewNote } from "../types"

const baseUrl = "http://localhost:3001/notes"

export const getAllNotes = async () => {
  const response = await axios.get<Note[]>(baseUrl)
  return response.data
}

export const createNote = async (newNote: NewNote) => {
  const response = await axios.post<Note>(baseUrl, newNote)
  return response.data
}