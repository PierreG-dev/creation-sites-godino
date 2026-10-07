// Les covers sont stockées en URL absolue (nécessaire pour og:image).
// Pour <Image>, on repasse les URLs du site en chemin relatif : l'optimiseur
// Next lit alors l'image en interne au lieu de refaire une requête vers
// le domaine public (plus rapide, et fonctionne aussi en local).
const SITE_HOST_RE = /^https?:\/\/(www\.)?creation-sites-godino\.fr(?=\/)/i

export function toImageSrc(url: string): string {
  return url.replace(SITE_HOST_RE, '')
}
