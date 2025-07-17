const input = document.getElementById('title');
const sortTitle = document.getElementById('sortTitle');
const container = document.getElementById('coffees');
let coffeesArray = [];
fetch('https://api.sampleapis.com/coffee/hot')
    .then(res => res.json())
    .then(data => {
        coffeesArray = data.slice(0, 8);
        displayCoffees(coffeesArray);
    });

function displayCoffees(coffees) {
    container.innerHTML = '';
    coffees.forEach(coffee => {
        const div = document.createElement('div');
        div.className = 'bg-zinc-100 rounded-lg shadow-lg p-6 flex flex-col items-center';
        div.innerHTML = `
            <img src="${coffee.image}" alt="${coffee.title}" class="w-32 h-32 object-cover rounded mb-4">
            <h3 class="text-xl font-bold mb-2">${coffee.title}</h3>
            <p class="text-gray-700 mb-2 text-center">${coffee.description || 'No description available.'}</p>
            <p class="text-sm text-gray-600"><span class="font-semibold">Ingredients:</span> ${coffee.ingredients ? coffee.ingredients.join(', ') : 'N/A'}</p>
        `;
        container.appendChild(div);
    });
}

function filterAndSortCoffees() {
    let filtered = [...coffeesArray];
    const keyword = input.value.toLowerCase();

    if (keyword) {
        filtered = filtered.filter(c => c.title.toLowerCase().includes(keyword));
    }

    const titleSort = sortTitle.value;
    if (titleSort === 'az') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (titleSort === 'za') {
        filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    displayCoffees(filtered);
}

input.addEventListener('input', filterAndSortCoffees);
sortTitle.addEventListener('change', filterAndSortCoffees);
