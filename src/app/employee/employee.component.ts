import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { NgClass } from '@angular/common';
import { PositionService } from '../shared/position.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']   
})
export class EmployeeComponent {
  employees: any;
  positions: any;
  employeeForm!: FormGroup;  
  addMode = true;
  showModal = false;

  constructor(
    private employeeService: EmployeeService,
    private positionService: PositionService,   
    private formBuilder: FormBuilder           
  ) {}

  ngOnInit() {
    this.getEmployees();
    this.getPositions();
    this.initEmployeeForm();
  }
  
  initEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      id: [''],
      name: [''],
      city: [''],
      salary: [''],
      positionId: ['']
    });
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        console.log(res);
        this.employees = res.data;
      },
     
  });
}
getPositions() {
  this.positionService.getPositions().subscribe({
    next: (res: any) => {
      console.log(res)
      this.positions = res.data
    }
  });

}

  startShowModal() {
    this.showModal = true;
  }

  cancel() {
    this.showModal = false;
    this.employeeForm.reset();
  }

  startSave() {
    if(this.addMode) {
      this.startAddEmployee
    }else {
      this.startUpdateEmployee();
    }
  }

  startAddEmployee() {
    const newEmployee = {
      name: this.employeeForm.value.name,
      city: this.employeeForm.value.city,
      salary: this.employeeForm.value.salary,
      positionId: this.employeeForm.value.positionId
    }
    this.employeeService.createEmployee(newEmployee).subscribe({
      next : (res: any) => {
        console.log(res)
        this.employeeForm.reset()
        this.showModal = false;
        this.getEmployees();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
  startUpdateEmployee() {
    console.log('update...');
    this.employeeService.updateEmployee(this.employeeForm.value).subscribe({
      next : (res: any) => {
        console.log(res)
        this.employeeForm.reset();
        this.addMode = true;
        this.showModal = false;
        this.getEmployees();
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  startEdit(employee: any) {
    this.addMode = false;
    this.showModal = true;
    this.employeeForm.patchValue(employee)
  }

  startDeleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getEmployees();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}