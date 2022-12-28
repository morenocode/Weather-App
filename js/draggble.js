const defaultConfig = {
    open: true,
    debug: true,
    animatable: true,
}

export default function draggable($element, config = defaultConfig) {
    if (!($element instanceof HTMLElement)) {
     return console.warn(`Elemento invalido se espera un HTMLelement y se recibio ${$element}`)   
    }
    
    let isOpen = config.open 
    let isDragging = false
    const elementRect = $element.getBoundingClientRect()
    const ELEMENT_BLOCK_SIZE = elementRect.height
    const $marker = $element.querySelector('[data-marker]')
    const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height

    const VISIBLE_Y_POSITION = 0
    const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE    
    let widgetPosition = VISIBLE_Y_POSITION
    isOpen ? open() : close()
    let startY = 0
    $marker.addEventListener('click', handleClick)
    $marker.addEventListener('pointerdown', handlePointerDown)
    $marker.addEventListener('pointerup', handlePointerUp)
    $marker.addEventListener('pointerout', handlePointerOut)
    $marker.addEventListener('pointercancel', handlePointerCancel)
    $marker.addEventListener('pointermove', handlePointerMove)

    if (config.animatable) {
        setAnimations()
    }


    function handlePointerUp() {
        logger('Pointer Up') 
        dragEnd()
    }


    function handlePointerOut() {
        logger('Pointer Out') 
        dragEnd()
    }
    function handlePointerCancel() {
        logger('Pointer Cancel') 
        dragEnd()
    }

        function handlePointerDown(event) {
        logger('Pointer Down')
        starDrag(event) 

    }
    
    function handlePointerMove(event) {
        logger('Pointer Move') 
        drag(event)

    }

    function handleClick(event) {
        logger('CLICK') 
        toggle()
    }

    function setAnimations() {
        $element.style.transition = 'magin-bottom .3s'
    }

    function bounce() {
        if (widgetPosition < ELEMENT_BLOCK_SIZE / 2) {
            return open()
        } return close()

    }

    function dragEnd() {
        logger('DRAG END')
        isDragging = false
        bounce()
    }

    function toggle() {
        if (!isDragging) {
            if (!isOpen) {
               return open()
            }
             return close()
        }
        
    }

    function pageY(event) {
        return event.pageY || event.touches[0].pageY
    }

    function starDrag(event) {
        isDragging = true
        startY = pageY(event)
    }

    function logger(message) {
        if (config.debug) {
            console.info(message)
        }
    }


    function open() {
        logger('Anrir Widget')
        isOpen = true
        widgetPosition = VISIBLE_Y_POSITION
        setWidgetPosition(widgetPosition)
    }

    function close() {
        logger('Cerar Widget')
        isOpen = false
        widgetPosition = HIDDEN_Y_POSITION
        setWidgetPosition(widgetPosition)
    }
        function setWidgetPosition(value) {
        $element.style.marginBottom = `-${value}px`
    }

    function drag(event) {
        const cursorY = pageY(event)
        const movementY = cursorY - startY
        widgetPosition = widgetPosition + movementY
        startY = cursorY
        if (widgetPosition > HIDDEN_Y_POSITION) {
            return false
        }
        setWidgetPosition(widgetPosition)
    }
}