const container = document.querySelector("#container")
//const API_URL = "https://docs.noroff.dev/docs/v2/e-commerce/rainy-days#all-products"
const API_URL = "https://v2.api.noroff.dev/rainy-days"

async function fetchAPIProducts() {
    try {
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")

        if (!id) {
            container.textContent = "No product ID provided in the URL.";
            return;
        }
        const response = await fetch(`${API_URL}/${id}`)
        // if (!response.ok) {
        //     if (response.status === 404) {
        //         container.textContent = "Sorry, product not found.";
        //         return;}
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        const data = await response.json()
        const product = data.data

        const productDiv = document.createElement("div")
        const image = document.createElement("img")
        const title = document.createElement("h2")
        const description = document.createElement("p")
        const price = document.createElement("p")
        const backLink = document.createElement("a")

        productDiv.className = 'product-details';
        image.className = 'product-image';
        title.className = 'product-title';
        description.className = 'product-description';
        price.className = 'product-price';
        const buyButton = document.createElement("button");
        backLink.className = 'back-link';
        backLink.textContent = "← Back to products";
        
        image.src = product.image.url;
        image.alt = product.image.alt;
        title.textContent = product.title;
        description.textContent = product.description;
        price.textContent = product.price;
        price.textContent = `$ ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        buyButton.textContent = "Add to Cart";
        backLink.textContent = "← Back to products";
        backLink.href = '../Views/Home/index.html';
    
        productDiv.appendChild(image)
        productDiv.appendChild(title)
        productDiv.appendChild(description)
        productDiv.appendChild(price)
        productDiv.appendChild(backLink)
        productDiv.appendChild(buyButton)

        container.appendChild(productDiv)
    } catch (error) {
        console.error("Error while fetching product:", error)
    }
}

fetchAPIProducts()