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
  const link = document.createElement('a');
  link.href = proxyUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById('urlInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') openUrl();
});