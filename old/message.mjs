export function send(type, detail) {
  console.log('SENDING' + type + detail);
  window.dispatchEvent( new CustomEvent(type, {detail}) );
}
