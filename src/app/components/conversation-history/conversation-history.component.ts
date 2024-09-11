import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../../models/message.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { MessagePayload } from '../../models/sendMessage.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-conversation-history',
  templateUrl: './conversation-history.component.html',
  styleUrls: ['./conversation-history.component.css']
})
export class ConversationHistoryComponent implements OnInit, OnDestroy {

  messages: Message[] = [];
  userId!: string;
  before?: Date;
  count: number = 20;
  sort: string = 'asc';
  isLoading: boolean = false;
  private routeSub: Subscription = new Subscription();

  newMessageContent: string = '';
  isSending: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private chatService: ChatService) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId') ?? '';
      this.resetComponentState();
      this.loadMessages();
    });

   
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  private resetComponentState(): void {
    this.messages = [];
    this.before = undefined;
    this.isLoading = false;
  }

  loadMessages(): void {
    if (this.isLoading) return;

    this.isLoading = true;

    this.chatService.getMessages(this.userId, this.before, this.count, this.sort)
      .subscribe((response: { messages: Message[] }) => {
        const newMessages = response.messages;
        this.messages = [...newMessages, ...this.messages];
        if (newMessages.length > 0) {
          this.before = new Date(newMessages[0].timestamp);
        }
        this.isLoading = false;
      });
  }

  onScroll(event: any): void {
    const element = event.target;
    if (element.scrollTop === 0 && !this.isLoading) {
      this.loadMessages();
    }
  }






    sendMessage(): void {


      if (!this.newMessageContent.trim() || this.isSending) return;

      this.isSending = true;

      const messagePayload: MessagePayload = {
        receiverId: this.userId,
        content: this.newMessageContent
      };
      console.log(messagePayload);

      this.chatService.sendMessage(messagePayload)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.messages.push({
              content: response.content,
              timestamp: new Date(response.timestamp)
            });
            this.newMessageContent = '';
          },
          error: (error) => {
            console.error('Message sending failed', error);
            alert('Failed to send message. Please try again.');
          },
          complete: () => {
            this.isSending = false;
          }
        });
    }
  
}
