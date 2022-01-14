
const addSubmissionGas = 0.0001332290211
const fundSubmissionGas = 0.000106701
const batchGas = 0.0002445776324
const transferGas = 0.000021

const crowdFundedAndTransferGas = addSubmissionGas + fundSubmissionGas + batchGas + transferGas

let ethUSD
const daiARS = 203

function $(selector) {
    return document.querySelector(selector)
}

const tbody = $('tbody')

app()

async function app() {

    ethUSD = await _ethUSD()

    for (let i = 20; i <= 100; i++) {
        tbody.appendChild(tr(i))
    }

}



function tr(gasPrice) {
    const tr = document.createElement('tr')
    const total = gasPrice * crowdFundedAndTransferGas
    tr.innerHTML = `<th scope="row">${gasPrice}</th>
    <td>${ethFormat(gasPrice * addSubmissionGas)}</td>
    <td>${ethFormat(gasPrice * fundSubmissionGas)}</td>
    <td>${ethFormat(gasPrice * batchGas)}</td>
    <td>${ethFormat(gasPrice * transferGas)}</td>
    <td>${ethFormat(total)}</td>
    <td>$ ${usdFormat(total * ethUSD)}</td>`

    return tr
}

function ethFormat(number) {
    return number.toLocaleString(undefined, { 
        minimumFractionDigits: 6, 
        maximumFractionDigits: 6
    })
}

function usdFormat(number) {
    return number.toLocaleString(undefined, { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2
    })
}

async function _ethUSD() {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum')
    const json = await res.json()
    return json[0].current_price
}