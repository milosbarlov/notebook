(function(){
'use strict';


angular.module('notes',['ui.router'])
    .config(config)
    .controller('notesCtrl',notesCtrl)
    .controller('editCtrl',editCtrl)
    .controller('viewCtrl',viewCtrl)
    .service('notesData',notesData);

function config( $stateProvider) {
    $stateProvider
        .state('notesNew',{
            url:'/notes/new',
            templateUrl:'app/notes/notesNew.tpl.html',
            controller:'notesCtrl'
        })
        .state('notesEdit',{
            url:'/notes/edit/:id',
            templateUrl:'app/notes/notesEdit.tpl.html',
            controller:'editCtrl'
        })
        .state('notesView',{
            url:'/notes/view/:id',
            templateUrl:'app/notes/notesView.tpl.html',
            controller:'viewCtrl'
        })
}

notesCtrl.$inject = ['$scope','notesData','$location'];

function notesCtrl($scope,notesData,$location){
    $scope.note = notesData.note();

    $scope.dataBase = notesData.getData();

    $scope.saveNote = function(){
        var d = new Date();
        $scope.note.date = notesData.date();
        notesData.setData($scope.note);
        $location.path('notes');
    };

    $scope.deleteNote = function(index){
        var del = confirm('Do you want to delete this item?');
        if(del){
            notesData.delete(index);
        }
    }

}

editCtrl.$inject = ['$scope','notesData','$stateParams','$location'];

function editCtrl($scope,notesData,$stateParams,$location){
    $scope.note = notesData.note();
    $scope.note = notesData.getOneData($stateParams.id);

    $scope.editNote = function(){
        $scope.date = notesData.date();
        notesData.edit($stateParams.id,$scope.note);
        $location.path('notes');
    }

}

viewCtrl.$inject = ['$scope','notesData','$stateParams'];

function viewCtrl($scope,notesData,$stateParams){
    $scope.note = notesData.getOneData($stateParams.id);
}

function notesData(){
    var notes = this;

    var data =[
        {title:'this is first note',note:'this is first note',date:'12.12.2015'},
        {title:'this is second note',note:'this is second note',date:'01.01.2014'}
    ];
    var note ={
        title:'',
        note:'',
        date:''
    };

    notes.getData = function(){
        return data;
    };
    notes.setData = function(param){
      data.push(param);
    };
    notes.getOneData =  function(index){
        return data[index];
    };
    notes.edit = function(index,data){
      data[index]=data;
    };
    notes.date = function(){
        var d = new Date();
        return d.getDate()+'.'+ d.getMonth()+'.'+ d.getFullYear();
    };
    notes.delete = function(index){
        data.splice(index,1);
    };
    notes.note = function(){
        return note;
    };


}
})();