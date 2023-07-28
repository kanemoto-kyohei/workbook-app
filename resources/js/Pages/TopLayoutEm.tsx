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
import { Button } from '@mui/material';
import FastForwardIcon from '@mui/icons-material/FastForward';


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
      <h3>{`##${id} ${comments[id-1]}`}</h3>
      <div className='description'>{<a href={route(`howtouse${id}`)}><div className='description'><FastForwardIcon/>説明を見る</div></a>}</div>
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

      <footer className="footer">
        <div>© 2023 ShareLedge. All Rights Reserved.</div>
        <div className='flex justify-end items-end text-right'>
        <Link className='ml-5' href={route('terms')}>利用規約</Link>
        <Link className='ml-5' href={route('privacy.policy')}>プライバシーポリシー</Link>
        </div>
      </footer>
    </>
  );
}
