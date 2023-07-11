import '@/Pages/TopLayoutEm.css';
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "framer-motion";
import { Link } from '@inertiajs/react';

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);
  const comments = [
    '作って' ,
    '解いて' ,
    'シェアして' ,
    '遊ぼう' ,
    'ShareLedge' ,];

  return (
    <section>
      <div ref={ref}>
        <img src={`/${id}.jpg`} alt="A London skyscraper" />
      </div>

      <motion.h2 style={{ y }}>
      {`##${id} ${comments[id-1]}`}
      </motion.h2>
      

    </section>
  );
}

export default function TopLayoutEm() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
    <motion.div className='topbar'>
      <a href={route('login')}>ログイン</a>

      <a href={route('register')}>新規登録</a>

    </motion.div>
      {[1, 2, 3, 4, 5].map((image) => (
        <Image id={image} />
      ))}

      <motion.div className="progress" style={{ scaleX }} />
    </>
  );
}
