import { motion } from "framer-motion"
import PrimaryButton from "@/Components/PrimaryButton";
import MultipleContentsCard from "@/Pages/Parts/MultipleContentsCard";

export const PublicDisplayCard = ({name,value,difficulty,people,onClick}:{ name:string,value:number,difficulty:string,people:number,onClick?: () => void }) => {
  const handleClick = () => {
    if(onClick){
    onClick();
    }
  };
return(
<div style={{ width: "100px", height: "100px" }}>
  <motion.div
    className="box"
    initial={{ opacity: 0.1, scale: 1}}
    animate={{ opacity: 1, scale: 1}}
    transition={{
      duration: 5,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }}    
    onClick={handleClick}
    >
   <MultipleContentsCard 
   name={name}
   value={value}
   difficulty={difficulty}
   people={people}/>
  </motion.div >
  </div>
)
}