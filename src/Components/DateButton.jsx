import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
function DateButton({placeholder,onChange}) {
  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker 
        label={placeholder} 
        onChange={(newDate) => onChange(newDate ? dayjs(newDate).format("D MMMM YYYY") : "")}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
export default DateButton;
