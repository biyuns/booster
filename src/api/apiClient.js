// src/api/apiClient.js

import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.boosters.work',
    // withCredentials: true는 다른 도메인 간의 요청에 쿠키를 포함시키기 위해 필수입니다.
    withCredentials: true,
});

// --- 요청 인터셉터 (Request Interceptor) ---
apiClient.interceptors.request.use(
    (config) => {
        // localStorage에서 accessToken을 가져옵니다.
        const accessToken = localStorage.getItem('accessToken');
        
        // accessToken이 존재하면, 헤더에 추가합니다.
        if (accessToken) {
            // 'Bearer' 접두사 없이 토큰 값만 설정합니다.
            config.headers['access'] = accessToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// --- 응답 인터셉터 (Response Interceptor) ---
apiClient.interceptors.response.use(
    (response) => response, // 성공 응답은 그대로 반환
    async (error) => {
        const originalRequest = error.config;

        // 401 에러(AccessToken 만료)이고, 재시도한 요청이 아닐 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 재시도했음을 표시하여 무한 루프 방지

            try {
                // 토큰 재발급 API 호출 (/booster/reissue)
                // RefreshToken은 HttpOnly 쿠키에 담겨 자동으로 전송되므로, 요청 본문은 비워둡니다.
                const reissueResponse = await apiClient.post('/booster/reissue');

                // 서버로부터 받은 새로운 accessToken
                const newAccessToken = reissueResponse.data.accessToken;

                // 새로운 accessToken을 localStorage에 저장
                localStorage.setItem('accessToken', newAccessToken);

                // 실패했던 원래 요청의 헤더에 새로운 accessToken을 설정
                originalRequest.headers['Authorization'] = newAccessToken;

                // 원래 요청을 다시 실행
                return apiClient(originalRequest);

            } catch (reissueError) {
                // RefreshToken도 만료되어 재발급에 최종 실패한 경우
                console.error("토큰 재발급 최종 실패:", reissueError);
                
                // 저장된 토큰을 모두 삭제하고 로그인 페이지로 보냅니다.
                localStorage.removeItem('accessToken');
                
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                // window.location.href를 사용하면 페이지가 새로고침되어 상태가 초기화됩니다.
                window.location.href = '/login'; 
                
                return Promise.reject(reissueError);
            }
        }
        
        // 401 에러가 아니거나 재시도에 실패한 경우는 에러를 그대로 반환
        return Promise.reject(error);
    }
);

export default apiClient;
