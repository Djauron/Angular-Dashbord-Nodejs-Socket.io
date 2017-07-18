// directive of Angular

var timeSeries = [
    {
        x: [], // Date
        y: [], // Temperature
        type: 'scatter'
    }
];

// Create Graph when socket.on data
app.directive('graph', function() {
    return {
        link: function($scope) {

            socket.on('jsonReq', function(data){
                $scope.infosGraph = {
                    temperature: data.temperature,
                    humidity: data.humidity,
                    gps_status: data.gps_status,
                    temperatureGraph : data.temperature * 1.8, // rotation base 100C
                    humidityGraph: data.humidity * 1.8}; // rotation base 100%

                if($scope.infosGraph.gps_status) // Last status
                    $('#onOff').html("On");
                else
                    $('#onOff').html("Off");

                timeSeries[0].y.push($scope.infosGraph.temperature); // Push on array timeSeries temperature
                timeSeries[0].x.push(new Date()); // push on array timeSeries Date()

                Plotly.newPlot('myDiv', timeSeries); // Create timeSeries Graph

                // Rotation of temperature and humidity graph
                $('.temp').css('transition', 'transform 0.8s');
                $('.humidity').css('transition', 'transform 0.8s');
                $('.temp').css('transform', 'rotate(' + $scope.infosGraph.temperatureGraph + 'deg)');
                $('.humidity').css('transform', 'rotate(' + $scope.infosGraph.humidityGraph + 'deg)');

            });
        }
    };
});

// create Google map when socket.on
app.directive('map', function(){
    return {
        link: function initMap($scope) {
            socket.on('jsonReq', function(data){
                $scope.infosMap = {
                    lat: data.lat,
                    long: data.long
                    };

                var uluru = {lat: parseFloat($scope.infosMap.lat), lng: parseFloat($scope.infosMap.long)}; // ParseFloat if lat and long is string
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