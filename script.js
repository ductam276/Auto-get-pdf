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
// Thông tin Cloudinary
const CLOUD_NAME = "dvl892agf"; // Thay bằng Cloud Name của bạn
const UPLOAD_PRESET = "pdfductam26"; // Thay bằng Upload Preset Name của bạn

// Hàm upload PDF lên Cloudinary
function uploadPDF() {
  const fileInput = document.getElementById("pdfUpload");
  const file = fileInput.files[0];

  if (!file || file.type !== "application/pdf") {
    alert("Vui lòng chọn một file PDF.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.secure_url) {
        alert("Upload thành công!");
        addToList(data);
      } else {
        alert("Có lỗi xảy ra khi upload.");
      }
    })
    .catch((error) => {
      console.error("Upload error:", error);
      alert("Có lỗi xảy ra khi upload.");
    });
  fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/upload/${file.public_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${btoa('734764258765371:t-fDkrhtepFAcFpMJDHpAEpcjE4')}`,
        },
  });
      
}
// Thêm file vào danh sách hiển thị
function addToList(file) {
  const pdfList = document.getElementById("pdfList");
  const listItem = document.createElement("li");

  const link = document.createElement("a");
  link.href = file.secure_url;
  link.textContent = file.original_filename;
  link.target = "_blank";

  const viewButton = document.createElement("button");
  viewButton.textContent = "Xem";
  viewButton.onclick = () => {
    document.getElementById("pdfViewer").src = file.secure_url;
  };

  listItem.appendChild(link);
  listItem.appendChild(viewButton);
  pdfList.appendChild(listItem);
}
