import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pet } from './pet'

@Injectable({
    providedIn: 'root'
})

export class PetService {
    private apiServerUrl = '';

    constructor(private http: HttpClient) {}

    public getPets(): Observable<Pet[]>{
        return this.http.get<Pet[]>(`${this.apiServerUrl}/pet/all`);
    }

    public addPet(pet: Pet): Observable<Pet>{
        return this.http.post<Pet>(`${this.apiServerUrl}/pet/add`, pet);
    }

    public updatePet(pet: Pet): Observable<Pet>{
        return this.http.put<Pet>(`${this.apiServerUrl}/pet/edit`, pet);
    }

    public deletePet(petId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/pet/delete/${petId}`);
    }

}