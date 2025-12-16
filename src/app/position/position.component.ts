import { Component } from '@angular/core';
import { PositionService } from '../shared/position.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-position',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']   // ✅ javítva: styleUrls
})
export class PositionComponent {
  positions!: any;
  positionsForm!: FormGroup;   // ✅ típus pontosítva
  showModal = false;
  addMode = true;

  constructor(
    private api: PositionService,
    private builder: FormBuilder
  ) {}

  ngOnInit() {
    this.getPositions();
    this.initForm();   // ✅ csak hívás, definíció külön
  }

  initForm() {
    this.positionsForm = this.builder.group({
      id: [''],
      name: ['']
    });
  }

  getPositions() {
    this.api.getPositions().subscribe({
      next: (res: any) => {
        console.log(res);
        this.positions = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  startshowModal() {
    console.log("Hozzáadás...");
    this.showModal = true;
  }

  cancel() {
    this.showModal = false;
    this.addMode = true;
    this.positionsForm.reset();
  }

  startSave() {
    console.log("Mentés...");
    this.showModal = false;
    if (this.addMode) {
      this.startAddPosition();
    } else {
      this.startUpdatePosition();
    }
  }

  startAddPosition() {
    console.log(this.positionsForm.value);
    const newPositions = {
      name: this.positionsForm.value.name
    };
    this.api.createPosition(newPositions).subscribe({
      next: (res) => {
        console.log(res);
        this.positionsForm.reset();
        this.getPositions();
      }
    });
  }

  startUpdatePosition() {
    this.api.updatePosition(this.positionsForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.getPositions();
      }
    });
  }

  startEdit(position: any) {
    this.addMode = false;
    this.positionsForm.patchValue(position);
    this.showModal = true;
  }

  deletePosition(id: number) {
    this.api.deletePosition(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getPositions();
      }
    });
  }
}
