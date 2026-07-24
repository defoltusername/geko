const button = document.getElementById("changeColor");

button.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});