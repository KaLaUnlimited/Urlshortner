import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";

export default function BasicButton({ input, setShortUrl, setMessage }) {
  const handleInputSubmit = () => {
    //  API.getShortenUrl =
    axios
      .post("http://localhost:5000/shorten", { longUrl: input })
      .then((res) => {
        setShortUrl(res.data.shortUrl);
      })
      .catch((error) => {
        console.log("error", error);
      });

    console.log("hellos");
  };

  const handleDelete = () =>{
    axios.delete(`http://localhost:5000/shorten`,{data:{longUrl:input}})
    .then(res => {
      console.log(res.data.data,"KKKKK")
      //  setMessage(res.data)
    })
  }
  return (
    <Stack spacing={2} direction="row">
      <Button disabled={!input} onClick={handleInputSubmit} variant="contained">
        Go
      </Button>
      <Button disabled={!input} 
      onClick={handleDelete}
      variant="contained">
        Delete
      </Button>
    </Stack>
  );
}
