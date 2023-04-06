# Boas-vindas ao repositório do projeto App de Receitas!

:paperclip: https://recipe-app-mariana.vercel.app/meals

  Este projeto é um app de receitas que foi desenvolvido em grupo e com o que há de mais moderno dentro do ecossistema React: Hooks e Context API! <br/>
  Nele é possível: ver, buscar, filtrar, favoritar e acompanhar o progresso de preparação de receitas de comidas e bebidas!<br/>
  ⚠️ A base de dados são 2 APIs distintas, uma para comidas e outra para bebidas.<br/>
  O layout tem como foco dispositivos móveis, mas tem design responsivo para telas maiores também.
  
  <details>
    <summary><strong>Habilidades</strong></summary><br />
      - Utilizar a Context API do React para gerenciar estado <br />
      - Utilizar o React Hook useState <br />
      - Utilizar o React Hook useContext <br />
      - Utilizar o React Hook useEffect <br />
      - Criar Hooks customizados <br />
    <br />
    <br />
   </details>
    
  <details>
  <summary><strong>:convenience_store: Desenvolvimento </strong></summary><br />
  
  * <details><summary><b> APIs :gear:</b></summary><br/>

    🚨 **IMPORTANTE**

    Para fazer as requisições, você deve utilizar apenas o `fetch`!! Outros bibliotecas como o Axios podem causar problemas no avaliador.

    * <details><summary><b> TheMealDB API</b></summary>

      O [TheMealDB](https://www.themealdb.com/) é um banco de dados aberto, mantido pela comunidade, com receitas e ingredientes de todo o mundo.

      Os end-points são bastante ricos, você pode [vê-los aqui](https://www.themealdb.com/api.php)

      O modelo de resposta para uma `meal` é o seguinte:
        <details><summary><b>Ver modelo de resposta para uma meal</b></summary>

        ```json
          {
            "meals":[
                {
                  "idMeal":"52882",
                  "strMeal":"Three Fish Pie",
                  "strDrinkAlternate":null,
                  "strCategory":"Seafood",
                  "strArea":"British",
                  "strInstructions":"Preheat the oven to 200C\/400F\/Gas 6 (180C fan).\r\nPut the potatoes into a saucepan of cold salted water. Bring up to the boil and simmer until completely tender. Drain well and then mash with the butter and milk. Add pepper and taste to check the seasoning. Add salt and more pepper if necessary.\r\nFor the fish filling, melt the butter in a saucepan, add the leeks and stir over the heat. Cover with a lid and simmer gently for 10 minutes, or until soft. Measure the flour into a small bowl. Add the wine and whisk together until smooth.\r\nAdd the milk to the leeks, bring to the boil and then add the wine mixture. Stir briskly until thickened. Season and add the parsley and fish. Stir over the heat for two minutes, then spoon into an ovenproof casserole. Scatter over the eggs. Allow to cool until firm.\r\nSpoon the mashed potatoes over the fish mixture and mark with a fork. Sprinkle with cheese.\r\nBake for 30-40 minutes, or until lightly golden-brown on top and bubbling around the edges.",
                  "strMealThumb":"https:\/\/www.themealdb.com\/images\/media\/meals\/spswqs1511558697.jpg",
                  "strTags":"Fish,Seafood,Dairy,Pie",
                  "strYoutube":"https:\/\/www.youtube.com\/watch?v=Ds1Jb8H5Sg8",
                  "strIngredient1":"Potatoes",
                  "strIngredient2":"Butter",
                  "strIngredient3":"Milk",
                  "strIngredient4":"Gruy\u00e8re",
                  "strIngredient5":"Butter",
                  "strIngredient6":"Leek",
                  "strIngredient7":"Plain Flour",
                  "strIngredient8":"White Wine",
                  "strIngredient9":"Milk",
                  "strIngredient10":"Parsley",
                  "strIngredient11":"Salmon",
                  "strIngredient12":"Haddock",
                  "strIngredient13":"Smoked Haddock",
                  "strIngredient14":"Eggs",
                  "strIngredient15":"",
                  "strIngredient16":"",
                  "strIngredient17":"",
                  "strIngredient18":"",
                  "strIngredient19":"",
                  "strIngredient20":"",
                  "strMeasure1":"1kg",
                  "strMeasure2":"Knob",
                  "strMeasure3":"Dash",
                  "strMeasure4":"50g",
                  "strMeasure5":"75g",
                  "strMeasure6":"2 sliced",
                  "strMeasure7":"75g",
                  "strMeasure8":"150ml",
                  "strMeasure9":"568ml",
                  "strMeasure10":"2 tbs chopped",
                  "strMeasure11":"250g",
                  "strMeasure12":"250g",
                  "strMeasure13":"250g",
                  "strMeasure14":"6",
                  "strMeasure15":"",
                  "strMeasure16":"",
                  "strMeasure17":"",
                  "strMeasure18":"",
                  "strMeasure19":"",
                  "strMeasure20":"",
                  "strSource":"https:\/\/www.bbc.co.uk\/food\/recipes\/three_fish_pie_58875",
                  "dateModified":null
                }
            ]
          }
        ```
      </details>
    
      Os ingredientes seguem uma ordem lógica onde o nome dele (<code>strIngredient1</code>) e a quantidade (<code>strMeasure1</code>) tem o mesmo número no final (1, nesse caso).

      É possível listar todas as `categorias`, `nacionalidades` (vindas da API como "areas") e `ingredientes`:

      ```
      categorias: https://www.themealdb.com/api/json/v1/1/list.php?c=list
      nacionalidades: https://www.themealdb.com/api/json/v1/1/list.php?a=list
      ingredientes: https://www.themealdb.com/api/json/v1/1/list.php?i=list
      ```

      As fotos dos ingredientes vêm de um end-point padronizado com a seguinte lógica:

      ```
      https://www.themealdb.com/images/ingredients/{nome-do-ingrediente}-Small.png
      // exemplo com "Lime"
      https://www.themealdb.com/images/ingredients/Lime-Small.png
      ```
      </details>

    * <details><summary><b> The CockTailDB API</b></summary>
      Bem similar (inclusive mantida pela mesma entidade) a TheMealDB API, só que focado em bebidas.

      Os end-points também são bastante ricos, você pode [vê-los aqui](https://www.thecocktaildb.com/api.php)

      As respostas seguem a mesma estrutura, com algumas particularidades relativas às bebidas (como ser ou não alcoólica, por exemplo)

        <details><summary><b>Ver modelo de resposta para drinks</b></summary>

        ```json
          {
            "drinks":[
                {
                  "idDrink":"17256",
                  "strDrink":"Martinez 2",
                  "strDrinkAlternate":null,
                  "strDrinkES":null,
                  "strDrinkDE":null,
                  "strDrinkFR":null,
                  "strDrinkZH-HANS":null,
                  "strDrinkZH-HANT":null,
                  "strTags":null,
                  "strVideo":null,
                  "strCategory":"Cocktail",
                  "strIBA":null,
                  "strAlcoholic":"Alcoholic",
                  "strGlass":"Cocktail glass",
                  "strInstructions":"Add all ingredients to a mixing glass and fill with ice.\r\n\r\nStir until chilled, and strain into a chilled coupe glass.",
                  "strInstructionsES":null,
                  "strInstructionsDE":"Alle Zutaten in ein Mischglas geben und mit Eis f\u00fcllen. Bis zum Abk\u00fchlen umr\u00fchren und in ein gek\u00fchltes Coup\u00e9glas abseihen.",
                  "strInstructionsFR":null,
                  "strInstructionsZH-HANS":null,
                  "strInstructionsZH-HANT":null,
                  "strDrinkThumb":"https:\/\/www.thecocktaildb.com\/images\/media\/drink\/fs6kiq1513708455.jpg",
                  "strIngredient1":"Gin",
                  "strIngredient2":"Sweet Vermouth",
                  "strIngredient3":"Maraschino Liqueur",
                  "strIngredient4":"Angostura Bitters",
                  "strIngredient5":null,
                  "strIngredient6":null,
                  "strIngredient7":null,
                  "strIngredient8":null,
                  "strIngredient9":null,
                  "strIngredient10":null,
                  "strIngredient11":null,
                  "strIngredient12":null,
                  "strIngredient13":null,
                  "strIngredient14":null,
                  "strIngredient15":null,
                  "strMeasure1":"1 1\/2 oz",
                  "strMeasure2":"1 1\/2 oz",
                  "strMeasure3":"1 tsp",
                  "strMeasure4":"2 dashes",
                  "strMeasure5":null,
                  "strMeasure6":null,
                  "strMeasure7":null,
                  "strMeasure8":null,
                  "strMeasure9":null,
                  "strMeasure10":null,
                  "strMeasure11":null,
                  "strMeasure12":null,
                  "strMeasure13":null,
                  "strMeasure14":null,
                  "strMeasure15":null,
                  "strCreativeCommonsConfirmed":"No",
                  "dateModified":"2017-12-19 18:34:15"
                }
            ]
          }
        ```
        </details>
      Os ingredientes seguem uma ordem lógica onde o nome dele (<code>strIngredient1</code>) e a quantidade (<code>strMeasure1</code>) tem o mesmo número no final (1, nesse caso).
      </details>


  * <details><summary><b>Observações técnicas :information_source:</b></summary>
    Algumas coisas devem seguir um padrão pré-estabelecido para que os testes de correção funcionem corretamente.

    * <details><summary><b> Rotas</b></summary>

      As rotas a serem utilizadas na aplicação devem ser as seguintes:

      * Tela de login: `/`;
      * Tela principal de receitas de comidas: `/meals`;
      * Tela principal de receitas de bebidas: `/drinks`;
      * Tela de detalhes de uma receita de comida: `/meals/:id-da-receita`;
      * Tela de detalhes de uma receita de bebida: `/drinks/:id-da-receita`;
      * Tela de receita em progresso de comida: `/meals/:id-da-receita/in-progress`;
      * Tela de receita em progresso de bebida: `/drinks/:id-da-receita/in-progress`;
      * Tela de perfil: `/profile`;
      * Tela de receitas feitas: `/done-recipes`;
      * Tela de receitas favoritas: `/favorite-recipes`.
      </details>
      
    * <details><summary><b> LocalStorage</b></summary>

      O uso de `localStorage` é necessário para que as informações não se percam caso a pessoa atualize a página. O correto é usar os valores para iniciar sua store ou seu context.

      No `localStorage` do navegador:

      * a chave `user` deve conter a seguinte estrutura:
      ```js
      {
          email: email-da-pessoa
      }
      ```

      * a chave `doneRecipes` deve conter a seguinte estrutura:
      ```js
      [{
          id: id-da-receita,
          type: meal-ou-drink,
          nationality: nacionalidade-da-receita-ou-texto-vazio,
          category: categoria-da-receita-ou-texto-vazio,
          alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
          name: nome-da-receita,
          image: imagem-da-receita,
          doneDate: quando-a-receita-foi-concluida,
          tags: array-de-tags-da-receita-ou-array-vazio
      }]
      ```

      * a chave `favoriteRecipes` deve conter a seguinte estrutura:
      ```js
      [{
          id: id-da-receita,
          type: meal-ou-drink,
          nationality: nacionalidade-da-receita-ou-texto-vazio,
          category: categoria-da-receita-ou-texto-vazio,
          alcoholicOrNot: alcoholic-ou-non-alcoholic-ou-texto-vazio,
          name: nome-da-receita,
          image: imagem-da-receita
      }]
      ```

      * a chave `inProgressRecipes` deve conter a seguinte estrutura:
      ```js
      {
          drinks: {
              id-da-bebida: [lista-de-ingredientes-utilizados],
              ...
          },
          meals: {
              id-da-comida: [lista-de-ingredientes-utilizados],
              ...
          }
      }
      ```

      * `id-da-bebida` e `id-da-comida` representam o ID de uma bebida e comida, respectivamente, e cada item da lista de ingredientes da respectiva receita deve ser representado apenas pelo número do ingrediente no formato numérico.
      </details>
    
    * <details><summary><b> Ícones</b></summary>

      Os ícones a serem utilizados na aplicação estão disponíveis do diretório `src/image/`. Esses ícones serão utilizados pelos testes da avaliação automatizada, então certifique-se de utilizá-los nos requisitos e de não renomeá-los.

      Os ícones são:

      * `profileIcon.svg`;
      * `searchIcon.svg`;
      * `drinkIcon.svg`;
      * `mealIcon.svg`;
      * `shareIcon.svg`;
      * `whiteHeartIcon.svg`;
      * `blackHeartIcon.svg`;
      </details>

    * <details><summary><b> Biblioteca <code>clipboard-copy</code></b></summary>

      Para os componentes que contêm a funcionalidade de favoritar comidas ou bebidas, será necessário utilizar a biblioteca `clipboard-copy` para copiar as informações da receita. Essa biblioteca já vem instalada no projeto.

      Para mais informações, consulte a [documentação](https://www.npmjs.com/package/clipboard-copy)
      </details>

    </details><br />
    </details>
</details>
</details>

     
# Requisitos

Nesse projeto, a pessoa que estiver utilizando o app pode procurar uma receita específica, explorar receitas baseado em diferentes critérios, favoritar e fazer as receitas, entre outras funcionalidades.

As telas sofrem variações dependendo do tipo da receita (se é comida ou bebida, no caso).

## Testes unitários

### 1 - Desenvolva os testes unitários de maneira que a cobertura seja de, no mínimo, 90%

---

## Tela de login

> ⚠️ Observações:
>
> - 🔗 A rota usada para essa tela deve ser `/`.

### 2 - Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login

---

### 3 - Desenvolva a tela de maneira que a pessoa consiga escrever seu email no input de email e sua senha no input de senha

<br />

---

### 4 - Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos

> Este requisito também inclui testes de cobertura da página `Login.js`.

<br />

---

### 5 - Após a submissão do formulário, salve no localStorage o e-mail da pessoa usuária na chave `user`

<br />

---

### 6 - Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login

> Este requisito também inclui testes de cobertura da página `Login.js`.

<br />

---

### 7 - Implemente o header de acordo com a necessidade de cada tela

<br />

---

### 8 - Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil

> Este requisito também inclui testes de cobertura do componente `Header.js`.

<br />
---

### 9 - Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer. O mesmo serve para escondê-la

> Este requisito também inclui testes de cobertura do componente `Header.js`.

<br />

---

### 10 - Implemente os elementos da barra de busca respeitando os atributos descritos no protótipo

<br />

---

### 11 - Implemente 3 radio buttons na barra de busca: Ingredient, Name e First letter

<br />

---

### 12 - Busque na API de comidas caso a pessoa esteja na página de comidas, e na API de bebidas caso esteja na de bebidas

> Este requisito também inclui testes de cobertura do componente `SearchBar.js`.

<br />

---

### 13 - Redirecione para a tela de detalhes da receita caso apenas uma receita seja encontrada, com o ID da mesma na URL

<br />

---

### 14 - Caso a busca retorne mais de uma receita, renderize as 12 primeiras encontradas, exibindo a imagem e o nome de cada uma

<br />

---

### 15 - Exiba um `alert` caso nenhuma receita seja encontrada

> Este requisito também inclui testes de cobertura do componente `SearchBar.js`.

<br /

---

## Menu inferior

> ⚠️ Observação:
>
> - 📁 Para os testes passarem é necessário que o componente seja chamado de `Footer.js`.

### 16 - Implemente o menu inferior posicionando-o de forma fixa e contendo 2 ícones: um para comidas e outro para bebidas

> Este requisito também inclui testes de cobertura do componente `Footer.js`.
  
<br />

---

### 17 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo

<br />

<details>
* Todas as rotas serão verificadas, portanto, crie as rotas que ainda não foram criadas.
</details>

<br />

---

### 18 - Redirecione a pessoa usuária para a tela correta ao clicar em cada ícone no menu inferior

> Este requisito também inclui testes de cobertura do componente `Footer.js`.

<br />

---

## Tela principal de receitas

> ⚠️ Observações:
>
> - 📁 Para os testes passarem é necessário que o componente seja chamado de `Recipes.js`.
> - 🔗 As rotas usadas para essa tela devem ser `/meals` e `/drinks`.

:bulb: **Dica:** lembre-se de componentizar muito bem os elementos em React nessa tela evitando assim problemas de lógica e de complexidade ;).

### 19 - Carregue as 12 primeiras receitas de comidas ou bebidas, uma em cada card

<br />

---


### 20 - Implemente os botões de categoria para serem utilizados como filtro

> Este requisito também inclui testes de cobertura da página `Recipes.js`.

<br />

---

### 21 - Implemente o filtro das receitas por meio da API ao clicar no filtro de categoria

<br />

---

### 22 - Implemente o filtro como um toggle, o qual se for selecionado novamente, o app deve retornar as receitas sem nenhum filtro

<br />

---

### 23 - Redirecione a pessoa usuária ao clicar no card para a tela de detalhes, que deve mudar a rota e conter o id da receita na URL

 > Este requisito também inclui testes de cobertura da página `Recipes.js`.

<br />

---

## Tela de detalhes de uma receita

> ⚠️ Observações:
>
> - 📁 Para os testes passarem é necessário que o componente seja chamado de `RecipeDetails.js`.
> - 🔗 As rotas usadas para essa tela devem ser `/meals/:id-da-receita` e `/drinks/:id-da-receita`.

:bulb: **Dica:** lembre-se de componentizar muito bem os elementos em React nessa tela evitando assim problemas de lógica e de complexidade ;).


### 24 - Realize uma request para a API passando o `id` da receita que deve estar disponível nos parâmetros da URL

<br />

---

### 25 - Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes seguidos pelas quantidades, instruções, um vídeo do youtube incorporado e recomendações

<br />

---

### 26 - Implemente as recomendações. Para receitas de comida, a recomendação deverá ser bebida, já para as receitas de bebida a recomendação deverá ser comida

<br />

---

### 27 - Implemente os 6 cards de recomendação, mostrando apenas 2. O scroll é horizontal, similar a um `carousel`

<br />

---

### 28 - Desenvolva um botão de nome "Start Recipe" que deve ficar fixo na parte de baixo da tela o tempo todo

<br />

---

### 29 - Implemente a solução de forma que, caso a receita já tenha sido feita, o botão "Start Recipe" desapareça

> Este requisito também inclui testes de cobertura da página `RecipeDetails.js`.

<br />

---

### 30 - Implemente a solução de modo que, caso a receita tenha sido iniciada mas não finalizada, o texto do botão deve ser "Continue Recipe"

<br /

---

### 31 - Redirecione a pessoa usuária caso o botão "Start Recipe" seja clicado, a rota deve mudar para a tela de receita em progresso

<br />

---

### 32 - Implemente um botão de compartilhar e um de favoritar a receita

<br />

---

### 33 - Implemente a solução de forma que, ao clicar no botão de compartilhar, o link de detalhes da receita deve ser copiado para o clipboard e uma mensagem avisando que o link foi copiado deve aparecer na tela em uma tag HTML

<br />

---

### 34 - Salve as receitas favoritas no `localStorage` na chave `favoriteRecipes`

<br />

---

### 35 - Implemente o ícone do coração (favorito) de modo que: deve vir preenchido caso a receita esteja favoritada e vazio caso contrário

<br />

---

### 36 - Implemente a lógica no botão de favoritar. Caso seja clicado, o ícone do coração deve mudar seu estado atual, caso esteja preenchido deve mudar para vazio e vice-versa

> Este requisito também inclui testes de cobertura da página `RecipeDetails.js`.

<br />

---



## Tela de receita em progresso

> ⚠️ Observações:
>
> - 📁 Para os testes passarem é necessário que o componente seja chamado de `RecipeInProgress.js`.
> - 🔗 As rotas usadas para essa tela devem ser `/meals/:id-da-receita/in-progress` e `/drinks/:id-da-receita/in-progress`.

:bulb: **Dica:** lembre-se de componentizar muito bem os elementos em React nessa tela, evitando assim problemas de lógica e de complexidade ;).

### 37 - Desenvolva a tela de modo que contenha uma imagem da receita, o título, a categoria em caso de comidas e se é ou não alcoólico em caso de bebidas, uma lista de ingredientes com suas respectivas quantidades e instruções

<br />

---

### 38 - Desenvolva um checkbox para cada item da lista de ingredientes

<br />

---

### 39 - Implemente uma lógica que ao clicar no checkbox de um ingrediente, o nome dele deve ser "riscado" da lista

> Este requisito também inclui testes de cobertura da página `RecipeInProgress.js`.

<br />

---

### 40 - Salve o estado do progresso, que deve ser mantido caso a pessoa atualize a página ou volte para a mesma receita

<br />

---

### 41 - Desenvolva a lógica de favoritar e compartilhar. A lógica da tela de detalhes de uma receita se aplica aqui

<br />

---

### 42 - Implemente a solução de modo que o botão de finalizar receita ("Finish Recipe") só pode estar habilitado quando todos os ingredientes estiverem _"checkados"_ (marcados)

<br />

---

### 43 - Redirecione a pessoa usuária após clicar no botão de finalizar receita ("Finish Recipe"), para a página de receitas feitas, cuja rota deve ser `/done-recipes`
 
> Este requisito também inclui testes de cobertura da página `RecipeInProgress.js`.

<br />

---

## Tela de receitas feitas

> ⚠️ Observações:
>
> - 📁 Para os testes passarem é necessário que o componente seja chamado de `DoneRecipes.js`.
> - 🔗 A rota usada para essa tela deve ser `/done-recipes`.

### 44 - Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo

<br />

---

### 45 - Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita, nome, categoria, nacionalidade, a data em que a pessoa fez a receita, as 2 primeiras tags retornadas pela API e um botão de compartilhar

<br />

---

### 46 - Desenvolva a tela de maneira que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, o nome, se é alcoólica, a data em que a pessoa fez a receita e um botão de compartilhar

> Este requisito também inclui testes de cobertura da página `DoneRecipes.js`.

<br />

---

### 47 - Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard

<br />

---

### 48 - Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros

<br />

---

### 49 - Redirecione para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita

> Este requisito também inclui testes de cobertura da página `DoneRecipes.js`.

<br />

---

## Tela de receitas favoritas

> ⚠️ Observações:
>
> - 📁 Para os testes passarem é necessário que o componente seja chamado de `FavoriteRecipes.js`.
> - 🔗 A rota usada para essa tela deve ser `/favorite-recipes`.

### 50 - Implemente os elementos da tela de receitas favoritas (cumulativo com os atributos em comum com a tela de receitas feitas), respeitando os atributos descritos no protótipo

<br />

<br />

---

### 51 - Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita,  nome, categoria, nacionalidade, um botão de compartilhar e um de "desfavoritar"

<br />

---

### 52 - Desenvolva a tela de modo que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita,  nome, se é alcoólica ou não, um botão de compartilhar e um de "desfavoritar"

> Este requisito também inclui testes de cobertura da página `FavoriteRecipes.js`.

<br />

---

### 53 - Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard

<br />
---

### 54 - Desenvolva a solução de modo que o botão de "desfavoritar" deve remover a receita da lista de receitas favoritas do `localStorage` e da tela

<br />

---

### 55 - Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros

<br />

---

### 56 - Redirecione a pessoa usuária ao clicar na foto ou no nome da receita, a rota deve mudar para a tela de detalhes daquela receita

> Este requisito também inclui testes de cobertura da página `FavoriteRecipes.js`.

<br />

---

## Tela de perfil

> ⚠️ Observações: 
> 
> - 📁 Para os testes passarem é necessário que o componente seja chamado de `Profile.js`.
> - 🔗 A rota usada para essa tela deve ser `/profile`.

### 57 - Implemente os elementos da tela de perfil respeitando os atributos descritos no protótipo

<br />

---

### 58 - Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível
  
<br />

---

### 59 - Implemente 3 botões: um de nome "Done Recipes", um de nome "Favorite Recipes" e um de nome "Logout"

<br />

---

### 60 - Redirecione a pessoa usuária que, ao clicar no botão de "Done Recipes", a rota deve mudar para a tela de receitas feitas

> Este requisito também inclui testes de cobertura do componente `Profile.js`.

<br />

---

### 61 - Redirecione a pessoa usuária que, ao clicar no botão de "Favorite Recipes", a rota deve mudar para a tela de receitas favoritas

<br />

---

### 62 - Redirecione a pessoa usuária que ao clicar no botão de "Logout", o `localStorage` deve ser limpo e a rota deve mudar para a tela de login

> Este requisito também inclui testes de cobertura do componente `Profile.js`.

<br />

