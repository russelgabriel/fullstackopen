import { ContentProps } from "../types"
import Part from "./Part"

const Content = (props: ContentProps) => {
  return (
    <>
      {
        props.courseParts.map((part) => {
          return <Part 
            key={part.name}
            coursePart={part} 
          />
        })
      }
    </>
  )
}

export default Content