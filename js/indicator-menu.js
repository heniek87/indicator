const d = document

const menusDom = d.querySelectorAll(".list-with-indicator")

const generateOrnament = li => {
  const ornament = d.createElement('div')
  const ornamentBack = d.createElement('div')
  ornament.className = "ornament"
  ornamentBack.className = "ornamentBack"
  li.append(ornamentBack)
  li.append(ornament)
}

const generateIndicators = menu => {
  const { width, height } = menu.getBoundingClientRect()
  menu.indicator = document.createElement("div")
  menu.indicatorActive = document.createElement("div")
  menu.indicator.className = "indicator"
  menu.indicatorActive.className = "indicatorActive"
  menu.parentNode.append(menu.indicator)
  menu.parentNode.append(menu.indicatorActive)
  menu.indicator.style.top = `${height + 6}px`
  menu.indicator.style.left = `${0}px`
  menu.indicator.style.width = `${width}px`
  menu.indicatorActive.style.top = `${height + 6}px`
  menu.indicatorActive.style.left = `${0}px`
  menu.indicatorActive.style.width = `${0}px`
}

const clearActive = li => li.classList.remove('active')

const moveIndicator = (menu, x1, x2) => {
  const diff = menu.indicator.getBoundingClientRect().x
  const from = x1 - diff
  const to = x2 - diff
  menu.indicatorActive.style.left = `${from}px`
  menu.indicatorActive.style.width = `0px`


  animateTo(menu.indicatorActive, from, to, 200, from < to)


}

const animateTo = (obj, from, to, time, right = true) => {
  let data = [
    { width: `0px` },
    { width: `${to - from}px` },
  ]
  let data2 = [
    { width: `${to - from}px`, left: `${from}px` },
    { width: `${0}px`, left: `${to}px` },
  ]
  if (!right) {
    data = [
      { width: `0px`, },
      { width: `${from - to}px`, left: `${to}px` },
    ]
    data2 = [
      { width: `${from - to}px`, left: `${to}px` },
      { width: `${0}px`, left: `${to}px` },
    ]
  }
  const timing = {
    duration: time,
    iterations: 1,
  }
  obj.animate(data, timing)
  setTimeout(() => {
    obj.animate(data2, timing)

  }, time)
}

//INIT
{
  // get menus and items
  menusDom.forEach(menu => {
    menu.indicatorActive = null
    generateIndicators(menu)
    menu.querySelectorAll('li').forEach(li => {
      generateOrnament(li)
      li.addEventListener("click", () => {
        let oldLiX = 0
        try {
          oldLiX = menu.querySelector("li.active").querySelector(".ornament").getBoundingClientRect().x
          clearActive(menu.querySelector("li.active"))
        } catch (e) {
          oldLiX = li.querySelector(".ornament").getBoundingClientRect().x
        }
        li.classList.add('active')
        moveIndicator(menu, oldLiX, li.querySelector(".ornament").getBoundingClientRect().x)
      })
    })
  })
}








//TEST
menusDom[0].querySelector('li:nth-child(2)').classList.add("active")
menusDom[1].querySelector('li:nth-child(3)').classList.add("active")