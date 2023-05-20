import {Injectable, signal, WritableSignal} from '@angular/core';
import {ChatUserstate, Client} from 'tmi.js';
@Injectable({
  providedIn: 'root'
})
export class TmiService {
  client!: Client;
  messages: WritableSignal<string[]> = signal([]);
  emotes: WritableSignal<string[]> = signal([]);
  constructor() {}

  connect(value: string) {
    this.client = new Client({
      channels: value.split(',')
    });
    this.client.connect().catch(console.log);
  }

  disconnect(): void {
    this.client.disconnect().catch(console.log);
  }

  listen(): void {
    this.client.on('message', this.onMessage.bind(this));
  }

  onMessage(channel: string, state: ChatUserstate, message: string, self: boolean): void {
    this.messages.update((messages) => [...messages, `${state.username}: ${message}`]);
    if(state.emotes) {
      const keys = Object.keys(state.emotes);
      this.emotes.update((emotes) => [...emotes, ...keys]);
    }
  }
}
