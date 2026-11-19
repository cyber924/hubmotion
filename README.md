# HubMotion

이미지 기반 모션 제작과 공개 갤러리입니다. 기존 Firebase Authentication, Firestore, Storage를 사용합니다.

## Vercel 전환 상태

Vercel Node 함수 연결을 준비했으나 실제 Vercel 배포 및 전체 사용자 흐름은 아직 검증하지 않았습니다. 특히 Vercel Functions의 요청/응답 크기 제한으로 기존 최대 40MB 미디어 업로드 및 큰 이미지 전송이 실패할 수 있습니다. 운영 배포 전 Firebase Storage 직접 업로드와 해당 보안 규칙을 확인해야 합니다.

기존 개인별 Gemini API 키를 복원하려면 기존 배포에서 사용 중인 `HUBMOTION_KEY_ENCRYPTION`과 정확히 같은 64자리 16진수 비밀값을 Vercel에 설정해야 합니다. 다른 값을 사용하면 기존 저장 키를 복호화할 수 없습니다. 이 값은 코드나 Git에 저장하지 않습니다. Vercel에 Gemini 키 하나만 등록하는 공용 키 방식은 아직 적용하지 않았습니다. 현재는 로그인한 사용자가 자신의 Gemini 키를 저장해 사용합니다.

## 로컬 검사

Node.js 20 이상에서 `npm run build`, `npm test`를 실행합니다. 실제 Firebase 인증, Storage 권한, Gemini 호출 및 Vercel 배포 검증은 별도로 필요합니다.
