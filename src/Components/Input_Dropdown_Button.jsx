import React from "react";
import { TextField, Stack, Autocomplete } from "@mui/material";

export default function Input_Dropdown_Button({ data, placeholder, width, type,onChange}) {
  return (
    <Stack spacing={2} sx={{ width }}>
      <Autocomplete
        options={data}
        getOptionLabel={(option) => option.title}
        onChange={(event, newValue) => {
          onChange(newValue ? newValue.title : "");
        }}
        renderOption={(props, option) => (
          <div {...props} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "15px"}}>
            <img 
              src={option.logo} 
              alt={option.title} 
              width="30" 
              height="30" 
              style={{  objectFit: "cover" }} 
            />
            <div>
              <div style={{fontSize: "16px", fontWeight: "bold" }}>{option.title}</div>
              <div style={{fontSize: "14px", color: "gray" }}>{option.subtitle}</div>
            </div>
          </div>
        )}
        sx={{ "& .MuiAutocomplete-popupIndicator": { display: "none" } }}
        renderInput={(params) =>
          <TextField {...params} 
          label={placeholder} 
          type={type}
          />}
      />
    </Stack>
  );
}
