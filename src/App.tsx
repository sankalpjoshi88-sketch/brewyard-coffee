import { useState } from 'react';

type Product = { id: number; name: string; category: string; price: number; size: string; description: string; photo: string };
type CartItem = { product: Product; quantity: number };

// Numeric prices keep the total calculation simple.
const products: Product[] = [
  { id: 1, name: 'Original Cold Brew', category: 'Cold brew', price: 185, size: '250 ml', description: 'Serve over ice. Add milk if that is your thing.', photo: 'photo-1517701604599-bb29b565090c' },
  { id: 2, name: 'Medium Roast Beans', category: 'Beans', price: 495, size: '250 g', description: 'For mornings when you have time to grind and brew.', photo: 'photo-1559056199-641a0ac8b55e' },
  { id: 3, name: 'Vanilla Cold Latte', category: 'Cold brew', price: 210, size: '250 ml', description: 'Coffee, milk and a little vanilla. Best served chilled.', photo: 'photo-1572442388796-11668a67e53d' },
  { id: 4, name: 'Everyday Instant', category: 'Instant', price: 380, size: '100 g', description: 'A spoonful, hot water, and you are good to go.', photo: 'photo-1495474472287-4d71bcdd2085' },
];

function photoUrl(photo: string) {
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=900&q=80`;
}

export default function App() {
  const [category, setCategory] = useState('All coffee');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const filteredProducts = products.filter(p => category === 'All coffee' || p.category === category);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  function addToCart(product: Product) {
    setCart(current => {
      const exists = current.some(item => item.product.id === product.id);
      if (!exists) return [...current, { product, quantity: 1 }];
      return current.map(item => item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 } : item);
    });
    setMessage(`${product.name} added to your bag.`);
  }

  function changeQuantity(id: number, change: number) {
    setCart(current => current.map(item => item.product.id === id
      ? { ...item, quantity: item.quantity + change } : item
    ).filter(item => item.quantity > 0));
    setMessage('Bag updated.');
  }

  return (
    <>
      <header className="site-header page-width">
        <a className="brand" href="#home">brewyard<span> / coffee & co.</span></a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
        <nav id="navigation" className={menuOpen ? 'navigation open' : 'navigation'}>
          <a href="#shop" onClick={() => setMenuOpen(false)}>Coffee</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#brew" onClick={() => setMenuOpen(false)}>Brew guide</a>
        </nav>
        <a className="bag-link" href="#bag">Bag ({count})</a>
      </header>
      <main>
        <section className="hero page-width" id="home">
          <div>
            <p className="small-label">THE COFFEE BREAK</p>
            <h1>A good reason<br />to take <em>five.</em></h1>
            <p>Close the laptop for a bit. Put the kettle on.<br />Your next cup doesn't need to be complicated.</p>
            <a className="button" href="#shop">Find your coffee</a>
            <p className="footnote">Cold brew, whole beans & the everyday instant.</p>
          </div>
          <figure>
            <img src={photoUrl('photo-1495474472287-4d71bcdd2085')} alt="Three friends sharing hot and iced coffees" />
            <figcaption>Some things are better away from a screen.</figcaption>
          </figure>
        </section>

        <section className="shop page-width" id="shop">
          <div className="section-title"><h2>What's on the shelf</h2><p>A short menu. Something for every kind of morning.</p></div>
          <div className="filters" role="group" aria-label="Coffee category">
            {['All coffee', 'Cold brew', 'Beans', 'Instant'].map(name => (
              <button key={name} aria-pressed={category === name} className={category === name ? 'selected' : ''} onClick={() => setCategory(name)}>{name}</button>
            ))}
          </div>
          <div className="product-grid">
            {filteredProducts.map(product => (
              <article className="product" key={product.id}>
                <img src={photoUrl(product.photo)} alt={`${product.name} — illustrative coffee photograph`} loading="lazy" />
                <div className="product-heading"><h3>{product.name}</h3><span>₹{product.price}</span></div>
                <small>{product.size}</small>
                <p>{product.description}</p>
                <button className="add-button" onClick={() => addToCart(product)}>Add to bag <span>+</span></button>
              </article>
            ))}
          </div>
          <p className="footnote">Concept menu · photographs are illustrative.</p>
        </section>

        <section className="about page-width" id="about">
          <h2>A small shop.<br />A simple idea.</h2>
          <div><p>BrewYard is a coffee-store concept built around the way we actually drink coffee: a quick cup before heading out, something cold after lunch, or a slower brew on Sunday.</p><p>Four choices to start with. Pick the one that fits your day.</p></div>
        </section>

        <section className="brew-guide page-width" id="brew">
          <div><p className="small-label">KEEP THIS HANDY</p><h2>Making your first cup?</h2><p>Start here, then adjust it to your taste.</p></div>
          <ol>
            <li><strong>Instant</strong><span>Start with 1 tsp in 150 ml hot water or milk. Stir well.</span></li>
            <li><strong>Cold brew</strong><span>Pour over ice. Taste first, then add milk if you like.</span></li>
            <li><strong>Whole beans</strong><span>Grind for your brewer. Try 15 g coffee to 250 ml water.</span></li>
          </ol>
        </section>

        <section className="bag page-width" id="bag">
          <div className="section-title"><h2>Your bag</h2><p>Practice cart · no payment or real order.</p></div>
          {cart.length === 0 ? <p>Nothing here yet. <a href="#shop">Have a look at the coffee.</a></p> : (
            <>
              {cart.map(item => (
                <div className="bag-row" key={item.product.id}>
                  <div><h3>{item.product.name}</h3><small>₹{item.product.price} each</small></div>
                  <div className="quantity">
                    <button aria-label={`Remove one ${item.product.name}`} onClick={() => changeQuantity(item.product.id, -1)}>−</button>
                    <span>{item.quantity}</span>
                    <button aria-label={`Add one ${item.product.name}`} onClick={() => changeQuantity(item.product.id, 1)}>+</button>
                  </div>
                  <strong>₹{item.product.price * item.quantity}</strong>
                </div>
              ))}
              <div className="bag-total"><span>Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div>
              <button className="button" onClick={() => setMessage('Demo complete. No order was placed and no payment is needed.')}>Try demo checkout</button>
            </>
          )}
          <p className="status" role="status">{message}</p>
        </section>
      </main>
      <footer className="page-width"><a className="brand" href="#home">brewyard</a><p>A coffee-store project. Built with React & CSS.</p><a href="#home">Back to top ↑</a></footer>
    </>
  );
}
