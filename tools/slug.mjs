// Genera la parte de la URL pública de cada boutique a partir de su nombre.
// La misma lógica vive en plantilla/admin.html (función slugify) para mostrar la URL en el panel.

// Carpetas del repositorio que no pueden usarse como dirección de una boutique.
export const RESERVADOS = new Set(['plantilla', 'tools', 'img', 'admin', 'index', 'api', 'assets', 'data', 'tiendas']);

export function slugify(nombre) {
  const s = String(nombre ?? '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // quita acentos: á→a, ñ→n, ü→u
    .toLowerCase()
    .replace(/['’`´]/g, '')                           // Chula's → chulas
    .replace(/&/g, ' y ')                             // Moda & Estilo → moda-y-estilo
    .replace(/[^a-z0-9]+/g, '-')                      // espacios y símbolos → guion
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
    .replace(/-+$/g, '');
  const base = s || 'tienda';
  return RESERVADOS.has(base) ? `${base}-tienda` : base;
}

// Devuelve un slug que no choque con los ya usados: chulas-boutique, chulas-boutique-2, chulas-boutique-3…
export function slugUnico(nombre, usados) {
  const tomado = new Set([...usados].map((x) => String(x).toLowerCase()));
  const base = slugify(nombre);
  if (!tomado.has(base)) return base;
  for (let n = 2; ; n++) {
    const sufijo = `-${n}`;
    const candidato = base.slice(0, 48 - sufijo.length).replace(/-+$/g, '') + sufijo;
    if (!tomado.has(candidato)) return candidato;
  }
}
