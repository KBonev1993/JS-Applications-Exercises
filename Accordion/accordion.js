async function solution() {
    let main = document.getElementById("main")

    let url = `http://localhost:3030/jsonstore/advanced/articles/list`
    let res = await fetch(url)
    let data = await res.json()

    data.forEach(el => {
        let divAccordion = createElement('div', '', ['class', 'accordion'])
        let divHead = createElement('div', '', ['class', 'head'])
        let span = createElement('span', el.title)
        let button = createElement('button', 'More', ['class', 'button', 'id', el._id])
        let divExtra = createElement('div', '', ['class', 'extra'])
        let p = createElement('p')

        button.addEventListener('click', toggle)

        divExtra.appendChild(p)
        divAccordion.appendChild(divExtra)
        divHead.appendChild(button)
        divHead.appendChild(span)
        divAccordion.appendChild(divHead)
        main.appendChild(divAccordion)
    })
    async function toggle(ev){
        let accordion = ev.target.parentNode.parentNode
        let p = ev.target.parentNode.parentNode.children[0].children[0]
        let extra = ev.target.parentNode.parentNode.children[0]

        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${ev.target.id}`
        let response = await fetch (url)
        let data = await response.json()
        p.textContent = data.content

        let hidden = ev.target.textContent === 'More'

        extra.style.display =  hidden ? 'block' : 'none'
        ev.target.textContent = hidden ? 'Less' : 'More'

    }


    function createElement(type, content, attributes = []){
        let element = document.createElement(type)
        if (content){
            element.textContent = content
        }
        if (attributes.length > 0){
            for (let i  = 0; i < attributes.length; i+=2){
                element.setAttribute(attributes[i], attributes[i + 1])
            }
        }
        return element
    }

}
solution()