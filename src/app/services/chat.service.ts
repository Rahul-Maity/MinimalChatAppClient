import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Message } from '../models/message.model';
import { MessagePayload } from '../models/sendMessage.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:5039/api/messages';


  constructor(private http: HttpClient) { }
  getMessages(userId: string, before?: Date, count: number = 20, sort: string = 'asc'): Observable<{ messages: Message[] }> {
    // Create HttpParams object
    let params = new HttpParams()
      .set('userId', userId)
      .set('count', count.toString())
      .set('sort', sort);

    // Add 'before' parameter if it is provided
    if (before) {
      params = params.set('before', before.toISOString());
    }

    // Perform GET request
    return this.http.get<{ messages: Message[] }>(this.apiUrl, { params });
  }


  // Method to send a message
  sendMessage(messagePayload: MessagePayload): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, messagePayload, { headers })
      .pipe(
        catchError(this.handleError('sendMessage'))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


}
