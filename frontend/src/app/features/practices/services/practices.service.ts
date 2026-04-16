import { inject, Injectable } from "@angular/core";

import { ApiService } from "../../../shared/services/api.service";
import { PracticeCategoryDetails, PracticeCategorySummary } from "../models/practices.types";

@Injectable({
    providedIn: "root",
})
export class PracticesService {

    private apiService = inject(ApiService);

    getCategories() {
        return this.apiService.get<PracticeCategorySummary[]>(`practices/categories`);
    }

    getCategoryBySlug(slug: string) {
        return this.apiService.get<PracticeCategoryDetails>(`practices/categories/${slug}`);
    }
}