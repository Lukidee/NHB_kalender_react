import React from 'react'

const CalendarContents = ({currentDate, isCollapsed, currentMonth, onChangeDate, onChangeMonth, onChangeYear, onSelectDay}) => {
    return (
        <section id="contents" className={`calendar-section contents ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="date-select subsection">
                <h3 className="date-heading">Ingangsdatum</h3>
                <div className="date-selectors">
                    <span className="month date" name="month">
                        <button 
                            className="previous" 
                            onClick={() => { onChangeMonth(-1) }}
                        >◄</button>
                        <span className="text">{currentDate.monthName}</span>
                        <button 
                            className="next" 
                            onClick={() => { onChangeMonth(1) }}
                        >►</button>
                    </span>
                    <span className="year date" name="year">
                        <button 
                            className="previous" 
                            onClick={() => { onChangeYear(-1) }}
                        >◄</button>
                        <span className="text">{currentDate.year}</span>
                        <button 
                            className="next" 
                            onClick={() => { onChangeYear(1) }}
                        >►</button>
                    </span>
                </div>
            </div>
            <div className="date-table subsection">
                <div className="day-names">
                    <p className="day">Zo</p>
                    <p className="day">Ma</p>
                    <p className="day">Di</p>
                    <p className="day">Wo</p>
                    <p className="day">Do</p>
                    <p className="day">Vr</p>
                    <p className="day">Za</p>
                </div>
                <div className="days">
                    {currentMonth.map(day => 
                        <p 
                        key={day.dayNumber} 
                        className={`day${day.month === currentDate.month ? '' : ' other-month'}${day.day === currentDate.day && day.month === currentDate.month ? ' selected-date' : ''}`}
                        onClick={onSelectDay}>
                            {day.day}
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CalendarContents
