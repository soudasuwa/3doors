"use client"

import { useEffect, useState } from "react"

function getRandomInt(max: number) {
	return Math.floor(Math.random() * max)
}

function selectRandom<T>(arr: T[]) {
	return arr[getRandomInt(arr.length)]
}

export default function Home() {
	const [showDevTools, setShowDevTools] = useState(false)

	const [firstGuess, setFirstGuess] = useState(0)
	const [secondGuess, setSecondGuess] = useState(0)
	const [loss, setLoss] = useState(0)

	const [totalGuesses, setTotalGuesses] = useState(-1)

	const [step, setStep] = useState(0)
	const [guess, setGuess] = useState(0)
	const [closed, setClosed] = useState(-1)

	const [myFirstGuess, setMyFirstGuess] = useState(-1)

	const doors = [0, 1, 2]

	useEffect(() => {
		if (step === 0) {
			setGuess(getRandomInt(3))
			setClosed(-1)
			setMyFirstGuess(-1)
			setTotalGuesses(totalGuesses + 1)
		}
	}, [step])

	const selectDoor = (door: number) => {
		if (door === closed) {
			return
		}

		if (step === 0) {
			setMyFirstGuess(door)

			if (door !== guess) {
				setClosed(doors.filter(d => d !== door && d !== guess)[0])
			} else {
				setClosed(selectRandom(doors.filter(d => d !== guess)))
			}

			setStep(1)
		} else if (step === 1) {
			if (door === guess) {
				if (myFirstGuess === guess) {
					setFirstGuess(firstGuess + 1)
				} else {
					setSecondGuess(secondGuess + 1)
				}
			} else {
				setLoss(loss + 1)
			}

			setStep(0)
		}
	}

	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<div>
				<h2 className="text-2xl">Guessed {firstGuess + secondGuess} times out of {totalGuesses} total guesses ({Math.floor((firstGuess + secondGuess) / totalGuesses * 100)}%)</h2>
				<p>Stayed on correct door: {firstGuess} times</p>
				<p>Correctly changed the door: {secondGuess} times</p>
				<p>Loss: {loss} times</p>
				<br />
				{showDevTools && (<>
					<p>Guessed: {guess + 1} door</p>
					<p>Step: {step === 0 ? "first" : "second"} step</p>
					<p>Closed door: {closed + 1}</p>
					<p>First guessed door: {myFirstGuess + 1} door</p>
					<br />
				</>)}
				<input type="button" onClick={() => setShowDevTools(!showDevTools)} value={`${showDevTools ? "Hide" : "Show"} dev tools`} />
			</div>
			<div className="flex gap-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
				{doors.map((door) => (
					<a
						key={door}
						className={
							"group rounded-lg border px-5 py-4 transition-colors border-gray-300 " +
							(door !== closed ? "hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30" : "bg-red-500")
						}
						onClick={() => selectDoor(door)}
					>
						<h2 className={`mb-3 text-2xl font-semibold`}>
							Door {door + 1}{" "}
							<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
								-&gt;
							</span>
						</h2>
					</a>
				))}
			</div>
		</main>
	)
}
