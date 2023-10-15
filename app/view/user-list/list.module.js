app.controller("ListController", function ($scope, $http, $location) {
    var apiUrl = 'https://www.selida.com.br/avaliacaotecnica/api/Pessoas/';

    var config = {
        headers: {
            'accept': 'text/plain',
            'Chave': '79547876-87E4-45C5-83CE-8464AE2FB727'
        }
    };

    function loadList() {
        $http.get(apiUrl + 'GetAll', config)
            .then(function (response) {
                // Sucesso na solicitação
                var data = response.data.data; // Obtém a matriz de dados da resposta

                // Extrai os campos específicos que você deseja exibir
                var displayedData = data.map(function (item) {
                    return {
                        pessoaId: item.pessoaId,
                        nome: item.nome,
                        dataNascimento: item.dataNascimento,
                        idade: item.idade,
                        email: item.email,
                        telefone: item.telefone,
                        celular: item.celular
                    };
                });

                $scope.displayedData = displayedData; // Atribui os dados filtrados ao $scope
            })
            .catch(function (error) {
                // Tratar erros
                console.error('Erro ao buscar dados da API', error);
            });
    }
    loadList();
    $scope.deleteUser = function (item) {
        var deleteUrl = apiUrl + item.pessoaId; // Use o identificador correto do item
        $http.delete(deleteUrl, config)
            .then(function (response) {
                if (response.data) {
                    console.log('Item excluído com sucesso:', response.data);
                    loadList();
                }
            })
            .catch(function (error) {
                console.error('Erro ao excluir o item:', error);
                alert('Ouve um erro ao excluir a lista 😞')
            });
    };
    $scope.editUser = function (item){
        $location.path('/edit/' + item.pessoaId); // Supondo que "pessoaId" seja o ID do usuário
    }
});