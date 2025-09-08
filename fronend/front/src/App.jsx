import "./index.css"
import Header from "./components/header"
import Hero from "./components/hero"

export default function App() {
  return (
    <main>
      <img src="/gradient.png" className="absolute top-0 right-0 opacity-60 -z-10"  alt="background image " />
      <div className="h-0 w-[40rem] absolute top-[20%] right-[-5%] shadow-[0_0_900px_20px_#e99b63] rotate-[150deg] -z-10"></div>
      <Header />
      <Hero />
    </main>
  )
}