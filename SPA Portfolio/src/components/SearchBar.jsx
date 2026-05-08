function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      aria-label="Search jewellery"
      className="sidebar-search"
      type="search"
      value={searchTerm}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Search"
    />
  )
}

export default SearchBar
