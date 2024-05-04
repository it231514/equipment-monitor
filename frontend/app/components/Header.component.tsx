import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header(props: any) {
  const navigate = useNavigate();

  function handleClick(path: string) {
    navigate(path);
  }

  return (
    <header className="App-header" style={{ background: "red", width: "100%" }}>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{
            marginLeft: "30px",
            marginRight: "26px",
            fontSize: "2rem",
          }}
        ></div>
        {/* <img
          width={"40px"}
          style={{ margin: "5px" }}
          src={logo}
          className="App-logo"
          alt="logo"
        /> */}
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" onClick={() => handleClick("/login")}>
          <DeleteIcon></DeleteIcon>
        </Button>
      </div>
    </header>
  );
}
