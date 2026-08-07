# Cadência — loja demo do nicho de artigos esportivos

Cópia do starter [`ecomplus/store`](https://github.com/ecomplus/store)
tematizada para **corrida, ciclismo, musculação e trilha**.

> **Este nicho ainda não existe no site institucional.** Não há marca em
> `src/config/brands.ts` nem página em `/segmentos/`. O posicionamento foi
> **proposto**, não portado. Nome, logo e domínio são placeholders.

## A tese do tema: o eixo é COMPARAÇÃO

Tênis de corrida, bicicleta e relógio esportivo não se escolhem pela foto.
Escolhem-se por drop, peso, amortecimento, material e autonomia — e esses
números **só querem dizer alguma coisa lado a lado**. Um por vez, o comprador
não tem régua.

### Como isso a separa das outras variantes técnicas

O conjunto já tem três temas que lidam com especificação, e o risco de virar o
quarto igual é real — foi o que aconteceu entre Bitola e Circuito. O corte:

| | Pergunta do cliente | Especificação serve como |
|---|---|---|
| **Bitola** (construção) | que peça **serve**? | filtro |
| **Cardan** (autopeças) | serve no **meu carro**? | compatibilidade |
| **Circuito** (eletro) | qual é mais **barato**? | ficha, com o preço de herói |
| **Cadência** (esporte) | qual é **melhor pra mim**? | **comparação** |

Só aqui a tela precisa mostrar **dois produtos ao mesmo tempo**.

## O que é diferente aqui

| Peça | O que muda |
|---|---|
| `sections/ComparadorSection.astro` | Tabela lado a lado com **botão que esconde o que é igual** |
| `components/ProductCard.vue` | Linha de specs (drop, peso, pisada) **antes do preço** |
| `components/ProductCard.vue` | Botão **comparar** ao lado de adicionar |
| `components/ProductCard.vue` | Produto com grade leva para a ficha ("Escolher numeração"), não adiciona direto |
| `assets/style.css` | `.ui-spec` e `.ui-spec-destaque`, o átomo do tema |
| `tailwind.config.js` | Petróleo + volt, raio 0.5rem, display `Anton` |

### O botão "só o que muda"

É o detalhe que faz a seção funcionar. Numa tabela de oito linhas, seis são
iguais entre os modelos e **duas decidem a compra**. A tabela abre completa,
para dar contexto, e colapsa em um clique.

Quais linhas diferem é calculado **no build** (`data-difere` em cada `<tr>`);
o script no cliente só mostra e esconde. Ele usa o atributo `hidden`, não uma
classe utilitária — o UnoCSS varre `./src/**` e classe aplicada só por JS não
geraria CSS nenhum.

### Por que petróleo e volt

Por eliminação e por código de nicho ao mesmo tempo. O conjunto já tem laranja
(cardan), dourado (lapidar), terracota (ninho), amarelo de marca-texto (pauta),
amarelo de segurança (bitola) e ciano (circuito). Petróleo + volt é o espaço
que sobrou — **e** volt é a cor de tênis de corrida e de ciclismo há uma década.

O volt **marca, não preenche**: selo, borda de hover, chip de spec e a coluna
do meio do comparador.

Uma exceção, deliberada: o **painel de texto do hero**, que o `HeroSlider` do
pacote pinta com `secondary` e que cobre meia dobra. É onde a intensidade
trabalha a favor — primeira coisa que se vê, e este é o único nicho do conjunto
que pode gritar. O texto por cima é `base-950`; volt com branco não passa em
contraste nenhum. **Fora o hero, volt cobrindo área é engano.**

### Por que `font-normal` no título

`Anton` só tem um peso, e ele já é pesadíssimo. Pedir `font-bold` faz o
navegador simular negrito e a letra engorda borrada.

## ⚠️ O que é estático

| O quê | Onde | Como ligar |
|---|---|---|
| Modelos e specs do comparador | `ComparadorSection.astro` | `specifications` dos produtos |
| Drop, peso e pisada no card | `ProductCard.vue` | `specifications.drop`, `.peso`, `.pisada` |
| Botão comparar | `ProductCard.vue` | Guardar os `_id` marcados em `state/` e alimentar a seção |
| Tabelas por marca | `/p/medidas` | Levantamento por marca, mantido pelo lojista |

A **lógica** de comparação é real e roda no cliente exatamente como rodaria com
dado de verdade. O que é fixo são os dados.

As duas seções dizem isso ao visitante, em nota de rodapé. **Manter.**

## Rodar

```bash
npm i
npm run dev                                   # http://localhost:3000
BUILD_OUTPUT=static npx cloudcommerce build --codebase ssr
```

## Armadilhas herdadas do conjunto

- **Trocar o PNG de um logo e rebuildar não troca a imagem servida** — o Astro
  reaproveita a entrada de cache. Rodar
  `demo-catalog/scripts/limpar-cache-imagens.sh cadencia` antes do build.
- **Ícone que não casa some em silêncio** no UnoCSS. Preferir a forma
  prefixada (`i-mdi-<nome>`): o nome cru só é registrado a partir do primeiro
  conjunto que o tiver, e na Cardan o heroicons ganhou a vez do Tabler.
- `/s/<termo>` **não funciona no build estático** — usar `/s?q=<termo>`.
- **Botão dentro de `<a>` navega ao clicar** — a linha de ações fica fora do
  `ALink`, e a moldura do card passou para a div que envolve os dois.
- `cloudcommerce build` **regenera o `firebase.json`** — buildar primeiro,
  escrever a config depois.
- Comentário JSX (`{/* */}`) não pode ser o primeiro filho de um
  `{cond && ( … )}` — a expressão precisa de um elemento único.
