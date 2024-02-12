export type HeaderProps = {
  courseName: string
}

export type ContentProps = {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

export type TotalProps = {
  totalExercises: number
}