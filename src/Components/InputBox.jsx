import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputBox({placeholder,onChange}) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { width: '100%' } }}
      noValidate
      autoComplete="off"
    >
      <TextField label={placeholder} variant="outlined" required onChange={(event) => onChange(event.target.value)}/>
    </Box>
  );
}
