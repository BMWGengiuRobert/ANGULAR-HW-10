import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { environment } from "../../../environments";

@Injectable({
    providedIn: "root",
})
export class ApiService {

    private readonly apiBaseUrl = environment.apiBaseUrl;

    private http = inject(HttpClient);

    get<T>(endpoint: string) {
        return this.http.get<T>(`${this.apiBaseUrl}/${endpoint}`);
    }

}