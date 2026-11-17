// Приводит текст к виду, удобному для поиска: без регистра, без акцентов
// (é → e, ё → е), без апострофов и знаков препинания.
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/['’]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}
