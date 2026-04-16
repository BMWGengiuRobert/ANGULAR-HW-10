import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  sidebarOpen = true;
  activeSidebarItem: string | null = null;

  sidebarSections = [
    { id: 'practices', label: 'Practices', icon: '📋'},
    { id: 'rxjs', label: 'RxJS', icon: '🌊' },
    { id: 'ngrx', label: 'NgRx Store', icon: '🏪' },
    { id: 'signals', label: 'Signals', icon: '⚡' },
  ];

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  selectSidebarItem(id: string): void {
    this.activeSidebarItem = id;
  }

  isSidebarItemActive(id: string): boolean {
    return this.activeSidebarItem === id;
  }

}
