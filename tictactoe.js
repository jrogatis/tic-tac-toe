// JavaScript Document

var app = angular.module('appTicTacToe', ['ngMaterial',  'ngMessages'])
    .config(function ($mdThemingProvider) {
        'use strict';
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('orange');
    });


app.controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $mdDialog, $mdMedia) {
    'use strict';

    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    //* parte do dialog
    $scope.showDialog = function (ev) {

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialog1.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: useFullScreen,
				openFrom: {top: -50, width: 30, height: 80},
				closeTo : {left: 1500}
		 })
            .then(function (answer) {
                    $scope.humanSide = answer;
					$scope.showAlert();
                }
		 	
        	

            );  //fim  ShowDialog


        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        } //fim do DialogControler

    }; //fim do do $scope.ShowDialog

    /*parte do dialog de quem joga primeiro */
    $scope.showAlert = function (ev) {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.body))
            .title('Who plays first')
            .textContent('The first player is ' + $scope.FirstPlayerMessage)
            .ariaLabel('Alert Dialog')
            .ok('Good Look!')
            .targetEvent(ev)   
			.openFrom({
				  top: -50,
				  width: 30,
				  height: 80
        	})
        	.closeTo({
          		  left: 1500
        	})  

        ); 
    };


    //aqui coloca selecionada no bord
    //se não ja estiver ocupado
    $scope.selectSpace = function (space) {
        if ($scope.board[space] === '') {
            $scope.board[space] = $scope.humanSide;
        }
    };

    //seleciona o icone
    $scope.selectIcon = function (side) {
        //alert (side);
        var icon = '';
        switch (side) {

        case 'X':
            icon = './X.svg';
            break;

        case 'O':
            icon = './O.svg';
            break;
        default:
            icon = '';
            break;

        }
        return icon;
    }; // fim do iconSelection

    //* um ini so pra organizar	
    var ini = function () {
        $scope.board = {
            'l1c1': '',
            'l1c2': '',
            'l1c3': '',
            'l2c1': '',
            'l2c2': '',
            'l2c3': '',
            'l3c1': '',
            'l3c2': '',
            'l3c3': '',
        };
        $scope.totalLosses = 0;
        $scope.totalWins = 0;
        $scope.totalDraws = 0;       
        $scope.FirstPlayer = WhoPlaysFirst();
        $scope.FirstPlayerMessage = (WhoPlaysFirst() === 0) ? 'You poor human...' : 'The Evil Machine!!!';
		 $scope.showDialog();
        $scope.globals = {};
        $scope.status = "beginning";

    };
    ini();
    
} //fim MainCtrl

function WhoPlaysFirst() {
    'use strict';
    return ((Math.floor(Math.random() * (1 - 0 + 1)) + 0) === 0) ? 'human' : 'AI';

}