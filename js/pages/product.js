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
        const data = await response.json()
        const product = data.data

        const productDiv = document.createElement("div")
        const image = document.createElement("img")
        const title = document.createElement("h2")
        const description = document.createElement("p")
        const price = document.createElement("p")
        const backLink = document.createElement("a")

        productDiv.className = 'product-detail';
        image.className = 'product-image';
        title.className = 'product-title';
        description.className = 'product-description';
        price.className = 'product-price';
        backLink.className = 'back-link';
        backLink.href = "index.html";
        backLink.textContent = "← Back to products";
        
        image.src = product.image.url;
        image.alt = product.image.alt;
        title.textContent = product.title;
        description.textContent = product.description;
        price.textContent = `NOK ${product.price.toLocaleString('nb-NO', { minimumFractionDigits: 2 })}`;
        backLink.textContent = "← Back to products";
        backLink.href = "index.html";
    
        productDiv.appendChild(image)
        productDiv.appendChild(title)
        productDiv.appendChild(description)
        productDiv.appendChild(price)
        productDiv.appendChild(backLink)
        
        container.appendChild(productDiv)
    } catch (error) {
        console.error("Error while fetching product:", error)
        container.textContent = "Could not load product at this time.";
    }
}

fetchAPIProducts()