export function randomString() {
  return Math.random().toString(36).substring(2,7);
}

export async function generateHash(input: string) {
  var buffer = new TextEncoder().encode(input);
  var enc_buffer = await crypto.subtle.digest("SHA-256", buffer);
  return hex(enc_buffer).substr(0,10);
}

export function hex(buffer: ArrayBuffer) {
  var hexCodes = [];
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
      var value = view.getUint32(i);
      var stringValue = value.toString(16);
      var padding = '00000000';
      var paddedValue = (padding + stringValue).slice(-padding.length);
      hexCodes.push(paddedValue);
  }
  return hexCodes.join("");
}