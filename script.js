document.addEventListener('DOMContentLoaded', () => {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Fetch product details (this would typically come from a server or a JSON file)
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (product) {
                document.getElementById('product-title').innerText = product.title;
                document.getElementById('product-image').src = product.image;
                document.getElementById('product-image').alt = product.title;
                document.getElementById('product-description').innerText = product.description;
                document.getElementById('product-price').innerText = `$${product.price}`;
            } else {
                document.getElementById('product-details').innerText = 'Product not found';
            }
        })
        .catch(error => console.error('Error loading product details:', error));
});



document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navMenu = document.querySelector('.nav-menu');

    menuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('show'); // Toggle the visibility of the nav menu
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Handle the first set of icons
    const loveIcon1 = document.getElementById('love-icon');
    loveIcon1.addEventListener('click', () => {
        loveIcon1.classList.toggle('liked');
        const message = loveIcon1.querySelector('.message');
        if (loveIcon1.classList.contains('liked')) {
            message.textContent = "Thanks for the like";
        } else {
            message.textContent = "";
        }
    });

    // Handle the second set of icons
    const loveIcon2 = document.getElementById('love-icon-2');
    loveIcon2.addEventListener('click', () => {
        loveIcon2.classList.toggle('liked');
        const message = loveIcon2.querySelector('.message');
        if (loveIcon2.classList.contains('liked')) {
            message.textContent = "Thanks for the like";
        } else {
            message.textContent = "";
        }
    });

    // Handle tab clicks to load category-specific products
    const tabs = document.querySelectorAll('.tab-button');
    const categorySelect = document.getElementById('category-select');
    const homepageSections = document.getElementById('homepage-sections');
    const trendingProducts = document.getElementById('trending-products');
    const newProducts = document.getElementById('new-products');
    const categoryProducts = document.getElementById('category-products');

    const loadProducts = async () => {
        try {
            const trendingResponse = await fetch('trending.html');
            if (!trendingResponse.ok) throw new Error('Network response was not ok');
            const trendingText = await trendingResponse.text();
            trendingProducts.innerHTML = trendingText;

            const newResponse = await fetch('new.html');
            if (!newResponse.ok) throw new Error('Network response was not ok');
            const newText = await newResponse.text();
            newProducts.innerHTML = newText;
        } catch (error) {
            console.error('Error loading products:', error);
            trendingProducts.innerHTML = '<p>Failed to load trending products. Please try again later.</p>';
            newProducts.innerHTML = '<p>Failed to load new products. Please try again later.</p>';
        }
    };

    const handleCategoryChange = async (category) => {
        categoryProducts.innerHTML = ''; // Clear existing content
        trendingProducts.style.display = 'none';
        newProducts.style.display = 'none';

        if (category === 'all') {
            homepageSections.style.display = 'block';
            loadProducts();
        } else {
            homepageSections.style.display = 'none';
            try {
                const response = await fetch(category);
                if (!response.ok) throw new Error('Network response was not ok');
                const text = await response.text();
                categoryProducts.innerHTML = text;
            } catch (error) {
                console.error('Error loading category:', error);
                categoryProducts.innerHTML = '<p>Failed to load category products. Please try again later.</p>';
            }
        }
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-category');
            handleCategoryChange(category);
        });
    });

    categorySelect.addEventListener('change', () => {
        const category = categorySelect.value;
        handleCategoryChange(category);
    });

    // Set the default view
    tabs[0].click(); // Click "All Categories" by default
});
