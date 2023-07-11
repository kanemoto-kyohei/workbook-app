import { motion } from "framer-motion-3d";
import PrimaryButton from "@/Components/PrimaryButton";
import BasicCard from "@/Pages/Parts/BasicCard";
import { useState } from "react";

export const ThreeDementionButton = ({value,onClick}:{ value:string,onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const handleClick = () => {
    onClick();
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

return(
<div style={{ width: "100px", height: "100px" }}>
   <motion.meshBasicMaterial
       initial="hidden"
       animate="visible"
       variants={variants}
       onClick={handleClick}
   >
   </motion.meshBasicMaterial>
  </div>
  
)
}