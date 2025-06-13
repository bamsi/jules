import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Provides DatePipe and other common directives

@Component({
  selector: 'app-app-header', // Standard CLI selector prefixing
  standalone: true,
  imports: [CommonModule], // Import CommonModule to make DatePipe available
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.scss']
})
export class AppHeaderComponent implements OnInit {
  currentDate: Date = new Date();
  // Optional: If you want a dynamic title, you can add an @Input here
  // @Input() title: string = 'Dashboard Application';

  constructor() { }

  ngOnInit(): void {
    // The date is set on initialization.
    // For a date that updates every second/minute without page reload,
    // you would need to use setInterval and update this.currentDate,
    // but for a "current date" display, OnInit is usually sufficient.
  }
}
