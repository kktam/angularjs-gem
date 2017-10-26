/*
    Valid Date directive 
    binds to the input control along side with ngModel, and apply a filter mask to the input
    to ensure only valid date formatted value (YYYY/MM/DD) can be entered
*/

'use strict';

 var app = angular.module('myApp', []);

    app.controller('myController', function($scope) {
    });

    app.directive('validDate', function () {
        return {
            require: '?ngModel',
            link: function ($scope, element, attrs, ngModelCtrl) {
                if (!ngModelCtrl) {
                    return;
                }

                ngModelCtrl.$parsers.push(function (val) {
                    if (angular.isUndefined(val)) {
                        var val = '';
                    }

                    var clean = val.replace(/[a-zA-Z\+\-\*\&\^\%\$\#\@\!\~\|\{\}\[\]\(\)\:\;\"\'\<\>\,\.\?]+/g, '');
                    var yearMonthDayCheck = null;

                    if (clean.indexOf('-') > -1) {
                        yearMonthDayCheck = clean.split('-');
                    } else {
                        yearMonthDayCheck = [clean];
                    }
                    var numberOfPartsEntered = (yearMonthDayCheck) ? yearMonthDayCheck.length : 0;

                    switch (numberOfPartsEntered) {
                        case 1:
                            clean = yearMonthDayCheck[0].substring(0, 4);
                            break;
                        case 2:
                            clean = yearMonthDayCheck[0].substring(0, 4) + '-';
                            clean += yearMonthDayCheck[1].substring(0, 2);
                            break;
                        case 3:
                            clean = yearMonthDayCheck[0].substring(0, 4) + '-';
                            clean += yearMonthDayCheck[1].substring(0, 2) + '-';
                            clean += yearMonthDayCheck[2].substring(0, 2);
                            break;
                        default: 
                            break;
                    }

                    if (val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                element.bind('keypress', function (event) {
                    if (event.keyCode === 32) {
                        event.preventDefault();
                    }
                });
            }
        }
    }