class MessageCreator {
  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.initializePreview();
  }

  initializeElements() {
    this.avatarInput = document.getElementById("avatarInput");
    this.avatarPreview = document.getElementById("avatarPreview");
    this.nameInput = document.getElementById("nameInput");
    this.roleInput = document.getElementById("roleInput");
    this.messageInput = document.getElementById("messageInput");
    this.charCounter = document.getElementById("charCounter");
    this.form = document.getElementById("messageForm");
    this.generateBtn = document.getElementById("generateBtn");
    this.loadingSpinner = document.getElementById("loadingSpinner");
    this.alertContainer = document.getElementById("alert-container");

    this.previewContainer = document.getElementById("previewContainer");
    this.previewAvatar = document.getElementById("previewAvatar");
    this.previewName = document.getElementById("previewName");
    this.previewRole = document.getElementById("previewRole");
    this.previewMessage = document.getElementById("previewMessage");
  }

  bindEvents() {
    this.avatarPreview.addEventListener("click", () =>
      this.avatarInput.click()
    );
    this.avatarInput.addEventListener("change", (e) =>
      this.handleAvatarUpload(e)
    );

    this.nameInput.addEventListener("input", () => this.updatePreview());
    this.roleInput.addEventListener("input", () => this.updatePreview());
    this.messageInput.addEventListener("input", (e) =>
      this.handleMessageInput(e)
    );

    this.form.addEventListener("submit", (e) => this.handleFormSubmit(e));

    this.generateBtn.addEventListener("mouseenter", () => this.validateForm());
  }

  handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      this.showAlert("Chỉ chấp nhận file PNG, JPG hoặc JPEG!", "danger");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.showAlert("Kích thước file không được vượt quá 5MB!", "danger");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      this.avatarPreview.style.backgroundImage = `url('${imageUrl}')`;
      this.avatarPreview.classList.add("has-image");
      this.previewAvatar.style.backgroundImage = `url('${imageUrl}')`;
      this.updatePreview();
      this.validateForm();
    };
    reader.readAsDataURL(file);
  }

  handleMessageInput(event) {
    const length = event.target.value.length;
    const maxLength = 450;

    this.charCounter.textContent = `${length}/${maxLength} ký tự`;

    this.charCounter.className = "char-counter";
    if (length > maxLength * 0.8) this.charCounter.classList.add("warning");
    if (length > maxLength * 0.95) this.charCounter.classList.add("danger");

    this.updatePreview();
    this.validateForm();
  }

  updatePreview() {
    const name = this.nameInput.value.trim();
    this.previewName.textContent = name ? `Đồng chí ${name}` : "";

    const baseNameSize = 16;
    let nameLength = name.length;
    if (nameLength > 0) {
      let scale = Math.max(0.6, 1 - (nameLength - 10) * 0.02);
      this.previewName.style.fontSize = `${baseNameSize * scale}px`;
    } else {
      this.previewName.style.fontSize = `${baseNameSize}px`;
    }

    const role = this.roleInput.value.trim();
    this.previewRole.textContent = role;

    const baseRoleSize = 16;
    let roleLength = role.length;
    if (roleLength > 0) {
      let scale = Math.max(0.6, 1 - (roleLength - 10) * 0.02);
      this.previewRole.style.fontSize = `${baseRoleSize * scale}px`;
    } else {
      this.previewRole.style.fontSize = `${baseRoleSize}px`;
    }

    const message = this.messageInput.value.trim();
    this.previewMessage.textContent = message;

    const baseMsgSize = 16;
    let msgLength = message.length;
    if (msgLength > 0) {
      let scale = Math.max(0.6, 1 - (msgLength - 100) * 0.002);
      this.previewMessage.style.fontSize = `${baseMsgSize * scale}px`;
    } else {
      this.previewMessage.style.fontSize = `${baseMsgSize}px`;
    }

    const hasContent =
      name && this.messageInput.value.trim() && this.avatarInput.files[0];
    this.previewContainer.classList.toggle("has-content", !!hasContent);
  }

  validateForm() {
    const isValid =
      this.nameInput.value.trim() &&
      this.messageInput.value.trim() &&
      this.avatarInput.files[0];

    this.generateBtn.disabled = !isValid;
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.validateFormData()) return;

    this.setLoading(true);

    try {
      const canvas = await html2canvas(this.previewContainer, {
        useCORS: true,
        allowTaint: true,
        scale: 3,
        backgroundColor: "#ffffff",
        logging: false,
      });

      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `thong-diep-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          this.showAlert("Ảnh đã được tạo và tải xuống thành công!", "success");
        },
        "image/png",
        0.9
      );
    } catch (error) {
      console.error("Error generating image:", error);
      this.showAlert("Có lỗi xảy ra khi tạo ảnh. Vui lòng thử lại!", "danger");
    } finally {
      this.setLoading(false);
    }
  }

  validateFormData() {
    if (!this.nameInput.value.trim()) {
      this.showAlert("Vui lòng nhập họ tên!", "danger");
      this.nameInput.focus();
      return false;
    }

    if (!this.messageInput.value.trim()) {
      this.showAlert("Vui lòng nhập thông điệp!", "danger");
      this.messageInput.focus();
      return false;
    }

    if (!this.avatarInput.files[0]) {
      this.showAlert("Vui lòng chọn ảnh đại diện!", "danger");
      return false;
    }

    return true;
  }

  setLoading(loading) {
    this.generateBtn.disabled = loading;
    this.loadingSpinner.style.display = loading ? "inline-block" : "none";
  }

  showAlert(message, type = "success") {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    this.alertContainer.innerHTML = "";
    this.alertContainer.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 5000);
  }

  initializePreview() {
    this.updatePreview();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new MessageCreator();
});
