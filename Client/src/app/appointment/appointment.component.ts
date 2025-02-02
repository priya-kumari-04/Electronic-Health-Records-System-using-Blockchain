import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlockchainService } from 'src/services/blockchain.service';
import { specialities } from '../../utils/Doctor_Specialities';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.sass'],
})
export class AppointmentComponent implements OnInit {
  constructor(
    private blockchainServices: BlockchainService,
    private router: Router
  ) {}

  today = new Date();

  Specialities = specialities;

  showProgress = true;
  progressWarn = false;
  progressMsg = 'Checking if Patient';
  progressSuccess = false;
  buttonTxt = '';

  model: any = {};

  patientID = '';
  DoctorsList: any;

  appointmentTimes: string[] = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', 
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', 
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', 
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM'
  ];

  ngOnInit(): void {
    this.checkIsPatient();

    this.blockchainServices.getDoctors().subscribe((result: any) => {
      console.log(result.data);
      let data = JSON.stringify(result.data);
      this.DoctorsList = JSON.parse(data);
    });
  }

  checkIsPatient() {
    this.blockchainServices
      .checkIsPatient()
      .then((r: any) => {
        console.log(r);
        this.patientID = this.blockchainServices.account;
        this.showProgress = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.progressWarn = true;
        this.progressMsg =
          'Only patients can book appointments. If you are not registered, please register.';
        this.buttonTxt = 'Register';
      });
  }

  onRegister() {
    this.router.navigate(['register']);
  }

  addAppointment() {
    this.showProgress = true;
    this.progressMsg = 'Adding Appointment';
    this.progressWarn = false;
    if (
      this.model.docID == '' ||
      this.model.patientID == '' ||
      this.model.department == '' ||
      this.model.date == '' ||
      this.model.time == ''
    ) {
      this.progressMsg = 'Please fill all the fields';
      this.progressWarn = true;
      return;
    }
    let data = new FormData();

    data.append('docID', this.model.docID);
    data.append('patID', this.patientID);
    data.append('department', this.model.department);
    data.append('date', this.model.date);
    data.append('time', this.model.time);

    this.blockchainServices.addAppointment(data).then((r: any) => {
      console.log(r);
      if (r.status === 'success') {
        this.progressMsg = 'Appointment added successfully';
        this.progressSuccess = true;
        this.model = {};
      }
    });
  }

  close() {
    this.showProgress = false;
  }
}
