import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatientEntry } from "../types";

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });
};

const addPatient = (patientObject: NewPatientEntry) => {
  const id = uuid();
  const newPatient = {
    id,
    ...patientObject
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};