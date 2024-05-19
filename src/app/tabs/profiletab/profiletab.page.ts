import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IonicModule, ViewDidEnter, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';
import { PopUpService } from 'src/services/popup.service';
import { CommonModule } from '@angular/common';
import { User } from 'src/classes/user';
import { MatCardModule } from '@angular/material/card';
@Component({ 
  selector: 'app-profile',
  templateUrl: 'profiletab.page.html',
  styleUrls: ['profiletab.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, MatCardModule],
})

export class ProfilePage implements OnInit {
  user!: User;
  loadingDone = false;

  constructor(public userService: UserService, public router: Router, public popUpService: PopUpService)
  {}

  async ngOnInit(): Promise<void>
  {
    await this.loadProfileDetails();

    this.loadingDone = true;
  }

  async signOut()
  {
    this.popUpService.loadingPopUp("Logging out");
  
    if (await this.userService.signUserOut())
    {
      this.router.navigate(['']);
    }
    
    await this.popUpService.dismissPopUp();
  }

  async deleteAcc()
  {
    this.popUpService.loadingPopUp("Deleting");
  
    if (await this.userService.deleteAcc())
    {
      this.router.navigate(['']);
    }
    
    await this.popUpService.dismissPopUp();
  }

  async loadProfileDetails()
  {
    let userData = await this.userService.getUserDetails(localStorage.getItem("loggedInID")!);
    const username = userData!["username"];
    const email = userData!["email"];
    this.user = new User(username, email);
  }
}
