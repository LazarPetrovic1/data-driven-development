const menu = [
  {
    name: "Vegetarian Soup",
    orders: 200
  },
  {
    name: "Vegetarian Curry",
    orders: 600
  },
  {
    name: "Vegetarian Pasta",
    orders: 300
  },
  {
    name: "Vegetarian Surprise",
    orders: 900
  },
  {
    name: "Delicious vegetarian Burger",
    orders: 1500
  }
]

const min = d3.min(menu, d => d.orders)
const max = d3.max(menu, d => d.orders)
const extent = d3.extent(menu, d => d.orders)

const svg = d3.select(".canvas")
  .append('svg')
    .attr('width', 600)
    .attr('height', 600)

const margin = {
  top: 20,
  left: 100,
  bottom: 100,
  right: 20
}

const graphWidth = 600 - margin.left - margin.right
const graphHeight = 600 - margin.top - margin.bottom

const graph = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

const xAxisGroup = graph.append('g')
  .attr('transform', `translate(0, ${graphHeight})`)

const yAxisGroup = graph.append('g')

const y = d3.scaleLinear()
  .domain([0, d3.max(menu, d => d.orders)])
  .range([graphHeight, 0])

const x = d3.scaleBand()
  .domain(menu.map(item => item.name))
  .range([0, 500])
  .paddingInner(0.2)
  .paddingOuter(0.2)

const rects = graph.selectAll('rect')
  .data(menu)
  .attr('width', x.bandwidth)
  .attr('height', (d, i, n) => graphHeight - y(d.orders))
  .attr('fill', 'navy')
  .attr('x', (d) => x(d.name))
  .attr('y', d => y(d.orders))

rects.enter()
  .append('rect')
    .attr('width', x.bandwidth)
    .attr('height', (d, i, n) => graphHeight - y(d.orders))
    .attr('fill', 'navy')
    .attr('x', (d) => x(d.name))
    .attr('y', d => y(d.orders))

const xAxis = d3.axisBottom(x)
const yAxis = d3.axisLeft(y)
  .ticks(3)
  .tickFormat(d => `${d} orders`)

xAxisGroup.call(xAxis)
yAxisGroup.call(yAxis)

xAxisGroup.selectAll('text')
  .attr('transform', 'rotate(-40)')
  .attr('text-anchor', 'end')
  .attr('fill', 'navy')
