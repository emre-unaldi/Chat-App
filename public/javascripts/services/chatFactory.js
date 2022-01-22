// mesajları çekecek olan angular servisi
app.factory('chatFactory', ['$http', 'env', ($http, env) => {
    const getMessages = (roomId) => {
        return $http({
            url: env.SERVICES_URL +'messages/list',
            method: 'GET',
            params: {
                roomId
            }
        }).then((response) => {
            return response.data;
        }, (err) =>{
            console.error(err);
        })
    }

    return {
        getMessages
    }
}]);