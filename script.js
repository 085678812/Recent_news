window.addEventListener('DOMContentLoaded', () => {
  populateFeed();
});

// Update subheading when the page loads
window.addEventListener('DOMContentLoaded', () => {
  updateSubheadingWithDate();
  // Your existing code to populate the feed here, if needed
});

const rssFeeds = [
  'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
  'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml',
  'https://www.economist.com/business/rss.xml',
  'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10001147'
];

function fetchRSS(feed) {
  return fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feed}`)
    .then(response => response.json())
    .then(data => data.items);
}

function updateSubheadingWithDate() {
  const date = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options).split(' ');

  const dayWithSuffix = ordinalSuffix(Number(formattedDate[2].replace(',', '')));
  const formattedString = `${formattedDate[0]} ${formattedDate[1]} ${dayWithSuffix} ${formattedDate[3]}`;

  document.getElementById('subheading').textContent = formattedString;
}



//script.js
async function populateFeed() {
  const feedContainer = document.getElementById('rss-feed-container');

  for (const feed of rssFeeds) {
    const items = await fetchRSS(feed);

    let source;
    if (feed.includes('nytimes.com')) {
      source = 'New York Times';
    } else if (feed.includes('dj.com')) {
      source = 'Wall Street Journal';
    } else if (feed.includes('economist.com')) {
      source = 'The Economist';
    } else if (feed.includes('cnbc.com')) {
      source = 'CNBC';
    } else {
      source = 'Other';
    }

    for (const item of items) {
      const anchorElement = document.createElement('a');
      anchorElement.href = item.link;
      anchorElement.target = '_blank';

      const rssItemBox = document.createElement('div');
      rssItemBox.className = 'rss-item-box';


      const title = document.createElement('h3');
      title.innerText = item.title;
      title.href = item.link;
      title.target = '_blank';

      const description = document.createElement('p');
      description.innerText = item.description;

      const pubDate = document.createElement('p');
      pubDate.innerText = new Date(item.pubDate).toLocaleString();

      const sourceElement = document.createElement('p');
      sourceElement.innerText = `${source}`;

      rssItemBox.appendChild(title);
      rssItemBox.appendChild(description);
      rssItemBox.appendChild(pubDate);
      rssItemBox.appendChild(sourceElement);

      anchorElement.appendChild(rssItemBox);
      feedContainer.appendChild(anchorElement);

      
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  populateFeed();
});

