import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiListService } from '../../services/api-list.service';
import { ToastrService } from 'ngx-toastr';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SidebarComponent,ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  eventForm : FormGroup;
  errorObj: { [key: string]: string } = {};
  previewImages: { url: string}[] = [];
  uid:string = Date.now().toString()
  id: string | null = null; // Set to a value for 'Update Event'
  event: any[]=[]
  

  constructor(private fb: FormBuilder,private eventService:ApiListService,private toast :ToastrService,private storage:Storage,private route:ActivatedRoute) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      venue: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      price: ['', [Validators.required,Validators.pattern('^[0-9]+$')]],
      participantLimit: ['',[Validators.required,Validators.pattern('^[0-9]+$')]],
    });
  }
  
  ngOnInit(): void {
    // params
    this.id=this.route.snapshot.paramMap.get('id')
    // console.log('this.id: ', this.id);
    this.eventService.GetAllEvents().subscribe((res)=>{
      this.event=res
      if(this.id){
        const eventToEdit=this.event.filter(e=>e.id===this.id)[0]
        if (eventToEdit) {
          // Populate the form with the event data
          this.eventForm.patchValue({
            name: eventToEdit.name,
            description: eventToEdit.description,
            date: eventToEdit.date,
            venue: eventToEdit.venue,
            startTime: eventToEdit.startTime,
            endTime: eventToEdit.endTime,
            price: eventToEdit.price,
            participantLimit: eventToEdit.participantLimit,
          });
            // Populate the previewImages array if available
        if (eventToEdit.previewImages) {
          this.previewImages = eventToEdit.previewImages.map((url: string) => ({ url }));
        }
      }
    }
    })
    
  }


  handleFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const uploadPromises:any = [];
      Array.from(files).forEach((file:any) => {
        const filePath = `EventManagementAngular/${file.name}`;
        const storageRef = ref(this.storage, filePath);
        const uploadTask = uploadBytesResumable(storageRef, file);
// Temporary preview
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewImages.push({ url: e.target.result});
          // console.log('this.previewImages: ', this.previewImages);
        };
        reader.readAsDataURL(file);


         // Firebase Storage Upload
         const uploadPromise = new Promise((resolve, reject) => {
         uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Optional: You can track upload progress here.
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error('Upload failed:', error);
            this.toast.error('Failed to upload image');
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
              // console.log('File available at:', downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        )
      })
      // Push the promise to the array
      uploadPromises.push(uploadPromise);
      });
      // Once all uploads complete, replace temporary previews with actual URLs
      Promise.all(uploadPromises)
      .then((urls) => {
        this.previewImages = urls.map((url) => ({ url })); // Replace temporary URLs with Firebase URLs
        // console.log('All files uploaded:', urls);
      })
      .catch((error) => {
        console.error('Some files failed to upload:', error);
      });
    }
  }

  handleRemoveImage(index: number) {
    this.previewImages.splice(index, 1);
  }

  handleSubmit(e:Event){
    e.preventDefault();
    this.errorObj={}
    this.handleValidate()
    if (this.eventForm.valid) {
     const formdata ={...this.eventForm.value,AvailableTickets:this.eventForm.value.participantLimit}
     if(this.previewImages){
       formdata['previewImages'] = this.previewImages.map(image => image.url);
      }

      console.log('formdata: ', formdata);
      if(this.id){
        this.eventService.updateEventById(this.id,formdata).subscribe({
         next:()=>{
          this.toast.success('Event updated successfully')
        },
       error:(err)=>{
         console.error('err: ', err);
       }
     })
      }else{
        this.eventService.createEvent(formdata,this.uid).subscribe({
          next:()=>{
           this.toast.success('Event created successfully')
           this.eventForm.reset();
           this.previewImages = [];
           const imageInput =  document.getElementById('image') as HTMLInputElement; 
           if (imageInput) {
            imageInput.value = ''; // Safely clear the file input value
          }
          },
          error:(err)=>{
            console.error('err: ', err);
          }
        })
      }
    } else {
      setTimeout(() => {
        const firstErrorElement = document.querySelector(".error")as HTMLElement;
        if (firstErrorElement) {
          firstErrorElement.focus();
        }
      }, 1000);
    }
  }

  handleValidate() {
    Object.keys(this.eventForm.controls).forEach(key=>{
      if(this.eventForm.get(key)?.errors?.['required']){
        this.errorObj[key]=`The ${key} is required`;
      }
      if(this.eventForm.get(key)?.errors?.['pattern']){
        this.errorObj[key]=`The ${key} should be a number`;
      }
    })
    return this.errorObj;
  }

  errorObjArr(){
    return Object.keys(this.errorObj)
  }


  focusInput(id:string){
    const inputElement = document.getElementById(id);
    if(inputElement){
      inputElement.focus();
    }
  }


}
