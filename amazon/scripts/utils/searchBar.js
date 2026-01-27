// interactive search bar
export function searchBar() {
  // search bar elements
  const searchButtonElem = document.querySelector('.search-button');
  const searchBarElem = document.querySelector('.search-bar');

  // search button click event listener
  searchButtonElem.addEventListener('click', () => {
    const searchBarValue = searchBarElem.value;

    const params = new URLSearchParams({
      search: searchBarValue
    })

    window.location.href = `index.html?${params.toString()}`;
  });

  // search bar enter keydown event listener
  searchBarElem.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      searchButtonElem.click();
    }
  });
}