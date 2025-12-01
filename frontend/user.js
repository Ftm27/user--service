const API_URL = "http://localhost:4000/users";

async function loadUsers() {
  try {
    const res = await fetch(API_URL);
    const users = await res.json();

    const usersDiv = document.getElementById("users");
    usersDiv.innerHTML = "";

    if (users.length === 0) {
      usersDiv.innerHTML = "<p>هیچ کاربری موجود نیست.</p>";
      return;
    }

    users.forEach((u) => {
      usersDiv.innerHTML += `
            <p>
              <strong>${u.username}</strong> - ${u.email}
              <button onclick="deleteUser('${u._id}')">حذف</button>
              <button onclick="openUpdate('${u._id}', '${u.username}', '${u.email}')">ویرایش</button>
            </p>
          `;
    });
  } catch (err) {
    console.error(err);
    document.getElementById("users").innerHTML = "<p>خطا در دریافت کاربران</p>";
  }
}
loadUsers();

async function deleteUser(id) {
  const confirmDelete = confirm(
    "آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟"
  );
  if (!confirmDelete) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadUsers(); 
  } catch (err) {
    console.error(err);
    alert("خطا در حذف کاربر!");
  }
}


function openUpdate(id) {
  localStorage.setItem("editUserId", id);
  window.location.href = "updatepage.html";
}

loadUsers();
