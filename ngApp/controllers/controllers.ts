let moment;
namespace secure.Controllers {
  export class HomeController{
    public reminders;
    public id;

    public removeReminder(id){
      this.reminderService.deleteReminder(id).then(()=>{
        this.$window.location.reload();
      })
    }

    constructor(
      public reminderService,
      public $state,
      private $window
    ){
      if(token){
        let payload = JSON.parse(window.atob(token.split('.')[1]));
        this.id = payload.id;
        this.reminders = reminderService.getReminder(this.id);
        console.log(payload);
        console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
      }


    }
  }

  export class LoginController {
     public userInfo
     public userName
     public id;

     public login() {
       this.userInfo.role = 'guest';
       this.userService.loginUser(this.userInfo).then((data) => {
         console.log(data)
         this.$window.localStorage.setItem("token", JSON.stringify(data.token));
         this.$state.go('home')
         alert('login successful');
       })
     }

     public constructor(
       private userService,
       public $window,
       public $scope,
       public $state
     ) {
       let token = window.localStorage['token'];
       if(token){
         let payload = JSON.parse(window.atob(token.split('.')[1]));
         this.userName = payload.username;

       }



     }

   }
   export class AdminLoginController{
     public userInfo
     public userName
     public id;

     public login() {
       this.userInfo.role = 'admin';
       this.userService.loginUser(this.userInfo).then((data) => {
         console.log(data)
         this.$window.localStorage.setItem("token", JSON.stringify(data.token));
         this.$state.go('home')
         alert('login successful');
       })
     }

     public constructor(
       private userService,
       public $window,
       public $scope,
       public $state
     ) {
       let token = window.localStorage['token'];
       if(token){
         let payload = JSON.parse(window.atob(token.split('.')[1]));
         this.userName = payload.username;

       }



     }
   }

   export class RegisterController {
     public user

     public signup() {
       this.userService.registerUser(this.user).then(() => {
         this.$state.go('login')
         alert('signup successful, please login');
       })
     }

     public constructor(
       private userService,
       public $state
     ) {

     }
   }
   export class ReminderController{
      public id
      public reminder

      public addReminder(){

      this.reminder.user_tag = this.id;
      this.reminder.date = moment(this.reminder.date).format("MMM Do YYYY")


      console.log(moment(this.reminder.date).format("MMM Do YYYY"))
      
      this.reminderService.saveReminder(this.reminder).then(()=>{
        this.$state.go('home')
      })
      }
      constructor(
      private reminderService,
      public $state
      ){
        let token = window.localStorage['token'];
        if(token){
          let payload = JSON.parse(window.atob(token.split('.')[1]));
          this.id = payload.id;
          console.log(this.id);

        }

      }
   }
   export class EditController{
     public reminder;

     public id;

     public editReminder(){
       this.reminder._id = this.id;

       this.reminderService.saveReminder(this.reminder).then(()=>{
         this.$state.go('home');
       })
     }
     constructor(
       public reminderService,
       public $state,
       private $stateParams
     ){
       this.id = $stateParams['id'];

     }
   }
   export class AdminViewController{
     public reminders;

     constructor(
       public reminderService
     ){
       this.reminders = this.reminderService.getAllReminders();
     }
   }

}
