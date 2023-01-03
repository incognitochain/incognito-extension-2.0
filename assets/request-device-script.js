document.getElementById("requestDevice").addEventListener("click", requestDevice);

function requestDevice() {
    console.log('requestDevice is clicked');
    const ledgerUSBVendorId = 11415;
    navigator.hid.requestDevice({
        filters:[
            { vendorId: ledgerUSBVendorId },
        ]
    });
}