# 🍽 TasteMap
![thumbnail](https://github.com/NamJongtae/TasteMap/assets/113427991/16745d53-453b-4e9b-b0f5-84a60f9b1d4a)
#### 테스트 계정
| ID         | PW     |
|------------|--------|
| test@a.com | asdzxc123! |

#### 배포 URL : 🍴 [TasteMap](https://tastemap.site)

### 📃 목차 (클릭 시 해당 목차로 이동합니다.)
- [🙋‍♂ 프로젝트 소개](#-프로젝트-소개)
  
- [📆 개발기간](#-개발기간)
  
- [⚙ 개발환경](#-개발환경)
  
- [🔩 벡엔드&API](#-벡엔드--api)
  
- [🛠 프로젝트 관리](#-프로젝트-관리)
  
- [📃 GitHub 컨벤션](#-github-컨벤션)

- [🚩 User Flow](#-user-flow--이미지를-클릭-해주세요-) 
  
- [👀 구현 기능 미리보기](#-구현-기능-미리보기)
  
<br>

### 🙋‍♂ 프로젝트 소개
> **TasteMap은 맛집을 공유하고 자신의 맛집 지도를 완성하는 SNS 플랫폼입니다.**
- 나만 알고 있는 숨겨진 맛집 정보를 공유하고, 원하는 맛집을 나의 맛집 지도에 추가하여 나만의 맛집 지도를 완성할 수 있습니다.
- 내가 만든 맛집 지도를 별도의 URL 링크를 통해 공유할 수 있습니다.
- 지도의 로드 뷰 기능을 통해 해당 맛집 위치를 쉽게 파악할 수 있습니다.
- 댓글과 답글 작성을 통해 여러 사용자들과 맛집에 대해 소통할 수 있습니다.
- 팔로우한 사용자의 게시물을 피드 페이지에서 볼 수 있습니다.

>**개발 의도**
- 나만 알고 있는 숨은 맛집을 공유하고, 사용자들이 맛집 정보를 알아가며 나만의 맛집 지도를 완성해가는 SNS 플랫폼을 구현하고자 개발하게 되었습니다.
- 가게 홍보 및 지역 특색 먹거리들을 알려 지역 경제 활성화에 도움을 주고자 개발하게 되었습니다.

<br>

### 📆 개발기간
**개발 시작 : 2023. 09. 08**

**개발 완료 : 2023. 10. 08**

<br>

### ⚙ 개발환경
|프론트엔드|벡엔드|디자인|배포, 관리|
|---|---|---|---|
|<img alt="Html" src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/> <img alt="CSS" src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/> <img alt="JavaScript" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/> <img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/styled-components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=pink"> <img src="https://img.shields.io/badge/redux-toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=fff">|<img src ="https://img.shields.io/badge/naverSerachAPI-03C75A.svg?&style=for-the-badge&logo=naver&logoColor=white"/> <img src ="https://img.shields.io/badge/KakamapAPI-FFCD00.svg?&style=for-the-badge&logo=googlemaps&logoColor=black"/> <img src ="https://img.shields.io/badge/firebase-FFCA28.svg?&style=for-the-badge&logo=firebase&logoColor=black"/>|<img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" width=150>|<img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">|
<br>

### 🔩 벡엔드 & API
- 네이버 검색 API를 통해 맛집 검색 기능을 구현하였습니다.
- 네이버 검색 API로 얻은 맛집 정보와 좌표를 KakaMapAPI에 전달하여 지도를 그리고, 마커로 해당 맛집을 표시하도록 구현하였습니다.
- 파이어베이스를 이용하여 db를 구성하고, 로그인, 로그아웃, 게시물, 댓글, 답글, 프로필 등 주요 기능 API를 구현하였습니다.

<br>

### 🛠 프로젝트 관리
- <a href="https://github.com/NamJongtae/TasteMap/issues?q=is%3Aissue+is%3Aclosed">GitHub Issue</a>
  - 빠른 issue 생성을 위해 issue 템플릿을 만들어 사용하였습니다.
  - issue label을 생성하여 어떤 작업을 히는지 구분하였습니다.
  - issue를 통해 구현할 내용과 체크리스트를 만들어 어떤 작업을 할지 리스트 만들어 관리하였습니다.
  
![issue](https://github.com/NamJongtae/TasteMap/assets/113427991/2064d7af-9224-47a2-ae65-f89854abb9b8)

- <a href="https://github.com/users/NamJongtae/projects/4">GitHub Project</a>
  - 프로젝트 보드의 이슈 목록을 통해 개발 과정과 진행 상황을 한 눈에 알아 볼 수 있었습니다.
  
![board](https://github.com/NamJongtae/TasteMap/assets/113427991/506be4b3-71d5-4a14-ab74-17811e071f64)

### 📃 GitHub 컨벤션
어떤 작업을 했는지 파악하기 위해 컨벤션을 정하여 commit과 isuue를 관리하였습니다.

`Fix` : 수정사항만 있을 경우

`Feat` : 새로운 기능이 추가 되거나 여러 변경 사항들이 있을 경우

`Style` : 스타일만 변경되었을 경우 

`Docs` : 문서를 수정한 경우

`Refactor` : 코드 리팩토링을 하는 경우

`Remove` : 파일을 삭제하는 작업만 수행한 경우

`Rename` : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우

`Relese` : 배포 관련 작업인 경우

`Chore` : 그 외 기타 사항이 있을 경우 사용합니다.

<br>

### 🚩 User Flow ( 이미지를 클릭 해주세요. )
![userFlow](https://github.com/NamJongtae/TasteMap/assets/113427991/cfebd74e-dd6d-45c6-9bee-56e6662d2380)

<br>

### 👀 구현 기능 미리보기
|로그인|회원가입|아이디/비밀번호 찾기|
|---|---|---|
|![로그인](https://github.com/NamJongtae/TasteMap/assets/113427991/9345a44f-4220-4c13-81f1-40c1b639d032)|![회원가입](https://github.com/NamJongtae/TasteMap/assets/113427991/e724a7e2-4332-4cb3-9301-2fa4698facfd)|![계정찾기](https://github.com/NamJongtae/TasteMap/assets/113427991/c6ca8fdc-b86d-4421-bac6-302ba839bfca)|

|게시물 조회|게시물 업로드|게시물 수정|
|:---:|:---:|:---:|
|![게시물 조회](https://github.com/NamJongtae/TasteMap/assets/113427991/27a7d40b-7cbe-4295-ba1e-f8c531b635bd)|![게시물 업로드](https://github.com/NamJongtae/TasteMap/assets/113427991/d5e7e011-ceeb-4b9d-a301-8d8fc25762c8)|![게시물 수정](https://github.com/NamJongtae/TasteMap/assets/113427991/8d95c2a6-a143-4714-b951-12a5d81f45be)|

|게시물 삭제|게시물 신고|맛집추가, 좋아요|
|---|---|---|
|![게시물 삭제](https://github.com/NamJongtae/TasteMap/assets/113427991/e7d2924f-807c-4615-823d-dca10776bbab)|![게시물 신고](https://github.com/NamJongtae/TasteMap/assets/113427991/2fb0cbd9-6dbc-4e55-b442-dc7bba5501ca)|![맛집추가, 좋아요](https://github.com/NamJongtae/TasteMap/assets/113427991/a402813c-0377-4fc1-a608-84b8280a1a8f)|

|댓글, 답글|프로필 페이지|팔로우, 팔로잉|
|---|---|---|
|![댓글,답글](https://github.com/NamJongtae/TasteMap/assets/113427991/5d2ae00d-4ace-42d8-ae88-2a1a31ae4cd9)|![프로필 페이지](https://github.com/NamJongtae/TasteMap/assets/113427991/a7b3e3aa-8701-49a4-b614-326b58def7d4)|![팔로우, 팔로잉](https://github.com/NamJongtae/TasteMap/assets/113427991/d8139b61-5f2c-4cff-89dc-ee03d8a22a0c)|
<div align="center">
  
|프로필 수정|맛집지도|검색|
|---|---|---|
|![프로필 수정](https://github.com/NamJongtae/TasteMap/assets/113427991/1f19f36f-e9c6-4245-9022-dbc085f0a1b8)|![맛집지도](https://github.com/NamJongtae/TasteMap/assets/113427991/eeb5b9ca-b58e-4a7d-8842-6560721d3353)|![검색](https://github.com/NamJongtae/TasteMap/assets/113427991/6df4a19e-21ff-4a27-ab96-5e93910a7d51)|

|로그아웃|404 페이지|
|---|---|
|![로그아웃](https://github.com/NamJongtae/TasteMap/assets/113427991/635b35e4-f1d0-4325-9f69-52fa4c3c02ce)|![404](https://github.com/NamJongtae/TasteMap/assets/113427991/830a1146-2967-4d80-8c4d-d0ed94503851)|

</div>
