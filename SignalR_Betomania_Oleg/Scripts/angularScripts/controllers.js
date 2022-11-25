var myApp = angular.module('myApp',[]);
myApp.controller('SignalRCtrl', function  ($scope,$window) {

    $scope.init = function () {

        $window.localStorage.clear();
        $scope.chatButton = 'lobby';
        $scope.switch=function () {
            cleanChat();
            startChat();
        }
        var startChat = function () {
            $.connection.hub.start().done(function () {
                var groupName =$scope.chatButton;
                chat.server.addGroup(groupName, $.connection.hub.id).then(() => {
                    console.log('Switched channels ' + groupName);
                });
                var chatHistory = $window.localStorage.getItem(groupName);
                if (chatHistory !== null) {
                    $('#chat').append(chatHistory);
                }
                $scope.sendMessage = function(){
                    // Call the Send method on the hub.
                    chat.server.send(groupName, $scope.message, $.connection.hub.id);
                    $scope.message = '';
                    // Clear text box and reset focus for next comment.
                }
            });
        };
        startChat();
        var chat = $.connection.chatHub;

        chat.client.receiveMessage = function (message) {
            var groupName = $scope.chatButton;
            var newMessage = '\n' + "me : " + message;
            $('#chat').append(newMessage);
           
            var previousHistory = $window.localStorage.getItem(groupName) || '';
            $window.localStorage.setItem(groupName, previousHistory + newMessage)
        };

        function cleanChat() {
             $('#chat').empty();        
        }
    };
})
