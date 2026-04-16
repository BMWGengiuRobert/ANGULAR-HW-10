import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map
} from 'rxjs';

import { Tab } from '../../../../shared/models/tab.type';
import { RxjsQuiz, RxjsTopic } from '../../models/rxjs.types';
import { RxjsService } from '../../services/rxjs.service';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss',
  imports: [CommonModule, ReactiveFormsModule],
})
export class RxjsComponent {
  private rxjsService = inject(RxjsService);

  topics: RxjsTopic[] = [];
  filteredTopics: RxjsTopic[] = [];
  quizzes: RxjsQuiz[] = [];

  expandedIndex: number | null = null;

  loading: boolean = false;

  searchControl = new FormControl('');

  selectedAnswers: Record<number, number> = {};
  revealedQuizzes: Record<number, boolean> = {};

  activeTab: Tab = 'topics';

  ngOnInit(): void {
    this.getTopics();
    this.getQuizzes();
    this.onSearchControlChange();
  }

  getTopics() {
    this.loading = true;

    this.rxjsService.getTopics().subscribe({
      next: (topics) => {
        this.topics = topics;
        this.filteredTopics = topics;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load topics', err);
        this.loading = false;
      }
    });
  }

  getQuizzes() {
    this.rxjsService.getQuizzes().subscribe({
      next: (quizzes) => {
        this.quizzes = quizzes;
      },
      error: (err) => {
        console.error('Failed to load quizzes', err);
      }
    });
  }

  onSearchControlChange() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((term) => (term ?? '').toLowerCase()),
        map((lowerTerm) =>
          this.topics.filter((t) => t.title.toLowerCase().includes(lowerTerm)))
      )
      .subscribe((filtered) => {
        this.filteredTopics = filtered;
      });
  }

  selectTab(tab: Tab): void {
    this.activeTab = tab;
  }

  toggle(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }

  selectAnswer(quizIndex: number, optionIndex: number): void {
    this.selectedAnswers[quizIndex] = optionIndex;
  }

  revealExplanation(quizIndex: number): void {
    this.revealedQuizzes[quizIndex] = true;
  }

  isAnswered(quizIndex: number): boolean {
    return this.selectedAnswers[quizIndex] !== undefined;
  }

  isCorrect(quizIndex: number): boolean {
    return this.selectedAnswers[quizIndex] === this.quizzes[quizIndex].correctIndex;
  }
}
