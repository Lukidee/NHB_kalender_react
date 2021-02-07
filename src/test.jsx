import React from 'react'
import {useState} from 'react'
import Topbar from './components/Topbar'
import CalendarContents from './components/CalendarContents'
import './styles/Main.css'
import { render } from 'react-dom'

export default class Calendar extends Component {
  // properties
  startCalendarFrom = 1900
  endCalendarAt = 2200
  dayNames = ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za']
  monthNames = [
      'januari', 
      'februari', 
      'maart', 
      'april', 
      'mei', 
      'juni', 
      'juli', 
      'augustus', 
      'september', 
      'oktober', 
      'november'
  ]
  dateTable = []

  // state
  state = {
    collapsed: true,
    currentDay: {
      day: 10,
      dayName: "do",
      dayNumber: 41906,
      month: 2,
      monthName: "februari",
      year: 2021
    },
    currentMonth: ''
  }

  constructor() {
    initialMonth = getCurrentMonth(currentDate.dayNumber)
    if (currentMonth === '') {
      setCurrentMonth(initialMonth)
    }
  }

  /**
   * 
   * @param {*} day 
   */
  getCurrentMonth = (day) => {
    const month = dateTable[day].month
    let startOffset = 0
    while (dateTable[day].month === month) {
      day--
    }
    day++
    if (dateTable[day].dayName !== 'zo') {
      while (dateTable[day].dayName !== 'zo') {
        day--
        startOffset--
      }
    }
    const startDate = dateTable[day].dayNumber
    const daysShown = startOffset < -4 ? 41 : 34
    let currentMonthDays = dateTable.filter(date => (date.dayNumber >= startDate && date.dayNumber <= startDate + daysShown ))
    return currentMonthDays
  }

  /**
   * Creates an array of date objects
   */
  createDateTable = () => {
    let dayNumber = 0
    // years
    for (let y = startCalendarFrom; y < endCalendarAt; y++) {
        // months
        for (let m = 1; m <= 11; m++) {
            // days
            const evenOrOdd = m % 2 ? 0 : 1;
            for (let d = 1; d <= (31 + evenOrOdd); d++) {
                const mn = monthNames[(m - 1) % 11]
                const dn = dayNames[dayNumber % 7]
                const date = {
                  day: d,
                  month: m,
                  year: y,
                  dayName: dn,
                  monthName: mn,
                  dayNumber: dayNumber
                }
                dateTable.push(date);
                dayNumber++
            }
        }
    }
  }

  /**
   * 
   * @param {*} day 
   * @param {*} month 
   * @param {*} year 
   */
  getDayNumber = (day, month, year) => {
    let dayNumber = 0;
    // years
    for (let y = startCalendarFrom; y <= year; y++) {
        // months
        for (let m = 1; m <= 11; m++) {
            // days
            const evenOrOdd = m % 2 ? 0 : 1;
            for (let d = 1; d <= (31 + evenOrOdd); d++) {
                if (d === day && m === month && y === year) {
                    return dayNumber;
                }
                dayNumber++;
            }
        }
    }
  }

  toggleCalendar = () => {
    const isCollapsed = collapsed ? false : true
    toggleCollapsed(isCollapsed)
  }

  changeCurrentDate = () => {
    console.log('changing date')
  }

  changeDay = (change) => {
    console.log('day', change.target.value)
  }

  changeMonth = (change) => {
    // console.log('month', change.target.value)
    const newDate = currentDate
    newDate.month = change.target.value
    setCurrentDate(newDate)
    console.log(currentDate)
  }

  changeYear = (change) => {
    console.log('year', change.target.value)
  }

  createDateTable()
  // console.log(dateTable)

  render() {
    return (
      <div id="calendar">
        <h1 className="site-title"><span>Kalender</span></h1>
        <Topbar 
          currentDate={currentDate} 
          onToggle={toggleCalendar} 
          onChangeCurrentDate={changeCurrentDate} 
          onChangeDay={changeDay} 
          onChangeMonth={changeMonth} 
          onChangeYear={changeYear} 
        />
        <CalendarContents currentDate={currentDate} isCollapsed={collapsed} currentMonth={currentMonth} />
      </div>
    )
  }
}

