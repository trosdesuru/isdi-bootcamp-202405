function updateTime(date) {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  document.getElementById('current-time').textContent = `${hours}:${minutes}`;
}

// Actualizar la hora cada minuto
setInterval(updateTime, 60000);

export default updateTime