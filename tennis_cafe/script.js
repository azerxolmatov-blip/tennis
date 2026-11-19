const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.menu-card');
const cart = [];
const format = n => n.toLocaleString('ru-RU') + ' сум';

filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  const category = button.dataset.filter;
  cards.forEach(card => card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category));
}));

document.querySelectorAll('.add-btn').forEach(button => button.addEventListener('click', () => {
  const item = cart.find(x => x.name === button.dataset.name);
  if (item) item.qty++;
  else cart.push({name: button.dataset.name, price: Number(button.dataset.price), qty: 1});
  updateCart();
  const old = button.innerHTML;
  button.innerHTML = 'Добавлено ✓';
  setTimeout(() => button.innerHTML = old, 850);
}));

function updateCart() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById('cartText').textContent = count ? `В корзине: ${count} поз.` : 'Корзина пуста';
  document.getElementById('cartTotal').textContent = format(total);
  document.getElementById('orderBtn').disabled = !count;
  document.getElementById('dialogTotal').textContent = format(total);
  document.getElementById('orderItems').innerHTML = cart.map(item =>
    `<div class="order-row"><span>${item.name} × ${item.qty}</span><strong>${format(item.price * item.qty)}</strong></div>`
  ).join('');
}

const dialog = document.getElementById('orderDialog');
document.getElementById('orderBtn').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.getElementById('clearCart').addEventListener('click', () => {
  cart.length = 0;
  updateCart();
  dialog.close();
});
document.querySelector('.menu-toggle').addEventListener('click', () => document.getElementById('nav').classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(link => link.addEventListener('click', () => document.getElementById('nav').classList.remove('open')));
