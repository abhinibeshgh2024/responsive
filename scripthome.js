// Create the search bar dynamically above navbar
const header = document.querySelector('body');
const searchContainer = document.createElement('div');
searchContainer.id = 'webbSearchContainer';
searchContainer.innerHTML = `
 <input type="text" id="webbSearchInput"  placeholder="Search G4G..."/>
  <div id="webbSearchResults"></div>
`;
document.body.insertBefore(searchContainer, document.querySelector('nav'));

// List of Webb tools from navbar
const webbTools = [
  { name: "Advanced Resume Builder", link: "indexrb.html" },
  { name: "Chart Maker", link: "chart.html" },
  { name: "Whiteboard", link: "whiteboard.html" }
 { name: "Fronto (HTML.CSS.JS)", link: "fronto.html" }
{ name: "HTML/CSS Editor", link: "codex.html" }
{ name: "Art Gallery", link: "unigallery.html" }
];

// DOM Elements
const searchInput = document.getElementById('webbSearchInput');
const searchResults = document.getElementById('webbSearchResults');

// Function to update results dynamically
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  searchResults.innerHTML = '';
  if (query.length === 0) {
    searchResults.style.display = 'none';
    return;
  }

  const matches = webbTools.filter(tool => tool.name.toLowerCase().includes(query));

  matches.forEach(tool => {
    const div = document.createElement('div');
    div.textContent = tool.name;
    div.onclick = () => {
      window.location.href = tool.link;
    };
    searchResults.appendChild(div);
  });

  searchResults.style.display = matches.length ? 'block' : 'none';
});

// Close suggestions if click outside
document.addEventListener('click', (e) => {
  if (!searchContainer.contains(e.target)) {
    searchResults.style.display = 'none';
  }
});

