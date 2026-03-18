# Notion-Client API
서버 없이 클라이언트에서 Notion 페이지를 띄우고자 희망하는 사람들을 위해 제작한 API입니다.  

### 환경
사용에 앞서 API를 통해 받는 recordMap을 React가 아닌 Vanilla JS, python 등  
여러 작업 환경에서도 JSON만 있으면 사용이 가능하지만  
Notion을 웹 페이지에 띄움에 있어 Custom이 목적이 아닌 사람들에 대해서는 React의 사용을 적극 권장합니다.  

### 사용법
React가 아닌 다른 환경에서 Custom된 Notion을 띄우고자 하는 여러분은 이 글을 읽지 않아도  
API로 받은 JSON 데이터를 충분히 parsing해낼 역량이 있다고 판단됩니다..  
이 글은 React로 단순히 웹페이지 내에 노션을 추가하고자 하는 그런 분들을 위해 가이드를 남깁니다.  
- 노션 설정
    1. 노션에 우선 접속합니다.
    2. 새로운 페이지를 만듭니다.(이미 있다면 패스)
    3. 우측 상단의 공유 버튼을 누릅니다.
    4. 공유 탭의 일반 사용 권한을 '링크가 있는 웹의 모든 사용자'로 바꾸고 사용자 권한은 '읽기 허용'OR'댓글 허용'을 추천합니다.
    5. 게시 탭으로 이동 후 게시 버튼을 누릅니다.
    6. 이후 게시된 사이트 링크가 아래와 같이 나타날 것입니다.  
    ```
    https://foremost-sail-c93.notion.site/ __xxxx__ ?source=copy_link
    ```
    여기서 xxxx부분의 32길이의 문자열을 복사 또는 어느 곳에 따로 작성해둡니다.(이후 필요합니다.)
- 모듈 설치
    설명에 앞서 모듈 설치 부분은 VScode를 기준으로 설명하겠습니다.  
    다른 에디터를 쓰는 여러분은 VScode 기준의 내용으로도 충분히 응용할 수 있으리라 판단합니다.  
    1. 여러분의 React 프로젝트를 켜주세요.
    2. Ctrl+` 를 통해 터미널을 켜주세요.
    3. npm install react-notion-x 를 입력해주세요.
    4. 설치가 완료되면 필요한 모듈 설치는 끝났습니다.
- API 호출 및 노션 임베딩
    ```
        import { useState, useEffect } from 'react';
        import { NotionRenderer } from 'react-notion-x';
        import 'react-notion-x/src/styles.css';

        export default async function Home(){
            const [recordMap, setRecordMap] = useState(null);

            useEffect(() => {
                async function NotionPage(){
                    // 이부분의 pageId를 여러분이 노션 설정의 6번에서 복사 혹은 저장해두었던 32길이 문자열로 입력해주세요.
                    const pageId = 'xxxx';
                    try{
                        const res = await fetch(`https://notion-api-murex.vercel.app/api/notion-api?pageId=&{pageId}`);
                        const data = await res.json();
                        setRecordMap(data);
                    }
                    catch(e){
                        console.error("Failed to fetch Notion Page:", e);
                        setRecordMap(null);
                    }
                }
                NotionPage();
            }, []);

            return (
                {
                    recordMap ?
                    <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
                    :
                    <div>Loading...</div>
                }
            )
        }
    ```
    이제 여러분의 결과물을 확인해보세요!  
    recordMap이 정상적으로 받아지고 있다면 여러분의 노션 페이지가 여러분의 웹사이트에 출력되고 있을 겁니다!  