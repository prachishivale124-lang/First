"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import * as THREE from "three";
import Link from "next/link";

// Abstract 3D Organic Shapes to represent fruits/vegetables
function OrganicShape({ color, position, speed, distort, radius }: any) {
  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2} position={position}>
      <Sphere args={[radius, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.1}
          roughness={0.4}
          distort={distort}
          speed={speed * 2}
        />
      </Sphere>
    </Float>
  );
}

function FloatingLeaves() {
  const group = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.1;
      group.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={1} rotationIntensity={1.5} floatIntensity={2} position={[
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10 - 5
        ]}>
          <mesh rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <planeGeometry args={[0.3, 0.6]} />
            <meshStandardMaterial color="#2D6A4F" side={THREE.DoubleSide} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#FDFBF7" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#2D6A4F" />
      
      {/* Background Particles */}
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

      {/* Abstract Vegetables/Fruits */}
      <OrganicShape color="#2D6A4F" position={[-4, 1, -3]} speed={1.5} distort={0.4} radius={1.2} /> {/* Leaf Green */}
      <OrganicShape color="#0A2F1D" position={[4, -2, -4]} speed={1} distort={0.3} radius={1.5} /> {/* Forest Green */}
      <OrganicShape color="#D4AF37" position={[5, 3, -5]} speed={2} distort={0.5} radius={0.8} /> {/* Golden/Orange */}
      <OrganicShape color="#4ade80" position={[-3, -3, -2]} speed={1.2} distort={0.2} radius={0.9} /> {/* Light Green */}
      
      <FloatingLeaves />
    </>
  );
}

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-[#E8F3EB] dark:from-background dark:to-[#0A2F1D]/50">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-60 dark:opacity-40">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gold font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-4"
          >
            BHISHMA
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            Fresh Food <br className="hidden md:block" />
            <span className="text-primary relative inline-block">
              Without Chemicals
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute -bottom-2 left-0 h-2 bg-accent/40 rounded-full"
              />
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Experience naturally grown fruits and vegetables delivered fresh from trusted farms. Pure nature, healthy future.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/products" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-primary text-white">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
              </Button>
            </Link>
            <Link href="/products" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base rounded-full border-2 border-primary text-primary hover:bg-primary/5 transition-all hover:-translate-y-1">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
