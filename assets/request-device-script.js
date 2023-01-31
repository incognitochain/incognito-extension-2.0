document.getElementById("requestDevice").addEventListener("click", requestDevice);

function requestDevice() {
  const ledgerUSBVendorId = 11415;
  navigator.hid.requestDevice({
    filters: [{ vendorId: ledgerUSBVendorId }],
  });
}
