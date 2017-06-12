var moment;
var secure;
(function (secure) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(reminderService, $state, $window) {
                this.reminderService = reminderService;
                this.$state = $state;
                this.$window = $window;
                if (token) {
                    var payload = JSON.parse(window.atob(token.split('.')[1]));
                    this.id = payload.id;
                    this.reminders = reminderService.getReminder(this.id);
                    console.log(payload);
                    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
                }
            }
            HomeController.prototype.removeReminder = function (id) {
                var _this = this;
                this.reminderService.deleteReminder(id).then(function () {
                    _this.$window.location.reload();
                });
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        var LoginController = (function () {
            function LoginController(userService, $window, $scope, $state) {
                this.userService = userService;
                this.$window = $window;
                this.$scope = $scope;
                this.$state = $state;
                var token = window.localStorage['token'];
                if (token) {
                    var payload = JSON.parse(window.atob(token.split('.')[1]));
                    this.userName = payload.username;
                }
            }
            LoginController.prototype.login = function () {
                var _this = this;
                this.userInfo.role = 'guest';
                this.userService.loginUser(this.userInfo).then(function (data) {
                    console.log(data);
                    _this.$window.localStorage.setItem("token", JSON.stringify(data.token));
                    _this.$state.go('home');
                    alert('login successful');
                });
            };
            return LoginController;
        }());
        Controllers.LoginController = LoginController;
        var AdminLoginController = (function () {
            function AdminLoginController(userService, $window, $scope, $state) {
                this.userService = userService;
                this.$window = $window;
                this.$scope = $scope;
                this.$state = $state;
                var token = window.localStorage['token'];
                if (token) {
                    var payload = JSON.parse(window.atob(token.split('.')[1]));
                    this.userName = payload.username;
                }
            }
            AdminLoginController.prototype.login = function () {
                var _this = this;
                this.userInfo.role = 'admin';
                this.userService.loginUser(this.userInfo).then(function (data) {
                    console.log(data);
                    _this.$window.localStorage.setItem("token", JSON.stringify(data.token));
                    _this.$state.go('home');
                    alert('login successful');
                });
            };
            return AdminLoginController;
        }());
        Controllers.AdminLoginController = AdminLoginController;
        var RegisterController = (function () {
            function RegisterController(userService, $state) {
                this.userService = userService;
                this.$state = $state;
            }
            RegisterController.prototype.signup = function () {
                var _this = this;
                this.userService.registerUser(this.user).then(function () {
                    _this.$state.go('login');
                    alert('signup successful, please login');
                });
            };
            return RegisterController;
        }());
        Controllers.RegisterController = RegisterController;
        var ReminderController = (function () {
            function ReminderController(reminderService, $state) {
                this.reminderService = reminderService;
                this.$state = $state;
                var token = window.localStorage['token'];
                if (token) {
                    var payload = JSON.parse(window.atob(token.split('.')[1]));
                    this.id = payload.id;
                    console.log(this.id);
                }
            }
            ReminderController.prototype.addReminder = function () {
                var _this = this;
                this.reminder.user_tag = this.id;
                this.reminder.date = moment(this.reminder.date).format("MMM Do YYYY");
                console.log(moment(this.reminder.date).format("MMM Do YYYY"));
                this.reminderService.saveReminder(this.reminder).then(function () {
                    _this.$state.go('home');
                });
            };
            return ReminderController;
        }());
        Controllers.ReminderController = ReminderController;
        var EditController = (function () {
            function EditController(reminderService, $state, $stateParams) {
                this.reminderService = reminderService;
                this.$state = $state;
                this.$stateParams = $stateParams;
                this.id = $stateParams['id'];
            }
            EditController.prototype.editReminder = function () {
                var _this = this;
                this.reminder._id = this.id;
                this.reminderService.saveReminder(this.reminder).then(function () {
                    _this.$state.go('home');
                });
            };
            return EditController;
        }());
        Controllers.EditController = EditController;
        var AdminViewController = (function () {
            function AdminViewController(reminderService) {
                this.reminderService = reminderService;
                this.reminders = this.reminderService.getAllReminders();
            }
            return AdminViewController;
        }());
        Controllers.AdminViewController = AdminViewController;
    })(Controllers = secure.Controllers || (secure.Controllers = {}));
})(secure || (secure = {}));
