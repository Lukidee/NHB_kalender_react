import React, { Component } from 'react'
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
    currentDate: {
      day: 10,
      dayName: "do",
      dayNumber: 41906,
      month: 2,
      monthName: "februari",
      monthMaxDays: 32,
      year: 2021
    },
    currentMonth: ''
  }

  constructor() {
    super()
    this.createDateTable()
    this.initializeMonth()
  }

  /**
   * Creates an array of date objects
   */
  createDateTable = () => {
    let dayNumber = 0
    // years
    for (let y = this.startCalendarFrom; y < this.endCalendarAt; y++) {
        // months
        for (let m = 1; m <= 11; m++) {
            // days
            const evenOrOdd = m % 2 ? 0 : 1;
            for (let d = 1; d <= (31 + evenOrOdd); d++) {
                const mn = this.monthNames[(m - 1) % 11]
                const dn = this.dayNames[dayNumber % 7]
                const date = {
                  day: d,
                  month: m,
                  year: y,
                  dayName: dn,
                  monthName: mn,
                  monthMaxDays: 31 + evenOrOdd,
                  dayNumber: dayNumber
                }
                this.dateTable.push(date);
                dayNumber++
            }
        }
    }
  }

  initializeMonth() {
    const initialMonth = this.getCurrentMonth(this.state.currentDate.dayNumber)
    if (this.state.currentMonth === '') {
      let newState = this.state
      newState.currentMonth = initialMonth
      this.setState(newState)
    }
  }

  /**
   * 
   * @param {*} day 
   */
  getCurrentMonth = (dayNumber) => {
    const month = this.dateTable[dayNumber].month
    let startOffset = 0
    while (this.dateTable[dayNumber].month === month) {
      dayNumber--
    }
    dayNumber++
    if (this.dateTable[dayNumber].dayName !== 'zo') {
      while (this.dateTable[dayNumber].dayName !== 'zo') {
        dayNumber--
        startOffset--
      }
    }
    const startDate = this.dateTable[dayNumber].dayNumber
    const daysShown = startOffset < -3 ? 41 : 34
    let currentMonthDays = this.dateTable.filter(date => (date.dayNumber >= startDate && date.dayNumber <= startDate + daysShown ))
    return currentMonthDays
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
    for (let y = this.startCalendarFrom; y <= year; y++) {
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
    const isCollapsed = this.state.collapsed ? false : true
    let newState = this.state
    newState.collapsed = isCollapsed
    this.setState(newState)
  }

  changeDate = (change) => {
    const newState = this.state
    switch (change.target.name) {
      case 'day':
        newState.currentDate.day = parseInt(change.target.value)
        break
      case 'month':
        newState.currentDate.month = parseInt(change.target.value)
        newState.currentDate.monthName = this.monthNames[change.target.value - 1]
        if (newState.currentDate.day === 32) {
          newState.currentDate.day--
        }
        break
      case 'year':
        newState.currentDate.year = parseInt(change.target.value)
        break
      default:
    }
    const dayNumber = this.getDayNumber(newState.currentDate.day, newState.currentDate.month, newState.currentDate.year)
    newState.currentDate.dayNumber = dayNumber
    newState.currentMonth = this.getCurrentMonth(dayNumber)
    this.setState(newState)
  }

  changeMonth = (direction) => {
    const newState = this.state
    newState.currentDate.month += direction
    if (newState.currentDate.month < 1) {
      newState.currentDate.month = 11
      newState.currentDate.year -= 1
    }
    if (newState.currentDate.month > 11) {
      newState.currentDate.month = 1
      newState.currentDate.year += 1
    }
    if (newState.currentDate.day === 32) {
      newState.currentDate.day--
    }
    newState.currentDate.monthName = this.monthNames[newState.currentDate.month - 1]
    const dayNumber = this.getDayNumber(newState.currentDate.day, newState.currentDate.month, newState.currentDate.year)
    newState.currentDate.dayNumber = dayNumber
    newState.currentMonth = this.getCurrentMonth(dayNumber)
    this.setState(newState)
  }

  changeYear = (direction) => {
    const newState = this.state
    newState.currentDate.year += direction
    const dayNumber = this.getDayNumber(newState.currentDate.day, newState.currentDate.month, newState.currentDate.year)
    newState.currentDate.dayNumber = dayNumber
    newState.currentMonth = this.getCurrentMonth(dayNumber)
    this.setState(newState)
  }

  selectDay = (day) => {
    const newState = this.state
    if (day.target.classList[1] === 'other-month' && parseInt(day.target.innerHTML) > 15) {
      this.changeMonth(-1)
    }
    if (day.target.classList[1] === 'other-month' && parseInt(day.target.innerHTML) < 15) {
      this.changeMonth(1)
    }
    newState.currentDate.day = parseInt(day.target.innerHTML)
    this.setState(newState)
  }

  render() {
    return (
      <div id="calendar">
        <h1 className="site-title"><span>Kalender</span></h1>
        <Topbar 
          currentDate={this.state.currentDate} 
          onChangeDate={this.changeDate} 
          onToggle={this.toggleCalendar} 
        />
        <CalendarContents 
          currentDate={this.state.currentDate} 
          isCollapsed={this.state.collapsed} 
          currentMonth={this.state.currentMonth} 
          onChangeDate={this.changeDate} 
          onChangeMonth={this.changeMonth} 
          onChangeYear={this.changeYear} 
          onSelectDay={this.selectDay}
        />
      </div>
    )
  }
}
