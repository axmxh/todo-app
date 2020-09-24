import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  month;
  day;
  dayNo;
  year;
  date = new Date();
  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  constructor() {
    this.dayNo = this.date.getDate();
    this.day = this.days[this.date.getDay()];
    this.month = this.months[this.date.getMonth()];
    this.year = this.date.getFullYear();
  }

  ngOnInit(): void {}
}
