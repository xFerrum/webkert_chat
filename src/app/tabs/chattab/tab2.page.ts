import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Message } from 'src/classes/message';
import { ChatService } from 'src/services/chat.service';
import { UserService } from 'src/services/user.service';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MatListModule, MatButtonModule]
})
export class Tab2Page implements OnInit
{
  message: String = '';
  messages: Array<Message>;
  username!: String;
  loadingDone = false;

  constructor(private chatService: ChatService, private userService: UserService)
  {
    this.messages = [];
    this.chatService.joinRoom('main', this.messages);
  }

  sendClicked()
  {
    if (this.message !== '')
    {
      this.chatService.sendMessage(this.message, this.username);
      this.message = '';
    }
  }

  async ngOnInit()
  {
    this.username = (await this.userService.getUserDetails(localStorage.getItem("loggedInID")!))["username"];
    this.loadingDone = true;
  }
}
