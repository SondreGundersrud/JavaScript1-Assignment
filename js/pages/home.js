const container = document.querySelector("#container")
//const API_URL = "https://docs.noroff.dev/docs/v2/e-commerce/rainy-days#all-products"
const API_URL = "https://v2.api.noroff.dev/rainy-days"

async function fetchAPIProducts() {
    let products = [];
    try {
        const response = await fetch(API_URL, { method: "GET" });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        products = Array.isArray(data?.data) ? data.data : data;
            if (!Array.isArray(products)) {
            throw new Error("Unknown error occurred while fetching products");
        
        }products.forEach((product) => {
            const box = document.createElement("div");
            const image = document.createElement("img");
            const content = document.createElement("div");
            const title = document.createElement("h2");
            const price = document.createElement("p");
            const link = document.createElement("a");

            box.className = 'box';
            image.className = 'box-image';
            content.className = 'box-content';
            title.className = 'box-title';
            price.className = 'box-price';
            link.href = `/product.html?id=${product.id}`;

            image.src = product.image.url;
            image.alt = product.image.alt;
            title.textContent = product.title;
            price.textContent = `NOK ${product.price.toLocaleString('nb-NO', { minimumFractionDigits: 2 })}`;

            content.appendChild(title);
            content.appendChild(price);
            box.appendChild(image);
            box.appendChild(content);
            link.appendChild(box);

            container.appendChild(box);});
        //const products = data.data if (!response.ok)
        
    } catch (error) {
        container.textContent = "Could not load products at this time.";
        console.error("Error while fetching products:", error.message);
    }
}
fetchAPIProducts()