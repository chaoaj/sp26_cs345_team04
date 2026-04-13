// Run after page loads
window.onload = () => {

    // ====== BASIC STYLES VIA JS ======
    document.body.style.margin = "0";
    document.body.style.fontFamily = "monospace";
    document.body.style.background = "green";
    document.body.style.color = "white";

    // ====== GAME STATE ======
    let money = 500;
    let draggedTower = null;

    const towers = [
        // for the icon insert an image/sprite image for towers
        { type: "archer", img: "dev/Sprites/Tower_Sprites/Archer_Tower_Assets/1_Upgrade/1.png", cost: 100, damage: 5, range: 2 },
        { type: "stone", img: "dev/Sprites/Tower_Sprites/Stone_Tower_Assets/PNG/3.png", cost: 200, damage: 15, range: 3 },
    ];

    // ====== ROOT CONTAINER ======
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.height = "100vh";
    document.body.appendChild(container);

    // ====== SHOP ======
    const shop = document.createElement("div");
    shop.style.width = "200px";
    shop.style.background = "#222";
    shop.style.padding = "10px";
    container.appendChild(shop);

    const title = document.createElement("h2");
    title.innerText = "TOWERS";
    shop.appendChild(title);

    towers.forEach(t => {
        const card = document.createElement("div");
        card.innerText = `${t.icon} ${t.type} ($${t.cost})`;
        card.style.border = "1px solid white";
        card.style.margin = "5px";
        card.style.padding = "5px";
        card.draggable = true;

        card.ondragstart = () => draggedTower = t;

        shop.appendChild(card);
    });

    // ====== GAME AREA ======
    const gameArea = document.createElement("div");
    gameArea.style.display = "flex";
    gameArea.style.flexDirection = "column";
    gameArea.style.alignItems = "flex-end";
    container.appendChild(gameArea);

    // HUD
    const hud = document.createElement("div");
    hud.style.padding = "10px";
    hud.innerText = `Money: $${money}`;
    gameArea.appendChild(hud);

    function updateHUD() {
        hud.innerText = `Money: $${money}`;
    }

    // ====== GRID ======
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(7, 80px)";
    grid.style.gridGap = "2px";
    grid.style.margin = "20px";
    gameArea.appendChild(grid);

    const path = [3,10,17,24];

    for (let i = 0; i < 35; i++) {
        const cell = document.createElement("div");
        cell.style.width = "80px";
        cell.style.height = "80px";
        cell.style.border = "1px solid gray";
        cell.style.display = "flex";
        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";

        if (path.includes(i)) {
            cell.style.background = "#555";
        }

        // Allow drop
        cell.ondragover = (e) => e.preventDefault();

        cell.ondrop = () => {
            if (!draggedTower) return;

            if (path.includes(i)) {
                alert("Cannot place on path!");
                return;
            }

            if (money < draggedTower.cost) {
                alert("Not enough money!");
                return;
            }

            if (cell.firstChild) {
                alert("Already occupied!");
                return;
            }

            const tower = document.createElement("div");
            tower.innerText = draggedTower.icon;
            tower.style.fontSize = "30px";

            cell.appendChild(tower);

            money -= draggedTower.cost;
            updateHUD();
        };

        grid.appendChild(cell);
    }

    // ====== BUTTON ======
    const btn = document.createElement("button");
    btn.innerText = "Start Wave";
    btn.onclick = () => alert("Wave system not added yet");
    gameArea.appendChild(btn);
};

