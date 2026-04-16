import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';

import { environment } from '../../../../../environments';
import { Tab } from '../../../../shared/models/tab.type';
import { SignalsQuiz, SignalsTopic } from '../../models/signals.types';
import { SignalsService } from '../../services/signals.service';


@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss',
  imports: [CommonModule],
})
export class SignalsComponent {
  private signalsService = inject(SignalsService);

  topics = signal<SignalsTopic[]>([]);
  loading = signal<boolean>(false);

  activeTab = signal<Tab>('topics');
  searchTerm = signal<string>('');

  filteredTopics = signal<SignalsTopic[]>([]);

  expandedIndex = signal<number | null>(null);

  quizzes = signal<SignalsQuiz[]>([]);
  
  selectedAnswers = signal<Record<number, number>>({});
  revealedQuizzes = signal<Record<number, boolean>>({});

  constructor() {

    effect(() => {
      const term = this.searchTerm().toLowerCase();
      this.filteredTopics.set(this.topics().filter((t) => t.title.toLowerCase().includes(term)));
    });

  }

  ngOnInit(): void {
    this.loading.set(true);
    this.getTopics();
    this.getQuizzes();
  }

  getTopics() {
    this.signalsService.getTopics().subscribe({
      next: (topics) => {
        this.topics.set(topics);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  getQuizzes() {
    this.signalsService.getQuizzes().subscribe({
      next: (quizzes) => {
        this.quizzes.set(quizzes);
      },
      error: (err) => {
        console.error('Failed to load quizzes', err);
      },
    });
  }

  selectTab(tab: Tab): void {
    this.activeTab.set(tab);
  }

  updateSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  toggle(index: number): void {
    this.expandedIndex.set(this.expandedIndex() === index ? null : index);
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex() === index;
  }

  selectAnswer(quizIndex: number, optionIndex: number): void {
    this.selectedAnswers.update((prev) => ({ ...prev, [quizIndex]: optionIndex }));
  }

  revealExplanation(quizIndex: number): void {
    this.revealedQuizzes.update((prev) => ({ ...prev, [quizIndex]: true }));
  }

  isAnswered(quizIndex: number): boolean {
    return this.selectedAnswers()[quizIndex] !== undefined;
  }

  isCorrect(quizIndex: number): boolean {
    return this.selectedAnswers()[quizIndex] === this.quizzes()[quizIndex]?.correctIndex;
  }
}
