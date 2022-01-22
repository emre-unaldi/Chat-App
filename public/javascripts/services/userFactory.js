// kullanıcıları ayırt etmeye yarayan angular servisi
app.factory('userFactory', ['$http', 'env', ($http, env) => {
    const getUser = (roomId) => {
        return $http({
            url: env.SERVICES_URL +'/getUser',
            method: 'GET'
        }).then((response) => {
            return response.data;
        }, (err) =>{
            console.error(err);
        })
    }

    return {
        getUser
    }
}]);