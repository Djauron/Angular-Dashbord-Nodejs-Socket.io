module.exports = function (io) {

    io.on('connection', function (client) {

        client.on('dataInfo', function(data){
            console.log(data);
        });
    });
};