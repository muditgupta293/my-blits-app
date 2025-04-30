const WATCHLIST_KEY = 'Favourites';

export function getWatchlist() {
  const list = localStorage.getItem(WATCHLIST_KEY);
  return list ? JSON.parse(list) : [];
}

export function isInWatchlist(id) {
  const list = getWatchlist();
return list.find(item => String(item.id) === String(id)) !== undefined;}

export function addToWatchlist(item) {
  const list = getWatchlist();
  if (!isInWatchlist(item.id)) {
    list.push(item);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
  }
}

export function removeFromWatchlist(id) {
  const list = getWatchlist().filter(item => item.id !== id);
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
}

export function toggleWatchlist(item) {
  if (isInWatchlist(item.id)) {
    removeFromWatchlist(item.id);
    return 'removed';
  } else {
    addToWatchlist(item);
    return 'added';
  }
}
