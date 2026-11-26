import dayjs from 'dayjs';
import Toastify from 'toastify-js';

export function formatearFecha(fecha) {
  if (!fecha) return 'Sin fecha';
  return dayjs(fecha).format('DD/MM/YYYY');
}

export function mostrarAviso(mensaje, esError = false) {
  Toastify({
    text: mensaje,
    duration: 2500,
    gravity: 'bottom',
    position: 'right',
    style: {
      background: esError ? '#dc2626' : '#16a34a',
    },
  }).showToast();
}