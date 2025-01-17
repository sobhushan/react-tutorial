import { useState } from "react";
import styles from "./Alarm.module.css";

function Alarm() {
  const [hour, setHour] = useState<number>(1);
  const [minute, setMinute] = useState<number>(0);
  const [period, setPeriod] = useState<string>("AM");
  const [alarms, setAlarm] = useState<{ hour: number; minute: number; period: string }[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(-1);

  const addAlarm = () => {
    const newAlarm = { hour, minute, period };
    const upList = alarms.concat(newAlarm);
    setAlarm(upList);
    setHour(1);
    setMinute(0);
    setPeriod("AM");
  };

  const deleteAlarm = (index: number) => {
    alarms.splice(index, 1);
    setAlarm([...alarms]); //spread operator to make new array
    console.log("deleting", index);
    console.log("Alarms: ", alarms);
  };

  const filterAlarm = () => {
    if (filter === "All") return alarms;
  
    return alarms.filter((alarm) => {
      let time;
  
      if (alarm.period === "PM" && alarm.hour !== 12) {
        time = alarm.hour + 12;
      } else if (alarm.period === "AM" && alarm.hour === 12) {
        time = alarm.hour - 12;
      } else {
        time = alarm.hour;
      }
  
      if (filter === "Morning") return time >= 6 && time < 12;
      if (filter === "Afternoon") return time >= 12 && time < 18;
      if (filter === "Evening") return time >= 18 && time < 20;
      if (filter === "Night") return time >= 20 || time < 6;
  
      return false;
    });
  };
  
  const saveAlarm = () => {
    if(editIndex != -1){
      alarms[editIndex] = {hour, minute, period};
      setAlarm([...alarms]);
    }
    setShowModal(false);
    setHour(1);
    setMinute(0);
    setPeriod("AM");
  }

  return (
    <>
      <div className="container mt-5">
        <div className="col">
          {/* Left Side: Set Alarm */}
          <div className="row">
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="text-center mb-4">Set Alarm</h3>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  {/* Hour Input */}
                  <div>
                    <label htmlFor="hour" className="form-label">
                      Hour
                    </label>
                    <input
                      type="number"
                      id="hour"
                      className="form-control"
                      // using Css module
                      // className={`form-control ${styles.input}`}
                      value={hour}
                      min="1"
                      max="12"
                      onChange={(e) =>
                        setHour(Math.max(1, Math.min(12, Number(e.target.value))))
                      }
                    />
                  </div>
                  {/* Minute Input */}
                  <div>
                    <label htmlFor="minute" className="form-label">
                      Minute
                    </label>
                    <input
                      type="number"
                      id="minute"
                      className="form-control"
                      value={minute}
                      min="0"
                      max="59"
                      onChange={(e) =>
                        setMinute(
                          Math.max(0, Math.min(59, Number(e.target.value)))
                        )
                      }
                    />
                  </div>
                  {/* AM/PM Dropdown */}
                  <div>
                    <label htmlFor="period" className="form-label">
                      AM/PM
                    </label>
                    <select
                      id="period"
                      className="form-select"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                <div className="d-grid col-3 mx-auto">
                  <button className="btn btn-primary w-20" onClick={addAlarm}>
                    Set Alarm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          {/* Right Side */}
          <div className="row">
            {/* using css module */}
            <div className="card border-primary shadow-sm">
            {/* <div className={`card border-primary shadow-sm ${styles.card}`}> */}
              <div className="card-body">
                <h3 className="text-center mb-4">Saved Alarms</h3>
                {/* Filter Options */}
                <div className="mb-3">
                    <select
                      className="form-select"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                    </select>
                  </div>
                {filterAlarm().length === 0 ? (
                  <p className="text-center">No alarms set</p>
                ) : (
                  <ul className="list-group">
                    {filterAlarm().map((alarm, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {`${alarm.hour}:${alarm.minute
                          .toString()
                          .padStart(2, "0")} ${alarm.period}`}
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <button
                            className="btn btn-warning me-md-2"
                            type="button"
                            onClick={() => {
                              setEditIndex(index)
                              setShowModal(true)}}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => deleteAlarm(index)}
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bootstrap Modal for Editing Alarm */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Alarm</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="edit-hour" className="form-label">
                    Hour
                  </label>
                  <input
                    type="number"
                    id="edit-hour"
                    className="form-control"
                    value={hour}
                    min="1"
                    max="12"
                    onChange={(e) =>
                      setHour(Math.max(1, Math.min(12, Number(e.target.value))))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-minute" className="form-label">
                    Minute
                  </label>
                  <input
                    type="number"
                    id="edit-minute"
                    className="form-control"
                    value={minute}
                    min="0"
                    max="59"
                    onChange={(e) =>
                      setMinute(Math.max(0, Math.min(59, Number(e.target.value))))}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit-period" className="form-label">
                    AM/PM
                  </label>
                  <select
                    id="edit-period"
                    className="form-select"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveAlarm}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    
  );
}
export default Alarm;