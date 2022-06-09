import Head from 'next/head'
import { useState } from 'react'
import Input from '../components/Input'
import Select from '../components/Select'
import { Plans } from '../types/plans'
import { Prices } from '../types/prices'

interface IndexProps {
  prices: Array<Prices>
  plans: Array<Plans>
}

export async function getServerSideProps() {
  const dev = process.env.NODE_ENV !== 'production'
  const server = dev ? 'http://localhost:3000' : 'https://fale-mais-theta.vercel.app'
  const resPrices = await fetch(`${server}/api/prices`)
  const prices = await resPrices.json()

  const resPlans = await fetch(`${server}/api/plans`)
  const plans = await resPlans.json()

  console.log('server', server)

  return {
    props: { prices, plans }
  }
}

function Home({ prices, plans }: IndexProps) {
  const ddd = ['011', '016', '017', '018']

  const planItems = plans.map((item: any) => item.name)

  const [originState, setOriginState] = useState()
  const [destinyState, setDestinyState] = useState()
  const [timeState, setTimeState] = useState('0')
  const [planState, setPlanState] = useState()

  const [valueWithPlan, setValueWithPlan] = useState()
  const [valueWithouPlan, setValueWithouPlan] = useState()

  const secondDDD = originState
    ? ddd.filter((item: any) => item !== originState)
    : ddd

  function selectPlan(planParam: string): any {
    switch (planParam) {
      case 'FaleMais 30':
        return 30
        break
      case 'FaleMais 60':
        return 60
        break
      case 'FaleMais 120':
        return 120
        break
      default:
        break
    }
  }

  function withoutPlan(time: any, perMin: any): any {
    console.log('time', time)
    console.log('perMin', perMin)
    return (parseInt(time) * parseFloat(perMin)).toFixed(2)
  }

  function withPlan(time: any, perMin: any, plan: any): any {
    if (parseInt(time) < selectPlan(plan)) {
      return 0
    } else {
      return ((parseInt(time) - selectPlan(plan)) * parseFloat(perMin)).toFixed(2)
    }
  }

  function result(orig: any, dest: any) {
    prices.forEach((price: any) => {
      if (orig === price.origin && dest === price.destiny) {
        setValueWithouPlan(withoutPlan(timeState, price.perMin))
        setValueWithPlan(withPlan(timeState, price.perMin, planState))  
      }
    })
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center mt-5 py-2">
        <Head>
          <title>FaleMais</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
          <div className="text-center mb-8 ">
            <h1 className="text-7xl font-bold text-cyan-800">
              Fale<a className="italic text-cyan-400">Mais</a>
            </h1>
          </div>
          <div className="flex">
            <div>
              <Select
                onChange={(e: any) => setOriginState(e.target.value)}
                value={originState}
                label="Origem"
                items={ddd}
              />
            </div>
            <div>
              <Select
                label="Destino"
                onChange={(e: any) => setDestinyState(e.target.value)}
                value={destinyState}
                items={secondDDD}
              />
            </div>
            <Input
              onChange={(e: any) => setTimeState(e.target.value)}
              value={timeState}
              type="number"
              placeholder="Tempo"
              icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <div>
              <Select
                label="Plano"
                onChange={(e: any) => setPlanState(e.target.value)}
                value={planState}
                items={planItems}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                className="border-2 border-solid border-zinc-300 rounded-full p-2"
                onClick={() => result(originState, destinyState)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mx-2 text-stone-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center mt-10">
            <div className="mr-10">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-800">
                  Com o <a className="text-cyan-800">Fale</a>
                  <a className="italic text-cyan-400">Mais</a>
                </h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <h2 className='text-4xl font-bold text-green-500'>R$: {valueWithPlan}</h2>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-800">
                  Sem o <a className="text-cyan-800">Fale</a>
                  <a className="italic text-cyan-400">Mais</a>
                </h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <h2 className='text-4xl font-bold text-red-600'>R$: {valueWithouPlan}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
