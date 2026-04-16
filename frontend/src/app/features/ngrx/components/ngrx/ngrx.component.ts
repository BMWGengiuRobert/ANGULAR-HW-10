import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loadTopics } from '../../store/ngrx.actions';
import { selectAllTopics, selectLoading } from '../../store/ngrx.selectors';
import { NgrxQuiz, NgrxTopic } from '../../models/ngrx.types';
import { Tab } from '../../../../shared/models/tab.type';
import { NgrxService } from '../../services/ngrx.service';
import { NgrxFacade } from '../../store/ngrx.facade';


@Component({
  selector: 'app-ngrx',
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.scss',
  imports: [CommonModule],
})
export class NgrxComponent implements OnInit {
  private ngrxFacade = inject(NgrxFacade);
  private ngrxService = inject(NgrxService);

  topics$: Observable<NgrxTopic[]> = this.ngrxFacade.topics$;
  loading$: Observable<boolean> = this.ngrxFacade.loading$;

  quizzes: NgrxQuiz[] = [];

  activeTab: Tab = 'concepts';
  
  expandedIndex: number | null = null;

  selectedAnswers: Record<number, number> = {};
  revealedQuizzes: Record<number, boolean> = {};

  ngOnInit(): void {
    this.ngrxFacade.loadTopics();
    this.getQuizzes();
  }

  getQuizzes() {
    this.ngrxService.getQuizzes().subscribe({
      next: (quizzes) => {
        this.quizzes = quizzes;
      },
      error: (err) => {
        console.error('Failed to load quizzes:', err);
      }
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
    return this.selectedAnswers[quizIndex] === this.quizzes[quizIndex]?.correctIndex;
  }
}
