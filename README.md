![Image of Open-medical-screening](https://raw.githubusercontent.com/JJS4ntos/open-medical-screening/master/search.png)

# Open-medical-screening

Biblioteca que escava dados sobre maioria das doenças presentes no site do [Ministério da Saúde](https://www.gov.br/saude/pt-br) e utiliza esses dados para detectar palavras chaves em um determinado input de texto.

## Importante

Esta biblioteca não tem como objetivo substituir a função do médico, apenas de servir como forma de triagem com pouco/médio grau de confiabilidade.

## Instalação
``
npm i open-medical-screening
``

## Requisitos

- Esta biblioteca funciona somente em server-side.
- Nodejs

## Funcionamento ( Não necessáriamente nesta ordem )

Ao informar um input com sintomas, a biblioteca fará uma busca no site do ministério da saúde por todas (ou quase) as doenças existentes por lá. Após a busca alguns dados serão armazenados em uma determinada estrutura de dados e mantidos para otimização da performance.

O input informado pelo usuário será otimizado com a remoção de palavras que podem confundir o algoritmo (preposições, pronomes, advérbios, contrações, conjuncões).

Uma expressão regular é montada com base no input do usuário e uma pesquisa é feita na estrutura de dados montada.

# Funções

## ask(sintomas: string)

Esta função recebe os sintomas listados ou não em uma string e retorna uma lista de objetos ordenados pela quantidade de palavras chaves encontradas.
Por exemplo:

```
await ask('estou com manchas vermelhas na pele, bastante dor de cabeça e febre')
```

retornará

```
[
    {"disease_name":"Catapora","match_count":4},{"disease_name":"Oncocercose","match_count":4},{"disease_name":"Varicela Catapora","match_count":4},{"disease_name":"Febre Tifoide","match_count":3},{"disease_name":"Paracoccidioidomicose ","match_count":3}
    ...
]
```

## removeTrashWords(texto: string)

Removerá preposições, pronomes, advérbios, contrações, conjuncões do texto informado

## getDiseasesFile

Retorna um objeto que representa o arquivo contendo as doenças carregadas

## loadDiseaseSymptomAndPersist

Recarrega o cache contendo as doenças

_Esta biblioteca está em fase inicial de desenvolvimento e pode passar por constantes mudanças_
