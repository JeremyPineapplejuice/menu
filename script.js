const categoryBar = document.getElementById("category-bar");
const menuItemsContainer = document.getElementById("menu-items");

// === CONFIG: Your Google Sheet CSV link ===
const sheetCSV = "https://docs.google.com/spreadsheets/d/1a3APieCKpAgjnEmihwAT_IkfEGqwlGUdP9nMEUTID88/edit?gid=0#gid=0/gviz/tq?tqx=out:csv";

// Fetch and parse CSV
fetch(sheetCSV)
    .then(response => response.text())
    .then(csvText => {
        const data = Papa.parse(csvText, { header: true }).data;
        buildMenu(data);
    });

function buildMenu(rows) {
    const menuData = {};

    // Group items by category
    rows.forEach(row => {
        const category = row.Category.trim();
        if (!menuData[category]) {
            menuData[category] = [];
        }
        menuData[category].push({
            name: row.Name,
            price: row.Price,
            ingredients: row.Ingredients
        });
    });

    // Build category buttons
    Object.keys(menuData).forEach((category, index) => {
        const btn = document.createElement("button");
        btn.className = "category-btn";
        btn.textContent = category;

        if (index === 0) {
            btn.classList.add("active");
            displayMenuItems(menuData, category);
        }

        btn.addEventListener("click", () => {
            document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            displayMenuItems(menuData, category);
        });

        categoryBar.appendChild(btn);
    });
}

function displayMenuItems(menuData, category) {
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


