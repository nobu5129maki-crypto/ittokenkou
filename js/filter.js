(function () {
  const header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-stuck", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const search = document.querySelector("#search");
  if (!search) return;

  const chips = document.querySelectorAll(".chip");
  const cards = document.querySelectorAll("#catalog .card");
  const count = document.querySelector("#result-count");
  const empty = document.querySelector("#empty");
  let category = "すべて";

  function apply() {
    const query = (search.value || "").trim().toLowerCase();
    let visible = 0;
    cards.forEach(function (card) {
      const inCategory = category === "すべて" || card.dataset.category === category;
      const haystack = (card.dataset.search || "").toLowerCase();
      const matched = !query || haystack.indexOf(query) !== -1;
      const show = inCategory && matched;
      card.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = visible + "件";
    empty.classList.toggle("is-shown", visible === 0);
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      category = chip.dataset.filter;
      chips.forEach(function (other) {
        other.setAttribute("aria-pressed", other === chip ? "true" : "false");
      });
      apply();
    });
  });

  search.addEventListener("input", apply);
  apply();
})();
