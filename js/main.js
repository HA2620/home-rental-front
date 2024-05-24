document.addEventListener('DOMContentLoaded', () => {
  const houseType = document.getElementById('houseType');
  const sortPrice = document.getElementById('sortPrice');
  const location = document.getElementById('location');
  const rooms = document.getElementById('rooms');
  const washrooms = document.getElementById('washrooms');
  const filterBtn = document.getElementById('filterBtn');
  const houseList = document.querySelector('.house-list');
  const prevPage = document.getElementById('prevPage');
  const nextPage = document.getElementById('nextPage');
  const pageNumber = document.getElementById('pageNumber');

  let currentPage = 1;

  const fetchHouses = async () => {
    const type = houseType.value;
    const priceSort = sortPrice.value;
    const loc = location.value;
    const numRooms = rooms.value;
    const numWashrooms = washrooms.value;

    const res = await fetch(`http://localhost:5000/api/houses`);
    const data = await res.json();
    document.getElementById('show-house').innerHTML = ''
    data.forEach(house => {
      document.getElementById('show-house').innerHTML += `<div class="col-span-1 flex flex-col">
      <div>
          <img class="object-fill h-48 w-96 rounded-lg"
              src="${house.picUrl}"
              alt="" />
      </div>
      <div class="text-start">
          <p class="text-lg semibold">${house.name}</p>
          <p class="text-md text-gray-400">${house.description}</p>

          <div class='flex gap-5 mt-4'>
          <p class="p-2 text-xl text-bold text-black">
              ₹${house.price}
          </p>
          <a href="">
              <button
                  class="bg-black text-white px-6 rounded-md hover:bg-gray-300 hover:text-black">Details</button></a>
          </div>

      </div>
  </div>`
    });
  };

  filterBtn.addEventListener('click', fetchHouses);
  prevPage.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      pageNumber.textContent = currentPage;
      fetchHouses();
    }
  });

  nextPage.addEventListener('click', () => {
    currentPage++;
    pageNumber.textContent = currentPage;
    fetchHouses();
  });

  fetchHouses();
});

const showHouseDetails = async (houseId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const res = await fetch(`/api/houses/${houseId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const house = await res.json();
  alert(`Contact owner: ${house.owner.username}, Email: ${house.owner.email}`);
};
