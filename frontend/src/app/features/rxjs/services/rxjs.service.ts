import { inject, Injectable } from "@angular/core";

import { ApiService } from "../../../shared/services/api.service";
import { RxjsQuiz, RxjsTopic } from "../models/rxjs.types";

@Injectable({
    providedIn: "root",
})
export class RxjsService {
    private apiService = inject(ApiService);

    getTopics() {
        return this.apiService.get<RxjsTopic[]>('rxjs/topics');
    }

    getQuizzes() {
        return this.apiService.get<RxjsQuiz[]>('rxjs/quizzes');
    }

}