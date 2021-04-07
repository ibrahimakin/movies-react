export function getLangMovies() {
    let localLang = localStorage.getItem('lang');
    return localLang ? JSON.parse(localLang) : 'en';
}