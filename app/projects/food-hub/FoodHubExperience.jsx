"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./page.module.css";

const categories = ["All", "Bowls", "Mains", "Sides"];

const menuItems = [
  {
    id: "market-bowl",
    name: "Market Garden Bowl",
    category: "Bowls",
    description: "Roasted vegetables, brown rice, greens, and sesame dressing.",
    price: 325,
    image: "/food-hub/market-bowl.jpg",
    imageAlt: "A fresh bowl of vegetables and grains",
    tag: "FRESH PICK",
    available: true,
    featured: true,
  },
  {
    id: "margherita",
    name: "Wood-fired Margherita",
    category: "Mains",
    description: "Tomato, mozzarella, basil, and a crisp hand-stretched crust.",
    price: 380,
    image: "/food-hub/margherita.jpg",
    imageAlt: "A freshly baked pizza topped with tomato and cheese",
    tag: "HOUSE FAVORITE",
    available: true,
    featured: true,
  },
  {
    id: "good-burger",
    name: "The Good Burger",
    category: "Mains",
    description: "A juicy classic with crisp lettuce, tomato, and house sauce.",
    price: 395,
    image: "/food-hub/good-burger.jpg",
    imageAlt: "A stacked burger with fresh lettuce and tomato",
    tag: "",
    available: false,
    featured: false,
  },
  {
    id: "citrus-salad",
    name: "Citrus Crunch Salad",
    category: "Sides",
    description: "Bright seasonal greens with citrus and a little crunch.",
    price: 245,
    image: "/food-hub/citrus-salad.jpg",
    imageAlt: "A colorful salad of fresh greens and vegetables",
    tag: "",
    available: true,
    featured: false,
  },
];

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path
        d="M4.167 10h11.666M10 4.167 15.833 10 10 15.833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L20.5 8H6.1M10 20a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Zm9 0a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <circle cx="10.8" cy="10.8" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4.5 4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M4 10h12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function FoodCard({ item, quantity, onAdd, onChangeQuantity }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className={styles.foodCard}>
      <div className={styles.foodImage}>
        {!imageLoaded && !imageFailed ? (
          <div className={styles.imageLoading} role="status">
            <span className={styles.visuallyHidden}>Loading food image</span>
          </div>
        ) : null}
        {imageFailed ? (
          <div className={styles.imageFallback} role="img" aria-label={item.imageAlt}>
            <span>FH</span>
            <p>Fresh from our menu</p>
          </div>
        ) : (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 25vw"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageFailed(true)}
          />
        )}
        {item.tag ? <span className={styles.foodTag}>{item.tag}</span> : null}
        <span
          className={`${styles.availability} ${
            item.available ? styles.available : styles.soldOut
          }`}
        >
          <span aria-hidden="true" />
          {item.available ? "Available today" : "Sold out today"}
        </span>
      </div>
      <div className={styles.foodDetails}>
        <div className={styles.foodHeading}>
          <div>
            <span className={styles.foodCategory}>{item.category}</span>
            <h3>{item.name}</h3>
          </div>
          <span className={styles.price}>{formatPrice(item.price)}</span>
        </div>
        <p className={styles.foodDescription}>{item.description}</p>
        {quantity > 0 ? (
          <div className={`${styles.addButton} ${styles.quantityStepper}`}>
            <button
              type="button"
              aria-label={`Remove one ${item.name}`}
              onClick={() => onChangeQuantity(item.id, -1)}
            >
              <MinusIcon />
            </button>
            <span className={styles.quantityValue} aria-live="polite">
              <strong>{quantity}</strong> in bag
            </span>
            <button
              type="button"
              aria-label={`Add one ${item.name}`}
              onClick={() => onAdd(item)}
            >
              <PlusIcon />
            </button>
          </div>
        ) : (
          <button
            className={styles.addButton}
            type="button"
            onClick={() => onAdd(item)}
            disabled={!item.available}
          >
            {item.available ? (
              <>
                Add to bag <PlusIcon />
              </>
            ) : (
              "Currently unavailable"
            )}
          </button>
        )}
      </div>
    </article>
  );
}

function CartDrawer({ cart, onClose, onChangeQuantity, total }) {
  const itemCount = cart.reduce((count, line) => count + line.quantity, 0);

  return (
    <div
      className={styles.cartOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={styles.cartDrawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onKeyDown={(event) => {
          if (event.key === "Escape") onClose();
        }}
      >
        <div className={styles.cartHeader}>
          <div>
            <p className={styles.cartEyebrow}>YOUR FOOD HUB ORDER</p>
            <h2 id="cart-title">Your bag <span>({itemCount})</span></h2>
          </div>
          <button className={styles.closeCart} type="button" onClick={onClose} aria-label="Close bag">
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className={styles.emptyCart}>
            <span aria-hidden="true">!</span>
            <h3>Your bag is taking a break.</h3>
            <p>Add something delicious from the menu to get started.</p>
            <button className={styles.drawerAction} type="button" onClick={onClose}>
              Browse the menu
            </button>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cart.map(({ item, quantity }) => (
                <article className={styles.cartItem} key={item.id}>
                  <div className={styles.cartItemImage}>
                    <Image src={item.image} alt="" fill sizes="80px" />
                  </div>
                  <div className={styles.cartItemInfo}>
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)} each</p>
                    <div className={styles.quantityControls} aria-label={`${item.name} quantity`}>
                      <button
                        type="button"
                        aria-label={`Remove one ${item.name}`}
                        onClick={() => onChangeQuantity(item.id, -1)}
                      >
                        <MinusIcon />
                      </button>
                      <span aria-live="polite">{quantity}</span>
                      <button
                        type="button"
                        aria-label={`Add one ${item.name}`}
                        onClick={() => onChangeQuantity(item.id, 1)}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                  <strong className={styles.lineTotal}>{formatPrice(item.price * quantity)}</strong>
                </article>
              ))}
            </div>
            <div className={styles.cartSummary}>
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <p>Delivery and taxes are not included in this concept.</p>
              <button className={styles.drawerAction} type="button" disabled>
                Ordering demo only
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default function FoodHubExperience() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const visibleItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filtered = menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        !normalizedQuery ||
        `${item.name} ${item.description} ${item.category}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });

    if (sortOrder === "price-low") return [...filtered].sort((a, b) => a.price - b.price);
    if (sortOrder === "price-high") return [...filtered].sort((a, b) => b.price - a.price);
    if (sortOrder === "name") return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    return [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [activeCategory, searchQuery, sortOrder]);

  const itemCount = cart.reduce((count, line) => count + line.quantity, 0);
  const cartTotal = cart.reduce((total, line) => total + line.item.price * line.quantity, 0);

  function addToCart(item) {
    setCart((currentCart) => {
      const existing = currentCart.find((line) => line.item.id === item.id);
      if (existing) {
        return currentCart.map((line) =>
          line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...currentCart, { item, quantity: 1 }];
    });
    setAnnouncement(`${item.name} added to your bag.`);
  }

  function changeQuantity(itemId, amount) {
    setCart((currentCart) =>
      currentCart
        .map((line) =>
          line.item.id === itemId ? { ...line, quantity: line.quantity + amount } : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }

  return (
    <div className={styles.foodHub} id="top">
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>

      <div className={styles.promoBar}>
        <span>GOOD MOOD, ON THE WAY.</span>
        <a href="#menu">Meet your next favorite <ArrowIcon /></a>
      </div>

      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="Food Hub home">
          <span className={styles.brandMark} aria-hidden="true">FH</span>
          <span className={styles.brandName}>food<span>hub</span></span>
        </a>
        <nav className={styles.navigation} aria-label="Main navigation">
          <a href="#menu">Menu</a>
          <a href="#story">Our story</a>
          <a href="#contact">Contact</a>
        </nav>
        <button
          className={styles.cartLink}
          type="button"
          aria-label={`Open your bag, ${itemCount} items`}
          onClick={() => setIsCartOpen(true)}
        >
          <CartIcon />
          <span className={styles.cartText}>Your bag</span>
          <span className={styles.cartCount} aria-live="polite">{itemCount}</span>
        </button>
      </header>

      <main id="main-content">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              GOOD FOOD. ZERO BORING BITES.
            </p>
            <h1 id="hero-title">
              Hungry for
              <br />
              <span>something</span>
              <br />
              <em>really good?</em>
            </h1>
            <p className={styles.heroDescription}>
              Meet feel-good favorites, fresh-off-the-menu finds, and big
              flavors worth getting excited about.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#menu">
                Get into the menu <ArrowIcon />
              </a>
              <span>Fresh ideas. Full-on flavor.</span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <Image
              className={styles.heroImage}
              src="/food-hub/hero.jpg"
              alt="A colorful, fresh bowl ready to enjoy"
              fill
              priority
              loading="eager"
              sizes="(max-width: 760px) 100vw, 54vw"
            />
            <span className={styles.heroSticker}>FRESH<br />& FEEL-GOOD</span>
            <div className={styles.heroImageCaption}>
              <span>GOOD THINGS, MADE FRESH</span>
              <span>01 / 04</span>
            </div>
          </div>
        </section>

        <section className={styles.promoSection} aria-label="Food Hub special">
          <span className={styles.promoSpark} aria-hidden="true">✳</span>
          <p><strong>Big flavor</strong> is calling.</p>
          <a href="#menu">Answer it <ArrowIcon /></a>
          <span className={styles.promoSmall}>YOUR NEXT FAVORITE IS JUST A BITE AWAY</span>
        </section>

        <section className={styles.menuSection} id="menu" aria-labelledby="menu-title">
          <div className={styles.menuHeading}>
            <div>
              <p className={styles.sectionEyebrow}>THE GOOD STUFF / 01</p>
              <h2 id="menu-title">Pick your <em>happy.</em></h2>
              <p className={styles.introDescription}>
                Fresh picks, comfort classics, and a little something for every kind of hungry.
              </p>
            </div>
            <span className={styles.menuCount}>{visibleItems.length} GOOD THINGS</span>
          </div>

          <div className={styles.menuTools}>
            <div className={styles.categoryNav} aria-label="Filter menu by category">
              {categories.map((category) => (
                <button
                  className={activeCategory === category ? styles.activeCategory : ""}
                  type="button"
                  key={category}
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category === "All" ? "Everything" : category}
                </button>
              ))}
            </div>
            <div className={styles.menuControls}>
              <label className={styles.searchBox}>
                <SearchIcon />
                <span className={styles.visuallyHidden}>Search menu</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Find a favorite..."
                />
              </label>
              <label className={styles.sortBox}>
                <span>Sort</span>
                <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </label>
            </div>
          </div>

          {visibleItems.length > 0 ? (
            <div className={styles.foodGrid}>
              {visibleItems.map((item) => (
                <FoodCard
                  item={item}
                  key={item.id}
                  quantity={cart.find((line) => line.item.id === item.id)?.quantity ?? 0}
                  onAdd={addToCart}
                  onChangeQuantity={changeQuantity}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyMenu} role="status">
              <span aria-hidden="true">?</span>
              <h3>No bites found. Yet.</h3>
              <p>Try another search or take a look at everything on the menu.</p>
              <button
                className={styles.resetButton}
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
              >
                Show me everything
              </button>
            </div>
          )}
          <p className={styles.menuNote}>
            Sample menu and prices in PHP for this concept. Availability is illustrative.
          </p>
          <p className={styles.announcement} aria-live="polite">{announcement}</p>
        </section>

        <section className={styles.story} id="story">
          <div className={styles.storyImage}>
            <Image
              src="/food-hub/market-bowl.jpg"
              alt="A bowl of colorful grains, greens, and fresh vegetables"
              fill
              loading="eager"
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <span>MORE COLOR. MORE CRUNCH. MORE JOY.</span>
          </div>
          <div className={styles.storyCopy}>
            <p className={styles.sectionEyebrow}>A LITTLE ABOUT US / 02</p>
            <h2>
              Good food
              <br />
              brings the
              <br />
              <em>good times.</em>
            </h2>
            <p>
              Food Hub is all about finding the fun in what&apos;s fresh. We bring
              together bold flavors and familiar favorites so deciding what to
              eat feels like the best part of the day.
            </p>
            <a className={styles.storyLink} href="#menu">
              Get to know the menu <ArrowIcon />
            </a>
          </div>
        </section>

        <section className={styles.contact} id="contact">
          <p className={styles.sectionEyebrow}>SAY HEY / 03</p>
          <div className={styles.contactRow}>
            <h2>
              Let&apos;s talk
              <br />
              <em>food.</em>
            </h2>
            <div className={styles.contactInfo}>
              <p>Questions, ideas, or a craving you need to share? We&apos;re all ears.</p>
              <a href="mailto:hello@foodhub.example">hello@foodhub.example</a>
              <a href="tel:+630000000000">+63 (000) 000 0000</a>
              <span>Contact details are editable placeholders.</span>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.footerBrand} href="#top">
          food<span>hub</span>
        </a>
        <p>Good food. Good mood. Food Hub is a website concept.</p>
        <a href="#top" className={styles.backToTop}>Back to top ↑</a>
      </footer>

      {isCartOpen ? (
        <CartDrawer
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onChangeQuantity={changeQuantity}
          total={cartTotal}
        />
      ) : null}
    </div>
  );
}
