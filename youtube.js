const channel1 = "UCazGTxIw9e9bdVnR2qbSYEA";
const channel2 = "UCLbcla_6HSJYBIyMhf_Osag";

function loadVideos(channelId, containerId) {
  const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rss)}`)
    .then(res => res.json())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, "text/xml");
      const entries = xml.querySelectorAll("entry");

      let html = "";
      for (let i = 0; i < 3; i++) {
        const videoId = entries[i].querySelector("yt\\:videoId").textContent;
        html += `
          <iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>
        `;
      }

      document.getElementById(containerId).innerHTML = html;
    });
}

loadVideos(channel1, "channel1");
loadVideos(channel2, "channel2");
