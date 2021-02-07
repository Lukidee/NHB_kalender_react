import React from 'react'

const Topbar = ({currentDate, onChangeDate, onToggle}) => {
    return (
        <section id="topbar" className="calendar-section topbar">
            <div className="date-select subsection">
                <h2 className="date-heading">Ingangsdatum</h2>
                <span className="date">
                    <input 
                        type="number" 
                        min="1" 
                        max={currentDate.monthMaxDays} 
                        step="1" 
                        value={currentDate.day} 
                        name="day" 
                        className="day" 
                        onChange={onChangeDate} 
                    /> –
                    <input 
                        type="number" 
                        min="1" 
                        max="11" 
                        step="1" 
                        value={currentDate.month} 
                        name="month" 
                        className="month" 
                        onChange={onChangeDate} 
                    /> –
                    <input 
                        type="number" 
                        min="1" 
                        max="2200" 
                        step="1" 
                        value={currentDate.year} 
                        name="year" 
                        className="year" 
                        onChange={onChangeDate} 
                    />
                </span>
            </div>
            <div className="toggle-contents-button subsection" onClick={onToggle}>
                <span className="material-icons icon">date_range</span>
            </div>
        </section>
    )
}

export default Topbar
