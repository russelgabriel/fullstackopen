import { TotalProps } from "../types"

const Total = (props: TotalProps) => {
  return (
    <p>
      Number of exercises {props.totalExercises}
    </p>
  )
}

export default Total