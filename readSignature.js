// Lấy tham số từ URL
const urlParams = new URLSearchParams(window.location.search);

// Kiểm tra xem có quyền xóa không (dựa vào key trong URL)
const canDelete = urlParams.get("key") === managerSignatureKey;

let selectedSignature = null;

const data_chuky = [
  {
    id: "548",
    image_path:
      "data:image/png;base64,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",
    user_card: "test",
    pos_x: "85",
    pos_y: "93.52064664411331",
  },
];

const sheetIDChuKy = "1oKFR7jtMiJ4evhFKkZ61U8QMatfHyyJk0lICM_kaOvg";
const gidChuKy = "421209448";
const urlSheetChuKy = `https://docs.google.com/spreadsheets/d/${sheetIDChuKy}/gviz/tq?tqx=out:json&gid=${gidChuKy}`;

function updateData(data, sizePercent) {
  const container = document.getElementById("previewContainer");
  container.innerHTML = "";

  data.forEach((signature) => {
    const img = document.createElement("img");
    img.src = signature.image_path.includes(".png")
      ? libraryURL + signature.image_path
      : signature.image_path;
    img.alt = "Chữ ký của " + signature.user_card;
    img.dataset.id = signature.id;
    img.classList.add("signature-img");
    img.style.width = sizePercent + "%";
    img.style.position = "absolute";
    img.style.top = signature.pos_y + "%";
    img.style.left = signature.pos_x + "%";
    img.setAttribute("draggable", "false");

    if (canDelete) {
      img.addEventListener("click", () => selectSignature(img));
    } else {
      img.style.cursor = "default";
    }

    container.appendChild(img);
  });
}

/**
 * Hàm load chữ ký từ server
 * @param {string} userId - ID người dùng
 * @param {string} userCard - Thông tin thẻ người dùng
 * @param {number} sizePercent - Kích thước chữ ký (%)
 */
async function loadSignatures(userId, userCard, sizePercent) {
  try {
    const res = await fetch(urlSheetChuKy);
    const data = await res.text();
    const json = JSON.parse(data.substring(47).slice(0, -2));
    // Lấy tên cột
    const cols = json.table.cols.map((col) => col.label);
    // Map từng row thành object {colName: value}
    const rows = json.table.rows.map((row) => {
      let obj = {};
      row.c.forEach((cell, i) => {
        obj[cols[i]] = cell ? cell.v : null;
      });
      return obj;
    });
    updateData(rows, sizePercent);
    // return rows;

    console.log("📥 Fetched messages:", rows);
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu:", err);
  }
}

/**
 * Chọn chữ ký
 */
function selectSignature(img) {
  if (!canDelete) {
    alert("Bạn không có quyền xóa chữ ký.");
    return;
  }

  // Bỏ chọn chữ ký trước đó
  if (selectedSignature) {
    selectedSignature.classList.remove("selected");
  }

  if (selectedSignature === img) {
    selectedSignature = null;
    document.getElementById("deleteDialog").style.display = "none";
  } else {
    img.classList.add("selected");
    selectedSignature = img;
    document.getElementById("deleteDialog").style.display = "block";
  }
}

// Nút xác nhận xóa chữ ký
document.getElementById("confirmDelete").addEventListener("click", () => {
  if (!selectedSignature || !canDelete) {
    alert("Không có chữ ký nào được chọn hoặc bạn không có quyền xóa.");
    return;
  }

  const signatureId = selectedSignature.dataset.id;
  if (!signatureId) {
    alert("Lỗi: Không lấy được ID chữ ký!");
    return;
  }

  fetch(libraryURL + "delete_signature.php", {
    method: "POST",
    body: JSON.stringify({ id: signatureId }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("Chữ ký đã được xóa!");
        selectedSignature.remove();
        selectedSignature = null;
        document.getElementById("deleteDialog").style.display = "none";
      } else {
        alert("Lỗi khi xóa: " + data.error);
      }
    })
    .catch((err) => console.error("Lỗi khi xóa chữ ký:", err));
});

// Nút hủy xóa chữ ký
document.getElementById("cancelDelete").addEventListener("click", () => {
  document.getElementById("deleteDialog").style.display = "none";
  if (selectedSignature) {
    selectedSignature.classList.remove("selected");
    selectedSignature = null;
  }
});
