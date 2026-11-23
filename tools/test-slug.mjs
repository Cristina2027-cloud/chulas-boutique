// node tools/test-slug.mjs
import assert from 'node:assert/strict';
import { slugify, slugUnico } from './slug.mjs';

const casos = [
  ["Chula's Boutique", 'chulas-boutique'],
  ['Boutique Señorita Ñoña', 'boutique-senorita-nona'],
  ['  Moda   &   Estilo  ', 'moda-y-estilo'],
  ['Lúa / Ropa #1 (Mexicali)', 'lua-ropa-1-mexicali'],
  ['¡¡¡!!!', 'tienda'],
  ['', 'tienda'],
  ['Admin', 'admin-tienda'],
  ['Plantilla', 'plantilla-tienda'],
  ['Ünïcödé Çafé', 'unicode-cafe'],
  ['x'.repeat(80), 'x'.repeat(48)],
];
for (const [entrada, esperado] of casos) assert.equal(slugify(entrada), esperado, entrada);

// Nombres repetidos o que normalizan igual no chocan
const usados = new Set(['chulas-boutique']);
assert.equal(slugUnico("Chula's Boutique", usados), 'chulas-boutique-2');
usados.add('chulas-boutique-2');
assert.equal(slugUnico('CHULAS BOUTIQUE', usados), 'chulas-boutique-3');
assert.equal(slugUnico('Chulás Boutique', new Set(['Chulas-Boutique'])), 'chulas-boutique-2');
// El sufijo respeta el largo máximo
assert.equal(slugUnico('x'.repeat(80), new Set(['x'.repeat(48)])), 'x'.repeat(46) + '-2');

console.log('OK: todas las pruebas de URL pasaron');
