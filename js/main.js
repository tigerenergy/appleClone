(() =>
{   

    let yOffset = 0 // window.pageYOffset 대신 사용할 변수
    let prevScrollHeight = 0 // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0 // 현재 활성하된(눈 앞에 보고 있는 ) 화면

    const sceneInfo = 
    [
        {   
            // 0
            type: 'sticky',
            heightNum : 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objects:
            {
                container: document.querySelector('#scroll-section-0')
            }

        },
        {
            // 1
            type: 'normal',
            heightNum : 5, 
            scrollHeight: 0,    
            objects:
            {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum : 5, 
            scrollHeight: 0,    
            objects:
            {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum : 5, 
            scrollHeight: 0,    
            objects:
            {
                container: document.querySelector('#scroll-section-3')
            }
        }

    ]

    const setLayout = () =>
    {
        // 각 스크롤 섹션의 높이 세팅
        for( let i = 0; i < sceneInfo.length; i++ )
        {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight
            sceneInfo[i].objects.container.style.height = `${sceneInfo[i].scrollHeight}px`    
        }
         
    }

        
    const scrollLoop = () =>
    {   
        prevScrollHeight = 0 // 값 초기화

        for( let i = 0; i < currentScene; i++ )
        {
            prevScrollHeight += sceneInfo[i].scrollHeight
        }
            if( yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight)
            {
                currentScene ++
            }
            if( yOffset < prevScrollHeight)
            {   
                if( currentScene === 0) return //모바일 바운스 때문에 
                currentScene --
            }             
            console.log(currentScene)
    }
        
        
        
        
    window.addEventListener('resize', setLayout)
    window.addEventListener('scroll',() =>
    {
        yOffset = window.pageYOffset
        scrollLoop()
    })
        setLayout()
})()