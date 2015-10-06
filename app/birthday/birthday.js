angular.module('Birthday',[
    'ngAnimate',
    'ui.bootstrap'
    ])
    .controller('birthdayCtrl',birthdayCtrl)
    .service('birthday',birthday);



birthdayCtrl.$inject = ['$scope','birthday'];

function birthdayCtrl($scope,birthday){

    var clearModel = {
        first_name:'',
        last_name:'',
        birthday:''
    };
    $scope.flag = true;
    $scope.birthdayList = birthday.getAllData();
    $scope.change = function(){
        $scope.flag = !$scope.flag;
    };
    $scope.birthday = birthday.getModel();

    $scope.saveBirthday = function(){
        $scope.birthday.birthday = birthday.date($scope.dt);
        birthday.saveBirthday($scope.birthday);
        $scope.birthday =  clearModel;
    };
    $scope.deleteBirthday = function(index){
        var confirm = window.confirm('Delete item?')
        if(confirm){
            birthday.delete(index);
        }
    };
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open = function($event) {
        $scope.status.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];

    $scope.status = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
        [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };
}

function birthday(){
    var birthday = this;
    var model = {
        first_name:'',
        last_name:'',
        birthday:''
    };

    var birthdayList = [
        {first_name:'Milos',last_name:'Barlov',birthday:'08.05.1986'},
        {first_name:'Milena',last_name:'Barlov',birthday:'04.01.1988'}
    ];

    birthday.getAllData = function(){
        return birthdayList;
    };
    birthday.saveBirthday = function($item){
        birthdayList.push($item);
    };
    birthday.getModel = function(){
        return model;
    };
    birthday.delete = function(index){
        birthdayList.splice(index,1);
    };
    birthday.date = function(date){
        var day = date.getDate() < 10 ? '0'+ date.getDate(): date.getDate();
        var month = date.getMonth()+1 <10 ? '0'+ date.getMonth()+1 : date.getMonth()+1;

        return day+'.'+ month+'.'+ date.getFullYear();
    };
}