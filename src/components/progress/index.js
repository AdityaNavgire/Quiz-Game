import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progress = ({ percentage }) => (
  <div>
    <div style={{ width: "100px" }}>
      <CircularProgressbar
        value={percentage}
        text={
          <tspan>{Math.floor(percentage)}%</tspan>
        }
        styles={buildStyles({
          pathColor: "green",
          textColor: 'black',
        })}
      />
    </div>
  </div>
);

export default Progress;
