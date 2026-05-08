function Navbar({ activePage, onNavigate }) {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Shop' },
    { path: '/add-product', label: 'Admin Portal' },
  ]

  return (
    <header className="site-header">
      <nav className="main-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <button
            key={link.path}
            className={activePage === link.path ? 'active' : ''}
            type="button"
            onClick={() => onNavigate(link.path)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
