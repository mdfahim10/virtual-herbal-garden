(() => {
    "use strict";
    // Select all forms with Bootstrap validation
    const forms = document.querySelectorAll(".needs-validation");
    Array.from(forms).forEach((form) => {
        form.addEventListener(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add("was-validated");
            },
            false
        );
    });
})();
// SweetAlert2 Confirmation Dialog
function confirmAction(event, options) {
    event.preventDefault();
    const form = event.target;
    Swal.fire({
        title: options.title,
        text: options.text,
        icon: options.icon || "warning",
        showCancelButton: true,
        confirmButtonColor: options.confirmColor || "#198754",
        cancelButtonColor: "#6c757d",
        confirmButtonText: options.confirmText || "Confirm",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        focusCancel: true
    }).then((result) => {
        if (result.isConfirmed) {
            form.submit();
        }
    });
}