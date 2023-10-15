app.controller('EditController', function ($scope, $http, $routeParams) {
    var userId = $routeParams.id;
    var config = {
        headers: {
            'accept': 'text/plain',
            'Chave': '79547876-87E4-45C5-83CE-8464AE2FB727'
        }
    };

    var userApiUrl = 'https://www.selida.com.br/avaliacaotecnica/api/Pessoas/' + userId;
    var enderecoApiUrl = 'https://www.selida.com.br/avaliacaotecnica/api/Endereco/';

    $scope.submitEndForm = function () {
        var pessoaId = parseInt(userId, 10);

        var endData = {
            pessoaId: pessoaId,
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
        $http.post(enderecoApiUrl, endData, configEnd)
            .then(function (response) {
                // Sucesso na solicitação
                console.log('Solicitação POST bem-sucedida', response);




                loadUser()

            })
            .catch(function (error) {
                // Erro na solicitação
                console.error('Erro na solicitação POST', error);
                alert('Você não pode inserir endereços vazio!')
            });


    }

    $scope.updateData = function () {
        var pessoaId = parseInt(userId, 10);

        var data = {
            pessoaId: pessoaId,
            nome: $scope.nome,
            dataNascimento: $scope.dataNascimento,
            idade: parseInt($scope.idade, 10),  // Correção aqui
            email: $scope.email,
            telefone: $scope.telefone,
            celular: $scope.celular
        };

        $http.put(userApiUrl, data, config)
            .then(function (response) {
                console.log('Solicitação PUT bem-sucedida', response);
                loadUser();
            })
            .catch(function (error) {
                console.error('Erro na solicitação PUT', error);
            });
    };
    function loadUser() {
        if (userId) {
            $http.get(userApiUrl, config)
                .then(function (response) {
                    var data = response.data.data;
                    $scope.pessoaData = data;

                    // Preencha os campos do formulário com os dados carregados
                    $scope.nome = data.nome;
                    $scope.idade = data.idade;
                    $scope.email = data.email;
                    $scope.dataNascimento = data.dataNascimento;
                    $scope.telefone = data.telefone;
                    $scope.celular = data.celular;
                })
                .catch(function (error) {
                    console.error('Erro ao buscar dados da API', error);
                });

            $http.get(enderecoApiUrl + 'GetAll/' + userId, config)
                .then(function (enderecoResponse) {
                    var endData = enderecoResponse.data.data;
                    $scope.enderecoData = endData;

                    var displayedData = endData.map(function (item) {
                        return {
                            enderecoId: item.enderecoId,
                            pessoaId: item.pessoaId,
                            logradouro: item.logradouro,
                            numero: item.numero,
                            bairro: item.bairro,
                            cidade: item.cidade,
                            uf: item.uf
                        };
                    });

                    $scope.displayedData = displayedData;
                })
                .catch(function (enderecoError) {
                    console.error('Erro ao obter dados de endereço:', enderecoError);
                });
            $scope.deleteEnd = function (item) {
                var deleteUrl = enderecoApiUrl + item.enderecoId;

                $http.delete(deleteUrl, config)
                    .then(function (response) {
                        if (response.data) {
                            loadUser()
                        }
                    })
                    .catch(function (error) {
                        console.error('Erro ao excluir o item:', error);
                        alert('Ouve um erro ao excluir a lista 😞')
                    });
            };

        } else {
            console.error('ID do usuário não está definido.');
        }
    }
    loadUser();
});
