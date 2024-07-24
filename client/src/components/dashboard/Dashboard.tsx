import React, { useEffect, useState } from "react";
import { Button, Typography, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CreateBoard from "./CreateBoard";
import axios from "axios";
import { useAppSelector } from "src/redux/hooks/hook";
axios.defaults.withCredentials = true;

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "1rem",
});

const HeaderText = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "45%",
});

const Boards = styled("div")({
  backgroundColor: "#fff",
  width: "45%",
  borderRadius: 10,
  display: "flex",
  justifyContent: "space-between",
});

const IconContainer = styled(Button)({
  padding: 0,
  color: "#111",
  ":hover": {
    // backgroundColor : '#f00'
  },
});

function Dashboard() {
  const [open, setOpen] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);
  // const boards = useAppSelector((state) => state.boards);
  // TODO (ritesh) handle default board state
  const [boards, setBoards] = useState([{ boardTitle: "", createdAt: "", creatorId: "", updatedAt: "", _id: "" }]);
  useEffect(() => {
    const getBoards = async () => {
      try {
        const boardsRes = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/${user.userId}/boards`);
        setBoards(boardsRes.data.data.boards);
        // TODO display error on screen
      } catch (error) {
        console.log(error);
        // TODO display error on screen
      }
    };

    getBoards();
  }, [boards]);

  // TODO (Ved) Board deleted karke koi popup ya alert daal de
  const deleteBoard = async (boardId: any) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/board/${boardId}`, { withCredentials: true })
      console.log(res)

    } catch (error) {
      console.log(error)

    }
  }

  // TODO board delete button
  return (
    <Container>
      <HeaderText>
        <Typography variant="h5">
          <b>My Boards</b>
        </Typography>
        <Button
          style={{ textTransform: "none" }}
          onClick={() => setOpen(true)}
          variant="contained"
        >
          <AddIcon /> Create new
        </Button>
      </HeaderText>

      {boards.length !== 0 ? (
        boards.map((board) => (
          <Boards key={board._id}>
            <div style={{ padding: 15 }}>
              <Typography variant="h6">
                <b>{board.boardTitle}</b>
              </Typography>
              <Typography
                style={{ color: "#726767", fontSize: "0.8rem" }}
                variant="subtitle2"
              >
                {" "}
                Date Created : <b>Fri Jul 12 2024</b>
              </Typography>
            </div>
            <IconContainer>
              <DeleteOutlineIcon onClick={() => deleteBoard(board._id)} />
            </IconContainer>
          </Boards>
        ))
      ) : (
        <Boards>
          <div style={{ padding: 15 }}>
            <Typography variant="h6">
              <b>Intro board</b>
            </Typography>
            <Typography
              style={{ color: "#726767", fontSize: "0.8rem" }}
              variant="subtitle2"
            >
              {" "}
              Date Created : <b>Fri Jul 12 2024</b>
            </Typography>
          </div>
          <IconContainer>
            <DeleteOutlineIcon />
          </IconContainer>
        </Boards>
      )}
      <CreateBoard open={open} setOpen={setOpen} />
    </Container>
  );
}

export default Dashboard;
