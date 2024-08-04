import { useEffect, useState } from 'react';
import './index.css';
import { colorfulRobot } from './images';
import Energy from "./ui/main/Energy.tsx";
import BottomNav from "./ui/main/BottomNav.tsx";
import WebApp from "@twa-dev/sdk"
import {UserData} from "./utils/types.ts";
import {getUserDataFromBot} from "./api/subs/subs.ts";

const App = () => {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    if(WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData)


      const webApp = WebApp
      webApp.expand()
      webApp.setHeaderColor("#000")
      webApp.setBackgroundColor("#271732")
    }
  }, []);

  if(userData) {
    getUserDataFromBot(userData.id).then((sub) => setPoints(sub.tokens))
  }
  
  const [points, setPoints] = useState(0);
  // @ts-ignore
  const [pointsPerClick, setPointsPerClick] = useState(12)
  const [energy, setEnergy] = useState(2532);
  // @ts-ignore
  const [maxEnergy, setMaxEnergy] = useState(1000);
  const [isPressed, setIsPressed] = useState(false);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const pointsToAdd = 12;
  const energyToReduce = 12;

  useEffect(() => {
    if(isPressed) {
      setTimeout(() => {
        setIsPressed(false)
      }, 100)
    }
  }, [isPressed]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (energy - energyToReduce < 0) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsPressed(true)
    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, 1000));
    }, 100); // Restore 10 energy points every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className=" min-h-screen px-4 bg-gradient-to-b from-[#000] to-[#271732] flex flex-col items-center text-white font-medium" style={{color: "#1beff5", backgroundColor: "#e72a81", fontFamily: "Futura, sans-serif"}}>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">
        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="w-full cursor-pointer">
            <div className="bg-[#1f1f1f] text-center py-2 rounded-xl">
              <p className="text-lg opacity-30">Squads coming soon...</p>
              <div>{userData ? userData.first_name : "no user data"}</div>
            </div>
          </div>
          <div className="mt-12 text-5xl font-bold flex items-center">
            <span className="ml-2" style={{fontFamily: "Futura"}}>{formatNumberWithSpaces(points)}</span>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10 flex flex-col gap-4">
          <Energy energy={energy} maxEnergy={maxEnergy}/>
          <BottomNav/>
        </div>

        <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-4" onClick={handleClick}>
            <div
                style={isPressed ? {transform: 'scale(0.95)'} : {transform: 'scale(1)'}}
                className="
                rounded-full border-8 border-[#f3c45a] shadow-[0_0_15px_5px_rgba(252,204,75,1)] transform transition-transform duration-100">

              <img src={colorfulRobot} width={256} height={256} alt="notcoin" className=""/>
            </div>
            {clicks.map((click) => (
                <div
                    key={click.id}
                    className="absolute text-5xl font-bold opacity-0"
                    style={{
                      top: `${click.y - 42}px`,
                      left: `${click.x - 28}px`,
                      animation: `float 1s ease-out`
                    }}
                    onAnimationEnd={() => handleAnimationEnd(click.id)}
                >
                  {pointsPerClick}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function formatNumberWithSpaces(number: number) {
  // Convert the number to a string
  let numStr = number.toString();

  // Use a regular expression to add a space every three digits from the end
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default App;
