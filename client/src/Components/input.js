import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicButton from './BasicButton';

export default function Input() {
const [input, setInput] = useState("");
const [shortUrl, setShortUrl] = useState("");
const [message,setMessage] = useState("");
//const handleInput
console.log("input", input);

    return (
      <Box 
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField 
        id="standard-basic" 
        label="Paste Long Url" 
        variant="standard" 
        value={input}
        onChange={(event)=> setInput(event.target.value)}
        />
        <BasicButton
        setShortUrl={setShortUrl} 
        input={input}
        setMessage = {setMessage}
         />
        { shortUrl && <div> New Url: {shortUrl }</div>}
        { message && <div>{message }</div>}

      </Box>
     
    );
  }