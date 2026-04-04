async function fetchUrl() {
    const url = document.getElementById('urlInput').value.trim();
    const resultBox = document.getElementById('result');
    const errorBox = document.getElementById('error');

    resultBox.innerHTML = '';
    errorBox.innerHTML = '';

    if (!url) {
    errorBox.textContent = 'Please enter a URL';
    return;
    }

    try {
    const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
    const text = await response.text();

    if (!response.ok) {
        errorBox.textContent = `Error: ${text}`;
        return;
    }

    resultBox.textContent = text;

    } catch (err) {
    errorBox.textContent = `Request failed: ${err.message}`;
    }
}

document.getElementById('urlInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') fetchUrl();
});