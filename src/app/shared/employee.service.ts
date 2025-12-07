import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:8000/api/employees';

  constructor(private http: HttpClient) { } 

  getEmployees() {
    return this.http.get(this.url);
  } 

  createEmployee(employee: any) {
    return this.http.post(this.url, employee);
  }
  updateEmployee(employee: any) {
    return this.http.put(this.url + '/' + employee.id, employee);
  }
  deleteEmployee(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

}
