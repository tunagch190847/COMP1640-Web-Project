import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';


interface Profile {
  id?: string;
  fullName?: string;
  gender?: boolean;
  birthday?: Date;
  prPhoneice?: number;
}

interface Account {
  id?: string;
  email?: string;
  password?: string;
  confirmPass?: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ProfileComponent {
  profileDialog: boolean;

  accountDialog: boolean;
  selectedValues: string;
  date: Date;
  Phone: number;
  password: string
  confirmPass: string

  profile: Profile;
  account: Account;
  profileSubmitted: boolean;
  accountSubmitted: boolean;
  uploadedFiles: any[] = [];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }
  openProfile(profile: Profile) {
    this.profile = { ...profile };
    this.profileDialog = true;
  }

  openNew() {
    this.profile = {};
    this.profileSubmitted = false;
    this.profileDialog = true;
  }

  openNewAccount() {
    this.account = {};
    this.accountSubmitted = false;
    this.accountDialog = true;
  }

  openAccount(account: Account) {
    this.account = { ...account };
    this.accountDialog = true;
  }

  hideDialog() {
    this.profileDialog = false;
    this.accountDialog = false;
    this.profileSubmitted = false;
    this.accountSubmitted = false;
  }

}
