app.directive('rota', function() {

    return {
        link: function($scope) {

            socket.on('jsonReq', function(data){
                $scope.infosGraph = {
                    temperature: data.temperature,
                    humidity: data.humidity,
                    gps_status: data.gps_status,
                    temperatureGraph : data.temperature * 1.8,
                    humidityGraph: data.humidity * 1.8};

                if($scope.infosGraph.gps_status)
                    $('#onOff').html("On");
                else
                    $('#onOff').html("Off");


                $('.temp').css('transition', 'transform 0.8s');
                $('.humidity').css('transition', 'transform 0.8s');

                var rotate = function() {
                    $('.temp').css('transform', 'rotate(' + $scope.infosGraph.temperatureGraph + 'deg)');
                    $('.humidity').css('transform', 'rotate(' + $scope.infosGraph.humidityGraph + 'deg)');
                };
                rotate();
            });
        }
    };
});

app.directive('map', function(){
    return {
        link: function initMap($scope) {
            socket.on('jsonReq', function(data){
                $scope.infosMap = {
                    lat: data.lat,
                    long: data.long
                    };

                var uluru = {lat: parseFloat($scope.infosMap.lat), lng: parseFloat($scope.infosMap.long)};
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    center: uluru
                });
                var marker = new google.maps.Marker({
                    position: uluru,
                    map: map
                });
            });
    }}

});