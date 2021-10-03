import React, { Fragment } from "react";
import { useHistory } from "react-router";

import useCalendar from "./useCalendar";
import "./Calendar.css";

const Calendar = () => {
  const history = useHistory();
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    daysShort,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar();

  const dateClickHandler = (date) => {
    history.push("/calendar/" + date);
  };
  const dateClickHandlerN = (date) => {};

  const dateM = ["8-9-2021", "10-9-2021"];
  return (
    <Fragment>
      <a>
        <table className="table">
          <thead>
            <tr>
              {daysShort.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(calendarRows).map((cols) => {
              return (
                <tr key={cols[0].date}>
                  {cols.map((col) =>
                    col.date === todayFormatted ? (
                      <td
                        key={col.date}
                        className={`${col.classes} today`}
                        onClick={() => dateClickHandler(col.date)}
                      >
                        {col.value}
                      </td>
                    ) : (
                      <td
                        key={col.date}
                        className={col.classes}
                        onClick={() => dateClickHandlerN(col.date)}
                      >
                        {col.value}
                      </td>
                    )
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </a>

      <center>
        <button className="button" onClick={getPrevMonth}>
          Prev
        </button>
        <button className="button" onClick={getNextMonth}>
          Next
        </button>
      </center>
    </Fragment>
  );
};

export default Calendar;
