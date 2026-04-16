import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTopics } from './ngrx.actions';
import { selectAllTopics, selectLoading } from './ngrx.selectors';
import { NgrxTopic } from '../models/ngrx.types';

@Injectable({
  providedIn: 'root'
})
export class NgrxFacade {
  private readonly store = inject(Store);

  readonly topics$: Observable<NgrxTopic[]> = this.store.select(selectAllTopics);
  readonly loading$: Observable<boolean> = this.store.select(selectLoading);

  loadTopics(): void {
    this.store.dispatch(loadTopics());
  }
}