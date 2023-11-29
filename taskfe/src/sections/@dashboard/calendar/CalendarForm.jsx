import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { TextField, DialogContent, Grid, MenuItem, Stack, Tooltip, IconButton, FormControlLabel, Switch } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react';
import Iconify from '../../../components/iconify';
import moment from 'moment';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  {
    label: 'Việc nhà',
    color: '#00AB55'
  },
  {
    label: 'Nghỉ ngơi',
    color: '#FF4842'
  },
  {
    label: 'Cuộc gặp',
    color: '#1890FF'
  },
  {
    label: 'Ăn uống',
    color: '#54D62C'
  },
  {
    label: 'Công việc',
    color: '#FFC107'
  },
  {
    label: 'Học tập',
    color: '#04297A'
  },
  {
    label: 'Quan trọng',
    color: '#7A0C2E'
  }
];

// ----------------------------------------------------------------------

CalendarForm.propTypes = {
  event: PropTypes.object,
};

export default function CalendarForm({ event }) {
  const [eventCur, setEventCur] = useState({
    title: event ? event.title : '',
    description: event ? event.description : '',
    color: event ? event.color : '#00AB55',
    allDay: event ? event.allDay : false,
    start: event ? event.start : moment().valueOf(),
    end: event ? event.end : moment().add('hours', 1).valueOf(),
    repeat: event ? event.repeat : 'NONE',
    alert: event ? event.alert : 'NONE',

  })

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [eventColor, setEventColor] = React.useState('#00AB55');

  const [allDay, setAllDay] = React.useState(false);

  const onClickAllDay = () => {
    const eventTmp = { ...eventCur, allDay: !allDay };
    setEventCur(eventTmp);
  }

  const onClickColor = (value) => {
    const eventTmp = { ...eventCur, color: value };
    setEventCur(eventTmp);
  }
  const handleChangeValue = (key, value) => {
    const eventTmp = { ...eventCur, [key]: value };
    setEventCur(eventTmp);
  }

  const handleChangeStartDate = (newdate) => {
    setSelectedStartDate(newdate);
    handleChangeValue('start', newdate)
  }

  return (

    <DialogContent sx={{ width: '600px', mt: '4px', }} >
      <Grid container spacing={3} >

        <Grid item xs={12} sm={6} md={12} mt={1}>
          <TextField
            required
            id="outlined-required"
            label="Title"
            defaultValue={eventCur.title}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={12} >
          <FormControlLabel control={<Switch />} label="All day" labelPlacement="start" onClick={onClickAllDay} />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {allDay === false &&
              <DateTimePicker
                label="Starting date"
                defaultValue={dayjs(eventCur.start)}
                sx={{ width: '100%' }}
              /> ||
              <DatePicker
                label="Starting date"
                defaultValue={dayjs(eventCur.start)}
                sx={{ width: '100%' }}
              />
            }

          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {allDay === false &&
              <DateTimePicker
                label="Ending date"
                defaultValue={dayjs(eventCur.end)}
                sx={{ width: '100%' }}
                onAccept={()=>handleChangeValue('start', this.value)}
                value={dayjs(eventCur.end)}
                onChange={setSelectedStartDate}
              /> ||
              <DatePicker
                label="Ending date"
                defaultValue={dayjs(eventCur.end)}
                sx={{ width: '100%' }}
              />
            }
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <TextField
            id="outlined-select-currency"
            select
            label="Repeat"
            defaultValue={eventCur.repeat}
            fullWidth
            onChange={(event)=>handleChangeValue('repeat', event.target.value)}
          >
            <MenuItem value={'NONE'}>None</MenuItem>
            <MenuItem value={'EVERY_DAY'} >Every day</MenuItem>
            <MenuItem value={'EVERY_WEEK'} >Every week</MenuItem>
            <MenuItem value={'EVERY_MONTH'} >Every month</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <TextField
            id="outlined-select-currency"
            select
            label="Alert"
            defaultValue={eventCur.alert}
            fullWidth
          >
            <MenuItem value={'NONE'}>None</MenuItem>
            <MenuItem value={'EVERY_DAY'} >Every day</MenuItem>
            <MenuItem value={'EVERY_WEEK'} >Every week</MenuItem>
            <MenuItem value={'EVERY_MONTH'} >Every month</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={12}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue={eventCur.description}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={12}>

          <Stack direction="row" spacing={0.5}>
            {COLOR_OPTIONS.map((option) => (
              <Tooltip key={option.label} title={option.label}>
                <IconButton
                  value={option.label}
                  onClick={() => onClickColor(option.color)}
                  sx={{ width: 32, height: 32, padding: 0, border: 0, borderRadius: '50%', background: option.color }}
                >
                  {option.color === eventCur.color && <Iconify sx={{ color: '#000' }} icon={'teenyicons:tick-small-outline'} />}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </DialogContent>
  );
}