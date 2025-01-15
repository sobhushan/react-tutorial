import { useState } from "react";

function Alarm() {
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState("AM");
  const [alarms, setAlarm] = useState<{ hour: number; minute: number; period: string }[]>([]);
  
  const addAlarm = () =>{
    const newAlarm = {hour, minute, period};
    const upList = alarms.concat(newAlarm);
    setAlarm(upList);
    setHour(1);
    setMinute(0);
    setPeriod("AM");
  }

  const deleteAlarm = (index:number) =>{
    alarms.splice(index,1);
    setAlarm([...alarms]);
    console.log("deleting",index);
    console.log("Alarms: ",alarms);
  }

  // const deleteAlarm = (index:number) =>{
  //   const postDel = alarms.filter((_,i) => i !== index);
  //   setAlarm(postDel);
  //   console.log("deleting",index);
  //   console.log("Alarms: ",alarms);
  // };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Side: Set Alarm */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Set Alarm</h3>
              <div className="d-flex align-items-center justify-content-between mb-3">
                {/* Hour Input */}
                <div>
                  <label htmlFor="hour" className="form-label" >
                    Hour
                  </label>
                  <input
                    type="number"
                    id="hour"
                    className="form-control"
                    value={hour}
                    min="1"
                    max="12"
                    onChange={(e) => setHour(Math.max(1, Math.min(12, Number(e.target.value))))}
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
                    onChange={(e) => setMinute(Math.max(0, Math.min(59, Number(e.target.value))))}
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
              <button className="btn btn-primary w-100" onClick={addAlarm}>
                Set Alarm
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">Saved Alarms</h3>
              {alarms.length === 0 ? (
                <p className="text-center">No alarms set</p>
              ) : (
                <ul className="list-group">
                  {alarms.map((alarm, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {`${alarm.hour}:${alarm.minute.toString().padStart(2,"0")} ${alarm.period}`}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteAlarm(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Alarm;
