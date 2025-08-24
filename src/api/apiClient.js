import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.boosters.work', // API 서버 주소
    // 매우 중요: 모든 요청에 자동으로 쿠키를 포함하도록 설정합니다.
    withCredentials: true,
});

// 요청 인터셉터 (Request Interceptor)
apiClient.interceptors.request.use(
    (config) => {
        // localStorage에서 accessToken을 가져와 헤더에 추가합니다.
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터 (Response Interceptor)
apiClient.interceptors.response.use(
    (response) => response, // 성공 응답은 그대로 반환
    async (error) => {
        const originalRequest = error.config;

        // 401 에러가 발생했고, 아직 재시도하지 않은 요청일 경우
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 재시도했음을 표시

            try {
                // 토큰 재발급 API 호출 (/booster/reissue)
                // 요청 시 withCredentials: true 설정 덕분에 브라우저가 자동으로
                // HttpOnly 쿠키(RefreshToken)를 담아서 보냅니다.
                // 따라서 요청 본문(body)은 비워두어도 됩니다.
                const reissueResponse = await apiClient.post('/booster/reissue');

                // 서버로부터 받은 새로운 accessToken
                // (백엔드 응답 형식에 따라 키 이름은 'accessToken', 'access_token' 등으로 다를 수 있습니다)
                const newAccessToken = reissueResponse.data.accessToken;

                // 새로운 accessToken을 localStorage에 저장합니다.
                localStorage.setItem('accessToken', newAccessToken);

                // 실패했던 원래 요청의 헤더에 새로운 accessToken을 설정합니다.
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // 원래 요청을 다시 실행합니다.
                return apiClient(originalRequest);

            } catch (reissueError) {
                // RefreshToken도 만료되어 재발급에 실패한 경우
                console.error("토큰 재발급 실패:", reissueError);

                // 저장된 accessToken을 삭제하고 로그인 페이지로 보냅니다.
                localStorage.removeItem('accessToken');

                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                window.location.href = '/login'; // 로그인 페이지로 리디렉션

                return Promise.reject(reissueError);
            }
        }
        
        // 401 에러가 아니면 에러를 그대로 반환
        return Promise.reject(error);
    }
);

export default apiClient;
