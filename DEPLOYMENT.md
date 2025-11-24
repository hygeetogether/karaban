# CaravanShare 앱 배포 가이드 (AWS EC2)

이 문서는 CaravanShare 백엔드 애플리케이션을 AWS EC2(Ubuntu 22.04) 환경에 배포하고, Nginx를 이용한 리버스 프록시와 Let's Encrypt를 통해 HTTPS를 적용하는 과정을 안내합니다. (Level 2 배포)

## 목차
1. [1단계: AWS EC2 인스턴스 준비](#1단계-aws-ec2-인스턴스-준비)
2. [2단계: 서버 환경 설정](#2단계-서버-환경-설정)
3. [3단계: 애플리케이션 배포](#3단계-애플리케이션-배포)
4. [4단계: Nginx 리버스 프록시 및 HTTPS 설정](#4단계-nginx-리버스-프록시-및-https-설정)

---

### 1단계: AWS EC2 인스턴스 준비

1.  **EC2 인스턴스 생성**
    *   AWS Management Console에 로그인하여 EC2 서비스로 이동합니다.
    *   "인스턴스 시작"을 클릭합니다.
    *   **이름:** `caravan-server` 등 식별 가능한 이름을 입력합니다.
    *   **AMI 선택:** `Ubuntu Server 22.04 LTS`를 선택합니다.
    *   **인스턴스 유형:** `t2.micro` (프리 티어)를 선택합니다.
    *   **키 페어:** 새 키 페어를 생성하거나 기존 키 페어를 사용합니다. **(중요: 생성된 `.pem` 파일은 안전한 곳에 보관해야 합니다.)**
    *   **네트워크 설정:**
        *   "보안 그룹 생성"을 선택합니다.
        *   인바운드 규칙에 다음 3가지를 추가하거나 확인합니다.
            *   `SSH` (포트 22): 내 IP에서 접속하도록 설정하는 것을 권장합니다.
            *   `HTTP` (포트 80): 위치 무방 (Anywhere)
            *   `HTTPS` (포트 443): 위치 무방 (Anywhere)
    *   "인스턴스 시작"을 클릭하여 인스턴스를 생성합니다.

2.  **탄력적 IP 주소 할당 (선택 사항, 권장)**
    *   EC2 대시보드의 "탄력적 IP" 메뉴로 이동하여 새 주소를 할당받습니다.
    *   방금 생성한 EC2 인스턴스에 이 IP 주소를 연결합니다. 이렇게 하면 인스턴스를 재시작해도 Public IP가 변경되지 않습니다.

---

### 2단계: 서버 환경 설정

1.  **SSH로 서버에 접속**
    *   다운로드한 `.pem` 키 파일을 사용하여 터미널에서 아래 명령어로 서버에 접속합니다.
    ```bash
    # .pem 파일에 올바른 권한 부여
    chmod 400 /path/to/your-key.pem

    # SSH 접속 (your-public-ip를 실제 IP 주소로 변경)
    ssh -i /path/to/your-key.pem ubuntu@your-public-ip
    ```

2.  **서버 패키지 업데이트**
    ```bash
    sudo apt update
    sudo apt upgrade -y
    ```

3.  **필수 프로그램 설치 (Git, Nginx)**
    ```bash
    sudo apt install -y git nginx
    ```

4.  **Node.js 및 PM2 설치**
    *   `nvm`(Node Version Manager)을 사용하여 Node.js를 설치합니다.
    ```bash
    # nvm 설치 스크립트 다운로드 및 실행
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

    # nvm 환경 변수 적용
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

    # 터미널 재시작 없이 nvm 명령어 사용을 위해 source 실행
    source ~/.bashrc

    # Node.js LTS 버전 설치 (v18.x.x)
    nvm install --lts
    ```
    *   `pm2`를 전역으로 설치합니다.
    ```bash
    npm install -g pm2
    ```

---

### 3단계: 애플리케이션 배포

1.  **프로젝트 클론**
    *   GitHub 저장소에서 프로젝트 코드를 가져옵니다.
    ```bash
    git clone https://github.com/hygeetogether/karaban.git
    cd karaban
    ```

2.  **의존성 설치 및 빌드**
    ```bash
    npm install
    npm run build
    ```

3.  **환경 변수 파일 생성**
    *   `.env.example` 파일을 복사하여 `.env` 파일을 생성합니다.
    ```bash
    cp .env.example .env
    ```
    *   필요시 `vim`이나 `nano` 편집기로 `.env` 파일의 `PORT` 등을 수정할 수 있습니다. (기본값: 3001)

4.  **PM2로 애플리케이션 실행**
    ```bash
    npm run start
    ```
    *   **실행 확인:** `pm2 list` 명령어로 `caravan-app`이 `online` 상태인지 확인합니다.
    *   **로그 확인:** `pm2 logs caravan-app` 명령어로 실시간 로그를 볼 수 있습니다.

---

### 4단계: Nginx 리버스 프록시 및 HTTPS 설정

1.  **Nginx 설정 파일 생성**
    *   Nginx의 설정 파일을 생성하고 편집합니다.
    ```bash
    sudo vim /etc/nginx/sites-available/caravan
    ```
    *   아래 내용을 붙여넣습니다. `your_domain.com` 부분은 실제 도메인 주소로 변경해야 합니다. 만약 도메인이 없다면, 이 부분은 EC2의 Public IP 주소로 대체할 수 있습니다.
    ```nginx
    server {
        listen 80;
        server_name your_domain.com; # 또는 EC2의 Public IP 주소

        location / {
            proxy_pass http://localhost:3001; # Node.js 앱이 실행 중인 포트
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

2.  **Nginx 설정 활성화**
    ```bash
    # 기존 기본 설정 링크 제거
    sudo rm /etc/nginx/sites-enabled/default

    # 새로 만든 설정 파일 링크 생성
    sudo ln -s /etc/nginx/sites-available/caravan /etc/nginx/sites-enabled/

    # Nginx 설정 문법 오류 확인
    sudo nginx -t

    # Nginx 재시작
    sudo systemctl restart nginx
    ```
    *   이제 도메인 주소나 IP 주소로 접속하면 애플리케이션이 보여야 합니다.

3.  **HTTPS 적용 (Let's Encrypt & Certbot)**
    *   **주의:** 이 단계는 **도메인 주소가 EC2 인스턴스의 IP를 가리키고 있을 때만** 가능합니다.
    *   Certbot을 설치합니다.
    ```bash
    sudo apt install -y certbot python3-certbot-nginx
    ```
    *   Certbot을 실행하여 SSL 인증서를 발급받고 Nginx에 자동으로 설정합니다.
    ```bash
    # your_domain.com을 실제 도메인으로 변경
    sudo certbot --nginx -d your_domain.com
    ```
    *   Certbot이 이메일 주소, 서비스 약관 동의 등을 물어봅니다. 안내에 따라 진행하면 자동으로 HTTPS 설정이 완료되고, 인증서 자동 갱신까지 설정됩니다.

이제 `https://your_domain.com`으로 접속하면 안전한 HTTPS 연결로 애플리케이션을 사용할 수 있습니다.
