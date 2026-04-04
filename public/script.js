function openUrl() {
  const url = document.getElementById('urlInput').value.trim();
  const errorBox = document.getElementById('error');

  errorBox.textContent = '';

  if (!url) {
    errorBox.textContent = 'Please enter a URL';
    return;
  }

  let fullUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    fullUrl = 'https://' + url;
  }

  const proxyUrl = `/api/proxy?url=${encodeURIComponent(fullUrl)}`;
  window.open(proxyUrl, '_blank');
}

document.getElementById('urlInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') openUrl();
});