import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PuffLoader from "react-spinners/PuffLoader";



const List = () => {
  const [dieukhien, setDieukhien] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateOn = async (key, status, name) => {
    await axios
      .put(
        "https://iotsmarthome-5d008-default-rtdb.firebaseio.com/iotdata/control/" +
          key +
          ".json",

        {
          name: name,
          status: -status,
        }
      )
      .then((result) => {
        toast({ status });
        if(status == '1'){
          toast("Đã mở");
        }else toast("Đã tắt");
        
      })
      .catch((err) => {
        toast(err.message);
      });
  };

  useEffect(() => {
    setInterval(() => {
      const getData = async () => {
        await axios
          .get(
            "https://iotsmarthome-5d008-default-rtdb.firebaseio.com/iotdata.json"
          )
          .then(async (result) => {
            await setDieukhien(result.data.control);
            setLoading(true);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      getData();
    }, 1000);
  }, []);

  return loading ? (
    <TableContainer component={Paper} className="table container mx-auto">
       <ToastContainer />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Stt</TableCell>
            <TableCell className="tableCell">Thiết bi</TableCell>
            <TableCell className="tableCell">Trạng thái</TableCell>
            <TableCell className="tableCell">Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dieukhien
            ? dieukhien.map((data, key) => (
                <TableRow key={key}>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">{key}</div>
                  </TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      {data ? data.name : "Loading..."}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${data ? data.status : ""}`}>
                      {data.status === -1 ? "Tắt" : "Bật"}
                    </span>
                  </TableCell>
                  <TableCell>
                   
                    <Button
                      className={data.status === -1 ? "status on" : "status off"}
                      onClick={() => {
                        updateOn(key, data.status, data.name);
                        // alert(key);
                      }}
                    >
                      {data.status === -1 ? "Bật" : "Tắt"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : "Loading..."}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div className="fixLoading">
      <PuffLoader className="loading" color="#36d7b7" size={80} />
    </div>
  );
};

export default List;
