import { inject, Injectable } from "@angular/core";

import { ApiService } from "../../../shared/services/api.service";
import { SignalsQuiz, SignalsTopic } from "../models/signals.types";

@Injectable({
    providedIn: "root",
})
export class SignalsService {

    private apiService = inject(ApiService);

    getTopics() {
        return this.apiService.get<SignalsTopic[]>(`signals/topics`);
    }

    getQuizzes() {
        return this.apiService.get<SignalsQuiz[]>(`signals/quizzes`);
    }

}