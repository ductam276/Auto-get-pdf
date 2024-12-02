// Dummy password for login
const PASSWORD = "leductam206";

// Simulated database (in-memory for demo purposes)
let pdfDatabase = {};

// Check login
function login() {
  const passwordInput = document.getElementById("password").value;
  if (passwordInput === PASSWORD) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("main-section").style.display = "block";
  } else {
    alert("Sai mã đăng nhập!");
  }
}

// Upload PDF
function uploadPDF() {
  const fileInput = document.getElementById("pdfUpload");
  const file = fileInput.files[0];

  if (file && file.type === "application/pdf") {
    const id = Date.now();
    pdfDatabase[id] = { name: file.name, file };

    displayPDFs();
    fileInput.value = ""; // Clear input
  } else {
    alert("Vui lòng chọn một file PDF.");
  }
}

// Display PDFs
function displayPDFs() {
  const pdfList = document.getElementById("pdfList");
  pdfList.innerHTML = "";

  Object.entries(pdfDatabase).forEach(([id, pdf]) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdf.file);
    link.textContent = pdf.name;
    link.download = pdf.name;
    link.target = "_blank";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Xóa";
    deleteButton.onclick = () => {
      delete pdfDatabase[id];
      displayPDFs();
    };

    li.appendChild(link);
    li.appendChild(deleteButton);
    pdfList.appendChild(li);
  });
}