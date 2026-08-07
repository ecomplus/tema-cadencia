import { fileURLToPath } from 'node:url';
// MDI: o unico conjunto disponivel com cobertura decente de modalidade
// esportiva (corrida, bike, natacao, musculacao) sem virar pictograma solto.
import { icons as iMdi } from '@iconify-json/mdi';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
process.env.STOREFRONT_BASE_DIR = __dirname;

// eslint-disable-next-line import/first
import { genTailwindConfig } from '@cloudcommerce/storefront/config/storefront.tailwind.mjs';

/*
 * Tema da variante "Cadência" (artigos esportivos — corrida, ciclismo,
 * musculação e trilha).
 *
 * As cores de marca (primary/secondary) NÃO vêm daqui: são lidas de
 * `content/settings.json` pelo próprio `genTailwindConfig`, para continuarem
 * editáveis pelo CMS. Aqui fica só o que o CMS não expõe.
 *
 * Verde-petróleo com volt. A dupla foi escolhida por eliminação: o conjunto já
 * tem laranja (cardan), dourado (lapidar), terracota (ninho), amarelo de
 * marca-texto (pauta), amarelo de segurança (bitola) e ciano (circuito).
 * Petróleo + volt é o espaço que sobrou E é o código do nicho — volt é a cor
 * de tênis de corrida e de ciclismo há uma década.
 *
 * O volt NUNCA é fundo de bloco grande: em área extensa ele vibra e cansa. Ele
 * entra em selo, borda de destaque e na coluna vencedora do comparador.
 *
 * TODO: validar — este nicho ainda NÃO tem marca em
 * `www.e-com.plus/src/config/brands.ts` nem página de segmento. A paleta é
 * proposta, não veio de levantamento de temas campeões do nicho.
 */
const themeOptions = {
  generalIconSets: [iMdi],
  // Grafite neutro de leve viés verde, para não brigar com o petróleo.
  baseColor: {
    50: '#f7f9f8',
    100: '#eef1f0',
    200: '#dfe4e3',
    300: '#c2cac8',
    400: '#94a09d',
    500: '#6e7b78',
    600: '#576360',
    700: '#45504d',
    800: '#343d3b',
    900: '#1f2625',
    950: '#111716',
  },
};

const tailwindConfig = genTailwindConfig(themeOptions);

tailwindConfig.theme.extend.borderRadius = {
  ...tailwindConfig.theme.extend.borderRadius,
  DEFAULT: '0.5rem',
};

export default {
  ...tailwindConfig,
  themeOptions,
};
