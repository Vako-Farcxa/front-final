export function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const accept = document.getElementById('cookieAccept');

  if (!banner || !accept) return;

  if (localStorage.getItem('cookieAccepted')) {
    banner.classList.add('hidden');
    return;
  }

  accept.onclick = function () {
    localStorage.setItem('cookieAccepted', 'true');
    banner.classList.add('hidden');
  };
}
