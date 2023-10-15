app.controller('FormController', function ($scope, $http, $location) {

    var pessoaApiUrl = 'https://www.selida.com.br/avaliacaotecnica/api/Pessoas';
    var enderecoApiUrl = 'https://www.selida.com.br/avaliacaotecnica/api/Endereco';

    var config = {
        headers: {
            'accept': 'text/plain',
            'Chave': '79547876-87E4-45C5-83CE-8464AE2FB727',
            'Content-Type': 'application/json'
        }
    };

    function createPessoa() {
        var data = {
            nome: $scope.nome,
            dataNascimento: $scope.dataNascimento,
            idade: parseInt($scope.idade, 10),
            email: $scope.email,
            telefone: $scope.telefone,
            celular: $scope.celular
        };

        $http.post(pessoaApiUrl, data, config)
            .then(function (response) {
                createEndereco(response.data)
                $location.path('/edit/' + response.data.data)
            })
            .catch(function (error) {
                console.error('Erro ao criar a pessoa:', error);
            });
    }

    function createEndereco(pessoaId) {

        console.log(pessoaId.data)
        var data = {
            pessoaId: pessoaId.data,
            logradouro: $scope.logradouro,
            numero: $scope.numero,
            bairro: $scope.bairro,
            cidade: $scope.cidade,
            uf: $scope.uf
        };

        var configEnd = {
            headers: {
                'accept': 'text/plain',
                'Chave': '79547876-87E4-45C5-83CE-8464AE2FB727',
                'Content-Type': 'application/json'
            }
        };
        $http.post(enderecoApiUrl, data, configEnd)
            .then(function (response) {
                console.log('Solicitação POST bem-sucedida', response);
            })
            .catch(function (error) {
                console.error('Erro na solicitação POST', error);
            });
    }

    $scope.submitForm = function () {
        createPessoa()
    }
});
