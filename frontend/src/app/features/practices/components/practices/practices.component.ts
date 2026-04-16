import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { PracticesService } from '../../services/practices.service';
import { PracticeCategoryDetails, PracticeCategorySummary } from '../../models/practices.types';
import { HeaderComponent } from '../../../../layout/header/header.component';

@Component({
  selector: 'app-practices',
  imports: [CommonModule,HeaderComponent],
  templateUrl: './practices.component.html',
  styleUrl: './practices.component.scss',
})
export class PracticesComponent implements OnInit {

  private practicesService = inject(PracticesService);

  loading = false;
  errorMessage = '';

  categories: PracticeCategorySummary[] = [];
  openedCategorySlugs = new Set<string>();
  categoryDetails: Record<string, PracticeCategoryDetails> = {};

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.loading = true;
    this.errorMessage = '';

    this.practicesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories.sort((a: PracticeCategorySummary, b: PracticeCategorySummary) => a.orderIndex - b.orderIndex);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load categories';
        this.loading = false;
      }
    });
  }


  toggleCategory(slug: string): void {
    if (this.openedCategorySlugs.has(slug)) {
      this.openedCategorySlugs.delete(slug);
      return;
    }

    this.openedCategorySlugs.add(slug);

    if (this.categoryDetails[slug]) {
      return;
    }

    this.getCategoryDetails(slug);

  }

  getCategoryDetails(slug: string) {
    this.practicesService.getCategoryBySlug(slug).subscribe({
      next: (details) => {
        this.categoryDetails[slug] = details;
      },
      error: () => {
        this.errorMessage = `Failed to load details for category ${slug}`;
        this.openedCategorySlugs.delete(slug);
      }
    });
  }

  isOpen(slug: string): boolean {
    return this.openedCategorySlugs.has(slug);
  }

  getDetails(slug: string): PracticeCategoryDetails | null {
    return this.categoryDetails[slug] ?? null;
  }
}
