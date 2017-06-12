var secure;
(function (secure) {
    var Services;
    (function (Services) {
        var UserService = (function () {
            function UserService($resource) {
                this.$resource = $resource;
                this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
                this.SignUpResource = this.$resource('/userRoutes/api/Register');
            }
            UserService.prototype.registerUser = function (userObj) {
                return this.SignUpResource.save(userObj).$promise;
            };
            UserService.prototype.loginUser = function (userInfo) {
                return this.LoginResource.save(userInfo).$promise;
            };
            return UserService;
        }());
        Services.UserService = UserService;
        angular.module('secure').service('userService', UserService);
        var ReminderService = (function () {
            function ReminderService($resource) {
                this.$resource = $resource;
                this.ReminderResource = this.$resource('/api/Reminders/:id');
            }
            ReminderService.prototype.saveReminder = function (reminder) {
                return this.ReminderResource.save(reminder).$promise;
            };
            ReminderService.prototype.getReminder = function (id) {
                return this.ReminderResource.query({ id: id });
            };
            ReminderService.prototype.deleteReminder = function (id) {
                return this.ReminderResource.delete({ id: id }).$promise;
            };
            ReminderService.prototype.getAllReminders = function () {
                return this.ReminderResource.query();
            };
            return ReminderService;
        }());
        Services.ReminderService = ReminderService;
        angular.module('secure').service('reminderService', ReminderService);
    })(Services = secure.Services || (secure.Services = {}));
})(secure || (secure = {}));
