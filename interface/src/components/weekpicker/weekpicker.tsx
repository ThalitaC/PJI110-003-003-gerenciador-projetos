import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function WeekPicker({ value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(null);
  const [lastDayOfWeek, setLastDayOfWeek] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFirstDayOfWeek(getFirstDayOfWeek(date));
    setLastDayOfWeek(getLastDayOfWeek(date));
    onChange(date);
  };

  const getFirstDayOfWeek = (date) => {
    const firstDay = new Date(date);
    firstDay.setDate(firstDay.getDate() - firstDay.getDay() + 1);
    return firstDay;
  };

  const getLastDayOfWeek = (date) => {
    const lastDay = new Date(date);
    lastDay.setDate(lastDay.getDate() - lastDay.getDay() + 7);
    return lastDay;
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
    return date.toLocaleDateString('pt-BR', options);
  };

  const inputValue =
    firstDayOfWeek && lastDayOfWeek
      ? `${formatDate(firstDayOfWeek)} - ${formatDate(lastDayOfWeek)}`
      : '';

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        showWeekNumbers
        showWeekPicker
        className="form-control"
        value={inputValue}
      />
    </div>
  );
}

export default WeekPicker;