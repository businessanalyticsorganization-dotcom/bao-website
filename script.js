const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#primary-navigation');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

// Events page: mark the next upcoming event and file past ones away.
(function () {
  const cards = [...document.querySelectorAll('.event-card[data-date]')];
  if (!cards.length) return;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const past = document.querySelector('#past-list');
  let nextFound = false;
  cards.forEach((card) => {
    const d = new Date(card.dataset.date + 'T00:00:00');
    if (d < today) { past.prepend(card); return; }
    if (!nextFound) { card.classList.add('is-next'); nextFound = true; }
  });
  document.querySelectorAll('.event-month').forEach((h) => {
    let n = h.nextElementSibling, live = false;
    while (n && !n.classList.contains('event-month')) { if (n.classList.contains('event-card')) live = true; n = n.nextElementSibling; }
    if (!live) h.remove();
  });
  if (past.children.length) past.closest('details').hidden = false;
})();
