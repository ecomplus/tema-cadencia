<!--
  Card de produto — variante Cadência (artigos esportivos).

  ── O CARD QUE PREPARA A COMPARAÇÃO ──────────────────────────────────────
  O tema inteiro gira em torno de comparar (ver `ComparadorSection.astro`), e o
  card é o ponto onde essa intenção nasce. Duas coisas só existem aqui:

  1. A LINHA DE SPECS logo abaixo do nome — drop, peso, amortecimento. São os
     três números que decidem a compra de um tênis de corrida, e mantê-los só
     na ficha obriga o cliente a abrir cinco abas para escolher um par.
     O mesmo `.ui-spec` reaparece na tabela do comparador, de propósito: o
     vocabulário se aprende numa tela e se reconhece na outra.

  2. O botão COMPARAR, ao lado de adicionar. É a segunda ação da vitrine, como
     a lista de presentes é na Ninho — e pela mesma razão: parte relevante das
     visitas não está comprando ainda, está escolhendo.

  ATENÇÃO: as specs aqui são ESTÁTICAS. Ligar de verdade depende de
  `specifications.drop`, `.peso` e `.amortecimento` cadastradas. Consta no README.

  Botão dentro de `<a>` navega ao clicar — por isso a linha de ações fica FORA
  do `ALink` e a moldura passou para a div que envolve os dois. Mesma armadilha
  que já custou tempo na Bitola, na Circuito e na Pauta.
-->
<template>
  <article
    ref="card"
    :data-sku="product.sku"
    class="group relative mx-auto h-full max-w-[320px] py-2"
  >
    <div
      class="flex h-full flex-col rounded-lg border-2 border-base-200 bg-white
      p-3 transition hover:border-primary"
    >
      <ALink :href="link" class="flex grow flex-col no-underline">
        <div class="relative overflow-hidden rounded bg-base-50">
          <AImg
            v-if="images?.length"
            :picture="images[0]"
            :alt="title"
            class="block aspect-square w-full object-cover transition-transform
            duration-500 md:group-hover:scale-105"
          />
          <div v-else class="aspect-square w-full bg-base-100" />
          <span
            v-if="discountPercentage"
            class=":uno: absolute left-0 top-0 z-20 bg-secondary px-2 py-0.5
            text-[0.6875rem] font-bold text-base-950"
          >
            -{{ discountPercentage }}%
          </span>
        </div>

        <component
          :is="headingTag"
          class="mt-2.5 line-clamp-2 text-sm font-bold leading-snug"
          :class="isActive ? 'text-base-900' : 'text-base-500'"
        >
          {{ title }}
        </component>

        <!-- Os três números que decidem a compra, antes do preço. -->
        <ul class="mt-2 flex flex-wrap gap-1">
          <li class="ui-spec">Drop 10 mm</li>
          <li class="ui-spec">265 g</li>
          <li class="ui-spec">Neutra</li>
        </ul>

        <div class="mt-auto pt-2.5">
          <div v-if="isActive" class="[&_*]:font-bold [&_.text-xl]:text-xl">
            <Prices :product="product" />
          </div>
          <span v-else class="bg-warning-100 text-warning-800 ui-badge">
            {{ !isInStock ? $t.i19outOfStock : $t.i19inactive }}
          </span>
        </div>
      </ALink>

      <div v-if="isActive" class="pt-2.5">
        <div v-if="isFailedToCart" class="text-sm text-warning-800">
          {{ $t.i19someItemIsUnavailable }}
        </div>
        <div v-else class="flex gap-1.5">
          <button
            v-if="!hasVariations"
            class=":uno: grow ui-btn-sm ui-btn-primary"
            @click.stop.prevent="loadToCart(1)"
          >
            {{ $t.i19addToCart }}
          </button>
          <!-- Produto com grade (quase todo tênis) leva para a ficha: escolher
               numeração na vitrine é o caminho mais curto para a troca. -->
          <ALink
            v-else
            :href="link"
            class=":uno: grow text-center ui-btn-sm ui-btn-primary"
          >
            Escolher numeração
          </ALink>
          <button
            class=":uno: shrink-0 ui-btn-sm ui-btn-secondary"
            aria-label="Adicionar ao comparador"
            title="Adicionar ao comparador"
            @click.stop.prevent="compararToggle"
          >
            <!--
              `i-mdi-scale-balance` na forma PREFIXADA: o nome cru só é
              registrado a partir do primeiro conjunto que o tiver, e na Cardan
              o heroicons ganhou a vez do Tabler — utilitário que não casa some
              em silêncio no UnoCSS. `i-check` pode ficar cru: existe no
              heroicons, que é o conjunto padrão.
            -->
            <i class="size-4" :class="emComparacao ? 'i-check' : 'i-mdi-scale-balance'"></i>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import {
  type Props as UseProductCardProps,
  useProductCard,
} from '@@sf/composables/use-product-card';
import Prices from '~/components/Prices.vue';

export type Props = UseProductCardProps & {
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
const props = withDefaults(defineProps<Props>(), {
  headingTag: 'h3',
});
const {
  product,
  title,
  link,
  images,
  isInStock,
  isActive,
  discountPercentage,
  hasVariations,
  loadToCart,
  isFailedToCart,
} = useProductCard(props as UseProductCardProps);
const card = ref<HTMLElement | null>(null);

/*
  O comparador de verdade não existe nesta demonstração — a seção da home usa
  modelos fixos. Aqui o botão só marca e desmarca visualmente, para que o
  fluxo fique legível no print e no clique.

  Ligar de verdade = guardar os `_id` marcados em `state/` e alimentar o
  `ComparadorSection` com eles em vez da lista estática. Consta no README.
*/
const emComparacao = ref(false);
const compararToggle = () => { emComparacao.value = !emComparacao.value; };
</script>
