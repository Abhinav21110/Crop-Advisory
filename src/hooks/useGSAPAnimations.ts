import { useEffect, RefObject, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface AnimationOptions {
  delay?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  force3D?: boolean;
  willChange?: boolean;
}

export const useGSAPAnimations = () => {
  // Optimized fade in from bottom animation
  const fadeInUp = useCallback((
    elements: RefObject<HTMLElement>[] | RefObject<HTMLElement>,
    options: AnimationOptions = {}
  ) => {
    const { 
      delay = 0, 
      duration = 0.6, 
      stagger = 0.1, 
      ease = "power2.out",
      force3D = true,
      willChange = true
    } = options;
    
    const targets = Array.isArray(elements) 
      ? elements.map(el => el.current).filter(Boolean) 
      : [elements.current].filter(Boolean);
    
    if (targets.length === 0) return null;

    // Set will-change for better performance
    if (willChange) {
      targets.forEach(target => {
        if (target) target.style.willChange = 'transform, opacity';
      });
    }
    
    const tl = gsap.timeline();
    
    tl.fromTo(targets, 
      { 
        opacity: 0, 
        y: 50,
        force3D: force3D
      },
      { 
        opacity: 1, 
        y: 0, 
        duration,
        delay,
        stagger: Array.isArray(elements) ? stagger : 0,
        ease,
        force3D: force3D,
        onComplete: () => {
          // Clean up will-change after animation
          if (willChange) {
            targets.forEach(target => {
              if (target) target.style.willChange = 'auto';
            });
          }
        }
      }
    );
    
    return tl;
  }, []);

  // Optimized fade in from left animation
  const fadeInLeft = useCallback((
    elements: RefObject<HTMLElement>[] | RefObject<HTMLElement>,
    options: AnimationOptions = {}
  ) => {
    const { 
      delay = 0, 
      duration = 0.8, 
      stagger = 0.15, 
      ease = "power2.out",
      force3D = true,
      willChange = true
    } = options;
    
    const targets = Array.isArray(elements) 
      ? elements.map(el => el.current).filter(Boolean) 
      : [elements.current].filter(Boolean);
    
    if (targets.length === 0) return null;

    if (willChange) {
      targets.forEach(target => {
        if (target) target.style.willChange = 'transform, opacity';
      });
    }
    
    const tl = gsap.timeline();
    
    tl.fromTo(targets, 
      { 
        opacity: 0, 
        x: -60,
        force3D: force3D
      },
      { 
        opacity: 1, 
        x: 0, 
        duration,
        delay,
        stagger: Array.isArray(elements) ? stagger : 0,
        ease,
        force3D: force3D,
        onComplete: () => {
          if (willChange) {
            targets.forEach(target => {
              if (target) target.style.willChange = 'auto';
            });
          }
        }
      }
    );
    
    return tl;
  }, []);

  // Optimized scale in animation
  const scaleIn = useCallback((
    elements: RefObject<HTMLElement>[] | RefObject<HTMLElement>,
    options: AnimationOptions = {}
  ) => {
    const { 
      delay = 0, 
      duration = 0.5, 
      stagger = 0.1, 
      ease = "back.out(1.7)",
      force3D = true,
      willChange = true
    } = options;
    
    const targets = Array.isArray(elements) 
      ? elements.map(el => el.current).filter(Boolean) 
      : [elements.current].filter(Boolean);
    
    if (targets.length === 0) return null;

    if (willChange) {
      targets.forEach(target => {
        if (target) target.style.willChange = 'transform, opacity';
      });
    }
    
    const tl = gsap.timeline();
    
    tl.fromTo(targets, 
      { 
        opacity: 0, 
        scale: 0.8,
        force3D: force3D
      },
      { 
        opacity: 1, 
        scale: 1, 
        duration,
        delay,
        stagger: Array.isArray(elements) ? stagger : 0,
        ease,
        force3D: force3D,
        onComplete: () => {
          if (willChange) {
            targets.forEach(target => {
              if (target) target.style.willChange = 'auto';
            });
          }
        }
      }
    );
    
    return tl;
  }, []);

  // Optimized hover animation
  const hoverAnimation = useCallback((
    element: RefObject<HTMLElement>,
    options: AnimationOptions = {}
  ) => {
    const { duration = 0.3, ease = "power2.out", force3D = true } = options;
    const target = element.current;
    
    if (!target) return { mouseEnter: () => {}, mouseLeave: () => {} };

    const mouseEnter = () => {
      target.style.willChange = 'transform';
      gsap.to(target, {
        scale: 1.05,
        y: -5,
        duration,
        ease,
        force3D: force3D
      });
    };

    const mouseLeave = () => {
      gsap.to(target, {
        scale: 1,
        y: 0,
        duration,
        ease,
        force3D: force3D,
        onComplete: () => {
          target.style.willChange = 'auto';
        }
      });
    };

    return { mouseEnter, mouseLeave };
  }, []);

  // Optimized click animation
  const clickAnimation = useCallback((
    element: RefObject<HTMLElement>,
    options: AnimationOptions = {}
  ) => {
    const { duration = 0.15, ease = "power2.out", force3D = true } = options;
    const target = element.current;
    
    if (!target) return () => {};

    return () => {
      target.style.willChange = 'transform';
      gsap.to(target, {
        scale: 0.95,
        duration: duration,
        ease,
        force3D: force3D,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          target.style.willChange = 'auto';
        }
      });
    };
  }, []);

  // Optimized scroll-triggered animation
  const scrollTriggerAnimation = useCallback((
    element: RefObject<HTMLElement>,
    animationProps: any,
    options: AnimationOptions = {}
  ) => {
    const { duration = 1, ease = "power2.out", force3D = true } = options;
    const target = element.current;
    
    if (!target) return null;

    const ctx = gsap.context(() => {
      target.style.willChange = 'transform, opacity';
      
      gsap.fromTo(target, 
        { opacity: 0, y: 50, force3D: force3D },
        {
          ...animationProps,
          duration,
          ease,
          force3D: force3D,
          scrollTrigger: {
            trigger: target,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            once: true,
            onComplete: () => {
              target.style.willChange = 'auto';
            }
          }
        }
      );
    }, target);

    return ctx;
  }, []);

  // Optimized counter animation
  const counterAnimation = useCallback((
    element: RefObject<HTMLElement>,
    endValue: number,
    options: AnimationOptions = {}
  ) => {
    const { duration = 2, ease = "power2.out", delay = 0 } = options;
    const target = element.current;
    
    if (!target) return null;

    const obj = { value: 0 };
    
    const tl = gsap.timeline({ delay });
    
    tl.to(obj, {
      value: endValue,
      duration,
      ease,
      onUpdate: () => {
        target.textContent = Math.round(obj.value).toLocaleString();
      }
    });
    
    return tl;
  }, []);

  // Batch DOM reads and writes for better performance
  const batchAnimation = useCallback((animations: (() => void)[]) => {
    // Use requestAnimationFrame to batch DOM operations
    requestAnimationFrame(() => {
      animations.forEach(animation => animation());
    });
  }, []);

  // Cleanup function for ScrollTrigger instances
  const cleanupScrollTriggers = useCallback(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  // Performance monitoring
  const measurePerformance = useCallback((name: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`Animation "${name}" took ${end - start} milliseconds`);
  }, []);

  return {
    fadeInUp,
    fadeInLeft,
    scaleIn,
    hoverAnimation,
    clickAnimation,
    scrollTriggerAnimation,
    counterAnimation,
    batchAnimation,
    cleanupScrollTriggers,
    measurePerformance
  };
};
