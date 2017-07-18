// show value in HTML Controller of Angular
app.controller("dataInfo", function($scope, socket) {
    socket.on('jsonReq', function(data){
        $scope.infos = {
            temperature: data.temperature,
            humidity: data.humidity,
            gps_status: data.gps_status,
            lat: data.lat,
            long: data.long}
    });
});

