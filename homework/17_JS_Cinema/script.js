const rows = 6;
const cols = 8;
const price = 1000;

const container = document.getElementById("seats-container");
const countEl = document.getElementById("count");
const totalEl = document.getElementById("total");
const bookBtn = document.getElementById("book-btn");

let seats = [];

for (let i = 0; i < rows * cols; i++) {
  const seat = document.createElement("div");
  seat.classList.add("seat", "free");

  if (Math.random() < 0.2) {
    seat.classList.remove("free");
    seat.classList.add("occupied");
  }

  container.appendChild(seat);
  seats.push(seat);
}

container.addEventListener("click", (e) => {
  if (!e.target.classList.contains("seat")) return;

  if (e.target.classList.contains("occupied")) return;

  e.target.classList.toggle("selected");
  updateInfo();
});

function updateInfo() {
  const selectedSeats = document.querySelectorAll(".seat.selected");
  const count = selectedSeats.length;
  const total = count * price;

  countEl.textContent = count;
  totalEl.textContent = total;
}

bookBtn.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".seat.selected");

  selectedSeats.forEach(seat => {
    seat.classList.remove("selected");
    seat.classList.add("occupied");
  });

  updateInfo();
});