const API_URL = "http://localhost:4000/users";

const userId = localStorage.getItem("editUserId");


if (!userId) {
  alert("هیچ کاربری برای ویرایش انتخاب نشده است!");
  window.location.href = "users.html";
}

async function loadUser() {
  try {
    const res = await fetch(`${API_URL}/getUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: userId }),
    });

    const user = await res.json();

    document.getElementById("username").value = user.username;
    document.getElementById("email").value = user.email;
  } catch (err) {
    console.error("خطا در دریافت اطلاعات کاربر", err);
    alert("خطایی رخ داد!");
  }
}


async function updateUser() {
  const updatedUser = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
  };

  try {
    await fetch(`${API_URL}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    alert("اطلاعات کاربر با موفقیت ذخیره شد!");
    window.location.href = "users.html";
  } catch (err) {
    console.error("خطا در ویرایش کاربر", err);
    alert("ویرایش انجام نشد!");
  }
}
