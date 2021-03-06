const PODCAST_KEY = 'POSTCASTS';
const LATEST_KEY = 'LATEST';
export const historyHelper = (cache = localStorage) => {
    return {
        clearHistory() {
            cache.setItem(PODCAST_KEY, JSON.stringify([]));
        },
        pushPodcast({id}) {
            const podcasts = this.getPodcasts();
            podcasts.push(id);
            const uniquePodcasts = new Set(podcasts);
            cache.setItem(PODCAST_KEY, JSON.stringify(Array.from(uniquePodcasts)));
        },
        getPodcasts() {
            const podcasts = cache.getItem(PODCAST_KEY) || [];
            return Array.isArray(podcasts) ? podcasts : JSON.parse(podcasts);
        },
        saveLastPlayed({id, slug, name = null}, seek = null) {
            cache.setItem(LATEST_KEY, JSON.stringify({podcast: {id, slug, name}, seek}));
        },
        getLastPlayed() {
            const latest = cache.getItem(LATEST_KEY);
            return latest ? JSON.parse(latest) : null;
        },
        deleteLastPlayed() {
            cache.setItem(LATEST_KEY, JSON.stringify(null));
        },
        getHistory() {
            return {
                history: this.getPodcasts(),
                lastPlayed: this.getLastPlayed()
            }
        }
    };
};
