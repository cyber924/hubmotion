document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const value = id => document.getElementById(id).value.trim();
  const subject = `[Hub모션 ${value('kind')}] ${value('name')}`;
  const body = `문의 유형: ${value('kind')}\n이름 또는 회사명: ${value('name')}\n회신 이메일: ${value('email')}\n\n${value('message')}`;
  window.location.href = `mailto:cyber924@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
