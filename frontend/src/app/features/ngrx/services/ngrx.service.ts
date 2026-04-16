import { inject, Injectable } from "@angular/core";
import { ApiService } from "../../../shared/services/api.service";
import { NgrxQuiz } from "../models/ngrx.types";

@Injectable({
  providedIn: "root",
})
export class NgrxService {
  
    private apiService = inject(ApiService);

    getQuizzes() {
        return this.apiService.get<NgrxQuiz[]>(`ngrx/quizzes`);
    }

}