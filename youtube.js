const channel1 = "UCazGTxIw9e9bdVnR2qbSYEA";
const channel2 = "UCLbcla_6HSJYBIyMhf_Osag";

function loadVideos(channelId, containerId) {
  const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(rss)}`)
    .then(res => res.text())
    .then(str => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(str, "text/xml");
      const entries = xml.querySelectorAll("entry");

      let html = "";
      for (let i = 0; i < Math.min(3, entries.length); i++) {
        const videoId = entries[i].querySelector("yt\\:videoId").textContent;
        html += `
          <iframe 
            src="https://www.youtube.com/embed/${videoId}" 
            frameborder="0" 
            allowfullscreen>
          </iframe>
        `;
      }

      document.getElementById(containerId).innerHTML = html;
    })
    .catch(err => console.error(err));
}

loadVideos(channel1, "channel1");
loadVideos(channel2, "channel2");
