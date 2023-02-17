import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getDatabase, ref, child, get } from "firebase/database";
import axios from "axios";
import { height } from "@mui/system";
const Featured = ({ data }) => {
  const dbRef = ref(getDatabase());

  const dt = data.slice(-1);

  return (
    <div style={{ display: "flex", height: 250 }} >
     
      <div className="featured" >
        <div className="top">
          <h1 className="title">Nhiệt độ</h1>
          <MoreVertIcon fontSize="small" />
        </div>
        <div className="bottom">
          <CircularProgressbar
            value={dt[0] ? dt[0].nhietdo : 0}
            text={dt[0] ? dt[0].nhietdo + "℃" : 0 + "℃"}
            strokeWidth={8}
          />
        </div>
      </div>
      <div className="featured" style={{ height: 250, marginLeft: 10 }}>
        <div className="top">
          <h1 className="title">Độ ẩm</h1>
          <MoreVertIcon fontSize="small" />
        </div>
        <div className="bottom">
          <CircularProgressbar
            // value={dt[0].doam ? dt[0].doam : 0}
            value={dt[0] ? dt[0].doam : 0}
            text={dt[0] ? dt[0].doam + "%" : 0 + "%"}
            strokeWidth={8}
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
