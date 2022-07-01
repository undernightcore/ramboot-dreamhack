import { Injectable } from '@angular/core';
import { Appwrite, Models } from 'appwrite';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entry } from '../interfaces/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  protected appwrite: Appwrite;

  constructor() {
    this.appwrite = new Appwrite();
    this.appwrite.setEndpoint(environment.appwrite_url);
    this.appwrite.setProject(environment.appwrite_project)
  }

  create(entry: Entry): Observable<Models.Document> {
    return new Observable((subscriber) => {
      this.appwrite.database.createDocument('registros', 'unique()', entry)
        .then((data) => {
          subscriber.next(data);
        })
        .catch(() => {
          subscriber.error();
        })
    })
  }
}
