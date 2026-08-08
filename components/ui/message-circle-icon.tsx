import { forwardRef, useImperativeHandle } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "./types";
import { motion, useAnimate } from "motion/react";

const MessageCircleIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "" },
    ref,
  ) => {
    const [scope, animate] = useAnimate();

    const start = async () => {
      // reset first
      animate(".message-path", { pathLength: 0, opacity: 0 }, { duration: 0 });

      await animate(
        ".message-path",
        { pathLength: [0, 1], opacity: [0, 1] },
        { duration: 0.6, ease: "easeInOut" },
      );

      animate(
        ".message-path",
        { scale: [1, 1.05, 1] },
        { duration: 0.3, ease: "easeOut" },
      );
    };

    const stop = () => {
      animate(
        ".message-path",
        { pathLength: 1, opacity: 1, scale: 1 },
        { duration: 0.2 },
      );
    };

    useImperativeHandle(ref, () => ({
      startAnimation: start,
      stopAnimation: stop,
    }));

    const handleHoverStart = () => {
      start();
    };

    const handleHoverEnd = () => {
      stop();
    };

    return (
      <motion.svg
        ref={scope}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer ${className}`}
        style={{ overflow: "visible" }}
      >
        <motion.path
          className="message-path"
          d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1"
          initial={{ pathLength: 1, opacity: 1 }}
          style={{ transformOrigin: "center" }}
        />
      </motion.svg>
    );
  },
);

MessageCircleIcon.displayName = "MessageCircleIcon";

export default MessageCircleIcon;
