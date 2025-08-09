const categoryBar = document.getElementById("category-bar");
const menuItemsContainer = document.getElementById("menu-items");

// Create category buttons
Object.keys(menuData).forEach((category, index) => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.textContent = category;

    if (index === 0) {
        btn.classList.add("active");
        displayMenuItems(category);
    }

    btn.addEventListener("click", () => {
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        displayMenuItems(category);
    });

    categoryBar.appendChild(btn);
});

function displayMenuItems(category) {
    menuItemsContainer.innerHTML = "";
    menuData[category].forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "menu-item";

        itemDiv.innerHTML = `
            <div class="menu-item-header">
                <span>${item.name}</span>
                <span>${item.price}</span>
            </div>
            <div class="ingredients">${item.ingredients}</div>
        `;

        menuItemsContainer.appendChild(itemDiv);
    });
}
