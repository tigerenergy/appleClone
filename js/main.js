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
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            }

        },
        {
            // 1
            type: 'normal',
            heightNum : 5, 
            scrollHeight: 0,    
            objects:
            {   
                container: document.querySelector('#scroll-section-1'),
                content: document.querySelector('#scroll-section-1 .description')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum : 5, 
            scrollHeight: 0,    
            objects:
            {
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
                messageB: document.querySelector('#scroll-section-2 .b'),
                messageC: document.querySelector('#scroll-section-2 .c'),
                pinB: document.querySelector('#scroll-section-2 .b .pin'),
                pinC: document.querySelector('#scroll-section-2 .c .pin')
            },
            values:
            {
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
                messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
                messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
                messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
                messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
                messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
                messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
                messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
                pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
                pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
                pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
                pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
                pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }]
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum : 5, 
            scrollHeight: 0,    
            objects:
            {
                container: document.querySelector('#scroll-section-3'),
                canvasCaption: document.querySelector('.canvas-caption')
            },
            values:
            {
                
            }
        }

    ]




    const setLayout = () =>
    {
        // 각 스크롤 섹션의 높이 세팅
        for( let i = 0; i < sceneInfo.length; i++ )
        {
            if( sceneInfo[i].type === 'sticky')
            {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight
                sceneInfo[i].objects.container.style.height = `${sceneInfo[i].scrollHeight}px`    
            }
            else if( sceneInfo[i].type === 'normal')
            {
                sceneInfo[i].scrollHeight = sceneInfo[i].objects.container.offsetHeight
            }
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
        const scrollHeight = sceneInfo[currentScene].scrollHeight
        const scrollRatio = currentYOffset / scrollHeight

        switch (currentScene) {
            case 0:
                // console.log('0 play');
                if (scrollRatio <= 0.22) {
                    // in
                    objects.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objects.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objects.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objects.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.42) {
                    // in
                    objects.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objects.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objects.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objects.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.62) {
                    // in
                    objects.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objects.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objects.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objects.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.82) {
                    // in
                    objects.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objects.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objects.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objects.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
    
                break
            case 2:
                    // console.log('2 play');
                    if (scrollRatio <= 0.25) {
                        // in
                        objects.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                        objects.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                    } else {
                        // out
                        objects.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                        objects.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                    }
        
                    if (scrollRatio <= 0.57) {
                        // in
                        objects.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                        objects.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                        objects.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                    } else {
                        // out
                        objects.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                        objects.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                        objects.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                    }
        
                    if (scrollRatio <= 0.83) {
                        // in
                        objects.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                        objects.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                        objects.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                    } else {
                        // out
                        objects.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                        objects.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                        objects.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                    }
        
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