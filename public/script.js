async function fetchUrl() {
      const url = document.getElementById('urlInput').value.trim();
      const errorBox = document.getElementById('error');
      const frame = document.getElementById('siteFrame');
      const placeholder = document.getElementById('placeholder');
      const loading = document.getElementById('loading');

      errorBox.textContent = '';

      if (!url) {
        errorBox.textContent = 'Please enter a URL';
        return;
      }

      placeholder.style.display = 'none';
      frame.style.display = 'none';
      loading.style.display = 'block';

      try {
        const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
        const html = await response.text();

        if (!response.ok) {
          throw new Error(html);
        }

        frame.style.display = 'block';
        loading.style.display = 'none';

        const frameDoc = frame.contentDocument || frame.contentWindow.document;
        frameDoc.open();
        frameDoc.write(html);
        frameDoc.close();

      } catch (err) {
        loading.style.display = 'none';
        placeholder.style.display = 'flex';
        errorBox.textContent = `Error: ${err.message}`;
      }
    }

    document.getElementById('urlInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') fetchUrl();
    });