import { PartProps } from "../types";
import assertNever from "../utils/assertNever";

const Part = (props: PartProps) => {
  const style = {
    marginBottom: "1rem"
  }

  switch (props.coursePart.kind) {
    case "basic":
      return (
        <div style={style}>
          <p>
            <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
          </p>
          <p>
            <i>{props.coursePart.description}</i>
          </p>
        </div>
      )
    case "group":
      return (
        <div style={style}>
          <p>
            <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
          </p>
          <p>project exercises {props.coursePart.groupProjectCount}</p>
        </div>
      )
    case "background":
      return (
        <div style={style}>
          <p>
            <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
          </p>
          <p>
            <i>{props.coursePart.description}</i>
          </p>
          <p>{props.coursePart.backgroundMaterial}</p>
        </div>
      )
    case "special":
      return (
        <div style={style}>
          <p>
            <b>{props.coursePart.name} {props.coursePart.exerciseCount}</b>
          </p>
          <p>
            <i>{props.coursePart.description}</i>
          </p>
          <p>
            required skills: {props.coursePart.requirements.join(", ")}
          </p>
        </div>
      )
    default:
      return assertNever(props.coursePart);
  }
}

export default Part