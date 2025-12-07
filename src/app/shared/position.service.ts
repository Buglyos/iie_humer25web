import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  url = 'http://localhost:8000/api/positions/'

  constructor(private http: HttpClient) { }

  getPositions() {
    return this.http.get(this.url);

  }

  createPosition(position:any) {
    return this.http.post(this.url, position);   
  }
updatePosition(position:any) {
  return this.http.put(this.url + '/' + position.id, position);
}

deletePosition(id:any) {
  return this.http.delete(this.url + '/' + id);

}
}
