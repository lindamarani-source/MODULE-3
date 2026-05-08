function ProductCard({
  product,
  accentColor,
  onUpdateProduct,
  onDeleteProduct,
}) {
  return (
    <article className="product-card" style={{ backgroundColor: accentColor }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>{product.origin}</span>
      <strong>${product.price.toFixed(2)}</strong>

      <label>
        Price
        <input
          min="0"
          step="0.01"
          type="number"
          value={product.price}
          onChange={(event) =>
            onUpdateProduct(product.id, { price: Number(event.target.value) })
          }
        />
      </label>

      <select
        value={product.status}
        onChange={(event) =>
          onUpdateProduct(product.id, { status: event.target.value })
        }
      >
        <option>Active</option>
        <option>Low Stock</option>
        <option>Paused</option>
      </select>

      <button type="button" onClick={() => onDeleteProduct(product.id)}>
        Remove
      </button>
    </article>
  )
}

export default ProductCard
