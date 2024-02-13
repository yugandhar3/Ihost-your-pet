import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import events from './events';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button';

const localizer = momentLocalizer(moment);


const MyCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [host, setHost] = useState()
  const [view, setView] = useState()

  const handleclose = () => {
    setIsModalOpen(false);
  }
  const handleSelect = (e) => {
    setHost(e)
    if (e.title && view !== 'agenda') {
      setIsModalOpen(true);
    }
    else {
      setIsModalOpen(false);
    }
  };
  const handleview = (view) =>{
    if(view == 'agenda'){
      setView(view)
      setIsModalOpen(false)
    }
    else{
      setView(null)
    }
  }

  return (
    <div>
      <Calendar
        selectable
        localizer={localizer}
        timeslots={1}
        step={60}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
        popup={true}
        onSelectEvent={(event) => handleSelect(event)}
        onView={(view) => {handleview(view)}}
      />
      {console.log(isModalOpen)}
      {isModalOpen && host.title &&
        <Popover className='postion'
          open={isModalOpen}
          onClose={false}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography sx={{ p: 2 }}>
            <div className='popover-box'>
              <div className='popover-close-btn'>
                <button onClick={handleclose}><CloseIcon /></button>
              </div>
              <div>
                <h1>{host.title}</h1>
              </div>
              {/* <div className='popover-time'>
                <AccessTimeIcon className='pr-2'/>
                <h4>{moment(host.start).format("ddd, MMM Do YYYY")} {moment(host.start).format('LT')} - {moment(host.end).format('LT')}</h4>
              </div> */}
              <div>
                <p><b>{host.desc}</b></p>
                <Button variant="contained" color="primary">View All</Button>
              </div>

            </div>
          </Typography>
        </Popover>
      }
    </div>
  );
}

export default MyCalendar;

