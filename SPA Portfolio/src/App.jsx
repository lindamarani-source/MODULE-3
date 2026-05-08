import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/navbar.jsx'
import ProductCard from './components/productCard.jsx'
import SearchBar from './components/SearchBar.jsx'
import './App.css'

const initialProducts = [
  {
    id: 1,
    name: 'Aurora Pearl Necklace',
    description: 'Freshwater pearls with gold accents',
    origin: 'Atelier Nairobi',
    location: 'Location 1',
    price: 189.99,
    stock: 18,
    status: 'Active',
  },
  {
    id: 2,
    name: 'Solitaire Gold Ring',
    description: 'Minimal polished gold band',
    origin: 'Atelier Paris',
    location: 'Location 2',
    price: 245.5,
    stock: 9,
    status: 'Active',
  },
  {
    id: 3,
    name: 'Celeste Drop Earrings',
    description: 'Soft blue crystal drop earrings',
    origin: 'Atelier Milan',
    location: 'Location 3',
    price: 96,
    stock: 5,
    status: 'Low Stock',
  },
  {
    id: 4,
    name: 'Noir Tennis Bracelet',
    description: 'Dark stone bracelet with clasp',
    origin: 'Atelier Lagos',
    location: 'Location 4',
    price: 320,
    stock: 0,
    status: 'Paused',
  },
  {
    id: 5,
    name: 'Luna Charm Bracelet',
    description: 'Moon charms on a fine chain',
    origin: 'Atelier Nairobi',
    location: 'Location 1',
    price: 128,
    stock: 22,
    status: 'Active',
  },
  {
    id: 6,
    name: 'Opal Stack Ring',
    description: 'Layered opal ring set',
    origin: 'Atelier Paris',
    location: 'Location 2',
    price: 175,
    stock: 7,
    status: 'Low Stock',
  },
  {
    id: 7,
    name: 'Golden Hoop Earrings',
    description: 'Classic gold hoops',
    origin: 'Atelier Milan',
    location: 'Location 3',
    price: 88,
    stock: 15,
    status: 'Active',
  },
  {
    id: 8,
    name: 'Pearl Pendant',
    description: 'Single pearl pendant necklace',
    origin: 'Atelier Lagos',
    location: 'Location 4',
    price: 142,
    stock: 12,
    status: 'Active',
  },
]

const emptyForm = {
  name: '',
  description: '',
  origin: '',
  location: 'Location 1',
  price: '',
  stock: '',
  status: 'Active',
}

const productColors = ['#fff1f6', '#fde7ef', '#f9d4e2', '#fbeaf1']

const normalizeProduct = (product, index) => ({
  description: 'Hand-finished jewellery piece',
  origin: 'Aurelia Studio',
  location: `Location ${(index % 4) + 1}`,
  stock: 10,
  status: 'Active',
  ...product,
})

function App() {
  const [page, setPage] = useState(window.location.pathname)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [formData, setFormData] = useState(emptyForm)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      const savedProducts = window.localStorage.getItem('aureliaJewelleryProducts')
      const fetchedProducts = savedProducts
        ? JSON.parse(savedProducts)
        : await Promise.resolve(initialProducts)

      setProducts(fetchedProducts.map(normalizeProduct))
      setIsLoading(false)
    }

    loadProducts()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      window.localStorage.setItem(
        'aureliaJewelleryProducts',
        JSON.stringify(products),
      )
    }
  }, [isLoading, products])

  useEffect(() => {
    const handlePopState = () => setPage(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setPage(path)
  }

  const locations = ['All', ...new Set(products.map((product) => product.location))]
  const totalStock = products.reduce((total, product) => total + product.stock, 0)
  const lowStockCount = products.filter((product) => product.stock <= 7).length

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return products.filter((product) => {
      const matchesLocation =
        selectedLocation === 'All' || product.location === selectedLocation
      const matchesSearch =
        !query ||
        [product.name, product.description, product.origin, product.location]
          .join(' ')
          .toLowerCase()
          .includes(query)

      return matchesLocation && matchesSearch
    })
  }, [products, searchTerm, selectedLocation])

  const updateProduct = (id, updates) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id ? { ...product, ...updates } : product,
      ),
    )
  }

  const deleteProduct = (id) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id),
    )
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleAddProduct = (event) => {
    event.preventDefault()

    const newProduct = {
      id: Date.now(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      origin: formData.origin.trim(),
      location: formData.location,
      price: Number(formData.price),
      stock: Number(formData.stock),
      status: formData.status,
    }

    setProducts((currentProducts) => [newProduct, ...currentProducts])
    setFormData(emptyForm)
    setNotice(`${newProduct.name} was added to the shop.`)
    navigate('/products')
  }

  const renderHomePage = () => (
    <section className="home-hero">
      <div className="hero-copy">
        <span>Fine jewellery inventory</span>
        <h1>Aurelia Jewellery</h1>
        <p>
          A polished workspace for managing premium pieces, boutique stock,
          pricing, and collection updates.
        </p>
        <div className="hero-actions">
          <button type="button" onClick={() => navigate('/products')}>
            Browse Shop
          </button>
          <button type="button" onClick={() => navigate('/add-product')}>
            Add New Piece
          </button>
        </div>
      </div>
      <div className="hero-panel" aria-label="Collection summary">
        <div className="hero-gem">AJ</div>
        <dl>
          <div>
            <dt>Pieces</dt>
            <dd>{products.length}</dd>
          </div>
          <div>
            <dt>Total stock</dt>
            <dd>{totalStock}</dd>
          </div>
          <div>
            <dt>Low stock</dt>
            <dd>{lowStockCount}</dd>
          </div>
        </dl>
      </div>
    </section>
  )

  const renderShopPage = () => (
    <section className="shop-page">
      <aside className="shop-sidebar">
        <h2>Filters</h2>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          resultCount={filteredProducts.length}
        />

        <div className="location-filter">
          {locations.map((location) => (
            <label key={location}>
              <input
                checked={selectedLocation === location}
                name="location"
                type="radio"
                onChange={() => setSelectedLocation(location)}
              />
              {location}
            </label>
          ))}
        </div>
      </aside>

      <div className="shop-content">
        <div className="shop-heading">
          <div>
            <span>Shop collection</span>
            <h1>Jewellery Pieces</h1>
          </div>
          <button type="button" onClick={() => navigate('/add-product')}>
            Add Piece
          </button>
        </div>

        {notice && (
          <button className="notice" type="button" onClick={() => setNotice('')}>
            {notice}
          </button>
        )}

        {isLoading ? (
          <p className="empty-state">Loading jewellery pieces...</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                accentColor={productColors[index % productColors.length]}
                onUpdateProduct={updateProduct}
                onDeleteProduct={deleteProduct}
              />
            ))}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <p className="empty-state">No jewellery pieces match that search.</p>
        )}
      </div>
    </section>
  )

  const renderAdminPage = () => (
    <section className="admin-page">
      <div className="admin-card">
        <div className="admin-intro">
          <span>Admin Portal</span>
          <h1>Add a Jewellery Piece</h1>
          <p>Create a new catalog item and send it straight to the shop page.</p>
        </div>
        <form className="admin-form" onSubmit={handleAddProduct}>
        <label>
          Jewellery Name
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Type here"
          />
        </label>
        <label>
          Description
          <input
            required
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            placeholder="Type in"
          />
        </label>
        <label>
          Origin
          <input
            required
            name="origin"
            value={formData.origin}
            onChange={handleFormChange}
            placeholder="Type in"
          />
        </label>
        <label>
          Price
          <input
            required
            min="0"
            step="0.01"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleFormChange}
            placeholder="Type in"
          />
        </label>
        <label>
          Location
          <select name="location" value={formData.location} onChange={handleFormChange}>
            <option>Location 1</option>
            <option>Location 2</option>
            <option>Location 3</option>
            <option>Location 4</option>
          </select>
        </label>
        <label>
          Stock
          <input
            required
            min="0"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleFormChange}
            placeholder="Type in"
          />
        </label>
        <label>
          Status
          <select name="status" value={formData.status} onChange={handleFormChange}>
            <option>Active</option>
            <option>Low Stock</option>
            <option>Paused</option>
          </select>
        </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  )

  const renderPage = () => {
    if (page === '/products') {
      return renderShopPage()
    }

    if (page === '/add-product') {
      return renderAdminPage()
    }

    return renderHomePage()
  }

  return (
    <div className="site-shell">
      <Navbar activePage={page} onNavigate={navigate} />
      <main>{renderPage()}</main>
    </div>
  )
}

export default App
