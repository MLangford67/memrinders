namespace secure.Services {
  export class UserService {
  public LoginResource
  public SignUpResource

  public registerUser(userObj) {
    return this.SignUpResource.save(userObj).$promise;
  }

  public loginUser(userInfo) {
    return this.LoginResource.save(userInfo).$promise;
  }

  constructor(private $resource:ng.resource.IResourceService){
    this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
    this.SignUpResource = this.$resource('/userRoutes/api/Register');
  }

}

angular.module('secure').service('userService', UserService);
  export class ReminderService{
    public ReminderResource;



    public saveReminder(reminder){

      return this.ReminderResource.save(reminder).$promise;
    }
    constructor(
      public $resource:ng.resource.IResourceService
    ){
      this.ReminderResource = this.$resource('/api/Reminders/:id')
    }
    public getReminder(id){

      return this.ReminderResource.query({id: id});
    }
    public deleteReminder(id){

      return this.ReminderResource.delete({id: id}).$promise
    }
    public getAllReminders(){
      return this.ReminderResource.query();
    }


  }
  angular.module('secure').service('reminderService', ReminderService);
}
