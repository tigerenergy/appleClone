(() =>
{   

    let yOffset = 0 // window.pageYOffset 대신 사용할 변수
    let prevScrollHeight = 0 // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0 // 현재 활성하된(눈 앞에 보고 있는 ) 화면
    let enterNewScene = false // 새로운 scene이 시작되는 순간 false

    const sceneInfo = 
    [
        {   
            // 0
            type: 'sticky',
            heightNum : 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objects:
            {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values:
            {
                messageA_opacity: [ 0, 1, { start: 0.1 , end: 0.2 }],
                messageB_opacity: [ 0, 1, { start: 0.3 , end: 0.4 }],

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
        yOffset = window.pageYOffset

        let totalScrollHeight = 0

        for ( let i = 0; i < sceneInfo.length; i++ )
        {
            totalScrollHeight += sceneInfo[i].scrollHeight
            if( totalScrollHeight  >= yOffset )
            {   
                currentScene = i
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`)
         
    }

    const calcValues = ( values, currentYOffset ) =>
    {
        let rv

        // 현재 스크롤섹션에서 스크롤된 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight
        const scrollRatio = currentYOffset / scrollHeight

        if ( values.length === 3 )
        {
            // start ~~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight
            const partScrollEnd = values[2].end * scrollHeight
            const partScrollHeight = partScrollEnd - partScrollStart

            if( currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd)
            {
                rv =  (currentYOffset - partScrollStart) / partScrollHeight * ( values[1] - values[0] ) + values[0]
            }
            else if( currentYOffset < partScrollStart )
            {
                rv = values[0]
            }
            else if( currentYOffset  > partScrollEnd )
            {
                rv = values[1]
            }
        }
        else
        {
            rv =  scrollRatio * ( values[1] - values[0]) + values[0]
        }
        return rv
    }

    const playAnimation = () =>
    {   
        const objects = sceneInfo[currentScene].objects
        const values = sceneInfo[currentScene].values
        const currentYOffset = yOffset - prevScrollHeight

        switch ( currentScene )
        {
            case 0:
                let messageA_opacity_in = calcValues(values.messageA_opacity , currentYOffset)
                objects.messageA.style.opacity = messageA_opacity_in
                break    
            case 1:
                break    
            case 2:
                break    
            case 3:
                break    
        }    
    }

        
    const scrollLoop = () =>
    {   
        enterNewScene = false
        prevScrollHeight = 0 // 값 초기화

        for( let i = 0; i < currentScene; i++ )
        {
            prevScrollHeight += sceneInfo[i].scrollHeight
        }
            if( yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight)
            {   
                enterNewScene = true
                currentScene ++
                document.body.setAttribute('id', `show-scene-${currentScene}`)
            }
            if( yOffset < prevScrollHeight)
            {   
                if( currentScene === 0) return //모바일 바운스 때문에 
                enterNewScene = true
                currentScene --
                document.body.setAttribute('id', `show-scene-${currentScene}`)
            }

            if( enterNewScene ) return       
            console.log(currentScene)
            playAnimation()     
    }
        
        
        
        
    window.addEventListener('scroll',() =>
    {
        yOffset = window.pageYOffset
        scrollLoop()
    })
    window.addEventListener('load', setLayout)
    window.addEventListener('resize', setLayout)
})()