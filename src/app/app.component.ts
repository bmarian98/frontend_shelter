import { Component, NgModule, OnInit } from '@angular/core';
import { Pet } from './pet/pet';
import { PetService } from './pet.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public pets: Pet[] = [];
  public editPet: Pet | undefined;
  public infoPet: Pet | undefined;

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.getPets();
  }

  public getPets(): void{
    this.petService.getPets().subscribe(
    (response: Pet[]) =>{
      this.pets = response;
    },
    (error: HttpErrorResponse) =>{
      alert(error.message);
    }
    )
  }

  public onAddPet(addForm: NgForm): void{

    var a;
    if((a = document.getElementById('add-pet-form')) !== null){

    a.click();
    this.petService.addPet(addForm.value).subscribe(
      (response: Pet) => {
        console.log(response);
        this.getPets();
        addForm.reset();
      },
      (error: HttpErrorResponse) =>{
        alert(error);
        addForm.reset();
      }
    );
    }
  }

  public onUpdatePet(pet: Pet): void {
    this.petService.updatePet(pet).subscribe(
      (response: Pet) => {
        console.log(response);
        this.getPets();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onOpenModal(pet: Pet | null, mode: string) : void{
    const container = document.getElementById('main-container');
    console.log("container:" + container);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-toggle', 'modal');

    if(mode === 'add'){
      btn.setAttribute('data-target', '#addPetModal');
    }

    if(mode === 'edit'){
      
      if(pet){
      this.editPet = pet;
      }

      btn.setAttribute('data-target', '#editPetModal');
    }

    if(mode === 'info'){
      if(pet){
        this.infoPet = pet;
        }
      btn.setAttribute('data-target', '#infoPetModal');
    }

    if(container !== null)
      container.appendChild(btn);

    btn.click();
  }
}
