export const lang_movies = {
    tr: {
        movies: 'FİLMLER',
        search: 'Ara',
        year: 'Yıl',
        not_found: 'Resim Bulunamadı',
        details: 'Detaylar',
        min: 'dak',
        director: 'Yönetmen',
        cast: 'Oyuncular',
        placeholder: 'Film, dizi, bölüm adı giriniz'
    },
    en: {
        movies: 'MOVIES',
        search: 'Search',
        year: 'Year',
        not_found: 'Image Not Found',
        details: 'Details',
        min: 'min',
        director: 'Director',
        cast: 'Cast',
        placeholder: 'Enter movie, series, episode name'
    }
};

export function getLangMovies() {
    let localLang;
    try { localLang = localStorage.getItem('lang'); }
    catch (e) { }
    return localLang === 'tr' ? 'tr' : 'en';
};